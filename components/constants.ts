export const BRAND = {
  name: 'НПК «Оборон-Экран»',
  shortName: 'Оборон-Экран',
  legal: 'ООО «НПК Оборон-Экран»',
  product: 'Подключение к ГИС «Профилактика»',
  phone: '+7 (812) 660-80-01',
  phoneRaw: '+78126608001',
  email: 'mail@oboron-it.ru',
  telegram: '',
  whatsapp: '',
  address: 'Санкт-Петербург',
  region: 'Санкт-Петербург',
  postalCode: '199106',
  streetAddress:
    'ул. Карташихина, д. 7, лит. А, пом. 8-Н, офис 9, муниципальный округ Гавань',
  fullAddress:
    '199106, г. Санкт-Петербург, муниципальный округ Гавань, ул. Карташихина, д. 7, лит. А, пом. 8-Н, офис 9',
  inn: '7801322348',
  ogrn: '1167847438670',
  kpp: '780101001',
  site: 'https://gisprof.ru',
  siteHost: 'gisprof.ru',
  workingHours: 'Пн–Пт 09:00–18:00 (МСК)',
  latitude: 59.9406,
  longitude: 30.2357,
} as const;

export const MIRRORS = [
  'https://gisprof.ru',
  'https://gis-prof.ru',
  'https://gisprofilaktika.ru',
  'https://pp411.ru',
  'https://xn----7sbab2ce0afk.xn--p1ai',
  'https://profilaktika-spb.ru',
  'https://spb-gis.ru',
] as const;

export const INDEXNOW_KEY = 'b2f3e9c5a1d84fe9a7c0d6e1f4b2a8d3';

// Яндекс.Метрика: заглушка-плейсхолдер. Счётчик инициализируется только если
// значение — реальный ID (цифры). Замените '00000000' на свой номер после
// создания счётчика на https://metrika.yandex.ru/
export const ANALYTICS = {
  yandexMetrikaId: '00000000',
  yandexVerification: '',
  googleVerification: '',
  mailruVerification: '',
} as const;

// Форма отправки заявок. Web3Forms — бесплатный relay, зарегистрировать на
// https://web3forms.com/ (не требует аккаунта, только верификация e-mail),
// вписать сюда access_key. Пока пусто — форма работает через mailto-fallback.
export const FORM = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '', // TODO: вставить access_key после регистрации
} as const;

export const NAV = [
  { href: '#promo', label: 'Акция' },
  { href: '#uz2', label: 'ФСТЭК УЗ2' },
  { href: '#offer-7d', label: '7 дней' },
  { href: '#clients', label: 'Клиенты' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#pricing', label: 'Пакеты' },
  { href: '#guarantee', label: 'Гарантии' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Контакты' },
] as const;
