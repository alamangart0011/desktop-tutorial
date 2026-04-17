import { BRAND } from './constants';
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldCheckIcon,
  FileCheckIcon,
  AwardIcon,
  ClockIcon,
} from './Icons';

const HERO_BADGES = [
  { Icon: ShieldCheckIcon, t: 'По ПП РФ № 411' },
  { Icon: FileCheckIcon, t: '8 документов ПДн' },
  { Icon: AwardIcon, t: 'СЗИ по ФСТЭК № 21' },
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
              ГИС работает с 01.12.2025 — штрафы по 13.11 КоАП уже применяются
            </div>

            <h1 className="mt-6 text-[2.25rem] sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
              Подключим вашу организацию к&nbsp;ГИС&nbsp;«Профилактика»{' '}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[#6ee7b7] bg-clip-text text-transparent">
                под&nbsp;ключ
              </span>
            </h1>

            <p className="mt-5 text-[1.05rem] md:text-xl text-white leading-relaxed max-w-2xl font-medium">
              Берём на себя всё: документы, защиту персональных данных,
              аттестацию по ФСТЭК, подключение через Госуслуги и обучение
              сотрудников.
            </p>
            <p className="mt-3 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
              Запуск за 35–45 рабочих дней. Фиксированная цена в договоре.
              Минимальное участие с вашей стороны — почти всю работу делаем мы.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#risk"
                data-goal="hero-check"
                className="btn-primary group text-base px-6 py-4 min-h-[56px]"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-accent) 0%, #6ee7b7 100%)',
                  color: '#052e1e',
                  boxShadow: '0 14px 30px -12px rgba(16,185,129,0.6)',
                }}
              >
                Проверить риск штрафа за 2 минуты
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
            <a
              href={`mailto:${BRAND.email}`}
              data-goal="email-tap-hero-side"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/15 text-white font-semibold px-4 py-3 text-sm hover:bg-white/20 transition"
            >
              Написать на e-mail
            </a>
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
