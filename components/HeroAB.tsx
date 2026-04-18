'use client';

import { useEffect } from 'react';

/**
 * HeroAB — клиентская подмена H1 для A/B теста.
 * Принцип:
 *   - При первом визите случайно (50/50) выбирает вариант A или B.
 *   - Сохраняет выбор в cookie heroAb=A|B на 30 дней (один пользователь
 *     всегда видит один вариант).
 *   - Подменяет текст в #hero-h1-main / #hero-h1-accent на содержимое
 *     варианта B (вариант A — дефолтный, ничего не меняем).
 *   - Шлёт цель в Метрику: ym(id, 'reachGoal', 'hero-ab-A' | 'hero-ab-B')
 *     при условии что счётчик инициализирован.
 *
 * Этот компонент монтируется ВЫСОКО в дереве (после Header), поэтому
 * подмена происходит до первого осмысленного взаимодействия (LCP может
 * слегка дёрнуться — приемлемая цена за честный A/B без SSR-ветвления).
 */

const VARIANT_B_MAIN =
  'Подключим вашу организацию к ГИС «Профилактика» под ключ —';
const VARIANT_B_ACCENT = 'без штрафов и переделок';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return;
  const exp = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
}

declare global {
  interface Window {
    ym?: (id: number, action: string, name: string) => void;
  }
}

export function HeroAB() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let v = getCookie('heroAb');
    if (!v || (v !== 'A' && v !== 'B')) {
      v = Math.random() < 0.5 ? 'A' : 'B';
      setCookie('heroAb', v, 30);
    }

    if (v === 'B') {
      const main = document.getElementById('hero-h1-main');
      const accent = document.getElementById('hero-h1-accent');
      if (main) main.textContent = VARIANT_B_MAIN;
      if (accent) accent.textContent = VARIANT_B_ACCENT;
    }

    // Цель в Яндекс.Метрику — отдельные конверсии по вариантам.
    // ID Метрики берём из data-атрибута body, чтобы не тянуть env в client.
    const ymId = Number(document.body.dataset.ymid || 0);
    if (ymId > 0 && typeof window.ym === 'function') {
      try {
        window.ym(ymId, 'reachGoal', `hero-ab-${v}`);
      } catch {
        // no-op
      }
    }
  }, []);

  return null;
}
