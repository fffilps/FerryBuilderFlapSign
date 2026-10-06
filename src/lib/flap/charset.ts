import type { CharsetId } from "./types";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const PUNCT = " .,:-/'\"!?&@#%+*=<>()[]";

export const CHARSETS: Record<CharsetId, string> = {
  letters: ` ${LETTERS}`,
  numeric: ` ${DIGITS}`,
  alphanumeric: ` ${LETTERS}${DIGITS}`,
  full: ` ${LETTERS}${DIGITS}${PUNCT}`,
};

export function normalizeChar(
  char: string,
  charset: CharsetId,
  uppercase: boolean,
): string {
  const raw = uppercase ? char.toUpperCase() : char;
  const set = CHARSETS[charset];
  if (set.includes(raw)) return raw;
  if (raw === "\t") return " ";
  return set.includes("?") ? "?" : " ";
}

export function padMessage(
  message: string,
  columns: number,
  align: "left" | "center" | "right",
  padChar: string,
  charset: CharsetId,
  uppercase: boolean,
): string[] {
  const pad = normalizeChar(padChar || " ", charset, uppercase);
  const chars = Array.from(message).map((c) =>
    normalizeChar(c, charset, uppercase),
  );
  const clipped = chars.slice(0, columns);
  const missing = columns - clipped.length;
  if (missing <= 0) return clipped;

  if (align === "right") {
    return Array(missing).fill(pad).concat(clipped);
  }
  if (align === "center") {
    const left = Math.floor(missing / 2);
    const right = missing - left;
    return Array(left).fill(pad).concat(clipped, Array(right).fill(pad));
  }
  return clipped.concat(Array(missing).fill(pad));
}

/** Shortest forward path count on the flap wheel (for delay feel). */
export function flapSteps(
  from: string,
  to: string,
  charset: CharsetId,
): number {
  const set = CHARSETS[charset];
  const a = set.indexOf(from);
  const b = set.indexOf(to);
  if (a < 0 || b < 0 || a === b) return 0;
  return (b - a + set.length) % set.length;
}
