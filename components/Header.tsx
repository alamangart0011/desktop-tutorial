'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BRAND, NAV } from './constants';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-slate-200">
      <div className="container-x flex items-center justify-between h-16">
        <Link href="#top" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-extrabold">
            О
          </span>
          <span className="font-extrabold tracking-tight text-[15px] leading-tight">
            {BRAND.shortName}
            <span className="block text-[11px] font-medium text-[var(--color-muted)]">
              ГИС «Профилактика»
            </span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6" aria-label="Главное меню">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-[var(--color-ink-2)] hover:text-[var(--color-brand)] transition"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${BRAND.phoneRaw}`}
            className="hidden md:inline-flex text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand)]"
          >
            {BRAND.phone}
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white text-sm font-semibold px-4 py-2.5 hover:bg-[var(--color-brand-2)] transition"
          >
            Получить расчёт
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-[var(--color-ink)]"
            aria-label="Открыть меню"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t border-slate-200 bg-white"
          aria-label="Мобильное меню"
        >
          <ul className="container-x py-3 grid gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[var(--color-ink)] hover:bg-slate-50"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={`tel:${BRAND.phoneRaw}`}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 text-[var(--color-ink)] font-semibold px-3 py-3 text-sm"
              >
                Позвонить
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-3 py-3 text-sm"
              >
                Заявка
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
