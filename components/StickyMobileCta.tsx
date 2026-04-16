import { BRAND } from './constants';

export function StickyMobileCta() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-3 py-2.5 flex gap-2"
      role="complementary"
      aria-label="Быстрая связь"
    >
      <a
        href={`tel:${BRAND.phoneRaw}`}
        className="flex-1 inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-3 py-3 text-sm"
      >
        Позвонить
      </a>
      <a
        href="#callback"
        className="flex-1 inline-flex items-center justify-center rounded-xl bg-[var(--color-accent)] text-white font-semibold px-3 py-3 text-sm"
      >
        Обратный звонок
      </a>
      <a
        href="#contact"
        className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-300 text-[var(--color-ink)] font-semibold px-3 py-3 text-sm"
      >
        Заявка
      </a>
    </div>
  );
}
