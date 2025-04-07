'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  ctaEnabled: boolean;
  timeLeft: number;
}

const Header: React.FC<HeaderProps> = ({ ctaEnabled, timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Format seconds with leading zero if needed
  const formattedTime = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-2 py-2 bg-white shadow">
      {/* Logo sin texto */}
      <div className="relative w-30 h-30 flex-shrink-0 -my-9">
        <Image 
          src="/g8.svg" 
          alt="AJAMAKER Logo"
          fill
          className="object-contain"
        />
      </div>
      {ctaEnabled ? (
        <Link
          href="/pay"
          className="inline-block bg-[#E63946] text-white font-bold text-xs py-1 px-2 rounded shadow transition transform hover:scale-105 hover:shadow-lg"
        >
          ✅ Quiero registrarme
        </Link>
      ) : (
        <div className="text-[#1D3557] font-bold text-xs">
          Beneficios en: {formattedTime}
        </div>
      )}
    </div>
  );
};

export default Header;
