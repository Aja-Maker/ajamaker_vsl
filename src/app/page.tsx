'use client'
import BenefitsSection from '@/components/BenefitsSection';
import FinalCTASection from '@/components/FinalCTASection';
import Header from '@/components/Header';
import PricingTableSection from '@/components/PricingTableSection';
import VideoSection from '@/components/VideoSection';
import { useState, useEffect } from 'react';

export default function Home() {
  const CTA_TIME =  360; // Tiempo en segundos
  const [timeLeft, setTimeLeft] = useState(CTA_TIME);
  const [ctaEnabled, setCtaEnabled] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCtaEnabled(true);
    }
  }, [timeLeft]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start">
      <VideoSection showButtons={ctaEnabled} />
      <BenefitsSection showButtons={ctaEnabled} />
      {ctaEnabled && (
        <>
          <PricingTableSection />
          <FinalCTASection />
        </>
      )}
    </main>
  );
}
