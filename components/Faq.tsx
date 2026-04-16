'use client';

import { useState } from 'react';
import { FAQ_QA } from './faq-data';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-16 md:py-24 border-t border-slate-200">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-blue-50 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Вопросы и ответы
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            FAQ по ГИС «Профилактика», ФСТЭК и документам
          </h2>
        </div>
        <div className="mt-10 max-w-4xl grid gap-3">
          {FAQ_QA.map((x, i) => {
            const isOpen = open === i;
            return (
              <div
                key={x.q}
                className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
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
