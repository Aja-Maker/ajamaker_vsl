'use client'
import React, { useState } from 'react';
import InfoForm from './InfoForm';

const CTAButtons: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(prev => !prev);

  return (
    <div className="flex flex-col items-center mt-4 space-y-4 px-4">
      <a
        href="/pay"
        className="w-full max-w-xs bg-[#E63946] text-white font-bold text-base py-2 px-4 rounded shadow-lg text-center transition transform hover:scale-105 hover:shadow-2xl"
      >
        ✅ Quiero acceder a AJAMAKER y sus bonos exclusivos
      </a>
      <button
        onClick={toggleForm}
        className="w-full max-w-xs bg-[#333333] text-white text-base py-2 px-4 rounded text-center transition transform hover:scale-105 hover:shadow-2xl"
      >
        ❓ Tengo dudas y quiero que me contacten
      </button>
      {showForm && (
        <div className="w-full max-w-xs animate-fadeIn">
          <InfoForm />
        </div>
      )}
    </div>
  );
};

export default CTAButtons;
