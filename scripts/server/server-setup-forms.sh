#!/usr/bin/env bash
# server-setup-forms.sh — настройка серверного приёма заявок через /api/lead.
#
# Запускать на VPS под root:
#   curl -fsSL https://gisprof.ru/api/setup-forms.sh | bash
#   # или скопировать файл вручную и: bash server-setup-forms.sh
#
# Что делает:
#   1) Устанавливает php-fpm, msmtp-mta (для mail()), curl, logrotate.
#   2) Создаёт /etc/gisprof-lead.env с плейсхолдерами (Telegram, e-mail).
#   3) Создаёт /var/log/gisprof с нужными правами.
#   4) Добавляет в nginx location-блок для /api/lead → php-fpm.
#   5) Тестирует конфигурацию и перезапускает nginx + php-fpm.
#
# Передеплой PHP-файла происходит автоматически: public/api/lead.php попадает
# в out/api/lead.php при Next.js export, cron-пайплайн выкатывает его в docroot.

set -euo pipefail

DOMAIN="${DOMAIN:-gisprof.ru}"
DOCROOT="${DOCROOT:-/home/deploy/sites/${DOMAIN}}"
NGINX_SITE="${NGINX_SITE:-/etc/nginx/sites-available/${DOMAIN}}"
PHP_VERSION="${PHP_VERSION:-}"  # auto-detect если пусто
ENV_FILE="/etc/gisprof-lead.env"
LOG_DIR="/var/log/gisprof"

log() { printf '\033[1;34m[setup]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[warn]\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m[fail]\033[0m %s\n' "$*" >&2; exit 1; }

[[ $EUID -eq 0 ]] || die "Запусти под root (sudo bash $0)"

# ---------- 1. Пакеты ----------
log "Установка php-fpm, msmtp-mta, curl"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y --no-install-recommends \
    curl ca-certificates \
    php-fpm php-cli php-curl php-mbstring \
    msmtp msmtp-mta bsd-mailx \
    logrotate >/dev/null

if [[ -z "$PHP_VERSION" ]]; then
    PHP_VERSION="$(php -r 'echo PHP_MAJOR_VERSION.".".PHP_MINOR_VERSION;')"
fi
PHP_SOCK="/run/php/php${PHP_VERSION}-fpm.sock"
[[ -S "$PHP_SOCK" ]] || die "Нет сокета $PHP_SOCK — проверь php-fpm"

log "php-fpm сокет: $PHP_SOCK"

# ---------- 2. ENV с секретами ----------
if [[ ! -f "$ENV_FILE" ]]; then
    log "Создаю $ENV_FILE (шаблон)"
    cat > "$ENV_FILE" <<'EOF'
# /etc/gisprof-lead.env — секреты для /api/lead.php
# Права: 640, owner=root, group=www-data
LEAD_TO_EMAIL=mail@oboron-it.ru
LEAD_FROM_EMAIL=leads@gisprof.ru
LEAD_FROM_NAME=gisprof.ru

# Telegram-бот (опционально). Создать бота у @BotFather → получить токен.
# Написать боту /start, затем открыть https://api.telegram.org/bot<TOKEN>/getUpdates
# и взять chat.id из последнего сообщения.
TG_BOT_TOKEN=
TG_CHAT_ID=

# Антифлуд
RATE_LIMIT_WINDOW=600
RATE_LIMIT_MAX=8

# Куда писать JSONL-лог заявок
LEAD_LOG_DIR=/var/log/gisprof
EOF
else
    log "$ENV_FILE уже есть — не перезаписываю"
fi
chown root:www-data "$ENV_FILE"
chmod 640 "$ENV_FILE"

# ---------- 3. Каталог журнала ----------
log "Готовлю $LOG_DIR"
mkdir -p "$LOG_DIR/rl"
chown -R www-data:www-data "$LOG_DIR"
chmod 750 "$LOG_DIR" "$LOG_DIR/rl"
touch "$LOG_DIR/leads.jsonl"
chown www-data:www-data "$LOG_DIR/leads.jsonl"
chmod 640 "$LOG_DIR/leads.jsonl"

# logrotate — чтобы лог не распух
cat > /etc/logrotate.d/gisprof-leads <<EOF
${LOG_DIR}/leads.jsonl {
    weekly
    rotate 12
    compress
    delaycompress
    missingok
    notifempty
    create 640 www-data www-data
}
EOF

# ---------- 4. msmtp: системный mail() → на нужный релей ----------
# По умолчанию mail() шлёт через локальный sendmail. На Jino VPS для внешней
# доставки нужен внешний SMTP-релей (Yandex 360/Timeweb/Jino SMTP).
# Здесь только шаблон — заполнит админ.
if [[ ! -f /etc/msmtprc ]]; then
    cat > /etc/msmtprc <<'EOF'
# /etc/msmtprc — настройки SMTP-релея для mail() / msmtp
# Заполнить и сделать: chmod 600 /etc/msmtprc; chown root:mail /etc/msmtprc
defaults
auth           on
tls            on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile        /var/log/msmtp.log

account        default
host           smtp.yandex.ru
port           587
from           leads@gisprof.ru
user           leads@gisprof.ru
password       REPLACE_ME
EOF
    chown root:mail /etc/msmtprc
    chmod 640 /etc/msmtprc
    touch /var/log/msmtp.log
    chown www-data:mail /var/log/msmtp.log
    chmod 660 /var/log/msmtp.log
    warn "Заполни /etc/msmtprc (пароль SMTP) и chmod 600 после заполнения."
fi

# ---------- 5. nginx location для /api/lead ----------
if [[ ! -f "$NGINX_SITE" ]]; then
    die "Не нашёл nginx-конфиг $NGINX_SITE — выстави DOMAIN/NGINX_SITE через env"
fi

if grep -q '# --- GISPROF API BLOCK ---' "$NGINX_SITE"; then
    log "nginx location /api/lead уже установлен — оставляю как есть"
else
    log "Правлю $NGINX_SITE — добавляю /api/lead"
    cp "$NGINX_SITE" "${NGINX_SITE}.bak.$(date +%s)"

    # Вставляем блок перед закрывающей скобкой последнего server {}
    python3 - "$NGINX_SITE" "$PHP_SOCK" <<'PY'
import re, sys, pathlib
path = pathlib.Path(sys.argv[1])
sock = sys.argv[2]
src = path.read_text()
block = f"""
    # --- GISPROF API BLOCK ---
    location = /api/lead {{
        fastcgi_pass unix:{sock};
        fastcgi_param SCRIPT_FILENAME $document_root/api/lead.php;
        fastcgi_param REQUEST_METHOD  $request_method;
        fastcgi_param CONTENT_TYPE    $content_type;
        fastcgi_param CONTENT_LENGTH  $content_length;
        include fastcgi_params;
        client_max_body_size 64k;
        client_body_timeout  10s;
        fastcgi_read_timeout 15s;
    }}
    # Запрещаем исполнение любых других php в /api
    location ~ ^/api/.*\\.php$ {{
        return 404;
    }}
    # --- /GISPROF API BLOCK ---
"""
m = list(re.finditer(r"listen\s+443", src))
if not m:
    # если нет https-блока — берём первый server {}
    m = [re.search(r"server\s*\{", src)]
# вставляем перед последним '}' файла
last_brace = src.rfind("}")
path.write_text(src[:last_brace] + block + src[last_brace:])
PY
fi

log "nginx -t"
nginx -t

log "Перезагружаю nginx и php-fpm"
systemctl reload nginx
systemctl restart "php${PHP_VERSION}-fpm"

# ---------- 6. Проверка ----------
log "Проверка: POST на https://${DOMAIN}/api/lead"
sleep 1
RESP=$(curl -sS -o /tmp/lead-check.json -w "%{http_code}" \
    -H 'Content-Type: application/json' \
    -X POST "https://${DOMAIN}/api/lead" \
    --data '{"organization":"setup-test","full_name":"Setup Test","phone":"+7 (812) 000-00-00","email":"test@example.com","message":"Ping from server-setup-forms.sh","_setup":true}' || echo 000)

echo "HTTP $RESP → $(cat /tmp/lead-check.json 2>/dev/null || echo '<empty>')"

if [[ "$RESP" == "200" ]]; then
    log "✅ Endpoint работает. Тестовая заявка записана в ${LOG_DIR}/leads.jsonl"
    tail -n1 "${LOG_DIR}/leads.jsonl" || true
else
    warn "❗ Ответ $RESP. Проверь:"
    echo "   sudo tail -n 50 /var/log/nginx/error.log"
    echo "   sudo tail -n 50 /var/log/php${PHP_VERSION}-fpm.log"
fi

cat <<EOF

────────────────────────────────────────────────────────
 ДАЛЬШЕ РУКАМИ:
 1. Создать Telegram-бота у @BotFather → токен; написать боту /start.
    Получить chat.id: curl https://api.telegram.org/bot<TOKEN>/getUpdates
    Вписать TG_BOT_TOKEN и TG_CHAT_ID в ${ENV_FILE}
    Перезапустить php: systemctl restart php${PHP_VERSION}-fpm

 2. Настроить SMTP-релей для e-mail в /etc/msmtprc (пароль Yandex/Jino).
    После заполнения: chmod 600 /etc/msmtprc
    Тест:  echo "test" | msmtp -a default mail@oboron-it.ru

 3. Файл ${LOG_DIR}/leads.jsonl (640 www-data) — источник истины по заявкам.
    Чтение:  sudo tail -f ${LOG_DIR}/leads.jsonl

 4. Если форма не шлёт (CORS/HTTPS/путь), смотреть
    /var/log/nginx/${DOMAIN}.access.log и php-fpm log.
────────────────────────────────────────────────────────
EOF
