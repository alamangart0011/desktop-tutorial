'use client';

import { useEffect, useState } from 'react';

const DISMISS_KEY = 'oe-urgency-dismissed-v1';

export function UrgencyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) !== '1') setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* noop */
    }
  }

  if (!visible) return null;

  return (
    <div
      className="bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#7f1d1d] text-white text-[13px]"
      role="status"
      aria-live="polite"
    >
      <div className="container-x py-2.5 flex items-center gap-3">
        <span
          aria-hidden
          className="inline-flex w-2 h-2 rounded-full bg-white animate-pulse shrink-0"
        />
        <p className="flex-1 leading-snug">
          <strong className="font-extrabold">ГИС работает с 01.12.2025.</strong>{' '}
          <span className="opacity-90">
            Штрафы за утечку ПДн по ч. 13–15 ст. 13.11 КоАП — до 15&nbsp;млн&nbsp;₽ уже применяются (ред. ФЗ № 420 от 30.11.2024).
          </span>{' '}
          <a
            href="#risk"
            className="underline font-semibold whitespace-nowrap hover:text-white/90"
          >
            Калькулятор штрафа →
          </a>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Закрыть уведомление"
          className="shrink-0 text-white/70 hover:text-white rounded-lg p-1"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
