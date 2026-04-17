#!/usr/bin/env bash
# verify-all.sh — полная проверка прод-сети «Оборон-Экран» на VPS.
# Запуск на VPS:   bash scripts/server/verify-all.sh
# Или удалённо:    ssh root@72.56.9.195 'bash -s' < scripts/server/verify-all.sh
#
# Проверяет: DNS (3 резолвера), SPF, сертификаты, HTTPS, постфикс, /api/lead,
# пытается добрать cert для новых готовых доменов.

set +e

VPS_IP="${VPS_IP:-72.56.9.195}"
DOMAINS=(gisprof.ru gisprofilaktika.ru pp411.ru xn----7sbab2ce0afk.xn--p1ai profilaktika-spb.ru spb-gis.ru)
ACME_ROOT="/var/www/acme"

echo "=========================================="
echo "  ПОЛНАЯ ПРОВЕРКА ПРОД-СЕТИ"
echo "  $(date '+%Y-%m-%d %H:%M:%S %Z')  VPS=$VPS_IP"
echo "=========================================="

echo ""
echo "[1/8] DNS через 3 резолвера (Cloudflare / Google / Yandex)"
printf "%-38s %-15s %-15s %-15s  %s\n" "домен" "cloudflare" "google" "yandex" "статус"
READY=()
for d in "${DOMAINS[@]}"; do
  cf=$(dig +short +time=3 +tries=1 @1.1.1.1  "$d" A | head -1)
  go=$(dig +short +time=3 +tries=1 @8.8.8.8  "$d" A | head -1)
  ya=$(dig +short +time=3 +tries=1 @77.88.8.8 "$d" A | head -1)
  verdict="✗ не готов"
  if [ "$cf" = "$VPS_IP" ] && [ "$go" = "$VPS_IP" ] && [ "$ya" = "$VPS_IP" ]; then
    verdict="✓ готов"
    READY+=("$d")
  fi
  printf "%-38s %-15s %-15s %-15s  %s\n" "$d" "${cf:-—}" "${go:-—}" "${ya:-—}" "$verdict"
done

echo ""
echo "[2/8] SPF / DKIM / DMARC для gisprof.ru"
spf=$(dig +short TXT gisprof.ru @1.1.1.1 | grep -i 'v=spf1' | head -1)
dmarc=$(dig +short TXT _dmarc.gisprof.ru @1.1.1.1 | head -1)
[ -n "$spf" ]   && echo "  ✓ SPF:   $spf"   || echo "  ✗ SPF не найден"
[ -n "$dmarc" ] && echo "  ✓ DMARC: $dmarc" || echo "  · DMARC не настроен (необязательно)"

echo ""
echo "[3/8] PTR (reverse DNS) для $VPS_IP"
ptr=$(dig +short -x "$VPS_IP" @1.1.1.1 | head -1)
if [ -n "$ptr" ] && echo "$ptr" | grep -qi 'gisprof\|oboron'; then
  echo "  ✓ PTR: $ptr"
else
  echo "  ! PTR: ${ptr:-не установлен} — нужно попросить Jino указать mail.gisprof.ru"
fi

echo ""
echo "[4/8] Сертификаты Let's Encrypt"
for d in "${DOMAINS[@]}"; do
  if [ -d "/etc/letsencrypt/live/$d" ]; then
    exp=$(openssl x509 -enddate -noout -in "/etc/letsencrypt/live/$d/fullchain.pem" 2>/dev/null | cut -d= -f2)
    echo "  ✓ $d — до $exp"
  else
    echo "  ✗ $d — сертификата нет"
  fi
done

echo ""
echo "[5/8] Выпуск сертификатов для новых готовых доменов"
issued_any=0
for d in "${READY[@]}"; do
  if [ ! -d "/etc/letsencrypt/live/$d" ]; then
    echo "  → certbot для $d"
    certbot certonly --webroot -w "$ACME_ROOT" -d "$d" -d "www.$d" \
      --non-interactive --agree-tos --email mail@oboron-it.ru --no-eff-email 2>&1 | tail -4
    issued_any=1
  fi
done
[ "$issued_any" = "0" ] && echo "  · всё уже выпущено / нечего добрать"

echo ""
echo "[6/8] HTTPS-ответ каждого домена"
for d in "${DOMAINS[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 --resolve "$d:443:$VPS_IP" "https://$d/" 2>/dev/null)
  case "$code" in
    200) echo "  ✓ $d → HTTP 200" ;;
    "")  echo "  ✗ $d → нет ответа" ;;
    *)   echo "  · $d → HTTP $code" ;;
  esac
done

echo ""
echo "[7/8] Postfix: очередь и последние доставки"
q=$(mailq 2>/dev/null | tail -1)
echo "  очередь: $q"
echo "  последние 5 SMTP-финалов:"
tail -200 /var/log/mail.log 2>/dev/null | grep -E 'status=(sent|bounced|deferred)' | tail -5 | sed 's/^/    /'

echo ""
echo "[8/8] /api/lead smoke-тест на gisprof.ru"
resp=$(curl -s -X POST "https://gisprof.ru/api/lead" \
  -H 'Content-Type: application/json' \
  --resolve "gisprof.ru:443:$VPS_IP" \
  -d '{"organization":"Проверка автоматическая","full_name":"Скрипт Верификатор","phone":"+79990001122","email":"verify@example.com","message":"verify-all.sh"}')
echo "  ответ: $resp"
if [ -f /var/log/gisprof/leads.jsonl ]; then
  echo "  leads.jsonl: $(wc -l < /var/log/gisprof/leads.jsonl) строк"
  echo "  последняя:"
  tail -1 /var/log/gisprof/leads.jsonl | sed 's/^/    /'
fi

echo ""
echo "=========================================="
echo "  ИТОГ"
echo "=========================================="
total=${#DOMAINS[@]}
ready=${#READY[@]}
certs=$(ls -1d /etc/letsencrypt/live/*/ 2>/dev/null | grep -v README | wc -l)
echo "  Доменов всего:   $total"
echo "  DNS готовы:      $ready / $total"
echo "  Сертификатов:    $certs"
echo ""
echo "  Что осталось:"
[ "$ready" -lt "$total" ] && echo "    · дождаться пропагации DNS для непроверенных доменов"
[ -z "$spf" ]              && echo "    · добавить SPF TXT для gisprof.ru"
echo "    · заказать PTR у Jino: 72.56.9.195 → mail.gisprof.ru (письмо в saport@jino.ru)"
echo "    · Yandex.Webmaster: привязать регион каждому варианту"
echo "    · Yandex.Metrika: создать счётчики, ID вписать в lib/variants.ts"
echo "=========================================="
