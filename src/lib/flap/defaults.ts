import { THEME_PRESETS } from "./themes";
import type { FlapBoardConfig, FlapRowConfig } from "./types";

function row(
  partial: Omit<FlapRowConfig, "id"> & { id?: string },
): FlapRowConfig {
  return {
    id: partial.id ?? crypto.randomUUID(),
    label: partial.label,
    showLabel: partial.showLabel,
    messages: partial.messages,
    columns: partial.columns,
    enabled: partial.enabled,
  };
}

export function createDefaultRows(): FlapRowConfig[] {
  return [
    row({
      id: "row-1",
      label: "",
      showLabel: false,
      messages: ["BARS   STADIUMS   HOTELS", "FLAP SIGN   NOW LIVE"],
      columns: 24,
      enabled: true,
    }),
    row({
      id: "row-2",
      label: "",
      showLabel: false,
      messages: ["AIRPORTS   RETAIL   CAFES", "GATE OPEN   ALL CLEAR"],
      columns: 24,
      enabled: true,
    }),
    row({
      id: "row-3",
      label: "",
      showLabel: false,
      messages: ["EXPERIENTIAL MARKETING", "OPERATOR READY"],
      columns: 24,
      enabled: true,
    }),
    row({
      id: "row-4",
      label: "",
      showLabel: false,
      messages: ["LOBBIES   TRAIN STATIONS", "PLATFORM A   MAIN HALL"],
      columns: 24,
      enabled: true,
    }),
    row({
      id: "row-5",
      label: "",
      showLabel: false,
      messages: ["EDUCATION   CRUISE SHIPS", "BOARDING   ON TIME"],
      columns: 24,
      enabled: true,
    }),
    row({
      id: "row-6",
      label: "",
      showLabel: false,
      messages: ["RESTAURANTS   OFFICES", "HOME BASE   NOW BOARDING"],
      columns: 24,
      enabled: true,
    }),
    row({
      id: "row-7",
      label: "",
      showLabel: false,
      messages: ["TRANSPORTATION   CASINOS", "EDIT IN SETTINGS"],
      columns: 24,
      enabled: true,
    }),
  ];
}

export function createDefaultConfig(): FlapBoardConfig {
  return {
    title: "FLAP",
    rows: createDefaultRows(),
    flipDurationMs: 160,
    staggerMs: 28,
    holdDurationMs: 4200,
    changeGapMs: 350,
    themeId: "solari",
    customColors: { ...THEME_PRESETS.solari.colors },
    charset: "full",
    align: "left",
    scale: 1,
    flapGap: 3,
    brightness: 1,
    soundEnabled: false,
    soundVolume: 0.35,
    autoRotate: true,
    showHeaders: false,
    showClock: true,
    uppercase: true,
    padChar: " ",
  };
}

export const STORAGE_KEY = "flap-sign-config-v3";
