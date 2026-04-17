import { BRAND } from './constants';

type Row = {
  feature: string;
  us: string | boolean;
  others: string | boolean;
};

const ROWS: Row[] = [
  { feature: 'Профильная ИБ-компания (не универсал-интегратор)', us: true, others: false },
  { feature: 'Фиксированная стоимость пакетов и калькулятор', us: true, others: 'Цена «по запросу»' },
  { feature: 'Интерактивный чек-лист готовности по 21 Приказу ФСТЭК', us: true, others: false },
  { feature: 'Полный комплект 8 документов ПДн под УЗ2', us: true, others: 'Частично' },
  { feature: 'Сразу закладываем требования Приказа ФСТЭК № 117 (с 01.03.2026)', us: true, others: false },
  { feature: 'Сертифицированные СЗИ: Secret Net Studio, ПАК «Соболь», КриптоПро NGate', us: true, others: 'Не всегда' },
  { feature: 'Отечественные ОС: Astra Linux / Alt Linux / РЕД ОС', us: true, others: 'По запросу' },
  { feature: 'Аттестация ИСПДн с заключением сроком 3 года', us: true, others: true },
  { feature: 'Техподдержка 24/7, SLA 4 часа', us: true, others: 'SLA 8–24 ч' },
  { feature: 'Срок проекта 35–45 рабочих дней с фиксацией в договоре', us: true, others: 'Без фиксации' },
  { feature: 'Локальная команда в Санкт-Петербурге, выезд по СЗФО', us: true, others: 'Удалённо' },
  { feature: 'Опыт работы с КДНиЗП, школами, опекой, соцзащитой', us: true, others: 'Общий ИТ-опыт' },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 10.5l3 3 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Да
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-slate-400">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        Нет
      </span>
    );
  }
  return <span className="text-[var(--color-ink-2)] text-sm">{value}</span>;
}

export function Comparison() {
  return (
    <section
      id="comparison"
      className="bg-[var(--color-paper)] py-16 md:py-24 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Сравнение
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            {BRAND.shortName} vs типичный интегратор
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Мы — профильная компания по информационной безопасности. ГИС «Профилактика» обрабатывает
            ПДн несовершеннолетних, поэтому подход общего ИТ-интегратора здесь не работает: нужны
            сертифицированные СЗИ, лицензии ФСТЭК и опыт аттестации ИСПДн.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-slate-50 text-[var(--color-ink-2)]">
              <tr>
                <th className="px-3 sm:px-4 md:px-6 py-4 font-semibold w-[44%]">Критерий</th>
                <th className="px-3 sm:px-4 md:px-6 py-4 font-semibold text-[var(--color-brand)]">
                  {BRAND.shortName}
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-4 font-semibold">Типичный ИТ-подрядчик</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.feature} className="border-t border-slate-100 align-top">
                  <td className="px-3 sm:px-4 md:px-6 py-4 text-[var(--color-ink)]">{r.feature}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-4">
                    <Cell value={r.us} />
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-4">
                    <Cell value={r.others} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            data-goal="comparison-contact"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-5 py-3 hover:bg-[var(--color-brand-2)] transition"
          >
            Получить КП с фиксированной ценой
          </a>
          <a
            href="#calculator"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 text-[var(--color-ink)] font-semibold px-5 py-3 hover:border-[var(--color-brand-2)] transition"
          >
            Открыть калькулятор
          </a>
        </div>
      </div>
    </section>
  );
}
