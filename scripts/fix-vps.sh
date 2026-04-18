#!/usr/bin/env bash
# fix-vps.sh — chain: detect IP → SSH → git pull → bootstrap → verify.
# Запуск с macOS:
#   bash <(curl -fsSL https://raw.githubusercontent.com/alamangart0011/desktop-tutorial/main/scripts/fix-vps.sh)
#
# Переменные (опционально):
#   VPS=<IP>           — явно задать IP (иначе берётся из DNS gisprof.ru)
#   SSH_USER=root      — пользователь SSH (по умолчанию root)
#   SSH_KEY=~/.ssh/id_rsa  — SSH-ключ (иначе будет запрошен пароль)

set -e
export LANG=C LC_ALL=C

if [[ -t 1 ]]; then
    GRN="\033[0;32m"; RED="\033[0;31m"; YEL="\033[0;33m"; BLU="\033[0;34m"
    BLD="\033[1m"; DIM="\033[2m"; RST="\033[0m"
else
    GRN=""; RED=""; YEL=""; BLU=""; BLD=""; DIM=""; RST=""
fi

hdr() { printf "\n${BLD}${BLU}==> %s${RST}\n" "$*"; }
ok()  { printf "  ${GRN}✓${RST} %s\n" "$*"; }
bad() { printf "  ${RED}✗${RST} %s\n" "$*"; }
yel() { printf "  ${YEL}!${RST} %s\n" "$*"; }

SSH_USER="${SSH_USER:-root}"

# ---------- 1. Определяем IP VPS ----------
hdr "1. Определяю IP VPS"
VPS="${VPS:-}"
if [[ -z "$VPS" ]]; then
    VPS=$(dig +short gisprof.ru A 2>/dev/null | grep -E '^[0-9.]+$' | head -1)
fi
if [[ -z "$VPS" ]]; then
    VPS=$(host gisprof.ru 2>/dev/null | awk '/has address/ {print $4; exit}')
fi
if [[ -z "$VPS" ]]; then
    read -p "  Введите IP VPS вручную: " VPS
fi
[[ -z "$VPS" ]] && { bad "IP не задан"; exit 1; }
ok "IP VPS: ${BLD}$VPS${RST} (пользователь: $SSH_USER)"

# ---------- 2. Проверка SSH ----------
hdr "2. Проверка SSH-соединения"
SSH_OPTS="-o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=30"
[[ -n "${SSH_KEY:-}" ]] && SSH_OPTS="$SSH_OPTS -i $SSH_KEY"

if ssh $SSH_OPTS -o BatchMode=yes "$SSH_USER@$VPS" true 2>/dev/null; then
    ok "SSH работает (passwordless ключ настроен)"
else
    yel "SSH попросит пароль (это нормально, введите когда скажет)"
fi

# ---------- 3. Запуск bootstrap на VPS ----------
hdr "3. Обновление кода и запуск bootstrap на VPS (2–4 минуты)"
ssh $SSH_OPTS "$SSH_USER@$VPS" 'bash -s' << 'REMOTE_SCRIPT'
set -e
export DEBIAN_FRONTEND=noninteractive

G="\033[0;32m"; Y="\033[0;33m"; R="\033[0;31m"; B="\033[1m"; N="\033[0m"
h() { printf "\n${B}[vps] %s${N}\n" "$*"; }

h "pull latest code → /opt/gisprof-src"
if [ -d /opt/gisprof-src/.git ]; then
    cd /opt/gisprof-src
    git fetch origin main --quiet
    git reset --hard origin/main
    echo "  HEAD: $(git log -1 --oneline)"
else
    git clone --quiet https://github.com/alamangart0011/desktop-tutorial.git /opt/gisprof-src
    cd /opt/gisprof-src
fi

h "pull latest artifacts → /opt/gisprof-variants"
if [ -d /opt/gisprof-variants/.git ]; then
    cd /opt/gisprof-variants
    git fetch origin site-variants --quiet
    git reset --hard origin/site-variants
else
    git clone --quiet --branch site-variants https://github.com/alamangart0011/desktop-tutorial.git /opt/gisprof-variants
fi

h "run remote-bootstrap.sh (ставит nginx-конфиг с CSP, выдаёт недостающие сертификаты)"
cd /opt/gisprof-src
export LEAD_EMAIL="${LEAD_EMAIL:-mail@oboron-it.ru}"
bash scripts/server/remote-bootstrap.sh 2>&1 | tail -80 || true

h "nginx -t"
nginx -t 2>&1 | tail -5

h "reload nginx"
systemctl reload nginx && echo "  nginx reloaded OK"

h "certbot certificates — summary"
certbot certificates 2>&1 | grep -E "(Certificate Name|Domains|Expiry Date|VALID|INVALID)" | head -40

h "security headers on gisprof.ru"
curl -sI --max-time 5 https://gisprof.ru/ | grep -iE "(^HTTP|^content-security-policy|^x-frame-options|^permissions-policy|^strict-transport|^referrer-policy|^server:)" | head -10

h "test /api/lead"
curl -s -o /dev/null -w "HTTP %{http_code}\n" -X POST -H "Content-Type: application/json" -d '{}' --max-time 5 https://gisprof.ru/api/lead

h "done on VPS"
REMOTE_SCRIPT

# ---------- 4. Локальная проверка ----------
hdr "4. Локальная проверка (check-release)"
bash <(curl -fsSL https://raw.githubusercontent.com/alamangart0011/desktop-tutorial/main/scripts/check-release.sh) || true

hdr "ГОТОВО"
printf "Если остались ${RED}КРИТИЧЕСКИЕ${RST}, вероятно DNS 2 доменов не указан на %s.\n" "$VPS"
printf "Проверьте в кабинете регистратора A-записи для:\n"
printf "  ${BLD}gisprofilaktika.ru${RST}, ${BLD}xn----7sbab2ce0afk.xn--p1ai${RST} (гис-411.рф), ${BLD}spb-gis.ru${RST}\n"
printf "Должны быть: ${BLD}A → %s${RST} (TTL 300).\n" "$VPS"
