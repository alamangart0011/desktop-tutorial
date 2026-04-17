import {
  HandshakeIcon,
  ShieldCheckIcon,
  BadgeCheckIcon,
  UsersIcon,
  ScaleIcon,
  MapPinIcon,
} from './Icons';

const MARKERS = [
  {
    Icon: HandshakeIcon,
    k: 'Аккредитованные партнёры',
    v: 'ФСТЭК · ФСБ',
    hint: 'Аттестацию и установку СЗИ выполняют лицензиаты ФСТЭК/ФСБ на субподряде',
  },
  {
    Icon: BadgeCheckIcon,
    k: 'Авторизованный дилер',
    v: 'КриптоПро',
    hint: 'Поставка КриптоПро CSP и NGate Client по прямому дилерскому договору',
  },
  {
    Icon: ShieldCheckIcon,
    k: 'СЗИ в реестре ФСТЭК',
    v: 'Secret Net · Соболь',
    hint: 'Подбираем только сертифицированные средства из реестра ФСТЭК России',
  },
  {
    Icon: UsersIcon,
    k: '20+ организаций',
    v: 'уже в ГИС',
    hint: 'Школы, КДН, опека и соцзащита — подключены и работают',
  },
  {
    Icon: MapPinIcon,
    k: 'Санкт-Петербург',
    v: 'СЗФО + РФ',
    hint: 'Базируемся в СПб, работаем по всему Северо-Западу и дистанционно по РФ',
  },
  {
    Icon: ScaleIcon,
    k: '44-ФЗ / 223-ФЗ',
    v: 'госзакупки',
    hint: 'Заключаем договоры по 44-ФЗ и 223-ФЗ, в т.ч. как единственный поставщик',
  },
];

export function TrustBar() {
  return (
    <section
      aria-label="Как мы работаем"
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
