type BaseEventParams = {
  value?: number;
  currency?: string;
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
    __META_PIXEL_ID_CLIPS?: string;
  }
}

const CURRENCY = 'USD';
const DEFAULT_VALUE = 40;
const CONTENT_ID = 'luxury-reels-pack';
const CONTENT_TYPE = 'product';
let hasWarnedNoFbq = false;
let hasWarnedBeforeInit = false;

const getDefaultContents = (value: number) => [
  {
    id: CONTENT_ID,
    quantity: 1,
    item_price: value,
  },
];

const isDev = () =>
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const canTrack = () => {
  if (typeof window === 'undefined') return false;

  if (typeof window.fbq !== 'function') {
    if (isDev() && !hasWarnedNoFbq) {
      console.warn('[clips pixel] fbq is not available. Event skipped.');
      hasWarnedNoFbq = true;
    }
    return false;
  }

  if (!window.__META_PIXEL_READY && isDev() && !hasWarnedBeforeInit) {
    console.warn('[clips pixel] Tracking called before pixel init finished.');
    hasWarnedBeforeInit = true;
  }

  return true;
};

const generateEventId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const track = (
  eventName: 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'AddPaymentInfo' | 'Purchase',
  payload?: Record<string, unknown>
) => {
  if (!canTrack()) return;

  const eventId = generateEventId();

  if (payload && Object.keys(payload).length > 0) {
    window.fbq?.('track', eventName, payload, { eventID: eventId });
    return eventId;
  }

  window.fbq?.('track', eventName);
  return eventId;
};

export const pageview = () => track('PageView');

export const viewContent = ({
  value = DEFAULT_VALUE,
  currency = CURRENCY,
}: BaseEventParams = {}) =>
  track(
    'ViewContent',
    {
      content_ids: [CONTENT_ID],
      content_type: CONTENT_TYPE,
      contents: getDefaultContents(value),
      currency,
      value,
    }
  );

export const initiateCheckout = ({
  value = DEFAULT_VALUE,
  currency = CURRENCY,
  numItems = 1,
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
    }
  );

export const addPaymentInfo = ({
  value = DEFAULT_VALUE,
  currency = CURRENCY,
  numItems = 1,
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
    }
  );

export const purchase = ({
  value = DEFAULT_VALUE,
  currency = CURRENCY,
  numItems = 1,
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
    }
  );
