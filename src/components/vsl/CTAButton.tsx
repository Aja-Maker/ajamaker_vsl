'use client';

import type { ButtonHTMLAttributes } from 'react';

type CTAButtonVariant = 'gradient' | 'light' | 'dark';

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  fullWidth?: boolean;
  variant?: CTAButtonVariant;
}

export default function CTAButton({
  label = 'OBTENER ACCESO',
  fullWidth = true,
  variant = 'gradient',
  className = '',
  ...props
}: CTAButtonProps) {
  const variants: Record<CTAButtonVariant, string> = {
    gradient:
      'bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#6366F1] text-white shadow-lg shadow-[#EC4899]/40',
    light: 'bg-white text-[#0F172A] border border-white/60 shadow-lg shadow-white/40',
    dark: 'bg-[#0F172A] text-white shadow-lg shadow-[#0F172A]/40',
  };

  return (
    <button
      {...props}
      className={`${
        fullWidth ? 'w-full' : ''
      } flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-wide uppercase py-3 transition-transform
        active:scale-95 ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
