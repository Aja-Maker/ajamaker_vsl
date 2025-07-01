'use server';

import { businessLeadSchema } from '@/lib/makercash/business_lead_schema';
import { addAttendeeToEvent } from '@/lib/google/addAtendeeToEvent';

interface EmailPayload {
  to: string;
  subject: string;
  htmlContent: string;
}

export async function sendNotificationEmail({
  to,
  subject,
  htmlContent,
}: EmailPayload): Promise<void> {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: {
        name: 'REGISTRO WEBINAR',
        email: 'manager@ajamaker.com',
      },
      to: [{ email: to, name: 'Marvin' }],
      subject,
      htmlContent,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error('❌ Failed to send Brevo email:', err);
    throw new Error('No se pudo enviar el correo de notificación.');
  }
}

interface AddBrevoContactInput {
  firstName: string
  lastName: string
  email: string
  whatsapp?: string
  question?: string
}

export async function addBrevoContact({ firstName, lastName, email, whatsapp, question }: AddBrevoContactInput) {
  try {

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        listIds: [17],
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

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;
const EVENT_IDS: Record<string, string> = {
  jul30: process.env.JUL30EVENT_ID!,
  aug6: process.env.AUG6EVENT_ID!,
};

const SESSION_LABELS: Record<string, string> = {
  jul30: 'Miércoles 30 de julio, 3 PM',
  aug6: 'Miércoles 6 de agosto, 3 PM',
};

export async function submitLead(formData: any) {
  const parsed = businessLeadSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: 'Datos inválidos.',
      issues: parsed.error.format(),
    };
  }

  const data = parsed.data;

  try {
    const sessionLabel = SESSION_LABELS[data.session];

    // 1. Send notification email to Marvin
    await sendNotificationEmail({
      to: 'marvin.solis@ajamaker.com',
      subject: `Nuevo registro: ${data.firstName} ${data.lastName}`,
      htmlContent: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #111;">
          <h2 style="color: #0F172A;">Nuevo registro al webinar</h2>
          <p><strong>Nombre:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Teléfono:</strong> ${data.phone}</p>
          <p><strong>Negocio:</strong> ${data.businessName}</p>
          <p><strong>Sesión:</strong> ${sessionLabel}</p>
        </div>
      `,
    });

    // 2. Add to Brevo
    await addBrevoContact({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      whatsapp: data.phone,
      question: data.businessName,
    });

    // 3. Add to Google Calendar Event
    await addAttendeeToEvent({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId: EVENT_IDS[data.session],
      attendeeEmail: data.email,
      attendeeName: `${data.firstName} ${data.lastName}`,
    });

    return { success: true };
  } catch (err: any) {
    console.error('❌ Error submitting lead:', err);
    return { success: false, error: err.message || 'Error inesperado' };
  }
}