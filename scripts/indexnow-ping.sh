#!/usr/bin/env bash
# indexnow-ping.sh — принудительная переиндексация в Яндекс + Bing через IndexNow.
#
# Запуск с macOS / Linux:
#   bash <(curl -fsSL https://raw.githubusercontent.com/alamangart0011/desktop-tutorial/main/scripts/indexnow-ping.sh)
#
# Что делает:
#   1. Для каждого из 6 хостов пингует Yandex IndexNow + Bing/Microsoft IndexNow.
#   2. Передаёт список URL: /, /privacy, /thanks, /#pricing, /#faq, /#contact.
#   3. Yandex обычно переиндексирует в течение 24-72 часов.
#   4. Без ключа не работает — ключ уже лежит в public/<KEY>.txt на всех 6 сайтах.

set -e
export LANG=C LC_ALL=C

if [[ -t 1 ]]; then
    GRN="\033[0;32m"; RED="\033[0;31m"; YEL="\033[0;33m"; BLU="\033[0;34m"
    BLD="\033[1m"; RST="\033[0m"
else
    GRN=""; RED=""; YEL=""; BLU=""; BLD=""; RST=""
fi

hdr() { printf "\n${BLD}${BLU}==> %s${RST}\n" "$*"; }
ok()  { printf "  ${GRN}✓${RST} %s\n" "$*"; }
bad() { printf "  ${RED}✗${RST} %s\n" "$*"; }

KEY="b2f3e9c5a1d84fe9a7c0d6e1f4b2a8d3"
HOSTS=(gisprof.ru gisprofilaktika.ru pp411.ru profilaktika-spb.ru spb-gis.ru xn---411-k4d4a4d.xn--p1ai)
# Якорные секции — Яндекс обрабатывает #anchor как самостоятельную цель IndexNow.
# Включаем все смысловые блоки: квиз, УЗ2, калькулятор риска, видео, пакеты, FAQ, кейсы.
PATHS=(
    /
    /#quiz
    /#uz2
    /#risk
    /#how-it-works
    /#offer-7d
    /#pricing
    /#cases
    /#guarantee
    /#faq
    /#contact
    /privacy
)

hdr "IndexNow — принудительная переиндексация 6 доменов"

TOTAL_OK=0
TOTAL_FAIL=0

for host in "${HOSTS[@]}"; do
    printf "\n  ${BLD}%s${RST}\n" "$host"

    # 1. Убедимся что ключевой файл доступен (это требование IndexNow)
    key_check=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 10 \
        "https://$host/$KEY.txt" 2>/dev/null || echo 000)
    if [[ "$key_check" != "200" ]]; then
        bad "key-file недоступен (HTTP $key_check) → IndexNow отклонит. Сайт не развёрнут?"
        ((TOTAL_FAIL++))
        continue
    fi

    # 2. Построим JSON с URL-списком
    urls_json=""
    for p in "${PATHS[@]}"; do
        urls_json="${urls_json}\"https://$host$p\","
    done
    urls_json="${urls_json%,}"

    payload=$(cat <<JSON
{"host":"$host","key":"$KEY","keyLocation":"https://$host/$KEY.txt","urlList":[$urls_json]}
JSON
)

    # 3. Yandex IndexNow
    yandex_code=$(curl -sS -o /tmp/indexnow-yandex.log -w "%{http_code}" --max-time 15 \
        -X POST -H "Content-Type: application/json" \
        -d "$payload" "https://yandex.com/indexnow" 2>/dev/null || echo 000)
    if [[ "$yandex_code" == "200" || "$yandex_code" == "202" ]]; then
        ok "Yandex → HTTP $yandex_code (принято)"
        ((TOTAL_OK++))
    else
        bad "Yandex → HTTP $yandex_code — $(head -c 120 /tmp/indexnow-yandex.log 2>/dev/null)"
        ((TOTAL_FAIL++))
    fi

    # 4. Bing / Microsoft IndexNow (бонусом — вдруг бинг в Яндексе)
    bing_code=$(curl -sS -o /tmp/indexnow-bing.log -w "%{http_code}" --max-time 15 \
        -X POST -H "Content-Type: application/json" \
        -d "$payload" "https://api.indexnow.org/indexnow" 2>/dev/null || echo 000)
    if [[ "$bing_code" == "200" || "$bing_code" == "202" ]]; then
        ok "Bing/IndexNow.org → HTTP $bing_code"
    else
        printf "  · Bing → HTTP $bing_code (не критично)\n"
    fi
done

hdr "ИТОГО"
printf "  Yandex-пингов успешно: ${GRN}%d${RST} · провалено: ${RED}%d${RST}\n" "$TOTAL_OK" "$TOTAL_FAIL"
printf "\n  Яндекс обычно обрабатывает IndexNow-запрос в течение 24-72 часов.\n"
printf "  Проверить результат можно в Яндекс.Вебмастере → 'Обход сайта' → 'Переобход страниц'.\n"
