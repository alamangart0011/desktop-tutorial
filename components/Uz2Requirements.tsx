export function Uz2Requirements() {
  const szi = [
    {
      t: 'СЗИ от НСД',
      p: 'Защита от несанкционированного доступа',
      e: 'Secret Net Studio — модуль НСД',
    },
    {
      t: 'Сертифицированная ОС',
      p: 'ОС 5-го класса ФСТЭК, функции защиты от НСД',
      e: 'Astra Linux · Alt Linux · РЕД ОС',
    },
    {
      t: 'СКЗИ — криптозащита канала',
      p: 'Шифрование данных в канале до ГИС',
      e: 'КриптоПро CSP + NGate Client · Yandex Browser / Chromium-Gost',
    },
    {
      t: 'Антивирусная защита',
      p: 'Обнаружение и нейтрализация вредоносного ПО',
      e: 'Модуль AV Secret Net Studio · Dr.Web · Kaspersky',
    },
    {
      t: 'Средство доверенной загрузки (СДЗ)',
      p: 'Выполнение УПД.17 до старта ОС',
      e: 'ПАК «Соболь» v4 PCIe, сертификат ФСТЭК',
    },
    {
      t: 'Средство анализа защищённости',
      p: 'Контроль защищённости ПДн (АНЗ)',
      e: 'Сканер-ВС · XSpider · RedCheck',
    },
    {
      t: 'Система обнаружения вторжений (СОВ)',
      p: 'Детектирование нарушителя во время вторжения',
      e: 'Модуль СОВ Secret Net Studio',
    },
  ];

  const docs = [
    'Уведомление в Роскомнадзор о начале обработки ПДн',
    'Акт обследования ИСПДн',
    'Модель угроз безопасности ПДн',
    'Акт классификации ИСПДн',
    'Техническое задание на создание СЗПДн',
    'Программа и методики испытаний ИСПДн (ПМИ)',
    'Технический паспорт ИСПДн',
    'Протокол оценки эффективности + Заключение о соответствии (3 года)',
  ];

  const os = ['Astra Linux', 'Alt Linux', 'РЕД ОС'];

  return (
    <section id="uz2" className="bg-[var(--color-paper)] py-16 md:py-24">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Требования ФСТЭК № 21 — УЗ2
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            УЗ2 — второй уровень защищённости.<br className="hidden md:block" /> Без него в ГИС не пустят.
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            В системе обрабатываются персональные данные несовершеннолетних, поэтому минимум — УЗ2
            по 21 Приказу ФСТЭК. Попытки подключения с нарушениями ТУ квалифицируются оператором
            как инцидент информационной безопасности.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {szi.map((x, i) => (
            <div key={x.t} className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-0.5 transition">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)] text-white font-extrabold flex items-center justify-center">
                {i + 1}
              </div>
              <div className="mt-4 font-bold text-[var(--color-ink)]">{x.t}</div>
              <div className="mt-1 text-sm text-[var(--color-ink-2)]">{x.p}</div>
              <div className="mt-3 text-xs text-[var(--color-muted)] border-t border-slate-200 pt-3">
                Реализация: <span className="text-[var(--color-ink-2)] font-medium">{x.e}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8">
            <h3 className="font-extrabold text-xl">Отечественные ОС — подходят все три</h3>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Сертифицированы ФСТЭК, соответствуют УЗ2. Подбираем под вашу инфраструктуру.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {os.map((o) => (
                <div key={o} className="rounded-xl bg-[var(--color-paper)] border border-slate-200 p-4 text-center">
                  <div className="font-extrabold text-[var(--color-brand)]">{o}</div>
                  <div className="text-[11px] text-[var(--color-muted)] mt-1">Сертификат ФСТЭК</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8">
            <h3 className="font-extrabold text-xl">Комплект документов ПДн — 8 позиций</h3>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Срок действия Заключения о соответствии — 3 года.
            </p>
            <ol className="mt-5 space-y-2.5 text-sm">
              {docs.map((d, i) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-bold items-center justify-center text-xs shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[var(--color-ink-2)]">{d}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-red-200 bg-red-50 p-6 md:p-8">
            <h3 className="font-extrabold text-xl text-red-800">Штрафы по 13.11 КоАП — от 100 тыс. до 5 млн ₽</h3>
            <p className="mt-1 text-sm text-red-900/80">
              За действия (бездействие) по обеспечению безопасности ПДн, повлекшие неправомерную
              передачу или доступ к ПДн, если деяние не содержит уголовного состава.
            </p>
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                { who: 'Граждане', sum: '100 000 – 200 000 ₽' },
                { who: 'Должностные лица', sum: '200 000 – 400 000 ₽' },
                { who: 'Юридические лица', sum: '3 000 000 – 5 000 000 ₽' },
              ].map((s) => (
                <div key={s.who} className="rounded-xl bg-white border border-red-200 p-4">
                  <div className="text-xs text-red-700 font-semibold uppercase tracking-wide">{s.who}</div>
                  <div className="mt-1 font-extrabold text-[var(--color-ink)]">{s.sum}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] text-white p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">С 01.03.2026</div>
            <h3 className="mt-2 font-extrabold text-xl">Приказ ФСТЭК № 117</h3>
            <p className="mt-2 text-sm text-white/85 leading-relaxed">
              Новые требования к защите информации в ГИС и КИИ. Сразу закладываем их в проект — не
              придётся переделывать через 3 месяца после запуска.
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-white text-[var(--color-brand)] text-sm font-semibold px-4 py-2.5 hover:bg-white/90 transition"
            >
              Учесть ФСТЭК № 117 в проекте
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
