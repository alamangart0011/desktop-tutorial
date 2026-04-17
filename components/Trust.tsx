import { BRAND } from './constants';

const LICENSES = [
  {
    issuer: 'ФСТЭК России',
    title: 'Деятельность по технической защите конфиденциальной информации',
    note: 'Лицензия требуется для аттестации ИСПДн и поставки СЗИ',
  },
  {
    issuer: 'ФСТЭК России',
    title: 'Разработка и производство СЗИ',
    note: 'Право монтажа и наладки сертифицированных СЗИ от НСД',
  },
  {
    issuer: 'ФСБ России',
    title: 'Работы со СКЗИ',
    note: 'Поставка, установка и сопровождение КриптоПро CSP / NGate',
  },
  {
    issuer: 'ФСБ России',
    title: 'Распространение шифровальных средств',
    note: 'Право поставки сертифицированных средств криптозащиты',
  },
];

const REGISTRIES = [
  'Реестр аккредитованных ИТ-организаций Минцифры',
  'Реестр отечественного ПО',
  'Член «Руссофт» / профильных ассоциаций ИБ',
];

export function Trust() {
  return (
    <section
      id="trust"
      className="bg-white py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Лицензии и допуски
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Работаем по лицензиям ФСТЭК и ФСБ России
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Подключение к ГИС «Профилактика» требует аттестации ИСПДн по 21 Приказу ФСТЭК и поставки
            сертифицированных СЗИ/СКЗИ. Делать это без профильных лицензий — нарушение. {BRAND.shortName}
            работает по полному пакету разрешительных документов.
          </p>
        </div>

        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LICENSES.map((l) => (
            <li
              key={l.title}
              className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-brand)] text-white text-xs font-extrabold">
                  {l.issuer.includes('ФСТЭК') ? 'ФСТЭК' : 'ФСБ'}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-semibold">
                  Действующая
                </span>
              </div>
              <div className="mt-3 text-sm font-bold text-[var(--color-ink)] leading-snug">
                {l.title}
              </div>
              <div className="mt-1.5 text-xs text-[var(--color-muted)] leading-relaxed">
                {l.note}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl bg-[var(--color-paper)] border border-slate-200 p-5 md:p-6 grid md:grid-cols-[auto,1fr] gap-4 items-start">
          <span className="inline-flex items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-emerald-700 px-3 py-2 text-xs font-bold">
            Реестры и членства
          </span>
          <ul className="grid sm:grid-cols-3 gap-2 text-sm text-[var(--color-ink-2)]">
            {REGISTRIES.map((r) => (
              <li key={r} className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex w-4 h-4 items-center justify-center rounded-full bg-[var(--color-brand)] text-white text-[10px]">
                  ✓
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-[11px] text-[var(--color-muted)]">
          Копии лицензий и сертификатов высылаем на запрос. Реквизиты сертификатов СЗИ/СКЗИ
          прилагаем к договору и Заключению об оценке эффективности мер защиты ПДн.
        </p>
      </div>
    </section>
  );
}
