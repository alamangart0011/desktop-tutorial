export const BRAND = {
  name: 'НПК «Оборон-Экран»',
  shortName: 'Оборон-Экран',
  legal: 'НПК «Оборон-Экран»',
  product: 'Подключение к ГИС «Профилактика»',
  phone: '+7 (812) 660-80-01',
  phoneRaw: '+78126608001',
  email: 'mail@oboron-it.ru',
  telegram: '',
  whatsapp: '',
  address: 'Санкт-Петербург',
  region: 'Санкт-Петербург',
  postalCode: '191036',
  streetAddress: '—',
  site: 'https://oboron-it.ru',
  workingHours: 'Пн–Пт 09:00–18:00 (МСК)',
} as const;

export const ANALYTICS = {
  yandexMetrikaId: '',
  yandexVerification: '',
  googleVerification: '',
} as const;

export const NAV = [
  { href: '#about', label: 'Что такое ГИС' },
  { href: '#uz2', label: 'Требования ФСТЭК' },
  { href: '#tech', label: 'Стек' },
  { href: '#legal', label: 'Правовое поле' },
  { href: '#check', label: 'Чек-лист' },
  { href: '#services', label: 'Услуги' },
  { href: '#pricing', label: 'Пакеты' },
  { href: '#process', label: 'Как работаем' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#regions', label: 'География' },
  { href: '#glossary', label: 'Глоссарий' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Контакты' },
] as const;
