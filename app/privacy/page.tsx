import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/components/constants';
import { VARIANT } from '@/lib/variants';

// Site URL должен совпадать с текущим вариантом, иначе Яндекс увидит ссылку на main domain в тексте политики на всех 6 сайтах.
const SITE = VARIANT.canonicalBase;

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных',
  description:
    'Политика обработки персональных данных ' +
    BRAND.name +
    ' в соответствии с 152-ФЗ. Цели обработки, состав ПДн, права субъекта, контакты ответственного.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Политика обработки персональных данных — ' + BRAND.name,
    description:
      'Порядок обработки и защиты персональных данных ' +
      BRAND.legal +
      ' по 152-ФЗ: цели, состав ПДн, сроки, права субъекта, контакты ответственного.',
    url: '/privacy',
    siteName: BRAND.name,
    locale: 'ru_RU',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Политика обработки ПДн — ' + BRAND.name,
    description: 'Порядок обработки и защиты ПДн по 152-ФЗ.',
  },
};

const REVISION_DATE = '16 апреля 2026 г.';

export default function PrivacyPage() {
  return (
    <main className="bg-white text-[var(--color-ink)]">
      <div className="container-x py-12 md:py-16 max-w-3xl">
        <nav className="text-xs text-[var(--color-muted)] mb-6" aria-label="Хлебные крошки">
          <Link href="/" className="hover:text-[var(--color-brand)]">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <span>Политика обработки персональных данных</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Политика обработки персональных данных
        </h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Редакция от {REVISION_DATE}
        </p>

        <div className="prose prose-slate mt-8 max-w-none text-[15px] leading-relaxed space-y-6">
          <section>
            <h2 className="text-xl font-bold mt-8">1. Общие положения</h2>
            <p>
              Настоящая Политика разработана в соответствии с Федеральным законом от 27.07.2006
              № 152-ФЗ «О персональных данных» (далее — 152-ФЗ) и определяет порядок обработки
              персональных данных и меры по обеспечению безопасности персональных данных,
              предпринимаемые {BRAND.legal} (далее — Оператор).
            </p>
            <p>
              Оператор ставит своей важнейшей целью и условием осуществления своей деятельности
              соблюдение прав и свобод человека и гражданина при обработке его персональных
              данных, в том числе защиты прав на неприкосновенность частной жизни, личную и
              семейную тайну.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8">2. Сведения об Операторе</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Полное наименование: {BRAND.legal}</li>
              <li>Краткое наименование: {BRAND.name}</li>
              <li>ИНН: {BRAND.inn}</li>
              <li>ОГРН: {BRAND.ogrn}</li>
              <li>КПП: {BRAND.kpp}</li>
              <li>Юридический адрес: {BRAND.fullAddress}</li>
              <li>
                Телефон: <a href={`tel:${BRAND.phoneRaw}`} className="text-[var(--color-brand)]">{BRAND.phone}</a>
              </li>
              <li>
                E-mail: <a href={`mailto:${BRAND.email}`} className="text-[var(--color-brand)]">{BRAND.email}</a>
              </li>
              <li>Сайт: {SITE}</li>
              <li>Режим работы: {BRAND.workingHours}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8">3. Какие персональные данные мы обрабатываем</h2>
            <p>
              Оператор обрабатывает следующие персональные данные субъектов, добровольно
              переданных через формы на сайте {SITE}:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>фамилия, имя, отчество;</li>
              <li>должность и наименование организации;</li>
              <li>контактный телефон;</li>
              <li>адрес электронной почты;</li>
              <li>регион (субъект РФ);</li>
              <li>содержание сообщения, переданного через форму обратной связи;</li>
              <li>метаданные сессии (IP-адрес, тип устройства, источник перехода — Яндекс.Метрика).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8">4. Цели обработки</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>предоставление ответа на обращение, поступившее через форму;</li>
              <li>подготовка коммерческого предложения и расчёта стоимости подключения к ГИС «Профилактика»;</li>
              <li>информирование о статусе обработки заявки;</li>
              <li>заключение и исполнение договора оказания услуг (ст. 6 152-ФЗ);</li>
              <li>аналитика посещаемости сайта в обезличенном виде через Яндекс.Метрику.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8">5. Правовые основания</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>согласие субъекта персональных данных (п. 1 ч. 1 ст. 6 152-ФЗ);</li>
              <li>необходимость для исполнения договора (п. 5 ч. 1 ст. 6 152-ФЗ);</li>
              <li>федеральные законы 152-ФЗ, 149-ФЗ, 38-ФЗ;</li>
              <li>внутренние локальные акты Оператора по защите персональных данных.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8">6. Сроки обработки</h2>
            <p>
              Персональные данные обрабатываются до достижения целей обработки, но не дольше
              сроков, установленных законодательством. По запросу субъекта данные удаляются в
              течение 10 рабочих дней, если их сохранение не требуется по закону.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8">7. Передача персональных данных</h2>
            <p>
              Оператор не передаёт персональные данные третьим лицам без согласия субъекта, за
              исключением случаев, предусмотренных законом. Хранение и обработка осуществляются
              на территории Российской Федерации в соответствии с ч. 5 ст. 18 152-ФЗ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8">8. Меры защиты</h2>
            <p>
              Оператор принимает технические и организационные меры по обеспечению безопасности
              персональных данных в соответствии с требованиями ст. 19 152-ФЗ, Приказа ФСТЭК России
              от 18.02.2013 № 21, Приказа ФСБ России от 10.07.2014 № 378.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8">9. Права субъекта персональных данных</h2>
            <p>Субъект имеет право:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>получать информацию об обработке своих персональных данных;</li>
              <li>требовать уточнения, блокирования или уничтожения данных;</li>
              <li>отозвать согласие на обработку;</li>
              <li>обжаловать действия Оператора в Роскомнадзоре или в суде.</li>
            </ul>
            <p>
              Запросы направляются в письменной форме на e-mail{' '}
              <a href={`mailto:${BRAND.email}`} className="text-[var(--color-brand)]">{BRAND.email}</a>{' '}
              или по адресу {BRAND.fullAddress}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8">10. Файлы cookie и аналитика</h2>
            <p>
              Сайт использует файлы cookie и систему веб-аналитики Яндекс.Метрика для сбора
              обезличенной статистики посещений. Пользователь может отключить cookie в настройках
              браузера; это не повлияет на работу основных функций сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8">11. Изменение Политики</h2>
            <p>
              Оператор имеет право вносить изменения в настоящую Политику. Актуальная редакция
              всегда доступна по адресу {SITE}/privacy. Дата последнего обновления указана
              в начале документа.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-5 py-3 hover:bg-[var(--color-brand-2)] transition"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </main>
  );
}
