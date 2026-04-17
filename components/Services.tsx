export function Services() {
  const items = [
    {
      t: 'Внедрение и подключение к ГИС',
      d: 'Регистрация в ЕСИА, настройка ЛК организации на Госуслугах, установка и настройка СЗИ (Secret Net Studio, ПАК «Соболь»), развёртывание КриптоПро NGate, оснащение АРМ по УЗ2.',
      tags: ['Под ключ', '35–45 рабочих дней', 'Аттестация ИСПДн'],
    },
    {
      t: 'Обучение и методология',
      d: 'Курсы для сотрудников КДНиЗП, школ, опеки, соцзащиты, медорганизаций. Шаблоны ИПР / карточек СОП и ТЖС, регламенты межведа, инструкции пользователей.',
      tags: ['Удостоверения о ПК', 'Очно / онлайн', 'Группы до 50 чел.'],
    },
    {
      t: 'Техподдержка и сопровождение 24/7',
      d: 'Горячая линия, SLA в договоре, администрирование АРМ, аудит качества данных в ГИС, обновление СЗИ и сертификатов, продление Заключения.',
      tags: ['SLA 4 часа', 'Выезд в СПб/СЗФО', 'Продление 3 года'],
    },
    {
      t: 'Аудит готовности региона / ведомства',
      d: 'Проверка нормативки и документов ПДн, ИТ-инфраструктуры, совместимости с ЕСИА / СМЭВ, ТУ Минпросвещения. На выходе — отчёт и дорожная карта подключения.',
      tags: ['Отчёт ≤ 10 дней', 'Дорожная карта', 'Оценка бюджета'],
    },
  ];
  return (
    <section id="services" className="bg-[var(--color-paper)] py-16 md:py-24">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-blue-50 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Услуги
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            4 направления — закрываем весь путь организации в ГИС «Профилактика»
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            От аудита до сопровождения после запуска. Берём на себя подготовку документов,
            техническую часть и работу с федеральным оператором.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {items.map((s, i) => (
            <div
              key={s.t}
              className="group rounded-2xl border border-slate-200 bg-white p-6 md:p-8 hover:border-[var(--color-brand-2)] hover:shadow-xl transition"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand)] text-white font-extrabold text-lg flex items-center justify-center shrink-0">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="font-extrabold text-xl">{s.t}</h3>
                  <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{s.d}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold text-[var(--color-brand)] bg-[var(--color-brand)]/10 rounded-full px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)] hover:gap-2.5 transition-all"
                  >
                    Обсудить направление →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
