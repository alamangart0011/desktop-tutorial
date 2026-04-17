'use client';

import { useEffect, useRef, useState } from 'react';
import { VARIANT_KEY } from '@/lib/variants';
import { getVariantContent } from '@/lib/variant-content';

type Item = {
  v: string;
  u: string;
  d: string;
  num?: number;
  suffix?: string;
  prefix?: string;
};

const ITEMS: Item[] = getVariantContent(VARIANT_KEY).stats;

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

function CountUp({ to, duration = 1200 }: { to: number; duration?: number }) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);

  return <span ref={ref}>{v}</span>;
}

export function Stats() {
  return (
    <section
      aria-label="Ключевые показатели"
      className="bg-white border-b border-slate-200"
    >
      <div className="container-x py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {ITEMS.map((i) => (
          <div
            key={i.u}
            className="flex flex-col gap-1 count-pop"
            style={{ animationDelay: '0.05s' }}
          >
            <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--color-brand)]">
              {i.num !== undefined ? <CountUp to={i.num} /> : i.v}
            </div>
            <div className="text-xs md:text-sm font-semibold text-[var(--color-ink)]">
              {i.u}
            </div>
            <div className="text-xs text-[var(--color-muted)] leading-snug">
              {i.d}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
