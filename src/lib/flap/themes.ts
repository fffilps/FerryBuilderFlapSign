import type { FlapThemeColors, ThemeId } from "./types";

export const THEME_PRESETS: Record<
  Exclude<ThemeId, "custom">,
  { name: string; description: string; colors: FlapThemeColors }
> = {
  solari: {
    name: "Mechanical Black",
    description: "White lettering on matte black modules — real departure board.",
    colors: {
      housing: "#0c0c0c",
      housingEdge: "#050505",
      flap: "#141414",
      flapEdge: "#1f1f1f",
      blank: "#111111",
      blankEdge: "#0a0a0a",
      text: "#f4f4f2",
      label: "#6a6a6a",
      accent: "#c8c8c4",
      room: "#1a1612",
      roomGlow: "rgba(255, 255, 255, 0.03)",
    },
  },
  terminal: {
    name: "Airport Terminal",
    description: "Cool graphite housing with crisp white glyphs.",
    colors: {
      housing: "#0e1218",
      housingEdge: "#06080c",
      flap: "#151a22",
      flapEdge: "#222833",
      blank: "#11151c",
      blankEdge: "#090b10",
      text: "#f0f3f7",
      label: "#6a7585",
      accent: "#d0d6de",
      room: "#12161c",
      roomGlow: "rgba(200, 210, 230, 0.04)",
    },
  },
  "night-ops": {
    name: "Night Ops",
    description: "Low amber glyphs on deep matte modules.",
    colors: {
      housing: "#090908",
      housingEdge: "#040403",
      flap: "#12110f",
      flapEdge: "#1c1a16",
      blank: "#0e0d0b",
      blankEdge: "#070706",
      text: "#e0b456",
      label: "#6e6040",
      accent: "#c9962a",
      room: "#070706",
      roomGlow: "rgba(224, 180, 86, 0.05)",
    },
  },
  harbor: {
    name: "Harbor Green",
    description: "Sea-glass lettering on slate modules.",
    colors: {
      housing: "#0c1210",
      housingEdge: "#060908",
      flap: "#141c19",
      flapEdge: "#1e2a26",
      blank: "#101613",
      blankEdge: "#080c0a",
      text: "#d2e6da",
      label: "#5f7368",
      accent: "#3aa87a",
      room: "#0a0f0d",
      roomGlow: "rgba(58, 168, 122, 0.05)",
    },
  },
};

export function resolveColors(
  themeId: ThemeId,
  custom: FlapThemeColors,
): FlapThemeColors {
  if (themeId === "custom") return custom;
  return THEME_PRESETS[themeId].colors;
}
