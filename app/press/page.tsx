import Link from "next/link";

export const metadata = {
  title: "press, yolkling",
  description:
    "press kit for yolkling, a virtual pet that grows when you take care of yourself in real life. icon, screenshots, fact sheet, and the story.",
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
    max-width: 780px;
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
    margin: 48px 0 12px;
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

  /* fact sheet */
  .fact {
    background: #F4EAD6;
    border-radius: 20px;
    padding: 24px 28px;
    margin: 8px 0 32px;
  }
  .fact dl {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 10px 16px;
    margin: 0;
  }
  .fact dt {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.6;
    align-self: start;
    padding-top: 2px;
  }
  .fact dd {
    margin: 0;
    font-size: 16px;
  }

  /* copy blocks with a copy affordance */
  .copyblock {
    background: #fff;
    border: 1.5px solid rgba(42, 36, 27, 0.12);
    border-radius: 16px;
    padding: 18px 20px;
    margin: 0 0 14px;
    font-size: 16px;
  }
  .copyblock-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    opacity: 0.5;
    margin-bottom: 8px;
  }

  /* downloads */
  .dl-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 4px 0 32px;
  }
  .dl-card {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    border: 1.5px solid rgba(42, 36, 27, 0.14);
    border-radius: 14px;
    padding: 10px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    text-decoration: none;
    color: #2A241B;
    transition: transform 0.15s ease, border-color 0.15s ease;
  }
  .dl-card:hover {
    transform: translateY(-2px);
    border-color: #FFC23B;
  }
  .dl-icon {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    object-fit: cover;
    flex: none;
  }
  .shot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 14px;
    margin: 4px 0 32px;
  }
  .shot-grid a {
    display: block;
    border-radius: 16px;
    overflow: hidden;
    border: 1.5px solid rgba(42, 36, 27, 0.12);
    transition: transform 0.15s ease, border-color 0.15s ease;
  }
  .shot-grid a:hover {
    transform: translateY(-3px);
    border-color: #FFC23B;
  }
  .shot-grid img {
    display: block;
    width: 100%;
    height: auto;
  }

  .leg-foot {
    margin-top: 56px;
    padding-top: 24px;
    border-top: 1px solid rgba(42, 36, 27, 0.12);
    font-size: 15px;
    opacity: 0.7;
  }
`;

export default function PressPage() {
  return (
    <main className="leg-wrap">
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <div className="leg-col">
        <Link href="/" className="leg-back">
          ← back to yolkling
        </Link>

        <h1 className="leg-title">press</h1>
        <p className="leg-updated">everything you need in one place, no email required</p>

        <p className="leg-lead">
          yolkling is a virtual pet that grows when you take care of yourself in real life. your
          steps, sleep, and time off your phone feed your yolk, and you collect new yolks and dress
          them up. it is made by two people, it is free to play, and it is the only app that
          actually wants you to put your phone down. everything below is free to use in a story, no
          need to ask.
        </p>

        <h2>fact sheet</h2>
        <div className="fact">
          <dl>
            <dt>name</dt>
            <dd>Yolkling</dd>
            <dt>developer</dt>
            <dd>Sankritya Thakur and Havishea Vannemreddy, a two-person team</dd>
            <dt>price</dt>
            <dd>free, no ads. one optional supporter subscription, yolkling plus</dd>
            <dt>platform</dt>
            <dd>iOS (iPhone)</dd>
            <dt>requires</dt>
            <dd>iOS 18 or later</dd>
            <dt>category</dt>
            <dd>Lifestyle</dd>
            <dt>website</dt>
            <dd>
              <a className="leg-link" href="https://yolkling.com">
                yolkling.com
              </a>
            </dd>
            <dt>press contact</dt>
            <dd>
              <a className="leg-link" href="mailto:hey@yolkling.com">
                hey@yolkling.com
              </a>
            </dd>
          </dl>
        </div>

        <h2>one sentence</h2>
        <div className="copyblock">
          <span className="copyblock-label">for a quick mention</span>
          Yolkling is a virtual pet that grows when you take care of yourself in real life.
        </div>

        <h2>one paragraph</h2>
        <div className="copyblock">
          <span className="copyblock-label">for brief coverage</span>
          Yolkling is a free iOS app built by a two-person team, a small virtual creature you hatch and
          raise by actually living well. Steps, sleep, and time away from your phone feed it and
          make it visibly livelier, and a gentle daily check-in and focus sessions earn you a soft
          currency to dress it up and grow your collection. There is no gacha and no loot boxes, and
          nothing in the game is locked behind a payment: everything is earned. Friends can visit each other&apos;s rooms and send
          kind notes. It is, as far as we can tell, the only app that wants you off your phone.
        </div>

        <h2>the longer version</h2>
        <div className="copyblock">
          <span className="copyblock-label">for a feature</span>
          <p style={{ marginBottom: 12 }}>
            Most apps compete for your attention. Yolkling is built to give it back. It is a cozy
            virtual pet, called a &ldquo;yolk,&rdquo; that you hatch by picking a color and a look,
            and it becomes genuinely yours over a few weeks of care: it warms up to you, learns to
            wave, and starts celebrating your wins, but only from things you do for yourself, never
            from tapping on it.
          </p>
          <p style={{ marginBottom: 12 }}>
            Connect Apple Health, optionally, and your steps and last night&apos;s sleep make the
            creature visibly livelier on the days you take care of yourself. Start a focus session
            and it rests and glows while your phone stays face down. Turn on Screen Time, also
            optional, and the time you spend away from your phone feeds it too, privacy blind: it
            only ever knows how long, never what you were doing. On a rough day it just gets sleepy,
            never sick or sad. The team&apos;s one hard rule is no guilt mechanics, ever.
          </p>
          <p>
            The economy is entirely earned: a daily mood check-in, focus sessions, and healthy days
            pay out a soft currency spent on hats, colors, and room decor, never sold on its own. Friends
            add each other with a code, visit one another&apos;s rooms, and send small kind notes.
            There are no ads and no tracking, and the one optional subscription is a way to support
            the app, not a way to unlock it. It is a two-person project made by people who wanted an
            app that was actually on their side.
          </p>
        </div>

        <h2>the angle, if you want one</h2>
        <p>
          a few honest hooks, pick whichever fits your outlet:
        </p>
        <ul>
          <li>
            <strong>the anti-doomscroll pet.</strong> most virtual pets guilt you into opening the
            app. this one is designed to reward you for closing it.
          </li>
          <li>
            <strong>built by two people.</strong> no studio, no funding round, no growth team. just
            two friends who wanted a wellbeing app that felt kind instead of naggy.
          </li>
          <li>
            <strong>no dark patterns, on purpose.</strong> no streak-loss guilt, no loot boxes, no
            gacha, no push notifications begging you back. the &ldquo;sleepy, never sick&rdquo; rule
            is a real product decision, not a slogan.
          </li>
          <li>
            <strong>privacy by default.</strong> health and screen-time signals are processed on
            device. nothing is sold, nothing is tracked across apps.
          </li>
        </ul>

        <h2>assets</h2>
        <p>app icon and a set of real screenshots, straight off the device, no framing added.</p>
        <div className="dl-row">
          <a className="dl-card" href="/press/icon-1024.png" download>
            <img className="dl-icon" src="/press/icon-1024.png" alt="" />
            icon-1024.png ↓
          </a>
        </div>
        <div className="shot-grid">
          <a href="/press/screenshots/01-hero.png" download>
            <img src="/press/screenshots/01-hero.png" alt="the yolk at home" loading="lazy" />
          </a>
          <a href="/press/screenshots/02-hatch.png" download>
            <img src="/press/screenshots/02-hatch.png" alt="hatching a new yolk" loading="lazy" />
          </a>
          <a href="/press/screenshots/03-health.png" download>
            <img src="/press/screenshots/03-health.png" alt="growing from steps, sleep, and time off your phone" loading="lazy" />
          </a>
          <a href="/press/screenshots/04-focus.png" download>
            <img src="/press/screenshots/04-focus.png" alt="a focus session in progress" loading="lazy" />
          </a>
          <a href="/press/screenshots/07-visit.png" download>
            <img src="/press/screenshots/07-visit.png" alt="visiting a friend's room" loading="lazy" />
          </a>
        </div>

        <h2>about the developer</h2>
        <p>
          Yolkling is built by Sankritya Thakur and Havishea Vannemreddy, a team of two covering
          everything between them: code, design, and marketing. no investors. happy to do interviews,
          demos, or a quick call, just ask.
        </p>

        <h2>get in touch</h2>
        <p>fastest way to reach a real person for interviews, review copies, or anything else.</p>
        <a className="leg-mail" href="mailto:hey@yolkling.com">
          hey@yolkling.com
        </a>

        <p className="leg-foot">yolkling, made by two people who want an app that wants you off your phone.</p>
      </div>
    </main>
  );
}
