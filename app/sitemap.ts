import type { MetadataRoute } from 'next';
import { BRAND } from '@/components/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BRAND.site}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
