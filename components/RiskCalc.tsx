'use client';

import { useMemo, useState } from 'react';

type Role = 'citizen' | 'official' | 'legal';

const ROLE_RANGE: Record<Role, { min: number; max: number; label: string }> = {
  citizen: { min: 100_000, max: 200_000, label: 'Гражданин' },
  official: { min: 200_000, max: 400_000, label: 'Должностное лицо' },
  legal: { min: 3_000_000, max: 5_000_000, label: 'Юридическое лицо' },
};

function fmt(n: number) {
  return n.toLocaleString('ru-RU') + ' ₽';
}

export function RiskCalc() {
  const [role, setRole] = useState<Role>('legal');
  const [episodes, setEpisodes] = useState(1);
  const [leak, setLeak] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const { min, max } = useMemo(() => {
    const base = ROLE_RANGE[role];
    let low = base.min * episodes;
    let high = base.max * episodes;
    if (leak && role === 'legal') {
      low += 3_000_000;
      high += 15_000_000;
    }
    if (repeat) {
      low += base.min;
      high += base.max * 2;
    }
    return { min: low, max: high };
  }, [role, episodes, leak, repeat]);

  return (
    <section
      id="risk"
      className="bg-white py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1">
            Калькулятор штрафа
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Сколько вы рискуете, если не подключены к ГИС
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Грубая оценка по ст. 13.11 КоАП и смежным статьям (152-ФЗ, 266-ФЗ о больших утечках).
            Считаем с учётом количества эпизодов, утечки ПДн и повторности нарушения.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-5 md:p-8 grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="space-y-5">
            <div>
              <div className="text-sm font-semibold text-[var(--color-ink)] mb-2">
                Субъект ответственности
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(ROLE_RANGE) as Role[]).map((k) => (
                  <button
                    type="button"
                    key={k}
                    onClick={() => setRole(k)}
                    className={`rounded-xl border px-2 py-2 text-xs font-semibold transition ${
                      role === k
                        ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)]'
                        : 'bg-white text-[var(--color-ink)] border-slate-200 hover:border-[var(--color-brand)]'
                    }`}
                  >
                    {ROLE_RANGE[k].label}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-[var(--color-ink)]">
                Число выявленных эпизодов
              </span>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={episodes}
                  onChange={(e) => setEpisodes(Number(e.target.value))}
                  className="flex-1 accent-[var(--color-brand)]"
                  aria-label="Эпизоды"
                />
                <span className="w-10 text-right text-sm font-extrabold text-[var(--color-brand)]">
                  {episodes}
                </span>
              </div>
              <div className="mt-1 text-xs text-[var(--color-muted)]">
                Каждая проверка прокуратуры = отдельный эпизод по каждому субъекту ПДн.
              </div>
            </label>

            <label
              className={`flex items-start gap-3 ${
                role === 'legal' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              }`}
            >
              <input
                type="checkbox"
                checked={leak && role === 'legal'}
                onChange={(e) => setLeak(e.target.checked)}
                disabled={role !== 'legal'}
                className="mt-1 h-4 w-4 accent-[var(--color-brand)]"
              />
              <span className="text-sm text-[var(--color-ink)]">
                <b>Утечка ПДн несовершеннолетних.</b>{' '}
                <span className="text-[var(--color-muted)]">
                  Дополнительно ст. 13.11 ч. 13–14 КоАП: 3–15 млн ₽ юр. лицу
                  {role !== 'legal' && (
                    <> (применяется только к юридическим лицам)</>
                  )}
                  .
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={repeat}
                onChange={(e) => setRepeat(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--color-brand)]"
              />
              <span className="text-sm text-[var(--color-ink)]">
                <b>Повторное нарушение за год.</b>{' '}
                <span className="text-[var(--color-muted)]">
                  Увеличивает нижнюю и верхнюю границы по ч. 11 ст. 13.11.
                </span>
              </span>
            </label>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-white border border-rose-200 p-5 md:p-6 flex flex-col">
            <div className="text-[11px] uppercase tracking-wider text-rose-700 font-bold">
              Ориентировочный штраф
            </div>
            <div className="mt-3 text-3xl md:text-4xl font-extrabold text-rose-700 leading-none">
              {fmt(min)}
            </div>
            <div className="mt-1 text-sm text-[var(--color-ink-2)]">до</div>
            <div className="text-3xl md:text-4xl font-extrabold text-rose-700 leading-none">
              {fmt(max)}
            </div>

            <div className="mt-5 text-xs text-[var(--color-muted)] leading-relaxed">
              Плюс возможная приостановка обработки ПДн, отзыв лицензий, уголовная
              ответственность по ст. 272 УК РФ при умышленных действиях.
            </div>

            <div className="mt-auto pt-5">
              <a
                href="#contact"
                data-goal="risk-calc-cta"
                className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-5 py-3 hover:bg-[var(--color-brand-2)] transition"
              >
                Снять риск — обсудить подключение
              </a>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-[var(--color-muted)]">
          Оценка ориентировочная, не заменяет юридическое заключение. Финальный размер штрафа
          определяется судом с учётом обстоятельств, смягчающих и отягчающих факторов.
        </p>
      </div>
    </section>
  );
}
