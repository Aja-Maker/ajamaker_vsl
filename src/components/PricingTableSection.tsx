// app/components/PricingTableSection.tsx
"use client";

import Image from "next/image";

export default function PricingTableSection() {
  return (
    <section className="bg-[#F9F7EE] w-full py-8 flex flex-col items-center text-center space-y-4 px-4">
      {/* Title */}
      <h2 className="text-[17px] font-semibold text-[#2C506C] leading-snug">
        VALOR REAL DE TODO LO QUE RECIBES: <br />
        <span className="text-[#ED3B26] text-[17px]">$2970 USD</span>
      </h2>

      {/* Discounted Price */}
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-bold text-[#2B4F6C]">
          HOY SOLO: <span className="text-[#2DA771]">$297 USD</span>
        </h3>
        <p className="text-sm font-bold text-black">(Acceso completo)</p>
        <p className="text-sm font-light text-black mt-1 max-w-[300px]">
          O $97 USD al año y mensualidad de $19 si prefieres empezar poco a poco.
        </p>
      </div>

      {/* Pricing Table Image */}
      <div className="flex justify-center mt-4">
        <Image
          src="/pricing_table.svg" // Make sure this path is correct
          alt="Pricing Table"
          width={2500} // Adjusted for good scaling
          height={1800}
          className="w-full max-w-[400px] h-auto"
        />
      </div>

      {/* Final Text Image */}
      <div className="flex justify-center">
        <Image
          src="/text_3.svg" // Replace with the correct path for the final text image
          alt="Accede a tu transformación por menos de lo que cuesta un café al día."
          width={300}
          height={40}
          className="w-auto h-auto max-w-[500px] max-h-[50px]"
        />
      </div>
    </section>
  );
}
