'use client'
import React, { useState } from 'react';

const InfoForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    question: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí implementa la lógica de envío (por ejemplo, a un API)
    setSubmitted(true);
    // Opcional: redireccionar a WhatsApp con mensaje prellenado
  };

  if (submitted) {
    return (
      <div className="bg-white p-4 mt-4 rounded-lg shadow border border-gray-200 max-w-xs w-full">
        <p className="text-center text-gray-800 font-semibold mb-3">
          🌟 Gracias por tu interés en AJAMAKER. Te contactaremos muy pronto para ayudarte a asegurar tu acceso exclusivo.
        </p>
        <a
          href="https://api.whatsapp.com/send?text=Hola!%20Vi%20el%20video%20de%20AJAMAKER%20y%20tengo%20algunas%20dudas.%20¿Podrías%20ayudarme?"
          className="block mt-3 bg-[#25D366] text-white font-bold py-2 px-4 text-center rounded hover:bg-green-600 transition-colors text-sm"
        >
          Escríbenos ahora por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 mt-4 rounded-lg shadow border border-gray-200 max-w-xs w-full transition-all duration-300">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1 text-sm">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1D3557] transition text-sm"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1 text-sm">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1D3557] transition text-sm"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1 text-sm">
          Número de WhatsApp (opcional)
        </label>
        <input
          type="text"
          name="whatsapp"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1D3557] transition text-sm"
          value={formData.whatsapp}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1 text-sm">
          Pregunta principal (opcional)
        </label>
        <textarea
          name="question"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1D3557] transition text-sm"
          value={formData.question}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#1D3557] text-white font-bold py-2 px-4 rounded hover:bg-[#153e4a] transition-colors text-sm"
      >
        Enviar y recibir ayuda personalizada
      </button>
    </form>
  );
};

export default InfoForm;
