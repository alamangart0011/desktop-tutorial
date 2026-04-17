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
  site: 'https://oboron-it.ru',
  workingHours: 'Пн–Пт 09:00–18:00 (МСК)',
} as const;

export const ANALYTICS = {
  yandexMetrikaId: '',
  yandexVerification: '',
  googleVerification: '',
} as const;

export const NAV = [
  { href: '#audience', label: 'Для кого' },
  { href: '#uz2', label: 'ФСТЭК УЗ2' },
  { href: '#risk', label: 'Штраф' },
  { href: '#reasons', label: 'Почему мы' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#pricing', label: 'Пакеты' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Контакты' },
] as const;
