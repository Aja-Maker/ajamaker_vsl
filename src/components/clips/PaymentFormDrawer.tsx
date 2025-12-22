'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface PaymentFormDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function PaymentFormDrawer({ open, onClose, title = 'Completa tu acceso', children }: PaymentFormDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        className={`absolute inset-x-0 bottom-0 transform transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-[#0B0E16] text-white rounded-t-3xl px-4 pt-6 pb-8 shadow-2xl max-h-[92vh] overflow-y-auto border border-[#111827]">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-[#FACC15]">PAGO SEGURO CON <a href='https://onvopay.com' className='underline text-blue-600'>ONVO PAY</a></p>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
