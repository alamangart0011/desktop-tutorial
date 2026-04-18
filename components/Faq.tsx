'use client';

import { useMemo, useState } from 'react';
import { FAQ_QA } from './faq-data';
import { SearchIcon, XIcon, PlusIcon } from './Icons';
import { VARIANT_KEY } from '@/lib/variants';
import { getVariantContent } from '@/lib/variant-content';

const VC = getVariantContent(VARIANT_KEY);
// Ставим вариант-специфичные вопросы первыми, затем общий корпус FAQ.
// Дедуп по тексту вопроса — варианта-специфичные перекрывают общие (приходят раньше).
const FAQ_MERGED = (() => {
  const seen = new Set<string>();
  const out: { q: string; a: string }[] = [];
  for (const item of [...VC.faq, ...FAQ_QA]) {
    const key = item.q.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
})();

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return FAQ_MERGED.map((x, i) => ({ ...x, i }));
    return FAQ_MERGED.map((x, i) => ({ ...x, i })).filter(
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
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
            {VC.faqHeading}
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-2)]">
            {VC.faqSub} Поиск по {FAQ_MERGED.length} вопросам.
          </p>
        </div>

        <div className="mt-8 max-w-4xl">
          <div className="relative">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Искать вопрос..."
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 pl-12 text-sm md:text-base outline-none focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand)]/10 transition"
              aria-label="Поиск по FAQ"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon className="w-5 h-5" />
            </span>
            {q && (
              <button
                type="button"
                onClick={() => setQ('')}
                aria-label="Очистить"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-slate-500 hover:bg-slate-100 flex items-center justify-center transition"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="mt-2 text-xs text-slate-600" aria-live="polite">
            Найдено: {filtered.length} из {FAQ_MERGED.length}
          </div>
        </div>

        <div className="mt-6 max-w-4xl grid gap-3">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
              Ничего не нашлось. Задайте вопрос напрямую —{' '}
              <a
                href="#contact"
                data-goal="faq-empty-contact"
                className="text-[var(--color-brand)] font-semibold underline"
              >
                в форме контактов
              </a>
              .
            </div>
          )}
          {filtered.map((x) => {
            const isOpen = open === x.i;
            return (
              <div
                key={`${x.i}-${x.q}`}
                className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] overflow-hidden transition hover:border-[var(--color-brand-2)]/40"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : x.i)}
                  data-goal="faq-open"
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-white transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[var(--color-ink)]">{x.q}</span>
                  <span
                    className={`inline-flex w-8 h-8 shrink-0 rounded-full items-center justify-center transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[var(--color-brand)] text-white rotate-45'
                        : 'bg-white border border-slate-200 text-[var(--color-brand)]'
                    }`}
                  >
                    <PlusIcon className="w-4 h-4" />
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
