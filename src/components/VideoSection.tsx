// app/components/VideoSection.tsx
"use client";

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
      {/* Pricing Buttons */}
      {showButtons && (
        <>
          <p className="text-sm text-black max-w-xs">
            Haz clic abajo y únete a una comunidad que te impulsa de verdad.
          </p>

          <PricingButtons/>
        </>
      )}

      {/* Embedded Vimeo Video with Blurry Overlay */}
      <div className="w-full max-w-xs mt-6 relative">
        {isAllowed ? (
          <iframe
            src="https://player.vimeo.com/video/1082710879?h=771e61491f"
            className="w-full aspect-video rounded-md border border-gray-300"
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          // fake placeholder skeleton
          <div className="w-full aspect-video rounded-md border border-gray-300 bg-gray-200 relative overflow-hidden animate-pulse">
            {/* play icon via Iconify */}
            <Icon
              icon="mdi:play-circle-outline"
              className="absolute inset-0 m-auto w-40 h-40 text-black opacity-80"
            />
            {/* faux scrub bar */}
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
