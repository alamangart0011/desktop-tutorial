import { BRAND } from './constants';
import { ArrowRightIcon, PhoneIcon, ClockIcon } from './Icons';

type Variant = 'audit' | 'quiz' | 'phone';

const VARIANTS: Record<
  Variant,
  {
    title: string;
    text: string;
    ctaText: string;
    ctaHref: string;
    goal: string;
    Icon: React.ComponentType<{ className?: string }>;
    secondary?: { text: string; href: string; goal: string };
  }
> = {
  audit: {
    title: 'Не уверены, готова ли ваша организация?',
    text: 'Проведём бесплатный экспресс-аудит за 30 минут — пришлём отчёт с конкретными пробелами и сроками их закрытия.',
    ctaText: 'Заказать экспресс-аудит',
    ctaHref: '#contact',
    goal: 'ctx-audit',
    Icon: ClockIcon,
  },
  quiz: {
    title: 'Узнайте стоимость подключения за 60 секунд',
    text: 'Ответьте на 5 вопросов — увидите рекомендованный пакет, ориентир по бюджету и срокам без обязательств.',
    ctaText: 'Открыть калькулятор',
    ctaHref: '#quiz',
    goal: 'ctx-quiz',
    Icon: ArrowRightIcon,
  },
  phone: {
    title: `Позвоните прямо сейчас — ${BRAND.workingHours}`,
    text: 'Эксперт по ГИС «Профилактика» ответит на вопросы по подключению, документам и стоимости. Без отдела продаж и скриптов.',
    ctaText: BRAND.phone,
    ctaHref: `tel:${BRAND.phoneRaw}`,
    goal: 'ctx-phone',
    Icon: PhoneIcon,
    secondary: { text: 'Заказать обратный звонок', href: '#contact', goal: 'ctx-phone-callback' },
  },
};

export function ContextualCta({ variant }: { variant: Variant }) {
  const v = VARIANTS[variant];
  const Icon = v.Icon;
  return (
    <section
      aria-label={v.title}
      className="bg-[var(--color-paper)] py-8 md:py-10"
    >
      <div className="container-x">
        <div className="rounded-2xl border border-[var(--color-brand)]/15 bg-gradient-to-r from-[var(--color-brand)]/5 to-[var(--color-accent)]/5 p-5 md:p-7 flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <span className="shrink-0 inline-flex w-12 h-12 items-center justify-center rounded-xl bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
              <Icon className="w-6 h-6" />
            </span>
            <div className="min-w-0">
              <h3 className="text-base md:text-lg font-bold text-[var(--color-ink)] leading-snug">
                {v.title}
              </h3>
              <p className="mt-1 text-sm md:text-[15px] text-[var(--color-ink-2)] leading-relaxed">
                {v.text}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 md:shrink-0">
            <a
              href={v.ctaHref}
              data-goal={v.goal}
              className="btn-primary text-sm px-5 py-3 min-h-[48px]"
            >
              {v.ctaText}
              <ArrowRightIcon className="w-4 h-4" />
            </a>
            {v.secondary && (
              <a
                href={v.secondary.href}
                data-goal={v.secondary.goal}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-brand)]/30 text-[var(--color-brand)] font-semibold px-4 py-3 text-sm hover:bg-[var(--color-brand)]/5 transition min-h-[48px]"
              >
                {v.secondary.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
