import { BRAND } from '@/components/constants';
import { FAQ_QA } from '@/components/faq-data';

export const dynamic = 'force-static';

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

  const turboPageBody = `
<header>
  <h1>ГИС «Профилактика» — подключение под ключ за 35–45 дней</h1>
  <figure>
    <img src="${BRAND.site}/opengraph-image" />
    <figcaption>Подключение к ГИС «Профилактика» по ПП РФ № 411 и 21 Приказу ФСТЭК (УЗ2)</figcaption>
  </figure>
</header>
<p><strong>${escapeXml(BRAND.name)}</strong> — профильная ИБ-компания в Санкт-Петербурге. Подключаем КДНиЗП, школы, опеку, соцзащиту, медучреждения и ОВД к федеральной ГИС «Профилактика» по Постановлению Правительства РФ № 411 от 01.04.2025.</p>
<h2>Что входит в подключение под ключ</h2>
<ul>
  <li>Комплект из 8 документов по ПДн (уведомление РКН, Акт обследования, Модель угроз, Акт классификации, ТЗ на СЗПДн, ПМИ, Технический паспорт, Протокол/Заключение 3 года).</li>
  <li>Поставка и установка СЗИ: Secret Net Studio, ПАК «Соболь» v4, КриптоПро NGate Client, антивирус, СОВ, СДЗ.</li>
  <li>Сертифицированная отечественная ОС (Astra Linux / Alt Linux / РЕД ОС).</li>
  <li>Аттестация ИСПДн по 21 Приказу ФСТЭК, уровень защищённости УЗ2.</li>
  <li>Настройка доступа через ЕСИА, интеграция через СМЭВ.</li>
  <li>Обучение сотрудников с удостоверениями о повышении квалификации.</li>
  <li>Техподдержка 24/7, SLA 4 часа.</li>
</ul>
<h2>Кому обязательно подключаться</h2>
<p>По ПП РФ № 411 — 18 категорий органов и учреждений: КДНиЗП, школы и СПО, опека и попечительство, соцзащита, здравоохранение, служба занятости, ОВД, учреждения культуры, спорта, досуга и туризма, ЦВСНП, СИЗО, воспитательные колонии, УИИ, уполномоченные по правам ребёнка.</p>
<h2>Штрафы</h2>
<p>Нарушение требований по обработке ПДн несовершеннолетних — до 5 млн ₽ для юрлиц по ст. 13.11 КоАП. Штрафы уже применяются с 01.12.2025.</p>
<h2>Ответы на частые вопросы</h2>
${FAQ_QA.map((qa) => `<h3>${escapeXml(qa.q)}</h3><p>${escapeXml(qa.a)}</p>`).join('\n')}
<p>Связаться: <a href="tel:${BRAND.phoneRaw}">${escapeXml(BRAND.phone)}</a> · <a href="mailto:${BRAND.email}">${escapeXml(BRAND.email)}</a></p>
`.trim();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:yandex="http://news.yandex.ru"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:turbo="http://turbo.yandex.ru"
     version="2.0">
  <channel>
    <title>${escapeXml(BRAND.name)} — ГИС «Профилактика»</title>
    <link>${BRAND.site}/</link>
    <description>${escapeXml('Подключение к ГИС «Профилактика» под ключ по ПП РФ № 411 и 21 Приказу ФСТЭК (УЗ2).')}</description>
    <language>ru</language>
    <lastBuildDate>${now}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <turbo:analytics type="Yandex" id=""></turbo:analytics>
    <item turbo="true">
      <link>${BRAND.site}/</link>
      <turbo:source>${BRAND.site}/</turbo:source>
      <turbo:topic>ГИС «Профилактика» — подключение под ключ за 35–45 дней</turbo:topic>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(BRAND.name)}</author>
      <title>${escapeXml('ГИС «Профилактика» — подключение под ключ за 35–45 дней · ПП РФ № 411 · ФСТЭК УЗ2')}</title>
      <description>${cdata('Подключение КДН, школ, опеки, соцзащиты к ГИС «Профилактика». Документы ПДн, СЗИ, аттестация ИСПДн, обучение, техподдержка.')}</description>
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
