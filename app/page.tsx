import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Achievements } from '@/components/Achievements';
import { Problem } from '@/components/Problem';
import { SystemBreakdown } from '@/components/SystemBreakdown';
import { Uz2Requirements } from '@/components/Uz2Requirements';
import { TechStack } from '@/components/TechStack';
import { Audience } from '@/components/Audience';
import { Integrations } from '@/components/Integrations';
import { LegalUpdates } from '@/components/LegalUpdates';
import { Methodology } from '@/components/Methodology';
import { Team } from '@/components/Team';
import { MidCta } from '@/components/MidCta';
import { Guarantees } from '@/components/Guarantees';
import { Glossary } from '@/components/Glossary';
import { DocLinks } from '@/components/DocLinks';
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
import { SectionRail } from '@/components/SectionRail';
import { HomeJsonLd } from '@/components/HomeJsonLd';
import { Reveal } from '@/components/Reveal';

const ReadinessCheck = dynamic(
  () => import('@/components/ReadinessCheck').then((m) => m.ReadinessCheck),
);
const Calculator = dynamic(
  () => import('@/components/Calculator').then((m) => m.Calculator),
);
const RiskCalc = dynamic(
  () => import('@/components/RiskCalc').then((m) => m.RiskCalc),
);
const Faq = dynamic(() => import('@/components/Faq').then((m) => m.Faq));

export default function Page() {
  return (
    <>
      <Header />
      <main>
        {/* 1. Hook: оффер и сигналы срочности */}
        <Hero />
        <Stats />

        {/* 2. Боль и квалификация аудитории */}
        <Reveal><Problem /></Reveal>
        <Reveal><Audience /></Reveal>

        {/* 3. Разбор системы и нормативка */}
        <Reveal><SystemBreakdown /></Reveal>
        <Reveal><Uz2Requirements /></Reveal>
        <Reveal><TechStack /></Reveal>
        <Reveal><Integrations /></Reveal>
        <Reveal><LegalUpdates /></Reveal>

        {/* 4. Первый мощный CTA + калькулятор штрафа */}
        <Reveal><RiskCalc /></Reveal>
        <Reveal><MidCta /></Reveal>

        {/* 5. Доверие и экспертиза (БЛОК «Почему мы») */}
        <Reveal><Reasons /></Reveal>
        <Reveal><Methodology /></Reveal>
        <Reveal><Trust /></Reveal>
        <Reveal><Team /></Reveal>
        <Reveal><Achievements /></Reveal>

        {/* 6. Социальное доказательство */}
        <Reveal><Reviews /></Reveal>
        <Reveal><Cases /></Reveal>
        <Reveal><Comparison /></Reveal>

        {/* 7. Услуги, цена, гарантии — покупка */}
        <Reveal><Services /></Reveal>
        <Reveal><Pricing /></Reveal>
        <Reveal><Guarantees /></Reveal>
        <Reveal><Process /></Reveal>

        {/* 8. Интерактивные лид-магниты */}
        <Reveal><ReadinessCheck /></Reveal>
        <Reveal><Calculator /></Reveal>
        <Reveal><LeadMagnet /></Reveal>
        <Reveal><QuickLead /></Reveal>

        {/* 9. География и справочники (SEO + long-tail) */}
        <Reveal><Regions /></Reveal>
        <Reveal><Glossary /></Reveal>
        <Reveal><DocLinks /></Reveal>
        <Reveal><Faq /></Reveal>

        {/* 10. Финальный CTA — форма заявки */}
        <ContactForm />
      </main>
      <Footer />
      <ScrollProgress />
      <SectionRail />
      <BackToTop />
      <StickyMobileCta />
      <CookieBanner />
      <HomeJsonLd />
    </>
  );
}
