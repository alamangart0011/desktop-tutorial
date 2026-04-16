'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'oe-cookie-consent';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted:' + Date.now());
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Согласие на cookie"
      className="fixed bottom-3 left-3 right-3 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 md:p-5"
    >
      <div className="text-sm text-[var(--color-ink)] leading-relaxed">
        Мы используем cookie и Яндекс.Метрику для удобства сайта и анализа посещаемости.
        Подробнее — в{' '}
        <Link href="/privacy" className="text-[var(--color-brand)] underline">
          Политике обработки ПДн
        </Link>
        .
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={accept}
          className="flex-1 inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white text-sm font-semibold px-4 py-2.5 hover:bg-[var(--color-brand-2)] transition"
        >
          Принимаю
        </button>
        <Link
          href="/privacy"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 text-[var(--color-ink)] text-sm font-semibold px-4 py-2.5 hover:border-[var(--color-brand)] transition"
        >
          Узнать больше
        </Link>
      </div>
    </div>
  );
}
