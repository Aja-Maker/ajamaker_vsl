// app/components/PricingButtons.tsx
"use client";

import Link from "next/link";

export default function PricingButtons() {
  const handleClick97 = async () => {
    // Dynamically import react-facebook-pixel on click (client side only)
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.track("Lead", {
      value: 97,
      currency:'USD'
    });
    ReactPixel.track("Purchase", {
      value: 97,
      currency:'USD'
    });
  };
  const handleClick40 = async () => {
    // Dynamically import react-facebook-pixel on click (client side only)
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.track("Lead",{
      value: 40,
      currency:'USD'
    });
    ReactPixel.track("Purchase",{
      value: 40,
      currency:'USD'
    });
  };

  return (
    <div className="flex justify-between gap-2 w-full max-w-xs mx-auto mt-4 items-start">
      {/* Plan Anual */}
      <div className="flex flex-col items-center justify-start w-[48%]">
        <Link
          href="https://buy.onvopay.com/live_5QvIMc3hfI1wSJaNOYPwyVUo8cM"
          onClick={handleClick97}
          className="bg-[#2B4F6C] text-white rounded-lg text-xs font-semibold py-2 w-full text-center transition hover:bg-[#1f3c53]"
        >
          Membresía $97/año
        </Link>
        <p className="text-[11px] text-[#2B4F6C] mt-1 text-center leading-snug">
          Acceso completo
        </p>
      </div>

      {/* Plan en 3 Pagos */}
      <div className="flex flex-col items-center justify-start w-[48%]">
        <Link
          href="https://buy.onvopay.com/live_ehN8yP56qb2Dn62GMtZrghYE5jI"
          className="bg-[#6C6C6C] text-white rounded-lg text-xs font-semibold py-2 w-full text-center transition hover:bg-[#555555]"
          onClick={handleClick40}
        >
          3 pagos de $40/mes
        </Link>
        <p className="text-[11px] text-[#6C6C6C] mt-1 text-center leading-snug">
          Acceso parcial hasta completar el pago completo ($120)
        </p>
      </div>
    </div>
  );
}
