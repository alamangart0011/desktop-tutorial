#!/usr/bin/env bash
# build-all-variants.sh — собирает все варианты сайта в dist/<host>/
# Использование:   bash scripts/build-all-variants.sh
#
# Переменные окружения (опционально):
#   VARIANTS="main pp411"   — только указанные варианты (по ключам из lib/variants.ts)
#   SKIP_CLEAN=1            — не чистить dist/ перед сборкой
#
# Итог: dist/<host>/… — готовые статические экспорты под nginx.
# На VPS потом запустить scripts/server/deploy-variants.sh.

set -eo pipefail
cd "$(dirname "$0")/.."

# Гарантируем pinned Next (из package.json) вместо автоподкачки latest через npx.
# Без этого на чистой машине npx стянет next@16 с Turbopack и упадёт на workspace-root.
if [ ! -d node_modules ] || [ ! -x node_modules/.bin/next ]; then
    echo "[install] npm install (первый запуск / нет node_modules)"
    npm install --no-audit --no-fund
fi
NEXT_BIN="./node_modules/.bin/next"

# Ключи variant'ов и их host'ы (параллельные массивы — совместимо с bash 3.2 macOS).
# Должны соответствовать VARIANTS в lib/variants.ts.
ALL_VARIANTS=(main           gisprofilaktika      pp411    gis411rf                          profilaktikaspb       spbgis)
ALL_HOSTS=(   gisprof.ru     gisprofilaktika.ru   pp411.ru xn----7sbab2ce0afk.xn--p1ai        profilaktika-spb.ru   spb-gis.ru)

if [ -n "${VARIANTS:-}" ]; then
    # shellcheck disable=SC2206
    TO_BUILD=($VARIANTS)
else
    TO_BUILD=("${ALL_VARIANTS[@]}")
fi

if [ -z "${SKIP_CLEAN:-}" ]; then
    rm -rf dist
fi
mkdir -p dist

find_host() {
    local v="$1" i
    for i in "${!ALL_VARIANTS[@]}"; do
        if [ "${ALL_VARIANTS[$i]}" = "$v" ]; then
            printf '%s' "${ALL_HOSTS[$i]}"
            return 0
        fi
    done
    return 1
}

for v in "${TO_BUILD[@]}"; do
    host=$(find_host "$v" || true)
    if [ -z "$host" ]; then
        echo "[skip] неизвестный variant: $v"
        continue
    fi
    echo ""
    echo "=== Сборка $v → $host ==="
    rm -rf .next out

    SITE_VARIANT="$v" \
        NEXT_PUBLIC_SITE_VARIANT="$v" \
        STATIC_EXPORT=1 \
        "$NEXT_BIN" build

    target="dist/$host"
    rm -rf "$target"
    mv out "$target"

    # CNAME и служебные файлы
    echo "$host" > "$target/CNAME"
    echo "[ok] $target"
done

echo ""
echo "— — —"
du -sh dist/* 2>/dev/null || true
echo ""
echo "Готовые артефакты в dist/<host>/"
echo "На VPS: scripts/server/deploy-variants.sh выкатит их по /home/deploy/sites/<host>/"
