import Link from 'next/link';

type Crumb = { label: string; href?: string };

/**
 * Breadcrumbs — визуальные хлебные крошки с микроразметкой.
 * Schema.org/BreadcrumbList уже есть в HomeJsonLd, тут — UI-сигнал
 * пользователю, что он на нужной странице, и Яндексу — что страница
 * имеет иерархическую навигацию.
 *
 * Размещается прямо после Header — на всех страницах одинаково
 * (главная: Главная > ГИС «Профилактика»).
 */
export function Breadcrumbs({ crumbs }: { crumbs?: Crumb[] }) {
  const items: Crumb[] = crumbs ?? [
    { label: 'Главная', href: '/' },
    { label: 'Подключение к ГИС «Профилактика»' },
  ];

  return (
    <nav
      aria-label="Хлебные крошки"
      className="bg-[var(--color-paper)] border-b border-slate-200/60"
    >
      <div className="container-x py-2.5">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-[13px] text-[var(--color-ink-2)]">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-2">
                {c.href && !last ? (
                  <Link
                    href={c.href}
                    className="hover:text-[var(--color-brand)] transition"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span
                    className={
                      last
                        ? 'text-[var(--color-ink)] font-semibold'
                        : 'text-[var(--color-ink-2)]'
                    }
                    aria-current={last ? 'page' : undefined}
                  >
                    {c.label}
                  </span>
                )}
                {!last && (
                  <span aria-hidden className="text-[var(--color-muted)]">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
