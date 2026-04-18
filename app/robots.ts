import type { MetadataRoute } from 'next';
import { VARIANT } from '@/lib/variants';

export const dynamic = 'force-static';

// Канонический URL и host для конкретного варианта, чтобы Яндекс не склеил 6 доменов как зеркала.
const SITE = VARIANT.canonicalBase;
const HOST = VARIANT.host;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/thanks'],
      },
      {
        userAgent: 'Yandex',
        allow: ['/'],
        disallow: ['/api/', '/thanks'],
      },
      {
        userAgent: 'YandexBot',
        allow: ['/'],
        disallow: ['/api/', '/thanks'],
      },
      {
        userAgent: 'YandexImages',
        allow: ['/'],
      },
      {
        userAgent: 'YandexMedia',
        allow: ['/'],
      },
      {
        userAgent: 'YandexMetrika',
        allow: ['/'],
      },
      {
        userAgent: 'YandexDirect',
        allow: ['/'],
      },
      {
        userAgent: 'YandexTurbo',
        allow: ['/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/api/', '/thanks'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/'],
        disallow: ['/api/', '/thanks'],
      },
      {
        userAgent: 'Mail.Ru',
        allow: ['/'],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: ['/'],
      },
      {
        userAgent: 'AhrefsBot',
        disallow: ['/'],
      },
      {
        userAgent: 'SemrushBot',
        disallow: ['/'],
      },
      {
        userAgent: 'MJ12bot',
        disallow: ['/'],
      },
    ],
    sitemap: [
      `${SITE}/sitemap.xml`,
      `${SITE}/turbo.xml`,
    ],
    host: HOST,
  };
}
