'use client'
import React from 'react';
import CTAButtons from './CTAButtons';

interface VSLSectionProps {
  videoUrl: string;
  ctaEnabled: boolean;
  timeLeft: number;
}

const VSLSection: React.FC<VSLSectionProps> = ({ videoUrl, ctaEnabled, timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Format seconds with leading zero if needed
  const formattedTime = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
  return (
    <section className="bg-white py-4 flex flex-col items-center space-y-4 px-2">
      <div className="w-full max-w-[480px] aspect-video relative">
        <iframe 
          src="https://player.vimeo.com/video/1072331528?h=e1a3cda590&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="clipboard-write; encrypted-media"
          title="VSL_MIEMBROS"
        ></iframe>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-base font-bold text-[#E63946] text-center">
          Esta oferta exclusiva está disponible por tiempo limitado:
        </p>
        {!ctaEnabled && (
          <div className="text-lg font-bold text-[#E63946]">
            {formattedTime}
          </div>
        )}
      </div>
      {ctaEnabled && <CTAButtons />}
    </section>
  );
};

export default VSLSection;
