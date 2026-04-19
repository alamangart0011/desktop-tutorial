import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_POSTS, ALL_SLUGS, getPostBySlug, getRelated } from '@/lib/blog';
import { BRAND } from '@/components/constants';
import { VARIANT } from '@/lib/variants';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContextualCta } from '@/components/ContextualCta';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Не найдено' };
  const { meta } = post;
  const url = `${VARIANT.canonicalBase}/blog/${meta.slug}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: 'article',
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      authors: [BRAND.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const { meta, default: Content } = post;
  const url = `${VARIANT.canonicalBase}/blog/${meta.slug}`;
  const related = getRelated(meta.slug, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    author: {
      '@type': 'Organization',
      name: BRAND.name,
      url: VARIANT.canonicalBase,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      url: VARIANT.canonicalBase,
      logo: {
        '@type': 'ImageObject',
        url: `${VARIANT.canonicalBase}/favicon.svg`,
      },
    },
    keywords: meta.keywords.join(', '),
    timeRequired: `PT${meta.readMinutes}M`,
    articleSection: meta.category,
    inLanguage: 'ru-RU',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: VARIANT.canonicalBase,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Блог',
        item: `${VARIANT.canonicalBase}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: meta.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <Header />
      <Breadcrumbs
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Блог', href: '/blog' },
          { label: meta.title },
        ]}
      />
      <main className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <article className="py-12 md:py-16">
          <div className="container-x max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
              <span className="rounded-full bg-blue-50 text-[var(--color-brand)] px-2.5 py-1">
                {meta.category}
              </span>
              <time dateTime={meta.date} className="text-slate-500">
                {formatDate(meta.date)}
              </time>
              <span className="text-slate-500">· {meta.readMinutes} мин чтения</span>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.15]">
              {meta.title}
            </h1>
            {meta.excerpt && (
              <p className="mt-4 text-lg text-[var(--color-ink-2)] leading-relaxed font-medium">
                {meta.excerpt}
              </p>
            )}
            <div className="prose prose-slate mt-8 max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-lg prose-h3:mt-6 prose-a:text-[var(--color-brand)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--color-ink)] prose-ol:my-4 prose-ul:my-4 prose-li:my-1">
              <Content />
            </div>
          </div>
        </article>

        <ContextualCta variant="audit" />

        {related.length > 0 && (
          <section className="py-12 md:py-16 bg-[var(--color-paper)] border-t border-slate-200">
            <div className="container-x max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-ink)]">
                Похожие материалы
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    data-goal="blog-related-click"
                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[var(--color-brand)] hover:shadow-md"
                  >
                    <span className="text-xs font-medium rounded-full bg-slate-100 text-slate-700 px-2 py-0.5">
                      {r.category}
                    </span>
                    <h3 className="mt-3 font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition leading-snug">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500">{r.readMinutes} мин</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-8 bg-white border-t border-slate-200">
          <div className="container-x max-w-4xl text-center">
            <Link
              href="/blog"
              className="text-sm font-semibold text-[var(--color-brand)] hover:underline"
            >
              ← Ко всем статьям ({ALL_POSTS.length})
            </Link>
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
