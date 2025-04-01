'use client'
import { useState, useEffect } from 'react';
import FinalInfoSection from "@/components/vsl/FinalInfoSection";
import Header from "@/components/vsl/HeaderSection";
import StickyHeader from "@/components/vsl/Header";
import VSLSection from "@/components/vsl/VSLSection";

export default function Home() {
  const CTA_TIME = 10; // Tiempo en segundos
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
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="relative">
        {/* Sticky header */}
        <StickyHeader ctaEnabled={ctaEnabled} timeLeft={timeLeft} />

        {/* Header inicial */}
        <Header />

        {/* Sección principal de VSL */}
        <VSLSection 
          videoUrl="https://www.youtube.com/embed/tu-video-id" 
          ctaEnabled={ctaEnabled} 
          timeLeft={timeLeft} 
        />

        {/* Bloque final informativo */}
        <FinalInfoSection 
          ctaEnabled={ctaEnabled} 
          timeLeft={timeLeft} 
        />
      </div>
    </main>
  );
}
