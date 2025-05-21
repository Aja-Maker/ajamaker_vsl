'use client';

import Image from "next/image";
import { Icon } from '@iconify/react';
import PricingButtons from "./PricingButtons";
import InfoForm from "./vsl/InfoForm";
import { useState } from "react";

interface VideoSectionProps {
  showButtons: boolean;
}

export default function VideoSection({ showButtons }: VideoSectionProps) {
  const [isAllowed, setIsAllowed] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const handleOverlayClick = () => setShowFormModal(true);
  const handleFormSuccess = () => {
    setShowFormModal(false);
    setIsAllowed(true);
  };

  return (
    <section className="bg-[#F9F7EE] w-full py-8 flex flex-col items-center text-center space-y-6 px-4">
      {/* Top Heading */}
      <h2 className="text-xl font-bold text-[#2C506C] leading-snug max-w-md">
        ¿Sientes que puedes dar más pero <span className="text-[#ED3B26]">algo siempre te detiene</span>?
      </h2>

      {/* Replaced orange-underlined paragraph with image */}
      <Image
        src="/text_1.svg"
        alt="desbloquea tu verdadero potencial"
        width={300}
        height={60}
        className="w-full max-w-xs"
      />

      {/* Feature Icons and Descriptions */}
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

      {/* Embedded Vimeo Video with Blurry Overlay */}
      <div className="w-full max-w-xs relative">
        {isAllowed ? (
          <iframe
            src="https://player.vimeo.com/video/1086211660?h=ffea09936a&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            className="w-full aspect-video rounded-md border border-gray-300"
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-video rounded-md border border-gray-300 bg-gray-200 relative overflow-hidden animate-pulse">
            <Icon
              icon="mdi:play-circle-outline"
              className="absolute inset-0 m-auto w-40 h-40 text-black opacity-80"
            />
            <div className="absolute bottom-2 left-2 right-2 h-1 bg-black rounded-full"></div>
          </div>
        )}

        {!isAllowed && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md backdrop-blur-sm bg-opacity-40">
            <button
              onClick={handleOverlayClick}
              className="bg-[#ED7D2B] text-white rounded-lg text-xs font-semibold py-2 px-3 transition hover:bg-[#ed6f2b]"
            >
              ¡Quiero ver el video!
            </button>
          </div>
        )}
      </div>

      {showFormModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-opacity-50"
          onClick={() => setShowFormModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-xs w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-2 right-2 text-gray-500 text-xl"
            >
              &times;
            </button>
            <InfoForm onSubmitSuccess={handleFormSuccess} />
          </div>
        </div>
      )}
    </section>
  );
}
