'use client';

import { useEffect, useState } from 'react';
import { BRAND } from './constants';

export function MobileFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <a
      href={`tel:${BRAND.phoneRaw}`}
      data-goal="phone-fab"
      aria-label={`Позвонить в ${BRAND.shortName}: ${BRAND.phone}`}
      className="fab-call"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5.3 3h3.4l2 5-2.5 1.5a12 12 0 005.3 5.3L15 12.3l5 2v3.4A2.3 2.3 0 0117.7 20 14.7 14.7 0 014 6.3 2.3 2.3 0 015.3 3z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </svg>
      <span className="sr-only">Позвонить</span>
    </a>
  );
}
