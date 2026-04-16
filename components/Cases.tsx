export function Cases() {
  const cases = [
    {
      tag: 'Регион СЗФО',
      t: 'Подключили 320 АРМ за 4 месяца',
      d: 'КДНиЗП, школы, опека и соцзащита. Типовые пакеты документов и настройка АРМ по УЗ2 позволили уложиться в сжатые сроки.',
      m: [
        { k: '320', v: 'АРМ' },
        { k: '4 мес.', v: 'срок' },
        { k: '100%', v: 'прошли приёмку' },
      ],
    },
    {
      tag: 'Муниципалитет',
      t: 'Обучили 220 сотрудников КДН и образования',
      d: 'Курсы по работе с карточками СОП/ТЖС, ИПР, формой 1-КДН. Выдали удостоверения о повышении квалификации.',
      m: [
        { k: '220', v: 'сотрудников' },
        { k: '8', v: 'групп обучения' },
        { k: '72 ч.', v: 'программа' },
      ],
    },
    {
      tag: 'Департамент образования',
      t: 'Аттестация ИСПДн и Заключение за 6 недель',
      d: 'Модель угроз, ПМИ, оценка эффективности, Заключение на 3 года. Без простоев в работе с несовершеннолетними.',
      m: [
        { k: '6 нед.', v: 'цикл' },
        { k: '3 года', v: 'срок Заключения' },
        { k: '0', v: 'простоев' },
      ],
    },
  ];
  return (
    <section id="cases" className="bg-[var(--color-paper)] py-16 md:py-24">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-blue-50 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Кейсы
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Что мы уже делали по ГИС, ФСТЭК и ПДн
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)]">
            Примеры обезличены по требованиям заказчиков. Полные референсы — по запросу под NDA.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {cases.map((c) => (
            <article
              key={c.t}
              className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 flex flex-col"
            >
              <span className="inline-flex self-start rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-[11px] font-semibold px-2.5 py-1">
                {c.tag}
              </span>
              <h3 className="mt-3 font-extrabold text-lg leading-snug">{c.t}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{c.d}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 pt-5 border-t border-slate-200">
                {c.m.map((m) => (
                  <div key={m.v}>
                    <div className="font-extrabold text-[var(--color-brand)] text-lg">{m.k}</div>
                    <div className="text-[11px] text-[var(--color-muted)]">{m.v}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
