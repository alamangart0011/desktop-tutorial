export function Stats() {
  const items = [
    { v: '35–45', u: 'рабочих дней', d: 'Полный цикл подключения под ключ' },
    { v: 'УЗ2', u: '21 Приказ ФСТЭК', d: 'Уровень защищённости, обязательный для ГИС' },
    { v: '8', u: 'документов ПДн', d: 'Готовим комплект на 3 года' },
    { v: 'до 5 млн ₽', u: 'штраф юр. лицам', d: 'По 13.11 КоАП — не подключились / утечка' },
  ];
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="container-x py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {items.map((i) => (
          <div key={i.u} className="flex flex-col gap-1">
            <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--color-brand)]">
              {i.v}
            </div>
            <div className="text-xs md:text-sm font-semibold text-[var(--color-ink)]">
              {i.u}
            </div>
            <div className="text-xs text-[var(--color-muted)] leading-snug">
              {i.d}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
