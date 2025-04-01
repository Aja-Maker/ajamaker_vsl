'use client'
import React from 'react';
import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  extraClasses?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ href, children, extraClasses = '' }) => {
  return (
    <Link
      href={href}
      className={`w-full sm:w-auto bg-[#E63946] text-white font-bold text-base py-2 px-4 rounded shadow transition transform hover:scale-105 hover:shadow-lg ${extraClasses}`}
    >
      {children}
    </Link>
  );
};

export default CTAButton;
