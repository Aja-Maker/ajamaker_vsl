'use client';

import { useEffect } from 'react';
import RightForm from '@/components/makercash/RightForm';

interface AccessFormDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function AccessFormDrawer({ open, onClose }: AccessFormDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute bottom-0 inset-x-0 transform transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white rounded-t-3xl px-4 pt-6 pb-8 shadow-2xl max-h-[92vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs uppercase text-[#94A3B8] tracking-[0.3em]">Reserva tu lugar</p>
              <h3 className="text-lg font-semibold text-[#0F172A]">Formulario de acceso</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white bg-[#0F172A] rounded-full shadow"
            >
              Cerrar
            </button>
          </div>
          <RightForm />
        </div>
      </div>
    </div>
  );
}
