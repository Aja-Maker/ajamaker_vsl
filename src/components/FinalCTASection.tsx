// app/components/FinalCallToAction.tsx
"use client";

import PricingButtons from "./PricingButtons";

export default function FinalCTASection() {
  return (
    <section className="bg-[#FFFDF7] w-full py-8 flex flex-col items-center text-center space-y-4 px-4">
      {/* Call to Action Title */}
      <h2 className="text-2xl font-bold text-[#2C506C] leading-snug">
        ¿ESTÁS LISTA/O PARA <br />
        <span className="text-[#EDBE00]">TRANSFORMAR TU VIDA</span>
        <span className="text-[#2C506C]">?</span>
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-black max-w-[250px]">
        Únete a AJAMAKER y empieza tu transformación hoy.
      </p>

      {/* Pricing Buttons */}
      <PricingButtons />
    </section>
  );
}
