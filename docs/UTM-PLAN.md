# UTM-PLAN — разметка ссылок для замера источников

Каждый канал трафика должен иметь уникальные UTM-метки, чтобы в Яндекс.Метрике было видно, откуда пришёл лид. Форма лендинга уже собирает `utm_*` параметры автоматически (см. `components/ContactForm.tsx` — `useEffect` + sessionStorage `gp_utm`), они падают в payload заявки.

## Структура UTM

```
?utm_source=<канал>&utm_medium=<тип>&utm_campaign=<кампания>&utm_term=<ключ>&utm_content=<креатив>
```

## Готовые ссылки по каналам

### Яндекс.Директ — горячий трафик (СПб)
```
https://profilaktika-spb.ru/?utm_source=yandex&utm_medium=cpc&utm_campaign=gis-prof-spb-hot&utm_term={keyword}&utm_content=direct
```
Для Директа `{keyword}` заменяется автоматически на ключевое слово.

### Яндекс.Директ — региональная кампания (Ленобласть)
```
https://gisprof.ru/?utm_source=yandex&utm_medium=cpc&utm_campaign=gis-prof-lo&utm_term={keyword}&utm_content=direct
```

### Яндекс.Директ — федеральная (ПП 411)
```
https://pp411.ru/?utm_source=yandex&utm_medium=cpc&utm_campaign=gis-prof-411-fed&utm_term={keyword}&utm_content=direct
```

### Холодная e-mail рассылка (школы)
```
https://gisprof.ru/?utm_source=email&utm_medium=outreach&utm_campaign=schools-jun26&utm_content=template1
```

### Холодная e-mail рассылка (КДНиЗП)
```
https://gisprofilaktika.ru/?utm_source=email&utm_medium=outreach&utm_campaign=kdn-jun26&utm_content=template2
```

### Холодная e-mail рассылка (опека)
```
https://gisprof.ru/?utm_source=email&utm_medium=outreach&utm_campaign=opeka-jun26&utm_content=template3
```

### Яндекс.Дзен — лонгрид
```
https://gisprof.ru/?utm_source=dzen&utm_medium=content&utm_campaign=longread-pp411&utm_content=post1
```

### VK — пост в группе / таргет
```
https://gisprof.ru/?utm_source=vk&utm_medium=social&utm_campaign=vk-post-apr26&utm_content=fines
```

### VK — таргетированная реклама
```
https://profilaktika-spb.ru/?utm_source=vk&utm_medium=cpc&utm_campaign=vk-spb-target&utm_content=ad1
```

### Telegram-канал — серия постов
```
# Пост 1 (анонс)
https://gisprofilaktika.ru/?utm_source=telegram&utm_medium=channel&utm_campaign=series-apr26&utm_content=post1-intro

# Пост 2 (штрафы)
https://gisprof.ru/?utm_source=telegram&utm_medium=channel&utm_campaign=series-apr26&utm_content=post2-fines

# Пост 3 (оффер)
https://gisprof.ru/?utm_source=telegram&utm_medium=channel&utm_campaign=series-apr26&utm_content=post3-offer
```

### Профильные форумы (proshkolu, forum.edu)
```
https://gisprof.ru/?utm_source=forum&utm_medium=reference&utm_campaign=proshkolu&utm_content=signature
```

### Партнёры (интеграторы, другие ИБ-компании, дилеры Secret Net)
```
https://gisprof.ru/?utm_source=partner&utm_medium=referral&utm_campaign=integrator-<имя>&utm_content=handoff
```

## Как проверять эффективность

Раз в неделю в Яндекс.Метрике:

1. **Отчёты → Источники → Метки UTM**
2. Сгруппировать по `utm_source` → смотреть визиты, отказы, время на сайте, цели (form-submit, calculator-result, phone-tap).
3. Сравнить с лидами в `/var/log/gisprof/leads.jsonl` (там `utm` уже записан в каждом лиде).
4. Формула CPL по каналу: `<потрачено>` / `<лидов с этим utm_source>`.
5. Отключать каналы с CPL > 5 000 ₽ (нерентабельно при пакете «Организация» 500k).

## Ключевые слова для Яндекс.Директ (для `utm_term` / кампании)

**Горячие (высокая конверсия, 3–8 ₽/клик):**
- подключение к гис профилактика
- гис профилактика стоимость
- гис профилактика под ключ
- аттестация ИСПДн гис профилактика
- уз2 по 21 приказу фстэк
- подключить школу к гис профилактика

**Тёплые (средняя конверсия, 8–20 ₽/клик):**
- ПП 411 для школ
- обязательно ли подключаться к гис
- штрафы за неподключение к гис
- что такое гис профилактика
- оператор гис профилактика

**Регионально-зависимые (минус-слова отсев):**
- гис профилактика санкт-петербург
- подключение к гис ленинградская область
- гис профилактика спб

**Минус-слова (критично, чтобы не сливать бюджет):**
-скачать, -бесплатно, -вакансия, -работа, -обзор, -астрал, -уиб, -гэндальф

## Рекомендованный старт-бюджет

**Неделя 1 (тест):** 3 кампании × 500 ₽/день = 10 500 ₽/неделю.
- `gis-prof-spb-hot` — Санкт-Петербург, горячие ключи
- `gis-prof-411-fed` — Россия, тёплые ключи
- `gis-prof-retargeting` — показы тем, кто уже был на сайте, но не оставил заявку

**Цель:** CPL ≤ 5 000 ₽. При CR 2% и 15 000 ₽/неделю это 3 лида → при закрытии 1 из 3 в пакет «Организация» 500 тыс. ₽ = ROI ~ 33x.

**Неделя 2+:** удваиваем бюджет тех кампаний, где CPL ≤ 3 000 ₽. Отключаем тех, где > 7 000 ₽.
