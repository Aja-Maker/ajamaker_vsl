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
    console.log(`whatsapp: ${whatsapp}, type: ${typeof whatsapp}`)

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key':  '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', // Must be set in .env
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

    console.log(res)

    if (!res.ok) {
      const errorData = await res.json()
      console.error('Brevo API Error:', errorData)
      throw new Error('Failed to add contact to Brevo.')
    }

    return { success: true }
  } catch (err) {
    console.error('Server Action Error:', err)
    return { success: false, error: (err as Error).message }
  }
}