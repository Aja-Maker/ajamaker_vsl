import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { type CheckoutSession, processPaidCheckout } from "@/lib/onvo-webhook";

export const runtime = "nodejs";

function secretsMatch(received: string | null, expected: string) {
  if (!received) return false;
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.ONVO_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("ONVO_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Webhook is not configured" }, { status: 500 });
  }

  if (!secretsMatch(request.headers.get("x-webhook-secret"), webhookSecret)) {
    return NextResponse.json({ error: "Invalid webhook secret" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() || "";
  if (!contentType.startsWith("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!isRecord(payload) || typeof payload.type !== "string" || !isRecord(payload.data)) {
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }

  if (payload.type !== "checkout-session.succeeded") {
    return NextResponse.json({ received: true, ignored: true });
  }

  const data = payload.data;
  if (typeof data.id !== "string" || !data.id || typeof data.paymentStatus !== "string") {
    return NextResponse.json({ error: "Invalid checkout session" }, { status: 400 });
  }
  if (data.paymentStatus !== "paid") {
    return NextResponse.json({ received: true, ignored: true });
  }
  if (!isRecord(data.customer) || typeof data.customer.email !== "string" || !data.customer.email.trim()) {
    return NextResponse.json({ error: "Paid checkout has no customer email" }, { status: 400 });
  }

  try {
    const result = await processPaidCheckout(data as CheckoutSession);
    return NextResponse.json({ received: true, duplicate: result.duplicate });
  } catch (error) {
    console.error("ONVO webhook processing failed", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
