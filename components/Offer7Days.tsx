import {
  CheckCircleIcon,
  FileCheckIcon,
  ShieldCheckIcon,
  ClockIcon,
  CalendarIcon,
  ArrowRightIcon,
} from './Icons';

const DELIVERABLES = [
  {
    Icon: FileCheckIcon,
    t: 'Экспресс-аудит и письменное заключение',
    d: 'Проверим нормативку, класс ИСПДн, состав СЗИ и статус в ЕСИА/СМЭВ. Выдадим отчёт на 10–15 страниц с рисками.',
  },
  {
    Icon: ShieldCheckIcon,
    t: 'Персональная дорожная карта',
    d: '30/60/90 дней с перечнем работ, ответственными и контрольными точками. Понятно, кто и что делает.',
  },
  {
    Icon: CalendarIcon,
    t: 'Коммерческое предложение с фиксом',
    d: 'Смета с привязкой к числу АРМ, классу УЗ и составу СЗИ. Цена и сроки — в договоре, без скрытых доплат.',
  },
  {
    Icon: ClockIcon,
    t: 'Черновики 3 ключевых документов',
    d: 'Уведомление в Роскомнадзор, Акт классификации, Модель угроз — заготовки под вашу организацию, чтобы ускорить старт.',
  },
];

export function Offer7Days() {
  return (
    <section
      id="offer-7d"
      aria-labelledby="offer-7d-title"
      className="bg-white py-16 md:py-24"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-[1.1fr,1fr] gap-10 lg:gap-14 items-start">
          <div>
            <span className="inline-block rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent-dk)] text-xs font-bold px-3 py-1 uppercase tracking-wider">
              Гарантия 7 дней
            </span>
            <h2
              id="offer-7d-title"
              className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.1]"
            >
              Что вы получите{' '}
              <span className="text-[var(--color-brand)]">за 7 рабочих дней</span>{' '}
              после подписания договора
            </h2>
            <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
              Если в течение 7 рабочих дней не передадим все 4 результата —
              возвращаем 100% предоплаты по письменному заявлению. Это условие
              фиксируется в договоре.
            </p>

            <ul className="mt-8 space-y-4">
              {DELIVERABLES.map(({ Icon, t, d }) => (
                <li
                  key={t}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-4 md:p-5 hover:border-[var(--color-brand)] transition"
                >
                  <span className="shrink-0 inline-flex w-11 h-11 rounded-xl bg-[var(--color-brand)]/10 text-[var(--color-brand)] items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-extrabold text-[var(--color-ink)] leading-snug">
                      {t}
                    </div>
                    <div className="mt-1 text-sm text-[var(--color-ink-2)] leading-relaxed">
                      {d}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-3xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] text-white p-6 md:p-8 shadow-2xl lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Гарантия в договоре
            </div>
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
              Не сдадим за 7 дней — вернём предоплату
            </h3>
            <p className="mt-3 text-white/90 leading-relaxed">
              Это не маркетинг — пункт возвращается дословно в договоре:{' '}
              <em className="not-italic font-semibold text-[var(--color-accent)]">
                «Исполнитель обязуется передать Заказчику материалы этапа 1 в
                срок не позднее 7 (семи) рабочих дней с момента поступления
                предоплаты; при нарушении срока — возврат 100% в течение 5 рабочих дней»
              </em>.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                'Все 4 результата сдаём по акту',
                'Фиксированная цена на весь проект',
                'NDA и 152-ФЗ подписываем до обмена данными',
                'Работаем по 44-ФЗ и 223-ФЗ',
              ].map((x) => (
                <li key={x} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex w-5 h-5 rounded-full bg-[var(--color-accent)] text-[#052e1e] items-center justify-center shrink-0">
                    <CheckCircleIcon className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span className="leading-snug text-white/95">{x}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              data-goal="offer-7d-cta"
              className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[var(--color-brand)] font-extrabold px-5 py-4 text-base hover:bg-[var(--color-accent)] hover:text-[#052e1e] transition min-h-[56px]"
            >
              Запустить этап за 7 дней
              <ArrowRightIcon className="w-5 h-5" />
            </a>
            <div className="mt-3 text-[11px] text-white/75 text-center">
              Средний срок подготовки договора — 1 рабочий день
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
