import Link from 'next/link';
import { ALL_POSTS } from '@/lib/blog';
import { ArrowRightIcon } from './Icons';

export function BlogTeaser() {
  const posts = ALL_POSTS.slice(0, 3);
  if (!posts.length) return null;

  return (
    <section
      id="blog-teaser"
      className="py-12 md:py-16 bg-white border-t border-slate-200 scroll-mt-20"
      aria-labelledby="blog-teaser-title"
    >
      <div className="container-x">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
              База знаний
            </div>
            <h2
              id="blog-teaser-title"
              className="mt-2 text-2xl md:text-3xl font-extrabold text-[var(--color-ink)] tracking-tight"
            >
              Свежие материалы от инженеров лицензиата ФСТЭК
            </h2>
            <p className="mt-2 text-sm md:text-base text-[var(--color-ink-2)] max-w-2xl">
              Разборы нормативки, чек-листы и сравнения СЗИ — без воды,
              на языке ответственных за ИБ в ведомстве.
            </p>
          </div>
          <Link
            href="/blog"
            data-goal="blog-teaser-all"
            className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] hover:underline"
          >
            Все статьи ({ALL_POSTS.length})
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.meta.slug}
              href={`/blog/${p.meta.slug}`}
              data-goal="blog-teaser-card"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[var(--color-brand)] hover:shadow-md flex flex-col"
            >
              <span className="self-start rounded-full bg-blue-50 text-[var(--color-brand)] text-xs font-semibold px-2.5 py-1">
                {p.meta.category}
              </span>
              <h3 className="mt-4 font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition leading-snug text-lg">
                {p.meta.title}
              </h3>
              {p.meta.excerpt && (
                <p className="mt-3 text-sm text-[var(--color-ink-2)] leading-relaxed line-clamp-3">
                  {p.meta.excerpt}
                </p>
              )}
              <div className="mt-auto pt-4 text-xs text-slate-500 flex items-center justify-between">
                <span>{p.meta.readMinutes} мин</span>
                <span className="text-[var(--color-brand)] font-semibold group-hover:underline">
                  Читать →
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 md:hidden text-center">
          <Link
            href="/blog"
            data-goal="blog-teaser-all-mobile"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] hover:underline"
          >
            Все статьи ({ALL_POSTS.length})
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
