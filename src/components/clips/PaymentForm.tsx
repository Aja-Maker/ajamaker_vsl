'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  confirmPaymentIntent,
  createCardPaymentMethod,
  createFixedIntent,
  createOnvoClient,
  getPaymentIntent,
  sendNotificationEmail,
} from '@/app/clips/actions';

const paymentSchema = z.object({
  name: z.string().min(2, 'Nombre requerido').trim(),
  email: z.string().email('Correo inválido').trim(),
  country: z.string().min(2, 'País requerido').trim(),
  address: z.string().min(4, 'Dirección requerida').trim(),
  phone: z.string().optional().default(''),
  city: z.string().optional().default(''),
  postalCode: z.string().optional().default(''),
  state: z.string().optional().default(''),
  cardNumber: z
    .string()
    .min(12, 'Tarjeta inválida')
    .transform((v) => v.replace(/\s+/g, '')),
  expDate: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2}|\d{4})$/, 'Formato inválido (MM / AA)'),
  cvv: z.string().min(3, 'CVC inválido').trim(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const PRODUCT_PRICE = 4000; // cents USD (server-enforced)

const countries = [
  { value: 'US', label: 'Estados Unidos' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'MX', label: 'México' },
  { value: 'CO', label: 'Colombia' },
  { value: 'AR', label: 'Argentina' },
  { value: 'CL', label: 'Chile' },
  { value: 'PE', label: 'Perú' },
  { value: 'PA', label: 'Panama' },
  { value: 'ES', label: 'España' },
  { value: 'GB', label: 'Reino Unido' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'DO', label: 'República Dominicana' },
  { value: 'JM', label: 'Jamaica' },
];

declare global {
  interface Window {
    ONVO?: any;
  }
}

export default function PaymentForm({ onSuccess }: { onSuccess?: (intentId: string) => void }) {
  const [loading, setLoading] = useState(false);

  const loadOnvoSdk = async () => {
    if (typeof window === 'undefined') return false;
    if (window.ONVO) return true;

    const existing = document.querySelector(`script[src="https://js.onvopay.com/v1/"]`) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === 'true') return !!window.ONVO;
      return new Promise<boolean>((resolve) => {
        existing.addEventListener('load', () => resolve(!!window.ONVO), { once: true });
        existing.addEventListener('error', () => resolve(false), { once: true });
      });
    }

    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://js.onvopay.com/v1/';
      script.async = true;
      script.dataset.loaded = 'false';
      script.onload = () => {
        script.dataset.loaded = 'true';
        resolve(!!window.ONVO);
      };
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  };

  const defaultValues = useMemo<PaymentFormValues>(
    () => ({
      name: '',
      email: '',
      country: 'US',
      address: '',
      phone: '',
      city: '',
      postalCode: '',
      state: '',
      cardNumber: '',
      expDate: '',
      cvv: '',
    }),
    []
  );

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  const getReturnUrl = () => {
    if (typeof window !== 'undefined') {
      try {
        return new URL('https://landing.ajamaker.com').toString();
      } catch {
        // fall through to env
      }
    }
    const envUrl = 'https://landing.ajamaker.com';
    return envUrl && /^https?:\/\//.test(envUrl) ? envUrl : undefined;
  };

  const handle3DS = async (paymentIntentId: string) => {
    const sdkReady = await loadOnvoSdk();
    if (!sdkReady || !window.ONVO) {
      toast.error('No se pudo cargar la verificación 3DS, por favor intenta nuevamente.');
      return { status: 'requires_action' as const };
    }
    const onvo = window.ONVO(process.env.NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY || '');
    const result = await onvo.handleNextAction({ paymentIntentId });
    if (result?.error) {
      toast.error(result.error.message || 'Falló la autenticación 3DS');
      return { status: 'requires_payment_method' as const };
    }
    return result.paymentIntent as { status: string };
  };

  const onSubmit = async (values: PaymentFormValues) => {
    setLoading(true);
    toast.dismiss();
    try {
      const [expMonthRaw, expYearRaw] = values.expDate.split('/').map((v) => v.trim());
      const expMonth = Number(expMonthRaw);
      const expYear = Number(expYearRaw.length === 2 ? `20${expYearRaw}` : expYearRaw);

      const clientRes = await createOnvoClient({
        name: values.name,
        email: values.email,
        phone: values.phone || '+10000000000',
        address: {
          city: values.city || 'N/A',
          country: values.country,
          postalCode: values.postalCode || '00000',
          state: values.state || 'N/A',
        },
      });
      if (clientRes.error || !clientRes.data?.id) throw new Error(clientRes.error || 'Error al crear el cliente');

      const pmRes = await createCardPaymentMethod({
        customerId: clientRes.data.id,
        card: {
          number: values.cardNumber,
          expMonth,
          expYear,
          cvv: values.cvv,
          holderName: values.name,
        },
      });
      if (pmRes.error || !pmRes.data?.id) throw new Error(pmRes.error || 'Error con el método de pago');

      const intentRes = await createFixedIntent({
        customerId: clientRes.data.id,
        description: 'Luxury Reels Pack',
        metadata: { email: values.email },
      });
      if (intentRes.error || !intentRes.data?.id) throw new Error(intentRes.error || 'Error con el intento de pago');

      const confirmRes = await confirmPaymentIntent({
        paymentIntentId: intentRes.data.id,
        paymentMethodId: pmRes.data.id,
        returnUrl: getReturnUrl(),
      });
      if (confirmRes.error || !confirmRes.data) throw new Error(confirmRes.error || 'Error confirmando el pago');

      let status = confirmRes.data.status;
      if (status === 'requires_action') {
        const next = await handle3DS(intentRes.data.id);
        status = next?.status || status;
      }

      if (status !== 'succeeded') {
        const latest = await getPaymentIntent(intentRes.data.id);
        status = latest.data?.status || status;
      }

      if (status === 'succeeded') {
        const ReactPixel = (await import("react-facebook-pixel")).default;
        ReactPixel.track("Purchase", {
          value: 40,
          currency:'USD'
        });
        toast.success('Pago realizado con éxito. Enviando correo electrónico... No cierres la ventana.');
        form.reset(defaultValues);
        onSuccess?.(intentRes.data.id);
        await sendNotificationEmail({to: values.email, subject: 'LUXURY VIDEOS', name: values.name, htmlContent:'', payment_intent_id: intentRes.data.id})
        window.location.href = '/clips/thank-you';
      } else if (status === 'requires_payment_method') {
        toast.error('El pago fue rechazado. Intenta con otra tarjeta.');
      } else {
        toast.error(`El estado del pago es: ${status}`);
      }
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || 'No se pudo procesar el pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-2xl bg-[#f5f5f5] p-4 text-[#3f3f46]">
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#52525b]">Correo electrónico</label>
          <Input
            {...form.register('email')}
            type="email"
            placeholder="tu@email.com"
            className="h-11 border-[#d4d4d8] bg-white text-[#18181b]"
          />
          {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-[#3f3f46]">Dirección de envío</h2>
        <div className="overflow-hidden rounded-xl border border-[#d4d4d8] bg-white">
          <Input
            {...form.register('name')}
            placeholder="Nombre"
            className="h-11 rounded-none border-0 border-b border-[#e4e4e7] bg-transparent shadow-none focus-visible:ring-0"
          />
          <Select value={form.watch('country')} onValueChange={(val) => form.setValue('country', val, { shouldValidate: true })}>
            <SelectTrigger className="h-11 w-full rounded-none border-0 border-b border-[#e4e4e7] bg-transparent px-3 text-left text-[#3f3f46] shadow-none focus:ring-0">
              <SelectValue placeholder="Selecciona un país" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#18181b]">
              <SelectGroup>
                {countries.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            {...form.register('address')}
            placeholder="Dirección"
            className="h-11 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>
        {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
        {form.formState.errors.country && <p className="text-xs text-red-500">{form.formState.errors.country.message}</p>}
        {form.formState.errors.address && <p className="text-xs text-red-500">{form.formState.errors.address.message}</p>}
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-[#3f3f46]">Detalles de pago</h2>
        <div className="overflow-hidden rounded-xl border border-[#d4d4d8] bg-white">
          <Input
            {...form.register('cardNumber')}
            placeholder="4242 4242 4242 4242"
            className="h-11 rounded-none border-0 border-b border-[#e4e4e7] bg-transparent shadow-none focus-visible:ring-0"
            inputMode="numeric"
          />
          <div className="grid grid-cols-2">
            <div className="border-r border-[#e4e4e7]">
              <Input
                {...form.register('expDate')}
                placeholder="MM / AA"
                className="h-11 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
                inputMode="numeric"
              />
            </div>
            <div>
              <Input
                {...form.register('cvv')}
                placeholder="CVC"
                className="h-11 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>
        {form.formState.errors.cardNumber && <p className="text-xs text-red-500">{form.formState.errors.cardNumber.message}</p>}
        {form.formState.errors.expDate && <p className="text-xs text-red-500">{form.formState.errors.expDate.message}</p>}
        {form.formState.errors.cvv && <p className="text-xs text-red-500">{form.formState.errors.cvv.message}</p>}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-[#d4d4d8] bg-white px-3 py-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#71717a]">Total</p>
          <p className="text-lg font-semibold text-[#18181b]">${(PRODUCT_PRICE / 100).toFixed(2)} USD</p>
        </div>
      </div>

      <Button type="submit" className="h-11 w-full bg-[#18181b] text-white hover:bg-black" disabled={loading}>
        {loading ? 'Procesando...' : 'Pagar y obtener acceso'}
      </Button>
    </form>
  );
}
