import "server-only";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ name: z.string().trim().min(2).max(120), phone: z.string().trim().min(6).max(30), whatsapp: z.string().trim().min(6).max(30), email: z.string().trim().email().max(254) });

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Datos inválidos" }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Revisa tus datos" }, { status: 400 });
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Servicio no disponible" }, { status: 503 });
  const { name, email } = parsed.data;
  const headers = { accept: "application/json", "content-type": "application/json", "api-key": apiKey };
  try {
    const contact = await fetch("https://api.brevo.com/v3/contacts", { method: "POST", headers, body: JSON.stringify({ email, updateEnabled: true, attributes: { FIRSTNAME: name } }) });
    if (contact.status === 401 || contact.status === 403) {
      console.error("Brevo rejected the registration API key", contact.status);
      return NextResponse.json({ error: "El registro no está disponible temporalmente. Contacta a soporte." }, { status: 503 });
    }
    if (!contact.ok) {
      const detail = await contact.json().catch(() => null);
      console.error("Brevo contact rejected", contact.status, detail?.code, detail?.message);
      throw new Error(`Brevo contact ${contact.status}`);
    }
    const message = await fetch("https://api.brevo.com/v3/smtp/email", { method: "POST", headers, body: JSON.stringify({ sender: { name: "Aformativo University", email: "manager@ajamaker.com" }, to: [{ email, name }], subject: "Confirmación de inscripción | El Viaje hacia la Salud", htmlContent: `<p>Hola, ${escapeHtml(name)}:</p><p>Tu inscripción gratuita a <strong>El Viaje hacia la Salud</strong> está confirmada.</p><p>Pronto compartiremos contigo los próximos pasos. Gracias por comenzar este viaje con nosotros.</p><p>Aformativo University</p>` }) });
    if (message.status === 401 || message.status === 403) {
      console.error("Brevo rejected the confirmation API key", message.status);
      return NextResponse.json({ error: "El correo de confirmación no está disponible temporalmente. Contacta a soporte." }, { status: 503 });
    }
    if (!message.ok) throw new Error(`Brevo email ${message.status}`);
    return NextResponse.json({ success: true });
  } catch (error) { console.error("Journey registration failed", error); return NextResponse.json({ error: "No se pudo completar el registro" }, { status: 502 }); }
}

function escapeHtml(value: string) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;"); }
