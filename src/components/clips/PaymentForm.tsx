'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/phone-input';
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
  createFixedTenDollarIntent,
  createOnvoClient,
  getPaymentIntent,
  sendNotificationEmail,
} from '@/app/clips/actions';

const paymentSchema = z.object({
  name: z.string().min(2, 'Nombre requerido').trim(),
  email: z.string().email('Correo inválido').trim(),
  phone: z.string().min(6, 'Teléfono inválido'),
  city: z.string().min(2, 'Ciudad requerida').trim(),
  country: z.string().min(2, 'País requerido').trim(),
  postalCode: z.string().min(2, 'Código postal requerido').trim(),
  state: z.string().min(2, 'Provincia/Estado requerido').trim(),
  cardNumber: z
    .string()
    .min(12, 'Tarjeta inválida')
    .transform((v) => v.replace(/\s+/g, '')),
  expMonth: z.string().min(1, 'Mes requerido').trim(),
  expYear: z.string().min(2, 'Año requerido').trim(),
  cvv: z.string().min(3, 'cvv inválido').trim(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const PRODUCT_PRICE = 1000; // cents USD (server-enforced)

const countries = [
  { value: 'CR', label: 'Costa Rica' },
  { value: 'MX', label: 'Mexico' },
  { value: 'CO', label: 'Colombia' },
  { value: 'AR', label: 'Argentina' },
  { value: 'CL', label: 'Chile' },
  { value: 'PE', label: 'Peru' },
  { value: 'PA', label: 'Panama' },
  { value: 'ES', label: 'Spain' },
  { value: 'GB', label: 'United Kingdom' },
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
      phone: '',
      city: '',
      country: 'CR',
      postalCode: '',
      state: '',
      cardNumber: '',
      expMonth: '',
      expYear: '',
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
      toast.error('3DS verification not able to load, try again please.');
      return { status: 'requires_action' as const };
    }
    const onvo = window.ONVO(process.env.NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY || '');
    const result = await onvo.handleNextAction({ paymentIntentId });
    if (result?.error) {
      toast.error(result.error.message || '3DS Authentication failed');
      return { status: 'requires_payment_method' as const };
    }
    return result.paymentIntent as { status: string };
  };

  const onSubmit = async (values: PaymentFormValues) => {
    setLoading(true);
    toast.dismiss();
    try {
      const clientRes = await createOnvoClient({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: {
          city: values.city,
          country: values.country,
          postalCode: values.postalCode,
          state: values.state,
        },
      });
      if (clientRes.error || !clientRes.data?.id) throw new Error(clientRes.error || 'Error creating client');

      const pmRes = await createCardPaymentMethod({
        customerId: clientRes.data.id,
        card: {
          number: values.cardNumber,
          expMonth: Number(values.expMonth),
          expYear: Number(values.expYear),
          cvv: values.cvv,
          holderName: values.name,
        },
      });
      if (pmRes.error || !pmRes.data?.id) throw new Error(pmRes.error || 'Error with the payment method.');

      const intentRes = await createFixedTenDollarIntent({
        customerId: clientRes.data.id,
        description: 'Luxury Reels Pack',
        metadata: { email: values.email },
      });
      if (intentRes.error || !intentRes.data?.id) throw new Error(intentRes.error || 'Error with payment intent');

      const confirmRes = await confirmPaymentIntent({
        paymentIntentId: intentRes.data.id,
        paymentMethodId: pmRes.data.id,
        returnUrl: getReturnUrl(),
      });
      if (confirmRes.error || !confirmRes.data) throw new Error(confirmRes.error || 'Error confirming');

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
          value: 10,
          currency:'USD'
        });
        toast.success('Payment done successfully. Sending email... Do not close the window');
        form.reset(defaultValues);
        onSuccess?.(intentRes.data.id);
        await sendNotificationEmail({to: values.email, subject: 'LUXURY VIDEOS', name: values.name, htmlContent:'', payment_intent_id: intentRes.data.id})
        window.location.href = '/clips/thank-you';
      } else if (status === 'requires_payment_method') {
        toast.error('Payment was declined. Try another card.');
      } else {
        toast.error(`The payment status is: ${status}`);
      }
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || 'Could not process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm text-white/80">Name</label>
        <Input
          {...form.register('name')}
          placeholder="Name and Last name"
          className="bg-white/5 border-white/10 text-white"
        />
        {form.formState.errors.name && <p className="text-red-400 text-xs">{form.formState.errors.name.message}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm text-white/80">Email</label>
        <Input
          {...form.register('email')}
          type="email"
          placeholder="your@email.com"
          className="bg-white/5 border-white/10 text-white"
        />
        {form.formState.errors.email && <p className="text-red-400 text-xs">{form.formState.errors.email.message}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm text-white/80">Phone number</label>
        <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-1">
          <PhoneInput
            value={form.watch('phone')}
            onChange={(val) => form.setValue('phone', (val as string) || '')}
            defaultCountry="MX"
          />
        </div>
        {form.formState.errors.phone && <p className="text-red-400 text-xs">{form.formState.errors.phone.message}</p>}
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-white/80">City</label>
          <Input
            {...form.register('city')}
            placeholder="City"
            className="bg-white/5 border-white/10 text-white"
          />
          {form.formState.errors.city && <p className="text-red-400 text-xs">{form.formState.errors.city.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm text-white/80">Country</label>
          <Select value={form.watch('country')} onValueChange={(val) => form.setValue('country', val)}>
            <SelectTrigger className="w-full bg-white/5 border border-white/10 text-white px-3 py-2">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-[#0B0E16] border border-white/10 text-white">
              <SelectGroup>
                {countries.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {form.formState.errors.country && (
            <p className="text-red-400 text-xs">{form.formState.errors.country.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm text-white/80">Postal Code</label>
          <Input
            {...form.register('postalCode')}
            placeholder="10101"
            className="bg-white/5 border-white/10 text-white"
          />
          {form.formState.errors.postalCode && (
            <p className="text-red-400 text-xs">{form.formState.errors.postalCode.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm text-white/80">State / Province</label>
          <Input
            {...form.register('state')}
            placeholder="Puebla"
            className="bg-white/5 border-white/10 text-white"
          />
          {form.formState.errors.state && <p className="text-red-400 text-xs">{form.formState.errors.state.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-white/80">Card number</label>
          <Input
            {...form.register('cardNumber')}
            placeholder="4242 4242 4242 4242"
            className="bg-white/5 border-white/10 text-white"
            inputMode="numeric"
          />
          {form.formState.errors.cardNumber && (
            <p className="text-red-400 text-xs">{form.formState.errors.cardNumber.message}</p>
          )}
        </div>
        <div className="flex gap-3">
          <div className="space-y-1 flex-1">
            <label className="text-sm text-white/80">Expiry Month(MM)</label>
            <Input
              {...form.register('expMonth')}
              placeholder="08"
              className="bg-white/5 border-white/10 text-white"
              inputMode="numeric"
            />
            {form.formState.errors.expMonth && (
              <p className="text-red-400 text-xs">{form.formState.errors.expMonth.message}</p>
            )}
          </div>
          <div className="space-y-1 flex-1">
            <label className="text-sm text-white/80">Expiry Year(YYYY)</label>
            <Input
              {...form.register('expYear')}
              placeholder="2027"
              className="bg-white/5 border-white/10 text-white"
              inputMode="numeric"
            />
            {form.formState.errors.expYear && (
              <p className="text-red-400 text-xs">{form.formState.errors.expYear.message}</p>
            )}
          </div>
          <div className="space-y-1 flex-1">
            <label className="text-sm text-white/80">cvv</label>
            <Input
              {...form.register('cvv')}
              placeholder="123"
              className="bg-white/5 border-white/10 text-white"
              inputMode="numeric"
            />
            {form.formState.errors.cvv && (
              <p className="text-red-400 text-xs">{form.formState.errors.cvv.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/60">Total</p>
          <p className="text-lg font-semibold">${(PRODUCT_PRICE / 100).toFixed(2)} USD</p>
        </div>
      </div>

      <Button type="submit" className="w-full bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#6366F1]" disabled={loading}>
        {loading ? 'Processing...' : 'Pay and gain access'}
      </Button>
    </form>
  );
}
