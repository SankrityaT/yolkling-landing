/* eslint-disable */
// @ts-nocheck
// A web port of the app's collectible card: YolkCard (front), YolkCardBack (the scratch
// panel) and HoloMaterial (the foils). Numbers are the app's, in its own unit `u` =
// card width / 300, expressed here as container units so one card scales from the hero
// strip to the big scratch card. Creatures are real renders of YolklingView.

const HSB = (h, s, b) => {
  const f = (n) => { const k = (n + h * 6) % 6; return b - b * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  const c = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
  return "#" + c(f(5)) + c(f(3)) + c(f(1));
};
const SPECTRAL = [[0.006, 0.62, 1], [0.147, 0.6, 1], [0.258, 0.55, 0.98], [0.489, 0.48, 1], [0.633, 0.52, 1], [0.786, 0.55, 1]].map((x) => HSB(...x));
const PEARL = [[0.083, 0.16, 0.98], [0.556, 0.13, 0.99], [0.722, 0.11, 0.98], [0.5, 0.11, 1], [0.111, 0.13, 0.99], [0.611, 0.11, 0.98]].map((x) => HSB(...x));

// A spectrum run `cycles` times across the sheet, like Holo.stops.
const spectrum = (angle, cycles, hues) => {
  const p = 100 / cycles, n = hues.length;
  const stops = hues.map((h, i) => `${h} ${((i / n) * p).toFixed(3)}%`).concat(`${hues[0]} ${p.toFixed(3)}%`);
  return `repeating-linear-gradient(${90 + angle}deg, ${stops.join(",")})`;
};
// Diffraction ridges: a light band and a dark band per period (HoloLines).
const lines = (angle, pitch) => {
  const p = 100 / pitch;
  return `repeating-linear-gradient(${90 + angle}deg, rgba(255,255,255,.5) 0 ${(p * 0.34).toFixed(3)}%, transparent ${(p * 0.34).toFixed(3)}% ${(p * 0.52).toFixed(3)}%, rgba(0,0,0,.2) ${(p * 0.52).toFixed(3)}% ${(p * 0.78).toFixed(3)}%, transparent ${(p * 0.78).toFixed(3)}% ${p.toFixed(3)}%)`;
};
const stars = (seed) => `radial-gradient(circle at ${23 + seed * 31}% ${37 + seed * 17}%, rgba(255,255,255,.7) 0 .7px, transparent 1.3px) 0 0/${41 + seed * 9}px ${47 + seed * 7}px, radial-gradient(circle at ${61 - seed * 13}% ${19 + seed * 23}%, #fff 0 1.6px, transparent 2.4px) ${seed * 17}px ${seed * 29}px/${137 + seed * 23}px ${151 + seed * 19}px`;
const grainURL = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

// HoloMaterial, layer for layer: paint, scale, rate, blend, filter, base, gain.
export const MATERIALS = {
  pearl: { parallax: 0.13, bloom: 0.32, glare: 0.34, layers: [
    { bg: spectrum(94, 9, PEARL), scale: 2.6, rate: 0.8, blend: "overlay", filter: "brightness(1.02) contrast(1.8) saturate(.7)", base: 0.4, gain: 0.34 },
    { bg: lines(88, 170), scale: 1.5, rate: 0.9, blend: "overlay", filter: "contrast(1.2)", base: 0.09, gain: 0.13 },
    { bg: grainURL, scale: 1, rate: 0.3, blend: "overlay", filter: "contrast(1.1)", base: 0.1, gain: 0.14, size: "120px 120px" },
  ] },
  holo: { parallax: 0.26, bloom: 0.55, glare: 0.55, layers: [
    { bg: spectrum(10, 10, SPECTRAL), scale: 3, rate: 1, blend: "overlay", filter: "brightness(1.02) contrast(1.8) saturate(1.4)", base: 0.24, gain: 0.3 },
    { bg: spectrum(104, 4, SPECTRAL), scale: 3, rate: -0.7, blend: "color-dodge", filter: "brightness(.9) contrast(1.8) saturate(1.6)", base: 0.06, gain: 0.13 },
    { bg: lines(96, 130), scale: 1.6, rate: 1.8, blend: "overlay", filter: "contrast(1.3)", base: 0.1, gain: 0.16 },
  ] },
  prism: { parallax: 0.24, bloom: 0.55, glare: 0.52, layers: [
    { bg: lines(38, 190), scale: 2.1, rate: 1.5, blend: "overlay", filter: "brightness(.96) contrast(1.9) saturate(1.4)", base: 0.22, gain: 0.26 },
    { bg: lines(-57, 223), scale: 1.9, rate: -1.2, blend: "exclusion", filter: "brightness(.94) contrast(1.8)", base: 0.08, gain: 0.13 },
    { bg: spectrum(55, 8, SPECTRAL), scale: 3.4, rate: -2.5, blend: "overlay", filter: "brightness(.96) contrast(1.9) saturate(1.7)", base: 0.22, gain: 0.3 },
  ] },
  cosmos: { parallax: 0.34, bloom: 0.55, glare: 0.46, layers: [
    { bg: spectrum(82, 6, SPECTRAL), scale: 4.2, rate: 0.35, blend: "overlay", filter: "brightness(.98) contrast(1.6)", base: 0.26, gain: 0.3 },
    { bg: stars(1), scale: 1.4, rate: 1.6, blend: "plus-lighter", filter: "brightness(1.04) contrast(1.5)", base: 0.3, gain: 0.34, raw: true },
    { bg: stars(2), scale: 2.6, rate: 2.6, blend: "plus-lighter", filter: "brightness(1.02) contrast(1.4)", base: 0.18, gain: 0.24, raw: true },
  ] },
};
export const FINISH = { common: "pearl", rare: "holo", epic: "prism", legendary: "cosmos" };
// YolkCardBack inks: stock, deep, dot.
export const BACK_INKS = { common: ["#EFE6D4", "#D8CBB2", "#C9BA9C"], rare: ["#D8E4F2", "#AFC4DE", "#8FB0D4"], epic: ["#E8DCF2", "#C4ACDE", "#A98BD0"], legendary: ["#DCD8F0", "#ADA6D8", "#8F86C8"] };

// YolkGlyph mark shapes, in a unit square.
const GLYPH = {
  common: `<circle cx=".5" cy=".5" r=".22"/>`,
  rare: `<path d="M.5 .1L.86 .5L.5 .9L.14 .5Z"/>`,
  epic: `<path d="${Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 0.18 : 0.44; return (i ? "L" : "M") + (0.5 + Math.cos(a) * r).toFixed(3) + " " + (0.5 + Math.sin(a) * r).toFixed(3); }).join("")}Z"/>`,
  legendary: `<path d="M.5 .04Q.58 .42 .96 .5Q.58 .58 .5 .96Q.42 .58 .04 .5Q.42 .42 .5 .04Z"/>`,
};

const slug = (n) => n.replace(/ /g, "-");
const found = () => "found " + new Date().toLocaleString("en-US", { month: "short" }).toLowerCase() + " " + new Date().getFullYear();

/** The card front. Print, foil, grain, glare, then type — the app's stacking order. */
export function cardFront(s) {
  const m = MATERIALS[FINISH[s.rarity]];
  const foil = m.layers.map((l, i) =>
    `<i class="yc-l" style="--sc:${l.scale};--tr:${(m.parallax * l.rate).toFixed(3)};--base:${l.base};--gain:${l.gain};mix-blend-mode:${l.blend};filter:${l.filter};background:${l.bg}${l.size ? `;background-size:${l.size}` : ""}"></i>`).join("");
  const layout = (art) => `<div class="yc-head"><span class="yc-name">${s.name}</span><span class="yc-chip"><svg viewBox="0 0 1 1">${GLYPH[s.rarity]}</svg>${s.rarity}</span></div>
      <div class="yc-art">${art}</div>
      <div class="yc-plate"><div class="yc-sp"><b>${s.name}</b><span>· ${s.family}</span></div><p class="yc-fl">${s.line}</p><div class="yc-ser"><span>no. ${String(s.no).padStart(3, "0")} / ${s.of}</span><span>${found()}</span></div></div>`;
  return `<div class="yc" style="--b:${s.b};--d:${s.d};--glare:${m.glare};--bloomk:${(m.bloom / 0.5).toFixed(3)}">
    <div class="yc-print"></div>
    <div class="yc-under">${layout(`<img src="/shots/creatures/${slug(s.name)}.webp" alt="" loading="lazy" draggable="false"/>`)}</div>
    <div class="yc-foil">${foil}</div>
    <div class="yc-grain"></div><div class="yc-glare"></div>
    <div class="yc-over">${layout("")}</div>
    <div class="yc-rim"></div>
  </div>`;
}

/** Set a card's pose (the card, fast) and sheet (the foil, lagging), both in −1…1. */
export function setPose(el, pose, sheet, tiltCard = true) {
  const off = Math.min(1, Math.hypot(sheet.x, sheet.y));
  el.style.setProperty("--sx", sheet.x.toFixed(4)); el.style.setProperty("--sy", sheet.y.toFixed(4));
  el.style.setProperty("--off", off.toFixed(4));
  el.style.setProperty("--gx", ((pose.x + 1) / 2 * 76 + 12).toFixed(2) + "%");
  el.style.setProperty("--gy", ((pose.y + 1) / 2 * 76 + 12).toFixed(2) + "%");
  // the pool rides toward the edge you turned (Holo.remap 0.92…0.08), as a unitless percent
  el.style.setProperty("--pxv", ((-sheet.x + 1) / 2 * 84 + 8).toFixed(2));
  el.style.setProperty("--pyv", ((-sheet.y + 1) / 2 * 84 + 8).toFixed(2));
  const u = el.getBoundingClientRect().width / 300;
  el.style.boxShadow = `${(-pose.x * 14 * u).toFixed(1)}px ${(10 * u - pose.y * 10 * u).toFixed(1)}px ${(22 * u).toFixed(1)}px rgba(0,0,0,.18)`;
  if (tiltCard) el.style.transform = `rotateX(${(-pose.y * 13).toFixed(3)}deg) rotateY(${(pose.x * 13).toFixed(3)}deg)`;
}
export const POSED = { x: -0.34, y: -0.28 };

/** YolkCardBack onto a canvas, sized to the card. */
export function paintBack(canvas, rarity) {
  const ctx = canvas.getContext("2d");
  const r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = r.width, h = r.height, u = w / 300;
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
  const [stock, deep, dot] = BACK_INKS[rarity];
  let g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, stock); g.addColorStop(0.5, deep); g.addColorStop(1, stock);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  g = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w);
  g.addColorStop(0, deep + "00"); g.addColorStop(1, deep + "8C");
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  // the moiré: two staggered halftone plates, the second 7° off. commons get none.
  if (rarity !== "common") {
    ctx.globalCompositeOperation = "multiply";
    const plate = (pitch, rad, alpha, rot) => {
      ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(rot); ctx.translate(-w * 0.7, -h * 0.7);
      ctx.fillStyle = dot; ctx.globalAlpha = alpha;
      for (let y = pitch / 2, row = 0; y < h * 1.4 + pitch; y += pitch, row++)
        for (let x = pitch / 2 + (row % 2 ? pitch / 2 : 0); x < w * 1.4 + pitch; x += pitch) { ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill(); }
      ctx.restore();
    };
    plate(13 * u, 1.7 * u, 0.55, 0); plate(15.5 * u, 1.4 * u, 0.34, (7 * Math.PI) / 180);
    ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
  }
  // inset keyline
  ctx.globalAlpha = 0.5; ctx.strokeStyle = dot; ctx.lineWidth = 1.5 * u;
  ctx.beginPath(); ctx.roundRect(14 * u + 0.75 * u, 14 * u + 0.75 * u, w - 29.5 * u, h - 29.5 * u, 12 * u); ctx.stroke();
  ctx.globalAlpha = 1;
  // YolkMark: body, side nubs, two feet — pressed in, lit from one side
  const mw = w * 0.42, mh = mw * 1.05, ox = (w - mw) / 2, oy = (h - mh) / 2;
  const E = (cx, cy, rx, ry) => { ctx.moveTo(cx + rx, cy); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); };
  const mark = () => {
    ctx.beginPath();
    const bx = ox + mw * 0.11, by = oy + mh * 0.06, bd = mw * 0.78;
    E(bx + bd / 2, by + bd / 2, bd / 2, bd / 2);
    const nw = mw * 0.13, nh = mw * 0.17, ny = by + bd / 2;
    E(bx - nw * 0.55 + nw / 2, ny, nw / 2, nh / 2);
    E(bx + bd - nw * 0.45 + nw / 2, ny, nw / 2, nh / 2);
    const fw = mw * 0.22, fh = mw * 0.12, fy = by + bd - fh * 0.45 + fh / 2, mx = bx + bd / 2;
    E(mx - fw * 1.15 + fw / 2, fy, fw / 2, fh / 2);
    E(mx + fw * 0.15 + fw / 2, fy, fw / 2, fh / 2);
  };
  const base = 1.4 * u, dx = 0.12 * 2.2 * u + base, dy = 0.1 * 2.2 * u + base;
  ctx.save(); ctx.shadowColor = "rgba(255,255,255,.95)"; ctx.shadowBlur = 0.5 * u * dpr; ctx.shadowOffsetX = dx * dpr; ctx.shadowOffsetY = dy * dpr;
  ctx.fillStyle = deep; ctx.globalAlpha = 0.38; mark(); ctx.fill(); ctx.restore();
  ctx.save(); ctx.shadowColor = "rgba(42,36,27,.34)"; ctx.shadowBlur = 0.5 * u * dpr; ctx.shadowOffsetX = -dx * dpr; ctx.shadowOffsetY = -dy * dpr;
  ctx.fillStyle = deep; ctx.globalAlpha = 0.38; mark(); ctx.fill(); ctx.restore();
  // sheen
  ctx.globalCompositeOperation = "soft-light";
  g = ctx.createRadialGradient(w * 0.45, h * 0.45, 0, w * 0.45, h * 0.45, w * 0.8);
  g.addColorStop(0, "rgba(255,255,255,.4)"); g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";
}
