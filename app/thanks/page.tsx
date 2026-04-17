import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/components/constants';

export const metadata: Metadata = {
  title: 'Заявка отправлена',
  description:
    'Заявка с сайта ' + BRAND.name + ' принята. Инженер свяжется в течение рабочего дня.',
  alternates: { canonical: '/thanks' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Заявка отправлена — ' + BRAND.name,
    description: 'Инженер ' + BRAND.shortName + ' свяжется с вами в течение рабочего дня.',
    url: '/thanks',
    siteName: BRAND.name,
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function ThanksPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-[var(--color-paper)]">
      <div className="max-w-xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-accent)] text-white text-3xl font-extrabold">
          ✓
        </div>
        <h1 className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Заявка принята
        </h1>
        <p className="mt-3 text-[var(--color-ink-2)] leading-relaxed">
          Спасибо! Инженер {BRAND.shortName} свяжется с вами в течение рабочего дня. В нерабочее
          время — на следующий рабочий день до 12:00 МСК.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <a
            href={`tel:${BRAND.phoneRaw}`}
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white font-semibold px-5 py-3 hover:bg-[var(--color-brand-2)] transition"
          >
            Позвонить {BRAND.phone}
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 text-[var(--color-ink)] font-semibold px-5 py-3 hover:border-[var(--color-brand-2)] transition"
          >
            На главную
          </Link>
        </div>

        <p className="mt-8 text-xs text-[var(--color-muted)]">
          Если вы не получили подтверждение в течение 30 минут, проверьте папку «Спам» или позвоните
          напрямую — почтовые серверы иногда задерживают первое письмо.
        </p>
      </div>
    </main>
  );
}
