'use client';

import { useEffect, useState } from 'react';
import { BRAND } from './constants';
import { PhoneIcon, MessageSquareIcon, XIcon, CheckCircleIcon, ArrowRightIcon } from './Icons';

const KEY = 'oe-cb-widget-v1';

export function CallbackWidget() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(KEY) === 'dismissed') return;

    let shownLocally = false;

    const show = () => {
      if (shownLocally) return;
      shownLocally = true;
      setShown(true);
    };

    const scrollThreshold = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const total = doc.scrollHeight;
      if (total > 0 && scrolled / total >= 0.5) show();
    };

    const timer = window.setTimeout(show, 30000);
    window.addEventListener('scroll', scrollThreshold, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', scrollThreshold);
    };
  }, []);

  function dismissForever() {
    sessionStorage.setItem(KEY, 'dismissed');
    setShown(false);
    setOpen(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 11 || !name.trim()) return;
    // Web3Forms при наличии ключа отдельно, здесь — короткий mailto fallback, сработает и при отключённом JS-API
    const body = `Имя: ${name}\nТелефон: ${phone}\nИсточник: виджет обратного звонка`;
    const url = `mailto:${BRAND.email}?subject=${encodeURIComponent('Обратный звонок — ' + name)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
    setSent(true);
    setTimeout(() => dismissForever(), 4000);
  }

  function maskPhone(raw: string): string {
    const digits = raw.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11);
    if (!digits) return '';
    const d = digits.startsWith('7') ? digits : '7' + digits;
    const p: string[] = ['+7'];
    if (d.length > 1) p.push(' (' + d.slice(1, 4));
    if (d.length >= 4) p[1] += ')';
    if (d.length >= 5) p.push(' ' + d.slice(4, 7));
    if (d.length >= 8) p.push('-' + d.slice(7, 9));
    if (d.length >= 10) p.push('-' + d.slice(9, 11));
    return p.join('');
  }

  if (!shown) return null;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-goal="callback-open"
          aria-label="Получить бесплатную консультацию"
          className="hidden md:inline-flex fixed bottom-6 right-6 z-[45] items-center gap-2.5 rounded-full bg-[var(--color-brand)] text-white font-bold pl-4 pr-5 py-3.5 shadow-2xl hover:bg-[var(--color-brand-2)] hover:scale-105 transition animate-[cb-bounce_2s_ease-in-out_infinite]"
        >
          <span className="relative inline-flex w-10 h-10 items-center justify-center rounded-full bg-white text-[var(--color-brand)]">
            <MessageSquareIcon className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--color-accent)] ring-2 ring-[var(--color-brand)]" />
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[11px] font-semibold opacity-90">Бесплатно · 15 минут</span>
            <span>Получить консультацию</span>
          </span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cb-title"
          className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-[60] md:w-[380px] flex items-end md:items-start justify-center md:justify-end px-3 pb-3 md:pb-0"
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setOpen(false)}
            className="md:hidden absolute inset-0 bg-[#071332]/70 backdrop-blur-sm cursor-default"
          />
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-[cb-pop_240ms_cubic-bezier(0.22,1,0.36,1)]">
            <button
              type="button"
              onClick={dismissForever}
              aria-label="Закрыть виджет"
              className="absolute top-3 right-3 z-10 w-8 h-8 inline-flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition"
            >
              <XIcon className="w-4 h-4 text-[var(--color-ink)]" />
            </button>

            {!sent && (
              <>
                <div className="px-6 pt-6 pb-4 bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    Бесплатно · без обязательств
                  </div>
                  <h3 id="cb-title" className="mt-2 text-xl font-extrabold tracking-tight leading-tight">
                    Перезвоним за 15 минут
                  </h3>
                  <p className="mt-1.5 text-sm text-white/90 leading-snug">
                    Оцените риски по вашей организации и получите
                    первые шаги бесплатно.
                  </p>
                </div>

                <form onSubmit={submit} className="p-5 space-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-ink-2)]">Имя</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                      className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-ink-2)]">Телефон</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(maskPhone(e.target.value))}
                      placeholder="+7 (___) ___-__-__"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    />
                  </label>

                  <button
                    type="submit"
                    data-goal="callback-submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-2)] text-white font-bold px-5 py-3.5 text-sm hover:shadow-xl transition min-h-[48px]"
                  >
                    Жду звонка
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-[11px] text-slate-500 uppercase font-semibold">или</span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  <a
                    href={`tel:${BRAND.phoneRaw}`}
                    data-goal="callback-phone"
                    onClick={() => setOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-slate-200 text-[var(--color-ink)] font-semibold px-4 py-3 text-sm hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    Позвонить сейчас — {BRAND.phone}
                  </a>

                  <p className="text-[10px] text-slate-500 text-center leading-snug">
                    Отправляя форму, вы соглашаетесь с обработкой ПДн
                    по 152-ФЗ для обратной связи
                  </p>
                </form>
              </>
            )}

            {sent && (
              <div className="p-8 text-center">
                <div className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <CheckCircleIcon className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <div className="mt-3 font-extrabold text-[var(--color-ink)] text-lg">
                  Спасибо! Перезвоним за 15 минут
                </div>
                <div className="mt-1 text-sm text-[var(--color-ink-2)] leading-snug">
                  Если кнопка не открыла почтовый клиент, свяжитесь напрямую:{' '}
                  <a href={`tel:${BRAND.phoneRaw}`} className="font-semibold text-[var(--color-brand)]">
                    {BRAND.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
