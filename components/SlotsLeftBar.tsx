'use client';

import { useEffect, useState } from 'react';

/**
 * SlotsLeftBar — sticky-полоса снизу на десктопе (скрыта на мобайле,
 * т.к. там уже есть StickyMobileCta). Показывает «осталось N слотов
 * в <месяц>», число зависит от даты: каждый день − случайно 0–1,
 * ограничение снизу 1, сверху 5. Сохраняется в localStorage на день.
 * Исчезает после dismiss до следующей сессии.
 */
function monthRu(d: Date) {
  return [
    'январе',
    'феврале',
    'марте',
    'апреле',
    'мае',
    'июне',
    'июле',
    'августе',
    'сентябре',
    'октябре',
    'ноябре',
    'декабре',
  ][d.getMonth()];
}

function computeSlots(): number {
  const key = 'slotsLeft:date';
  const countKey = 'slotsLeft:count';
  try {
    const today = new Date().toISOString().slice(0, 10);
    const last = localStorage.getItem(key);
    if (last === today) {
      const saved = Number(localStorage.getItem(countKey));
      if (saved >= 1 && saved <= 5) return saved;
    }
    // Новый день: 3–5 слотов в начале месяца, 1–3 в конце
    const day = new Date().getDate();
    let base = 5;
    if (day > 5) base = 4;
    if (day > 15) base = 3;
    if (day > 22) base = 2;
    if (day > 27) base = 1;
    const jitter = Math.random() < 0.5 ? 0 : -1;
    const v = Math.max(1, Math.min(5, base + jitter));
    localStorage.setItem(key, today);
    localStorage.setItem(countKey, String(v));
    return v;
  } catch {
    return 3;
  }
}

export function SlotsLeftBar() {
  const [slots, setSlots] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('slotsLeft:dismissed') === '1') {
      setDismissed(true);
      return;
    }
    setSlots(computeSlots());
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  if (dismissed || slots == null || !visible) return null;

  const m = monthRu(new Date());

  return (
    <div
      role="status"
      aria-live="polite"
      className="hidden md:flex fixed bottom-4 right-4 z-40 items-center gap-3 rounded-2xl bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-2)] text-white shadow-2xl px-4 py-3 animate-[fadeInUp_.4s_ease-out]"
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
    >
      <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-white/15 shrink-0">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M11 17l-5-5 1.4-1.4L11 14.2 16.6 8.6 18 10l-7 7z" />
        </svg>
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] uppercase tracking-wider font-bold text-white/80">
          Загрузка команды
        </span>
        <span className="text-sm font-semibold">
          Осталось <b>{slots}</b>{' '}
          {slots === 1 ? 'слот' : slots < 5 ? 'слота' : 'слотов'} в {m}
        </span>
      </div>
      <a
        href="#quiz"
        data-goal="slots-bar-quiz"
        className="ml-2 inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] text-[#052e1e] font-bold text-sm px-3 py-2 hover:bg-[#6ee7b7] transition"
      >
        Занять →
      </a>
      <button
        type="button"
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem('slotsLeft:dismissed', '1');
          } catch {
            // no-op
          }
        }}
        aria-label="Скрыть"
        className="w-6 h-6 inline-flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10"
      >
        ×
      </button>
    </div>
  );
}
