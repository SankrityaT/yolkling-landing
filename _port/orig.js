/* =========================================================
   YOLKLING — engine.
   Hero creature = bespoke GSAP interaction (eyes track, drag,
   squish, spring-back, hearts). Plus gallery techniques:
   - Matter ball-pit            (cg-playable-objects)
   - particle hatch canvas       (adaline, procedural)
   - sticky 3D cards             (phive-sticky-cards)
   - 3D z-scatter collection     (kaitonote-3d-gallery)
   - giant scaleY statement      (phive-text-scroll)
   - cosine-arc slider           (voku)
   - Lenis + ticker
   ========================================================= */
gsap.registerPlugin(ScrollTrigger);
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover:none)").matches;
if (window.CustomEase) CustomEase.create("pop", "0.34,1.56,0.64,1");

let lenis;
if (!reduced) {
  lenis = new Lenis({ duration: 1.1, lerp: 0.1 });
  window.lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const CANDY = ["#7B5CF0", "#FF94C2", "#73E0AE", "#FFD25A", "#FF8A5B", "#8FD0FF"];

/* =========================================================
   PRELOADER (hatching egg)
   ========================================================= */
function runPreloader() {
  const egg = document.getElementById("egg");
  const crack = document.querySelector(".egg-crack");
  const pct = document.getElementById("hatchPct");
  const c = { v: 0 };
  const tl = gsap.timeline({ delay: 0.25 });
  tl.to(egg, { rotation: -8, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: 9, transformOrigin: "50% 90%" }, 0)
    .to(c, { v: 100, duration: 1.9, ease: "power1.inOut", onUpdate: () => (pct.textContent = Math.floor(c.v)) }, 0)
    .to(crack, { opacity: 1, duration: 0.2 }, 1.5)
    .to(egg, { scale: 1.15, duration: 0.15, ease: "pop" }, ">")
    .to(".egg, .egg-status", { y: -30, opacity: 0, duration: 0.5, ease: "power2.in" }, ">")
    .to(".preloader", { yPercent: -100, duration: 0.9, ease: window.CustomEase ? "pop" : "power4.inOut" }, ">-0.1")
    .add(revealHero, "<0.2");
}

function revealHero() {
  gsap.set(".hero-h1 .line", { yPercent: 115 });
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".stage", { scale: 0, opacity: 0, duration: 1, ease: "elastic.out(1,0.6)" }, 0)
    .to(".hero-h1 .line", { yPercent: 0, duration: 1, stagger: 0.1 }, 0.2)
    .from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.6 }, 0.2)
    .from(".hero-sub", { opacity: 0, y: 20, duration: 0.7 }, 0.6)
    .from(".hero-cta > *", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, 0.7)
    .from(".nav", { opacity: 0, y: -14, duration: 0.6 }, 0.3);
  initCreature();
}

/* =========================================================
   HERO CREATURE — the star
   ========================================================= */
function initCreature() {
  const cr = document.getElementById("creature");
  const body = cr.querySelector(".cr-body");
  const stage = document.getElementById("stage");
  const shadow = document.getElementById("crShadow");
  const pupils = cr.querySelectorAll(".cr-pupil");
  const arms = cr.querySelectorAll(".cr-arm");

  // idle breathing on the inner body (independent of drag transforms)
  gsap.to(body, { scaleX: 1.04, scaleY: 0.96, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 100%" });
  arms.forEach((a, i) => gsap.to(a, { rotation: i ? 14 : -14, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.2 }));

  // blink
  const eyes = cr.querySelectorAll(".cr-eye");
  function blink() {
    gsap.to(eyes, { scaleY: 0.12, duration: 0.07, yoyo: true, repeat: 1, transformOrigin: "50% 50%" });
    gsap.delayedCall(2 + Math.random() * 3.5, blink);
  }
  gsap.delayedCall(2, blink);

  // pupils track cursor
  const pq = [...pupils].map((p) => ({ x: gsap.quickTo(p, "x", { duration: 0.25, ease: "power3" }), y: gsap.quickTo(p, "y", { duration: 0.25, ease: "power3" }), el: p }));
  // body look (idle only)
  const lookX = gsap.quickTo(cr, "x", { duration: 0.5, ease: "power3" });
  const lookY = gsap.quickTo(cr, "y", { duration: 0.5, ease: "power3" });
  const lookR = gsap.quickTo(cr, "rotation", { duration: 0.6, ease: "power3" });

  let mode = "idle";
  if (!isTouch) window.addEventListener("mousemove", (e) => {
    pq.forEach(({ x, y, el }) => {
      const r = el.parentElement.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const a = Math.atan2(dy, dx), d = Math.min(Math.hypot(dx, dy) / 40, 1) * (r.width * 0.16);
      x(Math.cos(a) * d); y(Math.sin(a) * d);
    });
    if (mode === "idle") {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      lookX(gsap.utils.clamp(-18, 18, (e.clientX - cx) * 0.02));
      lookY(gsap.utils.clamp(-14, 14, (e.clientY - cy) * 0.02));
      lookR(gsap.utils.clamp(-6, 6, (e.clientX - cx) * 0.008));
    }
  });

  // hover delight
  cr.addEventListener("pointerenter", () => { cr.classList.add("happy"); if (mode === "idle") gsap.to(cr, { y: "-=18", duration: 0.3, ease: "pop", yoyo: true, repeat: 1 }); });
  cr.addEventListener("pointerleave", () => cr.classList.remove("happy"));

  // drag + squish + spring back
  let startPX, startPY, startTX, startTY, prevX, prevYy, moved;
  const mx = gsap.quickTo(cr, "x", { duration: 0.12, ease: "power2" });
  const my = gsap.quickTo(cr, "y", { duration: 0.12, ease: "power2" });

  cr.addEventListener("pointerdown", (e) => {
    mode = "drag"; moved = 0;
    startPX = e.clientX; startPY = e.clientY;
    startTX = gsap.getProperty(cr, "x"); startTY = gsap.getProperty(cr, "y");
    prevX = e.clientX; prevYy = e.clientY;
    gsap.killTweensOf(cr, "rotation");
    gsap.to(shadow, { scale: 0.7, opacity: 0.5, duration: 0.3 });
    cr.setPointerCapture(e.pointerId);
  });
  cr.addEventListener("pointermove", (e) => {
    if (mode !== "drag") return;
    const tx = startTX + (e.clientX - startPX), ty = startTY + (e.clientY - startPY);
    const dx = e.clientX - prevX;
    moved += Math.abs(dx) + Math.abs(e.clientY - prevYy);
    prevX = e.clientX; prevYy = e.clientY;
    mx(tx); my(ty);
    const sx = gsap.utils.clamp(1, 1.3, 1 + Math.abs(dx) * 0.012);
    gsap.set(cr, { scaleX: sx, scaleY: 2 - sx, rotation: gsap.utils.clamp(-18, 18, dx * 0.6) });
  });
  function release(e) {
    if (mode !== "drag") return;
    mode = "return";
    gsap.to(shadow, { scale: 1, opacity: 1, duration: 0.6, ease: "pop" });
    gsap.to(cr, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 1.1, ease: "elastic.out(1,0.45)", onComplete: () => (mode = "idle") });
    spawnHearts(moved > 60 ? 5 : 3);
  }
  cr.addEventListener("pointerup", release);
  cr.addEventListener("pointercancel", release);

  function spawnHearts(n) {
    const r = cr.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    for (let i = 0; i < n; i++) {
      const h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      h.setAttribute("viewBox", "0 0 24 24"); h.classList.add("heart");
      h.innerHTML = `<path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z" fill="${CANDY[1 + (i % 5)]}"/>`;
      const sz = 16 + Math.random() * 16;
      h.style.width = h.style.height = sz + "px";
      h.style.left = (r.left - sr.left + r.width / 2 - sz / 2) + "px";
      h.style.top = (r.top - sr.top + r.height * 0.3) + "px";
      stage.appendChild(h);
      gsap.to(h, { y: -120 - Math.random() * 80, x: (Math.random() - 0.5) * 160, rotation: (Math.random() - 0.5) * 80, duration: 1.1 + Math.random() * 0.4, ease: "power1.out" });
      gsap.to(h, { opacity: 0, duration: 0.6, delay: 0.7, onComplete: () => h.remove() });
    }
  }

  // ----- vibe re-hatch: prove the promise (each vibe = a different creature) -----
  const feet = cr.querySelectorAll(".cr-foot");
  const VIBES = {
    cozy: { c: "#7B5CF0", deep: "#5a3fd0", say: "cozy. classic." },
    chill: { c: "#8FD0FF", deep: "#5fa9e0", say: "mmm, chill." },
    feral: { c: "#73E0AE", deep: "#46b585", say: "feral. iconic." },
    dreamy: { c: "#FF94C2", deep: "#d86b9c", say: "a little dreamy." },
    sunny: { c: "#FFD25A", deep: "#e0aa2e", say: "sunny side up." },
  };
  const vibeSay = document.getElementById("vibeSay");
  function setVibe(name, btn) {
    const v = VIBES[name]; if (!v) return;
    ["cozy", "chill", "feral", "dreamy", "sunny"].forEach((m) => cr.classList.remove("vibe-" + m));
    cr.classList.add("vibe-" + name);
    document.querySelectorAll(".vibe").forEach((b) => b.classList.toggle("is-on", b === btn));
    gsap.to(body, { backgroundColor: v.c, duration: 0.5, ease: "power2.out" });
    gsap.to(arms, { backgroundColor: v.c, duration: 0.5 });
    gsap.to(feet, { backgroundColor: v.deep, duration: 0.5 });
    gsap.fromTo(cr, { scale: 0.85 }, { scale: 1, duration: 0.7, ease: "elastic.out(1,0.4)" });
    spawnHearts(4);
    vibeSay.textContent = v.say;
    gsap.fromTo(vibeSay, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 });
  }
  document.querySelectorAll(".vibe").forEach((b) => b.addEventListener("click", () => setVibe(b.dataset.vibe, b)));

  // ----- spontaneous antics when left alone -----
  (function antics() {
    gsap.delayedCall(5 + Math.random() * 6, () => {
      if (mode === "idle") {
        const pick = Math.floor(Math.random() * 4);
        if (pick === 0) gsap.to(cr, { y: "-=46", duration: 0.4, ease: "pop", yoyo: true, repeat: 1 });
        else if (pick === 1) gsap.to(cr, { rotation: "+=360", duration: 0.85, ease: "pop", onComplete: () => gsap.set(cr, { rotation: 0 }) });
        else if (pick === 2) gsap.to(cr, { rotation: 12, duration: 0.12, ease: "sine.inOut", yoyo: true, repeat: 5, onComplete: () => gsap.set(cr, { rotation: 0 }) });
        else { gsap.to(body, { scaleY: 1.12, scaleX: 0.9, duration: 0.18, yoyo: true, repeat: 1, ease: "pop" }); spawnHearts(2); }
      }
      antics();
    });
  })();
}

/* =========================================================
   CURSOR + MAGNETIC
   ========================================================= */
function initCursor() {
  if (isTouch) return;
  const cur = document.querySelector(".cursor");
  const dot = cur.querySelector(".cursor-dot"), ring = cur.querySelector(".cursor-ring"), label = cur.querySelector(".cursor-label");
  const q = (el, p, d) => gsap.quickTo(el, p, { duration: d, ease: "power3" });
  const dx = q(dot, "x", 0.1), dy = q(dot, "y", 0.1), rx = q(ring, "x", 0.4), ry = q(ring, "y", 0.4), lx = q(label, "x", 0.4), ly = q(label, "y", 0.4);
  window.addEventListener("mousemove", (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); lx(e.clientX); ly(e.clientY); });
  document.querySelectorAll("a,button,[data-cursor],[data-magnetic],.creature").forEach((el) => {
    el.addEventListener("mouseenter", () => { const l = el.getAttribute("data-cursor"); if (l) { cur.classList.add("is-label"); label.textContent = l; } else cur.classList.add("is-hover"); });
    el.addEventListener("mouseleave", () => cur.classList.remove("is-hover", "is-label"));
  });
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" }), my = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    el.addEventListener("mousemove", (e) => { const r = el.getBoundingClientRect(); mx((e.clientX - (r.left + r.width / 2)) * 0.35); my((e.clientY - (r.top + r.height / 2)) * 0.35); });
    el.addEventListener("mouseleave", () => { mx(0); my(0); });
  });
}

/* =========================================================
   MARQUEE
   ========================================================= */
function initMarquee() { gsap.to(".marquee-track", { xPercent: -50, duration: 22, ease: "none", repeat: -1 }); }

/* =========================================================
   HATCH — particle assembly into an egg/blob
   ========================================================= */
function initHatch() {
  const canvas = document.getElementById("hatchCanvas");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [], progress = 0;

  function blobTargets() {
    const R = 300, off = document.createElement("canvas"); off.width = R; off.height = R;
    const o = off.getContext("2d"); o.fillStyle = "#fff";
    // a soft blob/egg silhouette
    o.beginPath(); o.ellipse(R / 2, R * 0.54, R * 0.32, R * 0.38, 0, 0, Math.PI * 2); o.fill();
    o.beginPath(); o.ellipse(R / 2, R * 0.30, R * 0.26, R * 0.22, 0, 0, Math.PI * 2); o.fill();
    const d = o.getImageData(0, 0, R, R).data, pts = [];
    for (let y = 0; y < R; y += 3) for (let x = 0; x < R; x += 3) if (d[(y * R + x) * 4 + 3] > 128) pts.push({ x, y });
    return { pts, R };
  }
  function build() {
    canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px"; canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const vw = window.innerWidth, vh = window.innerHeight, { pts, R } = blobTargets();
    const scale = Math.min(vw, vh) * 0.66 / R, cx = vw * (vw < 800 ? 0.5 : 0.64), cy = vh * 0.44;
    particles = pts.map((p) => ({ tx: cx + (p.x - R / 2) * scale, ty: cy + (p.y - R / 2) * scale, sx: Math.random() * vw, sy: Math.random() * vh, d: Math.random() * 0.3, c: CANDY[Math.floor(Math.random() * CANDY.length)] }));
  }
  build();
  let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(build, 200); });

  ScrollTrigger.create({
    trigger: ".hatch", start: "top top", end: () => `+=${window.innerHeight * 3}`, pin: ".hatch-pin", scrub: 1, invalidateOnRefresh: true,
    onUpdate: (s) => { progress = s.progress; document.getElementById("hatchProg").textContent = `SCROLL TO HATCH — ${Math.round(progress * 100)}%`; },
  });
  function render() {
    const vw = window.innerWidth, vh = window.innerHeight; ctx.clearRect(0, 0, vw, vh);
    for (const p of particles) {
      const pp = Math.max(0, Math.min(1, (progress - p.d) / (1 - p.d)));
      const e = pp < 0.5 ? 2 * pp * pp : 1 - Math.pow(-2 * pp + 2, 2) / 2;
      const x = p.sx + (p.tx - p.sx) * e, y = p.sy + (p.ty - p.sy) * e;
      ctx.globalAlpha = 0.15 + pp * 0.85; ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1; requestAnimationFrame(render);
  }
  render();
}

/* =========================================================
   STICKY 3D CARDS
   ========================================================= */
function initStickyCards() {
  const cards = gsap.utils.toArray(".card");
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    const inner = card.querySelector(".card-inner");
    gsap.to(inner, { y: "-40%", z: -220, rotationX: 38, ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top 88%", end: "top -10%", scrub: true } });
    gsap.to(inner, { "--ov": 0.8, ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top 80%", end: "top top", scrub: true } });
  });
}

/* =========================================================
   STATEMENT — giant scaleY
   ========================================================= */
function initStatement() {
  const tl = gsap.timeline({ scrollTrigger: { trigger: ".statement", start: "top top", end: () => `+=${window.innerHeight * 2.2}`, pin: ".stmt-pin", scrub: 1 } });
  tl.fromTo(".stmt-text h2", { scaleY: 0 }, { scaleY: 1, ease: "power2.out", duration: 0.4 })
    .fromTo(".stmt-reveal", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.42)
    .to(".stmt-text h2", { scaleY: 0, ease: "power2.in", duration: 0.35 }, 0.75)
    .to(".stmt-reveal", { opacity: 0, duration: 0.2 }, 0.78);
}

/* =========================================================
   FRIENDS — Matter ball pit of mini creatures
   ========================================================= */
function initBallPit() {
  ScrollTrigger.create({ trigger: ".friends", start: "top 60%", once: true, onEnter: makePit });
  function makePit() {
    if (typeof Matter === "undefined") return;
    const cont = document.getElementById("pitObjects");
    const W = cont.clientWidth, H = cont.clientHeight; if (!W || !H) return;
    const { Engine, Bodies, Composite, Mouse, MouseConstraint, Runner } = Matter;
    const engine = Engine.create(); engine.gravity.y = 1;
    const t = 300;
    Composite.add(engine.world, [
      Bodies.rectangle(W / 2, H + t / 2, W + 2 * t, t, { isStatic: true }),
      Bodies.rectangle(-t / 2, H / 2, t, H * 3, { isStatic: true }),
      Bodies.rectangle(W + t / 2, H / 2, t, H * 3, { isStatic: true }),
      Bodies.rectangle(W / 2, -t / 2 - H, W + 2 * t, t, { isStatic: true }),
    ]);
    const bodies = [];
    for (let i = 0; i < 13; i++) {
      const rad = (W < 700 ? 32 : 46) + Math.random() * 22;
      const el = document.createElement("div");
      el.className = "blobby"; el.style.width = el.style.height = rad * 2 + "px";
      el.style.background = CANDY[i % CANDY.length]; el.innerHTML = "<i></i>";
      cont.appendChild(el);
      const b = Bodies.circle(60 + Math.random() * (W - 120), -100 - i * 90, rad, { restitution: 0.78, friction: 0.05, frictionAir: 0.01 });
      Composite.add(engine.world, b); bodies.push({ b, el, rad });
    }
    const mouse = Mouse.create(cont);
    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    Composite.add(engine.world, MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } }));
    Runner.run(Runner.create(), engine);
    (function sync() { bodies.forEach(({ b, el, rad }) => { el.style.transform = `translate(${b.position.x - rad}px,${b.position.y - rad}px) rotate(${b.angle}rad)`; }); requestAnimationFrame(sync); })();
  }
}

/* =========================================================
   COLLECTION — 3D z-scatter of mini creatures
   ========================================================= */
function initCollection() {
  const field = document.getElementById("colField");
  const dirs = [[1.2, 0.7], [-1.3, 0.9], [1.0, -1.1], [-1.5, -0.7], [0.6, 1.3], [-0.8, -1.2], [1.4, 0.2], [-1.1, 0.4], [0.3, -1.3], [1.5, -0.5], [-0.6, 1.1], [0.9, 0.9], [-1.4, -0.3], [0.5, -0.9], [-0.3, 1.2], [1.1, -0.9]];
  const vw = window.innerWidth, vh = window.innerHeight, mob = vw < 800;
  const cardBg = ["#FFF3E0", "#FFE3EE", "#E6F8EF", "#FFF6D6", "#E9F4FF", "#F0EAFE"];
  const els = dirs.map((d, i) => {
    const el = document.createElement("div"); el.className = "col-card";
    el.style.background = cardBg[i % cardBg.length];
    const mini = document.createElement("div"); mini.className = "mini";
    mini.style.background = CANDY[i % CANDY.length]; el.appendChild(mini);
    field.appendChild(el); return el;
  });
  const ends = dirs.map((d) => ({ x: d[0] * vw * (mob ? 0.7 : 0.5), y: d[1] * vh * (mob ? 0.7 : 0.5), z: 2000 }));
  els.forEach((el) => gsap.set(el, { x: 0, y: 0, z: -1000, scale: 0 }));
  ScrollTrigger.create({
    trigger: ".collection", start: "top top", end: () => `+=${window.innerHeight * 14}`, pin: ".col-pin", scrub: 1, invalidateOnRefresh: true,
    onUpdate: (s) => {
      const p = s.progress;
      els.forEach((el, i) => {
        const ip = Math.max(0, (p - i * 0.028) * 3.4), e = ends[i % ends.length];
        gsap.set(el, { z: gsap.utils.interpolate(-1000, e.z, Math.min(ip, 1)), scale: gsap.utils.interpolate(0, 1, Math.min(ip * 2, 1)), x: gsap.utils.interpolate(0, e.x, Math.min(ip, 1)), y: gsap.utils.interpolate(0, e.y, Math.min(ip, 1)) });
      });
      gsap.set(".col-head-in", { opacity: 1 - gsap.utils.clamp(0, 1, (p - 0.5) / 0.18) });
      gsap.set(".col-head-out", { opacity: gsap.utils.clamp(0, 1, (p - 0.78) / 0.16) });
    },
  });
}

/* =========================================================
   VOICES — cosine-arc slider
   ========================================================= */
function initSlider() {
  const root = document.getElementById("slider");
  const data = [
    { q: "i cried when mine learned to wave. it's a triangle with eyes.", n: "maya, 22" },
    { q: "deleted instagram. kept the yolkling. genuinely happier.", n: "deon, 31" },
    { q: "my long-distance bf and i co-raise one. it's our baby now.", n: "priya, 26" },
    { q: "it got sleepy at 1am so i actually went to bed. wild.", n: "tom, 29" },
    { q: "named him after my grandad. now i tear up at a blob.", n: "luca, 34" },
    { q: "529 hours in. he has a tiny hat. i would die for him.", n: "sam, 19" },
    { q: "my therapist asked about it by name last session.", n: "noor, 27" },
    { q: "it visited my sister's yolkling and they're 'dating' now??", n: "kai, 24" },
  ];
  const W = 250, H = 320, GAP = 135, N = data.length, track = N * GAP, ARC = 150, LIFT = 100, LERP = 0.06;
  let target = 0, cur = 0, vw, vh, vcx, baseY;
  const els = data.map((d, i) => {
    const s = document.createElement("div"); s.className = "slide"; s.style.background = ["#FFE3EE", "#E6F8EF", "#FFF6D6", "#E9F4FF", "#F0EAFE", "#FFF3E0"][i % 6];
    s.innerHTML = `<div class="slide-inner"><span class="mono">★★★★★</span><p class="slide-quote">“${d.q}”</p><div class="slide-who"><span class="slide-face" style="background:${CANDY[i % CANDY.length]}"></span><div><b>${d.n}</b><br><span class="mono">yolkling+ member</span></div></div></div>`;
    root.appendChild(s); return s;
  });
  function dims() { vw = root.clientWidth; vh = root.clientHeight; vcx = vw / 2; baseY = vh * 0.48; }
  dims(); window.addEventListener("resize", dims);
  function layout(off) {
    els.forEach((el, i) => {
      let wx = (((i * GAP - off) % track) + track) % track; if (wx > track / 2) wx -= track;
      const cxp = vcx + wx, nd = (cxp - vcx) / (vw * 0.5), ad = Math.min(Math.abs(nd), 1.3);
      const sc = Math.max(1 - ad * 0.78, 0.26), w = W * sc, h = H * sc, cl = Math.min(ad, 1);
      const drop = (1 - Math.cos(cl * Math.PI)) * 0.5 * ARC, lift = Math.max(1 - ad * 2, 0) * LIFT;
      gsap.set(el, { x: cxp - w / 2, y: baseY - h / 2 + drop - lift, width: w, height: h, zIndex: Math.round((1 - ad) * 100) });
      el.style.opacity = ad > 1.15 ? 0 : 1;
    });
  }
  (function raf() { cur += (target - cur) * LERP; layout(cur); requestAnimationFrame(raf); })();
  root.addEventListener("wheel", (e) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return; e.preventDefault(); target += e.deltaX * 0.6; }, { passive: false });
  let down = false, sx = 0, st = 0;
  root.addEventListener("pointerdown", (e) => { down = true; sx = e.clientX; st = target; root.setPointerCapture(e.pointerId); });
  root.addEventListener("pointermove", (e) => { if (down) target = st - (e.clientX - sx) * 1.4; });
  root.addEventListener("pointerup", () => (down = false));
  gsap.ticker.add(() => { if (!down) target += 0.3; });
}

/* =========================================================
   OVERLAY MENU
   ========================================================= */
function initMenu() {
  const toggler = document.querySelector(".nav-toggler"), menu = document.querySelector(".menu");
  const bgs = document.querySelectorAll(".menu-bg"), inner = document.querySelector(".menu-inner");
  let open = false;
  document.querySelectorAll(".menu-link").forEach((a) => { a.innerHTML = `<span class="line" style="display:block">${a.textContent}</span>`; a.style.overflow = "hidden"; });
  const tl = gsap.timeline({ paused: true });
  tl.to(bgs, { scaleY: 1, duration: 0.7, stagger: 0.08, ease: "power3.inOut" })
    .to(inner, { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)", duration: 0.6, ease: "power3.inOut" }, "-=0.45")
    .fromTo(".menu-link .line", { yPercent: 115 }, { yPercent: 0, duration: 0.7, stagger: 0.07, ease: "pop" }, "-=0.4")
    .fromTo(".menu-foot", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.3");
  function set(v) { open = v; toggler.classList.toggle("open", v); menu.style.pointerEvents = v ? "auto" : "none"; if (v) { tl.timeScale(1).play(); lenis && lenis.stop(); } else { tl.timeScale(1.6).reverse(); lenis && lenis.start(); } }
  toggler.addEventListener("click", () => set(!open));
  document.querySelectorAll(".menu-link").forEach((a) => a.addEventListener("click", () => set(false)));
}

/* =========================================================
   OUTRO — yolkling stroke reveal
   ========================================================= */
function initOutro() {
  const svg = document.getElementById("strokeWord");
  const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  t.setAttribute("x", "600"); t.setAttribute("y", "185"); t.setAttribute("text-anchor", "middle");
  t.setAttribute("font-family", "Onest, sans-serif"); t.setAttribute("font-size", "240"); t.setAttribute("font-weight", "800"); t.setAttribute("letter-spacing", "-8"); t.textContent = "yolkling";
  svg.appendChild(t);
  gsap.set(svg, { clipPath: "inset(0 100% 0 0)" });
  gsap.to(svg, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: ".outro", start: "top 60%", end: "top 8%", scrub: 1 } });
  gsap.to(t, { attr: { fill: "rgba(255,255,255,0.14)" }, duration: 0.8, scrollTrigger: { trigger: ".outro", start: "top 22%", toggleActions: "play none none reverse" } });
  gsap.from(".outro-line", { opacity: 0, y: 24, duration: 0.9, ease: "pop", scrollTrigger: { trigger: ".outro-line", start: "top 85%" } });
}

/* =========================================================
   HEADINGS + COUNTERS
   ========================================================= */
function initHeadings() {
  gsap.utils.toArray(".big-h, .hatch-h, .pricing-h").forEach((h) => gsap.from(h, { yPercent: 10, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 88%" } }));
  gsap.utils.toArray(".plan").forEach((p, i) => gsap.from(p, { y: 60, opacity: 0, duration: 0.7, delay: i * 0.08, ease: "pop", scrollTrigger: { trigger: ".plans", start: "top 82%" } }));
}
function initCounters() {
  let n = 2418663; const els = ["menuLive", "footLive"].map((id) => document.getElementById(id));
  setInterval(() => { n += Math.floor(Math.random() * 9) + 1; els.forEach((e) => e && (e.textContent = n.toLocaleString("en-US"))); }, 1400);
}

/* =========================================================
   BOOT
   ========================================================= */
window.addEventListener("load", () => {
  runPreloader();
  initCursor();
  initMarquee();
  initHatch();
  initStickyCards();
  initStatement();
  initBallPit();
  initCollection();
  initSlider();
  initMenu();
  initOutro();
  initHeadings();
  initCounters();
  ScrollTrigger.refresh();
});
