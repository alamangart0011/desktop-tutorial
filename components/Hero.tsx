import { BRAND } from './constants';
import { VARIANT } from '@/lib/variants';
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldCheckIcon,
  FileCheckIcon,
  HandshakeIcon,
  ClockIcon,
} from './Icons';

const HERO_BADGES = [
  { Icon: ShieldCheckIcon, t: 'По ПП РФ № 411' },
  { Icon: FileCheckIcon, t: '8 документов ПДн' },
  { Icon: HandshakeIcon, t: 'Аттестация — лицензиат ФСТЭК' },
  { Icon: ClockIcon, t: 'Срок 35–45 дней' },
];

const SIDE_ITEMS = [
  'Ответим в рабочий день',
  'Подберём состав под ваш УЗ',
  'Пришлём ориентир по бюджету и срокам',
];

export function Hero() {
  return (
    <section
      id="top"
      className="hero-gradient text-white relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[var(--color-brand-2)]/25 blur-3xl floaty"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full bg-[var(--color-accent)]/15 blur-3xl floaty"
        style={{ animationDelay: '1.5s' }}
      />

      <div className="container-x py-14 md:py-24 lg:py-28 relative">
        <div className="grid lg:grid-cols-[1.45fr,1fr] gap-10 lg:gap-14 items-start">
          <div className="max-w-3xl hero-stagger">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              {VARIANT.regionBadge} · штрафы по 13.11 КоАП уже применяются
            </div>

            <h1 className="mt-6 text-[2.25rem] sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
              <span id="hero-h1-main">{VARIANT.h1}</span>{' '}
              <span
                id="hero-h1-accent"
                className="bg-gradient-to-r from-[var(--color-accent)] to-[#6ee7b7] bg-clip-text text-transparent"
              >
                {VARIANT.h1Accent}
              </span>
            </h1>

            <p className="mt-5 text-[1.05rem] md:text-xl text-white leading-relaxed max-w-2xl font-semibold">
              {VARIANT.heroSubtitle}
            </p>

            {VARIANT.intro.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? 'mt-4 text-[1.02rem] md:text-lg text-white/90 leading-relaxed max-w-2xl'
                    : 'mt-3 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl'
                }
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#quiz"
                data-goal="hero-quiz"
                className="btn-primary cta-pulse group text-base px-6 py-4 min-h-[56px]"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-accent) 0%, #6ee7b7 100%)',
                  color: '#052e1e',
                }}
              >
                Рассчитать стоимость за 60 секунд
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                data-goal="hero-contact"
                className="btn-ghost text-base px-6 py-4 min-h-[56px]"
              >
                Получить коммерческое предложение
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-white">
              {HERO_BADGES.map(({ Icon, t }) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex w-7 h-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent)] shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="font-medium leading-snug">{t}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid grid-cols-3 gap-3 md:gap-5 rounded-2xl bg-white/10 border border-white/15 p-4 md:p-5">
              {[
                { n: '127+', l: 'организаций прошли экспресс-аудит' },
                { n: '7 дней', l: 'закрываем предписание или возврат 100%' },
                { n: 'с 2019', l: 'в ИБ и защите ПДн' },
              ].map(({ n, l }) => (
                <div key={l} className="text-center md:text-left">
                  <dt className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-none">
                    {n}
                  </dt>
                  <dd className="mt-1.5 text-[11px] md:text-xs text-white/80 leading-snug">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-xs text-white/80">
              {BRAND.name} · {BRAND.address} ·{' '}
              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="underline hover:text-white"
                data-goal="phone-tap-hero"
              >
                {BRAND.phone}
              </a>
            </p>
          </div>

          <aside
            className="hidden lg:block rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-6 shadow-xl"
            aria-label="Быстрые контакты"
          >
            <div className="text-xs uppercase tracking-wider text-white/70 font-bold">
              Связаться сейчас
            </div>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              data-goal="phone-tap-hero-side"
              className="mt-3 block text-2xl font-extrabold tracking-tight hover:text-[var(--color-accent)] transition"
            >
              {BRAND.phone}
            </a>
            <div className="mt-1 text-xs text-white/80">{BRAND.workingHours}</div>

            <div className="mt-5 space-y-2 text-sm">
              {SIDE_ITEMS.map((t) => (
                <div key={t} className="flex items-start gap-2.5 text-white">
                  <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[#052e1e] shrink-0">
                    <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span className="leading-snug">{t}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              data-goal="hero-side-contact"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[var(--color-brand)] font-bold px-4 py-3 text-sm hover:bg-white/90 transition"
            >
              Оставить заявку
              <ArrowRightIcon className="w-4 h-4" />
            </a>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${BRAND.phoneRaw.replace('+', '')}?text=${encodeURIComponent('Здравствуйте, интересует подключение к ГИС «Профилактика»')}`}
                target="_blank"
                rel="noopener noreferrer"
                data-goal="whatsapp-hero-side"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] text-white font-semibold px-3 py-3 text-sm hover:opacity-90 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.669.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                data-goal="email-tap-hero-side"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold px-3 py-3 text-sm hover:bg-white/20 transition"
              >
                E-mail
              </a>
            </div>
          </aside>
        </div>
      </div>

      <div className="relative h-8 overflow-hidden">
        <svg
          aria-hidden
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M0,80 C240,120 480,0 720,40 C960,80 1200,120 1440,60 L1440,120 L0,120 Z"
            fill="var(--color-paper)"
          />
        </svg>
      </div>
    </section>
  );
}
