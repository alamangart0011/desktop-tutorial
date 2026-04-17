import { BRAND } from './constants';

export function MidCta() {
  return (
    <section
      aria-label="Быстрый звонок"
      className="bg-[var(--color-brand)] text-white py-12 md:py-16"
    >
      <div className="container-x grid md:grid-cols-[1fr,auto] gap-6 md:gap-10 items-center">
        <div className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-wider text-white/70 font-bold">
            Экспресс-аудит за 2 рабочих дня
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
            Дадим честную оценку: где вы сейчас и что нужно до аттестации
          </h2>
          <p className="mt-3 text-white/80 text-sm md:text-base leading-relaxed">
            Без продажи «всего сразу». Получаете отчёт с текущими пробелами (документы, СЗИ, обучение),
            дорожную карту на 45 дней и твёрдую смету. Если у вас уже подключено 70%+ —
            скажем прямо и не будем навязывать лишнее.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:min-w-[240px]">
          <a
            href="#contact"
            data-goal="mid-cta-audit"
            className="inline-flex items-center justify-center rounded-xl bg-white text-[var(--color-brand)] font-semibold px-5 py-3 hover:bg-slate-100 transition"
          >
            Заказать аудит
          </a>
          <a
            href={`tel:${BRAND.phoneRaw}`}
            data-goal="mid-cta-phone"
            className="inline-flex items-center justify-center rounded-xl border border-white/40 text-white font-semibold px-5 py-3 hover:bg-white/10 transition"
          >
            {BRAND.phone}
          </a>
          <div className="text-[11px] text-white/60 text-center">
            {BRAND.workingHours}
          </div>
        </div>
      </div>
    </section>
  );
}
