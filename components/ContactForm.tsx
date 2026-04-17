'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { BRAND } from './constants';

type Fields = {
  org: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  region: string;
  message: string;
  consent: boolean;
};

const EMPTY: Fields = {
  org: '',
  name: '',
  role: '',
  phone: '',
  email: '',
  region: '',
  message: '',
  consent: false,
};

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

export function ContactForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function set<K extends keyof Fields>(k: K, v: Fields[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!f.org || !f.name || !f.phone || !f.email) {
      setErr('Заполните организацию, ФИО, телефон и e-mail.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) {
      setErr('Проверьте e-mail.');
      return;
    }
    if (f.phone.replace(/\D/g, '').length < 11) {
      setErr('Проверьте телефон — нужно 11 цифр.');
      return;
    }
    if (!f.consent) {
      setErr('Согласитесь с Политикой обработки ПДн (152-ФЗ), чтобы продолжить.');
      return;
    }
    const body = [
      'Заявка с лендинга ГИС «Профилактика»',
      '',
      `Организация: ${f.org}`,
      `ФИО: ${f.name}`,
      `Должность: ${f.role}`,
      `Телефон: ${f.phone}`,
      `E-mail: ${f.email}`,
      `Регион: ${f.region}`,
      '',
      'Сообщение:',
      f.message || '—',
    ].join('\n');
    const subject = `Заявка: подключение к ГИС «Профилактика» — ${f.org}`;
    const url = `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  }

  return (
    <section id="contact" className="bg-[var(--color-ink)] text-white py-16 md:py-24 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[var(--color-brand-2)]/20 blur-3xl floaty"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-[var(--color-accent)]/15 blur-3xl floaty"
        style={{ animationDelay: '1.5s' }}
      />
      <div className="container-x grid lg:grid-cols-[1.2fr,1fr] gap-10 relative">
        <div>
          <span className="inline-block rounded-full bg-white/10 text-white text-xs font-semibold px-3 py-1 border border-white/15">
            Свяжитесь с нами
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Получите расчёт и дорожную карту подключения
          </h2>
          <p className="mt-3 text-white/80 leading-relaxed max-w-xl">
            Оставьте контакты — инженер {BRAND.shortName} свяжется в течение рабочего дня,
            подберёт пакет под ваш класс ИСПДн и число АРМ и пришлёт ориентир по срокам и бюджету.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 max-w-md">
            <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-center">
              <div className="text-xl font-extrabold text-[var(--color-accent)]">9+</div>
              <div className="text-[11px] text-white/70 leading-tight">лет на рынке ИБ</div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-center">
              <div className="text-xl font-extrabold text-[var(--color-accent)]">44-ФЗ</div>
              <div className="text-[11px] text-white/70 leading-tight">работаем с госом</div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-center">
              <div className="text-xl font-extrabold text-[var(--color-accent)]">24/7</div>
              <div className="text-[11px] text-white/70 leading-tight">поддержка в договоре</div>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-sm">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              data-goal="phone-tap-contact"
              className="flex items-center gap-3 group min-h-[48px]"
            >
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-white/10 border border-white/15 group-hover:bg-white group-hover:text-[var(--color-brand)] transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5.3 3h3.4l2 5-2.5 1.5a12 12 0 005.3 5.3L15 12.3l5 2v3.4A2.3 2.3 0 0117.7 20 14.7 14.7 0 014 6.3 2.3 2.3 0 015.3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <div className="text-white/70 text-xs">Телефон</div>
                <div className="font-semibold text-base group-hover:text-[var(--color-accent)] transition-colors">{BRAND.phone}</div>
              </div>
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              data-goal="email-tap"
              className="flex items-center gap-3 group min-h-[48px]"
            >
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-white/10 border border-white/15 group-hover:bg-white group-hover:text-[var(--color-brand)] transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
              <div>
                <div className="text-white/70 text-xs">E-mail</div>
                <div className="font-semibold group-hover:text-[var(--color-accent)] transition-colors">{BRAND.email}</div>
              </div>
            </a>
            <div className="flex items-start gap-3 min-h-[48px]">
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-white/10 border border-white/15 shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
              <div>
                <div className="text-white/70 text-xs">Адрес офиса</div>
                <div className="font-semibold leading-snug">
                  {BRAND.fullAddress}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 min-h-[48px]">
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <div className="text-white/70 text-xs">Время работы</div>
                <div className="font-semibold">{BRAND.workingHours}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(BRAND.fullAddress)}&z=16&l=map`}
              width="100%"
              height="240"
              loading="lazy"
              title={`Карта: ${BRAND.fullAddress}`}
              style={{ border: 0, display: 'block', filter: 'grayscale(0.2)' }}
              allowFullScreen
            />
          </div>
        </div>

        <form
          onSubmit={submit}
          aria-labelledby="contact-form-title"
          className="rounded-2xl bg-white text-[var(--color-ink)] p-6 md:p-8 shadow-2xl self-start"
        >
          <h3 id="contact-form-title" className="font-extrabold text-xl">
            Заявка на подключение
          </h3>
          <p className="mt-1 text-sm text-[var(--color-ink-2)]">
            Ответим в течение рабочего дня.
          </p>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <Field
              label="Организация *"
              v={f.org}
              onChange={(v) => set('org', v)}
              autoComplete="organization"
              valid={f.org.trim().length >= 2}
              required
            />
            <Field
              label="ФИО *"
              v={f.name}
              onChange={(v) => set('name', v)}
              autoComplete="name"
              valid={f.name.trim().split(/\s+/).length >= 2}
              required
            />
            <Field
              label="Должность"
              v={f.role}
              onChange={(v) => set('role', v)}
              autoComplete="organization-title"
            />
            <Field
              label="Регион"
              v={f.region}
              onChange={(v) => set('region', v)}
              autoComplete="address-level1"
            />
            <Field
              label="Телефон *"
              v={f.phone}
              onChange={(v) => set('phone', maskPhone(v))}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              valid={f.phone.replace(/\D/g, '').length === 11}
              required
            />
            <Field
              label="E-mail *"
              v={f.email}
              onChange={(v) => set('email', v)}
              type="email"
              autoComplete="email"
              inputMode="email"
              valid={/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)}
              required
            />
          </div>
          <label className="block mt-3 text-xs font-semibold text-[var(--color-ink-2)]">
            Сообщение
          </label>
          <textarea
            value={f.message}
            onChange={(e) => set('message', e.target.value)}
            rows={3}
            placeholder="Сколько АРМ, есть ли СЗИ, какие сроки"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand)] placeholder:text-slate-400"
          />
          <label className="mt-4 flex items-start gap-2.5 text-xs text-[var(--color-ink-2)] cursor-pointer">
            <input
              type="checkbox"
              checked={f.consent}
              onChange={(e) => set('consent', e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[var(--color-brand)]"
            />
            <span>
              Согласен на обработку персональных данных в соответствии с{' '}
              <Link href="/privacy" className="underline text-[var(--color-brand)]">
                Политикой
              </Link>{' '}
              и 152-ФЗ для обратной связи.
            </span>
          </label>

          {err && (
            <div
              role="alert"
              aria-live="polite"
              className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2"
            >
              {err}
            </div>
          )}
          {sent && !err && (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2"
            >
              Открыли ваш почтовый клиент с готовым письмом. Если не открылось — напишите напрямую на{' '}
              <a href={`mailto:${BRAND.email}`} className="font-semibold underline">
                {BRAND.email}
              </a>
              .
            </div>
          )}

          <button
            type="submit"
            data-goal="contact"
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-2)] text-white font-bold px-5 py-4 text-base hover:shadow-xl transition active:scale-[0.99] min-h-[52px]"
          >
            Отправить заявку
            <span aria-hidden>→</span>
          </button>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              data-goal="phone-tap-form"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-[var(--color-ink)] font-semibold px-4 py-3 text-sm hover:border-[var(--color-brand)] transition min-h-[48px]"
            >
              <span aria-hidden>📞</span> Позвонить
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              data-goal="email-tap-form"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-[var(--color-ink)] font-semibold px-4 py-3 text-sm hover:border-[var(--color-brand)] transition min-h-[48px]"
            >
              <span aria-hidden>✉</span> Написать e-mail
            </a>
          </div>
          <p className="mt-3 text-[11px] text-[var(--color-muted)]">
            Нажимая «Отправить», вы открываете почтовый клиент с заполненным письмом на {BRAND.email}.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  v,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  valid,
  required,
}: {
  label: string;
  v: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric' | 'decimal' | 'search' | 'url';
  valid?: boolean;
  required?: boolean;
}) {
  const hasValue = v.length > 0;
  const state = required
    ? hasValue
      ? valid
        ? 'ok'
        : 'bad'
      : 'idle'
    : hasValue
    ? 'ok'
    : 'idle';
  const borderClass =
    state === 'ok'
      ? 'border-emerald-400 focus:border-emerald-500'
      : state === 'bad'
      ? 'border-amber-400 focus:border-amber-500'
      : 'border-slate-200 focus:border-[var(--color-brand)]';
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[var(--color-ink-2)]">{label}</span>
      <div className="relative mt-1">
        <input
          type={type}
          value={v}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={`w-full rounded-xl border-2 bg-[var(--color-paper)] px-4 py-3 pr-10 text-sm focus:outline-none placeholder:text-slate-400 transition ${borderClass}`}
        />
        {state === 'ok' && (
          <span
            aria-hidden
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex w-6 h-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-black"
          >
            ✓
          </span>
        )}
        {state === 'bad' && (
          <span
            aria-hidden
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex w-6 h-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-black"
          >
            !
          </span>
        )}
      </div>
    </label>
  );
}
