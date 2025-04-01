'use client'
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  initialTime: number; // Tiempo en segundos
}

const Countdown: React.FC<CountdownProps> = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Función para formatear el tiempo (mm:ss)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section className="flex justify-center items-center py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center max-w-sm w-full transform transition duration-500 hover:scale-105">
        <h2 className="text-xl md:text-2xl font-bold text-[#E63946] mb-4">
          Oferta exclusiva por tiempo limitado
        </h2>
        <span className="font-digital text-3xl md:text-4xl font-bold text-[#E63946]">
          {formatTime(timeLeft)}
        </span>
      </div>
    </section>
  );
};

export default Countdown;
