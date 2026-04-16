const GROUPS = [
  {
    tag: 'КДНиЗП',
    title: 'Комиссии по делам несовершеннолетних',
    pain: 'Межвед обмен с 8+ ведомствами по бумаге, сроки 45 дней, ручная форма 1-КДН',
    value:
      'Карточка несовершеннолетнего и семьи, план ИПР с контрольными точками, автоматическая форма 1-КДН, уведомления по срокам.',
    priority: 'Высший приоритет, первыми попадают под проверки прокуратуры',
  },
  {
    tag: 'Школы / ДОО',
    title: 'Образовательные организации',
    pain: 'Учителя ведут тетради учёта, постановка на ВШУ дублируется с КДН, нет связи с социальным педагогом',
    value:
      'Роль соцпедагога и классного руководителя с доступом к карточкам учеников из СОП, автоматическая синхронизация с КДН.',
    priority: 'Подключение через региональный департамент образования',
  },
  {
    tag: 'Опека',
    title: 'Органы опеки и попечительства',
    pain: 'Дубли данных с ЕГИССО, 44 формы отчётности, ручная сверка с органами образования',
    value:
      'Единый реестр подопечных с историей, синхронизация с ЕГИССО через СМЭВ, шаблоны актов обследования жилищно-бытовых условий.',
    priority: 'Обрабатывает спец. категории ПДн — УЗ2 строго обязателен',
  },
  {
    tag: 'Соцзащита',
    title: 'Органы и учреждения социальной защиты',
    pain: 'Семьи в ТЖС ведутся параллельно в разных АИС, признание СОП затягивается на недели',
    value:
      'Общий справочник семей в ТЖС/СОП, статусы с маршрутом принятия решений, интеграция с мерами соцподдержки.',
    priority: 'По ПП № 411 обязательный поставщик и получатель данных',
  },
  {
    tag: 'Медицина',
    title: 'Медицинские организации',
    pain: 'Данные о детях в СОП не поступают педиатру, нет связи между диспансеризацией и ИПР',
    value:
      'Передача в ГИС уведомлений о выявлении признаков насилия и безнадзорности, маршрут «врач → КДН» в 72 часа.',
    priority: 'Обязательное подключение для педиатрических служб и наркодиспансеров',
  },
  {
    tag: 'ОВД / ПДН',
    title: 'Подразделения по делам несовершеннолетних МВД',
    pain: 'Постановка на учёт, снятие с учёта, взаимодействие со школой — в бумажных карточках',
    value:
      'Синхронизация учётов ПДН с КДН и школой, автоматические уведомления о снятии с учёта, журналы рейдов.',
    priority: 'Обязательное подключение через защищённый сегмент',
  },
];

export function Audience() {
  return (
    <section
      id="audience"
      className="bg-white py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Для кого
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Шесть типов организаций, которые обязаны подключиться
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            ПП РФ № 411 называет больше 20 категорий поставщиков и получателей данных. Сгруппировали
            их в шесть рабочих профилей — у каждого своя боль, роль в системе и приоритет подключения.
          </p>
        </div>

        <ul className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GROUPS.map((g) => (
            <li
              key={g.title}
              className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex items-center rounded-lg bg-[var(--color-brand)] text-white text-[11px] font-bold px-2 py-1">
                  {g.tag}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-semibold text-right">
                  {g.priority}
                </span>
              </div>
              <div className="text-base font-extrabold text-[var(--color-ink)] leading-snug">
                {g.title}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-rose-700 font-bold mb-1">
                  Боль
                </div>
                <div className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                  {g.pain}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold mb-1">
                  Что даёт ГИС
                </div>
                <div className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                  {g.value}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl bg-[var(--color-brand)] text-white p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <div className="text-lg md:text-xl font-extrabold">
              Не нашли свой профиль?
            </div>
            <div className="mt-1 text-sm text-white/80">
              Полный перечень из 20+ категорий есть в ПП РФ № 411. Определим ваш класс, роль
              в ГИС и объём подготовки за один звонок.
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-white text-[var(--color-brand)] font-semibold px-5 py-3 hover:bg-slate-100 transition"
          >
            Определить свой профиль
          </a>
        </div>
      </div>
    </section>
  );
}
