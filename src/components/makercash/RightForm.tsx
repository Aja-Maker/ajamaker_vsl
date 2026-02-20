'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessLeadSchema, BusinessLead } from '@/lib/makercash/business_lead_schema';
import { countryOptions } from '@/components/vsl/InfoForm';
import PhoneField from '@/components/PhoneField';
import { submitLead } from '@/app/seminario/actions';

const REDIRECT_WHATSAPP_LINK = 'https://chat.whatsapp.com/G8bIRfVSe99GvfoM8XDVj0'

export default function RightForm() {
  const [prefix, setPrefix] = useState('+506');
  const [snackbar, setSnackbar] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BusinessLead>({
    resolver: zodResolver(businessLeadSchema),
    defaultValues: {
      businessName: 'Seminario Salud Integral',
      session: 'first',
    },
  });

  const onSubmit = async (data: BusinessLead) => {
    const fullPhone = `${prefix}${data.phone}`;
    const fullData = { ...data, phone: fullPhone };

    const result = await submitLead(fullData);

    if (!result.success) {
      setSnackbar({ type: 'error', message: result.error || 'Error al registrar. Intenta nuevamente.' });
    } else {
      setSnackbar({ type: 'success', message: '✅ Te has registrado exitosamente al webinar.' });
      reset();
      const ReactPixel = (await import("react-facebook-pixel")).default;
      ReactPixel.track("Purchase", {
        value: 30,
        currency:'USD'
      });
      window.location.href = REDIRECT_WHATSAPP_LINK;
    }

    setTimeout(() => setSnackbar(null), 5000); // Hide after 5s
  };

  return (
    <div className="space-y-4 relative">
      <section className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="text-sm text-[#475569]">
            Completá tus datos para recibir toda la información del Seminario Salud Integral directamente en tu WhatsApp y correo.
          </p>
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold text-[#334155] uppercase tracking-wide">
              Nombre *
            </label>
            <input
              {...register('firstName')}
              id="firstName"
              className="mt-1 block w-full rounded-xl border border-[#CBD5F5] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              placeholder="Tu nombre"
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold text-[#334155] uppercase tracking-wide">
              Apellido *
            </label>
            <input
              {...register('lastName')}
              id="lastName"
              className="mt-1 block w-full rounded-xl border border-[#CBD5F5] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              placeholder="Tu apellido"
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-[#334155] uppercase tracking-wide">
              Correo electrónico *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="mt-1 block w-full rounded-xl border border-[#CBD5F5] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <PhoneField
            name="phone"
            label="Número de WhatsApp (para confirmar tu acceso) *"
            value=""
            onChange={(val) => setValue('phone', val)}
            prefix={prefix}
            onPrefixChange={(val) => setPrefix(val)}
            options={countryOptions}
            error={errors.phone?.message}
            register={register}
          />

          <input type="hidden" {...register('businessName')} />
          <input type="hidden" {...register('session')} />

          <button
            type="submit"
            className="w-full rounded-full bg-[#0F172A] text-white font-semibold uppercase tracking-wide py-3 text-sm shadow-md shadow-[#0F172A]/25"
          >
            Reservar mi acceso
          </button>

          <p className="text-[11px] text-[#94A3B8] text-center">
            Nunca compartimos tus datos. Recibirás recordatorios y el enlace privado del evento.
          </p>
        </form>
      </section>

      {/* Snackbar */}
      {snackbar && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-md text-sm text-white transition
            ${snackbar.type === 'success' ? 'bg-green-600' : 'bg-red-500'}
          `}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
}
