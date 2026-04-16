import type { MetadataRoute } from 'next';
import { BRAND } from '@/components/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const anchors = [
    '',
    '#about',
    '#uz2',
    '#check',
    '#calculator',
    '#services',
    '#pricing',
    '#process',
    '#callback',
    '#reasons',
    '#cases',
    '#faq',
    '#contact',
  ];
  return anchors.map((a, i) => ({
    url: `${BRAND.site}/${a}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: i === 0 ? 1.0 : 0.7,
  }));
}
