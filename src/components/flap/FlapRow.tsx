"use client";

import { useRef } from "react";
import { padMessage } from "@/lib/flap/charset";
import { useFillColumns } from "@/hooks/useFillColumns";
import type { AlignMode, CharsetId } from "@/lib/flap/types";
import { FlapChar } from "./FlapChar";

interface FlapRowProps {
  label: string;
  showLabel: boolean;
  message: string;
  /** Minimum modules from settings; blank tiles fill the rest of the row. */
  columns: number;
  align: AlignMode;
  charset: CharsetId;
  uppercase: boolean;
  padChar: string;
  flipDurationMs: number;
  staggerMs: number;
  flapGap: number;
  soundEnabled: boolean;
  soundVolume: number;
  scale: number;
}

export function FlapRow({
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
}: FlapRowProps) {
  const tilesRef = useRef<HTMLDivElement>(null);
  const fillColumns = useFillColumns(
    tilesRef,
    flapGap,
    `${scale}-${showLabel ? "1" : "0"}`,
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
        <div className="flap-row-label shrink-0 text-right">{label}</div>
      )}
      <div
        ref={tilesRef}
        className="flap-row-tiles"
        style={{ gap: `${flapGap}px` }}
        role="text"
        aria-label={`${label || "row"}: ${message}`}
      >
        {chars.map((char, index) => (
          <FlapChar
            key={`${fillColumns}-${index}`}
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
