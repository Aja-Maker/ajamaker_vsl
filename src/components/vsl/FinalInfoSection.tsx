'use client'
import React from 'react';
import Link from 'next/link';

interface FinalInfoSectionProps {
  ctaEnabled: boolean;
  timeLeft: number;
}

const FinalInfoSection: React.FC<FinalInfoSectionProps> = ({ ctaEnabled, timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Format seconds with leading zero if needed
  const formattedTime = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
  return (
    <section className="bg-[#F1F1F1] py-4 flex flex-col items-center px-4">
      <h2 className="text-xl font-bold text-[#1D3557] uppercase text-center mb-2">
        ¿Qué es <span className="text-[#007BFF]">AJAMAKER</span>?
      </h2>
      <div className="max-w-[480px] text-center text-black space-y-2">
        <p className="text-xs">
          <span className="font-extrabold">AJAMAKER</span> es una plataforma <span className="font-bold text-[#1D3557]">integral</span> que combina 
          <span className="font-bold text-[#007BFF]"> formación continua</span>, 
          <span className="font-bold text-[#007BFF]"> ingresos extra</span> y 
          <span className="font-bold text-[#007BFF]"> crecimiento personal</span>. Nuestra misión es ayudarte a mejorar tu vida en tres áreas clave: 
          <span className="font-bold text-[#1D3557]"> salud integral</span>, 
          <span className="font-bold text-[#1D3557]"> paz financiera</span> y 
          <span className="font-bold text-[#1D3557]"> desarrollo personal</span>.
        </p>
        <p className="text-xs">
          Como miembro, accedes a nuestra plataforma educativa <span className="font-extrabold">AFORMATIVO</span>, donde cada semana recibirás sesiones en vivo y cursos diseñados para impulsar tu bienestar y tus finanzas. Además, gracias al sistema <span className="font-bold text-[#007BFF]">MakerCash</span>, podrás ganar dinero con cada compra que realices en negocios afiliados o compras que refieras a otros miembros.
        </p>
        <p className="text-xs">
          <span className="font-extrabold text-sm text-[#e39400]">¡No te pierdas!</span> AJAMAKER está en fase de lanzamiento, y solo los primeros miembros tendrán acceso exclusivo a los primeros negocios, 
          <span className="font-bold text-[#e39400]"> recompensas especiales</span> y 
          <span className="font-bold text-[#e39400]"> beneficios únicos</span> que no estarán disponibles más adelante.
        </p>
      </div>
      {ctaEnabled ? (
        <div className="mt-4">
          <Link
            href="/pay"
            className="inline-block bg-[#E63946] text-white font-bold text-sm py-2 px-4 rounded shadow transition transform hover:scale-105 hover:shadow-2xl text-center leading-normal break-words"
          >
            ✅ Quiero acceder a AJAMAKER y sus bonos exclusivos
          </Link>
        </div>
      ) : (
        <div className="mt-4 text-lg font-bold text-[#007BFF]">
          {formattedTime}
        </div>
      )}
    </section>
  );
};

export default FinalInfoSection;
