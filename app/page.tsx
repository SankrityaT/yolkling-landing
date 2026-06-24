"use client";

import { useEffect, useRef } from "react";
import "./yolk.css";
import { BODY } from "./body";
import { bootYolkling } from "./engine";

export default function Page() {
  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    const id = requestAnimationFrame(() => {
      try { bootYolkling(); } catch (e) { console.error("yolkling engine error", e); }
    });
    return () => cancelAnimationFrame(id);
  }, []);
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BODY }} />;
}
