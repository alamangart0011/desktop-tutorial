import Link from 'next/link';
import { BRAND } from '@/components/constants';

export const metadata = {
  title: 'Страница не найдена',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-[var(--color-paper)]">
      <div className="max-w-xl text-center">
        <div className="text-6xl md:text-8xl font-extrabold text-[var(--color-brand)] tracking-tight">
          404
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-[var(--color-ink)]">
          Страница не найдена
        </h1>
        <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
          Запрошенной страницы нет. Возможно, ссылка устарела. Вернитесь на главную страницу
          о подключении к ГИС «Профилактика» или позвоните в {BRAND.shortName}.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-5 py-3 hover:bg-[var(--color-brand-2)] transition"
          >
            На главную
          </Link>
          <a
            href={`tel:${BRAND.phoneRaw}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 text-[var(--color-ink)] font-semibold px-5 py-3 hover:border-[var(--color-brand-2)] transition"
          >
            Позвонить {BRAND.phone}
          </a>
        </div>
      </div>
    </main>
  );
}
