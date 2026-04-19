import type { ComponentType } from 'react';

export type BlogCategory = 'Нормативка' | 'ФСТЭК' | 'Практика' | 'Технологии' | 'Кейсы';

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO-дата публикации YYYY-MM-DD */
  date: string;
  /** ISO-дата последнего обновления (для lastmod в sitemap / dateModified в Article) */
  updated?: string;
  keywords: string[];
  category: BlogCategory;
  /** Примерное время чтения в минутах (покажем в списке, Article.timeRequired → ISO PT#M). */
  readMinutes: number;
  /** Если есть — показываем как превью-тезис в списке; иначе режем из description. */
  excerpt?: string;
};

export type BlogPostModule = {
  meta: BlogPostMeta;
  default: ComponentType;
};

// Регистрация постов — порядок не важен, сортировка по дате.
// Каждый новый пост добавлять сюда же, чтобы TS проверил shape.
import * as pp411 from '@/content/blog/pp411-full-breakdown';
import * as uz2 from '@/content/blog/uz2-fstek-na-paltsah';
import * as errors from '@/content/blog/top-errors-connecting-gis';
import * as checklist from '@/content/blog/checklist-ispdn-attestation';
import * as secretnet from '@/content/blog/secret-net-studio-vs-alternatives';

const REGISTRY: BlogPostModule[] = [
  pp411 as BlogPostModule,
  uz2 as BlogPostModule,
  errors as BlogPostModule,
  checklist as BlogPostModule,
  secretnet as BlogPostModule,
];

export const ALL_POSTS: BlogPostModule[] = [...REGISTRY].sort((a, b) =>
  b.meta.date.localeCompare(a.meta.date),
);

export const ALL_SLUGS: string[] = ALL_POSTS.map((p) => p.meta.slug);

export function getPostBySlug(slug: string): BlogPostModule | undefined {
  return ALL_POSTS.find((p) => p.meta.slug === slug);
}

/** Для блока «Похожие материалы» — совпадение по category, исключая текущий. */
export function getRelated(slug: string, limit = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return ALL_POSTS.filter(
    (p) => p.meta.slug !== slug && p.meta.category === current.meta.category,
  )
    .slice(0, limit)
    .map((p) => p.meta);
}
