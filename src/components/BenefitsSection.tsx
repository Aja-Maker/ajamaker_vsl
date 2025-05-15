// app/components/BenefitsSection.tsx
"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import PricingButtons from "./PricingButtons";

// Reusable BenefitItem Component
function BenefitItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <li className="flex items-start space-x-2">
      <div className="flex-shrink-0">
        <Icon icon={icon} className="text-[#ED7D2B]" width={20} height={20} />
      </div>
      <p className="leading-snug text-left text-[13px]">
        <span className="font-semibold text-[#2DA771]">{title}</span>
        <span className="font-extralight"> {description}</span>
      </p>
    </li>
  );
}

interface BenefitsSectionProps {
  showButtons: boolean;
}

export default function BenefitsSection({ showButtons }: BenefitsSectionProps) {
  return (
    <section className="bg-[#FFFDF7] w-full py-8 flex flex-col items-center text-center space-y-6 px-4">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-[#2C506C] max-w-md leading-snug">
        ¿Qué obtienen los miembros de AJAMAKER?
      </h2>

      {/* Benefits List */}
      <ul className="flex flex-col items-start space-y-3 max-w-md">
        <BenefitItem 
          icon="mdi:check-circle-outline"
          title="Transformación real:"
          description="Más de 21 horas de contenido que puedes aplicar en tu vida desde el primer día."
        />
        <BenefitItem 
          icon="mdi:check-circle-outline"
          title="Guía continua:"
          description="Sesiones en vivo cada semana con expertos que te escuchan y te enseñan."
        />
        <BenefitItem 
          icon="mdi:check-circle-outline"
          title="Comunidad auténtica:"
          description="No estás solo, conectas con personas que también quieren crecer."
        />
        <BenefitItem 
          icon="mdi:check-circle-outline"
          title="Recompensas que suman:"
          description="MakerCash, un sistema de cashback para que tus compras se vuelvan ingresos."
        />
      </ul>

      {/* Image Text */}
      <div className="flex justify-center">
        <Image
          src="/text_2.svg" // Replace with the correct path
          alt="No es solo aprender. Es avanzar juntos."
          width={200} // Adjusted size
          height={40} // Adjusted size
          className="w-auto h-auto max-w-[200px] max-h-[55px]"
        />
      </div>

      {/* Pricing Buttons */}
      {showButtons && (
        <PricingButtons />
      )}
    </section>
  );
}
