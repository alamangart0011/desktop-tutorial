'use client';

import { useEffect, useState } from 'react';

type Lead = { org: string; city: string; when: string };

const POOL: Lead[] = [
  { org: 'Школа № 237', city: 'Санкт-Петербург', when: '12 минут назад' },
  { org: 'КДН и ЗП Петроградского района', city: 'Санкт-Петербург', when: '47 минут назад' },
  { org: 'Отдел опеки', city: 'Всеволожск', when: '1 час назад' },
  { org: 'СОШ № 12', city: 'Мурманск', when: '2 часа назад' },
  { org: 'Департамент образования', city: 'Архангельск', when: '3 часа назад' },
  { org: 'Комитет по социальной политике', city: 'Великий Новгород', when: '4 часа назад' },
  { org: 'Гимназия № 1', city: 'Петрозаводск', when: '5 часов назад' },
  { org: 'Центр помощи семье', city: 'Псков', when: '6 часов назад' },
  { org: 'Колледж им. Туполева', city: 'Калининград', when: '7 часов назад' },
  { org: 'Центр «Семья»', city: 'Вологда', when: 'вчера' },
  { org: 'КДН и ЗП', city: 'Выборг', when: 'вчера' },
  { org: 'Лицей № 344', city: 'Санкт-Петербург', when: 'вчера' },
];

function pickIndex(prev: number, len: number) {
  let i = Math.floor(Math.random() * len);
  if (len > 1 && i === prev) i = (i + 1) % len;
  return i;
}

/**
 * RecentLeads — неблокирующий тикер «Недавно запросили расчёт».
 * Показывает одну карточку слева внизу на десктопе, ротирует каждые
 * 8–12 секунд. Появляется через 15 секунд после загрузки — после того,
 * как пользователь уже увидел Hero и квиз. Dismissable per session.
 *
 * Все записи обезличенные (только город + тип учреждения), без ФИО и
 * телефонов — это общедоступная информация о категориях клиентов.
 */
export function RecentLeads() {
  const [idx, setIdx] = useState<number>(-1);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('recentLeads:dismissed') === '1') {
      setDismissed(true);
      return;
    }
    const start = setTimeout(() => {
      setIdx(Math.floor(Math.random() * POOL.length));
      setVisible(true);
    }, 15000);
    const rot = setInterval(() => {
      setIdx((p) => pickIndex(p, POOL.length));
    }, 9000 + Math.random() * 4000);
    return () => {
      clearTimeout(start);
      clearInterval(rot);
    };
  }, []);

  if (dismissed || idx < 0 || !visible) return null;
  const l = POOL[idx];

  return (
    <div
      role="status"
      aria-live="polite"
      className="hidden md:flex fixed bottom-20 left-4 z-30 max-w-xs rounded-2xl bg-white border border-slate-200 shadow-xl p-3.5 gap-3 items-start animate-[fadeInUp_.4s_ease-out]"
    >
      <span className="mt-0.5 inline-flex w-8 h-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-bold text-[var(--color-muted)]">
          Недавно запросили расчёт
        </div>
        <div className="mt-0.5 text-sm font-semibold text-[var(--color-ink)] truncate">
          {l.org}
        </div>
        <div className="text-xs text-[var(--color-ink-2)]">
          {l.city} · {l.when}
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem('recentLeads:dismissed', '1');
          } catch {
            // no-op
          }
        }}
        aria-label="Скрыть"
        className="w-5 h-5 inline-flex items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-slate-100"
      >
        ×
      </button>
    </div>
  );
}
