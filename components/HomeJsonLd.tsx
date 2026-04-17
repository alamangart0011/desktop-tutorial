import { BRAND } from './constants';
import { FAQ_QA } from './faq-data';
import { RATING, REVIEWS } from './reviews-data';

export function HomeJsonLd() {
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

  const graphs = [
    ldService,
    ldHowTo,
    ldFaq,
    ldBreadcrumbs,
    ldSpeakable,
    ldCourse,
    ldItemListServices,
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
