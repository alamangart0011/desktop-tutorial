#!/usr/bin/env bash
# deploy-now.sh — ОДНА команда для полной автоматизации.
#
# Что делает:
#   1) Собирает все 6 вариантов локально  (scripts/build-all-variants.sh)
#   2) Пушит dist/ в orphan-ветку site-variants на origin
#   3) SSH на VPS и запускает remote-bootstrap.sh (ставит php-fpm,
#      получает LE-сертификаты, разворачивает nginx multi-domain,
#      ставит cron на автоподхват).
#
# Использование:
#   VPS=root@72.56.9.195 bash scripts/deploy-now.sh
# или передать хост первым аргументом:
#   bash scripts/deploy-now.sh root@72.56.9.195

set -euo pipefail
cd "$(dirname "$0")/.."

VPS="${1:-${VPS:-}}"
[[ -n "$VPS" ]] || { echo "Укажи VPS: bash $0 root@72.56.9.195" >&2; exit 1; }

REPO_URL="$(git remote get-url origin)"
MAIN_BRANCH="${MAIN_BRANCH:-main}"

echo "════════════════════════════════════════════════════"
echo " 1/3 · Локальная сборка 6 вариантов"
echo "════════════════════════════════════════════════════"
bash scripts/build-all-variants.sh

echo ""
echo "════════════════════════════════════════════════════"
echo " 2/3 · Push ветки site-variants"
echo "════════════════════════════════════════════════════"

# Собираем orphan-ветку со статикой всех 6 сайтов
TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

cp -r dist/. "$TMPDIR/dist/"
cd "$TMPDIR"
git init -q
git checkout -b site-variants -q
git config user.email deploy-bot@gisprof.ru
git config user.name  "gisprof-deploy-bot"
git add -A
git commit -q -m "build(variants): $(date -u +%F-%H%MZ)"
git remote add origin "$REPO_URL"
git push -f -u origin site-variants 2>&1 | tail -5

cd - >/dev/null

# Сначала убедимся, что main запушен (PHP-handler, скрипты)
git push origin "$MAIN_BRANCH" 2>&1 | tail -3 || true

echo ""
echo "════════════════════════════════════════════════════"
echo " 3/3 · Запуск remote-bootstrap.sh на $VPS"
echo "════════════════════════════════════════════════════"

# Копируем локальный remote-bootstrap.sh на VPS (репо может быть приватным)
scp -o StrictHostKeyChecking=accept-new \
    scripts/server/remote-bootstrap.sh \
    "$VPS:/root/remote-bootstrap.sh"

ssh -o StrictHostKeyChecking=accept-new "$VPS" \
    "VPS_REPO_URL='$REPO_URL' bash /root/remote-bootstrap.sh"

echo ""
echo "════════════════════════════════════════════════════"
echo " DONE"
echo "════════════════════════════════════════════════════"
echo "Проверь: https://gisprof.ru/  и далее по мере готовности DNS."
