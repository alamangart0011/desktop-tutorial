import { REVIEWS, RATING } from './reviews-data';

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Оценка ${value} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill={i < value ? '#f59e0b' : '#e2e8f0'}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15l-5.2 2.7 1-5.9L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function fmtDate(iso: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

export function Reviews() {
  return (
    <section
      id="reviews"
      className="bg-[var(--color-paper)] py-16 md:py-24 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="grid md:grid-cols-[1.3fr,1fr] gap-8 items-end">
          <div>
            <span className="inline-block rounded-full bg-[var(--color-accent)]/15 text-emerald-700 text-xs font-semibold px-3 py-1">
              Отзывы заказчиков
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
              КДН, школы, опека и соцзащита уже работают в системе
            </h2>
            <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
              Отзывы — обезличенные по согласованию с заказчиками (ПДн руководителей и наименования
              учреждений не публикуем по 152-ФЗ). Полные референсы предоставляем по запросу под NDA.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Stars value={Math.round(RATING.value)} />
              <span className="text-2xl font-extrabold text-[var(--color-ink)]">
                {RATING.value.toFixed(1)}
              </span>
              <span className="text-xs text-[var(--color-muted)]">из 5</span>
            </div>
            <div className="mt-2 text-xs text-[var(--color-muted)]">
              По {RATING.count} проверяемым отзывам заказчиков из госсектора
            </div>
          </div>
        </div>

        <ul className="mt-10 grid md:grid-cols-2 gap-5">
          {REVIEWS.map((r) => (
            <li
              key={r.author + r.date}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between">
                <Stars value={r.rating} />
                <span className="text-[11px] text-[var(--color-muted)]">{fmtDate(r.date)}</span>
              </div>
              <p className="mt-3 text-[var(--color-ink)] leading-relaxed text-[15px]">
                «{r.text}»
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-sm font-semibold text-[var(--color-ink)]">{r.author}</div>
                <div className="text-xs text-[var(--color-muted)]">
                  {r.role} · {r.org}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
