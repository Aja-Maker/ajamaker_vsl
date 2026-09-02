import "server-only";

import { createClient } from "@supabase/supabase-js";

export type CheckoutSession = {
  id: string;
  paymentStatus: string;
  paymentIntentId?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
  createdAt?: string | null;
  customer?: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  } | null;
};

type DeliveryState = {
  buyer_email_sent_at: string | null;
  internal_email_sent_at: string | null;
};

const WHATSAPP_ACCESS_URL = "https://chat.whatsapp.com/C7SIFFWS3dzGk9tDJW007x";
const INTERNAL_EMAIL = "marvin.tarrico@gmail.com";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) throw new Error("Supabase webhook configuration is missing");
  return createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatAmount(amount?: number | null, currency?: string | null) {
  if (typeof amount !== "number" || !currency) return "No disponible";
  try {
    return new Intl.NumberFormat("es-CR", { style: "currency", currency }).format(amount / 100);
  } catch {
    return `${amount / 100} ${currency}`;
  }
}

async function sendBrevoEmail(to: string, name: string, subject: string, htmlContent: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("Brevo configuration is missing");

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      sender: { name: "Aformativo University", email: "manager@ajamaker.com" },
      to: [{ email: to, name }],
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) throw new Error(`Brevo delivery failed with status ${response.status}`);
}

export async function processPaidCheckout(session: CheckoutSession) {
  const supabase = getSupabaseAdmin();
  const buyerEmail = session.customer?.email?.trim().toLowerCase();
  if (!buyerEmail) throw new Error("Paid checkout has no customer email");

  const sanitizedPayload = {
    id: session.id,
    paymentStatus: session.paymentStatus,
    paymentIntentId: session.paymentIntentId ?? null,
    amountTotal: session.amountTotal ?? null,
    currency: session.currency ?? null,
    createdAt: session.createdAt ?? null,
    customer: {
      name: session.customer?.name ?? null,
      email: buyerEmail,
      phone: session.customer?.phone ?? null,
    },
  };

  const { data: claim, error: claimError } = await supabase.rpc("claim_onvo_webhook_event", {
    p_event_id: session.id,
    p_event_type: "checkout-session.succeeded",
    p_payment_intent_id: session.paymentIntentId ?? null,
    p_buyer_email: buyerEmail,
    p_payload: sanitizedPayload,
  });
  if (claimError) throw new Error(`Could not claim webhook event: ${claimError.message}`);
  if (claim === "completed" || claim === "processing") return { duplicate: true };

  const { data: state, error: stateError } = await supabase
    .from("onvo_webhook_events")
    .select("buyer_email_sent_at,internal_email_sent_at")
    .eq("event_id", session.id)
    .single<DeliveryState>();
  if (stateError) throw new Error(`Could not read webhook state: ${stateError.message}`);

  try {
    const buyerName = session.customer?.name?.trim() || "Estudiante";
    if (!state.buyer_email_sent_at) {
      await sendBrevoEmail(
        buyerEmail,
        buyerName,
        "Tu acceso al curso Vitalidad",
        `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#173b2a"><h2>\u00a1Gracias por tu compra, ${escapeHtml(buyerName)}!</h2><p>Tu pago fue confirmado correctamente.</p><p>Usa el siguiente bot\u00f3n para unirte al grupo privado de WhatsApp y continuar con tu acceso al curso:</p><p><a href="${WHATSAPP_ACCESS_URL}" style="display:inline-block;background:#f5a623;color:#fff;padding:14px 24px;border-radius:999px;text-decoration:none;font-weight:bold">UNIRME AL GRUPO DE WHATSAPP</a></p><p>Si necesitas ayuda, escr\u00edbenos a manager@ajamaker.com.</p></div>`,
      );
      const { error } = await supabase.from("onvo_webhook_events").update({ buyer_email_sent_at: new Date().toISOString() }).eq("event_id", session.id);
      if (error) throw new Error(`Could not save buyer delivery: ${error.message}`);
    }

    if (!state.internal_email_sent_at) {
      await sendBrevoEmail(
        INTERNAL_EMAIL,
        "Marvin",
        `Nueva compra Vitalidad: ${buyerName}`,
        `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111"><h2>Nueva compra confirmada</h2><p><strong>Cliente:</strong> ${escapeHtml(buyerName)}</p><p><strong>Email:</strong> ${escapeHtml(buyerEmail)}</p><p><strong>Tel\u00e9fono:</strong> ${escapeHtml(session.customer?.phone || "No disponible")}</p><p><strong>Checkout:</strong> ${escapeHtml(session.id)}</p><p><strong>Intenci\u00f3n de pago:</strong> ${escapeHtml(session.paymentIntentId || "No disponible")}</p><p><strong>Monto:</strong> ${escapeHtml(formatAmount(session.amountTotal, session.currency))}</p><p><strong>Fecha:</strong> ${escapeHtml(session.createdAt || new Date().toISOString())}</p></div>`,
      );
      const { error } = await supabase.from("onvo_webhook_events").update({ internal_email_sent_at: new Date().toISOString() }).eq("event_id", session.id);
      if (error) throw new Error(`Could not save internal delivery: ${error.message}`);
    }

    const { error: completeError } = await supabase
      .from("onvo_webhook_events")
      .update({ status: "completed", completed_at: new Date().toISOString(), last_error: null })
      .eq("event_id", session.id);
    if (completeError) throw new Error(`Could not complete webhook event: ${completeError.message}`);
    return { duplicate: false };
  } catch (error) {
    await supabase
      .from("onvo_webhook_events")
      .update({ status: "failed", last_error: error instanceof Error ? error.message.slice(0, 500) : "Unknown error" })
      .eq("event_id", session.id);
    throw error;
  }
}
