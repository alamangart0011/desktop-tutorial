import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Problem } from '@/components/Problem';
import { SystemBreakdown } from '@/components/SystemBreakdown';
import { Uz2Requirements } from '@/components/Uz2Requirements';
import { ReadinessCheck } from '@/components/ReadinessCheck';
import { Services } from '@/components/Services';
import { Pricing } from '@/components/Pricing';
import { Process } from '@/components/Process';
import { Reasons } from '@/components/Reasons';
import { Cases } from '@/components/Cases';
import { Faq } from '@/components/Faq';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

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
        <Services />
        <Pricing />
        <Process />
        <Reasons />
        <Cases />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
