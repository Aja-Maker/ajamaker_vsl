// app/components/Header.tsx
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="bg-[#FFFDF7] flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <Image
          src="/g8.svg" // Make sure to put this in your public folder or correct path
          alt="Ajamaker Logo"
          width={50}
          height={50}
        />
        <h1 className="text-[#2B4F6C] font-light text-2xl">Descubre AJAMAKER</h1>
      </div>
    </header>
  );
}
