import Link from "next/link";

export const metadata = {
  title: "support, yolkling",
  description:
    "need help with yolkling? email a real human. answers to common questions about health, time off your phone, friends, account deletion, and price.",
};

const PAGE_CSS = `
  .leg-wrap {
    min-height: 100vh;
    background: #FBF6EC;
    color: #2A241B;
    font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
    line-height: 1.7;
    padding: 32px 20px 96px;
  }
  .leg-col {
    max-width: 720px;
    margin: 0 auto;
  }
  .leg-back {
    display: inline-block;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #2A241B;
    text-decoration: none;
    opacity: 0.72;
    transition: opacity 0.15s ease;
    margin-bottom: 40px;
  }
  .leg-back:hover { opacity: 1; }
  .leg-title {
    font-family: 'Onest', system-ui, sans-serif;
    font-weight: 800;
    font-size: clamp(34px, 6vw, 48px);
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0 0 6px;
  }
  .leg-title::after {
    content: "";
    display: block;
    width: 56px;
    height: 5px;
    border-radius: 999px;
    background: #FFC23B;
    margin-top: 16px;
  }
  .leg-updated {
    font-size: 14px;
    opacity: 0.6;
    margin: 14px 0 40px;
  }
  .leg-wrap h2 {
    font-family: 'Onest', system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(20px, 3.5vw, 24px);
    letter-spacing: -0.01em;
    margin: 40px 0 12px;
  }
  .leg-wrap p {
    margin: 0 0 16px;
    font-size: 17px;
  }
  .leg-wrap ul {
    margin: 0 0 16px;
    padding-left: 22px;
  }
  .leg-wrap li {
    margin: 0 0 8px;
    font-size: 17px;
  }
  .leg-wrap a.leg-link {
    color: #2A241B;
    text-decoration: underline;
    text-decoration-color: #FFC23B;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }
  .leg-lead {
    font-size: 19px;
    opacity: 0.9;
  }
  .leg-mail {
    display: inline-block;
    margin: 4px 0 8px;
    font-family: 'Onest', system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(22px, 4vw, 30px);
    letter-spacing: -0.01em;
    color: #2A241B;
    text-decoration: underline;
    text-decoration-color: #FFC23B;
    text-decoration-thickness: 3px;
    text-underline-offset: 4px;
  }
  .leg-foot {
    margin-top: 56px;
    padding-top: 24px;
    border-top: 1px solid rgba(42, 36, 27, 0.12);
    font-size: 15px;
    opacity: 0.7;
  }
`;

export default function SupportPage() {
  return (
    <main className="leg-wrap">
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <div className="leg-col">
        <Link href="/" className="leg-back">
          ← back to yolkling
        </Link>

        <h1 className="leg-title">support</h1>
        <p className="leg-updated">a real human reads every message</p>

        <p className="leg-lead">
          yolkling is made by two people. if something is broken, confusing, or you just want a hand,
          email us and we will get back to you. no ticket robots, no phone tree, just us.
        </p>

        <h2>get help</h2>
        <p>the fastest way to reach us is email.</p>
        <a className="leg-mail" href="mailto:hey@yolkling.com">
          hey@yolkling.com
        </a>
        <p>
          you can also tap <strong>share a thought</strong> inside the app (on the “you” screen) to
          send a note straight to us. we read every one.
        </p>

        <h2>common questions</h2>

        <p>
          <strong>is it free?</strong> yes. no ads, and everything in the game is earned by showing up
          for yourself. there is one optional subscription, yolkling plus, for people who want to
          support it. it adds a supporter glow and a monthly handful of yolks, and nothing is locked
          without it.
        </p>

        <p>
          <strong>how does the health part work?</strong> it is optional. if you connect apple
          health, yolkling reads your steps and last night’s sleep so your creature looks a little
          livelier on the days you take care of yourself. those numbers stay on your device, we never
          send them anywhere, and the app works fine without it.
        </p>

        <p>
          <strong>what about time off my phone?</strong> also optional and opt in. if you turn it on,
          yolkling can tell how long you were away from your phone, never which apps or what you were
          doing, and your creature grows a touch livelier for the time away. you can turn it on or off
          any time from the home screen.
        </p>

        <p>
          <strong>friends and postcards.</strong> you add a friend with a code, visit each other’s
          rooms, and send kind notes. notes are only between friends you have both added. if anyone is
          unkind, you can <strong>block</strong> them or <strong>report</strong> a note from the menu
          on that note, and they are gone.
        </p>

        <p>
          <strong>how do i delete my account?</strong> open the “you” screen and tap{" "}
          <strong>delete my account</strong>. that erases your creature, your collection, your
          friends, and everything saved, on your device and on our server, and it cannot be undone.
          prefer i do it for you? email{" "}
          <a className="leg-link" href="mailto:hey@yolkling.com">
            hey@yolkling.com
          </a>{" "}
          and i will remove everything.
        </p>

        <p>
          <strong>your data + privacy.</strong> we collect as little as possible, never run ads, and
          never sell your data. the full details are on the{" "}
          <a className="leg-link" href="/privacy">
            privacy page
          </a>
          .
        </p>

        <h2>how fast do i reply?</h2>
        <p>
          it is just the two of us, so usually within a couple of days, often sooner. if it is urgent,
          say so in the subject line and we will jump on it.
        </p>

        <h2>contact</h2>
        <p>
          bugs, questions, requests, or just to say hi, all welcome at{" "}
          <a className="leg-link" href="mailto:hey@yolkling.com">
            hey@yolkling.com
          </a>
          .
        </p>

        <p className="leg-foot">yolkling, made by two people who want an app that wants you off your phone.</p>
      </div>
    </main>
  );
}
