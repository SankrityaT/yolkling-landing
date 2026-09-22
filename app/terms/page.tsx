import Link from "next/link";

export const metadata = {
  title: "terms, yolkling",
  description:
    "the simple, human terms for using yolkling, the app and the website. short, plain, and not scary.",
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
        <p className="leg-updated">last updated, september 2026</p>

        <p className="leg-lead">
          these are the plain terms for using yolkling. no lawyer speak, no traps. by using the app
          or this website, you are agreeing to the friendly stuff below.
        </p>

        <h2>what yolkling is</h2>
        <p>
          yolkling is a cozy ios app where you hatch and look after a little virtual creature that
          grows when you take care of yourself. it is free to hatch, free to play, and free to keep,
          with one optional subscription (yolkling plus) for people who want to support it. this is
          a small project made by two people who just want to cover the running costs, not get
          rich.
        </p>

        <h2>it is young, things will change</h2>
        <p>
          because this is a young app made by two humans, things will move around. features and how
          the app works can change, and sometimes something gets removed or reworked. we will try to
          be upfront when that happens.
        </p>

        <h2>yolkling plus</h2>
        <p>
          yolkling plus is an optional, auto-renewing subscription: $4.99 a month, or $34.99 a year
          (which works out to about $2.92 a month). both are founding prices. payment is charged to your apple account
          when you confirm the purchase, and it renews automatically unless you cancel at least 24
          hours before the end of the current period; renewal is charged within 24 hours of that
          period ending. you can manage or cancel it any time in your apple account settings, and
          cancelling stops the next renewal, not the period you already paid for.
        </p>
        <p>
          on price. the price is always shown in the app before you buy anything. $4.99 a month and
          $34.99 a year are founding prices, and we may raise the price for new subscribers later. if
          you subscribe at a founding price, you keep that price for as long as your subscription
          stays active, even after it goes up for everyone else. if your subscription ends and you
          start a new one later, the price at that time applies, and switching to a different plan is
          priced at that plan&apos;s current price. you will never be charged more without saying yes.
        </p>
        <p>
          refunds go through apple, not us, under apple&apos;s media services terms. we cannot
          process them ourselves even when we would like to.
        </p>
        <p>
          what plus does not do. it does not gate the game. every species, every cosmetic, every
          feature is reachable without paying. plus adds a monthly stipend of 400 yolks and a
          supporter mark on your profile, and that is genuinely it. yolks themselves are never sold
          outside that stipend, there are no loot boxes, and money never touches anything random.
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
          your creature and progress are yours to enjoy. anything you send us, like feedback, you
          are telling us we can read it and use it to improve yolkling. sign in is handled by apple,
          so there is no password to lose, and let us know at{" "}
          <a className="leg-link" href="mailto:hey@yolkling.com">
            hey@yolkling.com
          </a>{" "}
          if something looks off.
        </p>

        <h2>no warranty</h2>
        <p>
          yolkling is provided as is. it is a small, lovingly made thing, not a critical service. we
          cannot promise it will always be available, bug free, or perfect, and you use it at your
          own discretion. if it goes down for a bit, please be patient with the two people keeping it
          running.
        </p>

        <h2>limitation of liability</h2>
        <p>
          in plain terms, if something goes wrong while using yolkling, we are not on the hook for
          losses or damages beyond what the law requires. this is a cozy hobby app, not a bank or a
          medical device, so please do not rely on it for anything that actually matters. use it for
          the joy of it.
        </p>

        <h2>disputes and arbitration</h2>
        <p>
          if something ever goes wrong between us, please email{" "}
          <a className="leg-link" href="mailto:hey@yolkling.com">
            hey@yolkling.com
          </a>{" "}
          first, that is always the fastest way to sort it out, and it usually works. if we genuinely
          cannot resolve it that way, you and yolkling agree to settle the dispute through binding,
          individual arbitration rather than in court, and not as part of a class action, class
          arbitration, or any other group proceeding. that means both of us are giving up the right
          to a jury trial and to join or lead a class action against the other. either of us can still
          bring a qualifying dispute to small claims court instead of arbitration, if you would
          prefer. this applies to any dispute about the app, this website, or these terms, except
          where the law does not allow it.
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

        <p className="leg-foot">yolkling, a cozy little companion. made with care, september 2026.</p>
      </div>
    </main>
  );
}
