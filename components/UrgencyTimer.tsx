'use client';

import { useEffect, useState } from 'react';
import { ClockIcon, ZapIcon } from './Icons';

function endOfMonth() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth() + 1, 1, 0, 0, 0, 0).getTime();
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

type Left = { d: number; h: number; m: number; s: number };

function computeLeft(target: number): Left {
  const diff = Math.max(0, target - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

const MONTHS_GEN = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export function UrgencyTimer() {
  const [mounted, setMounted] = useState(false);
  const [target, setTarget] = useState<number>(0);
  const [left, setLeft] = useState<Left>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const t = endOfMonth();
    setTarget(t);
    setLeft(computeLeft(t));
    setMounted(true);
    const id = window.setInterval(() => setLeft(computeLeft(t)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const deadline = target
    ? new Date(target - 1)
    : new Date();
  const monthLabel = `${deadline.getDate()} ${MONTHS_GEN[deadline.getMonth()]}`;

  return (
    <section
      id="promo"
      aria-labelledby="promo-heading"
      className="relative section-pad-sm bg-[linear-gradient(135deg,#0b3b8c_0%,#0ea5e9_100%)] text-white scroll-mt-20 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full bg-white/10 blur-3xl"
      />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-[1.2fr,1fr] items-center gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
              <ZapIcon className="w-3.5 h-3.5" />
              Акция действует до {monthLabel}
            </div>
            <h2
              id="promo-heading"
              className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-balance"
            >
              −20% на&nbsp;экспресс-аудит готовности к&nbsp;ГИС&nbsp;«Профилактика»
            </h2>
            <p className="mt-3 text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
              Фиксируем цену на пакет «Старт» — 120&nbsp;000&nbsp;₽ вместо
              150&nbsp;000&nbsp;₽ для всех заявок до конца месяца. Результат за
              5–10 рабочих дней: отчёт, дорожная карта, КП на «под ключ».
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                data-goal="promo-cta"
                className="btn-primary bg-white text-[var(--color-brand)] hover:bg-white/90 text-base px-6 py-4 min-h-[56px]"
              >
                Зафиксировать скидку
              </a>
              <a
                href="#pricing"
                data-goal="promo-pricing"
                className="btn-ghost text-base px-6 py-4 min-h-[56px] border-white/40 text-white hover:bg-white/10"
              >
                Смотреть пакеты
              </a>
            </div>
          </div>

          <div
            className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur p-5 md:p-6"
            aria-live="polite"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80 font-bold">
              <ClockIcon className="w-4 h-4" />
              До конца акции осталось
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 md:gap-3 text-center">
              {[
                { v: left.d, l: 'дней' },
                { v: left.h, l: 'часов' },
                { v: left.m, l: 'минут' },
                { v: left.s, l: 'секунд' },
              ].map(({ v, l }) => (
                <div
                  key={l}
                  className="rounded-xl bg-[var(--color-ink)]/30 border border-white/10 py-3"
                >
                  <div
                    className="text-3xl md:text-4xl font-extrabold tabular-nums tracking-tight"
                    suppressHydrationWarning
                  >
                    {mounted ? pad(v) : '--'}
                  </div>
                  <div className="mt-1 text-[10px] md:text-xs uppercase tracking-wider text-white/75 font-semibold">
                    {l}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/80 leading-relaxed">
              Скидка применяется к пакету «Старт». Для пакетов «Организация» и
              «Регион» — бонусом пролонгированное сопровождение +1 месяц.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
