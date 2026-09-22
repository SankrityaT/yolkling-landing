"use client";

import { useEffect, useRef } from "react";
import "./yolk.css";
import { BODY } from "./body";
import { bootYolkling } from "./engine";
import { APP_STORE_URL, IS_LIVE } from "./config";

// Download mode (see app/config.ts): the App Store link is baked in at build time, but the
// badge only switches on once /api/app-live confirms Apple has the app listed.
const HTML = IS_LIVE ? BODY.replaceAll("__APP_STORE__", APP_STORE_URL) : BODY;

export default function Page() {
  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    if (IS_LIVE) {
      fetch("/api/app-live").then((r) => r.json()).then((d) => {
        if (d?.live) document.getElementById("page")?.classList.add("is-live");
      }).catch(() => {});
    }
    const id = requestAnimationFrame(() => {
      try { bootYolkling(); } catch (e) { console.error("yolkling engine error", e); }
    });
    return () => cancelAnimationFrame(id);
  }, []);
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: HTML }} />;
}
