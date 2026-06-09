"use client";

import Link from "next/link";

const WA_LINK = "https://chat.whatsapp.com/Bo1egfwyeCxBQ6YW8rRJfj";

interface CTAButtonProps {
  label: string;
  size?: "normal" | "large";
}

export default function CTAButton({ label, size = "normal" }: CTAButtonProps) {
  const handleClick = async () => {
    try {
      const ReactPixel = (await import("react-facebook-pixel")).default;
      ReactPixel.track("Lead", { value: 0, currency: "USD" });
    } catch {}
  };

  const padding = size === "large" ? "px-10 py-5 text-base" : "px-8 py-4 text-sm";

  return (
    <Link
      href={WA_LINK}
      onClick={handleClick}
      className={`inline-block bg-gradient-to-r from-[#F5A623] to-[#E8940A] text-white font-bold ${padding} rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 tracking-wide text-center`}
    >
      {label}
    </Link>
  );
}
