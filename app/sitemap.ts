import type { MetadataRoute } from 'next';
import { BRAND } from '@/components/constants';

export const dynamic = 'force-static';

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

const ENTRIES: Entry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ENTRIES.map((e) => ({
    url: `${BRAND.site}${e.path}`,
    lastModified: now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
