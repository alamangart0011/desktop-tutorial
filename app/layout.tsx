import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/components/constants";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.site),
  title: {
    default:
      'Подключение к ГИС «Профилактика» под ключ — ' + BRAND.name,
    template: "%s — " + BRAND.name,
  },
  description:
    'Подключаем КДН, школы, опеку, соцзащиту и медучреждения к ГИС «Профилактика» по ПП РФ № 411. УЗ2, ФСТЭК, СКЗИ, СЗИ, документы, обучение, техподдержка. Срок 35–45 рабочих дней.',
  keywords: [
    'ГИС Профилактика',
    'подключение ГИС Профилактика',
    'ПП 411',
    'ФСТЭК 21',
    'УЗ2',
    'КриптоПро NGate',
    'Secret Net Studio',
    'Astra Linux',
    'ИСПДн',
    'АРМ ГИС',
  ],
  openGraph: {
    title: 'Подключение к ГИС «Профилактика» под ключ — ' + BRAND.name,
    description:
      'Федеральный оператор — Минпросвещения. Подключение обязательно с 01.12.2025. Делаем под ключ по требованиям ФСТЭК № 21, УЗ2. Срок 35–45 дней.',
    url: BRAND.site,
    siteName: BRAND.name,
    locale: 'ru_RU',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0b3b8c',
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
    url: BRAND.site,
    telephone: BRAND.phone,
    email: BRAND.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BRAND.address,
      addressCountry: 'RU',
    },
  };
  const ldService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Подключение к ГИС «Профилактика»',
    provider: { '@type': 'Organization', name: BRAND.name, url: BRAND.site },
    areaServed: 'RU',
    description:
      'Комплексное подключение организаций к ГИС «Профилактика» по требованиям ФСТЭК № 21, УЗ2, ПП РФ № 411.',
  };

  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldService) }}
        />
      </body>
    </html>
  );
}
