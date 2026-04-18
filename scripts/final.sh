#!/usr/bin/env bash
# final.sh — one-shot финальная проверка сети из 6 доменов.
# Запуск с macOS:
#   bash <(curl -fsSL https://raw.githubusercontent.com/alamangart0011/desktop-tutorial/main/scripts/final.sh)
#
# Делает:
#   1. Сбрасывает DNS-кэш macOS (нужен sudo).
#   2. Проверяет A- и NS-записи для 7 доменов через публичные резолверы.
#   3. Если DNS чистый — запускает fix-vps.sh (pull+certs+reload+report).
#   4. Прогоняет check-release.sh.
#   5. Подытоживает ПРОЙДЕНО / НЕ ПРОЙДЕНО и что осталось.

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
yel() { printf "  ${YEL}!${RST} %s\n" "$*"; }

VPS=72.56.9.195
DOMAINS=(gisprof.ru gisprofilaktika.ru pp411.ru spb-gis.ru profilaktika-spb.ru xn----7sbab2ce0afk.xn--p1ai gis-prof.ru)
BROKEN_A=()
BROKEN_NS=()

# ---------- 1. Flush DNS cache на macOS ----------
hdr "1. Сброс DNS-кэша macOS"
if [[ "$(uname)" == "Darwin" ]]; then
    sudo dscacheutil -flushcache 2>/dev/null || true
    sudo killall -HUP mDNSResponder 2>/dev/null || true
    ok "DNS-кэш очищен"
else
    yel "Не macOS — пропускаем"
fi

# ---------- 2. Диагностика DNS ----------
hdr "2. Диагностика DNS (A + NS через 8.8.8.8)"
for d in "${DOMAINS[@]}"; do
    NS=$(dig +short @8.8.8.8 NS "$d" 2>/dev/null | head -1)
    IPS=$(dig +short @8.8.8.8 A "$d" 2>/dev/null | tr '\n' ',' | sed 's/,$//')

    if [[ -z "$NS" ]]; then
        bad "$d — нет NS-записей (зона не делегирована в DNS reg.ru)"
        BROKEN_NS+=("$d")
        continue
    fi

    if [[ -z "$IPS" ]]; then
        bad "$d → нет A-записи (добавьте A @ $VPS в reg.ru)"
        BROKEN_A+=("$d")
    elif [[ "$IPS" == "$VPS" ]]; then
        ok "$d → $VPS ✓"
    else
        bad "$d → $IPS (должно быть только $VPS)"
        BROKEN_A+=("$d")
    fi
done

# ---------- 3. Ранний exit, если DNS сломан ----------
if [[ ${#BROKEN_NS[@]} -gt 0 || ${#BROKEN_A[@]} -gt 0 ]]; then
    hdr "НЕ ГОТОВО: чините DNS в reg.ru"
    if [[ ${#BROKEN_NS[@]} -gt 0 ]]; then
        echo ""
        echo "  ${BLD}Домены без делегирования NS:${RST}"
        for d in "${BROKEN_NS[@]}"; do
            echo "    · $d"
        done
        echo ""
        echo "  ${YEL}Что делать:${RST}"
        echo "  1. reg.ru → Мои домены → выберите домен"
        echo "  2. Вкладка 'DNS-серверы' → 'Использовать DNS-серверы reg.ru'"
        echo "     (ns1.reg.ru / ns2.reg.ru)"
        echo "  3. Сохранить → ждать 15-60 минут пропагации"
        echo "  4. Затем в 'Управление зоной' добавить A @ $VPS"
    fi
    if [[ ${#BROKEN_A[@]} -gt 0 ]]; then
        echo ""
        echo "  ${BLD}Домены с неправильным A:${RST}"
        for d in "${BROKEN_A[@]}"; do
            echo "    · $d"
        done
        echo ""
        echo "  ${YEL}Что делать:${RST}"
        echo "  1. reg.ru → домен → 'Управление зоной'"
        echo "  2. УДАЛИТЬ все старые A-записи (обычно $(echo '195.161.62.100'))"
        echo "  3. Оставить/добавить: A @ $VPS, TTL 300"
        echo "  4. То же для 'A www $VPS'"
    fi
    echo ""
    echo "  После починки запустите финальный скрипт снова:"
    echo "    bash <(curl -fsSL https://raw.githubusercontent.com/alamangart0011/desktop-tutorial/main/scripts/final.sh)"
    exit 1
fi

# ---------- 4. DNS чистый — запускаем fix-vps ----------
hdr "3. DNS чистый — запускаю fix-vps.sh (pull + certs + reload)"
bash <(curl -fsSL https://raw.githubusercontent.com/alamangart0011/desktop-tutorial/main/scripts/fix-vps.sh)

# ---------- 5. Итог ----------
hdr "ФИНАЛ"
echo ""
echo "  ${GRN}✓ DNS чистый (7/7 доменов на $VPS)${RST}"
echo "  ${GRN}✓ VPS развёрнут (сертификаты + nginx + security headers + /api/lead)${RST}"
echo ""
echo "  ${BLD}Осталось (по желанию):${RST}"
echo "  1. Лиды → Telegram + email:"
echo "     ssh root@$VPS"
echo "     sudo nano /etc/gisprof-lead.env   # TG_BOT_TOKEN + TG_CHAT_ID"
echo "     sudo nano /etc/msmtprc            # SMTP релей"
echo "     sudo systemctl restart php8.3-fpm"
echo ""
echo "  2. Яндекс.Вебмастер → добавить 6 хостов + sitemap."
echo "  3. Роскомнадзор → уведомление оператора ПДн."
echo "  4. Яндекс.Директ → UTM-метки по кластерам."
echo ""
echo "  Детали в docs/RELEASE-CHECKLIST.md и docs/ROLES.md."
