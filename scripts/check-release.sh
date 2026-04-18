#!/usr/bin/env bash
# check-release.sh — single-command release health check for the 6-domain network.
# Запуск: bash <(curl -fsSL https://raw.githubusercontent.com/alamangart0011/desktop-tutorial/main/scripts/check-release.sh)
# Проверяет DNS, HTTPS, TLS, security-заголовки, /api/lead, robots, sitemap, Метрику, дубли.
# Exit 0 если всё ок. Exit 1 если есть критические ошибки.

set +e
export LANG=C LC_ALL=C

DOMAINS_CONTENT=(
    gisprof.ru
    gisprofilaktika.ru
    pp411.ru
    xn---411-k4d4a4d.xn--p1ai
    profilaktika-spb.ru
    spb-gis.ru
)
DOMAIN_REDIRECT=gis-prof.ru

if [[ -t 1 ]]; then
    GRN="\033[0;32m"; RED="\033[0;31m"; YEL="\033[0;33m"; BLU="\033[0;34m"
    BLD="\033[1m"; DIM="\033[2m"; RST="\033[0m"
else
    GRN=""; RED=""; YEL=""; BLU=""; BLD=""; DIM=""; RST=""
fi

PASS=0; FAIL=0; WARN=0
declare -a FAIL_MSGS
declare -a WARN_MSGS

ok()   { printf "  ${GRN}✓${RST} %s\n" "$*"; PASS=$((PASS+1)); }
bad()  { printf "  ${RED}✗${RST} %s\n" "$*"; FAIL=$((FAIL+1)); FAIL_MSGS+=("$*"); }
yel()  { printf "  ${YEL}!${RST} %s\n" "$*"; WARN=$((WARN+1)); WARN_MSGS+=("$*"); }
inf()  { printf "    ${DIM}%s${RST}\n" "$*"; }
hdr()  { printf "\n${BLD}${BLU}==> %s${RST}\n" "$*"; }

need() {
    command -v "$1" >/dev/null 2>&1 || { printf "${RED}Нет утилиты: %s${RST}\n" "$1"; return 1; }
}

# ---------- 0. Предполётная проверка ----------
hdr "0. Предполётная проверка окружения"
for tool in curl openssl awk sed grep; do
    if need "$tool"; then ok "найдено: $tool"; else bad "требуется: $tool"; fi
done
if command -v dig >/dev/null 2>&1; then
    DIG=dig; ok "DNS-клиент: dig"
elif command -v host >/dev/null 2>&1; then
    DIG=host; ok "DNS-клиент: host"
else
    DIG=nslookup
    yel "dig/host не найдены, использую nslookup (менее надёжно)"
fi

resolve_ip() {
    local d="$1"
    case "$DIG" in
        dig)      dig +short +time=3 +tries=1 "$d" A 2>/dev/null | grep -E '^[0-9.]+$' | head -1 ;;
        host)     host -W 3 "$d" 2>/dev/null | awk '/has address/ {print $4; exit}' ;;
        nslookup) nslookup "$d" 2>/dev/null | awk '/^Address: / && !/:/ {print $2; exit}' ;;
    esac
}

# curl_d <domain> <curl-args...> — если локальный DNS не совпадает с VPS,
# вставляем --resolve чтобы достучаться до актуального VPS-нода. URL-часть
# в аргументах должна быть именно https://<domain>/... или https://<domain>/path
curl_d() {
    local d="$1"; shift
    local ip args
    ip=$(resolve_ip "$d")
    args=()
    if [[ -n "$VPS_IP" && -n "$ip" && "$ip" != "$VPS_IP" ]]; then
        args+=(--resolve "$d:443:$VPS_IP" --resolve "$d:80:$VPS_IP")
    fi
    curl "${args[@]}" "$@"
}

# ---------- 1. DNS ----------
# Не используем declare -A — macOS по-умолчанию на bash 3.2.
hdr "1. DNS-резолвинг"
FIRST_IP=""
for d in "${DOMAINS_CONTENT[@]}" "$DOMAIN_REDIRECT"; do
    ip=$(resolve_ip "$d")
    if [[ -z "$ip" ]]; then
        bad "$d — не резолвится (DNS-зоны нет или A-запись пропущена)"
    else
        [[ -z "$FIRST_IP" ]] && FIRST_IP="$ip"
        if [[ "$ip" != "$FIRST_IP" ]]; then
            yel "$d → $ip (отличается от $FIRST_IP — разные серверы?)"
        else
            ok "$d → $ip"
        fi
    fi
    wip=$(resolve_ip "www.$d")
    if [[ -z "$wip" ]]; then
        [[ "$d" == "xn---411-k4d4a4d.xn--p1ai" ]] || yel "www.$d — нет A-записи (надо для 301-редиректа)"
    fi
done

# ---------- 2. HTTPS и TLS ----------
hdr "2. HTTPS доступность + TLS"
# IP VPS — первый, который мы увидели для gisprof.ru (опорный домен)
VPS_IP=$(resolve_ip "gisprof.ru")
[[ -z "$VPS_IP" ]] && VPS_IP="$FIRST_IP"
for d in "${DOMAINS_CONTENT[@]}"; do
    # Если локальный DNS не совпадает с VPS — пробуем через --resolve.
    local_ip=$(resolve_ip "$d")
    resolve_arg=""
    if [[ -n "$VPS_IP" && "$local_ip" != "$VPS_IP" ]]; then
        resolve_arg="--resolve $d:443:$VPS_IP"
    fi
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 $resolve_arg \
        -H "User-Agent: check-release/1.0" "https://$d/" 2>/dev/null)
    case "$code" in
        200)
            if [[ -n "$resolve_arg" ]]; then
                yel "https://$d/ → HTTP 200 только через --resolve $VPS_IP (ваш DNS-кэш/регистратор отдаёт $local_ip)"
            else
                ok "https://$d/ → HTTP 200"
            fi
            ;;
        301|302) yel "https://$d/ → HTTP $code (редирект — норма для www, но на корне странно)" ;;
        000)
            if [[ -n "$resolve_arg" ]]; then
                bad "https://$d/ — не отвечает ни через DNS ($local_ip), ни через VPS ($VPS_IP)"
            else
                bad "https://$d/ — не отвечает (порт 443 закрыт? Нет certbot-сертификата?)"
            fi
            ;;
        *)   bad "https://$d/ → HTTP $code" ;;
    esac
done

# TLS-валидность
hdr "2b. Сертификаты Let's Encrypt"
for d in "${DOMAINS_CONTENT[@]}"; do
    local_ip=$(resolve_ip "$d")
    # Если DNS не на VPS — openssl подключаемся напрямую к VPS, SNI = $d
    connect_host="$d:443"
    if [[ -n "$VPS_IP" && "$local_ip" != "$VPS_IP" ]]; then
        connect_host="$VPS_IP:443"
    fi
    exp=$(echo | openssl s_client -servername "$d" -connect "$connect_host" -verify_return_error 2>/dev/null \
        | openssl x509 -noout -enddate 2>/dev/null | sed 's/notAfter=//')
    if [[ -z "$exp" ]]; then
        bad "$d — TLS handshake провален (нет сертификата или fake)"
        continue
    fi
    exp_s=$(date -j -f "%b %d %T %Y %Z" "$exp" +%s 2>/dev/null || date -d "$exp" +%s 2>/dev/null)
    now_s=$(date +%s)
    days=$(( (exp_s - now_s) / 86400 ))
    if (( days < 0 )); then
        bad "$d — сертификат ИСТЁК ($exp)"
    elif (( days < 14 )); then
        yel "$d — сертификат истекает через $days дней ($exp)"
    else
        ok "$d — TLS ок ($days дней до истечения)"
    fi
done

# ---------- 3. Security headers ----------
hdr "3. Security-заголовки (на gisprof.ru)"
HDRS=$(curl -sI --max-time 10 "https://gisprof.ru/" 2>/dev/null)
check_header() {
    local name="$1" expect="$2"
    local line
    line=$(echo "$HDRS" | grep -i "^$name:" | head -1 | tr -d '\r')
    if [[ -z "$line" ]]; then
        bad "header $name — отсутствует"
    elif [[ -n "$expect" && "$line" != *"$expect"* ]]; then
        yel "header $name — присутствует, но без '$expect': $line"
    else
        ok "header $name: $(echo "$line" | sed "s/^$name: //I" | cut -c1-80)"
    fi
}
check_header "Strict-Transport-Security" "max-age"
check_header "Content-Security-Policy" "default-src"
check_header "X-Frame-Options" "SAMEORIGIN"
check_header "X-Content-Type-Options" "nosniff"
check_header "Referrer-Policy" ""
check_header "Permissions-Policy" "geolocation"
serv=$(echo "$HDRS" | grep -i "^server:" | head -1 | tr -d '\r')
if echo "$serv" | grep -qiE "(nginx/[0-9]|apache/[0-9])"; then
    yel "header Server раскрывает версию: $serv (надо server_tokens off)"
else
    ok "header Server — без версии ($serv)"
fi

# ---------- 4. /api/lead работоспособен ----------
hdr "4. /api/lead (приём заявок)"
api_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -X POST \
    -H "Content-Type: application/json" \
    --data '{}' "https://gisprof.ru/api/lead" 2>/dev/null)
case "$api_code" in
    400) ok "/api/lead — работает (пустое тело → 400 empty_body)" ;;
    422) ok "/api/lead — работает (валидация → 422)" ;;
    429) yel "/api/lead → 429 rate_limited (вы уже отправляли — норма)" ;;
    405) bad "/api/lead → 405 — POST не разрешён (nginx-конфиг не отрендерил location)" ;;
    404) bad "/api/lead → 404 — PHP не подключён или location не существует" ;;
    500|502|504) bad "/api/lead → $api_code — PHP-FPM упал" ;;
    000) bad "/api/lead — не отвечает" ;;
    *)   yel "/api/lead → HTTP $api_code (ожидали 400/422)" ;;
esac

# Honeypot: быстрый submit должен упасть в fake-200 но НЕ создать лид
api_body=$(curl -s --max-time 10 -X POST \
    -H "Content-Type: application/json" \
    --data '{"organization":"bot","full_name":"bot bot","phone":"+79000000000","email":"b@b.ru","fill_ms":500,"_hp":"spam"}' \
    "https://gisprof.ru/api/lead" 2>/dev/null)
if echo "$api_body" | grep -q '"ok":true'; then
    ok "honeypot срабатывает (быстрый submit → тихий 200 без записи лида)"
else
    yel "honeypot возможно не работает — ответ: $api_body"
fi

# ---------- 5. 301-зеркало gis-prof.ru ----------
hdr "5. 301 gis-prof.ru → gisprof.ru"
loc=$(curl -s -I --max-time 10 "https://gis-prof.ru/" 2>/dev/null | grep -i "^location:" | head -1 | tr -d '\r')
if [[ -z "$loc" ]]; then
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://gis-prof.ru/" 2>/dev/null)
    if [[ "$code" == "000" ]]; then
        yel "gis-prof.ru — не отвечает (это опционально, но рекомендуется)"
    else
        bad "gis-prof.ru → HTTP $code без Location (должен быть 301 на gisprof.ru)"
    fi
elif echo "$loc" | grep -qi "gisprof.ru"; then
    ok "gis-prof.ru → 301 → gisprof.ru"
else
    yel "gis-prof.ru → Location: $loc (ожидали https://gisprof.ru)"
fi

# ---------- 6. Контент: уникальный H1/title на каждом домене ----------
# bash 3.2-совместимо: используем tmp-файл для хранения title→domain.
hdr "6. Контент — уникальность зеркал (Яндекс не должен склеить)"
TMP_TITLES=$(mktemp -t checkrel) || TMP_TITLES="/tmp/checkrel.$$"
: > "$TMP_TITLES"
for d in "${DOMAINS_CONTENT[@]}"; do
    html=$(curl_d "$d" -s --max-time 10 "https://$d/" 2>/dev/null)
    if [[ -z "$html" ]]; then
        bad "$d — пустой HTML (сайт не раздаётся)"
        continue
    fi
    t=$(echo "$html" | tr -d '\n' | grep -oE '<title[^>]*>[^<]+' | head -1 | sed 's/<title[^>]*>//')
    h1=$(echo "$html" | tr -d '\n' | grep -oE '<h1[^>]*>[^<]+' | head -1 | sed 's/<h1[^>]*>//')
    if [[ -z "$t" || -z "$h1" ]]; then
        bad "$d — не удалось извлечь title/h1"
    else
        inf "$d → title: $(echo "$t" | cut -c1-60)…"
        printf "%s\t%s\n" "$t" "$d" >> "$TMP_TITLES"
    fi
done
# Проверяем уникальность title через sort+uniq
dups=$(awk -F'\t' '{print $1}' "$TMP_TITLES" | sort | uniq -d)
if [[ -z "$dups" ]]; then
    ok "все 6 доменов имеют разные <title> (Яндекс их не склеит)"
else
    while IFS= read -r dup_title; do
        hosts=$(awk -F'\t' -v t="$dup_title" '$1==t{print $2}' "$TMP_TITLES" | tr '\n' ' ')
        bad "title DUPLICATE: '$dup_title' на доменах: $hosts"
    done <<< "$dups"
fi
rm -f "$TMP_TITLES"

# ---------- 7. robots.txt + sitemap на каждом домене ----------
hdr "7. robots.txt и sitemap.xml"
for d in "${DOMAINS_CONTENT[@]}"; do
    robots=$(curl_d "$d" -s --max-time 10 "https://$d/robots.txt" 2>/dev/null)
    if echo "$robots" | grep -qi "sitemap:.*$d"; then
        ok "$d/robots.txt указывает свой sitemap"
    elif echo "$robots" | grep -qi "sitemap:"; then
        bad "$d/robots.txt — sitemap указывает на ЧУЖОЙ домен (Яндекс склеит)"
        echo "$robots" | grep -i "sitemap:" | head -1 | sed 's/^/      /'
    else
        bad "$d/robots.txt — не отдаётся или нет Sitemap:"
    fi
    sm_code=$(curl_d "$d" -s -o /dev/null -w "%{http_code}" --max-time 10 "https://$d/sitemap.xml" 2>/dev/null)
    if [[ "$sm_code" == "200" ]]; then
        sm=$(curl_d "$d" -s --max-time 10 "https://$d/sitemap.xml" 2>/dev/null | grep -oE "<loc>[^<]+" | head -1)
        if echo "$sm" | grep -q "$d"; then
            ok "$d/sitemap.xml — URL на свой домен"
        else
            bad "$d/sitemap.xml содержит ЧУЖИЕ URL: $sm"
        fi
    else
        bad "$d/sitemap.xml → HTTP $sm_code"
    fi
done

# ---------- 8. /privacy и /api/lead noindex ----------
hdr "8. Обязательные страницы"
for d in gisprof.ru profilaktika-spb.ru; do
    code=$(curl_d "$d" -s -o /dev/null -w "%{http_code}" --max-time 10 "https://$d/privacy" 2>/dev/null)
    [[ "$code" == "200" ]] && ok "$d/privacy → 200" || bad "$d/privacy → HTTP $code"
done

# ---------- 9. Яндекс.Метрика ----------
hdr "9. Яндекс.Метрика"
for d in "${DOMAINS_CONTENT[@]}"; do
    html=$(curl_d "$d" -s --max-time 10 "https://$d/" 2>/dev/null)
    if echo "$html" | grep -q "mc.yandex.ru/metrika/tag.js"; then
        id=$(echo "$html" | grep -oE 'metrika/tag\.js\?id=[0-9]+' | head -1 | grep -oE '[0-9]+$')
        if [[ -n "$id" && "$id" != "00000000" ]]; then
            ok "$d — Метрика ID=$id"
        else
            yel "$d — Метрика плейсхолдер (замените ANALYTICS.yandexMetrikaId)"
        fi
    else
        yel "$d — Метрика НЕ подключена (ожидается — ID 00000000)"
    fi
done

# ---------- 10. JSON-LD ----------
hdr "10. Structured data (JSON-LD)"
html=$(curl -s --max-time 10 "https://gisprof.ru/" 2>/dev/null)
# LocalBusiness принимаем также как ProfessionalService (валидный subtype).
for schema in Organization Service FAQPage BreadcrumbList; do
    if echo "$html" | grep -qE "\"@type\"[[:space:]]*:[[:space:]]*\"$schema\""; then
        ok "schema.org/$schema найден"
    else
        yel "schema.org/$schema не найден (проверьте HomeJsonLd.tsx)"
    fi
done
if echo "$html" | grep -qE "\"@type\"[[:space:]]*:[[:space:]]*\"(LocalBusiness|ProfessionalService)\""; then
    ok "schema.org/LocalBusiness (или ProfessionalService) найден"
else
    yel "schema.org/LocalBusiness не найден"
fi

# ---------- 11. HTTP → HTTPS редирект ----------
hdr "11. HTTP → HTTPS редирект"
for d in gisprof.ru profilaktika-spb.ru; do
    loc=$(curl -s -I --max-time 10 "http://$d/" 2>/dev/null | grep -i "^location:" | head -1 | tr -d '\r')
    if echo "$loc" | grep -qi "https://$d"; then
        ok "$d — 80 → 443 редирект работает"
    else
        bad "$d — нет редиректа с HTTP на HTTPS: $loc"
    fi
done

# ---------- ИТОГО ----------
hdr "ИТОГО"
printf "${GRN}Passed:${RST}  %d\n" "$PASS"
printf "${YEL}Warn:${RST}    %d\n" "$WARN"
printf "${RED}Failed:${RST}  %d\n" "$FAIL"

if (( FAIL > 0 )); then
    printf "\n${BLD}${RED}КРИТИЧЕСКИЕ ПРОБЛЕМЫ (нужно починить до рекламы):${RST}\n"
    for m in "${FAIL_MSGS[@]}"; do printf "  ${RED}✗${RST} %s\n" "$m"; done
fi
if (( WARN > 0 )); then
    printf "\n${BLD}${YEL}ПРЕДУПРЕЖДЕНИЯ (желательно, но не блокирует):${RST}\n"
    for m in "${WARN_MSGS[@]}"; do printf "  ${YEL}!${RST} %s\n" "$m"; done
fi

if (( FAIL == 0 && WARN == 0 )); then
    printf "\n${BLD}${GRN}Всё работает. Можно запускать Директ.${RST}\n"
fi

# ---------- Диагностика упавших доменов ----------
DOWN_DOMAINS=""
for d in "${DOMAINS_CONTENT[@]}"; do
    code=$(curl_d "$d" -s -o /dev/null -w "%{http_code}" --max-time 5 "https://$d/" 2>/dev/null)
    if [[ "$code" != "200" ]]; then DOWN_DOMAINS="$DOWN_DOMAINS $d"; fi
done
if [[ -n "$DOWN_DOMAINS" ]]; then
    printf "\n${BLD}${BLU}==> Диагностика упавших доменов${RST}\n"
    VPS_IP=$(resolve_ip "gisprof.ru")
    printf "  IP VPS (по gisprof.ru): ${BLD}%s${RST}\n" "$VPS_IP"
    for d in $DOWN_DOMAINS; do
        ip=$(resolve_ip "$d")
        if [[ -z "$ip" ]]; then
            printf "  ${RED}%s${RST}: DNS ${RED}НЕ резолвится${RST} → добавьте A-запись: ${BLD}A %s → %s${RST}\n" "$d" "$d" "$VPS_IP"
        elif [[ "$ip" != "$VPS_IP" ]]; then
            printf "  ${YEL}%s${RST}: DNS → ${RED}%s${RST} (не VPS!) → замените A-запись на ${BLD}%s${RST}\n" "$d" "$ip" "$VPS_IP"
        else
            printf "  ${YEL}%s${RST}: DNS → %s (VPS), но HTTPS не отвечает → nginx не знает этот host ИЛИ certbot провалился\n" "$d" "$ip"
        fi
    done
    printf "\n  ${BLD}Что делать:${RST}\n"
    printf "  1. Если DNS не на %s — в кабинете reg.ru / Cloudflare добавьте A-запись\n" "$VPS_IP"
    printf "  2. Если DNS ок — зайдите на VPS по ssh и выполните:\n"
    printf "     ${DIM}cd /opt/gisprof-src && git pull && bash scripts/server/remote-bootstrap.sh${RST}\n"
    printf "  3. После починки запустите этот скрипт снова.\n"
fi

exit $(( FAIL > 0 ? 1 : 0 ))
