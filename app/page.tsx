import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Problem } from '@/components/Problem';
import { SystemBreakdown } from '@/components/SystemBreakdown';
import { Uz2Requirements } from '@/components/Uz2Requirements';
import { ReadinessCheck } from '@/components/ReadinessCheck';
import { Calculator } from '@/components/Calculator';
import { Services } from '@/components/Services';
import { Pricing } from '@/components/Pricing';
import { Process } from '@/components/Process';
import { QuickLead } from '@/components/QuickLead';
import { Reasons } from '@/components/Reasons';
import { Comparison } from '@/components/Comparison';
import { Cases } from '@/components/Cases';
import { Trust } from '@/components/Trust';
import { Reviews } from '@/components/Reviews';
import { Faq } from '@/components/Faq';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { StickyMobileCta } from '@/components/StickyMobileCta';

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
        <ReadinessCheck />
        <Calculator />
        <Services />
        <Pricing />
        <Process />
        <QuickLead />
        <Reasons />
        <Trust />
        <Comparison />
        <Cases />
        <Reviews />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
