import { BRAND } from '@/components/constants';
import { VARIANT, VARIANTS } from '@/lib/variants';

export const dynamic = 'force-static';

/**
 * humans.txt — короткий «о команде». Не для SEO напрямую, но полезен как
 * сигнал «живой проект, не статика-визитка». Часть аудиторов CRO смотрит.
 */
const MIRRORS = Object.values(VARIANTS)
  .map((v) => v.host)
  .filter((h) => h !== VARIANT.host)
  .join(' · ');

export function GET() {
  const body = `/* TEAM */
Команда: ${BRAND.name}
Специализация: информационная безопасность, СЗИ, аттестация ИСПДн, подключение к ГИС «Профилактика»
Сайт: ${VARIANT.canonicalBase}
Зеркала: ${MIRRORS}
Контакт: ${BRAND.email}
Телефон: ${BRAND.phone}
Расположение: ${BRAND.address}, Россия

/* STACK */
Next.js 15, React 19, Tailwind CSS v4, TypeScript
Деплой: Static Export + nginx + Let's Encrypt
SEO: 13 JSON-LD (Service, Product, HowTo, FAQPage, Course, GovernmentService, TechArticle, BreadcrumbList, Speakable, VideoObject, WebSite, DefinedTermSet, AggregateRating), OG 1200×630, Sitemap, robots с Clean-param, Yandex Turbo RSS, IndexNow, A/B-тест Hero
`;
  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=86400',
    },
  });
}
