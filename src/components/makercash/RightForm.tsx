'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessLeadSchema, BusinessLead } from '@/lib/makercash/business_lead_schema';
import { countryOptions } from '@/components/vsl/InfoForm';
import FakeCalendar from '@/components/makercash/FakeCalendar';
import PhoneField from '@/components/PhoneField';
import { submitLead } from '@/app/makercash/actions';

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
      ReactPixel.track("Lead", {
        value: 0,
        currency:'USD'
      });
    }

    setTimeout(() => setSnackbar(null), 5000); // Hide after 5s
  };

  return (
    <div className="space-y-6 relative">
      <section className="bg-white p-4 md:p-6 rounded-xl shadow-[0px_2px_10px_2px_rgba(0,_0,_0,_0.1)] w-full max-w-sm mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-xs font-light text-gray-700">Nombre *</label>
            <input
              {...register('firstName')}
              id="firstName"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5"
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-xs font-light text-gray-700">Apellido *</label>
            <input
              {...register('lastName')}
              id="lastName"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5"
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-light text-gray-700">Correo electrónico *</label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <PhoneField
            name="phone"
            label="Número de WhatsApp (para comunicación directa, no enviamos spam) *"
            value=""
            onChange={(val) => setValue('phone', val)}
            prefix={prefix}
            onPrefixChange={(val) => setPrefix(val)}
            options={countryOptions}
            error={errors.phone?.message}
            register={register}
          />

          {/* Business Name */}
          <div>
            <label htmlFor="businessName" className="block text-xs font-light text-gray-700">Nombre del negocio *</label>
            <input
              {...register('businessName')}
              id="businessName"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5"
            />
            {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName.message}</p>}
          </div>

          {/* Session */}
          <div>
            <label htmlFor="session" className="block text-xs font-light text-gray-700">Elige tu sesión *</label>
            <select
              {...register('session')}
              id="session"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5"
            >
              <option value="">Selecciona una opción</option>
              <option value="jul30">Miércoles 30 de julio, 3 PM</option>
              <option value="aug6">Miércoles 6 de agosto, 3 PM</option>
            </select>
            {errors.session && <p className="text-xs text-red-500 mt-1">{errors.session.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-light py-1.5 rounded-md transition"
          >
            Reservar mi espacio
          </button>
        </form>
      </section>

      {/* Calendar */}
      <FakeCalendar />

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
