'use server'

import { redirect } from 'next/navigation'

const parseResponse = async (res: Response, context: string) => {
  const raw = await res.text()
  let json

  try {
    json = JSON.parse(raw)
  } catch (err) {
    console.error(`❌ [${context}] Invalid JSON:`, raw)
    throw new Error(`[${context}] Invalid server response`)
  }

  console.log(`📡 [${context}]`, json)

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
    console.log(`👤 Existing customer found: ${response.data[0].id}`)
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
  console.log(`👤 Customer created: ${customer.id}`)
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

export async function processPayment(formData: FormData) {
  try {
    const name = getFormValue(formData, 'name')
    const email = getFormValue(formData, 'email')
    const phone = getFormValue(formData, 'phone')
    const idNumber = getFormValue(formData, 'idNumber')
    const city = getFormValue(formData, 'city')
    const state = getFormValue(formData, 'state')
    const postalCode = getFormValue(formData, 'postalCode')
    const country = getFormValue(formData, 'country')
    const cardNumber = getFormValue(formData, 'cardNumber')
    const expMonth = Number(getFormValue(formData, 'expMonth'))
    const expYear = Number(getFormValue(formData, 'expYear'))
    const cvv = getFormValue(formData, 'cvv')

    const secretKey = process.env.ONVO_SECRET_KEY
    const publicKey = process.env.NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY

    if (!secretKey || !publicKey) {
      throw new Error('Missing keys');
    }

    const customerId = await getCustomer(email, secretKey, {
      name,
      email,
      phone,
      address: {
        city,
        state,
        country,
        postalCode,
      }      
    })

    const paymentMethod = await createPaymentMethod(publicKey, {
      type: 'card',
      card: {
        number: cardNumber,
        expMonth,
        expYear,
        cvv,
        holderName: name,
      },
      billing: {
        name,
        phone,
        idType: 'national_natural_person',
        idNumber,
        address: {
          city,
          state,
          country,
          postalCode,
        },        
      },
      customerId,
    })

    const intent = await createIntent(secretKey, {
      amount: 1000,
      currency: 'USD',
      description: 'Pago simple con Server Action',
      customerId,
    })

    const confirmation = await confirmIntent(secretKey, intent.id, paymentMethod.id)

    // 🔎 Detectar si requiere 3DS
    if (confirmation.status === 'requires_action' && confirmation.nextAction?.redirectToUrl?.url) {
      return {
        status: 'requires_action',
        paymentIntentId: intent.id,
      }
    }

    // Verificación normal si no hay 3DS
    const final = await verifyIntentStatus(secretKey, intent.id)

    if (final.status === 'succeeded') {
      return { status: 'succeeded' }
    }

    return { status: final.status }
  } catch (err: any) {
    console.error('❌ Payment processing error:', err.message)
    return { status: 'error', message: err.message }
  }
}

export async function verifyPayment(intentId: string) {
  const secretKey = process.env.ONVO_SECRET_KEY
  if (!secretKey) throw new Error('Missing secret key')

  const res = await fetch(`https://api.onvopay.com/v1/payment-intents/${intentId}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  })

  const json = await res.json()

  console.log('📡 Verificación de intento de pago:', json)

  if (!res.ok) {
    const msg = json?.message?.[0] || json?.error || 'Error verificando pago'
    throw new Error(msg)
  }

  if (!json.status) {
    throw new Error('No se pudo determinar el estado del pago.')
  }

  return json.status
}
