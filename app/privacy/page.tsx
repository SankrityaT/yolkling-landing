import Link from "next/link";

export const metadata = {
  title: "privacy, yolkling",
  description:
    "how yolkling handles your data. we collect as little as possible, never sell it, and never run ads or third party tracking.",
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
  .leg-foot {
    margin-top: 56px;
    padding-top: 24px;
    border-top: 1px solid rgba(42, 36, 27, 0.12);
    font-size: 15px;
    opacity: 0.7;
  }
`;

export default function PrivacyPage() {
  return (
    <main className="leg-wrap">
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <div className="leg-col">
        <Link href="/" className="leg-back">
          ← back to yolkling
        </Link>

        <h1 className="leg-title">privacy</h1>
        <p className="leg-updated">last updated, september 2026</p>

        <p className="leg-lead">
          yolkling is made by one person, and the whole point is to be gentle, including with your
          data. we collect as little as we can, we do not run ads, we do not let third parties track
          you, and we will never sell your data. your data stays yours. here is the plain version of
          how that works.
        </p>

        <h2>what we collect</h2>
        <p>
          yolkling is an ios app, plus this website. here is everything it touches, in plain terms.
        </p>

        <h3>health data</h3>
        <p>
          with your permission, yolkling reads two things from apple health: your step count and
          your sleep. it uses them for one purpose only, to let real life feed your creature. that
          reading happens entirely on your device.
        </p>
        <p>
          your health data is never sent to our servers or to anyone else. we could not sell it if
          we wanted to, because we never receive it. connecting health is optional and the whole app
          works without it. you can withdraw permission at any time in the apple health app, and
          yolkling simply stops reading.
        </p>

        <h3>screen time</h3>
        <p>
          with your permission, an apple extension works out a daily total of your time on the
          phone. it is aggregate only, it never sees which apps or websites you used, and it hands
          back a single number. that number stays on your device. this is optional too.
        </p>

        <h3>sign in with apple</h3>
        <p>
          signing in gives us one thing, the anonymous identifier apple provides. we do not request
          your name or your email address, and we do not receive them. that identifier is how your
          creature survives a new phone and how friends find you.
        </p>

        <h3>what we store on our server</h3>
        <p>
          your creature (its name, appearance, streak, coins and items owned), the room you share
          with friends, your friend connections, waves and postcards, and any feedback you send.
          this exists for one reason: so your creature survives a reinstall or a new phone.
        </p>

        <h3>subscriptions</h3>
        <p>
          payments are handled by apple, and by revenuecat, our subscription provider, which tells
          us whether a subscription is active. we never see your card details, your name, or your
          address.
        </p>

        <h3>the website</h3>
        <p>
          if you join the waitlist we store the email you typed in, and if you send feedback we
          store what you wrote so we can read it. neither is used to build a profile of you.
        </p>

        <h2>what we do not do</h2>
        <p>
          no advertising. no analytics or tracking sdks. no selling data, ever. no third party
          trackers. and health and screen time data never leave your device, full stop.
        </p>

        <h2>how it is stored</h2>
        <p>
          server data lives in a database hosted on supabase, encrypted in transit using tls and
          encrypted at rest. emails we send go out through a service called resend, which needs your
          address to deliver the message. these services process data on our behalf so yolkling can
          work, and that is the extent of it.
        </p>

        <h2>your rights</h2>
        <p>
          it is your data, so you get to decide. you can ask us what we have on file, ask us to
          correct it, or ask us to delete it, including your waitlist email. just write to{" "}
          <a className="leg-link" href="mailto:hey@yolkling.com">
            hey@yolkling.com
          </a>{" "}
          and a real human, me, will take care of it.
        </p>

        <h2>deleting your data</h2>
        <p>
          there is a delete my account button inside the app, under the you tab. it removes your
          creature, your collection, your friends, your postcards and everything else we hold about
          you from our servers. it is immediate and it is not recoverable, which is the point.
        </p>

        <h2>cookies and analytics</h2>
        <p>
          the website does not set tracking cookies, and we do not run third party advertising or
          analytics that follow you around. if we ever add a small privacy friendly way to count
          visits, it will be the kind that does not identify you, and we will update this page to say
          so honestly.
        </p>

        <h2>changes to this policy</h2>
        <p>
          if we change how any of this works, we will update this page and change the date at the
          top. nothing sneaky. for anything that actually affects you, we will be clear about it.
        </p>

        <h2>contact</h2>
        <p>
          questions, worries, or a request to be deleted, all welcome. reach me at{" "}
          <a className="leg-link" href="mailto:hey@yolkling.com">
            hey@yolkling.com
          </a>
          .
        </p>

        <p className="leg-foot">yolkling, a cozy little companion. made with care, september 2026.</p>
      </div>
    </main>
  );
}
