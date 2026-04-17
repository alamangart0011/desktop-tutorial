import { BRAND } from './constants';
import { PhoneIcon, MailIcon } from './Icons';

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
        aria-label={`Позвонить: ${BRAND.phone}`}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] text-white font-semibold px-3 py-3 text-sm transition active:scale-[0.97] min-h-[48px]"
      >
        <PhoneIcon className="w-4 h-4" />
        <span>Позвонить</span>
      </a>
      <a
        href="#contact"
        data-goal="sticky-cta-contact"
        aria-label="Оставить заявку на подключение к ГИС"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] text-[#052e1e] font-bold px-3 py-3 text-sm transition active:scale-[0.97] min-h-[48px]"
      >
        <MailIcon className="w-4 h-4" />
        <span>Заявка</span>
      </a>
    </div>
  );
}
