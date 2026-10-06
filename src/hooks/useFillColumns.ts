"use client";

import { useEffect, useState, type RefObject } from "react";

function readFlapWidthPx(fromEl: HTMLElement): number {
  const room = fromEl.closest(".flap-room") ?? fromEl;
  const raw = getComputedStyle(room).getPropertyValue("--flap-w").trim();
  if (!raw) return 29.6;
  if (raw.endsWith("rem")) {
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return parseFloat(raw) * root;
  }
  if (raw.endsWith("px")) return parseFloat(raw);
  return parseFloat(raw) || 29.6;
}

/** How many fixed-size flap modules fit across a container. */
export function useFillColumns(
  ref: RefObject<HTMLElement | null>,
  flapGap: number,
  /** Re-measure when scale / theme sizing changes. */
  sizingKey: string | number,
  minColumns: number,
): number {
  const [fit, setFit] = useState(minColumns);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const width = el.clientWidth;
      if (width <= 0) return;
      const flapPx = readFlapWidthPx(el);
      const stride = flapPx + flapGap;
      if (stride <= 0) return;
      const next = Math.max(1, Math.floor((width + flapGap) / stride));
      setFit(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, flapGap, sizingKey, minColumns]);

  return Math.max(minColumns, fit);
}
