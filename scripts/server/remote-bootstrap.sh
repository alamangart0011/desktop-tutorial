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
    xn---411-k4d4a4d.xn--p1ai
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

# ---------- 6. DNS-проверка через 3 резолвера (Cloudflare + Google + Yandex) ----------
# Только если все 3 видят правильный IP — считаем что DNS прогрузился глобально.
# Это защищает от ложных certbot-вызовов когда часть кешей ещё на парковке.
dns_check() {
    local host="$1" ok=0 fail=""
    for ns in 1.1.1.1 8.8.8.8 77.88.8.8; do
        local r
        r="$(dig +short +time=3 +tries=1 A "$host" @$ns 2>/dev/null | tail -1 || true)"
        if [[ "$r" == "$SELF_IP" ]]; then
            ok=$((ok+1))
        else
            fail="$fail $ns→'${r:-нет}'"
        fi
    done
    if [[ $ok -ge 3 ]]; then
        echo "OK"
    else
        echo "FAIL$fail"
    fi
}

READY=()
WAITING=()
for host in "${HOSTS[@]}"; do
    R="$(dns_check "$host")"
    if [[ "$R" == "OK" ]]; then
        READY+=("$host")
    else
        WAITING+=("$host ($R)")
    fi
done
log "DNS готовы: ${READY[*]:-—}"
[[ ${#WAITING[@]} -gt 0 ]] && warn "DNS ждём: ${WAITING[*]}"

# ---------- 7. Webroot для ACME-challenge (общий для всех доменов) ----------
ACME_ROOT=/var/www/acme
mkdir -p "$ACME_ROOT/.well-known/acme-challenge"
chown -R www-data:www-data "$ACME_ROOT"

# ---------- 8. Получение сертификатов через webroot (НЕ трогаем nginx-конфиг) ----------
# 1) убедимся что есть минимальный HTTP-конфиг для ACME
#    (этот блок отдаёт challenge для ВСЕХ доменов, что бы дальше ни происходило)
ACME_CONF=/etc/nginx/sites-available/acme-fallback.conf
cat > "$ACME_CONF" <<NGINX
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    root $ACME_ROOT;
    location ^~ /.well-known/acme-challenge/ { allow all; default_type "text/plain"; }
    location / { return 444; }
}
NGINX
ln -sf "$ACME_CONF" /etc/nginx/sites-enabled/acme-fallback.conf

# Удаляем старые конфиги, чтобы не было конфликта server_name
for old in gisprof.ru default; do
    [[ -L /etc/nginx/sites-enabled/$old ]] && rm -f /etc/nginx/sites-enabled/$old && log "Выключил sites-enabled/$old"
done

# временно деактивируем мульти-конфиг чтобы не было конфликтов на этом шаге
[[ -L /etc/nginx/sites-enabled/gisprof-multi.conf ]] && rm -f /etc/nginx/sites-enabled/gisprof-multi.conf

nginx -t && systemctl reload nginx

for host in "${READY[@]}"; do
    if [[ -d "/etc/letsencrypt/live/$host" ]]; then
        log "cert уже есть для $host"
        continue
    fi
    args="-d $host"
    [[ "$host" != xn---411-k4d4a4d.xn--p1ai ]] && args="$args -d www.$host"
    log "certbot (webroot) → $host"
    certbot certonly --webroot -w "$ACME_ROOT" $args \
        --non-interactive --agree-tos \
        -m "$LEAD_EMAIL" --no-eff-email \
        || warn "certbot не смог для $host (DNS ещё не везде, или Jino перехватил HTTP)"
done

# Для редирект-доменов
for r in "${REDIRECT_ONLY[@]}"; do
    R="$(dns_check "$r")"
    if [[ "$R" == "OK" && ! -d "/etc/letsencrypt/live/$r" ]]; then
        log "certbot (webroot) → $r"
        certbot certonly --webroot -w "$ACME_ROOT" -d "$r" -d "www.$r" \
            --non-interactive --agree-tos \
            -m "$LEAD_EMAIL" --no-eff-email \
            || warn "certbot не смог для $r"
    fi
done

# ---------- 9. Полная nginx-конфигурация (HTTP + HTTPS) ----------
NGINX_CONF=/etc/nginx/sites-available/gisprof-multi.conf
{
cat <<NGINX
# Автоматически сгенерировано remote-bootstrap.sh — $(date -Iseconds)
server_tokens off;
upstream gisprof_php { server unix:$PHP_SOCK; }
map \$sent_http_content_type \$expires_val {
    default                         off;
    ~*(text|application).(html|xml)\$   -1;
    ~*(image|font|javascript|css)      max;
}

# gzip: Ubuntu nginx.conf уже включает gzip on и gzip_vary on,
# дублировать их нельзя (nginx: directive is duplicate). Только дополняем.
gzip_proxied any;
gzip_comp_level 5;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;

# Rate limiting: 2 заявки/сек на IP, burst 5, и общий rate для статики.
# Localhost + VPS-own-IP (curl --resolve) пускаем мимо лимитера,
# чтобы внутренние smoke-tests и healthcheck-и не били 429.
geo \$limit_exempt {
    default        0;
    127.0.0.1      1;
    ::1            1;
    $SELF_IP       1;
}
map \$limit_exempt \$limit_key {
    0              \$binary_remote_addr;
    1              "";
}
limit_req_zone \$limit_key zone=api_limit:10m rate=2r/s;
limit_req_zone \$limit_key zone=site_limit:10m rate=30r/s;

# Общий ACME-challenge (на случай отсутствующего HTTPS)
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    root $ACME_ROOT;
    location ^~ /.well-known/acme-challenge/ { allow all; default_type "text/plain"; }
    location / { return 444; }
}
NGINX

emit_https_block() {
    local host="$1" docroot="$2" aliases="$3"
    cat <<NGINX

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $aliases;

    ssl_certificate     /etc/letsencrypt/live/$host/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$host/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;
    # OCSP stapling отключаем: на Let's Encrypt R10/R11 Ubuntu-резолвер
    # стабильно пишет «no OCSP responder URL», шумит в логах без пользы.
    ssl_stapling off;

    root $docroot;
    index index.html;
    charset utf-8;
    expires \$expires_val;

    # Security headers (приезжают на все ответы сайта)
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://yastatic.net https://*.yandex.ru; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://mc.yandex.ru https://*.yandex.ru; frame-src https://mc.yandex.ru https://yandex.ru https://*.yandex.ru; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests" always;
    add_header Cross-Origin-Opener-Policy "same-origin-allow-popups" always;

    # Базовый rate limit на всю статику
    limit_req zone=site_limit burst=50 nodelay;

    # API: строже — защита от спама
    location = /api/lead {
        limit_req zone=api_limit burst=5 nodelay;
        limit_except POST OPTIONS { deny all; }
        fastcgi_pass gisprof_php;
        fastcgi_param SCRIPT_FILENAME \$document_root/api/lead.php;
        include fastcgi_params;
        client_max_body_size 64k;
        # Убираем security headers на API (JSON-response)
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer" always;
    }
    location ~ ^/api/.*\\.php\$ { return 404; }

    # Запрет доступа к служебным/скрытым файлам
    location ~ /\\.(?!well-known) { deny all; access_log off; log_not_found off; }
    location ~ /(composer\\.(json|lock)|package(-lock)?\\.json|\\.env.*|\\.git.*)\$ { deny all; }

    location / { try_files \$uri \$uri/index.html \$uri.html =404; }
}
NGINX
}

for host in "${HOSTS[@]}"; do
    if [[ ! -d "/home/$DEPLOY_USER/sites/$host" ]]; then continue; fi
    aliases="$host www.$host"
    [[ "$host" == xn---411-k4d4a4d.xn--p1ai ]] && aliases="$host"
    docroot="/home/$DEPLOY_USER/sites/$host"

    if [[ -d "/etc/letsencrypt/live/$host" ]]; then
        # 80 → 443
        cat <<NGINX

# ----- $host (HTTPS) -----
server {
    listen 80;
    listen [::]:80;
    server_name $aliases;
    location ^~ /.well-known/acme-challenge/ { root $ACME_ROOT; }
    location / { return 301 https://$host\$request_uri; }
}
NGINX
        # HTTPS основной — только canonical host (без www, чтобы избежать conflicting server_name)
        emit_https_block "$host" "$docroot" "$host"
        # www → без www через 301 на HTTPS
        if [[ "$host" != xn---411-k4d4a4d.xn--p1ai ]]; then
            cat <<NGINX

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.$host;
    ssl_certificate     /etc/letsencrypt/live/$host/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$host/privkey.pem;
    return 301 https://$host\$request_uri;
}
NGINX
        fi
    else
        # cert ещё нет — обычный HTTP-сайт
        cat <<NGINX

# ----- $host (HTTP only — ждём cert) -----
server {
    listen 80;
    listen [::]:80;
    server_name $aliases;
    root $docroot;
    index index.html;
    charset utf-8;
    expires \$expires_val;
    location ^~ /.well-known/acme-challenge/ { root $ACME_ROOT; }
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
    fi
done

# Редирект-домены: gis-prof.ru → gisprof.ru
for r in "${REDIRECT_ONLY[@]}"; do
    cat <<NGINX

server {
    listen 80;
    listen [::]:80;
    server_name $r www.$r;
    location ^~ /.well-known/acme-challenge/ { root $ACME_ROOT; }
    location / { return 301 https://gisprof.ru\$request_uri; }
}
NGINX
    if [[ -d "/etc/letsencrypt/live/$r" ]]; then
        cat <<NGINX

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $r www.$r;
    ssl_certificate     /etc/letsencrypt/live/$r/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$r/privkey.pem;
    return 301 https://gisprof.ru\$request_uri;
}
NGINX
    fi
done
} > "$NGINX_CONF"

# Активируем мульти-конфиг, отключаем ACME-fallback (он теперь внутри мульти)
rm -f /etc/nginx/sites-enabled/acme-fallback.conf
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/gisprof-multi.conf

nginx -t && systemctl reload nginx
log "nginx: финальная конфигурация активна (HTTP+HTTPS для готовых, HTTP-only для ожидающих)"

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

# ---------- 11. Тест /api/lead на каждом готовом домене ----------
sleep 2
log "Тест /api/lead на готовых HTTPS-доменах"
for h in "${HOSTS[@]}"; do
    [[ -d "/etc/letsencrypt/live/$h" ]] || continue
    code=$(curl -sS -o /tmp/lead.json -w "%{http_code}" --max-time 8 \
        --resolve "$h:443:$SELF_IP" \
        -H 'Content-Type: application/json' -X POST "https://$h/api/lead" \
        --data '{"organization":"bootstrap-test","full_name":"Bootstrap","phone":"+7 (812) 000-00-00","email":"t@example.com","message":"ping"}' 2>/dev/null || echo 000)
    body="$(cat /tmp/lead.json 2>/dev/null | head -c 120)"
    if [[ "$code" == "200" ]]; then
        echo "   ✓ $h → HTTP $code"
    else
        echo "   · $h → HTTP $code | $body"
    fi
    sleep 1   # интервал между тестами: запас на rate_limit
done

# ---------- 12. Итог ----------
echo ""
echo "═══════════════════════════════════════════════════════════"
echo " ГОТОВО"
echo "═══════════════════════════════════════════════════════════"
echo " HTTPS готов (cert + 443 listener):"
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
