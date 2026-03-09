function normalizePixelId(rawValue) {
  return (rawValue || "").replace(/[^0-9]/g, "");
}

const PIXEL_ID = normalizePixelId(window.__META_PIXEL_ID_CLIPS);
const IS_DEV =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

function initializeFacebookPixel(f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
}

initializeFacebookPixel(
  window,
  document,
  "script",
  "https://connect.facebook.net/en_US/fbevents.js",
);

if (PIXEL_ID) {
  window.__META_PIXEL_ID = PIXEL_ID;
  window.fbq("init", PIXEL_ID);
  window.__META_PIXEL_READY = true;
  window.dispatchEvent(new CustomEvent("meta:pixel:ready"));
} else if (IS_DEV) {
  console.warn("[clips pixel] Missing or invalid pixel id. Skipping fbq init.");
}
