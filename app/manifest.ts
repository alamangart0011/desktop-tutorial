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
    scope: '/',
    id: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#F5F8FF',
    theme_color: '#0b3b8c',
    lang: 'ru-RU',
    dir: 'ltr',
    categories: ['business', 'productivity', 'education', 'government'],
    prefer_related_applications: false,
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
    shortcuts: [
      {
        name: 'Чек-лист готовности',
        short_name: 'Чек-лист',
        url: '/#check',
        description: 'Проверить готовность к подключению за 2 минуты',
      },
      {
        name: 'Калькулятор штрафа',
        short_name: 'Штраф',
        url: '/#risk',
        description: 'Рассчитать риск штрафа по 13.11 КоАП',
      },
      {
        name: 'Пакеты и цены',
        short_name: 'Пакеты',
        url: '/#pricing',
        description: 'Посмотреть пакеты услуг и цены',
      },
      {
        name: 'Связаться',
        short_name: 'Контакт',
        url: '/#contact',
        description: 'Оставить заявку',
      },
    ],
  };
}
