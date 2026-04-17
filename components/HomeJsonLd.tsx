import { BRAND } from './constants';
import { VARIANT, VARIANT_KEY } from '@/lib/variants';
import { FAQ_QA } from './faq-data';
import { getVariantContent } from '@/lib/variant-content';
import { REVIEWS as BASE_REVIEWS, RATING as BASE_RATING } from './reviews-data';

export function HomeJsonLd() {
  const site = VARIANT.canonicalBase;
  const VC = getVariantContent(VARIANT_KEY);
  const allReviews = [...VC.reviews, ...BASE_REVIEWS];
  const allFaq = [...VC.faq, ...FAQ_QA];
  const ldService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': site + '#service',
    serviceType: 'Подключение организации к ГИС «Профилактика» под ключ',
    name: 'Подключение к ГИС «Профилактика»',
    category: 'Информационная безопасность · Государственные информационные системы',
    brand: { '@type': 'Brand', name: BRAND.name },
    provider: {
      '@type': 'Organization',
      name: BRAND.name,
      url: site,
      telephone: BRAND.phone,
      email: BRAND.email,
    },
    areaServed: [
      { '@type': 'Country', name: 'Russia' },
      { '@type': 'City', name: 'Санкт-Петербург' },
      { '@type': 'AdministrativeArea', name: 'Ленинградская область' },
      { '@type': 'AdministrativeArea', name: 'Северо-Западный федеральный округ' },
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType:
        'КДНиЗП, школы и СПО, опека, соцзащита, здравоохранение, служба занятости, ОВД, учреждения культуры и спорта, ЦВСНП, СИЗО, УИИ',
    },
    termsOfService: site + '/privacy',
    serviceOutput:
      '8 документов ПДн, аттестованная ИСПДн по 21 Приказу ФСТЭК (УЗ2), рабочие места с СЗИ/СКЗИ, доступ в ГИС через ЕСИА, обученный персонал',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    description:
      'Комплексная услуга подключения организаций к ГИС «Профилактика» по ПП РФ № 411: документы ПДн, СЗИ и СКЗИ, аттестация ИСПДн по 21 Приказу ФСТЭК (УЗ2), ЕСИА, обучение, техподдержка.',
    offers: [
      {
        '@type': 'Offer',
        name: 'Пакет «Старт» — аудит и дорожная карта',
        price: 150000,
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
        url: site + '/#pricing',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: 150000,
          priceCurrency: 'RUB',
          valueAddedTaxIncluded: true,
        },
      },
      {
        '@type': 'Offer',
        name: 'Пакет «Организация» — внедрение под ключ',
        price: 500000,
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
        url: site + '/#pricing',
      },
      {
        '@type': 'Offer',
        name: 'Пакет «Регион» — серийное подключение',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
        url: site + '/#pricing',
      },
    ],
  };

  const ldProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': site + '#product',
    name: 'Подключение к ГИС «Профилактика» под ключ',
    description:
      'Готовое решение по подключению к ГИС «Профилактика»: документы ПДн, СЗИ/СКЗИ, аттестация ИСПДн (УЗ2), ЕСИА/СМЭВ, обучение сотрудников, техподдержка 24/7.',
    brand: { '@type': 'Brand', name: BRAND.name },
    category: 'Услуги информационной безопасности',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'RUB',
      lowPrice: 150000,
      highPrice: 4000000,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: BRAND.name },
    },
  };

  const ldHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': site + '#howto',
    name: 'Как подключить организацию к ГИС «Профилактика»',
    description:
      'Семь шагов подключения организации к ГИС «Профилактика» по ПП РФ № 411 с аттестацией ИСПДн по 21 Приказу ФСТЭК (УЗ2).',
    totalTime: 'P45D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'RUB',
      value: 150000,
    },
    supply: [
      { '@type': 'HowToSupply', name: 'Secret Net Studio' },
      { '@type': 'HowToSupply', name: 'ПАК «Соболь» v4' },
      { '@type': 'HowToSupply', name: 'КриптоПро NGate Client' },
      { '@type': 'HowToSupply', name: 'Сертифицированная ОС (Astra Linux / Alt Linux / РЕД ОС)' },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'Сканер-ВС / XSpider / RedCheck' },
      { '@type': 'HowToTool', name: 'Яндекс.Браузер или Chromium-Gost' },
    ],
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Экспресс-аудит', text: 'Обследование ИСПДн, оценка готовности по 21 Приказу ФСТЭК, согласование класса УЗ.', url: site + '/#risk' },
      { '@type': 'HowToStep', position: 2, name: 'Дорожная карта и КП', text: 'Фиксированная смета, состав СЗИ/СКЗИ, перечень документов и сроки в договоре.', url: site + '/#pricing' },
      { '@type': 'HowToStep', position: 3, name: 'Документы ПДн', text: 'Готовим Уведомление в Роскомнадзор, Акт обследования, Модель угроз, Акт классификации, ТЗ на СЗПДн, ПМИ, Технический паспорт.', url: site + '/#uz2' },
      { '@type': 'HowToStep', position: 4, name: 'Поставка и монтаж СЗИ', text: 'Secret Net Studio, ПАК «Соболь», КриптоПро NGate, антивирус, СОВ, СДЗ, отечественная ОС.', url: site + '/#uz2' },
      { '@type': 'HowToStep', position: 5, name: 'Аттестация ИСПДн', text: 'Аттестационные испытания, Заключение об оценке эффективности мер защиты ПДн (срок 3 года).', url: site + '/#uz2' },
      { '@type': 'HowToStep', position: 6, name: 'ЕСИА и интеграции', text: 'Регистрация в ЛК Госуслуги, настройка ролей, СМЭВ, обмен с региональными АИС.', url: site + '/#process' },
      { '@type': 'HowToStep', position: 7, name: 'Обучение и техподдержка', text: 'Обучение операторов с удостоверениями, горячая линия 24/7, SLA 4 часа.', url: site + '/#process' },
    ],
  };

  const ldFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': site + '#faq',
    mainEntity: allFaq.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const ldLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': site + '#localbusiness',
    name: BRAND.name,
    image: site + '/opengraph-image',
    url: site,
    telephone: BRAND.phone,
    email: BRAND.email,
    priceRange: '150000 — 4000000 RUB',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Карташихина, 7, лит. А',
      addressLocality: 'Санкт-Петербург',
      postalCode: '199226',
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 59.938784,
      longitude: 30.246287,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'Russia' },
      { '@type': 'AdministrativeArea', name: 'Северо-Западный федеральный округ' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BASE_RATING.value,
      bestRating: 5,
      worstRating: 1,
      reviewCount: allReviews.length,
    },
    review: allReviews.slice(0, 5).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.text,
      itemReviewed: { '@type': 'Organization', name: BRAND.name },
    })),
  };

  const ldBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': site + '#breadcrumbs',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: site + '/' },
      { '@type': 'ListItem', position: 2, name: 'Информационная безопасность', item: site + '/#uz2' },
      { '@type': 'ListItem', position: 3, name: 'Подключение к государственным информационным системам', item: site + '/#process' },
      { '@type': 'ListItem', position: 4, name: 'ГИС «Профилактика»', item: site + '/' },
    ],
  };

  const ldSpeakable = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': site + '#webpage',
    url: site,
    name:
      'ГИС «Профилактика» — подключение под ключ за 35–45 дней · ПП РФ № 411, ФСТЭК УЗ2',
    isPartOf: { '@id': site + '#website' },
    primaryImageOfPage: { '@type': 'ImageObject', url: site + '/opengraph-image' },
    inLanguage: 'ru-RU',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#uz2 h2', '#pricing h2', '#faq h2'],
      xpath: ['/html/head/title'],
    },
    mainContentOfPage: { '@type': 'WebPageElement', cssSelector: '#main' },
    significantLink: [site + '/#pricing', site + '/#contact', site + '/#uz2'],
  };

  const ldCourse = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': site + '#course',
    name: 'Подготовка операторов ГИС «Профилактика» с удостоверениями',
    description:
      'Курс для специалистов КДНиЗП, школ, опеки, соцзащиты: работа в ГИС «Профилактика», заполнение карточек СОП/ТЖС/ИПР, межведомственный обмен через СМЭВ, формирование отчётов.',
    provider: { '@type': 'Organization', name: BRAND.name, sameAs: site },
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
    '@id': site + '#services',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Внедрение и подключение к ГИС', url: site + '/#process' },
      { '@type': 'ListItem', position: 2, name: 'Обучение и методология (КДНиЗП, школы, опека)', url: site + '/#process' },
      { '@type': 'ListItem', position: 3, name: 'Техподдержка 24/7, SLA 4 часа', url: site + '/#process' },
      { '@type': 'ListItem', position: 4, name: 'Аудит готовности и аттестация ИСПДн', url: site + '/#risk' },
    ],
  };

  const ldGovServiceAbout = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    '@id': site + '#govservice',
    name: 'Государственная информационная система «Профилактика безнадзорности и правонарушений несовершеннолетних»',
    alternateName: ['ГИС «Профилактика»', 'ГИС Профилактика', 'ГИС «Профилактика безнадзорности»'],
    serviceOperator: {
      '@type': 'GovernmentOrganization',
      name: 'Министерство просвещения Российской Федерации',
      url: 'https://edu.gov.ru/',
    },
    jurisdiction: { '@type': 'Country', name: 'Russia' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: site + '/',
      availableLanguage: { '@type': 'Language', name: 'Russian' },
    },
    termsOfService:
      'https://publication.pravo.gov.ru/document/0001202504020010',
    legislationApplies: [
      {
        '@type': 'Legislation',
        legislationIdentifier: 'ПП РФ № 411 от 01.04.2025',
        name: 'Постановление Правительства РФ от 01.04.2025 № 411',
      },
      {
        '@type': 'Legislation',
        legislationIdentifier: '120-ФЗ',
        name: 'Федеральный закон № 120-ФЗ об основах системы профилактики',
      },
      {
        '@type': 'Legislation',
        legislationIdentifier: '152-ФЗ',
        name: 'Федеральный закон № 152-ФЗ о персональных данных',
      },
      {
        '@type': 'Legislation',
        legislationIdentifier: '21 Приказ ФСТЭК',
        name: 'Приказ ФСТЭК России № 21 от 18.02.2013',
      },
    ],
  };

  const ldArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': site + '#article',
    mainEntityOfPage: site + '/',
    headline:
      'Подключение к ГИС «Профилактика» под ключ по ПП РФ № 411 и ФСТЭК УЗ2',
    description:
      'Руководство по подключению организации к ГИС «Профилактика»: документы ПДн, выбор СЗИ и СКЗИ, аттестация ИСПДн по 21 Приказу ФСТЭК (УЗ2), ЕСИА и СМЭВ, штрафы по 13.11 КоАП.',
    author: { '@type': 'Organization', name: BRAND.name, url: site },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      logo: { '@type': 'ImageObject', url: site + '/favicon.svg' },
    },
    datePublished: '2026-01-15',
    dateModified: new Date().toISOString().slice(0, 10),
    inLanguage: 'ru-RU',
    image: site + '/opengraph-image',
    articleSection: [
      'ГИС Профилактика',
      'ПП РФ 411',
      'ФСТЭК УЗ2',
      'ИСПДн',
      'Персональные данные несовершеннолетних',
    ],
    about: [
      { '@type': 'Thing', name: 'ГИС «Профилактика»' },
      { '@type': 'Thing', name: 'ПП РФ № 411' },
      { '@type': 'Thing', name: '21 Приказ ФСТЭК' },
      { '@type': 'Thing', name: 'УЗ2' },
      { '@type': 'Thing', name: 'ИСПДн' },
      { '@type': 'Thing', name: 'КДНиЗП' },
    ],
  };

  const graphs = [
    ldService,
    ldProduct,
    ldHowTo,
    ldFaq,
    ldBreadcrumbs,
    ldSpeakable,
    ldCourse,
    ldItemListServices,
    ldGovServiceAbout,
    ldArticle,
    ldLocalBusiness,
  ];

  return (
    <>
      {graphs.map((g, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(g) }}
        />
      ))}
    </>
  );
}
