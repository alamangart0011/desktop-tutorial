export function SystemBreakdown() {
  const orgs = [
    'Комиссии по делам несовершеннолетних и защите их прав (КДНиЗП)',
    'Органы управления социальной защитой населения',
    'Учреждения социального обслуживания',
    'Специализированные учреждения для несовершеннолетних, нуждающихся в социальной реабилитации',
    'Органы управления в сфере образования',
    'Образовательные организации (школы, СПО, вузы)',
    'Специальные учебно-воспитательные учреждения открытого и закрытого типа',
    'Организации для детей-сирот и детей, оставшихся без попечения родителей',
    'Органы опеки и попечительства',
    'Органы и учреждения по делам молодёжи',
    'Органы и учреждения культуры, досуга, спорта и туризма',
    'Органы управления здравоохранением и медицинские организации',
    'Органы службы занятости',
    'Органы внутренних дел (ОВД)',
    'Центры временного содержания несовершеннолетних правонарушителей (ЦВСНП)',
    'Следственные изоляторы, воспитательные колонии, УИИ ФСИН',
    'Уполномоченные по правам ребёнка',
    'Ассоциация волонтёрских центров',
  ];

  const data = [
    { t: 'Несовершеннолетние в СОП/ТЖС', d: 'Учёт, снятие с учёта, история статусов' },
    { t: 'Семьи в социально опасном положении', d: 'Состав семьи, факторы риска, меры помощи' },
    { t: 'ИПР — индивидуальная программа реабилитации', d: 'План мероприятий, ответственные, сроки, результат' },
    { t: 'Межведомственные поручения', d: 'Задачи между ведомствами, контроль исполнения' },
    { t: 'Отчётность 1-КДН', d: 'Формы, сводки, аналитика по профилактике' },
  ];

  const laws = [
    { code: '120-ФЗ', name: 'Об основах системы профилактики безнадзорности и правонарушений несовершеннолетних' },
    { code: '152-ФЗ', name: 'О персональных данных' },
    { code: 'ПП РФ № 411', name: 'О ГИС профилактики безнадзорности и правонарушений (от 01.04.2025)' },
    { code: 'Приказ ФСТЭК № 21', name: 'Требования к защите ПДн при обработке в ИСПДн' },
    { code: 'Приказ ФСТЭК № 117', name: 'Новые требования к защите ГИС и КИИ (с 01.03.2026)' },
    { code: 'Приказ ФСТЭК № 77', name: 'Обязательный пентест для ГИС 1–2 класса (с 26.01.2026)' },
    { code: 'ТУ Минпросвещения', name: 'Технические условия подключения к ГИС «Профилактика»' },
  ];

  return (
    <section id="about" className="bg-white py-16 md:py-24 border-t border-slate-200">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-blue-50 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Максимальный разбор информационной системы
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Что такое ГИС «Профилактика» и кто в неё обязан подключиться
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Федеральная государственная информационная система для выявления, предотвращения и снижения рисков
            безнадзорности и противоправного поведения среди детей и подростков. Оператор — Министерство
            просвещения РФ. Полноценный запуск — с 01.12.2025.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 p-6 md:p-8 bg-[var(--color-paper)]">
            <h3 className="font-extrabold text-xl">Кто обязан подключиться (ПП РФ № 411)</h3>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              18 категорий органов и учреждений — проверьте, есть ли вы в списке.
            </p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {orgs.map((o) => (
                <li key={o} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-200 p-6 md:p-8 bg-white">
              <h3 className="font-extrabold text-xl">Какие данные обрабатывает</h3>
              <ul className="mt-4 space-y-3">
                {data.map((x) => (
                  <li key={x.t}>
                    <div className="font-semibold text-[var(--color-ink)]">{x.t}</div>
                    <div className="text-sm text-[var(--color-muted)]">{x.d}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 md:p-8 bg-white">
              <h3 className="font-extrabold text-xl">Интеграции и доступ</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {['ЕСИА', 'Госуслуги (ЛК организации)', 'СМЭВ 3', 'ЕГИССО', 'ФИС ФРДО', 'Региональные АИС'].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-200 px-3 py-2.5 bg-[var(--color-paper)] text-[var(--color-ink)] font-medium"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-[var(--color-ink-2)]">
                Управление правами сотрудников — через ЛК организации на Госуслугах; роли назначает
                руководитель или администратор.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-6 md:p-8">
          <h3 className="font-extrabold text-xl">Правовая база — всё, на чём это держится</h3>
          <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {laws.map((l) => (
              <div key={l.code} className="rounded-xl bg-white border border-slate-200 p-4">
                <div className="font-extrabold text-[var(--color-brand)]">{l.code}</div>
                <div className="text-sm text-[var(--color-ink-2)] mt-1 leading-snug">{l.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
