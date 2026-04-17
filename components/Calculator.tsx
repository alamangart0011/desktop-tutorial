'use client';

import { useMemo, useState } from 'react';

type Tier = 'Старт' | 'Организация' | 'Регион';

const BASE: Record<Tier, { perArm: number; floor: number; ceiling: number }> = {
  Старт: { perArm: 0, floor: 150_000, ceiling: 250_000 },
  Организация: { perArm: 55_000, floor: 450_000, ceiling: 1_800_000 },
  Регион: { perArm: 35_000, floor: 2_500_000, ceiling: 25_000_000 },
};

const MODIFIERS = [
  { k: 'docs', label: 'Нужен полный комплект 8 документов ПДн', m: 1.0 },
  { k: 'szi', label: 'Нужна поставка СЗИ/СКЗИ (Secret Net, КриптоПро NGate, «Соболь»)', m: 1.15 },
  { k: 'os', label: 'Нужна отечественная ОС (Astra / Alt / РЕД)', m: 1.05 },
  { k: 'training', label: 'Обучение сотрудников с удостоверениями', m: 1.08 },
  { k: 'support', label: 'Техподдержка 24/7 на 12 месяцев, SLA 4 часа', m: 1.18 },
  { k: 'fstec117', label: 'Сразу закладываем требования Приказа ФСТЭК № 117', m: 1.05 },
] as const;

export function Calculator() {
  const [tier, setTier] = useState<Tier>('Организация');
  const [arm, setArm] = useState(10);
  const [active, setActive] = useState<Record<string, boolean>>({
    docs: true,
    szi: true,
    os: true,
    training: false,
    support: false,
    fstec117: true,
  });

  const result = useMemo(() => {
    const b = BASE[tier];
    const raw = b.floor + arm * b.perArm;
    const mult = MODIFIERS.reduce(
      (acc, m) => (active[m.k] ? acc * m.m : acc),
      1,
    );
    const rounded = Math.round((raw * mult) / 10_000) * 10_000;
    const value = Math.min(b.ceiling, Math.max(b.floor, rounded));
    const rawLow = Math.round((value * 0.85) / 10_000) * 10_000;
    const rawHigh = Math.round((value * 1.15) / 10_000) * 10_000;
    const low = Math.min(value, Math.max(b.floor, rawLow));
    const high = Math.max(value, Math.min(b.ceiling, rawHigh));
    const atCeiling = rounded >= b.ceiling;
    return { low, high, atCeiling };
  }, [tier, arm, active]);

  const fmt = (n: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <section id="calculator" className="bg-white py-16 md:py-24 border-t border-slate-200">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-accent)]/15 text-emerald-700 text-xs font-semibold px-3 py-1">
            Ориентировочный расчёт
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Калькулятор бюджета на подключение
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Выберите масштаб и состав работ — покажем диапазон стоимости. Точную смету и срок
            фиксируем в КП после экспресс-аудита.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.4fr,1fr] gap-6">
          <div className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Пакет
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(['Старт', 'Организация', 'Регион'] as Tier[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`rounded-xl px-3 py-3 text-sm font-semibold border transition ${
                    tier === t
                      ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)]'
                      : 'bg-white text-[var(--color-ink)] border-slate-200 hover:border-[var(--color-brand-2)]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Число АРМ
                </div>
                <div className="font-extrabold text-[var(--color-brand)]">{arm}</div>
              </div>
              <input
                type="range"
                min={1}
                max={500}
                value={arm}
                onChange={(e) => setArm(parseInt(e.target.value, 10))}
                className="mt-3 w-full accent-[var(--color-brand)]"
                aria-label="Число АРМ"
              />
              <div className="mt-1 flex justify-between text-[11px] text-[var(--color-muted)]">
                <span>1</span>
                <span>50</span>
                <span>200</span>
                <span>500+</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                Состав работ
              </div>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {MODIFIERS.map((m) => {
                  const on = active[m.k];
                  return (
                    <li key={m.k}>
                      <label
                        className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 cursor-pointer transition text-sm ${
                          on
                            ? 'bg-white border-[var(--color-brand-2)]'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() =>
                            setActive((p) => ({ ...p, [m.k]: !p[m.k] }))
                          }
                          className="mt-0.5 w-4 h-4 accent-[var(--color-brand)]"
                        />
                        <span className="text-[var(--color-ink)] leading-snug">{m.label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] text-white p-6 md:p-8 flex flex-col">
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">
              Ориентир бюджета
            </div>
            <div className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight leading-none">
              {fmt(result.low)}
            </div>
            <div className="mt-1 text-white/80 text-sm">
              — {fmt(result.high)} за проект
            </div>
            <div className="mt-6 rounded-xl bg-white/10 border border-white/15 p-4 text-sm text-white/90">
              Диапазон ориентировочный. Состав работ, точная смета и график фиксируются после
              экспресс-аудита (3–5 рабочих дней).
            </div>
            {result.atCeiling && (
              <div className="mt-3 rounded-xl bg-amber-300/20 border border-amber-200/40 p-3 text-xs text-amber-50">
                Упёрлись в потолок пакета «{tier}». Для точного расчёта посмотрите пакет уровнем выше —
                цифры ниже уже частично ограничены.
              </div>
            )}
            <div className="mt-auto pt-6 grid gap-2">
              <a
                href="#contact"
                data-goal="calculator-contact"
                className="inline-flex items-center justify-center rounded-xl bg-white text-[var(--color-brand)] font-semibold px-5 py-3 hover:bg-white/90 transition"
              >
                Получить точный расчёт
              </a>
              <a
                href="#check"
                className="inline-flex items-center justify-center rounded-xl bg-transparent border border-white/30 text-white font-semibold px-5 py-3 hover:bg-white/10 transition"
              >
                Сначала проверить готовность
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
