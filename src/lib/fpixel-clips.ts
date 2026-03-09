type UserDataParams = {
  email?: string;
  phone?: string;
};

type BaseEventParams = {
  value?: number;
  currency?: string;
  userData?: UserDataParams;
};

type CheckoutParams = BaseEventParams & {
  numItems?: number;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
    __META_PIXEL_READY?: boolean;
    __META_PIXEL_ID?: string;
  }
}

const CURRENCY = 'USD';
const DEFAULT_VALUE = 40;
const CONTENT_ID = 'luxury-reels-pack';
const CONTENT_TYPE = 'product';
let lastAdvancedMatchingSignature: string | null = null;

const getDefaultContents = (value: number) => [
  {
    id: CONTENT_ID,
    quantity: 1,
    item_price: value,
  },
];

const canTrack = () =>
  typeof window !== 'undefined' &&
  typeof window.fbq === 'function' &&
  !!window.__META_PIXEL_READY;

const generateEventId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const normalizeEmail = (email?: string) => {
  const normalized = email?.trim().toLowerCase();
  return normalized || undefined;
};

const normalizePhone = (phone?: string) => {
  const normalized = phone?.replace(/\D/g, '');
  return normalized || undefined;
};

const getPixelId = () => {
  if (typeof window === 'undefined') return undefined;
  const pixelId = (window.__META_PIXEL_ID || '').replace(/\D/g, '');
  return pixelId || undefined;
};

const updateAdvancedMatching = (userData?: UserDataParams) => {
  if (!canTrack()) return;
  const pixelId = getPixelId();
  if (!pixelId) return;

  const email = normalizeEmail(userData?.email);
  const phone = normalizePhone(userData?.phone);
  if (!email && !phone) return;

  const payload: Record<string, string> = {};
  if (email) payload.em = email;
  if (phone) payload.ph = phone;

  const signature = JSON.stringify(payload);
  if (signature === lastAdvancedMatchingSignature) return;

  try {
    window.fbq?.('set', 'userData', payload, pixelId);
    lastAdvancedMatchingSignature = signature;
  } catch {
    // Best effort only
  }
};

const track = (
  eventName: 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'AddPaymentInfo' | 'Purchase',
  payload?: Record<string, unknown>,
  userData?: UserDataParams
) => {
  if (!canTrack()) return;

  updateAdvancedMatching(userData);
  const eventId = generateEventId();

  if (payload) {
    window.fbq?.('track', eventName, payload, { eventID: eventId });
    return eventId;
  }

  window.fbq?.('track', eventName, {}, { eventID: eventId });
  return eventId;
};

export const pageview = () => track('PageView');

export const viewContent = ({
  value = DEFAULT_VALUE,
  currency = CURRENCY,
  userData,
}: BaseEventParams = {}) =>
  track(
    'ViewContent',
    {
      content_ids: [CONTENT_ID],
      content_type: CONTENT_TYPE,
      contents: getDefaultContents(value),
      currency,
      value,
    },
    userData
  );

export const initiateCheckout = ({
  value = DEFAULT_VALUE,
  currency = CURRENCY,
  numItems = 1,
  userData,
}: CheckoutParams = {}) =>
  track(
    'InitiateCheckout',
    {
      content_ids: [CONTENT_ID],
      content_type: CONTENT_TYPE,
      contents: getDefaultContents(value),
      currency,
      num_items: numItems,
      value,
    },
    userData
  );

export const addPaymentInfo = ({
  value = DEFAULT_VALUE,
  currency = CURRENCY,
  numItems = 1,
  userData,
}: CheckoutParams = {}) =>
  track(
    'AddPaymentInfo',
    {
      content_ids: [CONTENT_ID],
      content_type: CONTENT_TYPE,
      contents: getDefaultContents(value),
      currency,
      num_items: numItems,
      value,
    },
    userData
  );

export const purchase = ({
  value = DEFAULT_VALUE,
  currency = CURRENCY,
  numItems = 1,
  userData,
}: CheckoutParams = {}) =>
  track(
    'Purchase',
    {
      content_ids: [CONTENT_ID],
      content_type: CONTENT_TYPE,
      contents: getDefaultContents(value),
      currency,
      num_items: numItems,
      value,
    },
    userData
  );
