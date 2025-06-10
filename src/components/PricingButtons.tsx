// app/components/PricingButtons.tsx
"use client";

import Link from "next/link";

export default function PricingButtons() {
  const handleClick97 = async () => {
    // Dynamically import react-facebook-pixel on click (client side only)
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.track("Lead", {
      value: 297,
      currency:'USD'
    });
    ReactPixel.track("Purchase", {
      value: 297,
      currency:'USD'
    });
  };
  const handleClick40 = async () => {
    // Dynamically import react-facebook-pixel on click (client side only)
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.track("Lead",{
      value: 225,
      currency:'USD'
    });
    ReactPixel.track("Purchase",{
      value: 225,
      currency:'USD'
    });
  };

  return (
    <div className="flex justify-between gap-2 w-full max-w-xs mx-auto mt-4 items-start animate-pulse">
      {/* Plan Anual */}
      <div className="flex flex-col items-center justify-start w-[48%]">
        <Link
          href="https://buy.onvopay.com/live_x9b_2nrvF_BSfz_gpQXm2ejVAP4"
          onClick={handleClick97}
          className="bg-[#2B4F6C] text-white rounded-lg text-xs font-semibold py-2 w-full text-center transition hover:bg-[#1f3c53]"
        >
          Membresía $297/año
        </Link>
        <p className="text-[11px] text-[#2B4F6C] mt-1 text-center leading-snug">
          Acceso completo 65% de descuento
        </p>
      </div>

      {/* Plan en Pagos */}
      <div className="flex flex-col items-center justify-start w-[48%]">
        <Link
          href="https://buy.onvopay.com/live_7Lp3oaLX2WRmaA4t-wGWKxTxFPk"
          className="bg-[#6C6C6C] text-white rounded-lg text-xs font-semibold py-2 w-full text-center transition hover:bg-[#555555]"
          onClick={handleClick40}
        >
          $225/año + $19/mes
        </Link>
        <p className="text-[11px] text-[#6C6C6C] mt-1 text-center leading-snug">
          Acceso parcial hasta completar el pago completo ($453)
        </p>
      </div>
    </div>
  );
}
