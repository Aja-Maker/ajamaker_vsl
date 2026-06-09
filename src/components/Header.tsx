// To use the logo image, save it as /public/logo-vitalidad.png and uncomment the Image tag below.
import React from "react";

export default function Header() {
  return (
    <header className="bg-white border-b border-[#5BC8F5]/30 w-full flex items-center justify-center py-4 px-6">
      <div className="flex flex-col items-center space-y-1">
        {/* Uncomment when logo-vitalidad.png is added to /public:
        <Image src="/logo-vitalidad.png" alt="Seminario Vitalidad" width={120} height={120} />
        */}
        <span className="text-[10px] font-semibold tracking-[0.2em] text-[#7CB342] uppercase">
          Aformativo University
        </span>
        <span className="text-[#0D47A1] font-bold text-lg tracking-wide uppercase">
          Seminario Vitalidad
        </span>
      </div>
    </header>
  );
}
