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

set -euo pipefail
cd "$(dirname "$0")/.."

# Ключи variant'ов должны соответствовать VARIANTS в lib/variants.ts
ALL_VARIANTS=(main gisprofilaktika pp411 gis411rf profilaktikaspb spbgis)

if [[ -n "${VARIANTS:-}" ]]; then
    read -r -a TO_BUILD <<<"$VARIANTS"
else
    TO_BUILD=("${ALL_VARIANTS[@]}")
fi

if [[ -z "${SKIP_CLEAN:-}" ]]; then
    rm -rf dist
fi
mkdir -p dist

# Пары ключ:host, должны соответствовать lib/variants.ts
declare -A HOSTS=(
    [main]="gisprof.ru"
    [gisprofilaktika]="gisprofilaktika.ru"
    [pp411]="pp411.ru"
    [gis411rf]="xn----7sbab2ce0afk.xn--p1ai"
    [profilaktikaspb]="profilaktika-spb.ru"
    [spbgis]="spb-gis.ru"
)

for v in "${TO_BUILD[@]}"; do
    host="${HOSTS[$v]:-}"
    if [[ -z "$host" ]]; then
        echo "[skip] неизвестный variant: $v"
        continue
    fi
    echo ""
    echo "=== Сборка $v → $host ==="
    rm -rf .next out

    SITE_VARIANT="$v" \
        NEXT_PUBLIC_SITE_VARIANT="$v" \
        STATIC_EXPORT=1 \
        npx next build

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
