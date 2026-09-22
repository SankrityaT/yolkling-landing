// Launch switch. Empty = waitlist mode. Set NEXT_PUBLIC_APP_STORE_URL to the product page
// (https://apps.apple.com/app/id…) and every CTA on the site becomes a download.
export const APP_STORE_URL = (process.env.NEXT_PUBLIC_APP_STORE_URL ?? "").trim();
export const IS_LIVE = /^https:\/\/apps\.apple\.com\//.test(APP_STORE_URL);
