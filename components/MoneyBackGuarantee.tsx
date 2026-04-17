import {
  ShieldCheckIcon,
  BadgeCheckIcon,
  ClockIcon,
  HandshakeIcon,
  RubleIcon,
} from './Icons';

const POINTS = [
  {
    Icon: ClockIcon,
    title: '7 дней или 100% возврат',
    desc: 'Если не сдадим этап&nbsp;1 (экспресс-аудит, дорожная карта, КП) в течение 7 рабочих дней с момента предоплаты — возвращаем 100% аванса в 5-дневный срок. Условие закрепляется в договоре.',
  },
  {
    Icon: BadgeCheckIcon,
    title: 'Доводим до Заключения или не берём денег',
    desc: 'Оплата финального этапа — только по факту подписанного Заключения об оценке эффективности мер защиты ПДн (действует 3&nbsp;года). Нет документа — нет оплаты.',
  },
  {
    Icon: HandshakeIcon,
    title: 'Фиксированная цена в договоре',
    desc: 'Стоимость и состав работ фиксируются в договоре. Никаких скрытых доплат «по ходу». Если понадобится расширение — только отдельным допсоглашением с вашим согласием.',
  },
  {
    Icon: RubleIcon,
    title: 'Рассрочка и оплата по этапам',
    desc: 'По 44-ФЗ/223-ФЗ — аванс 30% + расчёт по актам этапов. Для коммерческих заказчиков — деление на 3 этапа (30/40/30), без процентов и переплат.',
  },
];

export function MoneyBackGuarantee() {
  return (
    <section
      id="guarantee"
      className="section-pad bg-[var(--color-paper)] scroll-mt-20"
      aria-labelledby="guarantee-heading"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-[1.1fr,1fr] gap-10 items-start">
          <div>
            <div className="eyebrow">Гарантии результата</div>
            <h2
              id="guarantee-heading"
              className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] text-balance"
            >
              Не устраивает результат — возвращаем деньги
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Мы не продаём «процесс» — мы продаём подписанные документы и рабочий
              доступ к ГИС. Три гарантии фиксируются отдельным разделом договора;
              риск неисполнения остаётся на нас, а не на вас.
            </p>

            <div className="mt-6 rounded-2xl border border-[var(--color-accent)]/30 bg-white p-5 md:p-6">
              <div className="flex items-start gap-3">
                <span className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30 shrink-0">
                  <ShieldCheckIcon className="w-6 h-6" />
                </span>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)]">
                    Цитата из договора
                  </div>
                  <p className="mt-2 text-slate-800 leading-relaxed text-[0.98rem]">
                    «Исполнитель обязуется передать Заказчику материалы этапа&nbsp;1
                    (экспресс-аудит, дорожная карта, коммерческое предложение) в срок
                    не позднее 7 (семи) рабочих дней с момента поступления
                    предоплаты. При нарушении данного срока по вине Исполнителя
                    Заказчик вправе расторгнуть договор в одностороннем порядке, а
                    Исполнитель возвращает сумму предоплаты в полном объёме в
                    течение 5 (пяти) рабочих дней.»
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                data-goal="guarantee-contact"
                className="btn-primary"
              >
                Получить шаблон договора
              </a>
              <a href="#offer-7d" className="btn-ghost">
                Условия этапа «7 дней»
              </a>
            </div>
          </div>

          <ul className="space-y-3">
            {POINTS.map(({ Icon, title, desc }) => (
              <li
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5 flex gap-4"
              >
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/15 shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-[var(--color-ink)]">{title}</div>
                  <p
                    className="mt-1 text-sm text-slate-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
