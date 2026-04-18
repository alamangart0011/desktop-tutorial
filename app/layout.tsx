import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ANALYTICS, BRAND } from '@/components/constants';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { VARIANT, VARIANTS } from '@/lib/variants';

// Все URL'ы сети доменов — для Organization.sameAs (даёт Яндексу сигнал "единый бренд")
const NETWORK_URLS = Object.values(VARIANTS).map((v) => v.canonicalBase);

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const TITLE = VARIANT.title;
const DESCRIPTION = VARIANT.description;
const SITE_URL = VARIANT.canonicalBase;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s — ' + BRAND.name,
  },
  description: DESCRIPTION,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name, url: SITE_URL }],
  generator: 'Next.js',
  keywords: [
    ...VARIANT.keywords,
    'ГИС Профилактика',
    'ГИС «Профилактика»',
    'ГИС профилактика подключение',
    'подключение к ГИС Профилактика',
    'подключение к ГИС «Профилактика»',
    'ГИС профилактика под ключ',
    'ГИС профилактика СПб',
    'ГИС профилактика Санкт-Петербург',
    'ГИС профилактики безнадзорности',
    'ГИС профилактика для школ',
    'ГИС профилактика для КДН',
    'ГИС профилактика для опеки',
    'ГИС профилактика для соцзащиты',
    'ГИС профилактика как подключить',
    'ГИС профилактика требования',
    'ПП 411',
    'ПП РФ 411',
    'ПП РФ № 411',
    'Постановление 411',
    'Постановление Правительства 411',
    'Постановление 411 от 01.04.2025',
    'ФЗ 120',
    '120-ФЗ',
    '152-ФЗ',
    'ФЗ 152',
    'ФСТЭК 21',
    '21 Приказ ФСТЭК',
    'приказ ФСТЭК 21',
    'ФСТЭК 117',
    'ФСТЭК 77',
    '77 Приказ ФСТЭК',
    'УЗ2',
    'уровень защищённости 2',
    'ИСПДн',
    'аттестация ИСПДн',
    'аттестация ИСПДн СПб',
    'КДН и ЗП',
    'КДНиЗП',
    'комиссия по делам несовершеннолетних',
    'ЕСИА',
    'ЕСИА подключение',
    'СМЭВ 3',
    'СМЭВ',
    'КриптоПро NGate',
    'КриптоПро CSP',
    'Secret Net Studio',
    'SecretNet Studio',
    'ПАК Соболь',
    'Соболь v4',
    'Astra Linux',
    'Alt Linux',
    'РЕД ОС',
    'Dr.Web',
    'Kaspersky',
    'XSpider',
    'Сканер-ВС',
    'RedCheck',
    'СЗИ от НСД',
    'СКЗИ',
    'СОВ',
    'защита персональных данных',
    'защита персональных данных несовершеннолетних',
    'ИПР',
    'СОП',
    'ТЖС',
    'Минпросвещения',
    'Роскомнадзор уведомление',
    'штраф 13.11 КоАП',
    'Оборон-Экран',
    'НПК Оборон-Экран',
    'Санкт-Петербург',
    'Ленинградская область',
    'СЗФО',
    'gisprof',
    'gis-profilaktika',
  ],
  category: 'Информационная безопасность',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: BRAND.name,
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'ГИС «Профилактика» — подключение под ключ · ПП РФ № 411 · ФСТЭК УЗ2',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        alt: 'ГИС «Профилактика» — подключение под ключ · ПП РФ № 411 · ФСТЭК УЗ2',
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: { 'ru-RU': '/', 'x-default': '/' },
    types: {
      'application/rss+xml': [{ url: '/turbo.xml', title: 'Яндекс.Турбо · ГИС «Профилактика»' }],
    },
  },
  verification: {
    ...((VARIANT.yandexVerification || ANALYTICS.yandexVerification)
      ? { yandex: VARIANT.yandexVerification || ANALYTICS.yandexVerification }
      : {}),
    ...(ANALYTICS.googleVerification
      ? { google: ANALYTICS.googleVerification }
      : {}),
    ...(ANALYTICS.mailruVerification
      ? { other: { 'mailru-verification': ANALYTICS.mailruVerification } }
      : {}),
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: BRAND.shortName,
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.svg'],
  },
  other: {
    'yandex-tableau-widget':
      'logo=' + SITE_URL + '/favicon.svg, color=#0b3b8c, title=' + BRAND.name,
    'msapplication-TileColor': '#0b3b8c',
    'msapplication-TileImage': '/opengraph-image',
    'msapplication-config': 'none',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': BRAND.shortName,
    'og:locale:alternate': 'ru_RU',
    'og:region': VARIANT.geoRegion || 'RU-SPE',
    'og:country-name': 'Russia',
    'geo.region': VARIANT.geoRegion || 'RU-SPE',
    'geo.placename':
      VARIANT.region === 'Санкт-Петербург'
        ? 'Санкт-Петербург'
        : VARIANT.region === 'Ленинградская область'
          ? 'Ленинградская область'
          : 'Russia',
    'article:publisher': SITE_URL,
    'geo.country': 'RU',
    'geo.position': `${BRAND.latitude};${BRAND.longitude}`,
    ICBM: `${BRAND.latitude}, ${BRAND.longitude}`,
    rating: 'General',
    audience: 'all',
    distribution: 'global',
    'revisit-after': '3 days',
    language: 'Russian',
    copyright: BRAND.legal,
    author: BRAND.name,
    classification: 'Информационная безопасность, государственные информационные системы',
    coverage: 'Россия, Санкт-Петербург, Северо-Западный федеральный округ',
    target: 'all',
    HandheldFriendly: 'true',
    MobileOptimized: '375',
    'format-detection': 'telephone=yes',
    'theme-color': '#0b3b8c',
    'twitter:label1': 'Срок',
    'twitter:data1': '7 дней или возврат 100 %',
    'twitter:label2': 'Регион',
    'twitter:data2': 'Санкт-Петербург и СЗФО',
    'og:image:secure_url': SITE_URL + '/opengraph-image',
    'og:updated_time': new Date().toISOString(),
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
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
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
    // sameAs перечисляет все домены сети — Яндекс связывает их как один бренд
    sameAs: NETWORK_URLS,
  };

  const ldLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': SITE_URL + '#business',
    name: BRAND.name,
    legalName: BRAND.legal,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/favicon.svg`,
    telephone: BRAND.phone,
    email: BRAND.email,
    url: SITE_URL,
    priceRange: '₽₽₽',
    taxID: BRAND.inn,
    vatID: BRAND.inn,
    foundingDate: '2019-01-15',
    slogan: 'Подключение к ГИС «Профилактика» под ключ за 7 дней или возврат денег',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.streetAddress,
      addressLocality: BRAND.address,
      addressRegion: BRAND.region,
      postalCode: BRAND.postalCode,
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BRAND.latitude,
      longitude: BRAND.longitude,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Санкт-Петербург' },
      { '@type': 'AdministrativeArea', name: 'Ленинградская область' },
      { '@type': 'AdministrativeArea', name: 'Северо-Западный федеральный округ' },
      { '@type': 'Country', name: 'Russia' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Пакеты подключения к ГИС «Профилактика»',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Экспресс-аудит «Старт»' },
          priceCurrency: 'RUB',
          price: '120000',
          priceValidUntil: '2026-04-30',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Подключение «Организация»' },
          priceCurrency: 'RUB',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'RUB',
            minPrice: '500000',
            maxPrice: '1500000',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Региональный проект «Регион»' },
          priceCurrency: 'RUB',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'RUB',
            minPrice: '1500000',
            maxPrice: '4000000',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '27',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: NETWORK_URLS,
  };

  const ldWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: SITE_URL,
    inLanguage: 'ru-RU',
    publisher: { '@type': 'Organization', name: BRAND.name },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    hasPart: [
      { '@type': 'WebPageElement', name: 'О ГИС «Профилактика»', url: SITE_URL + '/#about' },
      { '@type': 'WebPageElement', name: 'Для кого обязательно подключение', url: SITE_URL + '/#audience' },
      { '@type': 'WebPageElement', name: 'Требования 21 Приказа ФСТЭК (УЗ2)', url: SITE_URL + '/#uz2' },
      { '@type': 'WebPageElement', name: 'Калькулятор риска штрафа', url: SITE_URL + '/#risk' },
      { '@type': 'WebPageElement', name: 'Калькулятор стоимости', url: SITE_URL + '/#calc' },
      { '@type': 'WebPageElement', name: 'Калькулятор штрафа', url: SITE_URL + '/#risk' },
      { '@type': 'WebPageElement', name: 'Пакеты услуг', url: SITE_URL + '/#pricing' },
      { '@type': 'WebPageElement', name: 'Глоссарий', url: SITE_URL + '/#glossary' },
      { '@type': 'WebPageElement', name: 'Нормативная база', url: SITE_URL + '/#docs' },
      { '@type': 'WebPageElement', name: 'Контакты', url: SITE_URL + '/#contact' },
    ],
  };

  const metrikaRaw = VARIANT.metrikaId || ANALYTICS.yandexMetrikaId;
  // Placeholder '00000000' не инициализирует счётчик — замените на настоящий ID.
  const metrikaId =
    metrikaRaw && metrikaRaw !== '00000000' ? metrikaRaw : '';

  return (
    <html lang="ru" className={manrope.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#0b3b8c" />
        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://yandex.ru" />
        <link rel="dns-prefetch" href="https://passport.yandex.ru" />
        <link rel="dns-prefetch" href="https://webmaster.yandex.ru" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={'Яндекс.Турбо · ' + BRAND.shortName}
          href="/turbo.xml"
        />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="canonical" href={SITE_URL + '/'} />
        <link rel="alternate" hrefLang="ru-RU" href={SITE_URL + '/'} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL + '/'} />
        <meta name="yandex" content="all" />
        <meta name="yandexbot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta httpEquiv="Content-Language" content="ru" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body data-ymid={metrikaId || ''}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg focus:text-[var(--color-brand)]"
        >
          Перейти к содержанию
        </a>
        <div id="app-root">
          {children}
        </div>
        <AccessibilityToolbar />

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldWebSite) }}
        />

        {metrikaId && (
          <>
            <Script id="ym-init" strategy="afterInteractive">
              {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${metrikaId}", "ym");
ym(${metrikaId}, "init", {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
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
