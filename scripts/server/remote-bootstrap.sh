#!/usr/bin/env bash
# remote-bootstrap.sh — одноразовый установщик на VPS (идемпотентный).
#
# Делает ВСЁ:
#   1. apt install php-fpm, certbot, rsync, msmtp
#   2. создаёт /var/log/gisprof, /etc/gisprof-lead.env, /home/deploy/sites
#   3. клонирует/обновляет /opt/gisprof-variants (ветка site-variants) и
#      /opt/gisprof-src (ветка main, для PHP-handler и скриптов)
#   4. раскидывает dist/<host>/ → /home/deploy/sites/<host>/
#   5. для каждого домена проверяет DNS → если резолвится на ЭТОТ сервер,
#      запрашивает Let's Encrypt сертификат
#   6. пишет мульти-доменный nginx-конфиг (только для доменов с сертами)
#   7. ставит cron на обновление каждые 5 минут
#   8. ПРОВЕРЯЕТ /api/lead тестовым POST
#
# Запуск:
#   VPS_REPO_URL=http://<repo>.git bash scripts/server/remote-bootstrap.sh
# или через local/deploy-now.sh.

set -euo pipefail

: "${VPS_REPO_URL:=https://github.com/alamangart0011/desktop-tutorial.git}"
: "${LEAD_EMAIL:=mail@oboron-it.ru}"
: "${DEPLOY_USER:=deploy}"
: "${PHP_VERSION:=}"

log()  { printf '\033[1;34m[boot]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[warn]\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m[fail]\033[0m %s\n' "$*" >&2; exit 1; }

[[ $EUID -eq 0 ]] || die "Запусти под root"

SELF_IP="$(curl -fsSL -4 https://api.ipify.org || hostname -I | awk '{print $1}')"
log "IP этого сервера: $SELF_IP"

HOSTS=(
    gisprof.ru
    gisprofilaktika.ru
    pp411.ru
    xn----7sbab2ce0afk.xn--p1ai
    profilaktika-spb.ru
    spb-gis.ru
)
# gis-prof.ru — только 301 на gisprof.ru, контент не развёртывается
REDIRECT_ONLY=(gis-prof.ru)

# ---------- 1. Пакеты ----------
log "Установка зависимостей (apt)"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y --no-install-recommends \
    curl ca-certificates git rsync logrotate python3 \
    nginx certbot python3-certbot-nginx \
    php-fpm php-cli php-curl php-mbstring \
    msmtp msmtp-mta bsd-mailx ufw fail2ban \
    dnsutils >/dev/null

# Авто-определение версии PHP
if [[ -z "$PHP_VERSION" ]]; then
    PHP_VERSION="$(php -r 'echo PHP_MAJOR_VERSION.".".PHP_MINOR_VERSION;')"
fi
PHP_SOCK="/run/php/php${PHP_VERSION}-fpm.sock"
[[ -S "$PHP_SOCK" ]] || die "Нет сокета $PHP_SOCK"
log "PHP-FPM сокет: $PHP_SOCK"

# ---------- 2. Пользователь deploy ----------
if ! id -u "$DEPLOY_USER" >/dev/null 2>&1; then
    log "Создаю пользователя $DEPLOY_USER"
    useradd -m -s /bin/bash "$DEPLOY_USER"
fi
usermod -aG www-data "$DEPLOY_USER"
chmod 755 "/home/$DEPLOY_USER"
mkdir -p "/home/$DEPLOY_USER/sites"
chown -R "$DEPLOY_USER:www-data" "/home/$DEPLOY_USER/sites"

# ---------- 3. ENV секреты ----------
ENV_FILE="/etc/gisprof-lead.env"
if [[ ! -f "$ENV_FILE" ]]; then
    log "Создаю $ENV_FILE"
    cat > "$ENV_FILE" <<EOF
LEAD_TO_EMAIL=$LEAD_EMAIL
LEAD_FROM_EMAIL=leads@gisprof.ru
LEAD_FROM_NAME=gisprof.ru
TG_BOT_TOKEN=
TG_CHAT_ID=
RATE_LIMIT_WINDOW=600
RATE_LIMIT_MAX=8
LEAD_LOG_DIR=/var/log/gisprof
EOF
fi
chown root:www-data "$ENV_FILE"
chmod 640 "$ENV_FILE"

mkdir -p /var/log/gisprof/rl
chown -R www-data:www-data /var/log/gisprof
chmod 750 /var/log/gisprof /var/log/gisprof/rl
touch /var/log/gisprof/leads.jsonl
chown www-data:www-data /var/log/gisprof/leads.jsonl
chmod 640 /var/log/gisprof/leads.jsonl

cat > /etc/logrotate.d/gisprof-leads <<EOF
/var/log/gisprof/leads.jsonl {
    weekly
    rotate 12
    compress
    delaycompress
    missingok
    notifempty
    create 640 www-data www-data
}
EOF

# ---------- 4. Клон репо ----------
for pair in "main:/opt/gisprof-src" "site-variants:/opt/gisprof-variants"; do
    BRANCH="${pair%%:*}"
    DIR="${pair##*:}"
    if [[ -d "$DIR/.git" ]]; then
        log "git pull $BRANCH in $DIR"
        git -C "$DIR" fetch --depth 1 origin "$BRANCH" || warn "fetch $BRANCH failed"
        git -C "$DIR" reset --hard "origin/$BRANCH" || warn "reset $BRANCH failed"
    else
        log "Клонирую $VPS_REPO_URL ($BRANCH) → $DIR"
        git clone --depth 1 -b "$BRANCH" "$VPS_REPO_URL" "$DIR" 2>/dev/null \
            || warn "Клон $BRANCH не удался (ветки может ещё не быть)"
    fi
done

# ---------- 5. Раскладка dist/<host>/ → /home/deploy/sites/ ----------
if [[ -d /opt/gisprof-variants/dist ]]; then
    SRC=/opt/gisprof-variants/dist
else
    SRC=/opt/gisprof-variants
fi

for host in "${HOSTS[@]}"; do
    target="/home/$DEPLOY_USER/sites/$host"
    if [[ -d "$SRC/$host" ]]; then
        mkdir -p "$target"
        rsync -a --delete "$SRC/$host/" "$target/"
        chown -R "$DEPLOY_USER:www-data" "$target"
        find "$target" -type d -exec chmod 755 {} \;
        find "$target" -type f -exec chmod 644 {} \;
        log "Сайт $host → $target"
    else
        warn "Нет dist/$host — варианта пока не собрано, пропускаю"
    fi
done

# ---------- 6. Nginx HTTP-only блоки (для ACME challenge) + DNS-проверка ----------
READY=()
WAITING=()
for host in "${HOSTS[@]}"; do
    RES="$(dig +short +time=3 +tries=1 A "$host" @1.1.1.1 | tail -1 || true)"
    if [[ "$RES" == "$SELF_IP" ]]; then
        READY+=("$host")
    else
        WAITING+=("$host (DNS='$RES', ожидаем '$SELF_IP')")
    fi
done
log "DNS готовы: ${READY[*]:-—}"
[[ ${#WAITING[@]} -gt 0 ]] && warn "DNS ждём: ${WAITING[*]}"

# ---------- 7. Nginx HTTP-only конфиг (для certbot) ----------
# На этом этапе пишем только :80 блоки — certbot сам добавит :443.
NGINX_CONF=/etc/nginx/sites-available/gisprof-multi.conf

{
cat <<NGINX
# Автоматически сгенерировано remote-bootstrap.sh — $(date -Iseconds)
upstream gisprof_php { server unix:$PHP_SOCK; }
map \$sent_http_content_type \$expires_val {
    default                         off;
    ~*(text|application).(html|xml)\$   -1;
    ~*(image|font|javascript|css)      max;
}
NGINX

for host in "${HOSTS[@]}"; do
    if [[ ! -d "/home/$DEPLOY_USER/sites/$host" ]]; then continue; fi
    aliases="$host www.$host"
    [[ "$host" == xn----7sbab2ce0afk.xn--p1ai ]] && aliases="$host"
    cat <<NGINX

# ----- $host -----
server {
    listen 80;
    listen [::]:80;
    server_name $aliases;
    root /home/$DEPLOY_USER/sites/$host;
    index index.html;
    charset utf-8;
    expires \$expires_val;
    location ^~ /.well-known/acme-challenge/ { allow all; default_type "text/plain"; }
    location = /api/lead {
        fastcgi_pass gisprof_php;
        fastcgi_param SCRIPT_FILENAME \$document_root/api/lead.php;
        include fastcgi_params;
        client_max_body_size 64k;
    }
    location ~ ^/api/.*\\.php\$ { return 404; }
    location / { try_files \$uri \$uri/index.html \$uri.html =404; }
}
NGINX
done

# редирект gis-prof.ru → gisprof.ru (HTTP only пока)
for r in "${REDIRECT_ONLY[@]}"; do
    cat <<NGINX

server {
    listen 80;
    listen [::]:80;
    server_name $r www.$r;
    location ^~ /.well-known/acme-challenge/ { root /home/$DEPLOY_USER/sites/gisprof.ru; }
    location / { return 301 https://gisprof.ru\$request_uri; }
}
NGINX
done
} > "$NGINX_CONF"

# Удаляем старые конфиги, чтобы не было конфликта server_name
for old in gisprof.ru default; do
    [[ -L /etc/nginx/sites-enabled/$old ]] && rm -f /etc/nginx/sites-enabled/$old && log "Выключил sites-enabled/$old"
done
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/gisprof-multi.conf

nginx -t
systemctl reload nginx
log "nginx: HTTP-only конфиг активен"

# ---------- 8. Let's Encrypt для готовых по DNS ----------
for host in "${READY[@]}"; do
    aliases="-d $host"
    [[ "$host" != xn----7sbab2ce0afk.xn--p1ai ]] && aliases="-d $host -d www.$host"
    if [[ ! -d "/etc/letsencrypt/live/$host" ]]; then
        log "certbot → $host"
        certbot --nginx $aliases \
            --non-interactive --agree-tos \
            -m "$LEAD_EMAIL" --redirect --no-eff-email \
            || warn "certbot не смог для $host"
    else
        log "cert уже есть для $host"
    fi
done
# Для редирект-доменов — только если DNS готов
for r in "${REDIRECT_ONLY[@]}"; do
    RES="$(dig +short +time=3 A "$r" @1.1.1.1 | tail -1 || true)"
    if [[ "$RES" == "$SELF_IP" && ! -d "/etc/letsencrypt/live/$r" ]]; then
        certbot --nginx -d "$r" -d "www.$r" \
            --non-interactive --agree-tos \
            -m "$LEAD_EMAIL" --redirect --no-eff-email \
            || warn "certbot не смог для $r"
    fi
done

nginx -t && systemctl reload nginx

# ---------- 9. Cron на автоподхват ----------
cat > /etc/cron.d/gisprof-autopull <<'EOF'
*/5 * * * * root cd /opt/gisprof-variants && git fetch --depth 1 origin site-variants >/dev/null 2>&1 && git reset --hard origin/site-variants >/dev/null 2>&1 && bash /opt/gisprof-src/scripts/server/deploy-variants.sh >>/var/log/gisprof-deploy.log 2>&1
*/5 * * * * root cd /opt/gisprof-src && git fetch --depth 1 origin main >/dev/null 2>&1 && git reset --hard origin/main >/dev/null 2>&1
EOF
chmod 644 /etc/cron.d/gisprof-autopull
systemctl restart cron

# ---------- 10. UFW + fail2ban (мягко) ----------
ufw allow OpenSSH 2>/dev/null || true
ufw allow 'Nginx Full' 2>/dev/null || true
yes | ufw enable 2>/dev/null || true
systemctl enable --now fail2ban 2>/dev/null || true

# ---------- 11. Тест /api/lead ----------
sleep 1
TEST_URL="http://gisprof.ru/api/lead"
[[ -d /etc/letsencrypt/live/gisprof.ru ]] && TEST_URL="https://gisprof.ru/api/lead"
log "Тест: POST $TEST_URL"
RESP=$(curl -sS -o /tmp/lead.json -w "%{http_code}" \
    -H 'Content-Type: application/json' -X POST "$TEST_URL" \
    --data '{"organization":"bootstrap-test","full_name":"Bootstrap Test","phone":"+7 (812) 000-00-00","email":"test@example.com","message":"Auto-ping"}' || echo 000)
echo "  HTTP $RESP → $(cat /tmp/lead.json 2>/dev/null)"

# ---------- 12. Итог ----------
echo ""
echo "═══════════════════════════════════════════════════════════"
echo " ГОТОВО"
echo "═══════════════════════════════════════════════════════════"
echo " HTTPS готов:"
for h in "${HOSTS[@]}" "${REDIRECT_ONLY[@]}"; do
    [[ -d /etc/letsencrypt/live/$h ]] && echo "   ✓ https://$h"
done
echo ""
if [[ ${#WAITING[@]} -gt 0 ]]; then
    echo " Ждём DNS (A → $SELF_IP):"
    for w in "${WAITING[@]}"; do echo "   · $w"; done
    echo ""
    echo " Когда DNS пропишется, просто перезапустить bootstrap:"
    echo "   bash /opt/gisprof-src/scripts/server/remote-bootstrap.sh"
fi
echo ""
echo " Секреты для заявок:"
echo "   sudo nano $ENV_FILE         # вписать TG_BOT_TOKEN + TG_CHAT_ID"
echo "   sudo nano /etc/msmtprc      # SMTP для e-mail"
echo "   sudo systemctl restart php${PHP_VERSION}-fpm"
echo ""
echo " Логи:"
echo "   sudo tail -f /var/log/gisprof/leads.jsonl"
echo "   sudo tail -f /var/log/gisprof-deploy.log"
echo "═══════════════════════════════════════════════════════════"
