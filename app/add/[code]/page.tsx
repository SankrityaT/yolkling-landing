import type { Metadata } from "next";

// Invite links (yolkling.com/add/YOLK-XXXXX). With the app installed, iOS opens the app
// straight into Friends and this page is never seen. Without it, this is what the friend
// lands on, so it has to say who invited them and how to get the app. It used to 404.

const APP_STORE_URL = "https://apps.apple.com/app/apple-store/id6804105200?pt=129291564&ct=invite-page&mt=8";
const isCode = (c: string) => /^YOLK-[A-Z0-9]{3,12}$/.test(c);

export const metadata: Metadata = {
  title: "a friend wants you on yolkling",
  description: "a tiny creature that grows when you take care of yourself, and visits your friends. free on the App Store for iPhone.",
  robots: { index: false, follow: false },
};

const CSS = `
  .inv{min-height:100svh;background:#FBF6EC;color:#2A241B;font-family:'DM Sans',system-ui,sans-serif;display:flex;align-items:center;justify-content:center;padding:40px 20px;text-align:center}
  .inv-col{max-width:440px;display:flex;flex-direction:column;align-items:center}
  .inv-yolk{width:150px;height:auto;margin-bottom:18px}
  .inv h1{font-family:'Onest',system-ui,sans-serif;font-weight:800;font-size:clamp(30px,7vw,40px);letter-spacing:-.02em;line-height:1.05;margin:0}
  .inv p{color:#6B6155;line-height:1.55;margin:14px 0 0}
  .inv-code{margin-top:22px;padding:12px 18px;border-radius:14px;background:#F4EAD6;font-family:'DM Mono',ui-monospace,monospace;font-size:20px;letter-spacing:.06em;user-select:all}
  .inv-badge{display:block;padding:14px;line-height:0;margin-top:14px}
  .inv-badge img{height:54px;width:auto}
  .inv-small{font-size:14px}
  .inv-home{margin-top:26px;font-size:14px;color:#2A241B;opacity:.7}
  .inv-legal{margin-top:34px;font-size:11px;opacity:.55;max-width:380px}
`;

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const raw = decodeURIComponent((await params).code || "").toUpperCase();
  const code = isCode(raw) ? raw : null;
  return (
    <main className="inv">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="inv-col">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="inv-yolk" src="/shots/creatures/stardrop.webp" alt="" width={150} height={170} />
        <h1>a friend wants you on yolkling</h1>
        <p>a tiny creature that grows when you take care of yourself. your yolklings can visit each other, wave, and swap spare hats.</p>
        {code && <div className="inv-code" aria-label="your friend's code">{code}</div>}
        <a className="inv-badge" href={APP_STORE_URL} aria-label="Download Yolkling on the App Store">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/badges/app-store-black.svg" alt="Download on the App Store" width={162} height={54} />
        </a>
        <p className="inv-small">
          {code
            ? <>once you&apos;ve hatched yours, open yolkling, tap <b>Friends</b>, and add <b>{code}</b>. or just tap your friend&apos;s link again.</>
            : <>once you&apos;ve hatched yours, open yolkling and tap <b>Friends</b> to add them.</>}
        </p>
        <a className="inv-home" href="/">what is yolkling?</a>
        <p className="inv-legal">App Store and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries.</p>
      </div>
    </main>
  );
}
