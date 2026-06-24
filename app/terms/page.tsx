import Link from "next/link";

export const metadata = {
  title: "terms, yolkling",
  description:
    "the simple, human terms for using the yolkling waitlist and the app once it arrives. short, plain, and not scary.",
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

export default function TermsPage() {
  return (
    <main className="leg-wrap">
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <div className="leg-col">
        <Link href="/" className="leg-back">
          ← back to yolkling
        </Link>

        <h1 className="leg-title">terms</h1>
        <p className="leg-updated">last updated, june 2026</p>

        <p className="leg-lead">
          these are the plain terms for using yolkling. no lawyer speak, no traps. by joining the
          waitlist or, later, using the app, you are agreeing to the friendly stuff below.
        </p>

        <h2>what yolkling is</h2>
        <p>
          yolkling is a cozy app where you hatch and look after a little virtual creature. right now
          it is pre launch, so all you can do is join a waitlist and send feedback. the app itself is
          coming, ios first. it is free to hatch, with some optional, cheap cosmetics down the line.
          this is a small project made by one person who just wants to cover the running costs, not
          get rich.
        </p>

        <h2>it is early, things will change</h2>
        <p>
          because this is pre launch and made by one human, things will move around. features,
          timelines, and how the app works can all change, and the launch date is a best guess, not a
          promise. we might even decide not to ship something. we will try to be upfront when that
          happens.
        </p>

        <h2>being decent about it</h2>
        <p>
          please use yolkling in good faith. that means do not try to break it, abuse it, spam the
          feedback box, or use it to harm other people. do not try to hack the service or mess with
          other people&apos;s stuff. if you do, we may have to remove your access. that is about as
          strict as it gets.
        </p>

        <h2>your account and content</h2>
        <p>
          when the app launches, your creature and progress are yours to enjoy. anything you send us,
          like feedback, you are telling us we can read it and use it to improve yolkling. keep your
          login details to yourself, and let us know at{" "}
          <a className="leg-link" href="mailto:hey@yolkling.com">
            hey@yolkling.com
          </a>{" "}
          if something looks off.
        </p>

        <h2>no warranty</h2>
        <p>
          yolkling is provided as is. it is a small, lovingly made thing, not a critical service. we
          cannot promise it will always be available, bug free, or perfect, and you use it at your
          own discretion. if it goes down for a bit, please be patient with the one person keeping it
          running.
        </p>

        <h2>limitation of liability</h2>
        <p>
          in plain terms, if something goes wrong while using yolkling, we are not on the hook for
          losses or damages beyond what the law requires. this is a cozy hobby app, not a bank or a
          medical device, so please do not rely on it for anything that actually matters. use it for
          the joy of it.
        </p>

        <h2>privacy</h2>
        <p>
          how we handle your data is its own page, and it is short and honest. have a read of the{" "}
          <Link className="leg-link" href="/privacy">
            privacy policy
          </Link>
          .
        </p>

        <h2>changes to these terms</h2>
        <p>
          if these terms change, we will update this page and the date at the top. nothing sneaky.
        </p>

        <h2>contact</h2>
        <p>
          got a question about any of this, just email{" "}
          <a className="leg-link" href="mailto:hey@yolkling.com">
            hey@yolkling.com
          </a>{" "}
          and a real person will answer.
        </p>

        <p className="leg-foot">yolkling, a cozy little companion. made with care, june 2026.</p>
      </div>
    </main>
  );
}
