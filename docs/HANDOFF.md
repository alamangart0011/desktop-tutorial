# HANDOFF — что осталось сделать клиенту

> Все технические работы завершены. Инфраструктура в проде, `check-release.sh` → 63/63 PASS.
> Этот документ — единая точка входа для финальных действий, которые может сделать только клиент (требуют личного кабинета или решения).

## Быстрый статус

| Компонент | Статус |
|---|---|
| 6 доменов на VPS `72.56.9.195` | ✓ работает |
| HTTPS / Let's Encrypt | ✓ 89 дней |
| Security headers (HSTS, CSP, …) | ✓ |
| `/api/lead` + Telegram-бот + msmtp | ✓ принимает заявки |
| Яндекс.Метрика `108625530` | ✓ на всех 6 |
| 13 JSON-LD схем | ✓ на всех страницах |
| Per-host `title`/`H1`/`description` | ✓ Яндекс не склеит |
| A/B-тест Hero H1 | ✓ cookie 50/50 |
| robots.txt / sitemap.xml / turbo.xml | ✓ per-host |

---

## 1. Яндекс.Вебмастер (30 минут)

Для каждого из 6 доменов:

1. Открыть `https://webmaster.yandex.ru/` (аккаунт Оборон-Экрана).
2. «+ Добавить сайт» → вбить `https://gisprof.ru/` (и так для каждого).
3. Способ подтверждения: **«Мета-тег»**.
4. Яндекс покажет строку вида:
   ```html
   <meta name="yandex-verification" content="a1b2c3d4e5f6..." />
   ```
5. Скопировать значение `content="..."`.
6. В файле `lib/variants.ts` найти нужный variant, вписать токен:
   ```ts
   yandexVerification: 'a1b2c3d4e5f6...',
   ```
7. Коммит + push → cron на VPS подтянет за 5 минут.
8. Вернуться в Вебмастер → «Проверить владение».
9. **Регион** (Настройки → Региональность → Ручная):
   - `profilaktika-spb.ru`, `spb-gis.ru` → **Санкт-Петербург**
   - остальные 4 → **Россия**

| Домен | Variant-ключ в `lib/variants.ts` |
|---|---|
| gisprof.ru | `main` |
| gisprofilaktika.ru | `gisprofilaktika` |
| pp411.ru | `pp411` |
| xn---411-k4d4a4d.xn--p1ai (гис-411.рф) | `gis411rf` |
| profilaktika-spb.ru | `profilaktikaSpb` |
| spb-gis.ru | `spbGis` |

## 2. reg.ru — DNSSEC и auto-renew (15 минут)

1. Кабинет `https://www.reg.ru/user/account/` → «Мои домены».
2. По каждому из 7 доменов (6 контентных + `gis-prof.ru`):
   - Настройки → **DNSSEC → Включить**.
   - Продление → **Автопродление: 24 мес.**.

## 3. Яндекс.Бизнес (20 минут)

1. `https://yandex.ru/sprav/add` → Добавить организацию.
2. Заполнить:
   - Название: **НПК «Оборон-Экран»**
   - Адрес: `199106, СПб, ул. Карташихина, д. 7, лит. А, пом. 8-Н, офис 9`
   - Категории: **Информационная безопасность**, **IT-консалтинг**
   - Телефон: `+7 (812) 660-80-01`
   - Сайт: `https://gisprof.ru`
   - Часы: Пн–Пт 09:00–18:00
3. Подтверждение — письмом на юр. адрес или звонком на номер.
4. После публикации карточка появится в Яндекс.Картах и подвяжется к LocalBusiness JSON-LD на сайте.

## 4. Данные, которые надо вписать в код (разово)

Открыть `components/constants.ts`, заполнить пустые поля:

```ts
export const BRAND = {
  // ...
  telegram: 'https://t.me/oboron_it',           // ← ссылка на Telegram
  whatsapp: '+78126608001',                      // ← WA-номер (можно тот же)
  rknRegistryNumber: '78-XX-XXXXXX',             // ← из реестра РКН (rkn.gov.ru/personal-data/register)
  // ...
};

// Если появится PDF чек-листа:
checklistUrl: '/downloads/checklist-gis-prof.pdf',
// файл положить в public/downloads/
```

## 5. Контент от клиента (по мере готовности)

| Файл | Что заменить |
|---|---|
| `components/Cases.tsx` | Обезличенные кейсы → реальные (с цифрами и ролями) |
| `components/Pricing.tsx` | «по запросу» → фиксированные цены (пакеты Старт/Регион/Под ключ) |
| `components/Reviews.tsx` | Пока placeholder-отзывы → реальные отзывы клиентов |
| `public/downloads/checklist-gis-prof.pdf` | Положить реальный чек-лист на 14 страниц |

## 6. Яндекс.Директ (после пп. 1–5)

Рекомендуемая структура — 3 кластера × 50 000 ₽/мес:

| Кластер | Домен | Семантика |
|---|---|---|
| Экспертный | `gisprof.ru` | «подключение к ГИС Профилактика», «ПП 411 требования», «ФСТЭК УЗ2» |
| Региональный | `profilaktika-spb.ru`, `spb-gis.ru` | «ГИС Профилактика СПб», «подключение школа Санкт-Петербург» |
| Правовой/брендовый | `pp411.ru`, `гис-411.рф` | «Постановление 411», «ПП 411 скачать», «ГИС 411» |

Utm-план в `docs/UTM-PLAN.md`.

---

## Операционные команды

**Проверка здоровья сети:**
```bash
bash <(curl -fsSL "https://raw.githubusercontent.com/alamangart0011/desktop-tutorial/main/scripts/check-release.sh?t=$(date +%s)")
```

**Cron-мониторинг на VPS** (поставить один раз):
```bash
# SSH на VPS → crontab -e → добавить строку:
*/5 * * * * /opt/gisprof-src/scripts/monitor.sh --quiet || /usr/bin/mail -s "GISPROF ALERT" mail@oboron-it.ru < /tmp/monitor.log
```

**Ручное обновление прода** (cron делает сам каждые 5 мин):
```bash
ssh sergey@72.56.9.195
cd /opt/gisprof-src && git pull && bash scripts/server/rebuild-and-deploy.sh
```

---

## Контакты владельца инфраструктуры

- VPS: `72.56.9.195` (доступ по SSH у заказчика)
- Git: `https://github.com/alamangart0011/desktop-tutorial` (ветка `main` — dev, `site-variants` — прод-артефакт)
- Яндекс.Метрика: `108625530`
- IndexNow-ключ: `b2f3e9c5a1d84fe9a7c0d6e1f4b2a8d3`
