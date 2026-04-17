# Мультидоменная стратегия НПК «Оборон-Экран»

Обновлено: 2026-04-17

## Цель

Превратить 6 купленных доменов в сеть уникальных посадочных страниц под
разные поисковые намерения (intent), чтобы каждая попадала в Яндекс ТОП-1
по своему запросу и суммарно приносила ≥300 лидов/мес.

## Роли доменов

| Домен | Роль | Canonical | Регион в Вебмастере | Статус |
|---|---|---|---|---|
| `gisprof.ru` | Федеральный флагман. Полный контент, все якоря. | self | Россия | MAIN |
| `gisprofilaktika.ru` | EMD под «ГИС Профилактика». H1 «что это, кто обязан подключаться». | self | Россия | UNIQUE |
| `pp411.ru` | EMD под «ПП 411». H1 про нормативку, штрафы КоАП. | self | Россия | UNIQUE |
| `гис-411.рф` | Кириллический, Yandex-boost. H1 про внедрение по всей России. | self | Россия | UNIQUE |
| `profilaktika-spb.ru` | СПб геотаргет. H1 «в Санкт-Петербурге», районы СПб. | self | Санкт-Петербург | UNIQUE |
| `spb-gis.ru` | Ленинградская область геотаргет. H1 «в Ленобласти», выезд. | self | Ленинградская область | UNIQUE |
| `gis-prof.ru` | 301 → gisprof.ru. Без собственного контента. | — | — | MIRROR |

Почему НЕ ставить `rel=canonical → gisprof.ru` на всех? Яндекс тогда
выдаст только флагман; остальные 5 доменов никогда не попадут в выдачу.
Уникальный контент + self-canonical = каждый домен занимает свои запросы.

## Архитектура

```
repo (main)
 ├─ lib/variants.ts                   ← каталог 6 вариантов
 ├─ components/{Hero,HomeJsonLd,...}  ← читают VARIANT
 ├─ app/{layout,sitemap,page}.tsx     ← метаданные из VARIANT
 ├─ public/api/lead.php               ← приёмник форм
 └─ scripts/
     ├─ build-all-variants.sh         ← собирает dist/<host>/ × 6
     └─ server/
         ├─ server-setup-forms.sh     ← установка php-fpm + Telegram
         ├─ deploy-variants.sh        ← rsync в /home/deploy/sites/<host>/
         └─ nginx-multi-domain.conf   ← 6 server {} блоков
```

Static export, `SITE_VARIANT=<key> npm run build:export` → `out/`.

## Deploy-pipeline

### Локально (машина разработчика)

```bash
# 1. Собрать все 6 вариантов → dist/<host>/
bash scripts/build-all-variants.sh

# 2. Сложить в git-ветку site-variants
git checkout --orphan site-variants
git rm -rf .
cp -r dist/* .
git add -A
git commit -m "build: static variants $(date +%F)"
git push -f origin site-variants
git checkout main
```

### VPS (72.56.9.195)

Разовая установка:

```bash
# A) Инфраструктура форм
sudo bash scripts/server/server-setup-forms.sh
# заполнить /etc/gisprof-lead.env (Telegram + SMTP)

# B) nginx-мульти-домен
sudo cp scripts/server/nginx-multi-domain.conf /etc/nginx/sites-available/gisprof-multi
sudo ln -s ../sites-available/gisprof-multi /etc/nginx/sites-enabled/
# выключить старый single-domain конфиг
sudo unlink /etc/nginx/sites-enabled/gisprof.ru   # если был
sudo nginx -t

# C) SSL для каждого домена
for d in gisprof.ru gisprofilaktika.ru pp411.ru \
         xn----7sbab2ce0afk.xn--p1ai \
         profilaktika-spb.ru spb-gis.ru gis-prof.ru; do
    sudo certbot --nginx -d "$d" -d "www.$d" \
        --non-interactive --agree-tos -m mail@oboron-it.ru --redirect
done

# D) Первичный клон ветки с вариантами
sudo mkdir -p /opt/gisprof-variants
sudo git clone -b site-variants https://github.com/alamangart0011/desktop-tutorial.git /opt/gisprof-variants

# E) Первый deploy
sudo bash scripts/server/deploy-variants.sh

# F) Cron на автоподхват новых сборок
echo "*/5 * * * * cd /opt/gisprof-variants && git fetch origin site-variants && git reset --hard origin/site-variants && bash /opt/gisprof-variants/scripts/server/deploy-variants.sh >/var/log/gisprof-deploy.log 2>&1" \
    | sudo tee /etc/cron.d/gisprof-variants-deploy
```

## DNS

Все домены должны иметь A-запись на 72.56.9.195. Для каждого регистратора:

| Домен | Тип | Имя | Значение |
|---|---|---|---|
| любой из 7 | A | @ | 72.56.9.195 |
| любой из 7 | A | www | 72.56.9.195 |

Время распространения — до 24 часов. Для гис-411.рф регистратор обычно
выдаёт 2 варианта записи (Unicode / punycode) — поставить ОБЕ если есть,
иначе хватит punycode.

## Яндекс.Вебмастер — региональная привязка

Для каждого UNIQUE-домена:

1. Добавить сайт через https://webmaster.yandex.ru → ввести домен.
2. Подтвердить права (meta-тег, DNS TXT, или HTML-файл — проще всего
   HTML-файл в `public/` репо с именем из Вебмастера).
3. Раздел «Региональность» → «Ручная».
   - gisprof.ru, gisprofilaktika.ru, pp411.ru, гис-411.рф — **Россия**
   - profilaktika-spb.ru — **Санкт-Петербург**
   - spb-gis.ru — **Ленинградская область**
4. Раздел «Индексирование → Переобход» → отправить главную + `/privacy`.
5. Раздел «Настройки → Уведомления» → включить «Критические ошибки».

## Яндекс.Метрика — гибридная модель счётчиков

**Рекомендация:** 1 общий `YM-MAIN` на все 6 доменов + 2 региональных.

### Шаги:

1. Зайти на https://metrika.yandex.ru → «Добавить счётчик».
2. Создать `YM-MAIN` — имя «gisprof-network», адрес `https://gisprof.ru`.
3. В «Настройки → Адрес сайта» нажать «Добавить адрес» и ввести все
   6 доменов + их aliases (www-версии).
4. Включить: Вебвизор, Карта кликов, Карта скроллинга, Точный показатель
   отказов.
5. Раздел «Цели» — создать по ключам в `docs/metrika-goals.md` (уже
   подготовлены `data-goal=` в коде). Минимум:
   - `form-submit-click`, `form-submit-success`
   - `callback-open`, `callback-submit`, `callback-whatsapp`, `callback-telegram`
   - `phone-tap-hero`, `phone-tap-contact`, `phone-tap-hero-side`, `phone-tap-form`
   - `hero-check`, `hero-contact`
   - `promo-cta`, `promo-pricing`
6. Скопировать ID счётчика в `lib/variants.ts` → `VARIANTS.main.metrikaId`
   (применится ко всем вариантам через fallback в `layout.tsx`).
7. **Опционально**: создать `YM-SPB` для `profilaktika-spb.ru` и вписать
   в `VARIANTS.profilaktikaspb.metrikaId` — тогда СПб-метрика не смешается.

## Яндекс.Директ (платный трафик)

Запустить 3 кампании, каждая — на свой домен:

1. **РК-401 «ПП 411»** → pp411.ru. Ключи: «постановление 411», «пп 411
   скачать», «411 о гис профилактика».
2. **РК-402 «ГИС Профилактика СПб»** → profilaktika-spb.ru. Ключи: «гис
   профилактика спб», «подключение школа спб гис».
3. **РК-403 «ГИС Профилактика федеральная»** → gisprof.ru. Ключи: «гис
   профилактика подключение», «гис профилактика под ключ».

Стартовый бюджет — 50 тыс. ₽/мес на кампанию. CPL (стоимость лида) в
тематике ожидается 2.5–5 тыс. ₽.

## Telegram-бот уведомлений (опционально)

1. Написать `@BotFather` → `/newbot` → имя «ГИС-Проф Лиды» → user
   `gisprof_leads_bot`. Получить токен вида `123456:AAH...`.
2. Написать боту `/start`. Получить `chat_id`:

   ```bash
   curl "https://api.telegram.org/bot<TOKEN>/getUpdates"
   # в результате есть "chat":{"id":12345678,...}
   ```

3. SSH на VPS:

   ```bash
   sudo nano /etc/gisprof-lead.env
   # вписать TG_BOT_TOKEN=... и TG_CHAT_ID=...
   sudo systemctl restart php8.3-fpm
   ```

4. Проверка: заполнить форму на сайте → должно прийти в Telegram за 1-2с.

## Мониторинг

### UptimeRobot (бесплатно)

Зарегистрироваться на https://uptimerobot.com → добавить по мониторингу
на каждый домен:

- Monitor Type: HTTPS
- URL: `https://<host>/`
- Interval: 5 min
- Alert on: 2 failed checks
- Contact: e-mail + Telegram bot

### Логи на VPS

```bash
sudo tail -f /var/log/gisprof/leads.jsonl         # заявки
sudo tail -f /var/log/nginx/gisprof.ru.access.log # трафик
sudo tail -f /var/log/nginx/gisprof.ru.error.log  # ошибки
sudo journalctl -u php8.3-fpm -f                  # php
```

## Безопасность

- SSH: после тестового периода отключить пароли, оставить только ключи
  (`/etc/ssh/sshd_config` → `PasswordAuthentication no`).
- Firewall: UFW + fail2ban уже настроены — проверка: `sudo ufw status`.
- Certbot auto-renewal: `sudo systemctl status certbot.timer`.
- Бекап: ежедневный tar `/var/log/gisprof/ + /home/deploy/sites/` на
  внешнее S3/Яндекс.Облако (не реализовано, добавить при переходе из
  песочницы).

## Контрольный чек-лист запуска

- [ ] DNS A-записи всех 7 доменов → 72.56.9.195 (проверка: `dig <host>`)
- [ ] SSL-сертификат Let’s Encrypt для каждого домена
- [ ] `scripts/server/server-setup-forms.sh` выполнен на VPS
- [ ] `/etc/gisprof-lead.env` заполнен (Telegram + SMTP)
- [ ] `scripts/build-all-variants.sh` успешно собрал все 6 `dist/<host>/`
- [ ] Ветка `site-variants` запушена
- [ ] На VPS `/opt/gisprof-variants` склонирован
- [ ] `scripts/server/deploy-variants.sh` отработал без ошибок
- [ ] Cron `/etc/cron.d/gisprof-variants-deploy` активен
- [ ] Все 6 доменов открываются по HTTPS с разным H1/title
- [ ] Яндекс.Вебмастер: все 6 добавлены, региональность выставлена
- [ ] Яндекс.Метрика: ID вписан в `lib/variants.ts` → пересобрано → заявка
  попадает в «Цели»
- [ ] Тестовая заявка с каждого домена доходит в Telegram + e-mail
- [ ] UptimeRobot — 7 мониторов активны
