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
        <p className="leg-updated">last updated, june 2026</p>

        <p className="leg-lead">
          yolkling is made by one person, and the whole point is to be gentle, including with your
          data. we collect as little as we can, we do not run ads, we do not let third parties track
          you, and we will never sell your data. your data stays yours. here is the plain version of
          how that works.
        </p>

        <h2>what we collect right now</h2>
        <p>
          today yolkling is just a website with a waitlist. there is no app yet. so at the moment we
          only collect two things.
        </p>
        <ul>
          <li>
            <strong>your waitlist email.</strong> if you sign up, we store the email address you
            typed in.
          </li>
          <li>
            <strong>feedback you choose to send.</strong> if you submit a feedback message, we store
            what you wrote so we can read it and improve.
          </li>
        </ul>
        <p>
          that is it. we do not ask for your name, your location, your contacts, or anything else.
        </p>

        <h2>why we collect it</h2>
        <p>
          we keep your email for one reason, to send you a single email when yolkling launches.
          after that we are not going to spam you. feedback is kept so we can actually read what you
          told us and make the app better. we do not use any of this to build a profile of you.
        </p>

        <h2>how it is stored</h2>
        <p>
          your email and any feedback live in a database hosted on supabase. emails we send go out
          through a service called resend, which needs your address to deliver the message. data is
          encrypted in transit using tls, and encrypted at rest. we try to keep the footprint small
          and boring on purpose.
        </p>

        <h2>who we share it with</h2>
        <p>
          nobody, in the sense that matters. we do not sell your data, we do not rent it, and we do
          not hand it to advertisers. the only outside parties involved are the infrastructure tools
          we need to actually run the thing, supabase to store data and resend to send the one
          launch email. they process data on our behalf so the site can work, and that is the extent
          of it.
        </p>

        <h2>your rights</h2>
        <p>
          it is your data, so you get to decide. you can ask us to delete your email from the
          waitlist at any time, and we will remove it. you can also ask us what we have on file, or
          ask us to correct it. just email{" "}
          <a className="leg-link" href="mailto:hey@yolkling.com">
            hey@yolkling.com
          </a>{" "}
          and a real human, me, will take care of it.
        </p>

        <h2>cookies and analytics</h2>
        <p>
          the website does not set tracking cookies, and we do not run third party advertising or
          analytics that follow you around. if we ever add a small privacy friendly way to count
          visits, it will be the kind that does not identify you, and we will update this page to say
          so honestly.
        </p>

        <h2>the future app</h2>
        <p>
          when the app ships, it will store your creature and your progress, a minimal amount of
          account info, and, if you opt in, friend connections so your creature can visit friends.
          gentle activity signals stay on your device wherever we can manage it. the same promises
          hold, as little as possible, no ads, no selling, no creepy tracking. we will update this
          page with the specifics before any of that goes live.
        </p>

        <h2>changes to this policy</h2>
        <p>
          if we change how any of this works, we will update this page and change the date at the
          top. nothing sneaky. for anything that actually affects you, like the app launching, we
          will be clear about it.
        </p>

        <h2>contact</h2>
        <p>
          questions, worries, or a request to be deleted, all welcome. reach me at{" "}
          <a className="leg-link" href="mailto:hey@yolkling.com">
            hey@yolkling.com
          </a>
          .
        </p>

        <p className="leg-foot">yolkling, a cozy little companion. made with care, june 2026.</p>
      </div>
    </main>
  );
}
