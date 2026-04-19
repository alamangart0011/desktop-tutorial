import type { ComponentType, SVGProps } from 'react';
import {
  ZapIcon,
  ShieldIcon,
  CpuIcon,
  RubleIcon,
  FileTextIcon,
  AlertOctagonIcon,
  ArrowRightIcon,
} from './Icons';

type Pain = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  t: string;
  d: string;
  solve: string;
};

const PAINS: Pain[] = [
  {
    Icon: ZapIcon,
    t: 'Подключение уже обязательно',
    d: 'ПП РФ № 411 сделал подключение обязательным с 01.12.2025. Без выполнения Технических условий доступ в систему не дадут.',
    solve: 'Берём подключение под ключ по ПП № 411',
  },
  {
    Icon: ShieldIcon,
    t: 'СЗИ дорого и сложно',
    d: 'СЗИ от НСД, СКЗИ (КриптоПро NGate), «Соболь», СОВ, антивирус, анализ защищённости — без них УЗ2 не выполнить.',
    solve: 'Готовый stack СЗИ от вендоров в реестре ФСТЭК',
  },
  {
    Icon: CpuIcon,
    t: 'Windows больше не подойдёт',
    d: 'Нужна отечественная ОС, сертифицированная ФСТЭК: Astra Linux, Alt Linux или РЕД ОС — и её надо правильно настроить.',
    solve: 'Подберём и настроим отечественную ОС под ваш парк',
  },
  {
    Icon: RubleIcon,
    t: 'Штрафы до 15 млн ₽',
    d: 'ФЗ № 420 от 30.11.2024 поднял штрафы по ст. 13.11 КоАП за утечку ПДн: 3–5 млн ₽ за 1 000–10 000 субъектов, 10–15 млн ₽ за 100 000+. Повторно — оборотный штраф до 3 % выручки.',
    solve: 'Закрываем все пункты 21 Приказа ФСТЭК — основания для штрафа исключаем',
  },
  {
    Icon: FileTextIcon,
    t: 'Восемь документов по ПДн',
    d: 'Уведомление РКН, Модель угроз, Акт классификации, ТЗ, ПМИ, Техпаспорт, Протокол, Заключение — комплект собирают неделями.',
    solve: 'Готовим весь комплект за вас — Заключение действует 3 года',
  },
  {
    Icon: AlertOctagonIcon,
    t: 'Ошибка = инцидент ИБ',
    d: 'Попытка подключения с нарушением ТУ фиксируется федеральным оператором как инцидент с расследованием.',
    solve: 'Ведём до приёмки — подключаем только в зелёной зоне',
  },
];

export function Problem() {
  return (
    <section id="problem" className="bg-[var(--color-paper)] py-16 md:py-20">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-red-100 text-red-700 text-xs font-semibold px-3 py-1">
            6 преград на пути к подключению
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
            Шесть причин, из-за которых ведомства не справляются сами —{' '}
            <span className="text-[var(--color-brand)]">мы снимаем каждую</span>
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] text-base md:text-lg leading-relaxed">
            Вместо «всё плохо, бегите» — ниже честный разбор проблем и наше
            готовое решение для каждой.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PAINS.map(({ Icon, t, d, solve }, i) => (
            <article
              key={t}
              className="card-soft p-6 relative overflow-hidden group flex flex-col"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div
                aria-hidden
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[var(--color-brand)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative flex-1">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-bold text-lg text-[var(--color-ink)] leading-snug">
                  {t}
                </div>
                <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">
                  {d}
                </p>
              </div>
              <div className="relative mt-4 pt-4 border-t border-slate-100 flex items-start gap-2 text-sm">
                <ArrowRightIcon className="w-4 h-4 mt-0.5 text-[var(--color-accent-dk)] shrink-0" />
                <span className="font-semibold text-[var(--color-ink)] leading-snug">
                  {solve}
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a
            href="#risk"
            data-goal="problem-risk"
            className="btn-secondary text-sm px-5 py-3 min-h-[48px] inline-flex items-center justify-center gap-2"
          >
            Оценить мой риск штрафа
            <ArrowRightIcon className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            data-goal="problem-contact"
            className="btn-primary text-sm px-5 py-3 min-h-[48px] inline-flex items-center justify-center gap-2"
          >
            Получить расчёт под нашу организацию
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
