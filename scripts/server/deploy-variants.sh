#!/usr/bin/env bash
# deploy-variants.sh — раскладывает пересобранные лендинги по docroots VPS.
#
# Сценарий работы:
#   1) build-all-variants.sh (локально) собирает dist/<host>/
#   2) CI/git push — кладёт содержимое dist/ в ветку `site-variants` репо.
#   3) На VPS cron-задача пулит ветку `site-variants` в /opt/gisprof-variants.
#   4) Этот скрипт rsync'ит /opt/gisprof-variants/dist/<host>/ → /home/deploy/sites/<host>/
#
# Требует: rsync. Сохраняет права deploy:www-data.

set -euo pipefail

SRC="${SRC:-/opt/gisprof-variants/dist}"
DEST_BASE="${DEST_BASE:-/home/deploy/sites}"
OWNER="${OWNER:-deploy:www-data}"

if [[ ! -d "$SRC" ]]; then
    echo "Нет исходника: $SRC" >&2
    echo "Сделай: git clone -b site-variants <repo> $SRC (или git pull там же)" >&2
    exit 1
fi

mkdir -p "$DEST_BASE"

shopt -s nullglob
for dir in "$SRC"/*/; do
    host=$(basename "$dir")
    target="$DEST_BASE/$host"
    mkdir -p "$target"
    rsync -a --delete "$dir" "$target/"
    chown -R "$OWNER" "$target"
    find "$target" -type d -exec chmod 755 {} \;
    find "$target" -type f -exec chmod 644 {} \;
    echo "[ok] $host → $target"
done

echo ""
echo "Проверка конфигов nginx:"
nginx -t && systemctl reload nginx
echo "✓ Deploy complete."
