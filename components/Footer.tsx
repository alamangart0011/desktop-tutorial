import Link from 'next/link';
import { BRAND, NAV } from './constants';
import { VARIANT } from '@/lib/variants';
import { ExternalLinkIcon } from './Icons';

// Ссылка «назад на сайт» в Footer должна вести на текущий вариант, иначе на pp411.ru ссылка уходит на gisprof.ru.
const SITE = VARIANT.canonicalBase;
const SITE_PRETTY = VARIANT.host.startsWith('xn--')
  ? 'гис-411.рф'
  : VARIANT.host;

export function Footer() {
  const year = new Date().getFullYear();
  const laws = [
    { t: '120-ФЗ', url: 'https://www.consultant.ru/document/cons_doc_LAW_23509/' },
    { t: '152-ФЗ', url: 'https://www.consultant.ru/document/cons_doc_LAW_61801/' },
    { t: 'ПП РФ № 411', url: 'https://www.garant.ru/products/ipo/prime/doc/411693029/' },
    { t: 'Приказ ФСТЭК № 21', url: 'https://fstec.ru/en/53-normotvorcheskaya/akty/prikazy/691' },
  ];
  return (
    <footer
      className="bg-[#071332] text-white/90"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content={BRAND.name} />
      <meta itemProp="legalName" content={BRAND.legal} />
      <meta itemProp="url" content={SITE} />
      <meta itemProp="taxID" content={BRAND.inn} />
      <div className="container-x py-12 grid grid-cols-1 md:grid-cols-[1.2fr,1fr,1fr] gap-8 md:gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-white text-[var(--color-brand)] font-extrabold">
              О
            </span>
            <div className="font-extrabold text-white">{BRAND.shortName}</div>
          </div>
          <p className="mt-4 text-sm text-white/90 max-w-sm leading-relaxed" itemProp="description">
            {BRAND.legal}. Решения по информационной безопасности и подключению
            организаций к государственным информационным системам. Работаем с госсектором и
            коммерческими структурами.
          </p>
          <p className="mt-4 text-xs text-white/70">
            © {year} {BRAND.legal}. Все права защищены.
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-white/70">
            Навигация
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-white/85 hover:text-white transition">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/blog" className="text-white/85 hover:text-white transition">
                Блог
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-white/70">
            Контакты и правовая база
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="text-white/90 hover:text-white transition"
                itemProp="telephone"
                data-goal="phone-tap-footer"
              >
                {BRAND.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${BRAND.email}`}
                className="text-white/90 hover:text-white transition"
                itemProp="email"
                data-goal="email-tap-footer"
              >
                {BRAND.email}
              </a>
            </li>
            <li
              className="text-white/85 leading-relaxed"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <meta itemProp="streetAddress" content={BRAND.streetAddress} />
              <meta itemProp="addressLocality" content={BRAND.address} />
              <meta itemProp="addressRegion" content={BRAND.region} />
              <meta itemProp="postalCode" content={BRAND.postalCode} />
              <meta itemProp="addressCountry" content="RU" />
              {BRAND.fullAddress}
            </li>
            <li>
              <time itemProp="openingHours" dateTime="Mo-Fr 09:00-18:00" className="text-white/85">
                {BRAND.workingHours}
              </time>
            </li>
          </ul>
          <dl className="mt-5 grid grid-cols-3 gap-2 text-[11px]">
            <div className="rounded-md bg-white/10 border border-white/15 px-2 py-1.5">
              <dt className="uppercase tracking-wider text-white/70 text-[9px] font-bold">
                ИНН
              </dt>
              <dd className="font-semibold text-white">{BRAND.inn}</dd>
            </div>
            <div className="rounded-md bg-white/10 border border-white/15 px-2 py-1.5">
              <dt className="uppercase tracking-wider text-white/70 text-[9px] font-bold">
                ОГРН
              </dt>
              <dd className="font-semibold text-white">{BRAND.ogrn}</dd>
            </div>
            <div className="rounded-md bg-white/10 border border-white/15 px-2 py-1.5">
              <dt className="uppercase tracking-wider text-white/70 text-[9px] font-bold">
                КПП
              </dt>
              <dd className="font-semibold text-white">{BRAND.kpp}</dd>
            </div>
          </dl>
          <ul className="mt-5 flex flex-wrap gap-2">
            {laws.map((l) => (
              <li key={l.t}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold rounded-full bg-white/10 border border-white/15 text-white/90 px-2.5 py-1 hover:bg-white hover:text-[var(--color-brand)] transition"
                >
                  {l.t}
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-x py-4 text-[11px] text-white/70 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <span>
            Не является публичной офертой. Состав и стоимость работ фиксируются в договоре.
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/privacy" className="text-white/85 hover:text-white transition">
              Политика обработки ПДн
            </Link>
            <span className="opacity-50">·</span>
            <a
              href={SITE}
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-white/85 hover:text-white transition"
            >
              {SITE_PRETTY}
              <ExternalLinkIcon className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
