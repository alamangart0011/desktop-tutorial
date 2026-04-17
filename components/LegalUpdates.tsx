const EVENTS = [
  {
    date: '01.04.2025',
    tag: 'ПП РФ № 411',
    title: 'Создание ГИС «Профилактика»',
    text: 'Правительство утвердило положение о ГИС, оператор — Минпросвещения. Закреплён перечень поставщиков и получателей данных.',
  },
  {
    date: '11.04.2025',
    tag: 'Приказ ФСТЭК № 117',
    title: 'Расширенные требования к защите ГИС',
    text: 'Новые меры по мониторингу, управлению уязвимостями и реагированию на инциденты. Действует с 01.03.2026.',
  },
  {
    date: '01.12.2025',
    tag: 'Полный запуск',
    title: 'ГИС «Профилактика» заработала в полном объёме',
    text: 'С этой даты обмен данными по линии КДНиЗП должен идти через ГИС. Бумажные формы больше не принимаются в ряде регионов.',
  },
  {
    date: '26.01.2026',
    tag: 'Приказ ФСТЭК № 77',
    title: 'Обязательные пентесты для ГИС 1–2 класса',
    text: 'Для высокого класса ГИС введены тесты на проникновение. «Профилактика» попадает под расширенные требования.',
  },
  {
    date: '01.03.2026',
    tag: 'ФСТЭК 117 в боевом режиме',
    title: 'Новые требования уже применяются',
    text: 'Все ИСПДн, включая ГИС «Профилактика», обязаны соответствовать Приказу ФСТЭК № 117. Штрафы по 13.11 КоАП применяются без отсрочек.',
  },
  {
    date: 'Апрель 2026',
    tag: '13.11 КоАП',
    title: 'Штрафы уже выписываются',
    text: 'Региональные прокуратуры проводят проверки подключения. Типичные санкции — 200–400 тыс. ₽ должностному лицу за каждый выявленный факт.',
  },
];

export function LegalUpdates() {
  return (
    <section
      id="legal"
      className="bg-[var(--color-paper)] py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Правовое поле 2025–2026
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Хронология: от ПП № 411 до текущих штрафов
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            За год нормативное поле вокруг ГИС «Профилактика» выросло из одного постановления в
            пять разных обязательных документов. Держим в курсе и делаем подключение сразу
            с учётом новых требований.
          </p>
        </div>

        <ol className="mt-10 relative border-l-2 border-[var(--color-brand)]/20 ml-2 md:ml-4 space-y-6">
          {EVENTS.map((e, i) => (
            <li key={e.date + i} className="pl-6 md:pl-8 relative">
              <span
                className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--color-brand)] border-4 border-[var(--color-paper)]"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-[var(--color-brand)] text-white text-[11px] font-bold px-2 py-0.5">
                  {e.date}
                </span>
                <span className="inline-flex items-center rounded-md border border-slate-300 text-[11px] font-semibold px-2 py-0.5 text-[var(--color-ink)]">
                  {e.tag}
                </span>
              </div>
              <div className="mt-2 text-base md:text-lg font-extrabold text-[var(--color-ink)]">
                {e.title}
              </div>
              <div className="mt-1 text-sm text-[var(--color-ink-2)] leading-relaxed">
                {e.text}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-[11px] text-[var(--color-muted)]">
          Следим за обновлениями ФСТЭК, ФСБ и Минпросвещения. Обновляем состав документов
          в проекте и актуализируем стек СЗИ до аттестации.
        </p>
      </div>
    </section>
  );
}
