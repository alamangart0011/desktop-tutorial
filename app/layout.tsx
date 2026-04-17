import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ANALYTICS, BRAND, MIRRORS } from '@/components/constants';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const TITLE =
  'ГИС «Профилактика» — подключение под ключ за 35–45 дней · ПП РФ № 411, ФСТЭК УЗ2 · ' +
  BRAND.shortName;
const DESCRIPTION =
  'Подключение к ГИС «Профилактика» под ключ по ПП РФ № 411: КДН, школы, опека, соцзащита, медучреждения, ОВД. Полный комплект документов ПДн, поставка СЗИ (Secret Net Studio, ПАК «Соболь», КриптоПро NGate), сертифицированная ОС (Astra Linux / Alt Linux / РЕД ОС), аттестация ИСПДн по 21 Приказу ФСТЭК (УЗ2), настройка ЕСИА/СМЭВ, обучение сотрудников с удостоверениями и техподдержка 24/7. Срок 35–45 рабочих дней, фиксированная цена в договоре, работаем в СПб и СЗФО.';

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
    url: BRAND.site,
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
    images: ['/opengraph-image'],
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
    ...(ANALYTICS.yandexVerification
      ? { yandex: ANALYTICS.yandexVerification }
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
      'logo=' + BRAND.site + '/favicon.svg, color=#0b3b8c, title=' + BRAND.name,
    'msapplication-TileColor': '#0b3b8c',
    'msapplication-TileImage': '/opengraph-image',
    'msapplication-config': 'none',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': BRAND.shortName,
    'og:locale:alternate': 'ru_RU',
    'og:region': 'RU-SPE',
    'og:country-name': 'Russia',
    'article:publisher': BRAND.site,
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

  const metrikaId = ANALYTICS.yandexMetrikaId;

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
        <link rel="canonical" href={BRAND.site + '/'} />
        {MIRRORS.map((m) => (
          <link key={m} rel="alternate" hrefLang="ru-RU" href={m + '/'} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={BRAND.site + '/'} />
        <meta name="yandex" content="all" />
        <meta name="yandexbot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta httpEquiv="Content-Language" content="ru" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg focus:text-[var(--color-brand)]"
        >
          Перейти к содержанию
        </a>
        <div id="main" tabIndex={-1}>
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
