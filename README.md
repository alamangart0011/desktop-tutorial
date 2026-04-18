# Лендинг «Подключение к ГИС Профилактика» — НПК «Оборон-Экран»

Одностраничный продающий лендинг на **Next.js 15.5 + React 19 + Tailwind CSS v4**.
Заточен под продажу услуги подключения организаций к федеральной ГИС «Профилактика
безнадзорности и правонарушений несовершеннолетних» (ПП РФ № 411, 21 Приказ ФСТЭК, УЗ2).

Прицельно собран под **TOP-1 в Яндексе** по теме «подключение ГИС Профилактика»: 13 JSON-LD,
sitemap c якорями, robots с Clean-param, OG/Twitter rich, manifest, Speakable, HowTo, Course,
DefinedTermSet (глоссарий), AggregateRating с отзывами, A/B-тест Hero, ContextualCta.

---

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # прод-сборка
npm start        # запуск прод-сборки
npm run lint     # ESLint
```

Требования: Node.js ≥ 18.18 (рекомендуется 20+).

---

## Перед показом клиенту

Один скрипт поднимает dev-сервер, прогоняет 31 проверку (рендер CTA, schema.org,
robots/sitemap/manifest, Метрика) и говорит «можно показывать / нет»:

```bash
bash scripts/demo-show.sh           # проверить и остановить сервер
bash scripts/demo-show.sh --keep    # оставить dev-сервер работать
```

Если все 31 ✓ — в браузере открыть **http://localhost:3000/** и пройти сценарий:

1. **Hero** — кнопка «Рассчитать стоимость за 60 секунд» скроллит к квизу
2. **Квиз** (5 шагов) — заполнить, на финале форма открывает `mailto:` с расчётом
3. **Калькулятор риска штрафа** — ввести регион/тип/АРМ, увидеть сумму
4. **ContextualCta** — три «зелёных» врезки между секциями (audit / quiz / phone)
5. **Глоссарий** (17 терминов) — DefinedTermSet schema для богатого сниппета
6. **Sticky CTA на мобильном** (открыть в DevTools 375px) — телефон + квиз
7. **Exit-intent** — увести курсор за край окна (на десктопе) → модалка
8. **Footer → Политика обработки ПДн** — открывается отдельная страница `/privacy`

A/B-тест Hero H1: при первом визите cookie `heroAb` = A или B (50/50, 30 дней).
Чтобы увидеть вариант B вручную:

```js
document.cookie = 'heroAb=B; path=/; max-age=2592000'; location.reload();
```

---

## Прод-проверка 6 доменов

```bash
bash scripts/check-release.sh
```

Проверяет DNS, HTTPS, TLS, security-заголовки, /api/lead, robots, sitemap, Метрику,
дубли — для всей доменной сети `gisprof.ru`, `gisprofilaktika.ru`, `pp411.ru`,
`xn---411-k4d4a4d.xn--p1ai`, `profilaktika-spb.ru`, `spb-gis.ru` + редирект `gis-prof.ru`.

---

## Где править контент и контакты

**Один источник правды — `components/constants.ts`:**

```ts
export const BRAND = {
  name: 'НПК «Оборон-Экран»',
  shortName: 'Оборон-Экран',
  legal: 'НПК «Оборон-Экран»',          // полное юр.название для футера/политики
  phone: '+7 (812) 660-80-01',
  phoneRaw: '+78126608001',              // для tel:
  email: 'mail@oboron-it.ru',
  telegram: '',                          // t.me/... (опционально)
  whatsapp: '',                          // wa.me/...
  address: 'Санкт-Петербург',
  region: 'Санкт-Петербург',
  postalCode: '191036',
  streetAddress: '—',                    // конкретный адрес для Я.Карт
  site: 'https://oboron-it.ru',
  workingHours: 'Пн–Пт 09:00–18:00 (МСК)',
};

export const ANALYTICS = {
  yandexMetrikaId: '',          // ← ID счётчика Метрики, например '12345678'
  yandexVerification: '',        // ← код подтверждения для Я.Вебмастера
  googleVerification: '',        // ← код подтверждения для Search Console
};
```

После замены `yandexMetrikaId` счётчик Метрики подключается автоматически (вместе с
вебвизором, картой кликов и обработчиком целей).

---

## Структура

```
app/
  layout.tsx           HTML, SEO-метаданные, 10 JSON-LD, Метрика, заголовки безопасности
  page.tsx             композиция всех секций
  globals.css          Tailwind + CSS-переменные темы
  not-found.tsx        кастомная 404
  privacy/page.tsx     политика обработки ПДн (152-ФЗ)
  thanks/page.tsx      страница «спасибо» для post-submit
  manifest.ts          web app manifest (PWA-ready)
  sitemap.ts           sitemap.xml: / и /privacy
  robots.ts            robots.txt с user-agent Yandex/YandexBot
  opengraph-image.tsx  динамический OG 1200×630 (edge runtime)
components/
  Header, Hero, Stats, Problem, SystemBreakdown, Uz2Requirements,
  ReadinessCheck, Calculator, Services, Pricing, Process,
  LeadMagnet, QuickLead, Reasons, Trust, Comparison, Cases, Reviews,
  Regions, Faq, ContactForm, Footer, StickyMobileCta, CookieBanner
  constants.ts, faq-data.ts, reviews-data.ts
```

---

## Продающая логика (что есть и зачем)

| Секция                | Зачем для продаж                                         |
| --------------------- | -------------------------------------------------------- |
| Hero                  | УТП «под ключ за 35–45 дней» + триггер штрафов 13.11 КоАП |
| Stats                 | 4 якоря доверия (срок, УЗ2, 8 док., штрафы)              |
| Problem               | 4 боли ведомств — сразу узнаём себя                      |
| SystemBreakdown       | Глубокий разбор ИС — снимает «не понимаю, что покупаем»  |
| Uz2Requirements       | 7 СЗИ + 3 ОС + 8 док. + штрафы + ФСТЭК 117 — экспертность |
| ReadinessCheck        | 10-вопросный чек-лист → персональный вердикт + CTA       |
| Calculator            | Tier × АРМ × модификаторы → ориентир бюджета             |
| Services              | 4 пакета услуг                                           |
| Pricing               | 3 тарифа: Старт / Организация / Регион                   |
| Process               | 7 шагов с таймлайном                                     |
| LeadMagnet            | PDF чек-лист на 14 страниц — мягкий лид-магнит           |
| QuickLead             | Короткая форма «обратный звонок» (1 поле)                |
| Reasons / Trust       | 6 причин + лицензии ФСТЭК/ФСБ — снимаем возражения       |
| Comparison            | Таблица «Оборон-Экран vs типичный интегратор» (12 строк) |
| Cases                 | 3 обезличенных кейса с метриками                         |
| Reviews               | 4 отзыва + AggregateRating 4.9                           |
| Regions               | СПб + 11 регионов СЗФО — гео-SEO                         |
| Faq                   | 10 вопросов в аккордеоне                                 |
| ContactForm           | Полная форма + Я.Карты iframe + tel/email fallback       |
| StickyMobileCta       | Sticky CTA на мобайле: звонок, обратный звонок, форма    |
| CookieBanner          | Согласие на cookie + ссылка на /privacy                  |

---

## SEO для Яндекса (TOP-1 на эту тему)

**10 JSON-LD графов** в `app/layout.tsx`:
1. Organization — реквизиты компании
2. ProfessionalService (LocalBusiness) — для Яндекс.Карточки организации
3. Service + AggregateRating + Review — звёздочки в выдаче
4. FAQPage — раскрывашка вопросов в SERP
5. BreadcrumbList — крошки в SERP
6. WebSite + SearchAction — поиск по сайту в Яндексе
7. HowTo — пошаговый гайд с rich-результатом
8. SpeakableSpecification — голосовые ответы Алисы
9. Course — курс обучения операторов с возможным rich-результатом
10. ItemList — список услуг

**Геопризнаки:** `<meta name="geo.region" content="RU-SPE">`, `geo.placename`, `Regions.tsx`
с 12 субъектами СЗФО, схема ProfessionalService с адресом.

**Технические:** preconnect/dns-prefetch к `mc.yandex.ru` и `fonts.gstatic.com`,
`Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.

**robots.txt** разрешает все user-agent + явно `Yandex` и `YandexBot`, указывает sitemap
и host.

**Sitemap.xml** содержит `/` и `/privacy` (без hash-якорей — Яндекс их не индексирует
как отдельные URL).

---

## Цели Яндекс.Метрики (data-goal)

Автоматически отслеживаются при клике на элементы с `data-goal="..."`:

| Цель                  | Где                                          |
| --------------------- | -------------------------------------------- |
| `hero-check`          | Hero → «Проверить готовность за 2 минуты»    |
| `hero-contact`        | Hero → «Получить КП»                         |
| `callback`            | QuickLead → «Перезвоните мне»                |
| `contact`             | ContactForm → «Отправить заявку»             |
| `checklist-request`   | LeadMagnet → «Получить чек-лист»             |
| `phone-tap-mobile`    | StickyMobileCta → «Позвонить»                |

Создайте в Метрике цели с этими именами как «JavaScript-событие». Срабатывают через
делегированный `document.addEventListener("click")` в `app/layout.tsx`.

---

## Контактные формы

Все формы работают **без бэкенда** — открывают почтовый клиент через `mailto:`:

- `ContactForm.tsx` — основная заявка с полным набором полей.
- `QuickLead.tsx` — «обратный звонок», только телефон.
- `LeadMagnet.tsx` — запрос PDF чек-листа на e-mail.

Все три валидируют поля и требуют согласие на обработку ПДн со ссылкой на `/privacy`.

---

## Деплой

Любой хостинг с поддержкой Next.js 15:

- **Vercel** — `vercel deploy` (рекомендуется).
- **Yandex Cloud Serverless Containers** — собрать Docker-образ из `output: 'standalone'`.
- **Self-hosted Node** — `npm run build && npm start` за nginx-прокси.

Заголовки безопасности уже отдаются из `next.config.mjs` — отдельная nginx-конфигурация
не нужна, но не помешает.

---

## Что осталось плейсхолдером (заполнить перед публикацией)

В `components/constants.ts`:
- `legal` — полное юр.название (НПК «Оборон-Экран»? ООО? АО?) + ИНН/ОГРН для футера/политики
- `streetAddress` — точный адрес офиса для Яндекс.Карт
- `telegram`, `whatsapp` — опциональные кнопки в Header/Footer/StickyCta
- `ANALYTICS.yandexMetrikaId` — ID счётчика Метрики
- `ANALYTICS.yandexVerification` — ключ Я.Вебмастера

В `components/reviews-data.ts` — заменить шаблонные обезличенные отзывы на реальные,
если получите согласие заказчиков.

В `components/Cases.tsx` — обновить метрики кейсов, если есть реальные.

В `app/privacy/page.tsx` — проверить редакцию политики у юриста, актуализировать
дату редакции (`REVISION_DATE`).
