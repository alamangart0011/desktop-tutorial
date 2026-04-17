'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface Props {
  text: string;
  label?: string;
  className?: string;
  children: ReactNode;
}

export function CopyOnClick({ text, label = 'Скопировать', className = '', children }: Props) {
  const [copied, setCopied] = useState(false);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (tRef.current) clearTimeout(tRef.current); }, []);

  const copy = async (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      return;
    }
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (tRef.current) clearTimeout(tRef.current);
      tRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <span className={`relative inline-flex items-center gap-1.5 ${className}`}>
      {children}
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        title={copied ? 'Скопировано!' : label}
        className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/10 border border-white/20 text-xs hover:bg-white/20 transition cursor-pointer"
      >
        {copied ? '✓' : '⧉'}
      </button>
      {copied && (
        <span
          role="status"
          aria-live="polite"
          className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap rounded-md bg-[var(--color-ink)] text-white text-[11px] font-semibold px-2 py-1 shadow-lg animate-[copy-toast_1.6s_ease-out]"
        >
          Скопировано
        </span>
      )}
    </span>
  );
}
