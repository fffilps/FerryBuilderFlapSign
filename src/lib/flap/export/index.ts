import type { FlapBoardConfig } from "../types";
import { generateHtmlBundle } from "./generateHtml";
import { generateReactBundle } from "./generateReact";
import type { SiteExportBundle, SiteExportFormat } from "./types";

export type { SiteExportBundle, SiteExportFile, SiteExportFormat } from "./types";
export { toExportConfig, serializeExportConfig } from "./types";

export function generateSiteExport(
  format: SiteExportFormat,
  config: FlapBoardConfig,
): SiteExportBundle {
  if (format === "react") return generateReactBundle(config);
  return generateHtmlBundle(config);
}

export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Trigger sequential downloads for a multi-file export pack. */
export async function downloadExportBundle(
  bundle: SiteExportBundle,
): Promise<void> {
  for (const file of bundle.files) {
    downloadTextFile(file.filename, file.content);
    // Browsers throttle rapid multi-downloads; small gap helps.
    await new Promise((resolve) => window.setTimeout(resolve, 180));
  }
}
