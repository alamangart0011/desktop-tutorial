import type { BlogPostMeta } from '@/lib/blog';

export const meta: BlogPostMeta = {
  slug: 'secret-net-studio-vs-alternatives',
  title: 'Secret Net Studio vs Dallas Lock vs Аккорд: какое СЗИ НСД выбрать под ГИС «Профилактика»',
  description:
    'Объективное сравнение трёх ведущих сертифицированных СЗИ от НСД в 2026 году: цены, функционал, совместимость с Astra/Alt/РЕД, скорость развёртывания, поддержка.',
  date: '2026-04-05',
  keywords: [
    'Secret Net Studio',
    'Dallas Lock 8',
    'Аккорд-Win64',
    'СЗИ от НСД сравнение',
    'сертифицированное СЗИ 2026',
  ],
  category: 'Технологии',
  readMinutes: 12,
  excerpt:
    'За последние пять лет мы внедрили Secret Net Studio на сотнях рабочих мест в госсекторе Санкт-Петербурга и регулярно сравниваем его с альтернативами — Dallas Lock и Аккорд. Публикуем честное сравнение по 8 параметрам без маркетинговой воды.',
};

export default function Post() {
  return (
    <>
      <p>
        Когда к клиенту приходит лицензиат ФСТЭК и говорит «вам нужно СЗИ от НСД
        из реестра», первый вопрос — «какое?». В реестре ФСТЭК на 2026 год
        насчитывается более 10 действующих СЗИ НСД, но в госсекторе реально
        конкурируют три продукта: <strong>Secret Net Studio</strong> (Код
        Безопасности), <strong>Dallas Lock 8.0-K</strong> (Конфидент) и{' '}
        <strong>Аккорд-Win64</strong> (ОКБ САПР). Разбираем по существу.
      </p>

      <h2>Критерии сравнения</h2>
      <p>
        Мы сравниваем продукты именно под сценарий «УЗ2 ИСПДн для ГИС
        «Профилактика»»: школа, КДНиЗП, муниципальное учреждение. Критерии:
      </p>
      <ol>
        <li>Сертификат ФСТЭК + совместимость с отечественными ОС.</li>
        <li>Покрытие мер из 21 Приказа — сколько покрывает из коробки.</li>
        <li>Цена лицензии на АРМ + годовая поддержка.</li>
        <li>Скорость первого развёртывания (время до первого рабочего АРМ).</li>
        <li>Управляемость (централизованная консоль, политики, отчётность).</li>
        <li>Интеграция с Active Directory / ALD Pro / FreeIPA.</li>
        <li>Качество техподдержки (SLA, RU-language, опыт по ГИС-проектам).</li>
        <li>Совместимость с «Соболем», КриптоПро NGate, Dr.Web/Kaspersky.</li>
      </ol>

      <h2>1. Secret Net Studio от «Кода Безопасности»</h2>
      <p>
        <strong>Кратко:</strong> наш выбор по умолчанию для ГИС «Профилактика».
      </p>
      <ul>
        <li>
          <strong>Сертификат ФСТЭК:</strong> действующий, покрывает УЗ1–УЗ4 для ИСПДн
          и ГИС 1-го класса защищённости. Совместим с Astra Linux SE 1.7/1.8, Alt
          Linux СП 10, РЕД ОС 7.3+, Windows 10/11 LTSC.
        </li>
        <li>
          <strong>Покрытие мер:</strong> 41 из 58 обязательных мер УЗ2 «из коробки»
          (разграничение доступа, контроль целостности, замкнутая программная среда,
          СОВ, аудит, контроль утечек через USB, шифрование раздела, система
          обнаружения вторжений).
        </li>
        <li>
          <strong>Цена 2026:</strong> ~22–28 тыс. ₽ / АРМ в пакете на 5+ лицензий,
          годовая ТП — 18 % от стоимости. Регионам и муниципалитетам — скидки до 20 %.
        </li>
        <li>
          <strong>Скорость развёртывания:</strong> 1–2 АРМ в день при наличии
          подготовленных дистрибутивов. Консоль управления поднимается за день,
          политики разворачиваются из шаблонов.
        </li>
        <li>
          <strong>Управляемость:</strong> Secret Net Studio Console — полноценный
          центральный сервер с группами, политиками, отчётами. Работает со службами
          каталогов.
        </li>
        <li>
          <strong>Интеграция:</strong> родная поддержка AD, совместимость с ALD Pro
          и FreeIPA через LDAP. С «Соболем» v4 — штатная связка.
        </li>
        <li>
          <strong>Техподдержка:</strong> SLA 8×5, в высоком тарифе 24×7. В СПб
          партнёрский канал оперативный, по критичному инциденту — ответ в течение
          4 часов.
        </li>
      </ul>
      <p>
        <strong>Минусы:</strong> самый тяжёлый по ресурсам (агент занимает 400–600 МБ
        RAM), на старом железе 2015 года может тормозить. Интерфейс местами
        устарел.
      </p>

      <h2>2. Dallas Lock 8.0-K от «Конфидент»</h2>
      <ul>
        <li>
          <strong>Сертификат ФСТЭК:</strong> действующий, УЗ1–УЗ4 для ИСПДн. Под
          Astra Linux есть отдельная сборка, совместимость чуть уже, чем у Secret Net.
        </li>
        <li>
          <strong>Покрытие мер:</strong> 35 из 58, частично через доп. модули.
          Отсутствует встроенный СОВ — нужно докупать отдельно.
        </li>
        <li>
          <strong>Цена 2026:</strong> ~18–22 тыс. ₽ / АРМ, ТП 15 % — дешевле
          Secret Net примерно на 15 %.
        </li>
        <li>
          <strong>Скорость развёртывания:</strong> немного быстрее Secret Net на
          одной машине (≈ 1,5 часа), но централизованное управление настраивается
          дольше.
        </li>
        <li>
          <strong>Управляемость:</strong> консоль есть, но функциональнее у Secret
          Net — особенно по политикам и отчётам.
        </li>
        <li>
          <strong>Интеграция:</strong> AD — да, Astra Linux — да. С «Соболем» —
          штатная связка. КриптоПро NGate — без нюансов.
        </li>
        <li>
          <strong>Техподдержка:</strong> SLA 8×5, 24×7 в премиум-тарифе. Чаще
          бывают задержки ответа, особенно летом.
        </li>
      </ul>
      <p>
        <strong>Когда выбрать:</strong> если бюджет критически ограничен и нет
        требования к СОВ «из коробки» — можно сэкономить 15 % на лицензиях и
        докупить отдельную СОВ позже.
      </p>

      <h2>3. Аккорд-Win64 от «ОКБ САПР»</h2>
      <ul>
        <li>
          <strong>Сертификат ФСТЭК:</strong> действующий, УЗ1–УЗ4. Родной под
          Windows, под Astra Linux — через виртуализацию или смешанные сценарии.
        </li>
        <li>
          <strong>Покрытие мер:</strong> 32 из 58 на Windows, чуть меньше на Linux.
          Сильная сторона — защита через Аккорд-АМДЗ (аппаратный СДЗ).
        </li>
        <li>
          <strong>Цена 2026:</strong> ~17–20 тыс. ₽ / АРМ, ТП 12 % — самый
          бюджетный вариант из тройки.
        </li>
        <li>
          <strong>Скорость развёртывания:</strong> на Windows — быстрее всех (~1 час
          на АРМ), но связка с Astra Linux требует доп. настроек.
        </li>
        <li>
          <strong>Управляемость:</strong> консоль довольно спартанская, отчётность
          скромная.
        </li>
        <li>
          <strong>Интеграция:</strong> фокус на Windows + AD. С «Соболем» — есть
          конфликты по аппаратным модулям (нужно выбирать: Соболь или Аккорд-АМДЗ,
          не оба).
        </li>
        <li>
          <strong>Техподдержка:</strong> небольшая команда, SLA 8×5. Лучше всего
          работает в связке с партнёром ОКБ САПР в регионе.
        </li>
      </ul>
      <p>
        <strong>Когда выбрать:</strong> если организация стоит <em>строго на Windows</em>
        и вам важен аппаратный СДЗ Аккорд-АМДЗ вместо «Соболя».
      </p>

      <h2>Сравнительная таблица</h2>
      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #cbd5e1' }}>
                Параметр
              </th>
              <th style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Secret Net Studio</th>
              <th style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Dallas Lock 8.0-K</th>
              <th style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Аккорд-Win64</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Покрытие мер УЗ2</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>41/58</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>35/58</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>32/58</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Встроенный СОВ</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>да</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>нет</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>нет</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Цена / АРМ (2026)</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>22–28 тыс. ₽</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>18–22 тыс. ₽</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>17–20 тыс. ₽</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Astra Linux SE 1.8</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>родной</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>родной</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>через ВМ</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Скорость внедрения</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>средняя</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>быстрая</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>быстрая</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Совместимость «Соболь»</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>штатно</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>штатно</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>конфликт*</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Качество техподдержки</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>высокое</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>среднее</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>среднее</td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          * «Соболь» v4 и Аккорд-АМДЗ — оба аппаратные СДЗ, в один слот их не
          поставить; выбирается один из двух.
        </p>
      </div>

      <h2>Итог: что мы рекомендуем для ГИС «Профилактика»</h2>
      <p>
        <strong>Базовый сценарий (80 % клиентов):</strong>{' '}
        <em>Secret Net Studio + ПАК «Соболь» v4 + КриптоПро NGate + Dr.Web ESS</em>.
        Это покрывает 41 меру УЗ2 из коробки, имеет встроенный СОВ, быстро
        проходит аттестацию лицензиатом ФСТЭК. По цене — середина между Dallas
        Lock и Secret Net, но экономия на отдельной СОВ делает итог
        сопоставимым.
      </p>
      <p>
        <strong>Бюджетный сценарий:</strong> Dallas Lock 8.0-K + отдельная СОВ.
        Даст экономию 10–15 %, но требует дополнительной работы по настройке
        СОВ отдельно от СЗИ НСД.
      </p>
      <p>
        <strong>Windows-only (редкий случай):</strong> Аккорд-Win64 + Аккорд-АМДЗ.
        Быстрое внедрение, но ограничение на ОС и отсутствие встроенного СОВ.
      </p>
      <p>
        В любом случае — не покупайте «коробки» заранее до аудита. Мы регулярно
        встречаем ситуацию «купили пакет Secret Net Studio на 10 АРМ, а по факту
        нужно на 25, плюс версия сертификата под старую ОС». Заказывайте{' '}
        <a href="/#contact">бесплатный аудит 30 минут</a> — это сэкономит 50–200
        тыс. ₽ на правильном подборе.
      </p>
    </>
  );
}
