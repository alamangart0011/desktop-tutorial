import type { ComponentType, SVGProps } from 'react';
import {
  LockIcon,
  ServerIcon,
  KeyIcon,
  ShieldIcon,
  CpuIcon,
  ScanIcon,
  EyeIcon,
  CheckIcon,
  ArrowRightIcon,
  AwardIcon,
} from './Icons';

type Szi = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  t: string;
  p: string;
  e: string;
};

const SZI: Szi[] = [
  {
    Icon: LockIcon,
    t: 'СЗИ от НСД',
    p: 'Защита от несанкционированного доступа',
    e: 'Secret Net Studio — модуль НСД',
  },
  {
    Icon: ServerIcon,
    t: 'Сертифицированная ОС',
    p: 'ОС 5-го класса ФСТЭК, функции защиты от НСД',
    e: 'Astra Linux · Alt Linux · РЕД ОС',
  },
  {
    Icon: KeyIcon,
    t: 'СКЗИ — криптозащита канала',
    p: 'Шифрование данных в канале до ГИС',
    e: 'КриптоПро CSP + NGate · Yandex Browser',
  },
  {
    Icon: ShieldIcon,
    t: 'Антивирусная защита',
    p: 'Обнаружение и нейтрализация вредоносного ПО',
    e: 'Модуль AV Secret Net Studio · Dr.Web · Kaspersky',
  },
  {
    Icon: CpuIcon,
    t: 'Средство доверенной загрузки (СДЗ)',
    p: 'Выполнение УПД.17 до старта ОС',
    e: 'ПАК «Соболь» v4 PCIe, сертификат ФСТЭК',
  },
  {
    Icon: ScanIcon,
    t: 'Средство анализа защищённости',
    p: 'Контроль защищённости ПДн (АНЗ)',
    e: 'Сканер-ВС · XSpider · RedCheck',
  },
  {
    Icon: EyeIcon,
    t: 'Система обнаружения вторжений (СОВ)',
    p: 'Детектирование нарушителя во время вторжения',
    e: 'Модуль СОВ Secret Net Studio',
  },
];

const DOCS = [
  'Уведомление в Роскомнадзор о начале обработки ПДн',
  'Акт обследования ИСПДн',
  'Модель угроз безопасности ПДн',
  'Акт классификации ИСПДн',
  'Техническое задание на создание СЗПДн',
  'Программа и методики испытаний ИСПДн (ПМИ)',
  'Технический паспорт ИСПДн',
  'Протокол оценки эффективности + Заключение (3 года)',
];

const OS = ['Astra Linux', 'Alt Linux', 'РЕД ОС'];

const FINES = [
  {
    who: 'Обработка ПДн без согласия',
    sum: 'до 700 000 ₽',
    note: 'ч. 2 ст. 13.11 КоАП — для юр. лиц',
  },
  {
    who: 'Утечка ПДн 1 000–10 000 субъектов',
    sum: '3 000 000 – 5 000 000 ₽',
    note: 'ч. 13 ст. 13.11 КоАП (ред. ФЗ № 420 от 30.11.2024)',
  },
  {
    who: 'Утечка ПДн свыше 100 000 субъектов',
    sum: '10 000 000 – 15 000 000 ₽',
    note: 'ч. 15 ст. 13.11 КоАП — повторно: оборотный штраф 1–3 % выручки',
  },
];

export function Uz2Requirements() {
  return (
    <section id="uz2" className="bg-[var(--color-paper)] py-16 md:py-24">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-semibold px-3 py-1">
            Требования ФСТЭК № 21 — УЗ2
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
            УЗ2 — второй уровень защищённости.{' '}
            <span className="text-[var(--color-brand)]">
              Без него в ГИС не пустят.
            </span>
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] text-base md:text-lg leading-relaxed">
            В системе обрабатываются персональные данные несовершеннолетних,
            поэтому минимум — УЗ2 по 21 Приказу ФСТЭК. Подбираем и
            устанавливаем все семь компонентов защиты.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SZI.map(({ Icon, t, p, e }) => (
            <div
              key={t}
              className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-0.5 hover:border-[var(--color-brand)]/40 transition"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--color-brand)] text-white flex items-center justify-center shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <div className="mt-4 font-bold text-[var(--color-ink)] leading-snug">
                {t}
              </div>
              <div className="mt-1 text-sm text-[var(--color-ink-2)] leading-relaxed">
                {p}
              </div>
              <div className="mt-3 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <span className="uppercase tracking-wider font-bold text-slate-500 text-[10px]">
                  Реализация
                </span>
                <div className="mt-1 text-[var(--color-ink-2)] font-medium">
                  {e}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
              <AwardIcon className="w-4 h-4" /> Отечественные ОС
            </div>
            <h3 className="mt-2 font-extrabold text-xl text-[var(--color-ink)]">
              Подходит любая из трёх — подберём под ваш парк
            </h3>
            <p className="mt-1 text-sm text-[var(--color-ink-2)]">
              Сертифицированы ФСТЭК, соответствуют УЗ2. Переводим пошагово,
              без простоя.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {OS.map((o) => (
                <div
                  key={o}
                  className="rounded-xl bg-[var(--color-paper)] border border-slate-200 p-4 text-center"
                >
                  <div className="font-extrabold text-[var(--color-brand)]">
                    {o}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1 font-medium">
                    Сертификат ФСТЭК
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
              <CheckIcon className="w-4 h-4" /> 8 документов ПДн
            </div>
            <h3 className="mt-2 font-extrabold text-xl text-[var(--color-ink)]">
              Комплект документов — собираем за вас
            </h3>
            <p className="mt-1 text-sm text-[var(--color-ink-2)]">
              Срок действия Заключения о соответствии — 3 года.
            </p>
            <ol className="mt-5 space-y-2.5 text-sm">
              {DOCS.map((d, i) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-bold items-center justify-center text-xs shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[var(--color-ink-2)] leading-snug">
                    {d}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-red-200 bg-red-50 p-6 md:p-8">
            <h3 className="font-extrabold text-xl text-red-800">
              Ответственность по ст. 13.11 КоАП РФ — до 15 млн ₽
            </h3>
            <p className="mt-1 text-sm text-red-900/90">
              ФЗ № 420-ФЗ от 30.11.2024 ввёл повышенные штрафы за утечку
              персональных данных. Для повторных нарушений — оборотные штрафы
              (1–3 % годовой выручки, минимум 20 млн ₽).
            </p>
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {FINES.map((s) => (
                <div
                  key={s.who}
                  className="rounded-xl bg-white border border-red-200 p-4"
                >
                  <div className="text-xs text-red-700 font-semibold uppercase tracking-wide leading-snug">
                    {s.who}
                  </div>
                  <div className="mt-2 font-extrabold text-[var(--color-ink)]">
                    {s.sum}
                  </div>
                  <div className="mt-1 text-[11px] text-red-900/70 leading-snug">
                    {s.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] text-white p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-wider text-white/85">
              С 01.03.2026
            </div>
            <h3 className="mt-2 font-extrabold text-xl">Приказ ФСТЭК № 117</h3>
            <p className="mt-2 text-sm text-white/90 leading-relaxed">
              Новые требования к защите информации в ГИС и КИИ. Закладываем их
              сразу — не придётся переделывать через 3 месяца после запуска.
            </p>
            <a
              href="#contact"
              data-goal="uz2-fstek117"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[var(--color-brand)] text-sm font-semibold px-4 py-2.5 hover:bg-white/90 transition"
            >
              Учесть ФСТЭК № 117 в проекте
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
