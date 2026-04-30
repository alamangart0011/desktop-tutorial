import { BRAND } from '@/components/constants';
import { FAQ_QA } from '@/components/faq-data';
import { VARIANT, VARIANT_KEY } from '@/lib/variants';
import { getVariantContent } from '@/lib/variant-content';

export const dynamic = 'force-static';

// Турбо-канал должен указывать на канонический URL варианта, иначе Яндекс склеит 6 доменов как зеркала.
const SITE = VARIANT.canonicalBase;
const VC = getVariantContent(VARIANT_KEY);
// Объединяем variant-специфичные и общие FAQ, как на сайте
const ALL_FAQ = [...VC.faq, ...FAQ_QA];

const escapeXml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const cdata = (s: string) => `<![CDATA[${s}]]>`;

export function GET() {
  const now = new Date().toUTCString();
  const pubDate = new Date().toUTCString();

  const turboH1 = `${VARIANT.h1} ${VARIANT.h1Accent}`.replace(/\u00a0/g, ' ');
  const turboPageBody = `
<header>
  <h1>${escapeXml(turboH1)}</h1>
  <figure>
    <img src="${SITE}/opengraph-image" />
    <figcaption>${escapeXml(VARIANT.regionBadge)} · ПП РФ № 411 · 21 Приказ ФСТЭК (УЗ2)</figcaption>
  </figure>
</header>
<p><strong>${escapeXml(BRAND.name)}</strong> — подключаем КДНиЗП, школы, опеку, соцзащиту, медучреждения и ОВД к федеральной ГИС «Профилактика» по Постановлению Правительства РФ № 411 от 01.04.2025. Базируемся в Санкт-Петербурге, работаем по СЗФО и дистанционно по РФ.</p>
<h2>Что входит в подключение под ключ</h2>
<ul>
  <li>Комплект из 8 документов по ПДн (уведомление РКН, Акт обследования, Модель угроз, Акт классификации, ТЗ на СЗПДн, ПМИ, Технический паспорт, Протокол/Заключение 3 года).</li>
  <li>Поставка СЗИ из реестра ФСТЭК: Secret Net Studio, ПАК «Соболь» v4, КриптоПро NGate Client, антивирус, СОВ, СДЗ (прямой дилер КриптоПро).</li>
  <li>Сертифицированная отечественная ОС (Astra Linux / Alt Linux / РЕД ОС).</li>
  <li>Установка СЗИ и аттестация ИСПДн по 21 Приказу ФСТЭК (УЗ2) — выполняют аккредитованные лицензиаты ФСТЭК/ФСБ на субподряде.</li>
  <li>Настройка доступа через ЕСИА, интеграция через СМЭВ.</li>
  <li>Обучение сотрудников с удостоверениями о повышении квалификации.</li>
  <li>Сопровождение по заявкам, SLA фиксируется в договоре.</li>
</ul>
<h2>Кому обязательно подключаться</h2>
<p>По ПП РФ № 411 — 18 категорий органов и учреждений: КДНиЗП, школы и СПО, опека и попечительство, соцзащита, здравоохранение, служба занятости, ОВД, учреждения культуры, спорта, досуга и туризма, ЦВСНП, СИЗО, воспитательные колонии, УИИ, уполномоченные по правам ребёнка.</p>
<h2>Штрафы</h2>
<p>За нарушение порядка обработки ПДн (ч. 1–6 ст. 13.11 КоАП) — до 700 тыс. ₽ юр. лицу. За утечку ПДн (ч. 13–15 ст. 13.11 КоАП в ред. ФЗ № 420 от 30.11.2024) — 3–15 млн ₽ юр. лицу. Повторно (ч. 16) — оборотный штраф 1–3 % годовой выручки, минимум 20 млн ₽. Штрафы применяются с 01.12.2025.</p>
<h2>Ответы на частые вопросы</h2>
${ALL_FAQ.map((qa) => `<h3>${escapeXml(qa.q)}</h3><p>${escapeXml(qa.a)}</p>`).join('\n')}
<p>Связаться: <a href="tel:${BRAND.phoneRaw}">${escapeXml(BRAND.phone)}</a> · <a href="mailto:${BRAND.email}">${escapeXml(BRAND.email)}</a></p>
`.trim();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:yandex="http://news.yandex.ru"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:turbo="http://turbo.yandex.ru"
     version="2.0">
  <channel>
    <title>${escapeXml(VARIANT.title)}</title>
    <link>${SITE}/</link>
    <description>${escapeXml(VARIANT.ogDescription)}</description>
    <language>ru</language>
    <lastBuildDate>${now}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <turbo:analytics type="Yandex" id=""></turbo:analytics>
    <item turbo="true">
      <link>${SITE}/</link>
      <turbo:source>${SITE}/</turbo:source>
      <turbo:topic>${escapeXml(turboH1)}</turbo:topic>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(BRAND.name)}</author>
      <title>${escapeXml(VARIANT.title)}</title>
      <description>${cdata(VARIANT.description)}</description>
      <turbo:content>${cdata(turboPageBody)}</turbo:content>
    </item>
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
