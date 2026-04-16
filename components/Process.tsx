export function Process() {
  const steps = [
    {
      n: '01',
      t: 'Экспресс-аудит',
      d: 'За 3–5 дней оцениваем документы, инфраструктуру, число АРМ и класс ИСПДн.',
      time: '3–5 дней',
    },
    {
      n: '02',
      t: 'Дорожная карта и договор',
      d: 'Фиксируем состав работ, сроки, бюджет. Готовим документы по 44-ФЗ / 223-ФЗ при необходимости.',
      time: '3–7 дней',
    },
    {
      n: '03',
      t: 'Документы ПДн и уведомление в РКН',
      d: 'Модель угроз, Акт классификации, ТЗ на СЗПДн, ПМИ, Технический паспорт — полный комплект.',
      time: '7–10 дней',
    },
    {
      n: '04',
      t: 'Поставка и настройка СЗИ',
      d: 'Astra/Alt/РЕД ОС, Secret Net Studio, ПАК «Соболь», КриптоПро NGate, антивирус, СОВ. Настройка АРМ.',
      time: '10–14 дней',
    },
    {
      n: '05',
      t: 'Оценка эффективности и Заключение',
      d: 'Проводим испытания, оформляем Протокол и Заключение о соответствии (срок действия — 3 года).',
      time: '5–7 дней',
    },
    {
      n: '06',
      t: 'Регистрация в ЕСИА и подключение к ГИС',
      d: 'Настройка ЛК организации на Госуслугах, назначение ролей, подтверждение приёма ГИС «Профилактика».',
      time: '2–5 дней',
    },
    {
      n: '07',
      t: 'Обучение и техподдержка',
      d: 'Обучаем сотрудников работать с ИПР, СОП, ТЖС, отчётностью. Ведём поддержку и продлеваем сертификаты.',
      time: 'в сопровождении',
    },
  ];
  return (
    <section id="process" className="bg-[var(--color-paper)] py-16 md:py-24">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-blue-50 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Как работаем
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            7 этапов — от первого звонка до приёмки ГИС «Профилактика»
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Прозрачный график. От заказчика — только исходные данные и ответственное лицо.
          </p>
        </div>
        <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="text-4xl font-extrabold text-[var(--color-brand)]/20">
                  {s.n}
                </div>
                <div className="text-[11px] font-semibold rounded-full bg-[var(--color-accent)]/15 text-emerald-700 px-2.5 py-1">
                  {s.time}
                </div>
              </div>
              <div className="mt-3 font-extrabold text-lg">{s.t}</div>
              <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
