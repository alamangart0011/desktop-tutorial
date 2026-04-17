import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ANALYTICS, BRAND } from '@/components/constants';
import { FAQ_QA } from '@/components/faq-data';
import { RATING, REVIEWS } from '@/components/reviews-data';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const TITLE =
  'Подключение к ГИС «Профилактика» под ключ · ПП РФ № 411, ФСТЭК УЗ2 — ' +
  BRAND.name;
const DESCRIPTION =
  'Подключаем КДН, школы, опеку, соцзащиту, медучреждения и ОВД к ГИС «Профилактика» под ключ. Документы ПДн, СЗИ (Secret Net Studio, ПАК «Соболь», КриптоПро NGate), сертифицированная ОС (Astra/Alt/РЕД), аттестация ИСПДн по 21 Приказу ФСТЭК (УЗ2), обучение и техподдержка. Срок 35–45 рабочих дней.';

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.site),
  title: {
    default: TITLE,
    template: '%s — ' + BRAND.name,
  },
  description: DESCRIPTION,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name, url: BRAND.site }],
  generator: 'Next.js',
  keywords: [
    'ГИС Профилактика',
    'ГИС «Профилактика»',
    'подключение к ГИС Профилактика',
    'ГИС профилактики безнадзорности',
    'ПП РФ 411',
    'Постановление 411 от 01.04.2025',
    'ФСТЭК 21',
    '21 Приказ ФСТЭК',
    'ФСТЭК 117',
    'УЗ2',
    'ИСПДн',
    '152-ФЗ',
    '120-ФЗ',
    'КДН и ЗП',
    'КДНиЗП',
    'комиссия по делам несовершеннолетних',
    'ЕСИА подключение',
    'СМЭВ',
    'КриптоПро NGate',
    'Secret Net Studio',
    'ПАК Соболь',
    'Astra Linux',
    'Alt Linux',
    'РЕД ОС',
    'аттестация ИСПДн',
    'СЗИ от НСД',
    'СКЗИ',
    'защита персональных данных несовершеннолетних',
    'Оборон-Экран',
    'Санкт-Петербург',
  ],
  category: 'Информационная безопасность',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BRAND.site,
    siteName: BRAND.name,
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: { 'ru-RU': '/' },
  },
  verification: {
    ...(ANALYTICS.yandexVerification
      ? { yandex: ANALYTICS.yandexVerification }
      : {}),
    ...(ANALYTICS.googleVerification
      ? { google: ANALYTICS.googleVerification }
      : {}),
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    'yandex-tableau-widget':
      'logo=' + BRAND.site + '/favicon.svg, color=#0b3b8c, title=' + BRAND.name,
  },
};

export const viewport: Viewport = {
  themeColor: '#0b3b8c',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ldOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    legalName: BRAND.legal,
    url: BRAND.site,
    logo: `${BRAND.site}/favicon.svg`,
    telephone: BRAND.phone,
    email: BRAND.email,
    taxID: BRAND.inn,
    vatID: BRAND.inn,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'ИНН', value: BRAND.inn },
      { '@type': 'PropertyValue', propertyID: 'ОГРН', value: BRAND.ogrn },
      { '@type': 'PropertyValue', propertyID: 'КПП', value: BRAND.kpp },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.streetAddress,
      addressLocality: BRAND.address,
      addressRegion: BRAND.region,
      postalCode: BRAND.postalCode,
      addressCountry: 'RU',
    },
    sameAs: [BRAND.site],
  };

  const ldLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BRAND.site + '#business',
    name: BRAND.name,
    image: `${BRAND.site}/opengraph-image`,
    telephone: BRAND.phone,
    email: BRAND.email,
    url: BRAND.site,
    priceRange: '₽₽₽',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.streetAddress,
      addressLocality: BRAND.address,
      addressRegion: BRAND.region,
      postalCode: BRAND.postalCode,
      addressCountry: 'RU',
    },
    areaServed: { '@type': 'Country', name: 'Russia' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };

  const ldService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Подключение организации к ГИС «Профилактика» под ключ',
    name: 'Подключение к ГИС «Профилактика»',
    provider: { '@type': 'Organization', name: BRAND.name, url: BRAND.site },
    areaServed: { '@type': 'Country', name: 'Russia' },
    description:
      'Комплексная услуга подключения организаций к ГИС «Профилактика» по ПП РФ № 411: документы ПДн, СЗИ и СКЗИ, аттестация ИСПДн по 21 Приказу ФСТЭК (УЗ2), ЕСИА, обучение, техподдержка.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'RUB',
      lowPrice: 150000,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: RATING.value,
      reviewCount: RATING.count,
      bestRating: RATING.best,
      worstRating: RATING.worst,
    },
    review: REVIEWS.map((r) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
      },
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewBody: r.text,
    })),
  };

  const ldHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Как подключить организацию к ГИС «Профилактика»',
    description:
      'Семь шагов подключения организации к ГИС «Профилактика» по ПП РФ № 411 с аттестацией ИСПДн по 21 Приказу ФСТЭК (УЗ2).',
    totalTime: 'P45D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'RUB',
      value: 150000,
    },
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Экспресс-аудит', text: 'Обследование ИСПДн, оценка готовности по 21 Приказу ФСТЭК, согласование класса УЗ.' },
      { '@type': 'HowToStep', position: 2, name: 'Дорожная карта и КП', text: 'Фиксированная смета, состав СЗИ/СКЗИ, перечень документов и сроки в договоре.' },
      { '@type': 'HowToStep', position: 3, name: 'Документы ПДн', text: 'Готовим Уведомление в Роскомнадзор, Акт обследования, Модель угроз, Акт классификации, ТЗ на СЗПДн, ПМИ, Технический паспорт.' },
      { '@type': 'HowToStep', position: 4, name: 'Поставка и монтаж СЗИ', text: 'Secret Net Studio, ПАК «Соболь», КриптоПро NGate, антивирус, СОВ, СДЗ, отечественная ОС.' },
      { '@type': 'HowToStep', position: 5, name: 'Аттестация ИСПДн', text: 'Аттестационные испытания, Заключение об оценке эффективности мер защиты ПДн (срок 3 года).' },
      { '@type': 'HowToStep', position: 6, name: 'ЕСИА и интеграции', text: 'Регистрация в ЛК Госуслуги, настройка ролей, СМЭВ, обмен с региональными АИС.' },
      { '@type': 'HowToStep', position: 7, name: 'Обучение и техподдержка', text: 'Обучение операторов с удостоверениями, горячая линия 24/7, SLA 4 часа.' },
    ],
  };

  const ldFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_QA.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const ldBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: BRAND.site,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Подключение к государственным информационным системам',
        item: BRAND.site + '/#services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'ГИС «Профилактика»',
        item: BRAND.site + '/#about',
      },
    ],
  };

  const ldWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: BRAND.site,
    inLanguage: 'ru-RU',
    publisher: { '@type': 'Organization', name: BRAND.name },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BRAND.site}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    hasPart: [
      { '@type': 'WebPageElement', name: 'О ГИС «Профилактика»', url: BRAND.site + '/#about' },
      { '@type': 'WebPageElement', name: 'Для кого обязательно подключение', url: BRAND.site + '/#audience' },
      { '@type': 'WebPageElement', name: 'Требования 21 Приказа ФСТЭК (УЗ2)', url: BRAND.site + '/#uz2' },
      { '@type': 'WebPageElement', name: 'Чек-лист готовности', url: BRAND.site + '/#check' },
      { '@type': 'WebPageElement', name: 'Калькулятор стоимости', url: BRAND.site + '/#calc' },
      { '@type': 'WebPageElement', name: 'Калькулятор штрафа', url: BRAND.site + '/#risk' },
      { '@type': 'WebPageElement', name: 'Пакеты услуг', url: BRAND.site + '/#pricing' },
      { '@type': 'WebPageElement', name: 'Глоссарий', url: BRAND.site + '/#glossary' },
      { '@type': 'WebPageElement', name: 'Нормативная база', url: BRAND.site + '/#docs' },
      { '@type': 'WebPageElement', name: 'Контакты', url: BRAND.site + '/#contact' },
    ],
  };

  const ldSpeakable = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: BRAND.site,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#about p', '#uz2 p'],
    },
  };

  const ldCourse = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Подготовка операторов ГИС «Профилактика» с удостоверениями',
    description:
      'Курс для специалистов КДНиЗП, школ, опеки, соцзащиты: работа в ГИС «Профилактика», заполнение карточек СОП/ТЖС/ИПР, межведомственный обмен через СМЭВ, формирование отчётов.',
    provider: {
      '@type': 'Organization',
      name: BRAND.name,
      sameAs: BRAND.site,
    },
    inLanguage: 'ru-RU',
    educationalCredentialAwarded: 'Удостоверение о повышении квалификации',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['onsite', 'online'],
      location: {
        '@type': 'Place',
        name: BRAND.address,
        address: {
          '@type': 'PostalAddress',
          addressLocality: BRAND.address,
          addressCountry: 'RU',
        },
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
      },
    },
  };

  const ldItemListServices = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Внедрение и подключение к ГИС', url: BRAND.site + '/#services' },
      { '@type': 'ListItem', position: 2, name: 'Обучение и методология (КДНиЗП, школы, опека)', url: BRAND.site + '/#services' },
      { '@type': 'ListItem', position: 3, name: 'Техподдержка 24/7, SLA 4 часа', url: BRAND.site + '/#services' },
      { '@type': 'ListItem', position: 4, name: 'Аудит готовности и аттестация ИСПДн', url: BRAND.site + '/#services' },
    ],
  };

  const metrikaId = ANALYTICS.yandexMetrikaId;

  return (
    <html lang="ru" className={manrope.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href={BRAND.site} />
        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="geo.region" content="RU-SPE" />
        <meta name="geo.placename" content={BRAND.address} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg focus:text-[var(--color-brand)]"
        >
          Перейти к содержанию
        </a>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumbs) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldHowTo) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldSpeakable) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldCourse) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldItemListServices) }}
        />

        {metrikaId && (
          <>
            <Script id="ym-init" strategy="afterInteractive">
              {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${metrikaId}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, ecommerce:"dataLayer"});
document.addEventListener("click", function(e){
  var el = e.target.closest("[data-goal]");
  if (!el) return;
  var goal = el.getAttribute("data-goal");
  if (goal && window.ym) window.ym(${metrikaId}, "reachGoal", goal);
}, {passive:true});`}
            </Script>
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${metrikaId}`}
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
