export function Pricing() {
  const tiers = [
    {
      name: 'Старт',
      sub: 'Аудит и дорожная карта',
      price: 'от 150 000 ₽',
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
      items: [
        'Полный комплект 8 документов ПДн',
        'Поставка и установка СЗИ/СКЗИ',
        'Аттестация ИСПДн, Заключение (3 года)',
        'Регистрация в ЕСИА и ЛК Госуслуг',
        'Обучение ответственных (до 30 чел.)',
        '6 месяцев техподдержки 9×5',
      ],
      cta: 'Получить расчёт',
      accent: true,
      badge: 'Хит',
    },
    {
      name: 'Регион',
      sub: 'Регион / муниципалитет',
      price: 'по запросу',
      items: [
        'Типовые пакеты для КДН / школ / опеки / медорганизаций',
        'Массовая поставка и настройка АРМ',
        'Аттестация по типовому проекту',
        'Обучение до 300 сотрудников',
        'Интеграция с региональной АИС',
        '12 месяцев поддержки 24/7, SLA 4 часа',
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
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Прозрачные пакеты — от одного ведомства до всего региона
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Работаем по 44-ФЗ и 223-ФЗ. Фиксируем состав работ и сроки в договоре, результат —
            приёмка организацией ГИС «Профилактика».
          </p>
        </div>
        <div className="mt-10 grid lg:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl border p-6 md:p-8 flex flex-col ${
                t.accent
                  ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)] shadow-2xl lg:scale-[1.02]'
                  : 'bg-white text-[var(--color-ink)] border-slate-200'
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 right-6 rounded-full bg-[var(--color-accent)] text-[#052e1e] text-[11px] font-extrabold px-3 py-1">
                  {t.badge}
                </span>
              )}
              <div className={`text-xs font-bold uppercase tracking-wider ${t.accent ? 'text-white/80' : 'text-[var(--color-muted)]'}`}>
                {t.sub}
              </div>
              <div className="mt-2 text-2xl font-extrabold">{t.name}</div>
              <div className="mt-4 text-3xl font-extrabold tracking-tight">{t.price}</div>
              <ul className={`mt-6 space-y-2.5 text-sm ${t.accent ? 'text-white/90' : 'text-[var(--color-ink-2)]'}`}>
                {t.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className={`mt-0.5 inline-flex w-5 h-5 rounded-full items-center justify-center text-[11px] font-black shrink-0 ${
                        t.accent ? 'bg-white text-[var(--color-brand)]' : 'bg-[var(--color-brand)]/10 text-[var(--color-brand)]'
                      }`}
                    >
                      ✓
                    </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 inline-flex items-center justify-center rounded-xl font-semibold px-5 py-3 transition ${
                  t.accent
                    ? 'bg-white text-[var(--color-brand)] hover:bg-white/90'
                    : 'bg-[var(--color-ink)] text-white hover:bg-[var(--color-brand)]'
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
