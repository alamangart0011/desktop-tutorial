import { BRAND } from '@/components/constants';
import { VARIANT } from '@/lib/variants';

export const dynamic = 'force-static';

/**
 * security.txt по RFC 9116 — точка входа для ответственного раскрытия уязвимостей.
 * Canonical обязан совпадать с хостом, на котором отдаётся файл, иначе валидаторы
 * (например, securitytxt.org) ругаются. Поэтому не статика, а route на каждый
 * вариант — VARIANT.canonicalBase подставляет нужный домен на этапе сборки.
 */
export function GET() {
  const SITE = VARIANT.canonicalBase;
  const body = `Contact: mailto:${BRAND.email}
Contact: tel:${BRAND.phoneRaw}
Expires: 2027-12-31T23:59:59+03:00
Preferred-Languages: ru, en
Canonical: ${SITE}/.well-known/security.txt
Policy: ${SITE}/privacy
# ${BRAND.name} — ответственное раскрытие уязвимостей.
# Если вы нашли уязвимость на ${VARIANT.host} или в поставляемых нами системах —
# свяжитесь с нами по указанным контактам. Подробности у нас не разглашаются
# публично до устранения. Не проводите DoS, социальную инженерию против сотрудников,
# не выгружайте и не публикуйте чужие ПДн.
`;
  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
