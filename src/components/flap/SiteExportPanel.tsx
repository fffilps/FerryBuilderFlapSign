"use client";

import { useMemo, useState } from "react";
import { Check, Code2, Copy, Download, FileCode2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  downloadExportBundle,
  downloadTextFile,
  generateSiteExport,
  type SiteExportFormat,
} from "@/lib/flap/export";
import type { FlapBoardConfig } from "@/lib/flap/types";

interface SiteExportPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: FlapBoardConfig;
}

const FORMAT_OPTIONS: Array<{
  id: SiteExportFormat;
  title: string;
  blurb: string;
  icon: typeof Code2;
}> = [
  {
    id: "react",
    title: "React component",
    blurb: "FlapSign.tsx + CSS for Next.js, Vite, or any React app.",
    icon: Code2,
  },
  {
    id: "html",
    title: "HTML · CSS · JS",
    blurb: "Three static files — drop onto any site, no framework.",
    icon: FileCode2,
  },
];

export function SiteExportPanel({
  open,
  onOpenChange,
  config,
}: SiteExportPanelProps) {
  const [format, setFormat] = useState<SiteExportFormat>("react");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const bundle = useMemo(
    () => generateSiteExport(format, config),
    [format, config],
  );

  const codeFiles = bundle.files.filter((f) => f.language !== "md");
  const [activeFile, setActiveFile] = useState(0);

  const safeActive =
    activeFile < codeFiles.length ? activeFile : Math.max(0, codeFiles.length - 1);
  const currentFile = codeFiles[safeActive];

  const copyText = async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1600);
  };

  const handleDownloadAll = async () => {
    setDownloading(true);
    try {
      await downloadExportBundle(bundle);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex h-dvh max-h-dvh w-full flex-col gap-0 overflow-hidden border-l border-border p-0 sm:max-w-lg"
      >
        <SheetHeader className="shrink-0 border-b border-border px-4 py-4 pr-12">
          <SheetTitle className="tracking-wide">Export to your site</SheetTitle>
          <SheetDescription>
            Take this board live — pick React or plain HTML/CSS/JS.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4">
          <div className="space-y-2">
            <Label className="text-xs">Format</Label>
            <div className="grid gap-2">
              {FORMAT_OPTIONS.map((option) => {
                const Icon = option.icon;
                const selected = format === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setFormat(option.id);
                      setActiveFile(0);
                    }}
                    className={[
                      "flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-colors",
                      selected
                        ? "border-foreground/30 bg-muted/50"
                        : "border-border bg-transparent hover:bg-muted/30",
                    ].join(" ")}
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 opacity-70" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-medium">{option.title}</span>
                        {selected && (
                          <Badge
                            variant="secondary"
                            className="font-mono text-[0.6rem]"
                          >
                            SELECTED
                          </Badge>
                        )}
                      </span>
                      <span className="mt-0.5 block text-[0.7rem] leading-relaxed text-muted-foreground">
                        {option.blurb}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => void handleDownloadAll()}
              disabled={downloading}
            >
              <Download data-icon="inline-start" />
              {downloading ? "Downloading…" : "Download all files"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                void copyText("readme", bundle.readme)
              }
            >
              {copiedKey === "readme" ? (
                <Check data-icon="inline-start" />
              ) : (
                <Copy data-icon="inline-start" />
              )}
              {copiedKey === "readme" ? "Copied" : "Copy setup notes"}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-xs">Files</Label>
              <span className="font-mono text-[0.65rem] text-muted-foreground">
                {codeFiles.length} file{codeFiles.length === 1 ? "" : "s"}
              </span>
            </div>

            <Tabs
              value={String(safeActive)}
              onValueChange={(v) => setActiveFile(Number(v) || 0)}
              className="gap-2"
            >
              <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
                {codeFiles.map((file, index) => (
                  <TabsTrigger
                    key={file.filename}
                    value={String(index)}
                    className="font-mono text-[0.65rem]"
                  >
                    {file.filename}
                  </TabsTrigger>
                ))}
              </TabsList>

              {codeFiles.map((file, index) => (
                <TabsContent
                  key={file.filename}
                  value={String(index)}
                  className="mt-0 space-y-2"
                >
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => void copyText(file.filename, file.content)}
                    >
                      {copiedKey === file.filename ? (
                        <Check data-icon="inline-start" />
                      ) : (
                        <Copy data-icon="inline-start" />
                      )}
                      {copiedKey === file.filename ? "Copied" : "Copy"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        downloadTextFile(file.filename, file.content)
                      }
                    >
                      <Download data-icon="inline-start" />
                      Download
                    </Button>
                  </div>
                  <pre className="max-h-[min(42vh,22rem)] overflow-auto rounded-xl border border-border bg-muted/40 p-3 font-mono text-[0.65rem] leading-relaxed whitespace-pre-wrap break-all text-foreground/90">
                    {file.content}
                  </pre>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {currentFile && (
            <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
              Your rows, playlists, timing, and colors are baked into{" "}
              <span className="font-mono text-foreground/80">
                {format === "react" ? "FlapSign.tsx" : "flap-sign.js"}
              </span>
              . Re-export after you change the board.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
