import { ArrowRightIcon, CheckIcon, ClockIcon, RubleIcon } from './Icons';

export function Pricing() {
  const tiers = [
    {
      name: 'Старт',
      sub: 'Аудит и дорожная карта',
      price: 'от 150 000 ₽',
      timeline: '5–10 рабочих дней',
      items: [
        'Аудит нормативки и инфраструктуры',
        'Модель угроз и класс ИСПДн',
        'Подбор комплекта СЗИ под УЗ2',
        'Оценка бюджета и срока',
        'Отчёт и дорожная карта',
      ],
      cta: 'Заказать аудит',
      accent: false,
    },
    {
      name: 'Организация',
      sub: 'Одно учреждение под ключ',
      price: 'по запросу',
      timeline: '35–45 рабочих дней',
      items: [
        'Полный комплект 8 документов ПДн',
        'Поставка СЗИ/СКЗИ (дилер КриптоПро и др.)',
        'Установка и аттестация — лицензиат ФСТЭК',
        'Регистрация в ЕСИА и ЛК Госуслуг',
        'Обучение ответственных (до 30 чел.)',
        '6 месяцев сопровождения по заявкам',
      ],
      cta: 'Получить расчёт',
      accent: true,
      badge: 'Хит',
    },
    {
      name: 'Регион',
      sub: 'Регион / муниципалитет',
      price: 'по запросу',
      timeline: '3–6 месяцев',
      items: [
        'Типовые пакеты для КДН / школ / опеки / медорганизаций',
        'Массовая поставка и настройка АРМ',
        'Аттестация по типовому проекту (лицензиат)',
        'Обучение до 300 сотрудников',
        'Интеграция с региональной АИС',
        '12 месяцев сопровождения, SLA по договору',
      ],
      cta: 'Обсудить регион',
      accent: false,
    },
  ];
  return (
    <section id="pricing" className="bg-white py-16 md:py-24">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-blue-50 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Пакеты
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
            Прозрачные пакеты — от одного ведомства до всего региона
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Работаем по 44-ФЗ и 223-ФЗ. Фиксируем состав работ и сроки в договоре, результат —
            приёмка организацией ГИС «Профилактика».
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-1.5 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Свободно 3 слота на запуск в апреле — резерв до подписания договора
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl border p-6 md:p-8 flex flex-col transition hover:-translate-y-1 ${
                t.accent
                  ? 'bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] text-white border-[var(--color-brand)] shadow-2xl lg:scale-[1.02]'
                  : 'bg-white text-[var(--color-ink)] border-slate-200 hover:shadow-xl hover:border-[var(--color-brand-2)]'
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 right-6 rounded-full bg-[var(--color-accent)] text-[#052e1e] text-[11px] font-extrabold px-3 py-1 shadow-md">
                  {t.badge}
                </span>
              )}
              <div
                className={`text-xs font-bold uppercase tracking-wider ${
                  t.accent ? 'text-white/85' : 'text-slate-500'
                }`}
              >
                {t.sub}
              </div>
              <div className="mt-2 text-2xl font-extrabold">{t.name}</div>
              <div className="mt-4 text-3xl font-extrabold tracking-tight">{t.price}</div>
              <div
                className={`mt-1.5 text-xs font-semibold inline-flex items-center gap-1.5 ${
                  t.accent ? 'text-white/85' : 'text-slate-600'
                }`}
              >
                <ClockIcon className="w-3.5 h-3.5" />
                Срок: {t.timeline}
              </div>
              <ul
                className={`mt-6 space-y-2.5 text-sm ${
                  t.accent ? 'text-white/95' : 'text-[var(--color-ink-2)]'
                }`}
              >
                {t.items.map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 inline-flex w-5 h-5 rounded-full items-center justify-center shrink-0 ${
                        t.accent
                          ? 'bg-white text-[var(--color-brand)]'
                          : 'bg-[var(--color-brand)]/10 text-[var(--color-brand)]'
                      }`}
                    >
                      <CheckIcon className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span className="leading-snug">{i}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-goal={`pricing-${t.name.toLowerCase()}`}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl font-semibold px-5 py-3.5 transition min-h-[48px] ${
                  t.accent
                    ? 'bg-white text-[var(--color-brand)] hover:bg-white/90 hover:shadow-lg'
                    : 'bg-[var(--color-ink)] text-white hover:bg-[var(--color-brand)]'
                }`}
              >
                {t.cta}
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-[var(--color-paper)] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <span className="inline-flex w-11 h-11 rounded-xl bg-[var(--color-brand)]/10 text-[var(--color-brand)] items-center justify-center shrink-0">
              <RubleIcon className="w-5 h-5" />
            </span>
            <div>
              <div className="font-extrabold text-[var(--color-ink)]">
                Нужна индивидуальная смета?
              </div>
              <div className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                Рассчитаем под ваш класс ИСПДн, число АРМ и региональные требования.
                Средний срок подготовки КП — 1 рабочий день.
              </div>
            </div>
          </div>
          <a
            href="#contact"
            data-goal="pricing-custom"
            className="btn-primary text-sm px-5 py-3 whitespace-nowrap inline-flex items-center justify-center gap-2"
          >
            Запросить индивидуальный расчёт
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
