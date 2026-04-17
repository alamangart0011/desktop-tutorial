'use client';

import { useEffect, useRef, useState } from 'react';
import { REVIEWS, RATING } from './reviews-data';

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Оценка ${value} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
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
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => setIdx((i) => (i + 1) % REVIEWS.length), 6500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [idx, paused]);

  const r = REVIEWS[idx];

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
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight h-accent">
              КДН, школы, опека и соцзащита уже работают в системе
            </h2>
            <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
              Обезличенные по согласованию с заказчиками (ПДн руководителей и наименования
              учреждений не публикуем по 152-ФЗ). Полные референсы — под NDA.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Stars value={Math.round(RATING.value)} size={18} />
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

        <div
          className="mt-10 relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <figure
            key={r.author + r.date}
            aria-live="polite"
            className="rounded-3xl border border-slate-200 bg-white p-7 md:p-10 shadow-xl relative overflow-hidden animate-[ei-fade_500ms_ease-out]"
          >
            <span
              aria-hidden
              className="absolute -top-6 left-6 md:left-10 text-[6rem] md:text-[8rem] font-serif text-[var(--color-brand)]/10 leading-none select-none"
            >
              “
            </span>
            <div className="relative flex items-center justify-between gap-4">
              <Stars value={r.rating} size={20} />
              <time className="text-xs text-[var(--color-muted)]">{fmtDate(r.date)}</time>
            </div>
            <blockquote className="relative mt-5 text-lg md:text-xl text-[var(--color-ink)] leading-relaxed font-medium">
              «{r.text}»
            </blockquote>
            <figcaption className="relative mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="font-bold text-[var(--color-ink)]">{r.author}</div>
                <div className="text-sm text-[var(--color-muted)]">
                  {r.role} · {r.org}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-200 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition"
                  aria-label="Предыдущий отзыв"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setIdx((i) => (i + 1) % REVIEWS.length)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-2)] transition"
                  aria-label="Следующий отзыв"
                >
                  →
                </button>
              </div>
            </figcaption>
          </figure>

          <div className="mt-5 flex items-center justify-center gap-2" role="tablist">
            {REVIEWS.map((_r, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Отзыв ${i + 1} из ${REVIEWS.length}`}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  i === idx
                    ? 'w-8 bg-[var(--color-brand)]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
