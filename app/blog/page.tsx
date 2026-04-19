import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_POSTS } from '@/lib/blog';
import { BRAND } from '@/components/constants';
import { VARIANT } from '@/lib/variants';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `Блог по ГИС «Профилактика» и защите ПДн — ${BRAND.shortName}`,
  description:
    'Разборы нормативки (ПП 411, 152-ФЗ, 21 Приказ ФСТЭК), кейсы внедрений, сравнения СЗИ, чек-листы аттестации ИСПДн. Пишут инженеры НПК «Оборон-Экран», лицензиат ФСТЭК и ФСБ с 2019 года.',
  alternates: { canonical: `${VARIANT.canonicalBase}/blog` },
  openGraph: {
    title: 'Блог по ГИС «Профилактика» и защите ПДн',
    description:
      'Разборы ПП 411, УЗ2 ФСТЭК, сравнения СЗИ, чек-листы. От действующих лицензиатов ФСТЭК.',
    url: `${VARIANT.canonicalBase}/blog`,
    type: 'website',
  },
};

const BLOG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${VARIANT.canonicalBase}/blog#blog`,
  name: `Блог ${BRAND.name} — ГИС «Профилактика» и ИБ для госсектора`,
  url: `${VARIANT.canonicalBase}/blog`,
  inLanguage: 'ru-RU',
  publisher: {
    '@type': 'Organization',
    name: BRAND.name,
    url: VARIANT.canonicalBase,
  },
  blogPost: ALL_POSTS.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.meta.title,
    url: `${VARIANT.canonicalBase}/blog/${p.meta.slug}`,
    datePublished: p.meta.date,
    dateModified: p.meta.updated ?? p.meta.date,
    description: p.meta.description,
    author: { '@type': 'Organization', name: BRAND.name },
    keywords: p.meta.keywords.join(', '),
  })),
};

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <Breadcrumbs
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Блог' },
        ]}
      />
      <main className="min-h-screen bg-[var(--color-paper)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_JSONLD) }}
        />
        <section className="bg-white border-b border-slate-200 py-16 md:py-20">
          <div className="container-x max-w-4xl">
            <span className="inline-block rounded-full bg-blue-50 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
              Блог · {ALL_POSTS.length} статей
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-ink)]">
              Разборы ГИС «Профилактика», УЗ2 ФСТЭК и защиты ПДн
            </h1>
            <p className="mt-4 text-lg text-[var(--color-ink-2)] leading-relaxed">
              Пишем без канцелярита: как работает ПП 411, какие СЗИ реально нужны,
              где клиенты наступают на грабли при аттестации, и как выбрать
              Secret Net Studio vs альтернативы. От действующих инженеров
              лицензиата ФСТЭК и ФСБ России.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-x max-w-4xl grid gap-6">
            {ALL_POSTS.map(({ meta }) => (
              <article
                key={meta.slug}
                className="group rounded-2xl border border-slate-200 bg-white p-6 md:p-8 transition hover:border-[var(--color-brand)] hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
                  <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-1">
                    {meta.category}
                  </span>
                  <time dateTime={meta.date} className="text-slate-500">
                    {formatDate(meta.date)}
                  </time>
                  <span className="text-slate-500">· {meta.readMinutes} мин чтения</span>
                </div>
                <h2 className="mt-3 text-xl md:text-2xl font-bold text-[var(--color-ink)] leading-snug">
                  <Link
                    href={`/blog/${meta.slug}`}
                    data-goal="blog-post-click"
                    className="group-hover:text-[var(--color-brand)] transition"
                  >
                    {meta.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm md:text-base text-[var(--color-ink-2)] leading-relaxed">
                  {meta.excerpt ?? meta.description}
                </p>
                <Link
                  href={`/blog/${meta.slug}`}
                  data-goal="blog-post-click"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:underline"
                >
                  Читать →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
