import type { MetadataRoute } from 'next';
import { BRAND } from '@/components/constants';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name + ' — Подключение к ГИС «Профилактика»',
    short_name: BRAND.shortName,
    description:
      'Подключение организаций к ГИС «Профилактика» под ключ: документы ПДн, СЗИ, аттестация ИСПДн (УЗ2), ЕСИА, обучение, техподдержка.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F8FF',
    theme_color: '#0b3b8c',
    lang: 'ru-RU',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
