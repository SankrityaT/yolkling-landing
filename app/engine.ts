/* eslint-disable */
// @ts-nocheck
// Yolkling engine, ported from the original vanilla build to run inside React.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Matter from "matter-js";
import Lenis from "lenis";
import { cardFront, setPose, paintBack, POSED } from "./yolkcard";

const CANDY = ["#7B5CF0", "#FF94C2", "#73E0AE", "#FFD25A", "#FF8A5B", "#8FD0FF"];
// Real species, rendered straight from the app's creature code (YolklingCore), so the
// pit and the collection show what you actually hatch rather than stand-in blobs.
const YOLKLINGS = [["aurelune", "aurelune"], ["queenbee", "queenbee"], ["coralqueen", "coralqueen"], ["mochaswirl", "mochaswirl"], ["ringling", "ringling"], ["willowqueen", "willowqueen"], ["abysscot", "abysscot"], ["goldenhoney", "goldenhoney"], ["sunny-yolkstar", "sunny yolkstar"], ["spotwing", "spotwing"], ["reefling", "reefling"], ["hotcocoa", "hotcocoa"], ["starwhisper", "starwhisper"], ["thymelet", "thymelet"], ["pearl-of-tides", "pearl-of-tides"], ["chai", "chai"], ["lilac-comet", "lilac comet"], ["escargo", "escargo"], ["dewfish", "dewfish"], ["woolly", "woolly"], ["snorkelpip", "snorkelpip"], ["honeydrop", "honeydrop"]];

export function bootYolkling() {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover:none)").matches;
  try { CustomEase.create("pop", "0.34,1.56,0.64,1"); } catch {}

  let lenis;
  if (!reduced && !isTouch) {
    lenis = new Lenis({ duration: 1.1, lerp: 0.1 });
    (window as any).lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- PRELOADER ---------- */
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
      .to(".preloader", { yPercent: -100, duration: 0.9, ease: "pop" }, ">-0.1")
      .add(revealHero, "<0.2");
  }
  function revealHero() {
    gsap.set(".hero-h1 .line", { yPercent: 115 });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hs-phone", { yPercent: 40, opacity: 0, duration: 1.1, ease: "power4.out" }, 0.3)
      .from(".hs-field", { opacity: 0, duration: 1.2 }, 0.5)
      .to(".hero-h1 .line", { yPercent: 0, duration: 1, stagger: 0.1 }, 0.2)
      .from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.6 }, 0.2)
      .from(".hero-sub", { opacity: 0, y: 20, duration: 0.7 }, 0.6)
      .from(".waitlist, .wl-meta", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, 0.7)
      .from(".nav", { opacity: 0, y: -14, duration: 0.6 }, 0.3);
    initCreature();
    tl.eventCallback("onComplete", () => window.dispatchEvent(new Event("yolk:ready")));
  }

  /* ---------- HERO CREATURE ---------- */
  function initCreature() {
    const cr = document.getElementById("creature");
    if (!cr || (document.getElementById("stage") as any).hidden) return;
    const body = cr.querySelector(".cr-body");
    const stage = document.getElementById("stage");
    const shadow = document.getElementById("crShadow");
    const pupils = cr.querySelectorAll(".cr-pupil");
    const arms = cr.querySelectorAll(".cr-arm");
    const breathe = gsap.to(body, { scaleX: 1.04, scaleY: 0.96, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 100%" });
    arms.forEach((a, i) => gsap.to(a, { rotation: i ? 14 : -14, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.2 }));
    const eyes = cr.querySelectorAll(".cr-eye");
    let blinkOn = true;
    function blink() { if (blinkOn) gsap.to(eyes, { scaleY: 0.12, duration: 0.07, yoyo: true, repeat: 1, transformOrigin: "50% 50%" }); gsap.delayedCall(2 + Math.random() * 3.5, blink); }
    gsap.delayedCall(2, blink);
    const pq = [...pupils].map((p) => ({ x: gsap.quickTo(p, "x", { duration: 0.25, ease: "power3" }), y: gsap.quickTo(p, "y", { duration: 0.25, ease: "power3" }), el: p }));
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
    cr.addEventListener("pointerenter", () => { cr.classList.add("happy"); if (mode === "idle") gsap.to(cr, { y: "-=18", duration: 0.3, ease: "pop", yoyo: true, repeat: 1 }); });
    cr.addEventListener("pointerleave", () => cr.classList.remove("happy"));
    let startPX, startPY, startTX, startTY, prevX, prevYy, moved;
    const mx = gsap.quickTo(cr, "x", { duration: 0.12, ease: "power2" });
    const my = gsap.quickTo(cr, "y", { duration: 0.12, ease: "power2" });
    cr.addEventListener("pointerdown", (e) => {
      mode = "drag"; moved = 0; startPX = e.clientX; startPY = e.clientY;
      startTX = gsap.getProperty(cr, "x"); startTY = gsap.getProperty(cr, "y"); prevX = e.clientX; prevYy = e.clientY;
      gsap.killTweensOf(cr, "rotation"); gsap.to(shadow, { scale: 0.7, opacity: 0.5, duration: 0.3 }); cr.setPointerCapture(e.pointerId);
    });
    cr.addEventListener("pointermove", (e) => {
      if (mode !== "drag") return;
      const tx = startTX + (e.clientX - startPX), ty = startTY + (e.clientY - startPY);
      const dx = e.clientX - prevX; moved += Math.abs(dx) + Math.abs(e.clientY - prevYy); prevX = e.clientX; prevYy = e.clientY;
      mx(tx); my(ty);
      const sx = gsap.utils.clamp(1, 1.3, 1 + Math.abs(dx) * 0.012);
      gsap.set(cr, { scaleX: sx, scaleY: 2 - sx, rotation: gsap.utils.clamp(-18, 18, dx * 0.6) });
    });
    function release() {
      if (mode !== "drag") return; mode = "return";
      gsap.to(shadow, { scale: 1, opacity: 1, duration: 0.6, ease: "pop" });
      gsap.to(cr, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 1.1, ease: "elastic.out(1,0.45)", onComplete: () => (mode = "idle") });
      spawnHearts(moved > 60 ? 5 : 3);
    }
    cr.addEventListener("pointerup", release); cr.addEventListener("pointercancel", release);
    function spawnHearts(n) {
      const r = cr.getBoundingClientRect(), sr = stage.getBoundingClientRect();
      for (let i = 0; i < n; i++) {
        const h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        h.setAttribute("viewBox", "0 0 24 24"); h.classList.add("heart");
        h.innerHTML = `<path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z" fill="${CANDY[1 + (i % 5)]}"/>`;
        const sz = 16 + Math.random() * 16; h.style.width = h.style.height = sz + "px";
        h.style.left = (r.left - sr.left + r.width / 2 - sz / 2) + "px"; h.style.top = (r.top - sr.top + r.height * 0.3) + "px";
        stage.appendChild(h);
        gsap.to(h, { y: -120 - Math.random() * 80, x: (Math.random() - 0.5) * 160, rotation: (Math.random() - 0.5) * 80, duration: 1.1 + Math.random() * 0.4, ease: "power1.out" });
        gsap.to(h, { opacity: 0, duration: 0.6, delay: 0.7, onComplete: () => h.remove() });
      }
    }
    const feet = cr.querySelectorAll(".cr-foot");
    const VIBES = {
      yolk: { c: "#FFC23B", deep: "#E8A21E", say: "yolk. the classic." },
      chill: { c: "#8FD0FF", deep: "#5fa9e0", say: "mmm, chill." },
      feral: { c: "#73E0AE", deep: "#46b585", say: "feral. iconic." },
      dreamy: { c: "#FF94C2", deep: "#d86b9c", say: "a little dreamy." },
      berry: { c: "#7B5CF0", deep: "#5a3fd0", say: "berry cute." },
    };
    const vibeSay = document.getElementById("vibeSay");
    function setVibe(name, btn) {
      const v = VIBES[name]; if (!v) return;
      Object.keys(VIBES).forEach((m) => cr.classList.remove("vibe-" + m));
      cr.classList.add("vibe-" + name);
      cr.style.setProperty("--cv", v.c);
      document.querySelectorAll(".vibe").forEach((b) => b.classList.toggle("is-on", b === btn));
      gsap.to(body, { backgroundColor: v.c, duration: 0.5, ease: "power2.out" });
      gsap.to(arms, { backgroundColor: v.c, duration: 0.5 });
      gsap.to(feet, { backgroundColor: v.deep, duration: 0.5 });
      gsap.fromTo(cr, { scale: 0.85 }, { scale: 1, duration: 0.7, ease: "elastic.out(1,0.4)" });
      spawnHearts(4); vibeSay.textContent = v.say;
      gsap.fromTo(vibeSay, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 });
    }
    document.querySelectorAll(".vibe").forEach((b) => b.addEventListener("click", () => setVibe((b as any).dataset.vibe, b)));

    // how'd you sleep? — show the creature actually reacting to a good vs rough night
    cr.style.setProperty("--cv", "#FFC23B");
    const daySay = document.getElementById("daySay");
    let dayState: string | null = null;
    function setDay(state, btn) {
      if (state === dayState) return;
      dayState = state;
      document.querySelectorAll(".day-opt").forEach((b) => b.classList.toggle("is-on", b === btn));
      cr.classList.toggle("state-good", state === "good");
      cr.classList.toggle("state-rough", state === "rough");
      if (state === "good") {
        blinkOn = true;
        cr.classList.add("happy");
        gsap.to(body, { filter: "saturate(1.14) brightness(1.05)", duration: 0.5 });
        gsap.to(eyes, { scaleY: 1, duration: 0.3, transformOrigin: "50% 50%" });
        breathe.timeScale(1.5);
        if (mode === "idle") gsap.fromTo(cr, { y: 0 }, { y: -24, duration: 0.34, ease: "pop", yoyo: true, repeat: 1 });
        spawnHearts(5);
        daySay.textContent = "thriving. he trusts you a little more ♥";
      } else {
        blinkOn = false;
        cr.classList.remove("happy");
        gsap.killTweensOf(eyes);
        gsap.to(body, { filter: "saturate(.9) brightness(.93)", duration: 0.5 });
        gsap.to(eyes, { scaleY: 0.4, duration: 0.4, transformOrigin: "50% 62%" });
        breathe.timeScale(0.6);
        daySay.textContent = "sleepy, never sad. he just waits for you.";
      }
    }
    document.querySelectorAll(".day-opt").forEach((b) => b.addEventListener("click", () => setDay((b as any).dataset.day, b)));
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

  /* ---------- CURSOR ---------- */
  function initCursor() {
    if (isTouch) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" }), my = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      el.addEventListener("mousemove", (e) => { const r = el.getBoundingClientRect(); mx((e.clientX - (r.left + r.width / 2)) * 0.35); my((e.clientY - (r.top + r.height / 2)) * 0.35); });
      el.addEventListener("mouseleave", () => { mx(0); my(0); });
    });
  }

  /* ---------- HATCH canvas ---------- */
  function initHatch() {
    const canvas = document.getElementById("hatchCanvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d"); const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [], progress = 0;
    function blobTargets() {
      const R = 300, off = document.createElement("canvas"); off.width = R; off.height = R;
      const o = off.getContext("2d"); o.fillStyle = "#fff";
      o.beginPath(); o.ellipse(R / 2, R * 0.54, R * 0.32, R * 0.38, 0, 0, Math.PI * 2); o.fill();
      o.beginPath(); o.ellipse(R / 2, R * 0.30, R * 0.26, R * 0.22, 0, 0, Math.PI * 2); o.fill();
      const d = o.getImageData(0, 0, R, R).data, pts = [];
      const step = window.innerWidth < 700 ? 5 : 3;
      for (let y = 0; y < R; y += step) for (let x = 0; x < R; x += step) if (d[(y * R + x) * 4 + 3] > 128) pts.push({ x, y });
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
      onUpdate: (s) => { progress = s.progress; const el = document.getElementById("hatchProg"); if (el) el.textContent = `scroll to hatch, ${Math.round(progress * 100)}%`; },
    });
    let active = true;
    ScrollTrigger.create({ trigger: ".hatch", start: "top bottom", end: "bottom top", onToggle: (s) => { active = s.isActive; } });
    function render() {
      if (!active) { requestAnimationFrame(render); return; }
      const vw = window.innerWidth, vh = window.innerHeight; ctx.clearRect(0, 0, vw, vh);
      for (const p of particles) {
        const pp = Math.max(0, Math.min(1, (progress - p.d) / (1 - p.d)));
        const e = pp < 0.5 ? 2 * pp * pp : 1 - Math.pow(-2 * pp + 2, 2) / 2;
        const x = p.sx + (p.tx - p.sx) * e, y = p.sy + (p.ty - p.sy) * e;
        ctx.globalAlpha = 0.15 + pp * 0.85; ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1; requestAnimationFrame(render);
    }
    render();
  }

  function initStickyCards() {
    const cards = gsap.utils.toArray(".card");
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      const inner = (card as any).querySelector(".card-inner");
      gsap.to(inner, { y: "-40%", z: -220, rotationX: 38, ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top 88%", end: "top -10%", scrub: true } });
      gsap.to(inner, { "--ov": 0.8, ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top 80%", end: "top top", scrub: true } });
    });
  }

  function initStatement() {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".statement", start: "top top", end: () => `+=${window.innerHeight * 2.2}`, pin: ".stmt-pin", scrub: 1 } });
    tl.fromTo(".stmt-text h2", { scaleY: 0 }, { scaleY: 1, ease: "power2.out", duration: 0.4 })
      .fromTo(".stmt-reveal", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.42)
      .to(".stmt-text h2", { scaleY: 0, ease: "power2.in", duration: 0.35 }, 0.75)
      .to(".stmt-reveal", { opacity: 0, duration: 0.2 }, 0.78);
  }

  function initBallPit() {
    ScrollTrigger.create({ trigger: ".friends", start: "top 60%", once: true, onEnter: makePit });
    function makePit() {
      const cont = document.getElementById("pitObjects"); if (!cont) return;
      const W = cont.clientWidth, H = cont.clientHeight; if (!W || !H) return;
      const { Engine, Bodies, Composite, Mouse, MouseConstraint, Runner } = Matter;
      const engine = Engine.create(); engine.gravity.y = 1; const t = 300;
      Composite.add(engine.world, [
        Bodies.rectangle(W / 2, H + t / 2, W + 2 * t, t, { isStatic: true }),
        Bodies.rectangle(-t / 2, H / 2, t, H * 3, { isStatic: true }),
        Bodies.rectangle(W + t / 2, H / 2, t, H * 3, { isStatic: true }),
        Bodies.rectangle(W / 2, -t / 2 - H, W + 2 * t, t, { isStatic: true }),
      ]);
      const count = W < 700 ? 8 : 13;
      const bodies = [];
      for (let i = 0; i < count; i++) {
        const rad = (W < 700 ? 30 : 46) + Math.random() * 20;
        const [file, name] = YOLKLINGS[i % YOLKLINGS.length];
        const el = document.createElement("img"); el.className = "blobby blobby-real"; el.style.width = el.style.height = rad * 2 + "px";
        el.src = `/shots/yolklings/${file}.webp`; el.alt = name; el.draggable = false; cont.appendChild(el);
        const b = Bodies.circle(rad + Math.random() * (W - 2 * rad), -40 - i * (W < 700 ? 60 : 90), rad, { restitution: 0.7, friction: 0.05, frictionAir: 0.01 });
        Composite.add(engine.world, b); bodies.push({ b, el, rad });
      }
      // drag only on non-touch, so mobile users can still scroll past the pit
      if (!isTouch) {
        const mouse = Mouse.create(cont);
        mouse.element.removeEventListener("wheel", (mouse as any).mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);
        Composite.add(engine.world, MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } }));
      }
      const runner = Runner.create(); Runner.run(runner, engine);
      let pitActive = true;
      ScrollTrigger.create({ trigger: ".friends", start: "top bottom", end: "bottom top", onToggle: (s) => { pitActive = s.isActive; pitActive ? Runner.run(runner, engine) : Runner.stop(runner); } });
      (function sync() { if (pitActive) bodies.forEach(({ b, el, rad }) => { el.style.transform = `translate(${b.position.x - rad}px,${b.position.y - rad}px) rotate(${b.angle}rad)`; }); requestAnimationFrame(sync); })();
    }
  }

  function initCollection() {
    const field = document.getElementById("colField"); if (!field) return;
    const dirs = [[1.2, 0.7], [-1.3, 0.9], [1.0, -1.1], [-1.5, -0.7], [0.6, 1.3], [-0.8, -1.2], [1.4, 0.2], [-1.1, 0.4], [0.3, -1.3], [1.5, -0.5], [-0.6, 1.1], [0.9, 0.9], [-1.4, -0.3], [0.5, -0.9], [-0.3, 1.2], [1.1, -0.9]];
    const vw = window.innerWidth, vh = window.innerHeight, mob = vw < 800;
    const cardBg = ["#FFF3E0", "#FFE3EE", "#E6F8EF", "#FFF6D6", "#E9F4FF", "#F0EAFE"];
    const els = dirs.map((d, i) => {
      const el = document.createElement("div"); el.className = "col-card"; el.style.background = cardBg[i % cardBg.length];
      const [file, name] = YOLKLINGS[(i + 3) % YOLKLINGS.length];
      const mini = document.createElement("img"); mini.className = "mini-real"; mini.src = `/shots/yolklings/${file}.webp`;
      mini.alt = ""; mini.draggable = false; el.appendChild(mini);
      const label = document.createElement("span"); label.className = "mini-name mono"; label.textContent = name; el.appendChild(label);
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

  function initMenu() {
    const toggler = document.querySelector(".nav-toggler"), menu = document.querySelector(".menu");
    if (!toggler) return;
    const bgs = document.querySelectorAll(".menu-bg"), inner = document.querySelector(".menu-inner");
    let open = false;
    document.querySelectorAll(".menu-link").forEach((a) => { a.innerHTML = `<span class="line" style="display:block">${a.textContent}</span>`; (a as any).style.overflow = "hidden"; });
    const tl = gsap.timeline({ paused: true });
    tl.to(bgs, { scaleY: 1, duration: 0.7, stagger: 0.08, ease: "power3.inOut" })
      .to(inner, { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)", duration: 0.6, ease: "power3.inOut" }, "-=0.45")
      .fromTo(".menu-link .line", { yPercent: 115 }, { yPercent: 0, duration: 0.7, stagger: 0.07, ease: "pop" }, "-=0.4")
      .fromTo(".menu-foot", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.3");
    function set(v) { open = v; toggler.classList.toggle("open", v); (menu as any).style.pointerEvents = v ? "auto" : "none"; if (v) { tl.timeScale(1).play(); lenis && lenis.stop(); } else { tl.timeScale(1.6).reverse(); lenis && lenis.start(); } }
    toggler.addEventListener("click", () => set(!open));
    document.querySelectorAll(".menu-link").forEach((a) => a.addEventListener("click", () => set(false)));
  }

  function initOutro() {
    const svg = document.getElementById("strokeWord"); if (!svg) return;
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", "600"); t.setAttribute("y", "185"); t.setAttribute("text-anchor", "middle");
    t.setAttribute("font-family", "Onest, sans-serif"); t.setAttribute("font-size", "150"); t.setAttribute("font-weight", "800"); t.setAttribute("letter-spacing", "-4"); t.textContent = "yolkling";
    svg.appendChild(t);
    gsap.set(svg, { clipPath: "inset(0 100% 0 0)" });
    gsap.to(svg, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: ".outro", start: "top 60%", end: "top 8%", scrub: 1 } });
    gsap.to(t, { attr: { fill: "rgba(255,255,255,0.14)" }, duration: 0.8, scrollTrigger: { trigger: ".outro", start: "top 22%", toggleActions: "play none none reverse" } });
    gsap.from(".outro-line", { opacity: 0, y: 24, duration: 0.9, ease: "pop", scrollTrigger: { trigger: ".outro-line", start: "top 85%" } });
  }

  function initHeadings() {
    gsap.utils.toArray(".big-h, .hatch-h, .pricing-h").forEach((h) => gsap.from(h, { yPercent: 10, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 88%" } }));
    gsap.utils.toArray(".plan").forEach((p, i) => gsap.from(p, { y: 60, opacity: 0, duration: 0.7, delay: i * 0.08, ease: "pop", scrollTrigger: { trigger: ".plans", start: "top 82%" } }));
  }

  /* ---------- utm capture (for the ad-ops attribution) ---------- */
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  function captureUtm() {
    try {
      const params = new URLSearchParams(window.location.search);
      const found = {};
      let any = false;
      UTM_KEYS.forEach((k) => { const v = params.get(k); if (v) { found[k] = v.slice(0, 100); any = true; } });
      // a fresh ad click replaces whatever attribution was stored before; an organic
      // visit with no utm params leaves prior ad attribution alone.
      if (any) localStorage.setItem("yolk_utm", JSON.stringify(found));
    } catch {}
  }
  function getStoredUtm() {
    try { return JSON.parse(localStorage.getItem("yolk_utm") || "{}"); } catch { return {}; }
  }

  /* ---------- real waitlist count ---------- */
  function loadCount() {
    fetch("/api/waitlist").then((r) => r.json()).then((d) => {
      const c = d && d.count;
      if (typeof c === "number" && c > 0) {
        ["wlCount", "menuLive", "footLive"].forEach((id) => { const e = document.getElementById(id); if (e) e.textContent = c.toLocaleString(); });
      } else {
        const wl = document.querySelector(".wl-meta"); if (wl) wl.innerHTML = `<span class="pip"></span> be one of the first to hatch yours. no spam, one email when we hatch`;
        const ml = document.getElementById("menuLive"); if (ml && ml.parentElement) ml.parentElement.textContent = "● early access is open";
        const fl = document.getElementById("footLive"); if (fl && fl.parentElement) fl.parentElement.innerHTML = `● early access is open`;
      }
    }).catch(() => {});
  }

  /* ---------- forms ---------- */
  function initForms() {
    const wlForm = document.getElementById("waitlist") as HTMLFormElement;
    if (wlForm) wlForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = document.getElementById("wlEmail") as HTMLInputElement;
      const email = input.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { input.style.borderColor = "#d4502e"; return; }
      const submitBtn = wlForm.querySelector("button[type=submit], .btn-primary") as HTMLButtonElement | null;
      let status = "error";
      try {
        const r = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, ...getStoredUtm() }) });
        const j = await r.json().catch(() => null);
        status = (j && j.status) || (r.ok ? "ok" : "error");
      } catch { status = "error"; }

      // A real failure must never look like success, that's the whole point: show it
      // inline and leave the form usable so the person can just try again.
      if (status === "error") {
        const meta = document.querySelector(".wl-meta") as HTMLElement;
        if (meta) meta.textContent = "something went wrong on our end, please try again in a moment.";
        input.style.borderColor = "#d4502e";
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      wlForm.style.display = "none";
      const meta = document.querySelector(".wl-meta") as HTMLElement; if (meta) meta.style.display = "none";
      const done = document.getElementById("wlDone");
      if (done) {
        if (status === "dup") {
          const h = done.querySelector(".wl-done-h"); if (h) h.textContent = "you're already in line.";
          const sub = done.querySelector(".wl-done-sub"); if (sub) sub.textContent = "no need to sign up twice, you're already set. i'll email you once, when it's ready to hatch.";
        }
        (done as HTMLElement).hidden = false;
      }
      lenis && ScrollTrigger.refresh();
    });
    const share = document.getElementById("wlShare");
    if (share) share.addEventListener("click", () => { navigator.clipboard?.writeText("https://yolkling.com"); share.textContent = "copied. thank you"; });
    const outroJoin = document.getElementById("outroJoin");
    if (outroJoin) outroJoin.addEventListener("click", () => { (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" })); setTimeout(() => (document.getElementById("wlEmail") as HTMLInputElement)?.focus(), 700); });
    const fb = document.getElementById("fbForm") as HTMLFormElement;
    if (fb) fb.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = (document.getElementById("fbMsg") as HTMLTextAreaElement).value.trim();
      if (msg.length < 2) return;
      const name = (document.getElementById("fbName") as HTMLInputElement).value.trim();
      try { await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, message: msg }) }); } catch {}
      fb.style.display = "none";
      const d = document.getElementById("fbDone"); if (d) (d as HTMLElement).hidden = false;
    });
  }

  /* ---------- NAV: every #section link scrolls to the right place, every time ----------
     Two bugs this fixes: (1) nothing called lenis.scrollTo, so clicking a nav link fell
     through to the browser's native instant jump, which fights Lenis's virtual scroll
     position and settles somewhere wrong. (2) the nav is position:fixed, so even a
     correct jump landed the section's heading underneath it — nothing accounted for the
     nav's height as an offset. */
  function initAnchorNav() {
    const nav = document.querySelector(".nav") as HTMLElement | null;
    const navOffset = () => (nav ? nav.getBoundingClientRect().height : 0) + 12;

    // Full-screen pinned scenes start at the very top; everything else lands just under
    // the floating nav. The offset lives here only: Lenis also honours CSS scroll-margin,
    // and having both is what used to drop every section 165px too low.
    const offsetFor = (el) => (el.matches(".hatch, .collection") ? 0 : navOffset());
    const topOf = (el) => el.getBoundingClientRect().top + window.scrollY - offsetFor(el);

    function go(hash: string) {
      if (hash === "#top" || hash === "#") {
        lenis ? (lenis.start(), lenis.scrollTo(0, { duration: 1.1, force: true })) : window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      // lazy images above the target can load mid-flight and shift it, so check where it
      // actually ended up and nudge once if it moved
      const settle = () => {
        const drift = target.getBoundingClientRect().top - offsetFor(target);
        if (Math.abs(drift) > 4) lenis ? lenis.scrollTo(topOf(target), { duration: 0.35, force: true }) : window.scrollTo({ top: topOf(target), behavior: "smooth" });
      };
      if (lenis) {
        lenis.start();
        lenis.scrollTo(topOf(target), { duration: 1.1, force: true, onComplete: settle });
      } else {
        window.scrollTo({ top: topOf(target), behavior: "smooth" });
        setTimeout(settle, 900);
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href.length < 2) return;
        e.preventDefault();
        go(href);
        history.pushState(null, "", href);
      });
    });

    // A direct link like yolkling.com/#collection: let layout/fonts settle, then land
    // accurately instead of trusting the browser's un-offset native jump.
    // Wait for the preloader to finish and the pinned scenes to be measured (their spacers
    // change every offset below them), otherwise a deep link lands short.
    if (location.hash) {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.addEventListener("yolk:ready", () => { ScrollTrigger.refresh(); requestAnimationFrame(() => go(location.hash)); }, { once: true });
    }
  }

  /* ---------- SCRATCH TO REVEAL ----------
     Same beats as CardScratchView in the app: the card arrives face down, the back gives
     the rarity away (commons get no dots), you scratch, and past 55% the rest clears and
     the card turns over to its foil. Species and inks are the real ones from the catalog. */
  // Real species, straight from SpeciesCatalog (colours, family, flavour, dex number),
  // exported by rendering the app's own YolklingView. See app/yolkcard.ts for the card.
  const SPECIES = [
    {"name": "stardrop", "rarity": "common", "family": "celestial", "b": "#FBE6A8", "d": "#E7C25E", "line": "the cheerful first wish of the night", "no": 36, "of": 203},
    {"name": "lilac comet", "rarity": "rare", "family": "celestial", "b": "#C9B8E8", "d": "#9A82C9", "line": "always arriving a little out of breath", "no": 18, "of": 203},
    {"name": "ringling", "rarity": "epic", "family": "celestial", "b": "#BCCBE8", "d": "#8AA0CC", "line": "wears its own little rings, proudly", "no": 31, "of": 203},
    {"name": "galaxia", "rarity": "legendary", "family": "celestial", "b": "#B098D0", "d": "#7E60AC", "line": "holds a whole tiny galaxy in its belly", "no": 15, "of": 203},
    {"name": "moonpuff", "rarity": "common", "family": "celestial", "b": "#E8E2D2", "d": "#C2BAA6", "line": "naps through every sunrise on purpose", "no": 24, "of": 203},
    {"name": "dusk plum", "rarity": "rare", "family": "celestial", "b": "#A99BCF", "d": "#7C6BA8", "line": "likes the quiet ten minutes after sunset", "no": 13, "of": 203},
    {"name": "twinkleberry", "rarity": "common", "family": "celestial", "b": "#F4C6D6", "d": "#D98FAC", "line": "giggles in little sparkles when tickled", "no": 45, "of": 203},
    {"name": "auroria", "rarity": "epic", "family": "celestial", "b": "#A7D8D0", "d": "#6FAFA8", "line": "shy, but glows softly when it is happy", "no": 3, "of": 203},
    {"name": "sunkit", "rarity": "common", "family": "celestial", "b": "#FFD27A", "d": "#EAA63A", "line": "a small warm sunbeam in creature form", "no": 42, "of": 203},
    {"name": "midnight bao", "rarity": "rare", "family": "celestial", "b": "#8E9BC4", "d": "#5E6B98", "line": "soft, round, and full of quiet midnight", "no": 22, "of": 203},
    {"name": "dawnberry", "rarity": "common", "family": "celestial", "b": "#FBC9C0", "d": "#E8978E", "line": "the soft pink before the sun is fully up", "no": 11, "of": 203},
    {"name": "cozmo", "rarity": "epic", "family": "celestial", "b": "#A6B8E0", "d": "#768CC4", "line": "a tiny gas giant with a very big heart", "no": 10, "of": 203},
    {"name": "firstsnowcocoa", "rarity": "legendary", "family": "cozy", "b": "#8A5A3E", "d": "#5E3A26", "line": "the hush of a snowed-in day", "no": 69, "of": 203},
  ];
  const byName = (n) => SPECIES.find((s) => s.name === n);

  /* ---------- TILE SEQUENCES ----------
     A tile with data-cycle plays its real screens in order while it's on screen,
     lighting up the matching step. */
  function initTileCycles() {
    document.querySelectorAll("[data-cycle]").forEach((tile) => {
      const imgs = [...tile.querySelectorAll(".cyc-img")], steps = [...tile.querySelectorAll(".tile-steps li")];
      if (imgs.length < 2 || reduced) return;
      let i = 0, timer;
      const show = (n) => { i = n; imgs.forEach((im, k) => im.classList.toggle("is-on", k === n)); steps.forEach((s, k) => s.classList.toggle("is-on", k === n)); };
      steps.forEach((s, k) => s.addEventListener("click", () => show(k)));
      new IntersectionObserver(([en]) => { clearInterval(timer); if (en.isIntersecting) timer = setInterval(() => show((i + 1) % imgs.length), 2600); }, { threshold: 0.4 }).observe(tile);
    });
  }

  /* ---------- SHOP TABS ----------
     Colours / Outfit / Room, like the app. Cycles on its own while in view until you tap. */
  function initStore() {
    const tabs = [...document.querySelectorAll(".seg-btn")];
    if (!tabs.length) return;
    const names = tabs.map((t) => (t as any).dataset.tab);
    let cur = names.indexOf("outfit"), auto = true, timer;
    function show(name) {
      cur = names.indexOf(name);
      tabs.forEach((t) => { const on = (t as any).dataset.tab === name; t.classList.toggle("is-on", on); t.setAttribute("aria-selected", String(on)); });
      document.querySelectorAll(".store-cap").forEach((el) => el.classList.toggle("is-on", (el as any).dataset.cap === name));
      document.querySelectorAll(".store-img").forEach((el) => el.classList.toggle("is-on", (el as any).dataset.img === name));
    }
    tabs.forEach((t) => t.addEventListener("click", () => { auto = false; clearInterval(timer); show((t as any).dataset.tab); }));
    if (reduced) return;
    new IntersectionObserver(([en]) => { clearInterval(timer); if (en.isIntersecting && auto) timer = setInterval(() => show(names[(cur + 1) % names.length]), 4200); }, { threshold: 0.4 }).observe(document.querySelector(".store-wrap"));
  }

  /* ---------- SECTION EGGS ----------
     Section labels are an egg that hatches as you go down the page:
     0 whole, 1 hairline crack, 2 cracked through, 3 lid lifting, 4 hatched. */
  function initSectionEggs() {
    const SHELL = "M20 2C30 2 37 18 37 30C37 40 29 46 20 46C11 46 3 40 3 30C3 18 10 2 20 2Z";
    const BOTTOM = "M3 29C3 40 11 46 20 46C29 46 37 40 37 29L32 25L27 30L20 24L13 30L8 25Z";
    const TOP = "M3 29L8 25L13 30L20 24L27 30L32 25L37 29C37 17 30 2 20 2C10 2 3 17 3 29Z";
    const face = (cx, cy) => `<circle class="eye" cx="${cx - 4}" cy="${cy}" r="1.7"/><circle class="eye" cx="${cx + 4}" cy="${cy}" r="1.7"/><path class="smile" d="M${cx - 3} ${cy + 4}Q${cx} ${cy + 6.5} ${cx + 3} ${cy + 4}"/>`;
    const ART = [
      `<path class="shell" d="${SHELL}"/>`,
      `<path class="shell" d="${SHELL}"/><path class="crack" d="M21 12L17 18L22 21"/>`,
      `<path class="shell" d="${SHELL}"/><path class="crack" d="M3.5 28L8 24L13 29L20 23L27 29L32 24L36.5 28"/>`,
      `<circle class="yolk" cx="20" cy="27" r="11"/>${face(20, 25)}<path class="shell" d="${BOTTOM}"/><path class="shell" d="${TOP}" transform="translate(-3 -9) rotate(-16 20 20)"/>`,
      `<circle class="yolk" cx="20" cy="22" r="12.5"/>${face(20, 20)}<path class="shell" d="${BOTTOM}"/><path class="spark" d="M37 4l1.2 3 3 1.2-3 1.2L37 12.4l-1.2-3-3-1.2 3-1.2z"/>`,
    ];
    document.querySelectorAll(".sh").forEach((el) => {
      const egg = el.querySelector(".sh-egg");
      const n = Math.max(0, Math.min(4, Number((el as any).dataset.hatch) || 0));
      egg.innerHTML = `<svg viewBox="0 -8 42 56" aria-hidden="true">${ART[n]}</svg>`;
      if (reduced) return;
      // a little wobble when it scrolls in, harder the closer it is to hatching
      gsap.fromTo(egg, { rotation: 0 }, { keyframes: { rotation: [0, -8 - n * 2, 7 + n * 2, -4, 0] }, duration: 0.7, ease: "sine.inOut", transformOrigin: "50% 90%", scrollTrigger: { trigger: el, start: "top 85%" } });
    });
  }

  function initHeroField() {
    const rows = [document.getElementById("hsRow1"), document.getElementById("hsRow2")];
    if (!rows[0]) return;
    const pool = SPECIES;
    rows.forEach((row, r) => {
      const order = pool.map((_, k) => pool[r ? (pool.length - 1 - ((k * 3 + 4) % pool.length)) : (k * 5) % pool.length]);
      const html = order.map((s) => `<div class="hs-card">${cardFront(s)}</div>`).join("");
      row.innerHTML = html + html; // doubled so the drift loops seamlessly
      // grid cards in the app are frozen at the flattering `posed` angle, flat
      row.querySelectorAll(".yc").forEach((el) => setPose(el, POSED, POSED, false));
    });
  }

  /* ---------- SCRATCH TO REVEAL ----------
     CardScratchView: face down, the back gives the rarity away (commons get no dots),
     a 46u brush over a 10×14 coverage grid, and past 55% the panel clears (0.22s) and
     the card turns over with a spring. Then it tilts: the card follows you, the foil lags. */
  function initScratch() {
    const root = document.getElementById("scratch");
    if (!root) return;
    const flip = document.getElementById("scFlip"), front = document.getElementById("scFront");
    const canvas = document.getElementById("scBack") as HTMLCanvasElement, hintEl = document.getElementById("scPanelHint");
    const hint = document.getElementById("scHint"), skip = document.getElementById("scSkip"), next = document.getElementById("scNext");
    const ctx = canvas.getContext("2d");
    const DECK = ["stardrop", "lilac comet", "ringling", "galaxia"].map(byName);
    const COLS = 10, ROWS = 14, THRESHOLD = 0.55;
    let i = 0, done = false, live = false, last = null, cells = new Set(), yc = null;

    function deal() {
      const s = DECK[i % DECK.length];
      done = false; live = false; cells = new Set(); last = null;
      front.innerHTML = cardFront(s); yc = front.querySelector(".yc");
      setPose(yc, { x: 0, y: 0 }, { x: 0, y: 0 });
      gsap.set(flip, { rotationY: 0 }); gsap.set(front, { rotationY: 0 });
      gsap.set(canvas, { opacity: 1, display: "block" }); hintEl.classList.remove("is-gone");
      paintBack(canvas, s.rarity);
      hint.textContent = i === 0 ? "scratch the card to see who you got" : s.rarity === "common" ? "no dots on the back. probably a common" : "dots on the back. this one's rare or better";
      (skip as any).hidden = false; (next as any).hidden = true;
    }

    const size = () => canvas.getBoundingClientRect();
    function mark(x, y, w, h) {
      const cw = w / COLS, ch = h / ROWS, r = (46 * w) / 300 / 2;
      for (let cy = Math.max(0, ((y - r) / ch) | 0); cy <= Math.min(ROWS - 1, ((y + r) / ch) | 0); cy++)
        for (let cx = Math.max(0, ((x - r) / cw) | 0); cx <= Math.min(COLS - 1, ((x + r) / cw) | 0); cx++)
          if (Math.hypot((cx + 0.5) * cw - x, (cy + 0.5) * ch - y) <= r) cells.add(cy * COLS + cx);
    }
    function scratch(x, y) {
      const { width: w, height: h } = size();
      hintEl.classList.add("is-gone");
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = (46 * w) / 300;
      ctx.beginPath(); ctx.moveTo(last ? last.x : x, last ? last.y : y); ctx.lineTo(x + 0.01, y); ctx.stroke();
      if (last) { const n = Math.ceil(Math.hypot(x - last.x, y - last.y) / 6); for (let k = 1; k <= n; k++) mark(last.x + ((x - last.x) * k) / n, last.y + ((y - last.y) * k) / n, w, h); }
      else mark(x, y, w, h);
      last = { x, y };
      if (cells.size / (COLS * ROWS) >= THRESHOLD) reveal();
    }

    function reveal() {
      if (done) return; done = true; last = null;
      const s = DECK[i % DECK.length];
      hint.textContent = `${s.rarity} · ${({ common: "pearl", rare: "holo", epic: "prism", legendary: "cosmos" })[s.rarity]} foil. move over it to catch the light`;
      (skip as any).hidden = true; (next as any).hidden = false;
      const goLive = () => { live = true; };
      hintEl.classList.add("is-gone");
      // clear the last of the panel, THEN turn it over. overlapping reads as a glitch.
      gsap.to(canvas, { opacity: 0, duration: 0.22, ease: "power1.out", onComplete: () => gsap.set(canvas, { display: "none" }) });
      if (reduced) return goLive();
      const f = { v: 0 };
      gsap.to(f, { v: 1, duration: 0.7, delay: 0.14, ease: "back.out(1.5)", onUpdate: () => {
        // the second half would show the card mirrored, so counter-rotate past halfway
        gsap.set(flip, { rotationY: f.v * 180 }); gsap.set(front, { rotationY: f.v >= 0.5 ? 180 : 0 });
      }, onComplete: () => { gsap.set(flip, { rotationY: 0 }); gsap.set(front, { rotationY: 0 }); goLive(); } });
    }

    const pos = (e) => { const r = size(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    canvas.addEventListener("pointerdown", (e) => { if (done) return; canvas.setPointerCapture(e.pointerId); last = null; const p = pos(e); scratch(p.x, p.y); });
    canvas.addEventListener("pointermove", (e) => { if (done || !canvas.hasPointerCapture(e.pointerId)) return; const p = pos(e); scratch(p.x, p.y); });
    canvas.addEventListener("pointerup", () => { last = null; });
    skip.addEventListener("click", reveal);
    next.addEventListener("click", () => { i++; deal(); });

    // CardTilt: the card follows the pointer quickly, the foil sheet lags behind it (laminate
    // has mass). With no pointer it breathes around the posed angle, like the gyro at rest.
    const pose = { x: 0, y: 0 }, sheet = { x: 0, y: 0 }; let target = null, onScreen = false;
    front.addEventListener("pointermove", (e) => {
      const r = front.getBoundingClientRect();
      target = { x: Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)), y: Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)) };
    });
    front.addEventListener("pointerleave", () => { target = null; });
    new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; }).observe(root);
    if (!reduced) gsap.ticker.add((t) => {
      if (!live || !onScreen || !yc) return;
      const tg = target || { x: POSED.x + Math.sin(t * 0.6) * 0.35, y: POSED.y + Math.cos(t * 0.45) * 0.25 };
      pose.x += (tg.x - pose.x) * 0.22; pose.y += (tg.y - pose.y) * 0.22;
      sheet.x += (pose.x - sheet.x) * 0.08; sheet.y += (pose.y - sheet.y) * 0.08;
      setPose(yc, pose, sheet);
    });

    let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (!done) { cells = new Set(); paintBack(canvas, DECK[i % DECK.length].rarity); } }, 200); });
    document.fonts ? document.fonts.ready.then(deal) : deal();
  }

  captureUtm();
  runPreloader();
  initScratch();
  initHeroField();
  initSectionEggs();
  initStore();
  initTileCycles();
  initCursor();
  initHatch();
  initStickyCards();
  initStatement();
  initBallPit();
  initCollection();
  initMenu();
  initOutro();
  initHeadings();
  initForms();
  initAnchorNav();
  loadCount();
  ScrollTrigger.refresh();
}
