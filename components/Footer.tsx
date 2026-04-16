import Link from 'next/link';
import { BRAND, NAV } from './constants';

export function Footer() {
  const year = new Date().getFullYear();
  const laws = [
    { t: '120-ФЗ', url: 'https://www.consultant.ru/document/cons_doc_LAW_23509/' },
    { t: '152-ФЗ', url: 'https://www.consultant.ru/document/cons_doc_LAW_61801/' },
    { t: 'ПП РФ № 411', url: 'https://www.garant.ru/products/ipo/prime/doc/411693029/' },
    { t: 'Приказ ФСТЭК № 21', url: 'https://fstec.ru/en/53-normotvorcheskaya/akty/prikazy/691' },
  ];
  return (
    <footer className="bg-[#071332] text-white/80">
      <div className="container-x py-12 grid md:grid-cols-[1.2fr,1fr,1fr] gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-white text-[var(--color-brand)] font-extrabold">
              О
            </span>
            <div className="font-extrabold">{BRAND.shortName}</div>
          </div>
          <p className="mt-4 text-sm text-white/60 max-w-sm leading-relaxed">
            {BRAND.legal}. Решения по информационной безопасности и подключению
            организаций к государственным информационным системам. Работаем с госсектором и
            коммерческими структурами.
          </p>
          <p className="mt-4 text-xs text-white/50">
            © {year} {BRAND.legal}. Все права защищены.
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-white/50">
            Навигация
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-white transition">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-white/50">
            Контакты и правовая база
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-white transition">
                {BRAND.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="hover:text-white transition">
                {BRAND.email}
              </a>
            </li>
            <li>{BRAND.address}</li>
            <li>{BRAND.workingHours}</li>
          </ul>
          <ul className="mt-5 flex flex-wrap gap-2">
            {laws.map((l) => (
              <li key={l.t}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex text-[11px] font-semibold rounded-full bg-white/10 border border-white/10 px-2.5 py-1 hover:bg-white hover:text-[var(--color-brand)] transition"
                >
                  {l.t} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-4 text-[11px] text-white/45 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <span>
            Не является публичной офертой. Состав и стоимость работ фиксируются в договоре.
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/privacy" className="hover:text-white">
              Политика обработки ПДн
            </Link>
            <span className="opacity-40">·</span>
            <a href={BRAND.site} target="_blank" rel="noreferrer noopener" className="hover:text-white">
              {BRAND.site}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
