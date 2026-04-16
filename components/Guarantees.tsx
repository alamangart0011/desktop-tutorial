const ITEMS = [
  {
    kpi: '100%',
    title: 'Сдача в срок или штраф по договору',
    text: 'Фиксируем дату приёмки в договоре. Не успели — компенсация 0,1% за день задержки. За нашу историю ни одной просрочки по ГИС-проектам.',
  },
  {
    kpi: '3 года',
    title: 'Заключение об оценке эффективности',
    text: 'Ровно тот срок, на который ФСТЭК выдаёт Заключение о соответствии. За 3 месяца до истечения начинаем переаттестацию.',
  },
  {
    kpi: '4 часа',
    title: 'SLA на техподдержку',
    text: 'Реакция на критичный инцидент — 4 часа, на обычный — 1 рабочий день. Горячая линия 24/7 в пакете «Под ключ».',
  },
  {
    kpi: '0 ₽',
    title: 'Без скрытых платежей',
    text: 'Финальная цена в договоре = цене в КП. Поставка СЗИ, лицензии ОС и аттестация — отдельные строки, без «сюрпризов».',
  },
  {
    kpi: 'NDA',
    title: 'Конфиденциальность данных',
    text: 'Подписываем NDA до начала аудита. Обработка ПДн — на вашем контуре, мы работаем через защищённые каналы без выноса базы.',
  },
  {
    kpi: '44-ФЗ',
    title: 'Работаем по 44-ФЗ и 223-ФЗ',
    text: 'Зарегистрированы в ЕИС. Готовим техническое задание для конкурсной документации, помогаем с обоснованием НМЦК.',
  },
];

export function Guarantees() {
  return (
    <section
      id="guarantees"
      className="bg-[var(--color-paper)] py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1">
            Гарантии
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Шесть обязательств, которые идут в договор
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Не «приложение к презентации», а пункты договора с конкретными цифрами и санкциями
            за невыполнение. Всё, что указано ниже, готовы закрепить юридически.
          </p>
        </div>

        <ul className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((i) => (
            <li
              key={i.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-[var(--color-brand)] leading-none">
                {i.kpi}
              </div>
              <div className="text-base font-extrabold text-[var(--color-ink)] leading-snug">
                {i.title}
              </div>
              <div className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                {i.text}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
