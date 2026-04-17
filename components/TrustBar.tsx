import {
  AwardIcon,
  ShieldCheckIcon,
  BadgeCheckIcon,
  UsersIcon,
  ScaleIcon,
  MapPinIcon,
} from './Icons';

const MARKERS = [
  {
    Icon: AwardIcon,
    k: 'Лицензия ФСТЭК',
    v: 'на ТЗКИ',
    hint: 'Технические меры защиты информации',
  },
  {
    Icon: BadgeCheckIcon,
    k: 'Лицензия ФСБ',
    v: 'на СКЗИ',
    hint: 'Работа со средствами криптозащиты',
  },
  {
    Icon: ShieldCheckIcon,
    k: 'СЗИ в реестре',
    v: 'Secret Net Studio',
    hint: 'Сертифицированное СЗИ в реестре ФСТЭК',
  },
  {
    Icon: UsersIcon,
    k: '20+ организаций',
    v: 'СЗФО',
    hint: 'Уже подключены и работают в ГИС',
  },
  {
    Icon: MapPinIcon,
    k: '11 регионов',
    v: 'Северо-Запад',
    hint: 'Работаем по всему СЗФО и дистанционно по РФ',
  },
  {
    Icon: ScaleIcon,
    k: '44-ФЗ / 223-ФЗ',
    v: 'закупки',
    hint: 'Оформим как единственный поставщик или через конкурс',
  },
];

export function TrustBar() {
  return (
    <section
      aria-label="Опыт и аккредитации"
      className="bg-white border-b border-slate-100"
    >
      <div className="container-x py-6 md:py-8">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {MARKERS.map(({ Icon, k, v, hint }) => (
            <li
              key={k}
              className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3 hover:border-[var(--color-brand)] hover:shadow-sm transition"
              title={hint}
            >
              <span className="inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
                <Icon className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                  {v}
                </div>
                <div className="text-sm font-extrabold text-[var(--color-ink)] leading-tight truncate">
                  {k}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
