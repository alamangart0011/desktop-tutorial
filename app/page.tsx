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
import { SeoContent } from '@/components/SeoContent';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { HeroAB } from '@/components/HeroAB';
import { ContextualCta } from '@/components/ContextualCta';
import { BlogTeaser } from '@/components/BlogTeaser';

const RiskCalc = dynamic(
  () => import('@/components/RiskCalc').then((m) => m.RiskCalc),
);
const Faq = dynamic(() => import('@/components/Faq').then((m) => m.Faq));
const CostQuiz = dynamic(
  () => import('@/components/CostQuiz').then((m) => m.CostQuiz),
);
const QuickLead = dynamic(
  () => import('@/components/QuickLead').then((m) => m.QuickLead),
);
const VideoHowItWorks = dynamic(
  () => import('@/components/VideoHowItWorks').then((m) => m.VideoHowItWorks),
);
const Glossary = dynamic(
  () => import('@/components/Glossary').then((m) => m.Glossary),
);

export default function Page() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main id="main">
        <Hero />
        <HeroAB />
        <TrustBar />
        <UrgencyTimer />
        <PainTrigger />
        <Problem />
        <Uz2Requirements />
        <ContextualCta variant="audit" />
        <RiskCalc />
        <CostQuiz />
        <Offer7Days />
        <VideoHowItWorks />
        <Process />
        <Clients />
        <Cases />
        <ContextualCta variant="quiz" />
        <Pricing />
        <QuickLead />
        <MoneyBackGuarantee />
        <Faq />
        <ContextualCta variant="phone" />
        <Glossary />
        <BlogTeaser />
        <SeoContent />
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
