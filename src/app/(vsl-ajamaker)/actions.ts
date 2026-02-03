'use server'

interface AddBrevoContactInput {
  name: string
  email: string
  whatsapp?: string
  question?: string
}

export async function addBrevoContact({ name, email, whatsapp, question }: AddBrevoContactInput) {
  try {
    const [firstName, ...rest] = name.trim().split(' ')
    const lastName = rest.join(' ') || 'SinApellido'

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!, // Must be set in .env
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        listIds: [15],
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          WHATSAPP: whatsapp || '',
          JOB_TITLE: question || '',
        }
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error('Brevo API Error:', errorData)
      throw new Error(`${errorData.message ?? 'Los datos no son válidos, por favor revise que sean correctos.'}`)
    }

    return { success: true }
  } catch (err) {
    console.error('Server Action Error:', err)
    return { success: false, error: (err as Error).message }
  }
}