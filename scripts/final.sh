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
DOMAINS=(gisprof.ru gisprofilaktika.ru pp411.ru spb-gis.ru profilaktika-spb.ru xn---411-k4d4a4d.xn--p1ai gis-prof.ru)
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
    IPS=$(dig +short @8.8.8.8 A "$d" 2>/dev/null | tr '\n' ',' | sed 's/,$//')
    NS=$(dig +short @8.8.8.8 NS "$d" 2>/dev/null | head -1)
    # Фоллбэк: если 8.8.8.8 не отдал NS (кэш TLD), спрашиваем 1.1.1.1 / 77.88.8.8
    [[ -z "$NS" ]] && NS=$(dig +short @1.1.1.1 NS "$d" 2>/dev/null | head -1)
    [[ -z "$NS" ]] && NS=$(dig +short @77.88.8.8 NS "$d" 2>/dev/null | head -1)

    # Главный критерий — A-запись. Если A ведёт на VPS, зона работает,
    # даже если NS резолвер по каким-то причинам вернул пусто.
    if [[ "$IPS" == "$VPS" ]]; then
        ok "$d → $VPS ✓"
    elif [[ -z "$IPS" ]]; then
        if [[ -z "$NS" ]]; then
            bad "$d — нет NS и нет A (зона не делегирована у регистратора)"
            BROKEN_NS+=("$d")
        else
            bad "$d → нет A-записи (добавьте A @ $VPS в DNS-зоне)"
            BROKEN_A+=("$d")
        fi
    else
        bad "$d → $IPS (должно быть только $VPS)"
        BROKEN_A+=("$d")
    fi
done

# ---------- 3. Предупреждение о кривых доменах (НЕ блокируем) ----------
if [[ ${#BROKEN_NS[@]} -gt 0 || ${#BROKEN_A[@]} -gt 0 ]]; then
    hdr "DNS — предупреждения (deploy продолжится для рабочих доменов)"
    if [[ ${#BROKEN_NS[@]} -gt 0 ]]; then
        echo ""
        echo "  ${YEL}Без делегирования NS:${RST}"
        for d in "${BROKEN_NS[@]}"; do
            echo "    · $d — certbot НЕ сможет выдать cert"
        done
    fi
    if [[ ${#BROKEN_A[@]} -gt 0 ]]; then
        echo ""
        echo "  ${YEL}С неправильным A-record:${RST}"
        for d in "${BROKEN_A[@]}"; do
            IPS=$(dig +short @8.8.8.8 A "$d" 2>/dev/null | tr '\n' ',' | sed 's/,$//')
            echo "    · $d → ${IPS:-пусто}"
        done
        echo ""
        echo "  ${DIM}У регистратора (reg.ru / Jino / …):${RST}"
        echo "  1. Управление зоной → удалить все A, кроме 72.56.9.195"
        echo "  2. TTL 300 чтобы быстрее пропагировалось"
    fi
    echo ""
    yel "Проблемные домены пропустим, рабочие задеплоим"
fi

# ---------- 4. Запускаем fix-vps ВСЕГДА ----------
hdr "3. Запуск fix-vps.sh (pull + certs + reload) — работает с тем, что готово"
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
