# RELEASE-CHECKLIST — ГИС «Профилактика» · сеть из 6 доменов

> Чек-лист проверки перед публикацией и первые 48 часов после релиза.
> Цель: ноль «мёртвых» ссылок, ноль ошибок 5xx, чистая индексация Яндекса, работающий приём лидов.

## Перед пушем релиза (dev-машина)

- [ ] `npx tsc --noEmit` — без ошибок.
- [ ] `bash scripts/build-all-variants.sh` — 6 каталогов в `dist/`, каждый ~2.3 MB.
- [ ] `grep -r "gisprof.ru" dist/profilaktika-spb.ru/ | head` — ссылок на чужой домен быть не должно (иначе Яндекс склеит зеркала).
- [ ] `diff dist/gisprof.ru/index.html dist/pp411.ru/index.html | head` — H1/title/description должны отличаться.
- [ ] Проверить `dist/<host>/robots.txt` — только свой sitemap и host.
- [ ] Проверить `dist/<host>/sitemap.xml` — абсолютные URL на свой host.
- [ ] Проверить `dist/<host>/turbo.xml` — title/description/topic варианта.
- [ ] Открыть `dist/gisprof.ru/index.html` в браузере локально: все секции, форма, sticky CTA, cookie banner.

## DNS и домены (reg.ru / Cloudflare)

- [ ] A-запись `gisprof.ru` → IP VPS; TTL 300.
- [ ] A-запись `www.gisprof.ru` → IP VPS.
- [ ] Те же A-записи для: `gisprofilaktika.ru`, `pp411.ru`, `xn----7sbab2ce0afk.xn--p1ai`, `profilaktika-spb.ru`, `spb-gis.ru`.
- [ ] `gis-prof.ru` — A-запись на тот же IP (будет 301 → `gisprof.ru`).
- [ ] Auto-renew доменов включён (24 мес).
- [ ] DNSSEC включён у регистратора (reg.ru → Настройки → DNSSEC).

## VPS (первый запуск)

- [ ] Ubuntu 22.04/24.04, root SSH-ключ, минимум 2 GB RAM.
- [ ] Открыты порты 22, 80, 443 (UFW).
- [ ] `bash scripts/server/remote-bootstrap.sh` — ставит nginx, PHP-FPM, certbot, msmtp.
- [ ] `/etc/gisprof-lead.env` заполнен: `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`, `TG_BOT_TOKEN`, `TG_CHAT_ID`, `RATE_LIMIT_*`.
- [ ] `/etc/msmtprc` — SMTP-relay (Яндекс.360 или Mail.ru for Business).
- [ ] Let's Encrypt сертификаты выданы на все 6 доменов (`certbot certificates`).
- [ ] `systemctl status nginx` — active, без ошибок.
- [ ] `curl -I https://gisprof.ru/` → 200 OK + заголовки CSP, HSTS, X-Frame-Options, Permissions-Policy.
- [ ] `curl -X POST https://gisprof.ru/api/lead -H 'Content-Type: application/json' -d '{}'` → 400 `empty_body` (не 5xx).
- [ ] Smoke-тест лида: заполнить форму с test-данными → письмо пришло в `mail@oboron-it.ru`, Telegram-бот пропинговал.

## Яндекс.Метрика (id ставим ПОСЛЕ релиза)

- [ ] Создать счётчик `gisprof-main` на `https://metrika.yandex.ru/`.
- [ ] В «Дополнительные адреса» вбить все 6 хостов + `www.`-варианты + `гис-411.рф`.
- [ ] Включить «Вебвизор», «Карта кликов», «Аналитика форм».
- [ ] Настроить цели (см. `docs/ROLES.md`, раздел «Маркетолог»).
- [ ] ID скопировать в `components/constants.ts::ANALYTICS.yandexMetrikaId` (заменить `'00000000'`).
- [ ] Пересобрать и задеплоить (`bash scripts/build-all-variants.sh` + `bash scripts/server/deploy-variants.sh`).
- [ ] Проверить `https://webvisor.com/` → данные текут через 5 мин после первого визита.

## Яндекс.Вебмастер

- [ ] Добавить и подтвердить все 6 хостов (метатег уже в `<head>`, заполнить `VARIANT.yandexVerification` в `lib/variants.ts`).
- [ ] Загрузить sitemap по каждому: `https://<host>/sitemap.xml`.
- [ ] Настроить «Региональность»: ручная = Санкт-Петербург (для `profilaktika-spb.ru`, `spb-gis.ru`); «Россия» — для ядра `gisprof.ru`.
- [ ] Прислать IndexNow-пинг (ключ в `public/<INDEXNOW_KEY>.txt`).
- [ ] Через 3–5 дней проверить, что Яндекс ВИДИТ все 6 (страницы в поиске → «проиндексировано» ≥ 1).

## Яндекс.Бизнес

- [ ] Карточка компании НПК «Оборон-Экран» создана/подтверждена.
- [ ] Адрес, телефон, режим работы — совпадают с JSON-LD (`components/constants.ts`).
- [ ] Фотографии офиса (минимум 5), логотип.
- [ ] Ссылка на сайт: `https://gisprof.ru`.

## Юридические документы (последние 24 часа)

- [ ] Подать уведомление в Роскомнадзор о начале обработки ПДн (форма `https://pd.rkn.gov.ru/operators-registry/notification/form/`). После получения номера — вписать его в `BRAND.rknRegistryNumber` в `components/constants.ts`.
- [ ] Обновить дату редакции Политики (`app/privacy/page.tsx::REVISION_DATE`) если пересобираете после доп-правок.
- [ ] Положить на VPS `/home/deploy/sites/<host>/privacy/index.html` — проверить HTTP 200.

## Первые 48 часов после релиза

- [ ] Мониторить `/var/log/gisprof/leads.jsonl` — заявки приходят и проходят валидацию.
- [ ] Мониторить `/var/log/nginx/error.log` — нет 500/502.
- [ ] Установить алерт uptimerobot.com (free) на все 6 хостов с 5-мин пингом.
- [ ] Через 24 часа — Яндекс.Метрика: 6 доменов видят трафик, цели срабатывают.
- [ ] Через 48 часов — Яндекс.Вебмастер: 6 сайтов подтверждены, sitemap принят.
- [ ] Если Яндекс.Директ уже запущен — проверить, что CPL в таргетной вилке (2 500–5 000 ₽).

## Откат (если что-то пошло не так)

- [ ] `git log --oneline -10` — найти предыдущий релиз-коммит.
- [ ] `git revert <sha>` → push → `bash scripts/server/deploy-variants.sh`.
- [ ] Nginx конфиг хранится в `/etc/nginx/sites-available/gisprof-multi.conf`; резервная копия: `/etc/nginx/sites-available/gisprof-multi.conf.bak-<date>` (создаётся `remote-bootstrap.sh`).
- [ ] Сертификаты Let's Encrypt не трогаются при откате — остаются рабочими.
