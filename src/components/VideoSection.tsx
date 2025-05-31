'use client';

import Image from "next/image";
import PricingButtons from "./PricingButtons";
import ScheduleButton from "./ScheduleButton";

interface VideoSectionProps {
  showButtons: boolean;
}

export default function VideoSection({ showButtons }: VideoSectionProps) {
  return (
    <section className="bg-[#F9F7EE] w-full py-8 flex flex-col items-center text-center space-y-6 px-4">
      {/* Heading */}
      <h2 className="text-xl font-bold text-[#2C506C] leading-snug max-w-md">
        ¿Sientes que podrías estar ganando más, viviendo mejor, pero <span className="text-[#ED3B26]">no sabes por dónde empezar</span>?
      </h2>

      {/* Orange-underlined text image */}
      <Image
        src="/text_1.svg"
        alt="desbloquea tu verdadero potencial"
        width={300}
        height={60}
        className="w-full max-w-xs"
      />

      {/* Calendly Button */}
      <ScheduleButton />

      {/* Features */}
      <div className="flex justify-between items-start gap-4 max-w-xs w-full">
        <div className="flex flex-col items-center text-[#2B4F6C] text-xs w-1/3">
          <Image src="/icons/plant.svg" alt="Energía" width={32} height={32} />
          <p className="mt-2 leading-tight">Imagina despertar con energía, claridad y confianza.</p>
        </div>
        <div className="flex flex-col items-center text-[#2B4F6C] text-xs w-1/3">
          <Image src="/icons/money.svg" alt="Dinero" width={32} height={32} />
          <p className="mt-2 leading-tight">Tener control de tu dinero y ver cómo crece.</p>
        </div>
        <div className="flex flex-col items-center text-[#2B4F6C] text-xs w-1/3">
          <Image src="/icons/world.svg" alt="Comunidad" width={32} height={32} />
          <p className="mt-2 leading-tight text-center">Conectar con personas que te inspiran y te apoyan.</p>
        </div>
      </div>

      {/* CTA Text and Pricing */}
      {showButtons && (
        <>
          <p className="text-sm text-black max-w-xs">
            Haz clic abajo y únete a una comunidad que te impulsa de verdad.
          </p>
          <PricingButtons />
        </>
      )}

      {/* Embedded Vimeo Video */}
      <div className="w-full max-w-xs relative">
        <iframe
          src="https://player.vimeo.com/video/1086211660?h=ffea09936a&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          className="w-full aspect-video rounded-md border border-gray-300"
          allow="autoplay; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
