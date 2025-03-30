'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { processPayment, verifyPayment } from '@/app/pay/actions'
import InputField from '@/components/FormInput'
import CustomSelectField from '@/components/SelectField'
import { paymentFormSchema } from '@/lib/member_form_schema/schema'
import { z } from 'zod'
import PhoneField from './PhoneField'
import PasswordField from '@/components/PasswordField'
import PaymentSummary from '@/components/PaymentSummary'
import CardNumberField from '@/components/CardNumberField'
import { devLog, formatFriendlyError } from './utils/functions'

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

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1).padStart(2, '0'),
  label: String(i + 1).padStart(2, '0'),
}))

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 10 }, (_, i) => ({
  value: String(currentYear + i),
  label: String(currentYear + i),
}))

type MemberFormSchema = z.infer<typeof paymentFormSchema>
type FieldName = keyof MemberFormSchema

const placeholders: Record<FieldName, string> = {
  name: 'Nombre completo',
  email: 'Email',
  password: 'Contraseña',
  phone: 'Teléfono',
  idNumber: 'Cédula',
  city: 'Ciudad',
  state: 'Provincia',
  postalCode: 'Código Postal',
  country: '',
  cardNumber: 'Número de tarjeta',
  expMonth: 'Mes exp.',
  expYear: 'Año exp.',
  cvv: 'CVV',
}

export async function handle3DSFlow(paymentIntentId: string): Promise<boolean> {
  const onvo = (window as any).ONVO?.(process.env.NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY!)
  if (!onvo) throw new Error('ONVO SDK no está disponible.')

  await onvo.handleNextAction({ paymentIntentId })

  const finalStatus = await verifyPayment(paymentIntentId)

  return finalStatus === 'succeeded'
}


export default function MemberForm() {
  const [phonePrefix, setPhonePrefix] = useState('+506');
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<MemberFormSchema>({
    resolver: zodResolver(paymentFormSchema),
    mode: 'onTouched',
  })

  useEffect(() => {
    const stored = sessionStorage.getItem('memberForm')
    if (stored) {
      const parsed = JSON.parse(stored)

      const phoneValue = parsed.phone as string
      const matchedCountry = countryOptions.find(({ dial }) => phoneValue.startsWith(dial))
      if (matchedCountry) {
        setPhonePrefix(matchedCountry.dial)
        setValue('phone', phoneValue.slice(matchedCountry.dial.length))
      } else {
        setValue('phone', phoneValue)
      }

      for (const key in parsed) {
        if (key !== 'phone') {
          setValue(key as FieldName, parsed[key])
        }
      }
    }
  }, [setValue])  

  useEffect(() => {
    if (snackbarMessage) {
      const timeout = setTimeout(() => {
        setSnackbarMessage(null)
      }, 4000)
  
      return () => clearTimeout(timeout)
    }
  }, [snackbarMessage])
  

  const onSubmit = async (data: MemberFormSchema) => {
    const fullPhone = `${phonePrefix}${data.phone}`
    const formData = new FormData()
  
    for (const [key, value] of Object.entries(data)) {
      if (key === 'phone') {
        formData.append('phone', fullPhone)
      } else {
        formData.append(key, value)
      }
    }
  
    sessionStorage.setItem('memberForm', JSON.stringify({ ...data, phone: fullPhone }))
  
    const result = await processPayment(formData)
  
    if (result?.status === 'requires_action' && result.paymentIntentId) {
      try {
        const success = await handle3DSFlow(result.paymentIntentId)
      
        if (success) {
          setSuccess(true)
          return
        }
      
        setSnackbarMessage('El pago fue cancelado o no se pudo completar.')
        throw new Error('3DS cancelado o fallido.')
      } catch (err: any) {
        devLog('❌ Error durante 3DS:', err)

        const msg = formatFriendlyError(err)
        setSnackbarMessage(msg)


        throw err
      }      
    }
  
    if (result?.status === 'succeeded') {
      setSuccess(true)
      return
    }
  
    const msg = formatFriendlyError(result)
    setSnackbarMessage(msg)
    throw new Error('El pago no fue exitoso.')
  }  

  if (isSubmitSuccessful) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <h2 className="text-xl font-semibold text-green-700">¡Pago realizado con éxito!</h2>
        <p className="mt-2 text-sm">Pronto recibirás un correo de confirmación.</p>
      </div>
    )
  }

  return (
    <>
      {snackbarMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-md text-sm z-50">
          {snackbarMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-6 px-4 space-y-6 text-sm pb-10"
      >
        <div className="flex justify-center -mb-4">
          <img src="/g8.svg" alt="AJAMAKER Logo" className="h-20 mb-4 mx-auto" />
        </div>
        <PaymentSummary amount={20000} label="Membresía Anual" currency='CRC'/>

        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">Detalles de pago</h3>

          <div className="space-y-1">
            <CardNumberField
              name="cardNumber"
              value={watch('cardNumber')}
              onChange={(val) => setValue('cardNumber', val, { shouldValidate: true })}
              error={errors.cardNumber?.message}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <CustomSelectField
                name="expMonth"
                label="Mes exp."
                value={watch('expMonth')}
                onChange={(val) => setValue('expMonth', val, { shouldValidate: true })}
                options={monthOptions}
                error={errors.expMonth?.message}
              />
            </div>
            <div className="space-y-1">
              <CustomSelectField
                name="expYear"
                label="Año exp."
                value={watch('expYear')}
                onChange={(val) => setValue('expYear', val, { shouldValidate: true })}
                options={yearOptions}
                error={errors.expYear?.message}
              />
            </div>
            <div className="space-y-1">
              <InputField name="cvv" label="CVV" register={register} />
              {errors.cvv?.message && <p className="text-xs text-red-500">{errors.cvv.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <InputField name="city" label={placeholders.city} register={register} />
              {errors.city?.message && <p className="text-xs text-red-500">{errors.city.message}</p>}
            </div>
            <div className="space-y-1">
              <InputField name="state" label={placeholders.state} register={register} />
              {errors.state?.message && <p className="text-xs text-red-500">{errors.state.message}</p>}
            </div>
            <div className="space-y-1">
              <InputField name="postalCode" label={placeholders.postalCode} register={register} />
              {errors.postalCode?.message && <p className="text-xs text-red-500">{errors.postalCode.message}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <CustomSelectField
              name="country"
              label="País"
              value={watch('country')}
              onChange={(val) => {
                setValue('country', val, { shouldValidate: true })
                const matched = countryOptions.find(c => c.code === val)
                if (matched) setPhonePrefix(matched.dial)
              }}
              options={countryOptions.map(({ code, name }) => ({ value: code, label: name }))}
              error={errors.country?.message}
            />
          </div>
        </section>

        <section className="space-y-3">
          <div>
            <h3 className="text-base font-semibold text-gray-800">Cuenta AJAMAKER</h3>
            <p className="mt-1 text-xs text-gray-500">
              Para poder tener una membresía necesitás crear una cuenta AJAMAKER, que
              luego podrás usar en la app. Para esto se requiere un email, una contraseña
              que usarás para ingresar a tu cuenta y los demás datos personales
            </p>
          </div>


          <div className="space-y-1">
            <InputField name="name" label={placeholders.name} register={register} />
            {errors.name?.message && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <InputField name="idNumber" label="Cédula" register={register}
              infoText='Para la factura electrónica y tu cuenta de miembro'/>
            {errors.idNumber?.message && <p className="text-xs text-red-500">{errors.idNumber.message}</p>}
          </div>

          <div className="space-y-1">
            <InputField name="email" label={placeholders.email} register={register} />
            {errors.email?.message && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <PasswordField
              name="password"
              register={register}
              error={errors.password?.message}
            />
          </div>

          <div className="space-y-1">
            <PhoneField
              name="phone"
              label="Teléfono"
              value={watch('phone')}
              onChange={() => {}}
              prefix={phonePrefix}
              onPrefixChange={setPhonePrefix}
              options={countryOptions}
              error={errors.phone?.message}
              register={register}
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          {isSubmitting ? 'Procesando...' : 'Pagar'}
        </button>

        <div className="flex justify-center mt-6">
          <a
            href="https://onvopay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block opacity-70 hover:opacity-100 transition-opacity"
            title="Procesado de forma segura por Onvo"
          >
            <img src="/onvo-logo.svg" alt="Powered by Onvo" className="h-6" />
          </a>
        </div>
      </form>
    </>
  )
}
