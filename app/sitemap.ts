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
  { path: '/#audience', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/#uz2', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/#risk', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/#check', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/#calc', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/#pricing', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/#process', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/#reasons', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/#reviews', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/#faq', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/#contact', priority: 0.95, changeFrequency: 'daily' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/thanks', priority: 0.3, changeFrequency: 'yearly' },
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
