# Офлайн-превью лендинга ГИС «Профилактика»

Статический снимок серверного рендера с коммита `1f4df43` (ветка `claude/gis-preventive-landing-site-jU1yz`).

## Как открыть

```bash
open index.html           # macOS
xdg-open index.html       # Linux
start index.html          # Windows
```

Или просто двойной клик по `index.html` в проводнике.

## Что есть

- `index.html` — главная, 28 секций, 11 JSON-LD графов (533 КБ).
- `privacy.html` — политика обработки ПДн по 152-ФЗ.
- `thanks.html` — страница после отправки формы.
- `_next/static/…` — CSS (Tailwind), шрифт Manrope, чанки JS.
- `favicon.svg`, `manifest.webmanifest`, `robots.txt`.

## Ограничения офлайн-просмотра

- Серверный HTML рендерится полностью — **визуал 100% соответствует проду**.
- Клиентские интеракции из-за CORS на `file://` могут быть ограничены:
  калькуляторы, чек-лист, мобильное меню. Для полной проверки —
  запустите локально: `npm install && npm run dev`.
- Яндекс.Карта и счётчик Метрики не подгружаются на `file://` — это норма.

## Для «живого» запуска

```bash
git clone -b claude/gis-preventive-landing-site-jU1yz \
  https://github.com/alamangart0011/desktop-tutorial.git
cd desktop-tutorial
npm install
npm run dev    # http://localhost:3000
```
