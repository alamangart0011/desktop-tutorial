export function Reasons() {
  const items = [
    {
      t: 'Профильная ИБ-компания, а не универсальный интегратор',
      d: 'Наша ДНК — защита информации. SecretNet Studio и ПАК «Соболь» — то, с чем работаем каждый день.',
    },
    {
      t: 'Опыт работы с 152-ФЗ и 21 Приказом ФСТЭК',
      d: 'Знаем, как проходит аттестация ИСПДн, какие документы реально нужны и чего требует оператор ГИС.',
    },
    {
      t: 'Санкт-Петербург и СЗФО — рядом',
      d: 'Выезд на объект, локальная поддержка, знание региональных регламентов КДН и ведомств.',
    },
    {
      t: 'Работаем по 44-ФЗ и 223-ФЗ',
      d: 'Готовим документы для торгов, ТЗ, НМЦК. Можно стартовать от ЕП до конкурса.',
    },
    {
      t: 'Сразу закладываем ФСТЭК № 117',
      d: 'С 01.03.2026 меняются требования к защите ГИС. Проектируем сразу с учётом новых правил.',
    },
    {
      t: 'SLA и сопровождение в договоре',
      d: 'Продление Заключения, обновление сертификатов, ответ по инциденту — в рамках согласованного SLA.',
    },
  ];
  return (
    <section id="reasons" className="bg-white py-16 md:py-24">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-blue-50 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Почему мы
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            6 причин, по которым ведомства выбирают {`«Оборон-Экран»`}
          </h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((x, i) => (
            <div
              key={x.t}
              className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-6"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-extrabold flex items-center justify-center">
                {i + 1}
              </div>
              <div className="mt-4 font-bold text-[var(--color-ink)] text-lg">{x.t}</div>
              <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
