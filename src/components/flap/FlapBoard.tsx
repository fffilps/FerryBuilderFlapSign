"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Pause, Play, Settings2, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveColors } from "@/lib/flap/themes";
import type { FlapBoardConfig } from "@/lib/flap/types";
import { FlapRow } from "./FlapRow";
import "./flap.css";

interface FlapBoardProps {
  config: FlapBoardConfig;
  onOpenSettings: () => void;
  onTogglePause: () => void;
  onAdvance: () => void;
  paused: boolean;
  activeIndexes: Record<string, number>;
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

export function FlapBoard({
  config,
  onOpenSettings,
  onTogglePause,
  onAdvance,
  paused,
  activeIndexes,
}: FlapBoardProps) {
  const colors = resolveColors(config.themeId, config.customColors);
  const now = useClock(config.showClock);
  const rows = useMemo(
    () => config.rows.filter((r) => r.enabled),
    [config.rows],
  );

  const clockText =
    now === null
      ? "--:--"
      : now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

  return (
    <div
      className="flap-room flex flex-1 flex-col"
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
          ["--flap-w" as string]: `${1.85 * config.scale}rem`,
          ["--flap-h" as string]: `${2.55 * config.scale}rem`,
          filter: `brightness(${config.brightness})`,
        } as CSSProperties
      }
    >
      <header className="flap-fade-in relative z-10 flex items-end justify-between gap-4 px-5 pt-6 sm:px-10 sm:pt-8">
        <div className="min-w-0">
          <p className="flap-brand text-[0.75rem] sm:text-[0.8rem]">{config.title}</p>
          {config.showHeaders && (
            <p className="mt-1.5 text-[0.62rem] tracking-[0.2em] text-[color:var(--flap-label)] uppercase opacity-65">
              Split-flap display
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {config.showClock && (
            <div className="mr-2 hidden tabular-nums tracking-[0.18em] text-[color:var(--flap-label)] sm:block sm:text-sm">
              {clockText}
            </div>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onTogglePause}
            aria-label={paused ? "Resume rotation" : "Pause rotation"}
            className="flap-chrome-btn text-[color:var(--flap-label)] hover:bg-white/5 hover:text-[color:var(--flap-accent)]"
          >
            {paused ? <Play /> : <Pause />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onAdvance}
            aria-label="Advance messages"
            className="flap-chrome-btn text-[color:var(--flap-label)] hover:bg-white/5 hover:text-[color:var(--flap-accent)]"
          >
            <SkipForward />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onOpenSettings}
            aria-label="Open board settings"
            className="flap-settings-btn flap-chrome-btn text-[color:var(--flap-label)] hover:text-[color:var(--flap-accent)]"
          >
            <Settings2 />
          </Button>
        </div>
      </header>

      <main className="flap-fade-in relative z-10 flex flex-1 items-center justify-center px-3 py-6 sm:px-8 sm:py-10">
        <div className="flap-housing w-full max-w-[58rem]">
          <div className="flap-housing-inner">
            <div className="flap-rows">
              {rows.length === 0 ? (
                <div className="py-8 text-center text-sm tracking-wide text-[color:var(--flap-label)]">
                  No active rows. Open settings to add a line.
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
                      style={{ animationDelay: `${rowIndex * 55}ms` }}
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

      <footer className="flap-fade-in relative z-10 flex items-center justify-center gap-2 px-5 pb-6 text-[0.6rem] tracking-[0.2em] text-[color:var(--flap-label)] uppercase opacity-55 sm:px-10">
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
