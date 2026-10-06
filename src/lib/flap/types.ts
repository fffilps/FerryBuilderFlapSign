export type ThemeId =
  | "solari"
  | "terminal"
  | "night-ops"
  | "harbor"
  | "custom";

export type AlignMode = "left" | "center" | "right";

export type CharsetId = "full" | "alphanumeric" | "numeric" | "letters";

export interface FlapThemeColors {
  housing: string;
  housingEdge: string;
  flap: string;
  flapEdge: string;
  /** Empty / pad tiles — near-black, slight contrast from housing. */
  blank: string;
  blankEdge: string;
  text: string;
  label: string;
  accent: string;
  room: string;
  roomGlow: string;
}

export interface FlapRowConfig {
  id: string;
  label: string;
  showLabel: boolean;
  /** Messages this row flips between (playlist / columns). */
  messages: string[];
  columns: number;
  enabled: boolean;
}

export interface FlapBoardConfig {
  title: string;
  rows: FlapRowConfig[];
  /** How long each flap animation takes (ms). */
  flipDurationMs: number;
  /** Delay between consecutive character starts (ms). */
  staggerMs: number;
  /** How long a message holds before advancing (ms). */
  holdDurationMs: number;
  /** Pause between playlist advances after flip settles (ms). */
  changeGapMs: number;
  themeId: ThemeId;
  customColors: FlapThemeColors;
  charset: CharsetId;
  align: AlignMode;
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

export interface FlapBoardState {
  config: FlapBoardConfig;
  /** Active message index per row id. */
  activeIndexes: Record<string, number>;
  paused: boolean;
  settingsOpen: boolean;
}
