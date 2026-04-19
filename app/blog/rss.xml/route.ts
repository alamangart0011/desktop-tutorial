import { ALL_POSTS } from '@/lib/blog';
import { BRAND } from '@/components/constants';
import { VARIANT } from '@/lib/variants';

export const dynamic = 'force-static';

/**
 * RSS 2.0 для блога — Яндекс.Дзен/Пульс, читалки, подписка.
 * Отдельно от turbo.xml (он под Яндекс.Турбо лендинга).
 */
function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const SITE = VARIANT.canonicalBase;
  const now = new Date().toUTCString();
  const items = ALL_POSTS.map(({ meta }) => {
    const pub = new Date(meta.date + 'T00:00:00Z').toUTCString();
    const url = `${SITE}/blog/${meta.slug}`;
    return `    <item>
      <title>${escape(meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      <description>${escape(meta.excerpt ?? meta.description)}</description>
      <category>${escape(meta.category)}</category>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Блог ${escape(BRAND.name)} — ГИС «Профилактика» и ИБ для госсектора</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Разборы ПП 411, 21 Приказа ФСТЭК, сравнения СЗИ, чек-листы аттестации ИСПДн. От действующих инженеров лицензиата ФСТЭК.</description>
    <language>ru-RU</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
