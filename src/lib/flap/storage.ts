import { createDefaultConfig } from "./defaults";
import type { FlapBoardConfig } from "./types";
import { STORAGE_KEY } from "./defaults";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function loadConfig(): FlapBoardConfig {
  if (typeof window === "undefined") return createDefaultConfig();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultConfig();
    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed) || !Array.isArray(parsed.rows)) {
      return createDefaultConfig();
    }
    const base = createDefaultConfig();
    return {
      ...base,
      ...parsed,
      rows: parsed.rows as FlapBoardConfig["rows"],
      customColors: {
        ...base.customColors,
        ...(isObject(parsed.customColors) ? parsed.customColors : {}),
      },
    } as FlapBoardConfig;
  } catch {
    return createDefaultConfig();
  }
}

export function saveConfig(config: FlapBoardConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function exportConfig(config: FlapBoardConfig): string {
  return JSON.stringify(config, null, 2);
}

export function importConfig(json: string): FlapBoardConfig {
  const parsed: unknown = JSON.parse(json);
  if (!isObject(parsed) || !Array.isArray(parsed.rows)) {
    throw new Error("Invalid board config");
  }
  const base = createDefaultConfig();
  return {
    ...base,
    ...parsed,
    rows: parsed.rows as FlapBoardConfig["rows"],
    customColors: {
      ...base.customColors,
      ...(isObject(parsed.customColors) ? parsed.customColors : {}),
    },
  } as FlapBoardConfig;
}
