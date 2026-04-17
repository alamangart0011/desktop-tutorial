'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { BRAND } from './constants';

const TOC = [
  '01 — Нормативная база и обязанные организации (ПП РФ № 411)',
  '02 — Класс ИСПДн и расчёт уровня защищённости (УЗ)',
  '03 — 8 документов ПДн: шаблоны и порядок согласования',
  '04 — Сертифицированные СЗИ под УЗ2 (Secret Net, «Соболь», NGate)',
  '05 — Отечественная ОС: Astra / Alt / РЕД — что выбрать',
  '06 — ЕСИА, СМЭВ и ЛК организации на Госуслугах',
  '07 — Аттестация ИСПДн: подготовка и проведение испытаний',
  '08 — Чек-лист: 50 контрольных пунктов перед сдачей',
];

export function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErr('Проверьте e-mail.');
      return;
    }
    if (!consent) {
      setErr('Нужно согласие на обработку ПДн.');
      return;
    }
    const body = [
      'Запрос чек-листа готовности к ГИС «Профилактика»',
      '',
      `E-mail для отправки: ${email}`,
      '',
      'Просим выслать PDF «Чек-лист готовности к подключению ГИС «Профилактика» под УЗ2».',
    ].join('\n');
    const url = `mailto:${BRAND.email}?subject=${encodeURIComponent(
      'Запрос чек-листа готовности к ГИС «Профилактика»',
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  }

  return (
    <section
      id="checklist"
      className="bg-white py-16 md:py-24 border-t border-slate-200"
    >
      <div className="container-x grid lg:grid-cols-[1.2fr,1fr] gap-10 items-start">
        <div>
          <span className="inline-block rounded-full bg-[var(--color-accent)]/15 text-emerald-700 text-xs font-semibold px-3 py-1">
            Бесплатно · PDF · 14 страниц
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Чек-лист готовности к подключению ГИС «Профилактика»
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed max-w-xl">
            Сжатый рабочий документ для ИБ-специалиста и юриста: проверьте состояние ИСПДн,
            наличие документов, лицензий и СЗИ под УЗ2 за 30 минут. Подходит для КДНиЗП,
            школ, опеки, соцзащиты, медучреждений и ОВД.
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm">
            {TOC.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2 rounded-xl border border-slate-200 bg-[var(--color-paper)] px-3 py-2.5 text-[var(--color-ink)] leading-snug"
              >
                <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-md bg-[var(--color-brand)] text-white text-[10px] font-black">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-6 md:p-7 shadow-sm"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Получить PDF
          </div>
          <h3 className="mt-2 text-xl font-extrabold text-[var(--color-ink)]">
            Куда выслать чек-лист?
          </h3>

          <label className="block mt-5 text-xs font-semibold text-[var(--color-ink-2)]">
            Рабочий e-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ivanov@kdn-spb.ru"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-brand)]"
            aria-label="E-mail для отправки чек-листа"
          />

          <label className="mt-4 flex items-start gap-2.5 text-xs text-[var(--color-ink-2)] cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[var(--color-brand)]"
            />
            <span>
              Согласен с{' '}
              <Link href="/privacy" className="underline text-[var(--color-brand)]">
                Политикой обработки ПДн
              </Link>{' '}
              и 152-ФЗ.
            </span>
          </label>

          {err && (
            <div className="mt-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2">
              {err}
            </div>
          )}
          {sent && !err && (
            <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2">
              Открыли ваш почтовый клиент. Если не открылся — напишите на{' '}
              <a href={`mailto:${BRAND.email}`} className="font-semibold underline">
                {BRAND.email}
              </a>
              .
            </div>
          )}

          <button
            type="submit"
            data-goal="checklist-request"
            className="mt-4 w-full inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-5 py-3.5 hover:bg-[var(--color-brand-2)] transition"
          >
            Получить чек-лист
          </button>

          <p className="mt-3 text-[11px] text-[var(--color-muted)]">
            Не рассылаем спам. Используем e-mail только для отправки PDF и одного follow-up письма
            с предложением аудита.
          </p>
        </form>
      </div>
    </section>
  );
}
