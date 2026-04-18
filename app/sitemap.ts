import type { MetadataRoute } from 'next';
import { VARIANT } from '@/lib/variants';

export const dynamic = 'force-static';

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

/**
 * Якорные ссылки внутри одностраничника помогают Яндексу показать
 * «быстрые переходы» в выдаче (sitelinks) и индексировать отдельные
 * смысловые блоки как самостоятельные.
 */
const ENTRIES: Entry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/#quiz', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/#uz2', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/#risk', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/#how-it-works', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/#pricing', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/#cases', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/#guarantee', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/#faq', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/#contact', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/#process', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/#offer-7d', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/thanks', priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ENTRIES.map((e) => ({
    url: `${VARIANT.canonicalBase}${e.path}`,
    lastModified: now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
