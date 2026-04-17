import type { MetadataRoute } from 'next';
import { BRAND } from '@/components/constants';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Yandex',
        allow: '/',
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
      },
    ],
    sitemap: `${BRAND.site}/sitemap.xml`,
    host: BRAND.site.replace(/^https?:\/\//, ''),
  };
}
