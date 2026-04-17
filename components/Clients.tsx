import {
  SchoolIcon,
  GavelIcon,
  HeartHandshakeIcon,
  BuildingIcon,
  HospitalIcon,
  UsersIcon,
  ShieldIcon,
  BookOpenIcon,
} from './Icons';

const GROUPS = [
  {
    Icon: SchoolIcon,
    title: 'Школы и СПО',
    desc: 'Общеобразовательные организации, колледжи, техникумы, СУВУ открытого и закрытого типа',
    tag: '~2 900 в СЗФО',
  },
  {
    Icon: GavelIcon,
    title: 'КДНиЗП',
    desc: 'Комиссии по делам несовершеннолетних и защите их прав — региональные и муниципальные',
    tag: '~215 в СЗФО',
  },
  {
    Icon: HeartHandshakeIcon,
    title: 'Органы опеки и попечительства',
    desc: 'Подразделения по защите прав детей-сирот и оставшихся без попечения родителей',
    tag: '≈ 470 МО',
  },
  {
    Icon: BuildingIcon,
    title: 'Соцзащита и ЦСПСиД',
    desc: 'Центры социальной помощи семье и детям, учреждения соцобслуживания, СРЦН',
    tag: 'ПП № 411',
  },
  {
    Icon: HospitalIcon,
    title: 'Здравоохранение и служба занятости',
    desc: 'Медицинские организации, наркологические и психоневрологические диспансеры, ЦЗН',
    tag: '18 категорий',
  },
  {
    Icon: ShieldIcon,
    title: 'ОВД, ЦВСНП, СИЗО, УИИ',
    desc: 'Подразделения МВД по делам несовершеннолетних, спецучреждения, уголовно-исполнительная инспекция',
    tag: 'ФЗ № 120',
  },
  {
    Icon: UsersIcon,
    title: 'Муниципалитеты и региональные органы',
    desc: 'Департаменты образования, молодёжной политики, культуры, спорта — на уровне субъекта и МО',
    tag: '11 субъектов СЗФО',
  },
  {
    Icon: BookOpenIcon,
    title: 'Учреждения культуры, спорта, досуга',
    desc: 'Дворцы и дома творчества, библиотеки, спортшколы, учреждения по делам молодёжи',
    tag: 'ПП № 411',
  },
];

export function Clients() {
  return (
    <section id="clients" className="section-pad bg-white scroll-mt-20">
      <div className="container-x">
        <div className="max-w-3xl">
          <div className="eyebrow">Наши клиенты</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
            Работаем с организациями из 18 категорий по ПП РФ&nbsp;№&nbsp;411
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Типовые заказчики — школы, КДНиЗП, опека, соцзащита, муниципалитеты
            и региональные ведомства СЗФО. Подключение к ГИС обязательно для
            всех участников межведомственного обмена.
          </p>
        </div>

        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GROUPS.map(({ Icon, title, desc, tag }) => (
            <li
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-[var(--color-brand)]/40 hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/15 shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-[var(--color-ink)] leading-tight">
                    {title}
                  </div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider text-[var(--color-brand)] font-bold">
                    {tag}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {desc}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm md:text-base text-slate-700">
            Не нашли свой тип организации? Полный перечень — в&nbsp;ПП&nbsp;РФ&nbsp;№&nbsp;411
            от&nbsp;01.04.2025. Проверим применимость бесплатно.
          </p>
          <a
            href="#contact"
            data-goal="clients-check"
            className="btn-primary whitespace-nowrap"
          >
            Проверить, попадаем&nbsp;ли
          </a>
        </div>
      </div>
    </section>
  );
}
