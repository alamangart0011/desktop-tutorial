export function Problem() {
  const pains = [
    {
      icon: '⚡',
      t: 'Подключение уже обязательно',
      d: 'ПП РФ № 411 сделал подключение обязательным с 01.12.2025. Без соблюдения ТУ Минпросвещения доступ в систему не дадут, а штрафы по 13.11 КоАП уже применяются.',
    },
    {
      icon: '🛡',
      t: 'Не хватает сертифицированных СЗИ',
      d: 'СЗИ от НСД, СКЗИ (КриптоПро NGate Client), ПАК «Соболь», СОВ, антивирус, анализ защищённости — без них УЗ2 не выполнить.',
    },
    {
      icon: '💻',
      t: 'Нет отечественной ОС',
      d: 'Windows не подойдёт. Нужна Astra Linux, Alt Linux или РЕД ОС, сертифицированная ФСТЭК.',
    },
    {
      icon: '₽',
      t: 'Штрафы до 5 млн ₽',
      d: 'За несоответствие требованиям по ПДн несовершеннолетних — 13.11 КоАП: до 200 тыс. ₽ должностным лицам и до 5 млн ₽ юр. лицам.',
    },
    {
      icon: '📄',
      t: 'Нет документов ПДн',
      d: 'Уведомление в РКН, Модель угроз, Акт классификации, ТЗ, ПМИ, Технический паспорт, Протокол и Заключение — комплект собирают неделями.',
    },
    {
      icon: '🚨',
      t: 'Попытка подключения с нарушениями = инцидент ИБ',
      d: 'Федеральный оператор фиксирует это как инцидент и инициирует расследование причин и условий.',
    },
  ];
  return (
    <section id="problem" className="bg-[var(--color-paper)] py-16 md:py-20">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-red-100 text-red-700 text-xs font-semibold px-3 py-1">
            Почему откладывать опасно
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            6 причин, из-за которых ведомства не успевают подключиться сами
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)]">
            Мы снимаем с вас всю техническую и организационную сторону и ведём до приёмки ГИС.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pains.map((p, i) => (
            <article
              key={p.t}
              className="card-soft p-6 relative overflow-hidden group"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div
                aria-hidden
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 text-xl font-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {p.icon}
                </div>
                <div className="font-bold text-lg text-[var(--color-ink)]">
                  {p.t}
                </div>
                <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">
                  {p.d}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
