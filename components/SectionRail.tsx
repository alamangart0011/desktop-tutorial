'use client';

import { useEffect, useState } from 'react';
import { NAV } from './constants';

export function SectionRail() {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const ids = NAV.map((n) => n.href.replace('#', ''));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top));
        if (visible[0]) setActive('#' + visible[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Навигация по разделам"
      className="hidden xl:flex fixed top-1/2 -translate-y-1/2 left-3 z-30 flex-col gap-1.5 max-h-[80vh] overflow-y-auto no-scrollbar"
    >
      {NAV.map((n) => {
        const isActive = active === n.href;
        return (
          <a
            key={n.href}
            href={n.href}
            className={`group flex items-center gap-2 pr-2 text-[11px] font-semibold transition ${
              isActive
                ? 'text-[var(--color-brand)]'
                : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            <span
              className={`block h-[2px] transition-all ${
                isActive
                  ? 'w-6 bg-[var(--color-brand)]'
                  : 'w-3 bg-[var(--color-line)] group-hover:w-5 group-hover:bg-[var(--color-ink)]'
              }`}
              aria-hidden="true"
            />
            <span
              className={`transition-opacity ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              {n.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
