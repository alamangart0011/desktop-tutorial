'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { BRAND } from './constants';

export function QuickLead() {
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErr('Укажите телефон, минимум 10 цифр.');
      return;
    }
    const body = `Быстрая заявка с лендинга ГИС «Профилактика»\n\nТелефон: ${phone}`;
    const url = `mailto:${BRAND.email}?subject=${encodeURIComponent(
      'Быстрая заявка — обратный звонок',
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  }

  return (
    <section
      id="callback"
      className="bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-2)] text-white py-14 md:py-16"
    >
      <div className="container-x grid md:grid-cols-[1.3fr,1fr] gap-8 items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-white/80">
            Обратный звонок за 15 минут
          </div>
          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight">
            Оставьте телефон — инженер-ИБ перезвонит и обсудит ваш случай
          </h2>
          <p className="mt-2 text-white/85 text-sm md:text-base max-w-xl">
            Расскажем, подпадает ли ваша организация под ПП РФ № 411, какой класс ИСПДн и УЗ вам
            нужен, что из СЗИ уже есть, а что докупать, и сколько это займёт по срокам.
          </p>
        </div>
        <form
          onSubmit={submit}
          className="rounded-2xl bg-white text-[var(--color-ink)] p-5 md:p-6 shadow-2xl"
        >
          <label className="block text-xs font-semibold text-[var(--color-ink-2)]">
            Телефон для связи
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-[var(--color-paper)] px-4 py-3.5 text-base focus:outline-none focus:border-[var(--color-brand)]"
            aria-label="Телефон для обратного звонка"
          />
          {err && (
            <div className="mt-2 text-xs text-red-700">{err}</div>
          )}
          {sent && !err && (
            <div className="mt-2 text-xs text-emerald-700">
              Готово! Открыли почтовый клиент. Если не открылся — наберите {BRAND.phone}.
            </div>
          )}
          <button
            type="submit"
            data-goal="callback"
            className="mt-3 w-full inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-5 py-3.5 hover:bg-[var(--color-brand-2)] transition"
          >
            Перезвоните мне
          </button>
          <p className="mt-2 text-[11px] text-[var(--color-muted)]">
            Нажимая «Перезвоните мне», вы соглашаетесь с{' '}
            <Link href="/privacy" className="underline text-[var(--color-brand)]">
              Политикой обработки ПДн
            </Link>{' '}
            в соответствии с 152-ФЗ.
          </p>
        </form>
      </div>
    </section>
  );
}
