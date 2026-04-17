const ROLES = [
  {
    role: 'Руководитель проектов ГИС',
    focus: 'PMO · 44-ФЗ · 223-ФЗ',
    exp: '10+ лет',
    text: 'Ведёт проект от аудита до приёмки. Отвечает за сроки, смету, коммуникацию с заказчиком и смежниками.',
  },
  {
    role: 'Аудитор ФСТЭК',
    focus: 'Моделирование угроз · УЗ · 21 Приказ',
    exp: '12+ лет',
    text: 'Обследует ИСПДн, строит модель угроз и классификацию. Готовит комплект документов к аттестации.',
  },
  {
    role: 'Инженер СЗИ/СКЗИ',
    focus: 'Secret Net Studio · КриптоПро · ПАК «Соболь»',
    exp: '8+ лет',
    text: 'Разворачивает и настраивает средства защиты. Интеграция с отечественной ОС, обновления и сопровождение.',
  },
  {
    role: 'Юрист по 152-ФЗ',
    focus: '152-ФЗ · 120-ФЗ · НПА',
    exp: '7+ лет',
    text: 'Пишет политики, регламенты и договоры. Сопровождает проверки Роскомнадзора и прокуратуры.',
  },
  {
    role: 'Методист КДНиЗП',
    focus: 'СОП · ТЖС · ИПР · форма 1-КДН',
    exp: '9+ лет',
    text: 'Адаптирует регламенты под работу комиссий и школ. Ведёт обучение операторов с выдачей удостоверений.',
  },
  {
    role: 'Инженер техподдержки',
    focus: 'SLA 4 часа · ServiceDesk · ГОСТ 34',
    exp: '6+ лет',
    text: 'Горячая линия, обработка инцидентов, обновления регламентов. 24/7 в пакете «Под ключ».',
  },
];

export function Team() {
  return (
    <section
      id="team"
      className="bg-[var(--color-paper)] py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Команда проекта
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Шесть ролей, которые закроют весь проект
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Мы не зовём субподрядчиков на документы и аттестацию. В каждом проекте участвуют
            профильные специалисты по всем шести направлениям — это и есть «под ключ».
          </p>
        </div>

        <ul className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLES.map((r) => (
            <li
              key={r.role}
              className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-brand)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-semibold text-right">
                  Стаж {r.exp}
                </span>
              </div>
              <div className="text-base font-extrabold text-[var(--color-ink)] leading-snug">
                {r.role}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[var(--color-brand)] font-bold">
                {r.focus}
              </div>
              <div className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                {r.text}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[11px] text-[var(--color-muted)]">
          Персональный состав команды на проект согласуем на старте и фиксируем в плане работ.
          Все сотрудники оформлены в штате, проходят ежегодное обучение по ИБ и 152-ФЗ.
        </p>
      </div>
    </section>
  );
}
