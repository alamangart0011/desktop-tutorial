'use client';

import { useEffect, useState } from 'react';

/**
 * LiveViewers — неблокирующий индикатор «N человек смотрят сейчас».
 * Реалистичная модель: базовое число зависит от часа суток (пик в рабочее время МСК),
 * плюс небольшой шум. Число обновляется каждые 7–15 секунд, меняется на ±1–2.
 * Появляется через 5 секунд после загрузки — не мешает первому впечатлению.
 */
export function LiveViewers() {
  const [viewers, setViewers] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = sessionStorage.getItem('liveViewers:dismissed') === '1';
    if (dismissed) return;

    function baseline() {
      const h = new Date().getHours();
      // Пик 10–18 МСК, спад ночью.
      if (h >= 10 && h <= 18) return 11 + Math.floor(Math.random() * 6); // 11–16
      if (h >= 9 && h < 10) return 7 + Math.floor(Math.random() * 4); // 7–10
      if (h > 18 && h <= 22) return 5 + Math.floor(Math.random() * 4); // 5–8
      return 2 + Math.floor(Math.random() * 3); // 2–4
    }

    setViewers(baseline());
    const showT = setTimeout(() => setVisible(true), 5000);

    const t = setInterval(() => {
      setViewers((v) => {
        if (v == null) return baseline();
        const delta = Math.random() < 0.5 ? -1 : 1;
        const next = Math.max(2, v + delta);
        const b = baseline();
        // Мягко возвращаемся к baseline при сильном отклонении
        if (Math.abs(next - b) > 4) return b;
        return next;
      });
    }, 7000 + Math.random() * 8000);

    return () => {
      clearTimeout(showT);
      clearInterval(t);
    };
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem('liveViewers:dismissed', '1');
    } catch {
      // no-op
    }
  }

  if (!visible || viewers == null) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-2.5 rounded-full bg-white border border-slate-200 shadow-lg px-3.5 py-2 text-xs font-medium text-[var(--color-ink)] animate-[fadeInUp_.4s_ease-out]"
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
    >
      <span className="relative inline-flex w-2.5 h-2.5">
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
        <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-500" />
      </span>
      <span>
        Сейчас <b className="font-bold">{viewers}</b>{' '}
        {viewers === 1
          ? 'специалист смотрит'
          : viewers < 5
          ? 'специалиста смотрят'
          : 'специалистов смотрят'}{' '}
        сайт
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Скрыть"
        className="ml-1 w-5 h-5 -mr-1 inline-flex items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-slate-100"
      >
        ×
      </button>
    </div>
  );
}
