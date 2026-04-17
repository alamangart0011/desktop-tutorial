'use client';

import { useEffect, useState } from 'react';

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Наверх"
      title="Наверх"
      className="hidden md:inline-flex fixed bottom-6 right-6 z-40 w-12 h-12 items-center justify-center rounded-full bg-white/95 backdrop-blur border border-slate-200 shadow-xl text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white hover:border-[var(--color-brand)] transition"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
