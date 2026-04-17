const SZI = [
  {
    group: 'СЗИ от НСД',
    vendor: 'Secret Net Studio',
    by: 'Код Безопасности',
    note: 'Сертификат ФСТЭК, 5 класс СВТ, модули HIDS/AV/FW/СОВ',
  },
  {
    group: 'СДЗ (УПД.17)',
    vendor: 'ПАК «Соболь» v4',
    by: 'Код Безопасности',
    note: 'Доверенная загрузка, сертифицирован ФСТЭК/ФСБ',
  },
  {
    group: 'СКЗИ',
    vendor: 'КриптоПро CSP + NGate',
    by: 'КриптоПро',
    note: 'ГОСТ-канал до ГИС, сертифицированный ФСБ класса КС1/КС2',
  },
  {
    group: 'Браузер',
    vendor: 'Yandex Browser / Chromium-GOST',
    by: 'Яндекс',
    note: 'Поддержка ГОСТ TLS для входа в ГИС',
  },
  {
    group: 'Антивирус',
    vendor: 'Kaspersky / Dr.Web',
    by: 'ЛК / Доктор Веб',
    note: 'Сертификат ФСТЭК, совместимость с отечественной ОС',
  },
  {
    group: 'Анализ защищённости',
    vendor: 'Сканер-ВС · XSpider · RedCheck',
    by: 'НПО «Эшелон», Positive, АЛТЭКС-СОФТ',
    note: 'АНЗ.1–АНЗ.5 по 21 Приказу ФСТЭК',
  },
];

const OS = [
  {
    name: 'Astra Linux Special Edition',
    note: 'Максимальный уровень доверия 1, совместима с SN Studio',
  },
  {
    name: 'Alt Workstation / Server 10',
    note: 'Сертификат ФСТЭК, поддержка КриптоПро',
  },
  {
    name: 'РЕД ОС 7.3 / 8',
    note: 'Сертификат ФСТЭК, включена в реестр отечественного ПО',
  },
];

export function TechStack() {
  return (
    <section
      id="tech"
      className="bg-[var(--color-paper)] py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Технологический стек
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            СЗИ, СКЗИ и ОС, сертифицированные ФСТЭК и ФСБ
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Работаем только с вендорами, чьи сертификаты действующие и покрывают УЗ2 для ИСПДн.
            Ставим то, что реально пройдёт аттестационные испытания, а не «формально подходит».
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SZI.map((s) => (
            <div
              key={s.vendor}
              className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-2"
            >
              <div className="text-[10px] uppercase tracking-wider text-[var(--color-brand)] font-bold">
                {s.group}
              </div>
              <div className="text-base md:text-lg font-extrabold text-[var(--color-ink)] leading-snug">
                {s.vendor}
              </div>
              <div className="text-xs text-[var(--color-muted)]">{s.by}</div>
              <div className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                {s.note}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-xl bg-[var(--color-brand)] text-white px-3 py-1.5 text-xs font-bold">
              Отечественные ОС
            </span>
            <span className="text-sm text-[var(--color-muted)]">
              Под ПП РФ № 1236 и реестр Минцифры — обязательная замена Windows
            </span>
          </div>
          <ul className="mt-4 grid sm:grid-cols-3 gap-3">
            {OS.map((o) => (
              <li
                key={o.name}
                className="rounded-xl border border-slate-200 bg-[var(--color-paper)] p-4"
              >
                <div className="text-sm font-extrabold text-[var(--color-ink)]">
                  {o.name}
                </div>
                <div className="mt-1 text-xs text-[var(--color-ink-2)] leading-relaxed">
                  {o.note}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-[11px] text-[var(--color-muted)]">
          Подбираем стек под ваш класс ГИС и бюджет. Указанные сертификаты — действующие на текущую дату;
          актуальность проверяем по реестру ФСТЭК перед поставкой.
        </p>
      </div>
    </section>
  );
}
