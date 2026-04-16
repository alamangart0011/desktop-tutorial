import { BRAND } from './constants';

const REGIONS = [
  { code: '78', name: 'Санкт-Петербург', note: 'Базовая локация' },
  { code: '47', name: 'Ленинградская область', note: 'Выезд по СЗФО' },
  { code: '10', name: 'Республика Карелия', note: 'Поддержка удалённо' },
  { code: '29', name: 'Архангельская область', note: 'Поддержка удалённо' },
  { code: '51', name: 'Мурманская область', note: 'Поддержка удалённо' },
  { code: '53', name: 'Новгородская область', note: 'Поддержка удалённо' },
  { code: '60', name: 'Псковская область', note: 'Поддержка удалённо' },
  { code: '11', name: 'Республика Коми', note: 'Поддержка удалённо' },
  { code: '83', name: 'НАО', note: 'Поддержка удалённо' },
  { code: '35', name: 'Вологодская область', note: 'Поддержка удалённо' },
  { code: '50', name: 'Московская область', note: 'По запросу — выезд' },
  { code: '77', name: 'Москва', note: 'По запросу — выезд' },
];

export function Regions() {
  return (
    <section
      id="regions"
      className="bg-white py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="grid md:grid-cols-[1.2fr,1fr] gap-8 items-start">
          <div>
            <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
              География
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
              Подключаем к ГИС «Профилактика» в Санкт-Петербурге и СЗФО
            </h2>
            <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
              Базовая команда — в {BRAND.address}. Выезжаем для обследования ИСПДн и аттестационных
              испытаний по Северо-Западному федеральному округу. Удалённое сопровождение,
              техподдержка 24/7 и обучение операторов — по всей России.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-[var(--color-ink-2)]">
              <li className="flex gap-2">
                <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[#052e1e] text-[11px] font-black">
                  ✓
                </span>
                Работаем с КДНиЗП, школами, опекой, соцзащитой, медучреждениями, ОВД
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[#052e1e] text-[11px] font-black">
                  ✓
                </span>
                Договоры по 44-ФЗ и 223-ФЗ — есть опыт государственных закупок
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[#052e1e] text-[11px] font-black">
                  ✓
                </span>
                Командировки и проживание включаем в смету заранее, без сюрпризов
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Регионы присутствия
            </div>
            <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {REGIONS.map((r) => (
                <li
                  key={r.code}
                  className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs"
                  title={r.note}
                >
                  <div className="font-semibold text-[var(--color-ink)] leading-tight">
                    {r.name}
                  </div>
                  <div className="text-[10px] text-[var(--color-muted)] mt-0.5">
                    Регион {r.code} · {r.note}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-[var(--color-muted)]">
              Списка регионов нет в вашем перечне? Уточним возможности и сроки выезда — позвоните
              {' '}
              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="text-[var(--color-brand)] font-semibold"
              >
                {BRAND.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
