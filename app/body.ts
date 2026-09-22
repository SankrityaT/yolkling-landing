export const BODY = `
<div class="grain" aria-hidden="true"></div>

<div class="preloader">
  <div class="egg" id="egg"><div class="egg-shell"></div><div class="egg-crack"></div></div>
  <p class="mono egg-status"><span id="hatchPct">0</span>% &nbsp;HATCHING&hellip;</p>
</div>

<div class="page" id="page">
  <nav class="nav">
    <a href="#top" class="nav-logo"><span class="dot-logo"></span><span class="brand">yolkling</span></a>
    <div class="nav-links">
      <a href="#hatch" data-cursor="">Hatch</a>
      <a href="#feeds" data-cursor="">Health</a>
      <a href="#how" data-cursor="">How</a>
      <a href="#collection" data-cursor="">Creatures</a>
      <a href="#cards" data-cursor="">Cards</a>
    </div>
    <div class="nav-right">
      <a href="#top" class="btn-pill when-wl" data-magnetic data-cursor="join"><span>Join waitlist</span></a>
      <a href="__APP_STORE__" class="btn-pill when-live" data-magnetic><span>Get the app</span></a>
      <button class="nav-toggler" aria-label="Menu"><span></span><span></span></button>
    </div>
  </nav>

  <div class="menu">
    <div class="menu-bg"></div><div class="menu-bg"></div><div class="menu-bg"></div>
    <div class="menu-inner">
      <div class="menu-main">
        <a href="#hatch" class="menu-link">Hatch</a>
        <a href="#feeds" class="menu-link">Health</a>
        <a href="#how" class="menu-link">How it works</a>
        <a href="#collection" class="menu-link">Creatures</a>
        <a href="#cards" class="menu-link">Cards</a>
      </div>
      <div class="menu-foot mono">
        <p>made with snacks and feelings</p>
        <p class="when-wl">● <span id="menuLive">early access is open</span></p><p class="when-live">● out now on the App Store</p>
      </div>
    </div>
  </div>

  <header class="hero" id="top">
    <div class="hero-text">
      <p class="hero-eyebrow mono"><span class="pip"></span> a little creature, secretly you</p>
      <h1 class="hero-h1">
        <span class="line-mask"><span class="line">he grows</span></span>
        <span class="line-mask"><span class="line">when <span class="wob">you</span> do.</span></span>
      </h1>
      <p class="hero-sub">sleep well, take a walk, put the phone down. he feels all of it.</p>
      <div class="when-wl">
      <form class="waitlist" id="waitlist" novalidate>
        <input type="email" id="wlEmail" class="wl-input" placeholder="you@email.com" autocomplete="email" required />
        <button type="submit" class="btn-primary" data-magnetic data-cursor="join"><span>Join the waitlist</span><i>→</i></button>
      </form>
      <p class="wl-meta mono"><span class="pip"></span> <span id="wlCount">be one of the first</span> · no spam, one email when we hatch</p>
      <div class="wl-done" id="wlDone" hidden>
        <p class="wl-done-h">you're in line.</p>
        <p class="wl-done-sub">i'll send you exactly one email, when it's ready to hatch. that's the only one you'll get. promise.</p>
        <button class="btn-line" id="wlShare" data-cursor="copy">copy the link to share ↗</button>
      </div>
      </div>
      <div class="hero-dl when-live">
        <a class="as-badge" href="__APP_STORE__" aria-label="Download Yolkling on the App Store"><img src="/badges/app-store-black.svg" alt="Download on the App Store" width="162" height="54"/></a>
        <p class="hero-dl-note">free to download, for iPhone</p>
      </div>
    </div>
    <div class="hero-show" id="heroShow">
      <div class="hs-field" aria-hidden="true"><div class="hs-row" id="hsRow1"></div><div class="hs-row hs-row-2" id="hsRow2"></div></div>
      <div class="hs-phone"><div class="phone"><img src="/shots/app/checkin.webp" alt="the yolkling app home screen: your little guy in his room, with check in, focus and visit" width="720" height="1564" fetchpriority="high"/></div></div>
    </div>
    <div class="stage" id="stage" hidden>
      <div class="stage-scene">
        <div class="hill" aria-hidden="true"></div>
        <div class="stage-tokens" aria-hidden="true">
          <span class="tok tok-heart"></span>
          <span class="tok tok-moon"></span>
          <span class="tok tok-coin"></span>
          <span class="tok tok-spark"></span>
          <span class="tok tok-leaf"></span>
        </div>
        <div class="creature" id="creature">
          <div class="cr-glow" aria-hidden="true"></div>
          <div class="cr-zzz" aria-hidden="true"><span>z</span><span>z</span><span>z</span></div>
          <div class="cr-arm cr-arm-l"></div>
          <div class="cr-arm cr-arm-r"></div>
          <div class="cr-body">
            <div class="cr-eye cr-eye-l"><div class="cr-pupil"></div></div>
            <div class="cr-eye cr-eye-r"><div class="cr-pupil"></div></div>
            <div class="cr-blush cr-blush-l"></div>
            <div class="cr-blush cr-blush-r"></div>
            <div class="cr-mouth"></div>
          </div>
          <div class="cr-foot cr-foot-l"></div>
          <div class="cr-foot cr-foot-r"></div>
        </div>
        <div class="cr-shadow" id="crShadow"></div>
      </div>
      <div class="stage-controls">
        <div class="day-demo" id="dayDemo">
          <span class="day-q mono">last night i…</span>
          <div class="day-opts">
            <button class="day-opt" data-day="rough" data-cursor="">slept rough</button>
            <button class="day-opt" data-day="good" data-cursor="">slept great</button>
          </div>
          <span class="day-say mono" id="daySay">tap one. watch him feel it</span>
        </div>
        <div class="vibe-picker" id="vibePicker">
          <button class="vibe is-on" data-vibe="yolk" style="--v:#FFC23B" aria-label="yolk"></button>
          <button class="vibe" data-vibe="chill" style="--v:#8FD0FF" aria-label="chill"></button>
          <button class="vibe" data-vibe="feral" style="--v:#73E0AE" aria-label="feral"></button>
          <button class="vibe" data-vibe="dreamy" style="--v:#FF94C2" aria-label="dreamy"></button>
          <button class="vibe" data-vibe="berry" style="--v:#7B5CF0" aria-label="berry"></button>
          <span class="vibe-say" id="vibeSay"></span>
        </div>
      </div>
    </div>
  </header>

  <section class="hatch" id="hatch">
    <div class="hatch-pin">
      <canvas id="hatchCanvas"></canvas>
      <div class="hatch-copy">
        <span class="sh" data-hatch="0"><i class="sh-egg" aria-hidden="true"></i><span class="sh-label">where they come from</span></span>
        <h2 class="hatch-h">no two are alike.<br/>yours is hatched<br/>from <span class="wob2">your vibe.</span></h2>
        <p class="hatch-p mono" id="hatchProg">scroll to hatch, 0%</p>
      </div>
    </div>
  </section>

  <section class="hatch-steps" aria-label="how your yolkling hatches">
    <ol class="hx">
      <li class="hx-step">
        <div class="hx-phone"><div class="phone"><img src="/shots/app/hatch-quiz.webp" alt="the first question: it's 3pm on a saturday. where are you?" width="720" height="1564" loading="lazy"/></div></div>
        <p class="hx-n">1</p><h3 class="hx-h">three silly questions</h3><p class="hx-p">a saturday, a snack, a dead phone. no wrong answers.</p>
      </li>
      <li class="hx-step">
        <div class="hx-phone"><div class="phone"><img src="/shots/app/hatch-make.webp" alt="make your yolkling: pick a look and a colour" width="720" height="1564" loading="lazy"/></div></div>
        <p class="hx-n">2</p><h3 class="hx-h">make it yours</h3><p class="hx-p">your answers pick a starting look. change the shape and colour until it feels right.</p>
      </li>
      <li class="hx-step">
        <div class="hx-phone"><div class="phone"><img src="/shots/app/hatch-sayhi.webp" alt="say hi to your little one" width="720" height="1564" loading="lazy"/></div></div>
        <p class="hx-n">3</p><h3 class="hx-h">say hi</h3><p class="hx-p">name them, and they're yours. there's only one of them.</p>
      </li>
    </ol>
  </section>

  <section class="feeds" id="feeds">
    <div class="section-head"><span class="sh" data-hatch="1"><i class="sh-egg" aria-hidden="true"></i><span class="sh-label">the flip</span></span></div>
    <div class="feeds-head">
      <h2 class="big-h">you kept a tamagotchi alive.<br/>this one looks after <span class="wob2">you.</span></h2>
    </div>
    <div class="tiles">
      <article class="tile tile-lemon" data-cycle>
        <h3 class="tile-h">sleep &amp; steps</h3>
        <p class="tile-p">he reads them from Apple Health, and nothing else. rest well, take a walk, and he trusts you a little more.</p>
        <div class="tile-phone"><div class="phone cyc">
          <img class="cyc-img is-on" src="/shots/app/health.webp" alt="the yolkling app asking to connect Apple Health: your real life earns their trust" width="720" height="1564" loading="lazy"/>
          <img class="cyc-img" src="/shots/app/health-prompt.webp" alt="apple's health permission sheet: yolkling asks to read only sleep and steps" width="720" height="1564" loading="lazy"/>
        </div></div>
      </article>
      <article class="tile tile-sky">
        <h3 class="tile-h">phone down</h3>
        <p class="tile-p">start a focus session. he rests and glows while you're away, and he's happiest when you do.</p>
        <div class="tile-phone"><div class="phone"><img src="/shots/app/focus.webp" alt="focus session: put your phone down, your little guy rests and glows while you're away" width="720" height="1564" loading="lazy"/></div></div>
      </article>
      <article class="tile tile-pink" data-cycle>
        <h3 class="tile-h">check in</h3>
        <p class="tile-p">tell him how you feel. you get 10 yolks, and he wanders off and comes home with a new friend for you to scratch open.</p>
        <ol class="tile-steps"><li class="is-on">how you feel</li><li>he goes looking</li><li>you scratch it</li></ol>
        <div class="tile-phone"><div class="phone cyc">
          <img class="cyc-img is-on" src="/shots/app/checkin-mood.webp" alt="the check-in sheet: how are you feeling? amazing, good, okay, low, tired or rough" width="720" height="1564" loading="lazy"/>
          <img class="cyc-img" src="/shots/app/checkin-found.webp" alt="look what it found: your yolkling comes home holding a face down card to scratch" width="720" height="1564" loading="lazy"/>
          <img class="cyc-img" src="/shots/app/checkin-reveal.webp" alt="sunny brought this home: a rare snowmallow card, scratched open" width="720" height="1564" loading="lazy"/>
        </div></div>
      </article>
    </div>
    <p class="feeds-note mono">steps and sleep are read on your phone and never sent to us. health is optional.</p>
  </section>

  <section class="how" id="how">
    <div class="how-intro">
      <span class="sh" data-hatch="1"><i class="sh-egg" aria-hidden="true"></i><span class="sh-label">what you get back</span></span>
      <h2 class="big-h">show up for yourself.<br/>he pays you back.</h2>
    </div>
    <div class="cards">
      <div class="card" id="card-3"><div class="card-inner">
        <div class="card-text">
          <div class="card-num">01</div>
          <h3 class="card-h">earn yolks</h3>
          <p class="card-p">yolks come from showing up. spend them on hats, colours and his room. you can't buy yolks on their own, you earn them by living.</p>
        </div>
        <div class="card-shot"><div class="phone"><img src="/shots/app/closet.webp" alt="the shop: colours, outfits and room items, paid for in yolks" width="720" height="1564" loading="lazy"/></div></div>
      </div></div>
      <div class="card" id="card-4"><div class="card-inner">
        <div class="card-text">
          <div class="card-num">02</div>
          <h3 class="card-h">collect<br/>them</h3>
          <p class="card-p">every yolkling you meet goes in your collection. some sets only turn up for a little while, so there's always something new to find.</p>
        </div>
        <div class="card-shot"><div class="phone"><img src="/shots/app/dex.webp" alt="your collection: species discovered so far, including a limited seasonal set" width="720" height="1564" loading="lazy"/></div></div>
      </div></div>
      <div class="card" id="card-5"><div class="card-inner">
        <div class="card-text">
          <div class="card-num">03</div>
          <h3 class="card-h">visit<br/>friends</h3>
          <p class="card-p">once a day he wanders off and comes home with a postcard. visit your friends' rooms, wave, leave a note, swap a spare hat. no feed, no followers, no likes.</p>
        </div>
        <div class="card-shot"><div class="phone"><img src="/shots/app/visit.webp" alt="visiting a friend's room: wave, leave a note, swap" width="720" height="1564" loading="lazy"/></div></div>
      </div></div>
    </div>
  </section>

  <section class="statement" id="statement">
    <div class="stmt-pin">
      <div class="stmt-text"><h2>touch grass</h2></div>
      <div class="stmt-reveal">
        <p class="mono">[ 04 / the twist ]</p>
        <h3>the only app on earth that wants you<br/>to <span class="wob3">put your phone down.</span></h3>
        <p class="stmt-sub">scroll all night and he just gets sleepy, and waits for you.<br/>no sickness, no guilt. miss a week and coming back feels like coming home.</p>
      </div>
    </div>
  </section>

  <section class="friends" id="friends">
    <div class="section-head"><span class="sh" data-hatch="2"><i class="sh-egg" aria-hidden="true"></i><span class="sh-label">they play together</span></span><span class="sh-aside">toss them around →</span></div>
    <div class="friends-copy"><h2 class="big-h">your friends' yolklings<br/>come over to play.</h2></div>
    <div class="pit" id="pit"><div class="pit-objects" id="pitObjects"></div></div>
  </section>

  <section class="collection" id="collection">
    <div class="col-pin">
      <div class="col-field" id="colField"></div>
      <div class="col-head col-head-in"><span class="sh" data-hatch="2"><i class="sh-egg" aria-hidden="true"></i><span class="sh-label">gotta hatch 'em</span></span><h2 class="big-h">203 species.<br/>yours is just<br/>the first.</h2></div>
      <div class="col-head col-head-out"><h2 class="big-h">what will<br/>you <span class="wob2">hatch?</span></h2></div>
    </div>
  </section>

  <section class="cardsec" id="cards">
    <div class="section-head"><span class="sh" data-hatch="3"><i class="sh-egg" aria-hidden="true"></i><span class="sh-label">every find is a card</span></span></div>
    <div class="cardsec-wrap">
      <div class="scratch" id="scratch">
        <div class="sc-stage">
          <div class="sc-card" id="scCard">
            <div class="sc-flip" id="scFlip">
              <div class="sc-front" id="scFront"></div>
              <canvas class="sc-back" id="scBack" aria-label="a face down card. scratch it to reveal who you got" role="img"></canvas>
              <div class="sc-panel-hint" id="scPanelHint" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 11.2V5.5a1.5 1.5 0 0 1 3 0v4.8h.4V3.9a1.5 1.5 0 0 1 3 0v6.4h.4V5.2a1.5 1.5 0 0 1 3 0v8.6c0 4.2-2.7 7.2-6.6 7.2-2.6 0-4.3-1.2-5.6-3.3l-2.9-4.8a1.4 1.4 0 0 1 2.3-1.6L9 14z"/><path d="M2.5 4.5c1.5-1.6 3.4-2.3 5-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>scratch it</div>
            </div>
          </div>
        </div>
        <p class="sc-hint mono" id="scHint">scratch the card to see who you got</p>
        <div class="sc-actions">
          <button class="btn-line" id="scSkip" type="button">just flip it</button>
          <button class="btn-line" id="scNext" type="button" hidden>draw another →</button>
        </div>
      </div>
      <div class="cardsec-copy">
        <h2 class="big-h">every find<br/>is a card.</h2>
        <p>a new species arrives face down. scratch it open, flip it over, watch the foil catch the light. six holo finishes, pearl to aurora, and the card backs give the rarity away before you even turn them.</p>
        <p>and the rarest foil in the game is on your own card. it comes from trust, which only grows when you take care of yourself. <strong>you cannot buy it.</strong></p>
      </div>
    </div>
  </section>

  <section class="store" id="store">
    <div class="section-head"><span class="sh" data-hatch="3"><i class="sh-egg" aria-hidden="true"></i><span class="sh-label">dress them up</span></span></div>
    <div class="store-wrap">
      <div class="store-copy">
        <h2 class="big-h">a little shop of hats, rooms and rare colours.</h2>
        <p class="store-lead">yolks are earned by living: check-ins, focus sessions, steps, sleep, streaks. spend them on the closet and the room. they are never sold on their own.</p>
        <div class="seg" role="tablist" aria-label="shop tabs">
          <button class="seg-btn" role="tab" type="button" data-tab="colours" aria-selected="false">Colours</button>
          <button class="seg-btn is-on" role="tab" type="button" data-tab="outfit" aria-selected="true">Outfit</button>
          <button class="seg-btn" role="tab" type="button" data-tab="room" aria-selected="false">Room</button>
        </div>
        <div class="store-caps">
          <div class="store-cap" data-cap="colours"><h3>21 rare colours</h3><p>solid, gradient and sheen finishes, plus seasonal drops that only show up for a while. preview any of them on your own yolkling before you spend a thing.</p></div>
          <div class="store-cap is-on" data-cap="outfit"><h3>88 cosmetics</h3><p>hats, glasses, scarves and more. try anything on first. the good ones glow with a rarity aura.</p></div>
          <div class="store-cap" data-cap="room"><h3>little rooms</h3><p>17 themes and 34 pieces of decor. build a home worth showing off when a friend's yolkling comes round.</p></div>
        </div>
        <p class="store-trade"><b>got spares?</b> trade them with a friend. both of you say yes, and you see it on your own creature first.</p>
        <p class="store-fine">no gacha, no loot boxes, no tricks. yolks are never for sale. the only thing money buys is yolkling+, and it gates nothing.</p>
      </div>
      <div class="store-shot">
        <div class="phone">
          <img class="store-img" data-img="colours" src="/shots/app/shop-colours.webp" alt="the shop's colours tab, previewing the rare galaxy colour on the yolkling" width="720" height="1564" loading="lazy"/>
          <img class="store-img is-on" data-img="outfit" src="/shots/app/shop-outfit.webp" alt="the shop's outfit tab, trying a tiara on before buying it with yolks" width="720" height="1564" loading="lazy"/>
          <img class="store-img" data-img="room" src="/shots/app/shop-room.webp" alt="the shop's room tab: themes like rainy day, pastel arcade and forest cabin" width="720" height="1564" loading="lazy"/>
        </div>
      </div>
    </div>
  </section>

  <section class="pricing" id="pricing">
    <div class="section-head"><span class="sh" data-hatch="4"><i class="sh-egg" aria-hidden="true"></i><span class="sh-label">when we hatch</span></span></div>
    <h2 class="big-h pricing-h">free to hatch.<br/>always will be.</h2>
    <div class="plans">
      <article class="plan">
        <div class="plan-top"><span class="mono">FREE</span><span class="plan-price">$0</span></div>
        <p class="plan-desc">the whole game. one yolkling, forever. no ads, no creepy stuff, your data stays yours.</p>
        <ul class="plan-list mono"><li>grows with your habits</li><li>every species + cosmetic, earnable</li><li>friend visits, gifts + postcards</li><li>private by design</li></ul>
        <a href="#top" class="plan-btn when-wl" data-magnetic data-cursor="join">join the list</a><a href="__APP_STORE__" class="plan-btn when-live" data-magnetic>get the app</a>
      </article>
      <article class="plan plan-feat">
        <div class="plan-badge mono">SUPPORTER</div>
        <div class="plan-top"><span class="mono">YOLKLING+</span><span class="plan-price">$2.92<small>/mo</small></span></div>
        <p class="plan-alt mono">billed $34.99 a year, or $4.99 month to month</p>
        <p class="plan-desc">a founding price, for people who want to support it. it doesn't unlock anything you can't already earn.</p>
        <ul class="plan-list mono"><li>400 yolks a month</li><li>a supporter mark on your profile</li><li>gates nothing, ever</li></ul>
        <a href="#top" class="plan-btn plan-btn-feat when-wl" data-magnetic data-cursor="join">join the list</a><a href="__APP_STORE__" class="plan-btn plan-btn-feat when-live" data-magnetic>get the app</a>
      </article>
    </div>
    <p class="pricing-note">prices above are founding prices. they'll go up for new people later, but join now and you keep yours. we'll also be adding more optional extras over time, things like limited edition cosmetics and seasonal drops, always cosmetic, never required to play.</p>
  </section>

  <footer class="outro" id="outro">
    <p class="outro-eyebrow"><span class="sh" data-hatch="4"><i class="sh-egg" aria-hidden="true"></i><span class="sh-label"><span class="when-wl">now hatching, join the flock</span><span class="when-live">out now, go hatch yours</span></span></span></p>
    <div class="outro-word"><svg id="strokeWord" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid meet" aria-label="yolkling"></svg></div>
    <p class="outro-line when-wl">be first<br/>to hatch yours.</p><p class="outro-line when-live">hatch yours<br/>today.</p>
    <button class="btn-primary btn-xl when-wl" id="outroJoin" data-magnetic data-cursor="join"><span>Join the waitlist</span><i>→</i></button><a class="btn-primary btn-xl when-live" href="__APP_STORE__" data-magnetic><span>Get the app</span><i>→</i></a>
    <div class="footer">
      <div class="footer-col"><span class="brand">yolkling</span><p class="mono">the little guy who's secretly you.</p></div>
      <div class="footer-col mono"><a href="#hatch">Hatch</a><a href="#how">How</a><a href="#collection">Creatures</a><a href="#cards">Cards</a></div>
      <div class="footer-col mono"><a href="/support">support</a><a href="/press">press</a><a href="/privacy">privacy</a><a href="/terms">terms</a></div>
      <div class="footer-col mono footer-status"><p class="live when-wl">● <span id="footLive">early access is open</span></p><p class="live when-live">● out now on the App Store</p><p>made by one person, with snacks and feelings</p><p>© 2026, please drink water</p></div>
    </div>
    <p class="footer-legal">Apple, the Apple logo, iPhone and Apple Health are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc. Tamagotchi is a trademark of Bandai. Yolkling is not affiliated with Apple or Bandai.</p>
  </footer>
</div>
`;
