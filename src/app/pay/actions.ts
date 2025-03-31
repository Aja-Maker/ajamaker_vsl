'use server'

import { devLog } from '@/components/utils/functions'
import { createClient } from '@/utils/supabase/server'
import { paymentFormSchema } from '@/lib/member_form_schema/schema'
import { z } from 'zod'

type MemberFormSchema = z.infer<typeof paymentFormSchema>

const parseResponse = async (res: Response, context: string) => {
  const raw = await res.text()
  let json

  try {
    json = JSON.parse(raw)
  } catch (err) {
    devLog(`❌ [${context}] Invalid JSON:`, raw)
    throw new Error(`[${context}] Invalid server response`)
  }

  devLog(`📡 [${context}]`, json)

  if (!res.ok) {
    const msg =
      json?.message?.[0] ||
      json?.message ||
      json?.error ||
      json?.apiCode ||
      'Unknown error'
    throw new Error(`[${context}] ${msg}`)
  }

  return json
}

const getFormValue = (formData: FormData, field: string): string => {
  return formData.get(field) as string
}

const getCustomer = async (email: string, secretKey: string, payload: any) => {
  const response = await parseResponse(
    await fetch(`https://api.onvopay.com/v1/customers?email=${encodeURIComponent(email)}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    }),
    'Search Customer'
  )

  if (Array.isArray(response.data) && response.data.length > 0) {
    devLog(`👤 Existing customer found: ${response.data[0].id}`)
    return response.data[0].id
  }

  const customer = await parseResponse(
    await fetch('https://api.onvopay.com/v1/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify(payload),
    }),
    'Create Customer'
  )
  devLog(`👤 Customer created: ${customer.id}`)
  return customer.id
}

const createPaymentMethod = async (publicKey: string, data: any) => {
  return await parseResponse(
    await fetch('https://api.onvopay.com/v1/payment-methods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicKey}`,
      },
      body: JSON.stringify(data),
    }),
    'Create Payment Method'
  )
}

const createIntent = async (secretKey: string, data: any) => {
  return await parseResponse(
    await fetch('https://api.onvopay.com/v1/payment-intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify(data),
    }),
    'Create Payment Intent'
  )
}

const confirmIntent = async (secretKey: string, intentId: string, paymentMethodId: string) => {
  return await parseResponse(
    await fetch(`https://api.onvopay.com/v1/payment-intents/${intentId}/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({ paymentMethodId }),
    }),
    'Confirm Payment Intent'
  )
}

const verifyIntentStatus = async (secretKey: string, intentId: string) => {
  return await parseResponse(
    await fetch(`https://api.onvopay.com/v1/payment-intents/${intentId}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    }),
    'Verify Intent Status'
  )
}

export async function processPayment(formData: MemberFormSchema) {
  try {
    const result = paymentFormSchema.safeParse(formData)
    if (!result.success) {
      devLog('❌ Zod validation error:', result.error.format())
      return {
        status: 'error',
        message: 'Error de validación de datos',
      }
    }

    const data = result.data
    const {
      name, email, phone, idNumber,
      city, state, postalCode, country,
      cardNumber, expMonth, expYear, cvv,
    } = data

    const supabase = await createClient()

    // ✅ Check if user already exists
    const { data: exists, error: existsError } = await supabase.rpc('user_exists', {
      email,
    })

    if (existsError) {
      throw new Error(`Error verificando usuario: ${existsError.message}`)
    }

    if (exists === true) {
      return {
        status: 'error',
        message: 'Este usuario ya existe. Iniciá sesión o usá otro email.',
      }
    }

    // 🧾 Proceed with payment
    const secretKey = process.env.ONVO_SECRET_KEY
    const publicKey = process.env.NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY
    if (!secretKey || !publicKey) {
      throw new Error('Missing Onvo API keys')
    }

    const customerId = await getCustomer(email, secretKey, {
      name,
      email,
      phone,
      address: { city, state, country, postalCode },
    })

    const paymentMethod = await createPaymentMethod(publicKey, {
      type: 'card',
      card: {
        number: cardNumber,
        expMonth: Number(expMonth),
        expYear: Number(expYear),
        cvv,
        holderName: name,
      },
      billing: {
        name,
        phone,
        idType: 'national_natural_person',
        idNumber,
        address: { city, state, country, postalCode },
      },
      customerId,
    })

    const intent = await createIntent(secretKey, {
      amount: 1500000,
      currency: 'CRC',
      description: 'Membresía AJAMAKER por VSL',
      customerId,
    })

    const confirmation = await confirmIntent(secretKey, intent.id, paymentMethod.id)

    if (confirmation.status === 'requires_action' && confirmation.nextAction?.redirectToUrl?.url) {
      return {
        status: 'requires_action',
        paymentIntentId: intent.id,
      }
    }

    const final = await verifyIntentStatus(secretKey, intent.id)

    if (final.status === 'succeeded') {
      const confirmationNumber = final.id
      return { status: 'succeeded', confirmationNumber: confirmationNumber }
    }

    return { status: final.status }
  } catch (err: any) {
    devLog('❌ Payment processing error:', err.message)
    return { status: 'error', message: err.message }
  }
}

export async function verifyPayment(intentId: string) {
  const secretKey = process.env.ONVO_SECRET_KEY
  if (!secretKey) throw new Error('Missing secret key')

  if (!intentId || typeof intentId !== 'string') {
    throw new Error('ID de intento inválido.')
  }

  const res = await fetch(`https://api.onvopay.com/v1/payment-intents/${intentId}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  })

  const json = await res.json()

  devLog('📡 Verificación de intento de pago:', json)

  if (!res.ok) {
    const msg = json?.message?.[0] || json?.error || 'Error verificando pago'
    throw new Error(msg)
  }

  if (!json.status) {
    throw new Error('No se pudo determinar el estado del pago.')
  }

  return {status: json.status, confirmationNumber: json.id}
}

export async function createUserAccount(data: MemberFormSchema, confirmationNumber: string) {
  const supabase = await createClient()

  const result = paymentFormSchema.safeParse(data)

  if (!result.success) {
    console.error('❌ Zod validation error:', result.error.format())
    return {
      status: 'error',
      message: 'Error de validación de datos',
    }
  }

  const {
    name,
    email,
    password,
    idNumber,
    phone,
    city,
    state,
    country,
  } = result.data

  const location = `${city}, ${state}, ${country}`

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: name,
        identityNumber: idNumber,
        location: location,
        phone: phone,
        confirmationNumber: confirmationNumber,
        website: true,
      },
    },
  })

  if (error) {
    return {
      status: 'error',
      message: error.message,
    }
  }

  return { status: 'created' }
}
