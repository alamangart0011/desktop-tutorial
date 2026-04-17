'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-brand-2)] to-[var(--color-accent)] transition-[width] duration-150 ease-out"
        style={{ width: p + '%' }}
      />
    </div>
  );
}
