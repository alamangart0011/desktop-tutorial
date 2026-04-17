import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Problem } from '@/components/Problem';
import { Uz2Requirements } from '@/components/Uz2Requirements';
import { Pricing } from '@/components/Pricing';
import { Process } from '@/components/Process';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { CookieBanner } from '@/components/CookieBanner';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';
import { HomeJsonLd } from '@/components/HomeJsonLd';
import { ExitIntent } from '@/components/ExitIntent';

const RiskCalc = dynamic(
  () => import('@/components/RiskCalc').then((m) => m.RiskCalc),
);
const Faq = dynamic(() => import('@/components/Faq').then((m) => m.Faq));

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <Problem />
        <Uz2Requirements />
        <RiskCalc />
        <Process />
        <Pricing />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <ScrollProgress />
      <BackToTop />
      <StickyMobileCta />
      <CookieBanner />
      <ExitIntent />
      <HomeJsonLd />
    </>
  );
}
