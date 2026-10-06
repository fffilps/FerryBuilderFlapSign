import type { FlapBoardConfig } from "../types";
import { getStandaloneCss, serializeExportConfig } from "./types";
import type { SiteExportBundle } from "./types";

export function generateReactBundle(config: FlapBoardConfig): SiteExportBundle {
  const configJson = serializeExportConfig(config);
  const css = getStandaloneCss();

  const tsx = `"use client";

/**
 * FlapSign — exported React component
 *
 * 1. Copy FlapSign.tsx + FlapSign.css into your project
 * 2. Import: import { FlapSign } from "./FlapSign";
 * 3. Render: <FlapSign /> or <FlapSign config={...} />
 *
 * Works with Next.js (App Router), Vite, CRA, and other React 18+ apps.
 */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import "./FlapSign.css";

export type FlapCharset = "full" | "alphanumeric" | "numeric" | "letters";
export type FlapAlign = "left" | "center" | "right";

export interface FlapExportConfig {
  title: string;
  rows: Array<{
    id: string;
    label: string;
    showLabel: boolean;
    messages: string[];
    columns: number;
    enabled: boolean;
  }>;
  flipDurationMs: number;
  staggerMs: number;
  holdDurationMs: number;
  changeGapMs: number;
  colors: {
    housing: string;
    housingEdge: string;
    flap: string;
    flapEdge: string;
    blank: string;
    blankEdge: string;
    text: string;
    label: string;
    accent: string;
    room: string;
    roomGlow: string;
  };
  charset: FlapCharset;
  align: FlapAlign;
  scale: number;
  flapGap: number;
  brightness: number;
  soundEnabled: boolean;
  soundVolume: number;
  autoRotate: boolean;
  showHeaders: boolean;
  showClock: boolean;
  uppercase: boolean;
  padChar: string;
}

export const DEFAULT_FLAP_CONFIG: FlapExportConfig = ${configJson};

const CHARSETS: Record<FlapCharset, string> = {
  letters: " ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeric: " 0123456789",
  alphanumeric: " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  full: " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,:-/'\\"!?&@#%+*=<>()[]",
};

function normalizeChar(
  char: string,
  charset: FlapCharset,
  uppercase: boolean,
): string {
  const raw = uppercase ? char.toUpperCase() : char;
  const set = CHARSETS[charset];
  if (set.includes(raw)) return raw;
  if (raw === "\\t") return " ";
  return set.includes("?") ? "?" : " ";
}

function padMessage(
  message: string,
  columns: number,
  align: FlapAlign,
  padChar: string,
  charset: FlapCharset,
  uppercase: boolean,
): string[] {
  const pad = normalizeChar(padChar || " ", charset, uppercase);
  const chars = Array.from(message).map((c) =>
    normalizeChar(c, charset, uppercase),
  );
  const clipped = chars.slice(0, columns);
  const missing = columns - clipped.length;
  if (missing <= 0) return clipped;
  if (align === "right") return Array(missing).fill(pad).concat(clipped);
  if (align === "center") {
    const left = Math.floor(missing / 2);
    const right = missing - left;
    return Array(left).fill(pad).concat(clipped, Array(right).fill(pad));
  }
  return clipped.concat(Array(missing).fill(pad));
}

function glyph(char: string): string {
  return char === " " ? "\\u00A0" : char;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let audioCtx: AudioContext | null = null;

function playFlapClick(volume: number): void {
  if (typeof window === "undefined" || volume <= 0) return;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return;
  if (!audioCtx) audioCtx = new AC();
  if (audioCtx.state === "suspended") void audioCtx.resume();

  const now = audioCtx.currentTime;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.min(0.4, volume) * 0.08, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
  gain.connect(audioCtx.destination);

  const osc = audioCtx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(180 + Math.random() * 80, now);
  osc.connect(gain);
  osc.start(now);
  osc.stop(now + 0.045);
}

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

function useFillColumns(
  ref: RefObject<HTMLElement | null>,
  flapGap: number,
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
      setFit(Math.max(1, Math.floor((width + flapGap) / stride)));
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

function FlapChar({
  value,
  flipDurationMs,
  delayMs = 0,
  soundEnabled = false,
  soundVolume = 0.35,
}: {
  value: string;
  flipDurationMs: number;
  delayMs?: number;
  soundEnabled?: boolean;
  soundVolume?: number;
}) {
  const [current, setCurrent] = useState(value);
  const [from, setFrom] = useState(value);
  const [to, setTo] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const queueRef = useRef<string[]>([]);
  const busyRef = useRef(false);
  const timers = useRef<number[]>([]);
  const currentRef = useRef(current);
  const soundRef = useRef({ soundEnabled, soundVolume, flipDurationMs });
  const drainRef = useRef<() => void>(() => undefined);

  currentRef.current = current;
  soundRef.current = { soundEnabled, soundVolume, flipDurationMs };

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const startFlip = (next: string) => {
    if (next === currentRef.current) {
      busyRef.current = false;
      drainRef.current();
      return;
    }

    if (prefersReducedMotion()) {
      setCurrent(next);
      currentRef.current = next;
      setFrom(next);
      setTo(next);
      setFlipping(false);
      busyRef.current = false;
      drainRef.current();
      return;
    }

    busyRef.current = true;
    setFrom(currentRef.current);
    setTo(next);
    setFlipping(true);
    setAnimKey((k) => k + 1);
    if (soundRef.current.soundEnabled) {
      playFlapClick(soundRef.current.soundVolume);
    }

    const done = window.setTimeout(() => {
      setCurrent(next);
      currentRef.current = next;
      setFlipping(false);
      busyRef.current = false;
      drainRef.current();
    }, soundRef.current.flipDurationMs);
    timers.current.push(done);
  };

  drainRef.current = () => {
    if (busyRef.current) return;
    const next = queueRef.current.shift();
    if (next === undefined) return;
    const latest = queueRef.current.length
      ? queueRef.current[queueRef.current.length - 1]!
      : next;
    queueRef.current = [];
    if (latest === currentRef.current) return;
    startFlip(latest);
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (value === currentRef.current && !busyRef.current) return;
    const id = window.setTimeout(() => {
      if (busyRef.current) {
        queueRef.current = [value];
        return;
      }
      startFlip(value);
    }, delayMs);
    timers.current.push(id);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  const blank = current === " " && !flipping;

  return (
    <div
      className="flap-char"
      data-blank={blank ? "true" : "false"}
      style={{ ["--flip-ms" as string]: \`\${flipDurationMs}ms\` }}
      aria-hidden
    >
      <div className="flap-well">
        <div className="flap-half top">
          <span>{glyph(flipping ? to : current)}</span>
        </div>
        <div className="flap-half bottom">
          <span>{glyph(flipping ? from : current)}</span>
        </div>
        <div className="flap-hinge" aria-hidden>
          <i className="flap-pin left" />
          <i className="flap-pin right" />
        </div>
        {flipping && (
          <>
            <div className="flap-anim top" key={\`t-\${animKey}\`}>
              <span>{glyph(from)}</span>
            </div>
            <div className="flap-anim bottom" key={\`b-\${animKey}\`}>
              <span>{glyph(to)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FlapRow({
  label,
  showLabel,
  message,
  columns,
  align,
  charset,
  uppercase,
  padChar,
  flipDurationMs,
  staggerMs,
  flapGap,
  soundEnabled,
  soundVolume,
  scale,
}: {
  label: string;
  showLabel: boolean;
  message: string;
  columns: number;
  align: FlapAlign;
  charset: FlapCharset;
  uppercase: boolean;
  padChar: string;
  flipDurationMs: number;
  staggerMs: number;
  flapGap: number;
  soundEnabled: boolean;
  soundVolume: number;
  scale: number;
}) {
  const tilesRef = useRef<HTMLDivElement>(null);
  const fillColumns = useFillColumns(
    tilesRef,
    flapGap,
    \`\${scale}-\${showLabel ? "1" : "0"}\`,
    columns,
  );
  const chars = padMessage(
    message,
    fillColumns,
    align,
    padChar,
    charset,
    uppercase,
  );

  return (
    <div className="flap-row">
      {showLabel && (
        <div className="flap-row-label">{label}</div>
      )}
      <div
        ref={tilesRef}
        className="flap-row-tiles"
        style={{ gap: \`\${flapGap}px\` }}
        role="text"
        aria-label={\`\${label || "row"}: \${message}\`}
      >
        {chars.map((char, index) => (
          <FlapChar
            key={\`\${fillColumns}-\${index}\`}
            value={char}
            flipDurationMs={flipDurationMs}
            delayMs={index * staggerMs}
            soundEnabled={soundEnabled}
            soundVolume={soundVolume}
          />
        ))}
      </div>
    </div>
  );
}

function useClock(enabled: boolean) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    if (!enabled) {
      setNow(null);
      return;
    }
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [enabled]);
  return now;
}

export interface FlapSignProps {
  /** Override the baked-in export config. */
  config?: FlapExportConfig;
  /** Pause playlist rotation. */
  paused?: boolean;
  className?: string;
}

export function FlapSign({
  config: configProp,
  paused = false,
  className,
}: FlapSignProps) {
  const config = configProp ?? DEFAULT_FLAP_CONFIG;
  const colors = config.colors;
  const now = useClock(config.showClock);
  const rows = useMemo(
    () => config.rows.filter((r) => r.enabled),
    [config.rows],
  );

  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    () => Object.fromEntries(config.rows.map((row) => [row.id, 0])),
  );

  useEffect(() => {
    setActiveIndexes((prev) => {
      const next: Record<string, number> = {};
      for (const row of config.rows) {
        next[row.id] = prev[row.id] ?? 0;
      }
      return next;
    });
  }, [config.rows]);

  const maxColumnsInRow = useMemo(() => {
    if (rows.length === 0) return 1;
    return Math.max(1, ...rows.map((r) => r.columns));
  }, [rows]);

  const flipSettleMs =
    config.flipDurationMs + config.staggerMs * Math.max(0, maxColumnsInRow - 1);

  useEffect(() => {
    if (paused || !config.autoRotate) return;
    const tickMs = Math.max(
      500,
      config.holdDurationMs + config.changeGapMs + flipSettleMs,
    );
    const id = window.setInterval(() => {
      setActiveIndexes((prev) => {
        const next = { ...prev };
        for (const row of config.rows) {
          if (!row.enabled || row.messages.length <= 1) continue;
          const cur = prev[row.id] ?? 0;
          next[row.id] = (cur + 1) % row.messages.length;
        }
        return next;
      });
    }, tickMs);
    return () => window.clearInterval(id);
  }, [
    paused,
    config.autoRotate,
    config.holdDurationMs,
    config.changeGapMs,
    config.rows,
    flipSettleMs,
  ]);

  const clockText =
    now === null
      ? "--:--"
      : now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

  return (
    <div
      className={["flap-room", className].filter(Boolean).join(" ")}
      style={
        {
          ["--flap-housing" as string]: colors.housing,
          ["--flap-housing-edge" as string]: colors.housingEdge,
          ["--flap-face" as string]: colors.flap,
          ["--flap-edge" as string]: colors.flapEdge,
          ["--flap-blank" as string]: colors.blank,
          ["--flap-blank-edge" as string]: colors.blankEdge,
          ["--flap-text" as string]: colors.text,
          ["--flap-label" as string]: colors.label,
          ["--flap-accent" as string]: colors.accent,
          ["--flap-room" as string]: colors.room,
          ["--flap-glow" as string]: colors.roomGlow,
          ["--flap-w" as string]: \`\${1.85 * config.scale}rem\`,
          ["--flap-h" as string]: \`\${2.55 * config.scale}rem\`,
          filter: \`brightness(\${config.brightness})\`,
        } as CSSProperties
      }
    >
      <header className="flap-header flap-fade-in">
        <div>
          <p className="flap-brand">{config.title}</p>
          {config.showHeaders && (
            <p className="flap-subtitle">Split-flap display</p>
          )}
        </div>
        {config.showClock && <div className="flap-clock">{clockText}</div>}
      </header>

      <main className="flap-main flap-fade-in">
        <div className="flap-housing">
          <div className="flap-housing-inner">
            <div className="flap-rows">
              {rows.length === 0 ? (
                <div
                  style={{
                    padding: "2rem 0",
                    textAlign: "center",
                    fontSize: "0.875rem",
                    letterSpacing: "0.08em",
                    color: "var(--flap-label)",
                  }}
                >
                  No active rows.
                </div>
              ) : (
                rows.map((row, rowIndex) => {
                  const idx = activeIndexes[row.id] ?? 0;
                  const message =
                    row.messages[idx % Math.max(row.messages.length, 1)] ?? "";
                  return (
                    <div
                      key={row.id}
                      className="flap-fade-in"
                      style={{ animationDelay: \`\${rowIndex * 55}ms\` }}
                    >
                      <FlapRow
                        label={row.label}
                        showLabel={row.showLabel && config.showHeaders}
                        message={message}
                        columns={row.columns}
                        align={config.align}
                        charset={config.charset}
                        uppercase={config.uppercase}
                        padChar={config.padChar}
                        flipDurationMs={config.flipDurationMs}
                        staggerMs={config.staggerMs}
                        flapGap={config.flapGap}
                        soundEnabled={config.soundEnabled}
                        soundVolume={config.soundVolume}
                        scale={config.scale}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="flap-footer flap-fade-in">
        <span
          className="flap-live-dot"
          data-paused={paused ? "true" : "false"}
          aria-hidden
        />
        <span>
          {paused ? "Paused" : "Live"} · {rows.length} rows
        </span>
      </footer>
    </div>
  );
}

export default FlapSign;
`;

  const readme = `# FlapSign React export

Self-contained split-flap board component with your current settings baked in.

## Files

- \`FlapSign.tsx\` — React component (+ types + helpers)
- \`FlapSign.css\` — styles (loads Syne + Barlow Condensed from Google Fonts)

## Install

1. Copy both files into your React project (e.g. \`components/FlapSign/\`)
2. Ensure CSS imports work (Next.js, Vite, and CRA all support \`import "./FlapSign.css"\`)
3. Use it:

\`\`\`tsx
import { FlapSign } from "./FlapSign";

export default function Page() {
  return <FlapSign />;
}
\`\`\`

## Optional props

\`\`\`tsx
<FlapSign paused={false} config={DEFAULT_FLAP_CONFIG} className="my-board" />
\`\`\`

- \`config\` — override the exported board config
- \`paused\` — stop playlist rotation
- \`className\` — extra class on the root \`.flap-room\`

Requires React 18+.
`;

  return {
    format: "react",
    label: "React component",
    description:
      "Self-contained FlapSign.tsx + CSS for Next.js, Vite, or any React app.",
    files: [
      { filename: "FlapSign.tsx", language: "tsx", content: tsx },
      { filename: "FlapSign.css", language: "css", content: css },
      { filename: "README.md", language: "md", content: readme },
    ],
    readme,
  };
}
