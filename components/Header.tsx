'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BRAND, NAV } from './constants';
import { UrgencyBar } from './UrgencyBar';
import { ArrowRightIcon } from './Icons';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const anchors = NAV
      .map((n) => n.href)
      .filter((h) => h.startsWith('#'))
      .map((h) => h.slice(1));
    const els = anchors
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => !!n);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`site-header sticky top-0 z-40 border-b border-slate-200 ${
        scrolled ? 'glass-solid is-scrolled' : 'glass'
      }`}
    >
      <UrgencyBar />
      <div
        className={`container-x flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}
      >
        <Link
          href="#top"
          className="flex items-center gap-2 group shrink-0"
          onClick={() => setOpen(false)}
        >
          <span
            className={`inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-extrabold transition-all duration-300 group-hover:bg-[var(--color-brand-2)] group-hover:shadow-md shrink-0 ${
              scrolled ? 'w-8 h-8 text-sm' : 'w-9 h-9'
            }`}
          >
            О
          </span>
          <span className="font-extrabold tracking-tight text-[15px] leading-tight whitespace-nowrap">
            {BRAND.shortName}
            <span className="block text-[11px] font-medium text-[var(--color-muted)] whitespace-nowrap">
              ГИС «Профилактика»
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 min-w-0" aria-label="Главное меню">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              aria-current={active === n.href ? 'true' : undefined}
              className={`nav-link text-sm whitespace-nowrap transition-colors ${
                active === n.href
                  ? 'text-[var(--color-brand)] font-semibold'
                  : 'text-[var(--color-ink-2)] hover:text-[var(--color-brand)]'
              }`}
            >
              {n.label}
            </a>
          ))}
          <Link
            href="/blog"
            className="nav-link text-sm whitespace-nowrap transition-colors text-[var(--color-ink-2)] hover:text-[var(--color-brand)]"
          >
            Блог
          </Link>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`tel:${BRAND.phoneRaw}`}
            className="hidden xl:inline-flex text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand)] transition-colors whitespace-nowrap"
          >
            {BRAND.phone}
          </a>
          <a
            href="#contact"
            data-goal="header-contact"
            className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-4 gap-2 group whitespace-nowrap"
          >
            Получить&nbsp;расчёт
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-[var(--color-ink)] hover:border-[var(--color-brand-2)] hover:bg-slate-50 transition"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t border-slate-200 bg-white slide-down"
          aria-label="Мобильное меню"
        >
          <ul className="container-x py-3 grid gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[var(--color-ink)] hover:bg-slate-50 transition"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-[var(--color-ink)] hover:bg-slate-50 transition"
              >
                Блог
              </Link>
            </li>
            <li className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={`tel:${BRAND.phoneRaw}`}
                onClick={() => setOpen(false)}
                className="btn-secondary text-sm"
              >
                Позвонить
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                data-goal="header-mobile-contact"
                className="btn-primary text-sm"
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
