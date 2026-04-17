'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type FontScale = 'normal' | 'lg' | 'xl';
type Theme = 'normal' | 'contrast-bw' | 'contrast-by' | 'contrast-wb';
type Spacing = 'normal' | 'wide';
type Images = 'on' | 'off';

type Prefs = {
  font: FontScale;
  theme: Theme;
  spacing: Spacing;
  images: Images;
  serif: boolean;
};

const DEFAULTS: Prefs = {
  font: 'normal',
  theme: 'normal',
  spacing: 'normal',
  images: 'on',
  serif: false,
};

const STORAGE_KEY = 'oe-a11y-v1';

function applyToDom(p: Prefs) {
  if (typeof document === 'undefined') return;
  const r = document.documentElement;
  r.setAttribute('data-a11y-font', p.font);
  r.setAttribute('data-a11y-theme', p.theme);
  r.setAttribute('data-a11y-spacing', p.spacing);
  r.setAttribute('data-a11y-images', p.images);
  r.setAttribute('data-a11y-serif', p.serif ? 'on' : 'off');
}

export function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Prefs>;
        const merged = { ...DEFAULTS, ...parsed };
        setPrefs(merged);
        applyToDom(merged);
      }
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyToDom(prefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* noop */
    }
  }, [prefs, mounted]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onClick(e: MouseEvent) {
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        toggleRef.current &&
        !toggleRef.current.contains(t)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const set = useCallback(<K extends keyof Prefs>(k: K, v: Prefs[K]) => {
    setPrefs((p) => ({ ...p, [k]: v }));
  }, []);

  const reset = useCallback(() => {
    setPrefs(DEFAULTS);
  }, []);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={
          open
            ? 'Закрыть версию для слабовидящих'
            : 'Открыть версию для слабовидящих'
        }
        data-goal="a11y-toggle"
        onClick={() => setOpen((v) => !v)}
        className="a11y-toggle"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="4.2" r="2.2" fill="currentColor" />
          <path
            d="M3.5 8.2c2.6.8 5.3 1.2 8.5 1.2s5.9-.4 8.5-1.2M12 9.4v4.8m0 0l-3.2 7.4M12 14.2l3.2 7.4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="a11y-toggle-label">Для&nbsp;слабовидящих</span>
      </button>

      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Настройки доступности"
          className="a11y-panel"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-extrabold text-sm text-[var(--color-ink)]">
              Версия для слабовидящих
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              aria-label="Закрыть"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <fieldset className="mb-4">
            <legend className="a11y-legend">Размер шрифта</legend>
            <div className="a11y-group">
              {([
                ['normal', 'А'],
                ['lg', 'А+'],
                ['xl', 'А++'],
              ] as const).map(([val, lbl]) => (
                <button
                  key={val}
                  type="button"
                  aria-pressed={prefs.font === val}
                  onClick={() => set('font', val)}
                  className={`a11y-chip ${prefs.font === val ? 'is-active' : ''}`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mb-4">
            <legend className="a11y-legend">Цветовая схема</legend>
            <div className="a11y-group">
              {([
                ['normal', 'Обычная'],
                ['contrast-bw', 'Ч/Б'],
                ['contrast-by', 'Жёлтый'],
                ['contrast-wb', 'Инверсия'],
              ] as const).map(([val, lbl]) => (
                <button
                  key={val}
                  type="button"
                  aria-pressed={prefs.theme === val}
                  onClick={() => set('theme', val)}
                  className={`a11y-chip ${prefs.theme === val ? 'is-active' : ''}`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mb-4">
            <legend className="a11y-legend">Межбуквенный интервал</legend>
            <div className="a11y-group">
              {([
                ['normal', 'Обычный'],
                ['wide', 'Увеличенный'],
              ] as const).map(([val, lbl]) => (
                <button
                  key={val}
                  type="button"
                  aria-pressed={prefs.spacing === val}
                  onClick={() => set('spacing', val)}
                  className={`a11y-chip ${prefs.spacing === val ? 'is-active' : ''}`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mb-4">
            <legend className="a11y-legend">Гарнитура</legend>
            <div className="a11y-group">
              <button
                type="button"
                aria-pressed={!prefs.serif}
                onClick={() => set('serif', false)}
                className={`a11y-chip ${!prefs.serif ? 'is-active' : ''}`}
              >
                Без засечек
              </button>
              <button
                type="button"
                aria-pressed={prefs.serif}
                onClick={() => set('serif', true)}
                className={`a11y-chip ${prefs.serif ? 'is-active' : ''}`}
              >
                С засечками
              </button>
            </div>
          </fieldset>

          <fieldset className="mb-5">
            <legend className="a11y-legend">Изображения</legend>
            <div className="a11y-group">
              <button
                type="button"
                aria-pressed={prefs.images === 'on'}
                onClick={() => set('images', 'on')}
                className={`a11y-chip ${prefs.images === 'on' ? 'is-active' : ''}`}
              >
                Включены
              </button>
              <button
                type="button"
                aria-pressed={prefs.images === 'off'}
                onClick={() => set('images', 'off')}
                className={`a11y-chip ${prefs.images === 'off' ? 'is-active' : ''}`}
              >
                Отключены
              </button>
            </div>
          </fieldset>

          <button
            type="button"
            onClick={reset}
            className="w-full rounded-xl bg-[var(--color-brand)] text-white font-semibold px-4 py-2.5 text-sm hover:bg-[var(--color-brand-2)] transition"
          >
            Сбросить настройки
          </button>
          <p className="mt-3 text-[11px] text-[var(--color-muted)] leading-snug">
            Настройки сохраняются в вашем браузере и применяются ко всему сайту.
            Соответствует рекомендациям ГОСТ&nbsp;Р&nbsp;52872-2019 и WCAG&nbsp;2.1&nbsp;AA.
          </p>
        </div>
      )}
    </>
  );
}
