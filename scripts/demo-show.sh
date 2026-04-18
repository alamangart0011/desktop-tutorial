#!/usr/bin/env bash
# demo-show.sh — локальный смоук-тест перед показом клиенту/руководству.
# Запускает dev-сервер, проверяет рендер ключевых маркеров, печатает короткий
# отчёт «можно показывать / есть проблема». Использование:
#
#   bash scripts/demo-show.sh           # запустить и проверить
#   bash scripts/demo-show.sh --keep    # оставить dev-сервер работать после проверки
#
# Для проверки всех 6 продакшен-доменов используйте scripts/check-release.sh.

set -u
KEEP=0
[[ "${1:-}" == "--keep" ]] && KEEP=1

if [[ -t 1 ]]; then
  G="\033[0;32m"; R="\033[0;31m"; Y="\033[0;33m"; B="\033[1m"; Z="\033[0m"
else
  G=""; R=""; Y=""; B=""; Z=""
fi

PASS=0; FAIL=0
ok() { printf "  ${G}✓${Z} %s\n" "$*"; PASS=$((PASS+1)); }
bad() { printf "  ${R}✗${Z} %s\n" "$*"; FAIL=$((FAIL+1)); }

cd "$(dirname "$0")/.."

printf "${B}==> 1. npm install (если нужно)${Z}\n"
if [[ ! -d node_modules ]]; then
  npm install >/dev/null 2>&1 && ok "deps установлены" || { bad "npm install упал"; exit 1; }
else
  ok "node_modules уже есть"
fi

printf "\n${B}==> 2. Запуск dev-сервера (порт 3000)${Z}\n"
LOG=$(mktemp)
PORT=3000
if curl -fsS "http://localhost:$PORT/" -o /dev/null 2>/dev/null; then
  ok "сервер уже запущен на :$PORT"
  PID=""
else
  npm run dev >"$LOG" 2>&1 &
  PID=$!
  for i in $(seq 1 30); do
    sleep 2
    curl -fsS "http://localhost:$PORT/" -o /dev/null 2>/dev/null && break
  done
  if curl -fsS "http://localhost:$PORT/" -o /dev/null 2>/dev/null; then
    ok "dev-сервер поднялся (PID=$PID)"
  else
    bad "dev-сервер не отвечает за 60 сек"
    tail -30 "$LOG"
    exit 1
  fi
fi

HTML=$(curl -fsS "http://localhost:$PORT/")

printf "\n${B}==> 3. Маркеры конверсионных блоков${Z}\n"
grep -q 'id="hero-h1-main"' <<<"$HTML" && ok "Hero H1 ID для A/B-теста" || bad "Hero ID отсутствует"
grep -q 'data-goal="hero-quiz"' <<<"$HTML" && ok "CTA «Рассчитать стоимость» (hero-quiz)" || bad "Hero CTA пропал"
grep -q 'data-goal="ctx-audit"' <<<"$HTML" && ok "ContextualCta variant=audit" || bad "ContextualCta audit пропал"
grep -q 'data-goal="ctx-quiz"' <<<"$HTML" && ok "ContextualCta variant=quiz" || bad "ContextualCta quiz пропал"
grep -q 'data-goal="ctx-phone"' <<<"$HTML" && ok "ContextualCta variant=phone" || bad "ContextualCta phone пропал"
grep -q 'aria-label="Хлебные крошки"' <<<"$HTML" && ok "Breadcrumbs (хлебные крошки)" || bad "Breadcrumbs не рендерится"

printf "\n${B}==> 4. SEO: title, description, OG, Twitter${Z}\n"
TITLE=$(grep -oE '<title[^>]*>[^<]+</title>' <<<"$HTML" | head -1)
[[ -n "$TITLE" ]] && ok "<title>: ${TITLE:0:80}…" || bad "Нет <title>"
grep -q 'name="description"' <<<"$HTML" && ok "meta description" || bad "Нет meta description"
grep -q 'property="og:image"' <<<"$HTML" && ok "og:image" || bad "Нет og:image"
grep -q 'name="twitter:label1"' <<<"$HTML" && ok "twitter:label1" || bad "Нет twitter:label1"
grep -q 'rel="canonical"' <<<"$HTML" && ok "canonical link" || bad "Нет canonical"

printf "\n${B}==> 5. SEO: JSON-LD schemas${Z}\n"
SCHEMAS=$(grep -oE '"@type":"[^"]+"' <<<"$HTML" | sort -u | wc -l)
ok "Уникальных schema.org типов: $SCHEMAS"
for t in Organization LocalBusiness Service Product FAQPage BreadcrumbList HowTo VideoObject WebSite DefinedTermSet AggregateRating; do
  # @type может быть строкой или массивом — ловим оба варианта
  if grep -qE "\"@type\":(\"$t\"|\\[[^]]*\"$t\"[^]]*\\])" <<<"$HTML"; then
    ok "  $t"
  else
    bad "  $t отсутствует"
  fi
done

printf "\n${B}==> 6. SEO: служебные эндпоинты${Z}\n"
for p in robots.txt sitemap.xml manifest.webmanifest opengraph-image; do
  if curl -fsSI "http://localhost:$PORT/$p" 2>/dev/null | grep -q '^HTTP.* 200'; then
    ok "/$p отдаётся (200)"
  else
    bad "/$p недоступен"
  fi
done

printf "\n${B}==> 7. Метрика${Z}\n"
YMID=$(grep -oE 'data-ymid="[^"]*"' <<<"$HTML" | head -1)
if [[ -n "$YMID" && "$YMID" != 'data-ymid=""' ]]; then
  ok "body $YMID — Метрика инициализируется"
else
  bad "data-ymid пустой — Метрика не подключится"
fi
grep -q 'mc.yandex.ru' <<<"$HTML" && ok "preconnect mc.yandex.ru" || bad "preconnect к Метрике пропал"

printf "\n${B}==================== ИТОГ ====================${Z}\n"
printf "  ${G}УСПЕШНО:${Z} %d\n" "$PASS"
printf "  ${R}ОШИБОК:${Z}  %d\n" "$FAIL"
if [[ $FAIL -eq 0 ]]; then
  printf "\n  ${G}${B}Готово к показу.${Z} Открой http://localhost:$PORT/ в браузере.\n"
else
  printf "\n  ${R}${B}Есть проблемы — пофиксить перед показом.${Z}\n"
fi

if [[ -n "${PID:-}" && $KEEP -eq 0 ]]; then
  kill "$PID" 2>/dev/null
  printf "\n  dev-сервер остановлен. Для повторного: ${B}npm run dev${Z}\n"
elif [[ -n "${PID:-}" && $KEEP -eq 1 ]]; then
  printf "\n  dev-сервер оставлен работать (PID=$PID). Останови: ${B}kill $PID${Z}\n"
fi

[[ $FAIL -eq 0 ]] && exit 0 || exit 1
