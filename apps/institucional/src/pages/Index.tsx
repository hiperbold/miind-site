import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/home/HeroSection';
import ClientsMarquee from '../components/home/ClientsMarquee';
import SignalsSection from '../components/home/SignalsSection';


import Bu1lderSection from '../components/home/Bu1lderSection';
import MethodologySection from '../components/home/MethodologySection';
import SolutionsSection from '../components/home/SolutionsSection';
import WhyMiindSection from '../components/home/WhyMiindSection';
import VoicesSection from '../components/home/VoicesSection';
import NextStepSection from '../components/home/NextStepSection';
import Footer from '../components/Footer';

import PageTransition from '../components/PageTransition';
import { useSeo } from '../hooks/useSeo';
import { useT } from '@/i18n/useT';

const Index = () => {
  const { t } = useT();
  useSeo({
    title: t('seo.home.title') as string,
    description: t('seo.home.desc') as string,
  });

  useEffect(() => {
    // If we land here with a hash (e.g. /#methodology from another route),
    // wait for sections to mount, then scroll smoothly.
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attempt < 8) {
        setTimeout(() => tryScroll(attempt + 1), 80);
      }
    };
    tryScroll();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen overflow-x-hidden font-sans bg-background text-foreground">
        
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <ClientsMarquee />
          <SignalsSection />

          <SolutionsSection />
          <MethodologySection />
          <Bu1lderSection />

          <WhyMiindSection />
          <VoicesSection />
          <NextStepSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
