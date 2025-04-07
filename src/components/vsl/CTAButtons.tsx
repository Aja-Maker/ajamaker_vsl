'use client'
import React from 'react';
import InfoForm from './InfoForm';

const CTAButtons: React.FC = () => {
  const handleClick = async () => {
    // Dynamically import react-facebook-pixel on click (client side only)
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.track("Lead");
  };
  return (
    <div className="flex flex-col items-center mt-4 space-y-4 px-0.5">
      <a
        href="/pay"
        onClick={handleClick}
        className="w-full max-w-xs bg-[#E63946] text-white font-bold text-base py-2 px-4 rounded shadow-lg text-center transition transform hover:scale-105 hover:shadow-2xl"
      >
        ✅ Quiero registrarme en AJAMAKER AHORA <br/> (presione aquí)
      </a>
      <div className=" bg-[#333333] text-white text-base py-2 px-4 rounded text-center">
        ❓ Tengo dudas y quiero que me contacten
        <div className="animate-fadeIn bg-white p-4 rounded shadow border border-gray-200 text-black mt-2">
          <InfoForm />
        </div>
      </div>
    </div>
  );
};

export default CTAButtons;
