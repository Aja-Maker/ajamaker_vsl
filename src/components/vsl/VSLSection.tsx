'use client'
import React from 'react';
import CTAButtons from './CTAButtons';

interface VSLSectionProps {
  videoUrl: string;
  ctaEnabled: boolean;
  timeLeft: number;
}

const VSLSection: React.FC<VSLSectionProps> = ({ videoUrl, ctaEnabled, timeLeft }) => {
  return (
    <section className="bg-white py-4 flex flex-col items-center space-y-4 px-4">
      <div className="w-full max-w-[480px] aspect-video relative">
        <iframe
          src={videoUrl}
          title="Video VSL"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-md shadow-md"
        ></iframe>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-base font-bold text-[#E63946] text-center">
          Esta oferta exclusiva está disponible por tiempo limitado:
        </p>
        {!ctaEnabled && (
          <div className="text-lg font-bold text-[#E63946]">
            {timeLeft}s
          </div>
        )}
      </div>
      {ctaEnabled && <CTAButtons />}
    </section>
  );
};

export default VSLSection;
