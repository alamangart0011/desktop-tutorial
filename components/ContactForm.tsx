'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { BRAND, FORM } from './constants';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
} from './Icons';

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

type Status = 'idle' | 'sending' | 'sent' | 'mailto-fallback';

export function ContactForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [err, setErr] = useState<string | null>(null);

  function set<K extends keyof Fields>(k: K, v: Fields[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  function buildBody() {
    return [
      `Организация: ${f.org}`,
      `ФИО: ${f.name}`,
      `Должность: ${f.role || '—'}`,
      `Телефон: ${f.phone}`,
      `E-mail: ${f.email}`,
      `Регион: ${f.region || '—'}`,
      '',
      'Сообщение:',
      f.message || '—',
    ].join('\n');
  }

  function openMailtoFallback() {
    const subject = `Заявка: подключение к ГИС «Профилактика» — ${f.org}`;
    const url = `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody())}`;
    window.location.href = url;
    setStatus('mailto-fallback');
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!f.org || !f.name || !f.phone || !f.email) {
      setErr('Заполните организацию, ФИО, телефон и e-mail.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) {
      setErr('Проверьте e-mail — формат name@example.ru.');
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

    // Если Web3Forms access_key настроен — отправляем через их API
    if (FORM.accessKey) {
      setStatus('sending');
      try {
        const res = await fetch(FORM.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: FORM.accessKey,
            subject: `Заявка: подключение к ГИС «Профилактика» — ${f.org}`,
            from_name: `${f.name} · ${f.org}`,
            organization: f.org,
            full_name: f.name,
            role: f.role,
            phone: f.phone,
            email: f.email,
            region: f.region,
            message: f.message,
            summary: buildBody(),
            redirect: false,
          }),
        });
        const data = await res.json().catch(() => ({ success: false }));
        if (res.ok && data?.success !== false) {
          setStatus('sent');
          if (typeof window !== 'undefined') {
            const w = window as unknown as { ym?: (id: string, e: string, goal: string) => void };
            w.ym?.(String((window as unknown as { __YM_ID?: string }).__YM_ID ?? ''), 'reachGoal', 'form-submit');
          }
          return;
        }
        throw new Error('Сервер вернул ошибку');
      } catch {
        // Сеть/сервис недоступны — graceful fallback на mailto
        openMailtoFallback();
        return;
      }
    }

    // Access key не задан — работаем через mailto
    openMailtoFallback();
  }

  return (
    <section
      id="contact"
      className="bg-[var(--color-ink)] text-white py-16 md:py-24 relative overflow-hidden"
    >
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
          <p className="mt-3 text-white/90 leading-relaxed max-w-xl">
            Оставьте контакты — инженер {BRAND.shortName} свяжется в течение рабочего дня,
            подберёт пакет под ваш класс ИСПДн и число АРМ и пришлёт ориентир по срокам и бюджету.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 max-w-md">
            <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-center">
              <div className="text-xl font-extrabold text-[var(--color-accent)]">9+</div>
              <div className="text-[11px] text-white/85 leading-tight">лет на рынке ИБ</div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-center">
              <div className="text-xl font-extrabold text-[var(--color-accent)]">44-ФЗ</div>
              <div className="text-[11px] text-white/85 leading-tight">работаем с госом</div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-center">
              <div className="text-xl font-extrabold text-[var(--color-accent)]">24/7</div>
              <div className="text-[11px] text-white/85 leading-tight">поддержка в договоре</div>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-sm">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              data-goal="phone-tap-contact"
              className="flex items-center gap-3 group min-h-[48px]"
            >
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-white/10 border border-white/15 group-hover:bg-white group-hover:text-[var(--color-brand)] transition">
                <PhoneIcon className="w-5 h-5" />
              </span>
              <div>
                <div className="text-white/85 text-xs">Телефон</div>
                <div className="font-semibold text-base group-hover:text-[var(--color-accent)] transition-colors">
                  {BRAND.phone}
                </div>
              </div>
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              data-goal="email-tap"
              className="flex items-center gap-3 group min-h-[48px]"
            >
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-white/10 border border-white/15 group-hover:bg-white group-hover:text-[var(--color-brand)] transition">
                <MailIcon className="w-5 h-5" />
              </span>
              <div>
                <div className="text-white/85 text-xs">E-mail</div>
                <div className="font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                  {BRAND.email}
                </div>
              </div>
            </a>
            <div className="flex items-start gap-3 min-h-[48px]">
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-white/10 border border-white/15 shrink-0">
                <MapPinIcon className="w-5 h-5" />
              </span>
              <div>
                <div className="text-white/85 text-xs">Адрес офиса</div>
                <div className="font-semibold leading-snug">{BRAND.fullAddress}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 min-h-[48px]">
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                <ClockIcon className="w-5 h-5" />
              </span>
              <div>
                <div className="text-white/85 text-xs">Время работы</div>
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
          {status === 'sent' && (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 p-5 text-center"
            >
              <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-emerald-500 text-white mb-2">
                <CheckCircleIcon className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div className="font-extrabold text-emerald-900 text-base">
                Заявка принята
              </div>
              <div className="mt-1 text-sm text-emerald-800 leading-snug">
                Инженер {BRAND.shortName} перезвонит в течение рабочего дня
                по номеру <span className="font-semibold">{f.phone}</span> и
                подготовит расчёт под вашу организацию.
              </div>
              <div className="mt-3 text-[11px] text-emerald-700">
                Проверьте e-mail — продублируем подтверждение на{' '}
                <span className="font-semibold">{f.email}</span>.
              </div>
            </div>
          )}
          {status === 'mailto-fallback' && (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-2"
            >
              Открыли ваш почтовый клиент с готовым письмом. Если не открылось — напишите напрямую на{' '}
              <a href={`mailto:${BRAND.email}`} className="font-semibold underline">
                {BRAND.email}
              </a>{' '}
              или позвоните{' '}
              <a href={`tel:${BRAND.phoneRaw}`} className="font-semibold underline">
                {BRAND.phone}
              </a>.
            </div>
          )}

          {status !== 'sent' && (
            <button
              type="submit"
              data-goal="form-submit"
              disabled={status === 'sending'}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-2)] text-white font-bold px-5 py-4 text-base hover:shadow-xl transition active:scale-[0.99] min-h-[52px] disabled:opacity-70 disabled:cursor-wait"
            >
              {status === 'sending' ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Отправляем…
                </>
              ) : (
                <>
                  Отправить заявку
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              data-goal="phone-tap-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 text-[var(--color-ink)] font-semibold px-4 py-3 text-sm hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition min-h-[48px]"
            >
              <PhoneIcon className="w-4 h-4" /> Позвонить
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              data-goal="email-tap-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 text-[var(--color-ink)] font-semibold px-4 py-3 text-sm hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition min-h-[48px]"
            >
              <MailIcon className="w-4 h-4" /> Написать e-mail
            </a>
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            {FORM.accessKey
              ? `Заявка уходит напрямую в ${BRAND.email}. Перезваниваем в рабочий день.`
              : `Сейчас форма открывает почтовый клиент с заполненным письмом на ${BRAND.email}.`}
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
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex w-6 h-6 items-center justify-center rounded-full bg-emerald-500 text-white"
          >
            <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />
          </span>
        )}
        {state === 'bad' && (
          <span
            aria-hidden
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex w-6 h-6 items-center justify-center rounded-full bg-amber-500 text-white"
          >
            <AlertTriangleIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
          </span>
        )}
      </div>
    </label>
  );
}
