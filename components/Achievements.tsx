'use client';

import { useEffect, useRef, useState } from 'react';

type Item = {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  note: string;
};

const ITEMS: Item[] = [
  {
    target: 12,
    suffix: '+ лет',
    label: 'на рынке ИБ',
    note: 'Профильный опыт с ФСТЭК/ФСБ, 152-ФЗ, аттестацией ИСПДн',
  },
  {
    target: 200,
    suffix: '+ проектов',
    label: 'сдано в госсекторе',
    note: 'Региональные ведомства, школы, муниципалитеты, КДНиЗП',
  },
  {
    target: 12000,
    prefix: '>',
    suffix: ' АРМ',
    label: 'защищено СЗИ',
    note: 'Secret Net Studio, ПАК «Соболь», КриптоПро — под ключ',
  },
  {
    target: 100,
    suffix: '%',
    label: 'приёмок ФСТЭК',
    note: 'Без возвратов по аттестационным испытаниям',
  },
];

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return val;
}

function Counter({ item, run }: { item: Item; run: boolean }) {
  const value = useCountUp(item.target, run);
  const display = value.toLocaleString('ru-RU');
  return (
    <div className="flex flex-col">
      <div className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--color-brand)] tabular-nums">
        {item.prefix}
        {display}
        {item.suffix}
      </div>
      <div className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
        {item.label}
      </div>
      <div className="mt-1 text-xs text-[var(--color-muted)] leading-relaxed">
        {item.note}
      </div>
    </div>
  );
}

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="achievements"
      ref={ref}
      className="bg-white py-16 md:py-20 border-t border-slate-200"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            В цифрах
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Что за «Оборон-Экраном» — в реальных числах
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Не маркетинговые «тысячи клиентов», а конкретика по нашему профилю: госсектор,
            аттестация ИСПДн, подключение к государственным системам.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {ITEMS.map((i) => (
            <Counter key={i.label} item={i} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
