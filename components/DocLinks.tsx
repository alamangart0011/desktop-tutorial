const DOCS = [
  {
    cat: 'Основа',
    title: 'ПП РФ № 411 от 01.04.2025',
    text: 'Положение о ГИС «Профилактика». Перечень поставщиков и получателей данных, цели, оператор.',
    href: 'http://publication.pravo.gov.ru/document/0001202504020003',
  },
  {
    cat: 'Основа',
    title: '120-ФЗ от 24.06.1999',
    text: 'Об основах системы профилактики безнадзорности и правонарушений несовершеннолетних. Определяет субъектов и их полномочия.',
    href: 'https://www.consultant.ru/document/cons_doc_LAW_23509/',
  },
  {
    cat: 'ПДн',
    title: '152-ФЗ от 27.07.2006',
    text: 'О персональных данных. Обязанности оператора, права субъекта, ответственность.',
    href: 'https://www.consultant.ru/document/cons_doc_LAW_61801/',
  },
  {
    cat: 'ФСТЭК',
    title: '21 Приказ ФСТЭК от 18.02.2013',
    text: 'Состав и содержание мер по обеспечению безопасности ПДн. Базовые и компенсирующие меры УЗ1–УЗ4.',
    href: 'https://fstec.ru/dokumenty/vse-dokumenty/prikazy/prikaz-fstek-rossii-ot-18-fevralya-2013-g-n-21',
  },
  {
    cat: 'ФСТЭК',
    title: '117 Приказ ФСТЭК от 11.04.2025',
    text: 'Расширенные требования к защите информации в ГИС. Действует с 01.03.2026.',
    href: 'https://fstec.ru/normotvorcheskaya/akty/53-prikazy',
  },
  {
    cat: 'КоАП',
    title: 'Ст. 13.11 КоАП РФ',
    text: 'Нарушение законодательства в области ПДн. Штрафы до 5 млн ₽ для юр. лиц.',
    href: 'https://www.consultant.ru/document/cons_doc_LAW_34661/7e7d15f8c5d81e5b6d7b2a1e7d1c6a1c3e4a4a4a/',
  },
  {
    cat: 'Реестры',
    title: 'Реестр сертифицированных СЗИ ФСТЭК',
    text: 'Актуальный список СЗИ от НСД, СОВ, СДЗ, АНЗ с действующими сертификатами.',
    href: 'https://reestr.fstec.ru/',
  },
  {
    cat: 'Реестры',
    title: 'Реестр отечественного ПО Минцифры',
    text: 'Проверка ОС, СУБД, офисных пакетов на включение в реестр для госзакупок.',
    href: 'https://reestr.digital.gov.ru/',
  },
];

const CATS = ['Основа', 'ПДн', 'ФСТЭК', 'КоАП', 'Реестры'] as const;

export function DocLinks() {
  return (
    <section
      id="docs"
      className="bg-white py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Нормативная база
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Восемь ключевых документов для подключения к ГИС
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Ссылки на первоисточники — pravo.gov.ru, fstec.ru, reestr.fstec.ru, Минцифры. Открываются
            в новой вкладке. Это тот минимум, который должен быть на рабочем столе у ответственного
            за ИБ в организации.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {CATS.map((cat) => {
            const items = DOCS.filter((d) => d.cat === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <div className="text-[11px] uppercase tracking-wider text-[var(--color-brand)] font-bold mb-3">
                  {cat}
                </div>
                <ul className="grid md:grid-cols-2 gap-3">
                  {items.map((d) => (
                    <li key={d.title}>
                      <a
                        href={d.href}
                        target="_blank"
                        rel="nofollow noreferrer"
                        className="group block rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-5 hover:border-[var(--color-brand)] transition"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm md:text-base font-extrabold text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-brand)] transition">
                            {d.title}
                          </div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-brand)] transition mt-1"
                            aria-hidden="true"
                          >
                            <path d="M7 17 17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </div>
                        <div className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">
                          {d.text}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-[11px] text-[var(--color-muted)]">
          Внешние ссылки — с <code>rel=&quot;nofollow noreferrer&quot;</code>. Актуальность проверяем
          ежеквартально, но за содержание сторонних ресурсов ответственность не несём.
        </p>
      </div>
    </section>
  );
}
