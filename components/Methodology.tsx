const PRINCIPLES = [
  {
    n: '01',
    title: 'Риск-ориентированный подход',
    text: 'Начинаем с моделирования угроз по методике ФСТЭК 2021 г. и БДУ, не с «поставить SN Studio, где найдём место». Меры строго под актуальный профиль.',
    anchor: 'Методика ФСТЭК + БДУ',
  },
  {
    n: '02',
    title: 'Управляемый проект',
    text: 'Каждый этап — зафиксированный deliverable, чек-пойнт и ответственный. Используем выжимку из PMI PMBOK 7 с адаптацией под 44-ФЗ / 223-ФЗ.',
    anchor: 'PMBOK 7 · PRINCE2 lite',
  },
  {
    n: '03',
    title: 'Документ = Факт',
    text: 'Ни одной строчки «на словах». Акты обследования, ПМИ, протоколы испытаний — с фотографиями, скриншотами и подписями. Проверка прокуратурой проходится без дополнительных пояснений.',
    anchor: 'ГОСТ 34 + 59795-2021',
  },
  {
    n: '04',
    title: 'Ноль-перерыв для работы ведомства',
    text: 'Переход на ГИС параллельно со старой АИС. Пилот на 1–2 учреждениях, потом масштабирование. Без недели «ни старое, ни новое не работает».',
    anchor: 'Blue-Green миграция',
  },
];

export function Methodology() {
  return (
    <section
      id="methodology"
      className="bg-white py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Методология
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Четыре принципа, которые отличают ИБ-команду от «универсального интегратора»
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Нас часто сравнивают с обычными ИТ-подрядчиками. Разница в методологии: мы не «тащим железо»
            на объект, а управляем рисками, документами и изменениями по понятной рамке.
          </p>
        </div>

        <ol className="mt-10 grid md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p) => (
            <li
              key={p.n}
              className="reveal-up rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-6 md:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--color-brand)] text-white flex items-center justify-center text-lg font-extrabold">
                  {p.n}
                </div>
                <div className="flex-1">
                  <div className="text-lg md:text-xl font-extrabold text-[var(--color-ink)] leading-snug">
                    {p.title}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-[var(--color-brand)] font-bold">
                    {p.anchor}
                  </div>
                  <div className="mt-3 text-sm text-[var(--color-ink-2)] leading-relaxed">
                    {p.text}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
