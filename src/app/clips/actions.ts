'use server';

const ONVO_BASE_URL = process.env.ONVO_BASE_URL || 'https://api.onvopay.com';
const ONVO_SECRET_KEY = process.env.ONVO_SECRET_KEY ;
const ONVO_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY;

type OnvoError = { statusCode?: number; message?: string | string[]; error?: string };

async function onvoRequest<T>(
  path: string,
  options: {
    method?: string;
    body?: Record<string, any>;
    auth: 'secret' | 'publishable';
  }
): Promise<{ data?: T; error?: string }> {
  const apiKey = options.auth === 'secret' ? ONVO_SECRET_KEY : ONVO_PUBLISHABLE_KEY;

  if (!apiKey) {
    return { error: `Missing ${options.auth} API key` };
  }

  let res: Response;
  try {
    res = await fetch(`${ONVO_BASE_URL}${path}`, {
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch (err) {
    console.error('ONVO request network error:', err);
    return { error: 'No se pudo conectar con ONVO. Verifica tu conexión o las llaves API.' };
  }

  if (!res.ok) {
    const err: OnvoError = await res.json().catch(() => ({}));
    const message = Array.isArray(err.message) ? err.message.join(', ') : err.message;
    return {
      error: message || err.error || `ONVO request failed with status ${res.status}`,
    };
  }

  const json = (await res.json()) as T;
  return { data: json };
}

// Utility: Fetch Payment Intent (for post-3DS validation)
export async function getPaymentIntent(paymentIntentId: string) {
  return onvoRequest<{ id: string; status: string; nextAction?: Record<string, any> }>(
    `/v1/payment-intents/${paymentIntentId}`,
    { method: 'GET', auth: 'secret' }
  );
}

// 1) Create Client
export interface CreateClientInput {
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
    country: string;
    postalCode: string;
    state: string;
  };
}

export async function createOnvoClient(input: CreateClientInput) {
  return onvoRequest<{ id: string }>('/v1/customers', {
    method: 'POST',
    auth: 'secret',
    body: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      address: input.address,
    },
  });
}

// 2) Create Card Payment Method
export interface CreateCardPaymentMethodInput {
  customerId: string;
  card: {
    number: string;
    expMonth: number;
    expYear: number;
    cvv: string;
    holderName: string;
  };
  billing?: {
    address?: CreateClientInput['address'];
  };
}

export async function createCardPaymentMethod(input: CreateCardPaymentMethodInput) {
  return onvoRequest<{ id: string; customerId: string }>('/v1/payment-methods', {
    method: 'POST',
    auth: 'publishable',
    body: {
      type: 'card',
      customerId: input.customerId,
      billing: input.billing,
      card: {
        number: input.card.number,
        expMonth: input.card.expMonth,
        expYear: input.card.expYear,
        cvv: input.card.cvv,
        holderName: input.card.holderName,
      },
    },
  });
}

// 3) Create Payment Intent (automatic capture enforced)
export interface CreatePaymentIntentInput {
  currency: 'USD' | 'CRC';
  customerId: string;
  description?: string;
  metadata?: Record<string, string>;
}

export async function createPaymentIntent(input: CreatePaymentIntentInput) {
  return onvoRequest<{ id: string; status: string }>('/v1/payment-intents', {
    method: 'POST',
    auth: 'secret',
    body: {
      amount: 1000, // $10.00 USD enforced server-side
      currency: input.currency,
      customerId: input.customerId,
      description: input.description,
      metadata: input.metadata,
      captureMethod: 'automatic', // ensure automatic capture
    },
  });
}

// Fixed $10 payment intent (server-enforced amount)
export async function createFixedTenDollarIntent({
  customerId,
  description,
  metadata,
}: {
  customerId: string;
  description?: string;
  metadata?: Record<string, string>;
}) {
  return onvoRequest<{ id: string; status: string }>('/v1/payment-intents', {
    method: 'POST',
    auth: 'secret',
    body: {
      amount: 1000, // $10.00 USD
      currency: 'USD',
      customerId,
      description,
      metadata,
    },
  });
}

// 4) Confirm Payment Intent (handles 3DS via client if nextAction is returned)
export interface ConfirmPaymentIntentInput {
  paymentIntentId: string;
  paymentMethodId: string;
  returnUrl?: string | null;
}

export async function confirmPaymentIntent(input: ConfirmPaymentIntentInput) {
  return onvoRequest<{
    id: string;
    status: string;
    nextAction?: Record<string, any>;
  }>(`/v1/payment-intents/${input.paymentIntentId}/confirm`, {
    method: 'POST',
    auth: 'publishable',
    body: {
      paymentMethodId: input.paymentMethodId,
      ...(input.returnUrl ? { returnUrl: input.returnUrl } : { returnUrl: null }),
    },
  });
}

interface EmailPayload {
  to: string;
  subject: string;
  name: string;
  htmlContent?: string;
  payment_intent_id: string;
}

const CLIPS_DELIVERY_HTML = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
    <h1 style="margin: 0 0 12px;">100,000+ Viral Luxury Rich Lifestyle Reels</h1>
    <p style="margin: 0 0 16px;">
      <a href="https://docs.google.com/document/d/1XWBJxHff2bRsnUAkIuHkBTZ1qJajh0gh-mynpRM7FkQ/edit?tab=t.0" style="color: #2563eb; text-decoration: none;">View the full catalog</a>
    </p>

    <h2 style="margin: 20px 0 8px;">Bonus Inside</h2>
    <ul style="padding: 0 0 0 18px; margin: 0 0 16px; list-style-type: disc;">
      <li style="margin: 6px 0;">
        <a href="https://drive.google.com/drive/folders/1dgYjH3g-KzewcpMF6GyczLZadYlrObBg?usp=sharing" style="color: #2563eb; text-decoration: none;">
          Udemy - YouTube Tips to Increase Reach & Ad Revenue
        </a>
      </li>
      <li style="margin: 6px 0;">
        <a href="https://drive.google.com/drive/folders/1RRKwUAs8I8T2JQgVg9cBglv-ybQJqEVA?usp=sharing" style="color: #2563eb; text-decoration: none;">
          Udemy - TikTok Ads Mastery - How to Create Viral Campaigns That Sell
        </a>
      </li>
      <li style="margin: 6px 0;">
        <a href="https://drive.google.com/drive/folders/1zFOsBT1rMP2uWQby6stb1hvltuPTNwE3?usp=sharing" style="color: #2563eb; text-decoration: none;">
          Udemy - Instagram Masterclass - Build, Engage and Grow Your Audience
        </a>
      </li>
    </ul>

    <h2 style="margin: 20px 0 8px;">Bonus Inside +</h2>
    <ul style="padding: 0 0 0 18px; margin: 0; list-style-type: disc;">
      <li style="margin: 6px 0;">
        <a href="https://drive.google.com/drive/folders/1uRrNWNRr13nrccwuIG7aNBgS8xSPGPtc?usp=sharing" style="color: #2563eb; text-decoration: none;">
          Udemy - Hit 100K Views on Instagram - A Proven Roadmap
        </a>
      </li>
    </ul>
  </div>
`;

export async function sendNotificationEmail({
  to,
  subject,
  name,
  htmlContent = CLIPS_DELIVERY_HTML,
  payment_intent_id
}: EmailPayload): Promise<void> {
  const { data: paymentIntent, error: paymentIntentError } = await getPaymentIntent(payment_intent_id);
  if (
    paymentIntentError ||
    !paymentIntent ||
    paymentIntent.status?.toLowerCase() !== 'succeeded'
  ) {
    if (paymentIntentError) {
      console.error('Failed to verify payment intent status:', paymentIntentError);
    }
    return;
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY_CLIPS!,
    },
    body: JSON.stringify({
      sender: {
        name: 'LUXURY CLIPS ACCESS',
        email: 'dmaditative.state@gmail.com',
      },
      to: [{ email: to, name: name }],
      subject,
      htmlContent: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
    <h1 style="margin: 0 0 12px;">100,000+ Viral Luxury Rich Lifestyle Reels</h1>
    <p style="margin: 0 0 16px;">
      <a href="https://docs.google.com/document/d/1XWBJxHff2bRsnUAkIuHkBTZ1qJajh0gh-mynpRM7FkQ/edit?tab=t.0" style="color: #2563eb; text-decoration: none;">View the full catalog</a>
    </p>

    <h2 style="margin: 20px 0 8px;">Bonus Inside</h2>
    <ul style="padding: 0 0 0 18px; margin: 0 0 16px; list-style-type: disc;">
      <li style="margin: 6px 0;">
        <a href="https://drive.google.com/drive/folders/1dgYjH3g-KzewcpMF6GyczLZadYlrObBg?usp=sharing" style="color: #2563eb; text-decoration: none;">
          Udemy - YouTube Tips to Increase Reach & Ad Revenue
        </a>
      </li>
      <li style="margin: 6px 0;">
        <a href="https://drive.google.com/drive/folders/1RRKwUAs8I8T2JQgVg9cBglv-ybQJqEVA?usp=sharing" style="color: #2563eb; text-decoration: none;">
          Udemy - TikTok Ads Mastery - How to Create Viral Campaigns That Sell
        </a>
      </li>
      <li style="margin: 6px 0;">
        <a href="https://drive.google.com/drive/folders/1zFOsBT1rMP2uWQby6stb1hvltuPTNwE3?usp=sharing" style="color: #2563eb; text-decoration: none;">
          Udemy - Instagram Masterclass - Build, Engage and Grow Your Audience
        </a>
      </li>
    </ul>

    <h2 style="margin: 20px 0 8px;">Bonus Inside +</h2>
    <ul style="padding: 0 0 0 18px; margin: 0; list-style-type: disc;">
      <li style="margin: 6px 0;">
        <a href="https://drive.google.com/drive/folders/1uRrNWNRr13nrccwuIG7aNBgS8xSPGPtc?usp=sharing" style="color: #2563eb; text-decoration: none;">
          Udemy - Hit 100K Views on Instagram - A Proven Roadmap
        </a>
      </li>
    </ul>
  </div>
`,
    }),
  });

  const result = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY_CLIPS!,
    },
    body: JSON.stringify({
      sender: {
        name: 'LUXURY CLIPS PAYMENT',
        email: 'dmaditative.state@gmail.com',
      },
      to: [{ email: 'asolmon88@gmail.com', name: 'Ariel' }],
      subject,
      htmlContent: '<p>ONE PERSON BOUGHT!!</p>',
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error('❌ Failed to send Brevo email:', err);
    throw new Error('FAILED TO SEND EMAIL. Go to /clips/thank-you page or contact dmaditative.state@gmail.com, or send a message on instagram.');
  }
}
