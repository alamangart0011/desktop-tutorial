'use client';

import { useMemo, useState } from 'react';

const QUESTIONS = [
  'Направлено ли уведомление в Роскомнадзор о начале обработки ПДн?',
  'Утверждены ли внутренние регламенты по обработке ПДн?',
  'Есть ли Модель угроз и Акт классификации ИСПДн?',
  'Используется ли отечественная сертифицированная ОС (Astra / Alt / РЕД)?',
  'Установлено ли сертифицированное СЗИ от НСД (Secret Net Studio или аналог)?',
  'Установлен ли ПАК «Соболь» или иной сертифицированный СДЗ?',
  'Развёрнут ли КриптоПро NGate Client для подключения к ГИС?',
  'Работает ли модуль СОВ / используется сертифицированный IDS?',
  'Проведён ли анализ защищённости (Сканер-ВС / XSpider / RedCheck) за год?',
  'Оформлено ли Заключение об оценке эффективности мер защиты ПДн (3 года)?',
];

export function ReadinessCheck() {
  const [answers, setAnswers] = useState<boolean[]>(() => Array(QUESTIONS.length).fill(false));
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => answers.filter(Boolean).length, [answers]);

  const verdict = useMemo(() => {
    if (score <= 3)
      return {
        title: 'Высокий риск',
        color: 'bg-red-100 text-red-700 border-red-200',
        text:
          'Инфраструктура и документы не готовы. Подключение к ГИС «Профилактика» под угрозой, а штрафы по 13.11 КоАП — до 5 млн ₽. Нужен аудит и внедрение под ключ.',
        cta: 'Заказать аудит под ключ',
      };
    if (score <= 7)
      return {
        title: 'Частичная готовность',
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        text:
          'Часть мер есть, но комплект СЗИ или документов неполный. Закроем пробелы, подготовим документы, проведём оценку эффективности.',
        cta: 'Получить дорожную карту',
      };
    return {
      title: 'Почти готовы',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      text:
        'Инфраструктура и документы на месте. Осталось аттестационное Заключение и настройка доступа через ЕСИА и ЛК Госуслуг.',
      cta: 'Подключить ведомство',
    };
  }, [score]);

  function toggle(i: number) {
    setAnswers((p) => p.map((v, idx) => (idx === i ? !v : v)));
  }

  function submit() {
    setSubmitted(true);
    if (typeof window !== 'undefined') {
      window.location.hash = '#check-result';
    }
  }

  return (
    <section id="check" className="bg-white py-16 md:py-24 border-y border-slate-200">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-accent)]/15 text-emerald-700 text-xs font-semibold px-3 py-1">
            Экспресс-диагностика · 2 минуты
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Чек-лист готовности к подключению
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Отметьте только то, что уже сделано и подтверждено документами. По итогу — оценка риска
            и рекомендованный пакет работ.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-6">
          <div className="rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-6 md:p-8">
            <ul className="space-y-3">
              {QUESTIONS.map((q, i) => {
                const checked = answers[i];
                return (
                  <li key={q}>
                    <label
                      className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${
                        checked
                          ? 'bg-white border-[var(--color-brand-2)] shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 accent-[var(--color-brand)]"
                        checked={checked}
                        onChange={() => toggle(i)}
                      />
                      <span className="text-sm text-[var(--color-ink)] leading-relaxed">{q}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="text-sm text-[var(--color-muted)]">
                Отмечено <span className="font-bold text-[var(--color-ink)]">{score}</span> из{' '}
                {QUESTIONS.length}
              </div>
              <button
                onClick={submit}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-5 py-3 hover:bg-[var(--color-brand-2)] transition"
              >
                Узнать результат
              </button>
            </div>
          </div>

          <div id="check-result" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Результат
            </div>
            <div
              className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${verdict.color}`}
            >
              {submitted ? verdict.title : 'Ожидаем ваши ответы'}
            </div>
            <div className="mt-4 text-5xl font-extrabold text-[var(--color-brand)]">
              {score}/{QUESTIONS.length}
            </div>
            <p className="mt-3 text-sm text-[var(--color-ink-2)] leading-relaxed min-h-[4.5rem]">
              {submitted
                ? verdict.text
                : 'Заполните чек-лист слева и нажмите «Узнать результат». Дадим персональную оценку риска и порекомендуем пакет.'}
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[var(--color-ink)] text-white font-semibold px-5 py-3 hover:bg-[var(--color-brand)] transition"
            >
              {submitted ? verdict.cta : 'Оставить заявку на аудит'}
            </a>
            <p className="mt-3 text-[11px] text-[var(--color-muted)]">
              Отвечаем в течение рабочего дня, подбираем пакет под ваш класс ИСПДн и число АРМ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
