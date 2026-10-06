import { resolveColors } from "../themes";
import type { FlapBoardConfig } from "../types";
import { STANDALONE_FLAP_CSS } from "./css";

/** Config subset baked into site exports (display-ready). */
export interface ExportBoardConfig {
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
  charset: FlapBoardConfig["charset"];
  align: FlapBoardConfig["align"];
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

export function toExportConfig(config: FlapBoardConfig): ExportBoardConfig {
  return {
    title: config.title,
    rows: config.rows.map((row) => ({
      id: row.id,
      label: row.label,
      showLabel: row.showLabel,
      messages: [...row.messages],
      columns: row.columns,
      enabled: row.enabled,
    })),
    flipDurationMs: config.flipDurationMs,
    staggerMs: config.staggerMs,
    holdDurationMs: config.holdDurationMs,
    changeGapMs: config.changeGapMs,
    colors: { ...resolveColors(config.themeId, config.customColors) },
    charset: config.charset,
    align: config.align,
    scale: config.scale,
    flapGap: config.flapGap,
    brightness: config.brightness,
    soundEnabled: config.soundEnabled,
    soundVolume: config.soundVolume,
    autoRotate: config.autoRotate,
    showHeaders: config.showHeaders,
    showClock: config.showClock,
    uppercase: config.uppercase,
    padChar: config.padChar,
  };
}

export function serializeExportConfig(config: FlapBoardConfig): string {
  return JSON.stringify(toExportConfig(config), null, 2);
}

export type SiteExportFormat = "react" | "html";

export interface SiteExportFile {
  filename: string;
  language: "tsx" | "css" | "html" | "js" | "md";
  content: string;
}

export interface SiteExportBundle {
  format: SiteExportFormat;
  label: string;
  description: string;
  files: SiteExportFile[];
  readme: string;
}

function cssWithoutImport(): string {
  // React users often load fonts themselves; keep @import for CSS file too.
  return STANDALONE_FLAP_CSS;
}

export function getStandaloneCss(): string {
  return cssWithoutImport();
}
