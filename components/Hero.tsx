import { BRAND } from './constants';

export function Hero() {
  return (
    <section id="top" className="hero-gradient text-white relative overflow-hidden">
      <div className="container-x py-16 md:py-24 lg:py-28 relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-medium text-white/90 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            ГИС работает с 01.12.2025 — штрафы по 13.11 КоАП уже применяются
          </div>
          <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] md:leading-[1.05] text-balance">
            Подключим вашу организацию к ГИС&nbsp;«Профилактика» под&nbsp;ключ
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
            Документы, аттестация ИСПДн по 21 Приказу ФСТЭК (УЗ2), установка СЗИ и СКЗИ,
            настройка доступа через ЕСИА и обучение сотрудников. Срок — 35–45 рабочих дней.
            Минимальное участие заказчика.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#check"
              data-goal="hero-check"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--color-accent)] text-[#052e1e] font-semibold px-6 py-4 hover:brightness-110 transition"
            >
              Проверить готовность за 2 минуты
            </a>
            <a
              href="#contact"
              data-goal="hero-contact"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white font-semibold px-6 py-4 hover:bg-white/20 transition"
            >
              Получить коммерческое предложение
            </a>
          </div>

          <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-white/85">
            {[
              'По ПП РФ № 411',
              'СЗИ по ФСТЭК № 21',
              '8 документов ПДн на 3 года',
              'Сопровождение до приёмки',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[#052e1e] text-[11px] font-black">
                  ✓
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-white/60">
            {BRAND.name} · {BRAND.address} · {BRAND.phone}
          </p>
        </div>
      </div>
    </section>
  );
}
