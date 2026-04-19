#!/usr/bin/env bash
# monitor.sh — cron-friendly health monitor for the 6-domain network.
#
# Запуск по cron на VPS:
#   # каждые 5 минут
#   */5 * * * * /opt/gisprof-src/scripts/monitor.sh --quiet || /usr/bin/mail -s "GISPROF ALERT" admin@oboron-it.ru < /tmp/monitor.log
#
# Или ручной запуск:
#   bash scripts/monitor.sh           # с выводом
#   bash scripts/monitor.sh --quiet   # молча, exit 1 если проблемы
#
# Проверяет: HTTPS 200, TLS expiry (warn <14 дней), /api/lead, disk space, nginx up.

set +e
export LANG=C LC_ALL=C

QUIET=0
[[ "${1:-}" == "--quiet" ]] && QUIET=1

LOG=/tmp/monitor.log
: > "$LOG"

DOMAINS=(
    gisprof.ru
    gisprofilaktika.ru
    pp411.ru
    xn---411-k4d4a4d.xn--p1ai
    profilaktika-spb.ru
    spb-gis.ru
)

FAILS=()

log()   { echo "$*" | tee -a "$LOG" >/dev/null; [[ $QUIET -eq 0 ]] && echo "$*"; }
alert() { FAILS+=("$*"); log "✗ $*"; }
ok()    { log "✓ $*"; }

# 1) HTTPS 200 на каждом домене
for d in "${DOMAINS[@]}"; do
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://$d/" 2>/dev/null)
    [[ "$code" == "200" ]] && ok "$d HTTP 200" || alert "$d HTTP $code"
done

# 2) TLS expiry (warn <14 дней, fail <3 дня)
for d in "${DOMAINS[@]}"; do
    exp=$(echo | openssl s_client -servername "$d" -connect "$d:443" 2>/dev/null \
        | openssl x509 -noout -enddate 2>/dev/null | sed 's/notAfter=//')
    if [[ -z "$exp" ]]; then
        alert "$d TLS handshake failed"
        continue
    fi
    exp_s=$(date -d "$exp" +%s 2>/dev/null || date -j -f "%b %d %T %Y %Z" "$exp" +%s 2>/dev/null)
    days=$(( (exp_s - $(date +%s)) / 86400 ))
    if (( days < 3 )); then
        alert "$d TLS expires in $days days — CERTBOT RENEW NOW"
    elif (( days < 14 )); then
        alert "$d TLS expires in $days days — schedule renewal"
    else
        ok "$d TLS $days days left"
    fi
done

# 3) /api/lead принимает пустое тело (не 5xx)
api_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -X POST \
    -H "Content-Type: application/json" --data '{}' \
    "https://gisprof.ru/api/lead" 2>/dev/null)
case "$api_code" in
    400|422|429) ok "/api/lead → $api_code (живой)" ;;
    5*|000)      alert "/api/lead → $api_code (PHP-FPM упал?)" ;;
    *)           alert "/api/lead → $api_code (неожиданный код)" ;;
esac

# 4) Диск VPS — только если мы на VPS (есть /opt/gisprof-src)
if [[ -d /opt/gisprof-src ]]; then
    use=$(df / | awk 'NR==2 {gsub("%","",$5); print $5}')
    if (( use > 90 )); then
        alert "disk / usage ${use}% — нужно чистить"
    elif (( use > 80 )); then
        log "! disk / usage ${use}% — скоро забьётся"
    else
        ok "disk / usage ${use}%"
    fi

    # nginx активен
    if systemctl is-active --quiet nginx 2>/dev/null; then
        ok "nginx active"
    else
        alert "nginx NOT active — systemctl start nginx"
    fi

    # PHP-FPM активен
    php_service=$(systemctl list-units --type=service --state=active 2>/dev/null | grep -oE 'php[0-9.]+-fpm' | head -1)
    if [[ -n "$php_service" ]] && systemctl is-active --quiet "$php_service" 2>/dev/null; then
        ok "$php_service active"
    else
        alert "PHP-FPM NOT active"
    fi
fi

# ---
if (( ${#FAILS[@]} > 0 )); then
    log ""
    log "=== ALERT: ${#FAILS[@]} проблем ==="
    for f in "${FAILS[@]}"; do log "  ✗ $f"; done
    exit 1
fi

[[ $QUIET -eq 0 ]] && echo "" && echo "✓ All green"
exit 0
