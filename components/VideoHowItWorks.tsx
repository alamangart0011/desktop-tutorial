'use client';

import { useState } from 'react';
import { BRAND } from './constants';
import { ArrowRightIcon, CheckIcon } from './Icons';

/**
 * VideoHowItWorks — секция «Как это работает за 90 секунд».
 * Placeholder с poster-изображением (генерим SVG-облачком), при клике
 * подгружает YouTube iframe. Если BRAND.videoId пустой — показываем
 * читаемый плейсхолдер со списком шагов (работает и без видео).
 */
const STEPS = [
  'Экспресс-аудит текущей ИТ-инфраструктуры (1–2 дня)',
  'Согласование дорожной карты и бюджета',
  'Подготовка 8 документов по 152-ФЗ',
  'Поставка и настройка СЗИ (Secret Net, Соболь, NGate)',
  'Миграция на Astra/Alt/РЕД + обучение операторов',
  'Приёмка ГИС «Профилактика» + Заключение на 3 года',
];

type Props = {
  videoId?: string; // YouTube / Rutube ID; если пусто — показываем шаги
};

export function VideoHowItWorks({ videoId = '' }: Props) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(videoId);

  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-white scroll-mt-20"
    >
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            90 секунд · без воды · без маркетинга
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
            Как мы подключаем к ГИС «Профилактика»
          </h2>
          <p className="mt-3 text-[var(--color-ink-2)]">
            Посмотрите короткое объяснение — что делает ваша команда, что делаем мы,
            и как выглядит итоговое Заключение на 3 года.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.2fr,1fr] gap-8 items-start max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-2)] aspect-video">
            {hasVideo && playing ? (
              <iframe
                title="Как мы подключаем к ГИС Профилактика"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button
                type="button"
                onClick={() => hasVideo && setPlaying(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center group text-white"
                aria-label={hasVideo ? 'Включить видео' : 'Видео скоро будет'}
                data-goal="video-play"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 20%, rgba(255,255,255,.2), transparent 40%), radial-gradient(circle at 80% 80%, rgba(16,185,129,.25), transparent 45%)',
                  }}
                />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="inline-flex w-20 h-20 md:w-24 md:h-24 items-center justify-center rounded-full bg-white/95 text-[var(--color-brand)] shadow-2xl group-hover:scale-110 transition">
                    <svg
                      viewBox="0 0 24 24"
                      width="36"
                      height="36"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <div className="mt-5 text-base md:text-lg font-bold">
                    {hasVideo ? 'Смотреть 90-секундное объяснение' : 'Видео-демо скоро будет здесь'}
                  </div>
                  <div className="mt-1 text-xs md:text-sm text-white/80 max-w-sm text-center">
                    {hasVideo
                      ? 'Без звука автоплеем — просто нажмите и смотрите'
                      : 'Пока — читайте 6 шагов справа ↗ или закажите 15-минутный созвон'}
                  </div>
                </div>
              </button>
            )}
          </div>

          <div>
            <ol className="space-y-3">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[var(--color-paper)] p-4"
                >
                  <span className="shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-full bg-[var(--color-brand)] text-white font-bold text-sm">
                    {i + 1}
                  </span>
                  <span className="text-sm md:text-[15px] leading-relaxed text-[var(--color-ink)] font-medium">
                    {s}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-5 rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 p-4">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[#052e1e] shrink-0">
                  <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <div className="text-sm text-[var(--color-ink)]">
                  <b>Итог:</b> у вас на руках — аттестованная ИСПДн, 8 документов
                  и Заключение о соответствии, действующее 3 года.
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="#quiz"
                data-goal="video-quiz"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] text-white font-semibold px-5 py-3.5 hover:bg-[var(--color-brand-2)] transition"
              >
                Рассчитать стоимость
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a
                href={`tel:${BRAND.phoneRaw}`}
                data-goal="video-phone"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[var(--color-brand)] border-2 border-[var(--color-brand)] font-semibold px-5 py-3.5 hover:bg-[var(--color-brand)]/5 transition"
              >
                Созвон за 15 минут
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
