import Link from 'next/link';
import { BRAND, NAV } from './constants';

export function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-slate-200">
      <div className="container-x flex items-center justify-between h-16">
        <Link href="#top" className="flex items-center gap-2">
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
        <nav className="hidden lg:flex items-center gap-6">
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
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white text-sm font-semibold px-4 py-2.5 hover:bg-[var(--color-brand-2)] transition"
          >
            Получить расчёт
          </a>
        </div>
      </div>
    </header>
  );
}
