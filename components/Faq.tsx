'use client';

import { useMemo, useState } from 'react';
import { FAQ_QA } from './faq-data';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return FAQ_QA.map((x, i) => ({ ...x, i }));
    return FAQ_QA.map((x, i) => ({ ...x, i })).filter(
      (x) => x.q.toLowerCase().includes(query) || x.a.toLowerCase().includes(query)
    );
  }, [q]);

  return (
    <section id="faq" className="bg-white py-16 md:py-24 border-t border-slate-200">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-blue-50 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Вопросы и ответы
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight h-accent">
            FAQ по ГИС «Профилактика», ФСТЭК и документам
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-2)]">
            Поиск по {FAQ_QA.length} вопросам — введите «штраф», «СЗИ», «Astra», «СМЭВ» и т. п.
          </p>
        </div>

        <div className="mt-8 max-w-4xl">
          <div className="relative">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Искать вопрос..."
              className="w-full rounded-xl border-2 border-[var(--color-line)] bg-white px-5 py-3.5 pl-12 text-sm md:text-base outline-none focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand)]/10 transition"
              aria-label="Поиск по FAQ"
            />
            <span aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-lg">🔍</span>
            {q && (
              <button
                type="button"
                onClick={() => setQ('')}
                aria-label="Очистить"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-[var(--color-muted)] hover:bg-[var(--color-paper)] flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
          <div className="mt-2 text-xs text-[var(--color-muted)]" aria-live="polite">
            Найдено: {filtered.length} из {FAQ_QA.length}
          </div>
        </div>

        <div className="mt-6 max-w-4xl grid gap-3">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-[var(--color-muted)]">
              Ничего не нашлось. Задайте вопрос напрямую —{' '}
              <a href="#contact" className="text-[var(--color-brand)] font-semibold underline">
                в форме контактов
              </a>
              .
            </div>
          )}
          {filtered.map((x) => {
            const isOpen = open === x.i;
            return (
              <div
                key={x.q}
                className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] overflow-hidden transition hover:border-[var(--color-brand-2)]/40"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : x.i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-white transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[var(--color-ink)]">{x.q}</span>
                  <span
                    className={`inline-flex w-8 h-8 shrink-0 rounded-full items-center justify-center text-lg font-bold transition ${
                      isOpen ? 'bg-[var(--color-brand)] text-white rotate-45' : 'bg-white border border-slate-200 text-[var(--color-brand)]'
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[var(--color-ink-2)] leading-relaxed">
                    {x.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
