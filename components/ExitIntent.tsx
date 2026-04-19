'use client';
import { useEffect, useState } from 'react';
import { BRAND } from './constants';
import { PhoneIcon } from './Icons';

const KEY = 'oe-exit-intent-v1';

export function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(KEY) === '1') return;
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    const mountedAt = Date.now();
    let hasScrolled = false;
    let shown = false;

    const show = () => {
      if (shown) return;
      if (Date.now() - mountedAt < 20000) return;
      if (!hasScrolled) return;
      shown = true;
      sessionStorage.setItem(KEY, '1');
      setOpen(true);
    };

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 2 && e.relatedTarget === null) show();
    };
    const onScroll = () => {
      hasScrolled = true;
    };

    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true, once: true });

    return () => {
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ei-title"
      className="fixed inset-0 z-[90] flex items-center justify-center px-4 animate-[ei-fade_220ms_ease-out]"
    >
      <button
        type="button"
        aria-label="Закрыть окно"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-[#071332]/75 backdrop-blur-sm cursor-default"
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-[ei-pop_300ms_cubic-bezier(0.22,1,0.36,1)]">
        <div className="px-6 pt-6 pb-2 bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] text-white">
          <div className="text-xs font-bold uppercase tracking-wider text-white/80">
            Подождите — последний момент
          </div>
          <h3 id="ei-title" className="mt-2 text-2xl font-extrabold tracking-tight leading-tight">
            Бесплатный аудит готовности — за 30 минут по телефону
          </h3>
          <p className="mt-2 text-sm text-white/90">
            Скажем, какого уровня СЗИ не хватает, какие из 8 документов уже
            потребуют переделки, и какой реалистичный срок под вашу структуру.
          </p>
        </div>
        <div className="p-6">
          <div className="grid gap-2">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              data-goal="exit-intent-call"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] text-white font-bold px-5 py-3.5 text-base hover:bg-[var(--color-brand-2)] transition min-h-[52px]"
            >
              <PhoneIcon className="w-5 h-5" />
              Позвонить — {BRAND.phone}
            </a>
            <a
              href="#contact"
              data-goal="exit-intent-form"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-paper)] border-2 border-[var(--color-line)] text-[var(--color-ink)] font-semibold px-5 py-3 text-sm hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition"
            >
              Оставить заявку в форме
            </a>
          </div>
          <p className="mt-4 text-[11px] text-[var(--color-muted)] text-center">
            Перезвоним в рабочее время · без обязательств · NDA подпишем заранее
          </p>
        </div>
      </div>
    </div>
  );
}
