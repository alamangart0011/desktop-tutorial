import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Problem } from '@/components/Problem';
import { SystemBreakdown } from '@/components/SystemBreakdown';
import { Uz2Requirements } from '@/components/Uz2Requirements';
import { TechStack } from '@/components/TechStack';
import { LegalUpdates } from '@/components/LegalUpdates';
import { Glossary } from '@/components/Glossary';
import { Services } from '@/components/Services';
import { Pricing } from '@/components/Pricing';
import { Process } from '@/components/Process';
import { LeadMagnet } from '@/components/LeadMagnet';
import { QuickLead } from '@/components/QuickLead';
import { Reasons } from '@/components/Reasons';
import { Comparison } from '@/components/Comparison';
import { Cases } from '@/components/Cases';
import { Trust } from '@/components/Trust';
import { Reviews } from '@/components/Reviews';
import { Regions } from '@/components/Regions';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { CookieBanner } from '@/components/CookieBanner';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';

const ReadinessCheck = dynamic(
  () => import('@/components/ReadinessCheck').then((m) => m.ReadinessCheck),
);
const Calculator = dynamic(
  () => import('@/components/Calculator').then((m) => m.Calculator),
);
const Faq = dynamic(() => import('@/components/Faq').then((m) => m.Faq));

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <SystemBreakdown />
        <Uz2Requirements />
        <TechStack />
        <LegalUpdates />
        <ReadinessCheck />
        <Calculator />
        <Services />
        <Pricing />
        <Process />
        <LeadMagnet />
        <QuickLead />
        <Reasons />
        <Trust />
        <Comparison />
        <Cases />
        <Reviews />
        <Regions />
        <Glossary />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <ScrollProgress />
      <BackToTop />
      <StickyMobileCta />
      <CookieBanner />
    </>
  );
}
