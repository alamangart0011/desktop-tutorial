const HUBS = [
  {
    abbr: 'ЕСИА',
    name: 'Единая система идентификации',
    role: 'Аутентификация сотрудников через Госуслуги',
    proto: 'OpenID Connect / SAML 2.0',
  },
  {
    abbr: 'СМЭВ 3',
    name: 'Система межвед. электронного взаимодействия',
    role: 'Обмен юридически значимыми сообщениями с ведомствами',
    proto: 'SOAP, виды сведений Минцифры',
  },
  {
    abbr: 'Госуслуги',
    name: 'Личный кабинет организации',
    role: 'Управление учётной записью и ролями организации',
    proto: 'gosuslugi.ru API',
  },
  {
    abbr: 'ЕГИССО',
    name: 'Единая ГИС социального обеспечения',
    role: 'Синхронизация мер соцподдержки и опекаемых',
    proto: 'СМЭВ VS',
  },
  {
    abbr: 'ФИС ФРДО',
    name: 'Федеральный реестр документов об образовании',
    role: 'Проверка сведений об образовании несовершеннолетних',
    proto: 'СМЭВ VS Рособрнадзора',
  },
  {
    abbr: 'АИС регион.',
    name: 'Региональные АИС КДН / образования / соцзащиты',
    role: 'Миграция истории учётов и справочников',
    proto: 'REST / SOAP, выгрузки CSV/XML',
  },
  {
    abbr: 'ФИАС',
    name: 'Федеральная адресная система',
    role: 'Нормализация адресов и КЛАДР',
    proto: 'ФИАС API',
  },
  {
    abbr: 'ГИС ГМП',
    name: 'ГИС государственных и муниципальных платежей',
    role: 'Учёт штрафов и платежей в делах несовершеннолетних',
    proto: 'СМЭВ Казначейства',
  },
];

export function Integrations() {
  return (
    <section
      id="integrations"
      className="bg-white py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Интеграции
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            С чем общается ГИС «Профилактика»
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Восемь ключевых сервисов и реестров, без которых не работает полноценный сценарий
            учёта. Настраиваем все интеграции под ключ и передаём документацию с примерами запросов.
          </p>
        </div>

        <ul className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {HUBS.map((h) => (
            <li
              key={h.abbr}
              className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-5 flex flex-col gap-2"
            >
              <div className="inline-flex w-fit items-center rounded-lg bg-[var(--color-brand)] text-white px-2.5 py-1 text-xs font-extrabold">
                {h.abbr}
              </div>
              <div className="text-sm font-extrabold text-[var(--color-ink)] leading-snug">
                {h.name}
              </div>
              <div className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                {h.role}
              </div>
              <div className="mt-auto text-[11px] text-[var(--color-muted)]">
                {h.proto}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[11px] text-[var(--color-muted)]">
          Поддерживаем отраслевые региональные АИС (АИС «КДН» СПб, «Электронная школа» МО,
          «Семья» ХМАО, «Ребёнок в СПб» и др.). Миграция с ретро-систем на актуальные коннекторы
          ГИС «Профилактика» — отдельной строкой в смете.
        </p>
      </div>
    </section>
  );
}
