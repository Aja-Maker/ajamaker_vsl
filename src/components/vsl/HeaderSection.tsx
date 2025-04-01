'use client'
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-[#1D3557] to-[#1D3557] w-full h-[30vh] flex flex-col justify-center items-center text-center px-4 py-2 mt-18">
      {/* Capa de overlay para dar efecto de profundidad */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10">
        <h1 className="text-xl font-extrabold text-white uppercase transition-all duration-700 ease-in-out animate-fadeIn">
          Descubre cómo transformar tu vida personal y financiera
        </h1>
        <p className="mt-1 text-xs text-white transition-all duration-700 ease-in-out animate-fadeIn delay-200">
          Mira este video exclusivo y conoce la plataforma AJAMAKER que te permite aprender, crecer y generar ingresos extra.
        </p>
      </div>
    </header>
  );
};

export default Header;
