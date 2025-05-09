// app/components/VideoSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import PricingButtons from "./PricingButtons";
import InfoForm from "./vsl/InfoForm";

interface VideoSectionProps {
  showForm: boolean;
}

export default function VideoSection({ showForm }: VideoSectionProps) {
  return (
    <section className="bg-[#F9F7EE] w-full py-8 flex flex-col items-center text-center space-y-4 px-4">
      {/* Top Heading */}
      <h2 className="text-xl font-bold text-[#2C506C] leading-snug max-w-md">
        ¿Sientes que puedes dar más pero <span className="text-[#ED3B26]">algo siempre te detiene</span>?
      </h2>

      {/* Orange-decorated paragraph as an image */}
      <Image
        src="/text_1.svg"
        alt="Transforma tu salud, finanzas y vida sin complicaciones"
        width={300}
        height={60}
        className="w-full max-w-xs"
      />

      {/* Supporting text */}
      <p className="text-sm text-black max-w-xs">
        Haz clic abajo y únete a una comunidad que te impulsa de verdad.
      </p>

      {/* Pricing Buttons */}
      <PricingButtons/>

      {/* Embedded Vimeo Video */}
      <div className="w-full max-w-xs mt-6">
        <iframe
          src="https://player.vimeo.com/video/1082710879?h=771e61491f&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          className="w-full aspect-video rounded-md border border-gray-300"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Conditionally Render Info Form */}
      {showForm && (
        <div className="mt-8 w-full max-w-xs">
          <h3 className="text-xl font-bold text-[#2C506C]">¿Tienes preguntas?</h3>
          <p className="text-sm text-black">¡Nosotros te contactamos!</p>
          <InfoForm />
        </div>
      )}
    </section>
  );
}
