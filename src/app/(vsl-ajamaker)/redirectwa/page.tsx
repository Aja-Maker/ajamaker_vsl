'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ScheduleButton from '@/components/ScheduleButton';
import { Icon } from '@iconify/react';

export default function BridgePage() {
  const [counter, setCounter] = useState(20); // default to 10 for testing

  useEffect(() => {
    const interval = setInterval(async () => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          // Fire Meta Pixel first
          (async () => {
            const ReactPixel = (await import('react-facebook-pixel')).default;
            ReactPixel.track("Lead", {
              value: 97,
              currency: 'USD',
            });
            ReactPixel.track("Purchase", {
              value: 97,
              currency: 'USD',
            });

            // Redirect after short delay
            setTimeout(() => {
              window.location.href =
                'https://wa.me/50684040433?text=%C2%A1Hola!%20Vi%20el%20video%20de%20AJAMAKER%20y%20me%20interesa%20saber%20m%C3%A1s.%20%F0%9F%98%8A';
            }, 400); // enough time to send pixel
          })();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-[#F9F7EE] min-h-screen flex flex-col items-center text-center">

      {/* Logo */}
      <Image
        src="/g8.svg"
        alt="AJAMAKER Logo"
        width={96}
        height={96}
        className="mb-4"
      />

      {/* Text Block */}
      <div className="flex flex-col space-y-4 text-[#2C506C] text-sm max-w-xs w-full">
        {[
          {
            icon: 'mdi:chat-outline',
            text: (
              <>
                <strong>Un momento...</strong> estamos redirigiéndote a WhatsApp para que hables con tu asesor personal de AJAMAKER.
              </>
            ),
          },
          {
            icon: 'mdi:check-circle-outline',
            text: <>Es una conversación directa, rápida y sin compromisos.</>,
          },
          {
            icon: 'mdi:clock-outline',
            text: (
              <>
                En <strong>{counter} segundos</strong>, se abrirá tu app de WhatsApp automáticamente.
              </>
            ),
          },
        ].map(({ icon, text }, idx) => (
          <div key={idx} className="flex items-center gap-3 w-full">
            <Icon icon={icon} className="w-5 h-5 text-[#2C506C] flex-shrink-0" />
            <p className="leading-snug">{text}</p>
          </div>
        ))}
      </div>

      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-[#2C506C] border-t-transparent rounded-full animate-spin my-6" />

      {/* Alternate Option */}
      <div className="flex flex-col items-center text-[#2C506C] space-y-1 mb-4">
        <strong className="text-sm">O</strong>
        <p className="text-sm font-medium flex items-center gap-1">
          puedes agendar una reunión acá si prefieres
          <Icon icon="mdi:arrow-down" className="w-[18px] h-[18px]" />
        </p>
      </div>

      {/* CTA Button */}
      <ScheduleButton />

      <p className="text-sm text-[#2C506C] mt-4">
        O puedes ver el video{' '}
        <a
          href="/"
          className="underline text-[#2C506C] font-medium hover:text-[#1e3a54] transition"
        >
          aquí
        </a>
      </p>
    </main>
  );
}
