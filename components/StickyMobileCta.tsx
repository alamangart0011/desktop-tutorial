import { BRAND } from './constants';

export function StickyMobileCta() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-3 py-2.5 flex gap-2 slide-up-in shadow-[0_-8px_24px_-12px_rgba(11,59,140,0.25)]"
      role="complementary"
      aria-label="Быстрая связь"
    >
      <a
        href={`tel:${BRAND.phoneRaw}`}
        data-goal="phone-tap-mobile"
        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-brand)] text-white font-semibold px-3 py-3 text-sm transition active:scale-[0.97]"
      >
        <span aria-hidden>📞</span>
        Позвонить
      </a>
      <a
        href="#contact"
        data-goal="sticky-cta-contact"
        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-accent)] text-white font-semibold px-3 py-3 text-sm transition active:scale-[0.97]"
      >
        Оставить заявку
      </a>
    </div>
  );
}
