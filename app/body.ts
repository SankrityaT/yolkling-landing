export const BODY = `
<div class="grain" aria-hidden="true"></div>
<div class="cursor" aria-hidden="true"><div class="cursor-ring"></div><div class="cursor-dot"></div><span class="cursor-label"></span></div>

<div class="preloader">
  <div class="egg" id="egg"><div class="egg-shell"></div><div class="egg-crack"></div></div>
  <p class="mono egg-status"><span id="hatchPct">0</span>% &nbsp;HATCHING&hellip;</p>
</div>

<div class="page" id="page">
  <nav class="nav">
    <a href="#top" class="nav-logo"><span class="dot-logo"></span><span class="brand">yolkling</span></a>
    <div class="nav-links">
      <a href="#hatch" data-cursor="">Hatch</a>
      <a href="#how" data-cursor="">How</a>
      <a href="#collection" data-cursor="">Creatures</a>
      <a href="#feedback" data-cursor="">Say hi</a>
    </div>
    <div class="nav-right">
      <a href="#top" class="btn-pill" data-magnetic data-cursor="join"><span>Join waitlist</span></a>
      <button class="nav-toggler" aria-label="Menu"><span></span><span></span></button>
    </div>
  </nav>

  <div class="menu">
    <div class="menu-bg"></div><div class="menu-bg"></div><div class="menu-bg"></div>
    <div class="menu-inner">
      <div class="menu-main">
        <a href="#hatch" class="menu-link">Hatch</a>
        <a href="#how" class="menu-link">How it works</a>
        <a href="#collection" class="menu-link">Creatures</a>
        <a href="#feedback" class="menu-link">Say hi</a>
      </div>
      <div class="menu-foot mono">
        <p>made with snacks and feelings</p>
        <p>● <span id="menuLive">early access is open</span></p>
      </div>
    </div>
  </div>

  <header class="hero" id="top">
    <div class="hero-text">
      <p class="hero-eyebrow mono"><span class="pip"></span> a little creature, secretly you</p>
      <h1 class="hero-h1">
        <span class="line-mask"><span class="line">meet the</span></span>
        <span class="line-mask"><span class="line">little guy</span></span>
        <span class="line-mask"><span class="line">who's <span class="wob">you.</span></span></span>
      </h1>
      <p class="hero-sub">he hatches in a few taps, then grows from how you actually live. sleep well, move more, put the phone down, and watch him light up.</p>
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
    <div class="stage" id="stage">
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
      <div class="stage-controls">
        <div class="day-demo" id="dayDemo">
          <span class="day-q mono">last night i…</span>
          <div class="day-opts">
            <button class="day-opt" data-day="rough" data-cursor="">slept rough</button>
            <button class="day-opt" data-day="good" data-cursor="">slept great</button>
          </div>
          <span class="day-say mono" id="daySay">tap one, watch him feel it ↑</span>
        </div>
        <div class="vibe-picker" id="vibePicker">
          <button class="vibe is-on" data-vibe="yolk" style="--v:#FFC23B" aria-label="yolk"></button>
          <button class="vibe" data-vibe="chill" style="--v:#8FD0FF" aria-label="chill"></button>
          <button class="vibe" data-vibe="feral" style="--v:#73E0AE" aria-label="feral"></button>
          <button class="vibe" data-vibe="dreamy" style="--v:#FF94C2" aria-label="dreamy"></button>
          <button class="vibe" data-vibe="berry" style="--v:#7B5CF0" aria-label="berry"></button>
          <span class="vibe-say" id="vibeSay">yolk. the classic.</span>
        </div>
      </div>
    </div>
  </header>

  <section class="marquee">
    <div class="marquee-track">
      <span>you're doing great</span><span class="m-dot"></span>
      <span>drink some water</span><span class="m-dot"></span>
      <span>he missed you</span><span class="m-dot"></span>
      <span>go touch grass</span><span class="m-dot"></span>
      <span>text your friend back</span><span class="m-dot"></span>
      <span>you're doing great</span><span class="m-dot"></span>
      <span>drink some water</span><span class="m-dot"></span>
      <span>he missed you</span><span class="m-dot"></span>
      <span>go touch grass</span><span class="m-dot"></span>
      <span>text your friend back</span><span class="m-dot"></span>
    </div>
  </section>

  <section class="hatch" id="hatch">
    <div class="hatch-pin">
      <canvas id="hatchCanvas"></canvas>
      <div class="hatch-copy">
        <span class="mono">[ 01 / where they come from ]</span>
        <h2 class="hatch-h">no two are alike.<br/>yours is hatched<br/>from <span class="wob2">your vibe.</span></h2>
        <p class="hatch-p mono" id="hatchProg">scroll to hatch, 0%</p>
      </div>
    </div>
  </section>

  <section class="how" id="how">
    <div class="how-intro">
      <span class="mono">[ 02 / how it grows ]</span>
      <h2 class="big-h">four tiny steps to<br/>a friend for life.</h2>
    </div>
    <div class="cards">
      <div class="card" id="card-1"><div class="card-inner">
        <div class="card-text">
          <div class="card-num">01</div>
          <h3 class="card-h">tell it<br/>your vibe</h3>
          <p class="card-p">choose your colours, its look, its little quirks. a few taps and out comes a creature that knows the shape of you.</p>
        </div>
        <div class="card-shot"><img src="/shots/vibe.png" alt="make your yolkling: pick its look and colour" loading="lazy"/></div>
      </div></div>
      <div class="card" id="card-2"><div class="card-inner">
        <div class="card-text">
          <div class="card-num">02</div>
          <h3 class="card-h">it hatches</h3>
          <p class="card-p">out pops a creature that exists exactly once in the universe. your colours, the faces it makes, your particular brand of weird.</p>
        </div>
        <div class="card-shot"><img src="/shots/hatch.png" alt="your yolk hatches, say hi to your little one" loading="lazy"/></div>
      </div></div>
      <div class="card" id="card-3"><div class="card-inner">
        <div class="card-text">
          <div class="card-num">03</div>
          <h3 class="card-h">raise it by<br/>living</h3>
          <p class="card-p">it grows when you do. your steps, sleep and time off your phone earn its trust, so it learns to wave, celebrates your wins, and gets sleepy late at night so you wind down too.</p>
        </div>
        <div class="card-shot"><img src="/shots/home.png" alt="your yolk at home with daily check in, focus and visit" loading="lazy"/></div>
      </div></div>
      <div class="card" id="card-4"><div class="card-inner">
        <div class="card-text">
          <div class="card-num">04</div>
          <h3 class="card-h">go visit<br/>friends</h3>
          <p class="card-p">send your yolk to a friend's room, see their little world, and leave a kind note. a visit cheers them both up. that's the whole product.</p>
        </div>
        <div class="card-shot"><img src="/shots/visit.png" alt="visit a friend's room, wave, leave a note, send a gift" loading="lazy"/></div>
      </div></div>
    </div>
  </section>

  <section class="statement" id="statement">
    <div class="stmt-pin">
      <div class="stmt-text"><h2>touch grass</h2></div>
      <div class="stmt-reveal">
        <p class="mono">[ 03 / the twist ]</p>
        <h3>the only app on earth that wants you<br/>to <span class="wob3">put your phone down.</span></h3>
      </div>
    </div>
  </section>

  <section class="friends" id="friends">
    <div class="section-head"><span class="mono">[ 04 / they play together ]</span><span class="mono">toss them around →</span></div>
    <div class="friends-copy"><h2 class="big-h">your friends' yolklings<br/>come over to play.</h2></div>
    <div class="pit" id="pit"><div class="pit-objects" id="pitObjects"></div></div>
  </section>

  <section class="collection" id="collection">
    <div class="col-pin">
      <div class="col-field" id="colField"></div>
      <div class="col-head col-head-in"><span class="mono">[ 05 / gotta hatch 'em ]</span><h2 class="big-h">912 species.<br/>yours is just<br/>the first.</h2></div>
      <div class="col-head col-head-out"><h2 class="big-h">what will<br/>you <span class="wob2">hatch?</span></h2></div>
    </div>
  </section>

  <section class="store" id="store">
    <div class="section-head"><span class="mono">[ 06 / dress them up ]</span><span class="mono">this is how we keep the lights on</span></div>
    <div class="store-wrap">
      <h2 class="big-h">a little shop of hats,<br/>rooms and rare colours.</h2>
      <p class="store-lead">your yolkling earns coins just by you living well. sleep, water, sunlight, showing up. spend them on outfits, tiny rooms and seasonal looks. that is the free way, and it is the main way.</p>
      <div class="store-grid">
        <div class="store-card"><span class="store-chip" style="--c:#FF94C2"></span><h3>outfits and hats</h3><p>dress your little guy, mix and match, and swap a spare with a friend. both of you have to say yes.</p></div>
        <div class="store-card"><span class="store-chip" style="--c:#8FD0FF"></span><h3>little rooms</h3><p>give them a cosy home to decorate, and to show off when a friend's yolkling comes to visit.</p></div>
        <div class="store-card"><span class="store-chip" style="--c:#73E0AE"></span><h3>rare and seasonal</h3><p>colours and species that only appear for a while. earn them, or chip in a couple bucks to grab one.</p></div>
      </div>
      <p class="store-fine mono">no gacha, no loot boxes, no tricks. you can earn almost everything for free. a few dollars now and then just covers the servers. that is the entire business.</p>
    </div>
  </section>

  <section class="feedback" id="feedback">
    <div class="section-head"><span class="mono">[ 07 / tell me what you think ]</span><span class="mono">i read every one</span></div>
    <div class="fb-wrap">
      <h2 class="big-h">would you actually use this?</h2>
      <p class="fb-sub">be honest. what would make you or a friend pay a couple bucks for it. what's missing. i'm one person building this and your note genuinely helps me decide what to do next.</p>
      <form class="fb-form" id="fbForm" novalidate>
        <input id="fbName" class="wl-input" placeholder="your name (optional)" />
        <textarea id="fbMsg" class="fb-textarea" rows="4" placeholder="what do you think? would you use it?"></textarea>
        <button type="submit" class="btn-primary" data-magnetic data-cursor="send"><span>send it</span><i>→</i></button>
      </form>
      <div class="fb-done" id="fbDone" hidden>
        <p class="wl-done-h">thank you, really.</p>
        <p class="wl-done-sub">i read every note myself. this is the stuff that tells me whether to keep going.</p>
      </div>
    </div>
  </section>

  <section class="pricing" id="pricing">
    <div class="section-head"><span class="mono">[ 08 / when we hatch ]</span><span class="mono">waitlist gets founding perks</span></div>
    <h2 class="big-h pricing-h">free to hatch.<br/>always will be.</h2>
    <div class="plans">
      <article class="plan">
        <div class="plan-top"><span class="mono">FREE</span><span class="plan-price">$0</span></div>
        <p class="plan-desc">one yolkling. forever. no ads, no creepy stuff, your data stays yours.</p>
        <ul class="plan-list mono"><li>1 creature</li><li>grows with your habits</li><li>friend visits</li><li>private by design</li></ul>
        <a href="#top" class="plan-btn" data-magnetic data-cursor="join">join the list</a>
      </article>
      <article class="plan plan-feat">
        <div class="plan-badge mono">SUPPORTER</div>
        <div class="plan-top"><span class="mono">YOLKLING+</span><span class="plan-price">$4.99/mo</span></div>
        <p class="plan-desc">a founding price, for people who want to support it. it doesn't unlock anything you can't already earn.</p>
        <ul class="plan-list mono"><li>a supporter glow</li><li>400 yolks a month</li><li>gates nothing, ever</li></ul>
        <a href="#top" class="plan-btn plan-btn-feat" data-magnetic data-cursor="join">join the list</a>
      </article>
      <article class="plan">
        <div class="plan-top"><span class="mono">FRIENDS</span><span class="plan-price">free</span></div>
        <p class="plan-desc">add the people you like. your creatures visit, leave gifts, and bring back postcards.</p>
        <ul class="plan-list mono"><li>shared little village</li><li>swap cosmetics, gift yolks</li><li>it remembers everyone</li></ul>
        <a href="#top" class="plan-btn" data-magnetic data-cursor="join">join the list</a>
      </article>
    </div>
  </section>

  <footer class="outro" id="outro">
    <p class="mono outro-eyebrow">[ now hatching, join the flock ]</p>
    <div class="outro-word"><svg id="strokeWord" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid meet" aria-label="yolkling"></svg></div>
    <p class="outro-line">be first<br/>to hatch yours.</p>
    <button class="btn-primary btn-xl" id="outroJoin" data-magnetic data-cursor="join"><span>Join the waitlist</span><i>→</i></button>
    <div class="footer">
      <div class="footer-col"><span class="brand">yolkling</span><p class="mono">the little guy who's secretly you.</p></div>
      <div class="footer-col mono"><a href="#hatch">Hatch</a><a href="#how">How</a><a href="#collection">Creatures</a><a href="#feedback">Say hi</a></div>
      <div class="footer-col mono"><a href="/support">support</a><a href="/press">press</a><a href="/privacy">privacy</a><a href="/terms">terms</a><a href="#feedback">say hi</a></div>
      <div class="footer-col mono footer-status"><p class="live">● <span id="footLive">early access is open</span></p><p>made by one person, with snacks and feelings</p><p>© 2026, please drink water</p></div>
    </div>
  </footer>
</div>
`;
