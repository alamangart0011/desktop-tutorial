#!/usr/bin/env bash
# fix-mail.sh — финальный фикс цепочки PHP mail() -> msmtp -> smtp.jino.ru.
#
# Запуск (с локальной машины, без копипасты):
#   ssh root@72.56.9.195 'curl -fsSL https://raw.githubusercontent.com/alamangart0011/desktop-tutorial/claude/gis-preventive-landing-site-jU1yz/scripts/server/fix-mail.sh | bash'
#
# Что делает:
#   1) Чинит права на /etc/msmtprc и /var/log/msmtp.log (www-data must read/write).
#   2) Прописывает sendmail_path в php-fpm и cli (msmtp -t -i -a default).
#   3) Перезапускает php-fpm.
#   4) Прогоняет 2 теста: PHP mail() напрямую + POST /api/lead.
#   5) Печатает msmtp.log — должно быть 2 строки smtpstatus=250.

set -euo pipefail

EMAIL_TO="mail@oboron-it.ru"
DOMAIN="gisprof.ru"

log() { printf '\033[1;34m[fix-mail]\033[0m %s\n' "$*"; }

PHP_VER="$(php -r 'echo PHP_MAJOR_VERSION.".".PHP_MINOR_VERSION;')"
log "PHP version: $PHP_VER"

echo
echo "=== ДО фикса ==="
ls -la /etc/msmtprc /var/log/msmtp.log /usr/sbin/sendmail 2>&1 | head -5
php -r 'echo "sendmail_path = ".ini_get("sendmail_path")."\n";'

echo
log "Фикс 1 · права /etc/msmtprc и /var/log/msmtp.log"
chown root:www-data /etc/msmtprc
chmod 640 /etc/msmtprc
touch /var/log/msmtp.log
chown www-data:www-data /var/log/msmtp.log
chmod 660 /var/log/msmtp.log

log "Фикс 2 · sendmail_path -> /usr/bin/msmtp -t -i -a default (fpm + cli)"
mkdir -p "/etc/php/${PHP_VER}/fpm/conf.d" "/etc/php/${PHP_VER}/cli/conf.d"
INI_LINE='sendmail_path = "/usr/bin/msmtp -t -i -a default"'
echo "$INI_LINE" > "/etc/php/${PHP_VER}/fpm/conf.d/99-msmtp.ini"
echo "$INI_LINE" > "/etc/php/${PHP_VER}/cli/conf.d/99-msmtp.ini"

log "Перезапуск php-fpm"
systemctl restart "php${PHP_VER}-fpm"

echo
echo "=== ПОСЛЕ фикса ==="
ls -la /etc/msmtprc /var/log/msmtp.log
php -r 'echo "sendmail_path = ".ini_get("sendmail_path")."\n";'

echo
echo "=== ТЕСТ 1 · PHP mail() от www-data ==="
sudo -u www-data php -r "
\$ok = mail(
    '${EMAIL_TO}',
    '=?UTF-8?B?' . base64_encode('PHP-FIX-TEST-' . date('His')) . '?=',
    'PHP mail() от www-data в ' . date('c') . PHP_EOL,
    \"From: ${EMAIL_TO}\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=utf-8\"
);
echo 'mail() returned: ' . var_export(\$ok, true) . PHP_EOL;
"

sleep 2
echo "=== msmtp.log сразу: ==="
tail -n 3 /var/log/msmtp.log

echo
echo "=== ТЕСТ 2 · форма /api/lead ==="
curl -sS -X POST "https://${DOMAIN}/api/lead" \
    -H 'Content-Type: application/json' \
    --data '{"organization":"FIX-MAIL-FINAL","full_name":"После всех фиксов","role":"QA","phone":"+78126608001","email":"client@example.com","region":"СПб","message":"Если письмо пришло — релиз готов."}' \
    -w '\nHTTP %{http_code}\n'

sleep 3
echo
echo "=== msmtp.log ФИНАЛ (ждём 2 строки status=250) ==="
tail -n 5 /var/log/msmtp.log

echo
echo "=== ИТОГ ==="
echo "Если в msmtp.log выше 2 свежих строки 'smtpstatus=250 ... exitcode=EX_OK'"
echo "и в почту ${EMAIL_TO} прилетели 2 новых письма (PHP-FIX-TEST + Заявка FIX-MAIL-FINAL)"
echo "→ почтовый канал работает. Релиз готов."
