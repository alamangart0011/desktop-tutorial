import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { UrgencyTimer } from '@/components/UrgencyTimer';
import { PainTrigger } from '@/components/PainTrigger';
import { Problem } from '@/components/Problem';
import { Uz2Requirements } from '@/components/Uz2Requirements';
import { Offer7Days } from '@/components/Offer7Days';
import { Clients } from '@/components/Clients';
import { Cases } from '@/components/Cases';
import { Pricing } from '@/components/Pricing';
import { MoneyBackGuarantee } from '@/components/MoneyBackGuarantee';
import { Process } from '@/components/Process';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { CookieBanner } from '@/components/CookieBanner';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';
import { HomeJsonLd } from '@/components/HomeJsonLd';
import { ExitIntent } from '@/components/ExitIntent';
import { CallbackWidget } from '@/components/CallbackWidget';

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
        <UrgencyTimer />
        <PainTrigger />
        <Problem />
        <Uz2Requirements />
        <RiskCalc />
        <Offer7Days />
        <Process />
        <Clients />
        <Cases />
        <Pricing />
        <MoneyBackGuarantee />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <ScrollProgress />
      <BackToTop />
      <StickyMobileCta />
      <CookieBanner />
      <ExitIntent />
      <CallbackWidget />
      <HomeJsonLd />
    </>
  );
}
