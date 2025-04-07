import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../FormInput';
import PhoneField from '../PhoneField';
import { useState } from 'react';
import { addBrevoContact } from '@/app/actions' 

const infoFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre es requerido')
    .refine(
      (val) => {
        const words = val.trim().split(/\s+/);
        return (
          words.length >= 2 &&
          words.every((w) => /^[A-Z][a-zÀ-ÿ'\-]+$/.test(w))
        );
      },
      {
        message:
          'Debe ingresar al menos nombre y apellido, cada uno iniciando con mayúscula',
      }
    ),
  email: z.string().email('Correo electrónico inválido'),
  whatsapp: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || /^\+?[0-9]{8,15}$/.test(val), {
      message: 'Número de WhatsApp inválido',
    }),
  question: z.string().max(500, 'La pregunta no puede tener más de 500 caracteres').optional(),
});

type InfoFormSchema = z.infer<typeof infoFormSchema>;

const countryOptions = [
  { code: 'AR', name: 'Argentina', dial: '+54' },
  { code: 'BO', name: 'Bolivia', dial: '+591' },
  { code: 'BR', name: 'Brasil', dial: '+55' },
  { code: 'CA', name: 'Canadá', dial: '+1' },
  { code: 'CL', name: 'Chile', dial: '+56' },
  { code: 'CO', name: 'Colombia', dial: '+57' },
  { code: 'CR', name: 'Costa Rica', dial: '+506' },
  { code: 'CU', name: 'Cuba', dial: '+53' },
  { code: 'DO', name: 'República Dominicana', dial: '+1' },
  { code: 'EC', name: 'Ecuador', dial: '+593' },
  { code: 'SV', name: 'El Salvador', dial: '+503' },
  { code: 'GT', name: 'Guatemala', dial: '+502' },
  { code: 'HT', name: 'Haití', dial: '+509' },
  { code: 'HN', name: 'Honduras', dial: '+504' },
  { code: 'JM', name: 'Jamaica', dial: '+1' },
  { code: 'MX', name: 'México', dial: '+52' },
  { code: 'NI', name: 'Nicaragua', dial: '+505' },
  { code: 'PA', name: 'Panamá', dial: '+507' },
  { code: 'PY', name: 'Paraguay', dial: '+595' },
  { code: 'PE', name: 'Perú', dial: '+51' },
  { code: 'PR', name: 'Puerto Rico', dial: '+1' },
  { code: 'US', name: 'Estados Unidos', dial: '+1' },
  { code: 'UY', name: 'Uruguay', dial: '+598' },
  { code: 'VE', name: 'Venezuela', dial: '+58' },
]

export default function InfoFormZod() {
  const handleClick = async () => {
    // Dynamically import react-facebook-pixel on click (client side only)
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.track("Lead");
  };
  const [prefix, setPrefix] = useState('+506');
  const [submitted, setSubmitted] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InfoFormSchema>({
    resolver: zodResolver(infoFormSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: InfoFormSchema) => {
    await handleClick();
    const fullWhatsapp = data.whatsapp ? `${prefix}${data.whatsapp}` : undefined;
  
    const result = await addBrevoContact({
      name: data.name,
      email: data.email,
      whatsapp: fullWhatsapp,
      question: data.question,
    });
  
    if (result.success) {
      setSubmitted(true);
    } else {
      setSnackbarMessage('Error al procesar los datos, contacte a manager@ajamaker.com');
      // Optionally clear the snack bar after 5 seconds
      setTimeout(() => setSnackbarMessage(null), 5000);
    }
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 mt-4 rounded-lg shadow border border-gray-200 max-w-xs w-full transition-all duration-300"
      >
        <div className="mb-4">
          <InputField name="name" label="Nombre *" register={register} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <InputField name="email" label="Email *" type="email" register={register} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <PhoneField
            name="whatsapp"
            value=""
            prefix={prefix}
            onChange={(v:any) => setValue('whatsapp', v)}
            onPrefixChange={setPrefix}
            options={countryOptions}
            register={register}
            error={errors.whatsapp?.message}
            label="Número de WhatsApp (opcional)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1 text-sm">
            Pregunta principal (opcional)
          </label>
          <textarea
            {...register('question')}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1D3557] transition text-sm"
          />
          {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#1D3557] text-white font-bold py-2 px-4 rounded hover:bg-[#153e4a] transition-colors text-sm"
        >
          Enviar y recibir ayuda personalizada
        </button>
      </form>
      {snackbarMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-md text-sm z-50">
          {snackbarMessage}
        </div>
      )}
    </>
  );
}