'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { BRAND } from './constants';
import { ArrowRightIcon, CheckIcon } from './Icons';

type Opt = { id: string; label: string; hint?: string };
type Step = { key: string; title: string; subtitle?: string; opts: Opt[] };

const STEPS: Step[] = [
  {
    key: 'org',
    title: 'Какая у вас организация?',
    subtitle: 'Нужно, чтобы подобрать класс ИСПДн и требуемый УЗ.',
    opts: [
      { id: 'school', label: 'Школа / СПО', hint: 'ПП № 411, 18 категорий' },
      { id: 'kdn', label: 'КДНиЗП' },
      { id: 'opeka', label: 'Опека и попечительство' },
      { id: 'socz', label: 'Соцзащита / служба занятости' },
      { id: 'med', label: 'Здравоохранение' },
      { id: 'other', label: 'Другое (МВД, СИЗО, УИИ, культура, спорт)' },
    ],
  },
  {
    key: 'arm',
    title: 'Сколько рабочих мест (АРМ) будет подключено?',
    opts: [
      { id: 's', label: 'До 10' },
      { id: 'm', label: '10–50' },
      { id: 'l', label: '50–200' },
      { id: 'xl', label: 'Свыше 200' },
    ],
  },
  {
    key: 'os',
    title: 'Какая ОС сейчас на рабочих местах?',
    opts: [
      { id: 'win', label: 'Windows (нужна миграция)' },
      { id: 'ru', label: 'Astra / Alt / РЕД (уже отечественная)' },
      { id: 'mix', label: 'Смешанно' },
      { id: 'nd', label: 'Пока не знаю' },
    ],
  },
  {
    key: 'szi',
    title: 'Уже есть СЗИ и документы по 152-ФЗ?',
    opts: [
      { id: 'full', label: 'Всё настроено, есть Заключение 3 года' },
      { id: 'part', label: 'Частично (есть документы, нет настроенных СЗИ — или наоборот)' },
      { id: 'none', label: 'Нет, начинаем с нуля' },
    ],
  },
  {
    key: 'deadline',
    title: 'Какой срок нужен?',
    opts: [
      { id: 'urgent', label: 'Экстренно — уже пришло предписание' },
      { id: '30', label: 'До 30 дней' },
      { id: '45', label: '1–2 месяца' },
      { id: '90', label: '2–4 месяца' },
    ],
  },
];

type Answers = Record<string, string>;

function estimate(a: Answers): {
  pkg: 'Старт' | 'Организация' | 'Регион' | 'Под ключ';
  days: string;
  priceFrom: string;
  rationale: string[];
} {
  const arm = a.arm ?? 'm';
  const szi = a.szi ?? 'none';
  const os = a.os ?? 'win';
  const dl = a.deadline ?? '45';

  const rationale: string[] = [];

  // Базовый пакет
  let pkg: 'Старт' | 'Организация' | 'Регион' | 'Под ключ' = 'Организация';
  let priceFrom = 450000;
  let days = '35–45 рабочих дней';

  if (arm === 's' && szi !== 'none') {
    pkg = 'Старт';
    priceFrom = 150000;
    days = '10–15 рабочих дней';
    rationale.push('до 10 АРМ — достаточно пакета «Старт» с дорожной картой');
  } else if (arm === 'xl' || a.org === 'kdn' || a.org === 'opeka') {
    pkg = 'Регион';
    priceFrom = 1500000;
    days = '45–60 рабочих дней';
    rationale.push('крупный масштаб (свыше 200 АРМ / типовой региональный проект)');
  }

  // СЗИ-поправка
  if (szi === 'none') {
    priceFrom = Math.round(priceFrom * 1.6);
    rationale.push('с нуля: нужны СЗИ/СКЗИ/Соболь/СОВ + 8 документов ПДн');
  } else if (szi === 'part') {
    priceFrom = Math.round(priceFrom * 1.25);
    rationale.push('частичная готовность — закроем пробелы');
  } else {
    rationale.push('ускоренная приёмка, у вас уже есть база');
  }

  // ОС-поправка
  if (os === 'win') {
    priceFrom = Math.round(priceFrom * 1.15);
    rationale.push('миграция с Windows на Astra/Alt/РЕД');
  }

  // Срок-поправка
  if (dl === 'urgent') {
    pkg = 'Под ключ';
    priceFrom = Math.round(priceFrom * 1.3);
    days = '15–25 рабочих дней (экстренный режим)';
    rationale.push('экстренный режим из-за предписания — выделенная команда');
  }

  const fmt = new Intl.NumberFormat('ru-RU').format(priceFrom);
  return { pkg, days, priceFrom: `от ${fmt} ₽`, rationale };
}

export function CostQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [phone, setPhone] = useState('');
  const [org, setOrg] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const totalSteps = STEPS.length + 1;
  const progress = Math.round(((step + 1) / totalSteps) * 100);
  const done = step >= STEPS.length;
  const est = useMemo(() => estimate(answers), [answers]);

  function pick(opt: Opt) {
    const next = { ...answers, [STEPS[step].key]: opt.id };
    setAnswers(next);
    setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length)), 120);
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErr('Телефон — минимум 10 цифр.');
      return;
    }
    const lines = [
      'Заявка из квиза «Расчёт стоимости» — лендинг ГИС «Профилактика»',
      '',
      `Организация: ${org || '—'}`,
      `Телефон: ${phone}`,
      '',
      '--- Ответы ---',
      ...STEPS.map((s) => {
        const a = answers[s.key];
        const opt = s.opts.find((o) => o.id === a);
        return `${s.title} → ${opt?.label ?? '—'}`;
      }),
      '',
      '--- Предварительный расчёт ---',
      `Рекомендуемый пакет: ${est.pkg}`,
      `Срок: ${est.days}`,
      `Ориентир бюджета: ${est.priceFrom}`,
      `Почему: ${est.rationale.join('; ')}`,
    ];
    const body = lines.join('\n');
    const url = `mailto:${BRAND.email}?subject=${encodeURIComponent(
      'Квиз — расчёт стоимости подключения к ГИС',
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  }

  return (
    <section
      id="quiz"
      className="py-16 md:py-20 bg-[var(--color-paper)] scroll-mt-20"
    >
      <div className="container-x max-w-5xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent-ink,#065f46)] border border-[var(--color-accent)]/30 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            5 шагов · 60 секунд · без e-mail на первом шаге
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
            Расчёт стоимости подключения к ГИС «Профилактика»
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] max-w-2xl mx-auto">
            Ответьте на 5 вопросов — мгновенно увидите ориентир по бюджету, сроку и рекомендуемый пакет.
            Потом пришлём детальное КП за 1 рабочий день.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          <div className="h-1.5 bg-slate-100">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-accent)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-6 md:p-10 min-h-[360px]">
            {!done && (
              <>
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-ink-2)]">
                  <span>
                    Шаг {step + 1} из {totalSteps}
                  </span>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      className="text-[var(--color-brand)] hover:underline"
                    >
                      ← Назад
                    </button>
                  )}
                </div>
                <h3 className="mt-3 text-xl md:text-2xl font-bold text-[var(--color-ink)]">
                  {STEPS[step].title}
                </h3>
                {STEPS[step].subtitle && (
                  <p className="mt-1 text-sm text-[var(--color-ink-2)]">
                    {STEPS[step].subtitle}
                  </p>
                )}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {STEPS[step].opts.map((o) => {
                    const active = answers[STEPS[step].key] === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => pick(o)}
                        className={`group text-left rounded-2xl border-2 px-5 py-4 transition ${
                          active
                            ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/5'
                            : 'border-slate-200 hover:border-[var(--color-brand)] hover:bg-[var(--color-brand)]/5'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full border-2 shrink-0 ${
                              active
                                ? 'border-[var(--color-brand)] bg-[var(--color-brand)] text-white'
                                : 'border-slate-300 text-transparent group-hover:border-[var(--color-brand)]'
                            }`}
                          >
                            <CheckIcon className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <div className="flex-1">
                            <div className="font-semibold text-[var(--color-ink)]">
                              {o.label}
                            </div>
                            {o.hint && (
                              <div className="mt-0.5 text-xs text-[var(--color-ink-2)]">
                                {o.hint}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {done && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-ink,#065f46)]">
                  Готово · предварительный расчёт
                </div>
                <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-[var(--color-ink)]">
                  Рекомендуемый пакет:{' '}
                  <span className="text-[var(--color-brand)]">{est.pkg}</span>
                </h3>
                <div className="mt-5 grid sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-[var(--color-paper)] border border-slate-200 p-4">
                    <div className="text-xs text-[var(--color-ink-2)] font-semibold uppercase tracking-wider">
                      Срок
                    </div>
                    <div className="mt-1 text-lg font-bold text-[var(--color-ink)]">
                      {est.days}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[var(--color-paper)] border border-slate-200 p-4">
                    <div className="text-xs text-[var(--color-ink-2)] font-semibold uppercase tracking-wider">
                      Ориентир
                    </div>
                    <div className="mt-1 text-lg font-bold text-[var(--color-ink)]">
                      {est.priceFrom}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[var(--color-paper)] border border-slate-200 p-4">
                    <div className="text-xs text-[var(--color-ink-2)] font-semibold uppercase tracking-wider">
                      Гарантия
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
                      Возврат 100% за 7 дней
                    </div>
                  </div>
                </div>

                <details className="mt-4 rounded-2xl bg-[var(--color-paper)] border border-slate-200 px-4 py-3">
                  <summary className="text-sm font-semibold text-[var(--color-ink)] cursor-pointer">
                    Как получился этот расчёт?
                  </summary>
                  <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-ink-2)] list-disc ml-5">
                    {est.rationale.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-[var(--color-muted)]">
                    Это ориентир. Точную цену фиксируем в договоре после экспресс-аудита (часто дешевле ориентира).
                  </p>
                </details>

                <form
                  onSubmit={submit}
                  className="mt-6 rounded-2xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] p-5 md:p-6 text-white"
                >
                  <div className="font-bold text-lg">
                    Получить детальное КП за 1 рабочий день
                  </div>
                  <div className="text-white/85 text-sm">
                    Инженер-ИБ свяжется с вами в рабочий день, уточнит детали и пришлёт
                    персональное коммерческое предложение.
                  </div>
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="Название организации"
                      className="rounded-xl bg-white text-[var(--color-ink)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      aria-label="Название организации"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="rounded-xl bg-white text-[var(--color-ink)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      aria-label="Телефон для связи"
                    />
                  </div>
                  {err && <div className="mt-2 text-xs text-red-100">{err}</div>}
                  {sent && !err && (
                    <div className="mt-2 text-xs text-emerald-100">
                      Готово — открыли почтовый клиент. Если не открылся, наберите{' '}
                      {BRAND.phone}.
                    </div>
                  )}
                  <button
                    type="submit"
                    data-goal="quiz-complete"
                    className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] text-[#052e1e] font-bold px-6 py-3.5 hover:bg-[#6ee7b7] transition"
                  >
                    Получить персональное КП
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                  <p className="mt-3 text-[11px] text-white/80">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <Link href="/privacy" className="underline">
                      Политикой обработки ПДн
                    </Link>{' '}
                    (152-ФЗ).
                  </p>
                </form>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(0);
                      setAnswers({});
                      setSent(false);
                    }}
                    className="text-sm text-[var(--color-brand)] hover:underline"
                  >
                    Пересчитать заново
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
