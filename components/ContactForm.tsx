'use client';

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
    if (!f.consent) {
      setErr('Нужно согласие на обработку персональных данных (152-ФЗ).');
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
    <section id="contact" className="bg-[var(--color-ink)] text-white py-16 md:py-24">
      <div className="container-x grid lg:grid-cols-[1.2fr,1fr] gap-10">
        <div>
          <span className="inline-block rounded-full bg-white/10 text-white text-xs font-semibold px-3 py-1 border border-white/15">
            Свяжитесь с нами
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Получите расчёт и дорожную карту подключения
          </h2>
          <p className="mt-3 text-white/75 leading-relaxed max-w-xl">
            Оставьте контакты — инженер {BRAND.shortName} свяжется в течение рабочего дня,
            подберёт пакет под ваш класс ИСПДн и число АРМ и пришлёт ориентир по срокам и бюджету.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="flex items-center gap-3 group"
            >
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-white/10 border border-white/15 group-hover:bg-white group-hover:text-[var(--color-brand)] transition">
                ☎
              </span>
              <div>
                <div className="text-white/60 text-xs">Телефон</div>
                <div className="font-semibold">{BRAND.phone}</div>
              </div>
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="flex items-center gap-3 group"
            >
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-white/10 border border-white/15 group-hover:bg-white group-hover:text-[var(--color-brand)] transition">
                @
              </span>
              <div>
                <div className="text-white/60 text-xs">E-mail</div>
                <div className="font-semibold">{BRAND.email}</div>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                ◉
              </span>
              <div>
                <div className="text-white/60 text-xs">Адрес</div>
                <div className="font-semibold">{BRAND.address}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                ⏱
              </span>
              <div>
                <div className="text-white/60 text-xs">Время работы</div>
                <div className="font-semibold">{BRAND.workingHours}</div>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl bg-white text-[var(--color-ink)] p-6 md:p-8 shadow-2xl"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Организация *" v={f.org} onChange={(v) => set('org', v)} />
            <Field label="ФИО *" v={f.name} onChange={(v) => set('name', v)} />
            <Field label="Должность" v={f.role} onChange={(v) => set('role', v)} />
            <Field label="Регион" v={f.region} onChange={(v) => set('region', v)} />
            <Field label="Телефон *" v={f.phone} onChange={(v) => set('phone', v)} type="tel" />
            <Field label="E-mail *" v={f.email} onChange={(v) => set('email', v)} type="email" />
          </div>
          <label className="block mt-3 text-xs font-semibold text-[var(--color-ink-2)]">
            Сообщение
          </label>
          <textarea
            value={f.message}
            onChange={(e) => set('message', e.target.value)}
            rows={3}
            placeholder="Сколько АРМ, есть ли СЗИ, какие сроки"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand)]"
          />
          <label className="mt-4 flex items-start gap-2.5 text-xs text-[var(--color-ink-2)] cursor-pointer">
            <input
              type="checkbox"
              checked={f.consent}
              onChange={(e) => set('consent', e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[var(--color-brand)]"
            />
            <span>
              Согласен на обработку персональных данных в соответствии с 152-ФЗ для обратной связи.
            </span>
          </label>

          {err && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2">
              {err}
            </div>
          )}
          {sent && !err && (
            <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2">
              Открыли ваш почтовый клиент с готовым письмом. Если не открылось — напишите напрямую на{' '}
              <a href={`mailto:${BRAND.email}`} className="font-semibold underline">
                {BRAND.email}
              </a>
              .
            </div>
          )}

          <button
            type="submit"
            className="mt-5 w-full inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-5 py-3.5 hover:bg-[var(--color-brand-2)] transition"
          >
            Отправить заявку
          </button>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 text-[var(--color-ink)] font-semibold px-4 py-3 text-sm hover:border-[var(--color-brand)] transition"
            >
              Позвонить
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 text-[var(--color-ink)] font-semibold px-4 py-3 text-sm hover:border-[var(--color-brand)] transition"
            >
              Написать e-mail
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
}: {
  label: string;
  v: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[var(--color-ink-2)]">{label}</span>
      <input
        type={type}
        value={v}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand)]"
      />
    </label>
  );
}
