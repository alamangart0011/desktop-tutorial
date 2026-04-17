import {
  AlertOctagonIcon,
  ScaleIcon,
  ShieldIcon,
  FileCheckIcon,
  ArrowRightIcon,
} from './Icons';

const TRIGGERS = [
  {
    Icon: AlertOctagonIcon,
    tag: 'Роскомнадзор',
    t: 'Пришёл запрос о ПДн несовершеннолетних',
    d: 'Требуют Уведомление об обработке, Акт классификации ИСПДн и Политику. Срок ответа — 10 рабочих дней, иначе — протокол по 13.11 КоАП.',
  },
  {
    Icon: ScaleIcon,
    tag: 'Прокуратура',
    t: 'Представление о нарушении 152-ФЗ',
    d: 'Нужно устранить нарушения, оформить модель угроз и меры защиты — и отчитаться в установленный срок. Игнор = штраф и персональная ответственность.',
  },
  {
    Icon: ShieldIcon,
    tag: 'Проверка ГИС',
    t: 'Минпросвещения требует подключиться к ГИС «Профилактика»',
    d: 'По ПП № 411 данные по линии КДНиЗП должны идти через ГИС. Без выполнения Технических условий — доступ не дадут, а межвед встанет.',
  },
  {
    Icon: FileCheckIcon,
    tag: 'Аттестация',
    t: 'Заключение об оценке мер защиты истекло (3 года)',
    d: 'Без действующего Заключения ФСТЭК/аттестата ИСПДн обработка ПДн несовершеннолетних незаконна. Переаттестация нужна срочно.',
  },
];

export function PainTrigger() {
  return (
    <section
      id="pain-trigger"
      aria-labelledby="pain-trigger-title"
      className="bg-gradient-to-b from-red-50 to-white py-14 md:py-20 border-b border-red-100"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Сталкивались с этим?
          </span>
          <h2
            id="pain-trigger-title"
            className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.1]"
          >
            Если у вас один из этих сценариев —{' '}
            <span className="text-red-600">мы решим его под ключ</span>
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
            Берём на себя всё: разберёмся с предписанием, подготовим документы,
            подключим к ГИС и доведём до действующего Заключения. Пока вы
            занимаетесь своей организацией.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {TRIGGERS.map(({ Icon, tag, t, d }) => (
            <article
              key={t}
              className="relative rounded-2xl border-2 border-red-200 bg-white p-5 md:p-6 flex gap-4 hover:border-red-500 hover:shadow-lg transition"
            >
              <div className="shrink-0">
                <span className="inline-flex w-12 h-12 rounded-xl bg-red-100 text-red-600 items-center justify-center">
                  <Icon className="w-6 h-6" />
                </span>
              </div>
              <div className="min-w-0">
                <span className="inline-block rounded-md bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5">
                  {tag}
                </span>
                <h3 className="mt-2 font-extrabold text-[var(--color-ink)] leading-snug">
                  {t}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--color-ink-2)] leading-relaxed">
                  {d}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-[var(--color-ink)] text-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-[var(--color-accent)]">
              Экстренный режим
            </div>
            <div className="mt-1 text-xl md:text-2xl font-extrabold leading-tight">
              Получили предписание? Позвоните — подскажем первые шаги бесплатно.
            </div>
            <div className="mt-1.5 text-sm text-white/80">
              Разберём срок ответа, риски, что можно сделать сегодня — 15 минут, без обязательств.
            </div>
          </div>
          <a
            href="#contact"
            data-goal="pain-trigger-cta"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] text-[#052e1e] font-extrabold px-6 py-4 text-base hover:bg-[#6ee7b7] transition min-h-[56px] whitespace-nowrap shrink-0"
          >
            Получить помощь срочно
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
