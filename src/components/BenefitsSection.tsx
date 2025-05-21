'use client';

import Image from "next/image";
import { Icon } from "@iconify/react";
import PricingButtons from "./PricingButtons";

// Sub-benefit line item
function BenefitSubItem({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start space-x-2 text-left">
      <Icon icon={icon} className="text-[#ED7D2B] mt-1 flex-shrink-0" width={16} height={16} />
      <p className="text-[13px] leading-snug text-[#2B4F6C]">{children}</p>
    </li>
  );
}

// Main Benefit item (with check icon) + nested subitems
function BenefitItem({
  title,
  description,
  subitems = [],
}: {
  icon?: string;
  title: string;
  description: string;
  subitems?: React.ReactNode[];
}) {
  return (
    <li className="flex flex-col space-y-2">
      <div className="flex items-start space-x-2">
        <Icon icon="mdi:check-circle-outline" className="text-[#ED7D2B] mt-1 flex-shrink-0" width={20} height={20} />
        <p className="leading-snug text-left text-[13px]">
          <span className="font-semibold text-[#2DA771]">{title}</span>
          <span className="font-extralight text-[#2B4F6C]"> {description}</span>
        </p>
      </div>
      {subitems.length > 0 && <ul className="space-y-1 pl-6">{subitems}</ul>}
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
      <ul className="flex flex-col items-start space-y-5 max-w-md w-full">
        <BenefitItem
          title="Transformación real:"
          description="No solo consumes contenido, te transformas."
          subitems={[
            <BenefitSubItem icon="tdesign:rocket-filled" key="1">
              Descubre cómo <span className="text-[#008CFF] font-semibold">multiplicar tu dinero</span>, <span className="text-[#008CFF] font-semibold">mantener tu salud</span> en su mejor estado y desarrollar <span className="text-[#008CFF] font-semibold">hábitos que te llevan al éxito</span>.
            </BenefitSubItem>,
            <BenefitSubItem icon="hugeicons:computer" key="2">
              Más de <span className="text-[#008CFF] font-semibold">21 horas de contenido práctico</span> que aplicas desde el primer día.
            </BenefitSubItem>,
          ]}
        />

        <BenefitItem
          title="Acompañamiento continuo para avanzar:"
          description="No estás solo."
          subitems={[
            <BenefitSubItem icon="fa6-solid:user-tie" key="1">
              Sesiones en vivo donde <span className="text-[#008CFF] font-semibold">expertos te guían</span>, responden tus preguntas y dan estrategias.
            </BenefitSubItem>,
            <BenefitSubItem icon="fa6-solid:lightbulb" key="2">
              Supera miedos, bloqueos y <span className="text-[#008CFF] font-semibold">creencias limitantes</span> con apoyo directo.
            </BenefitSubItem>,
          ]}
        />

        <BenefitItem
          title="Una comunidad que te impulsa:"
          description="Rodearte de personas que también quieren crecer cambia todo."
          subitems={[
            <BenefitSubItem icon="fa6-solid:handshake-simple" key="1">
              Comparte metas, resuelve dudas y celebra logros.
            </BenefitSubItem>,
            <BenefitSubItem icon="fontisto:world-o" key="2">
              Accede a <span className="text-[#008CFF] font-semibold">Círculos de Apoyo Mutuo</span> donde creces junto a quienes te entienden.
            </BenefitSubItem>,
          ]}
        />

        <BenefitItem
          title="Ingresos adicionales sin esfuerzo:"
          description="Mientras aprendes y creces, tus compras también te recompensan."
          subitems={[
            <BenefitSubItem icon="game-icons:pay-money" key="1">
              MakerCash convierte tus compras en dinero que vuelve a ti.
            </BenefitSubItem>,
          ]}
        />
      </ul>

      {/* Image Text */}
      <div className="flex justify-center">
        <Image
          src="/text_2.svg" // Replace with new visual text image
          alt="No es solo aprender. Es crecer, avanzar y transformar tu vida."
          width={240}
          height={60}
          className="w-auto h-auto max-w-[240px] max-h-[60px]"
        />
      </div>

      {/* Pricing Buttons */}
      {showButtons && <PricingButtons />}
    </section>
  );
}
