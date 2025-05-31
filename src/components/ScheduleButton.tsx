'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function ScheduleButton() {
  const handleClick97 = async () => {
    const ReactPixel = (await import('react-facebook-pixel')).default;

    ReactPixel.track("Lead", {
      value: 97,
      currency: 'USD'
    });

    ReactPixel.track("Purchase", {
      value: 97,
      currency: 'USD'
    });

    setTimeout(() => {
      window.location.href = "https://calendly.com/marvin-solis-ajamaker/30min";
    }, 700);
  };

  return (
    <button
      onClick={handleClick97}
      className="flex items-center justify-center px-4 py-4 bg-[#0097AA] text-white rounded-md text-sm font-semibold max-w-xs w-full transition hover:opacity-90"
    >
      <div className="flex items-center justify-center space-x-5">
        <Icon icon="tabler:calendar-check" width={24} height={24} />
        <div className="flex flex-col items-center">
          <span className="text-[14px] font-semibold">Agenda tu AJAMAKER</span>
          <span className="text-[14px] font-semibold">Asesoría Gratuita</span>
        </div>
        <Image
          src="/icons/calendly.svg"
          alt="Calendly"
          width={40}
          height={40}
          className="ml-2"
        />
      </div>
    </button>
  );
}
