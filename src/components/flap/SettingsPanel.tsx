"use client";

import { useRef, useState } from "react";
import {
  Code2,
  Copy,
  Download,
  GripVertical,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from "lucide-react";
import { SiteExportPanel } from "@/components/flap/SiteExportPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createDefaultConfig } from "@/lib/flap/defaults";
import { exportConfig, importConfig } from "@/lib/flap/storage";
import { THEME_PRESETS } from "@/lib/flap/themes";
import type {
  AlignMode,
  CharsetId,
  FlapBoardConfig,
  FlapRowConfig,
  FlapThemeColors,
  ThemeId,
} from "@/lib/flap/types";

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: FlapBoardConfig;
  onChange: (config: FlapBoardConfig) => void;
}

function sliderValue(
  value: number | readonly number[],
  fallback: number,
): number {
  if (typeof value === "number") return value;
  return value[0] ?? fallback;
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-[7.5rem] font-mono text-xs"
        />
        <input
          type="color"
          value={value.startsWith("#") && value.length === 7 ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded border border-border bg-transparent p-0.5"
          aria-label={label}
        />
      </div>
    </div>
  );
}

function RowEditor({
  row,
  onChange,
  onRemove,
  canRemove,
}: {
  row: FlapRowConfig;
  onChange: (row: FlapRowConfig) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const updateMessage = (index: number, value: string) => {
    const messages = row.messages.map((m, i) => (i === index ? value : m));
    onChange({ ...row, messages });
  };

  const addMessage = () => {
    onChange({ ...row, messages: [...row.messages, "NEW LINE"] });
  };

  const removeMessage = (index: number) => {
    if (row.messages.length <= 1) return;
    onChange({
      ...row,
      messages: row.messages.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="rounded-xl border border-border/80 bg-muted/30 p-3">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <GripVertical className="size-4 opacity-50" />
          <Badge variant="secondary" className="font-mono text-[0.65rem]">
            ROW
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Label htmlFor={`en-${row.id}`} className="text-xs">
              On
            </Label>
            <Switch
              id={`en-${row.id}`}
              checked={row.enabled}
              onCheckedChange={(enabled) => onChange({ ...row, enabled })}
            />
          </div>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            disabled={!canRemove}
            onClick={onRemove}
            aria-label="Remove row"
          >
            <Trash2 />
          </Button>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Label</Label>
            <Input
              value={row.label}
              onChange={(e) => onChange({ ...row, label: e.target.value })}
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Min columns</Label>
            <Input
              type="number"
              min={1}
              max={48}
              value={row.columns}
              onChange={(e) =>
                onChange({
                  ...row,
                  columns: Math.max(1, Math.min(48, Number(e.target.value) || 1)),
                })
              }
              className="h-8"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor={`lbl-${row.id}`} className="text-xs">
            Show label on board
          </Label>
          <Switch
            id={`lbl-${row.id}`}
            checked={row.showLabel}
            onCheckedChange={(showLabel) => onChange({ ...row, showLabel })}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Playlist columns</Label>
            <Button type="button" size="xs" variant="outline" onClick={addMessage}>
              <Plus data-icon="inline-start" />
              Add
            </Button>
          </div>
          <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
            Each entry is a column the row flips between on the hold timer.
          </p>
          <div className="space-y-2">
            {row.messages.map((message, index) => (
              <div key={`${row.id}-m-${index}`} className="flex gap-1.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border text-[0.65rem] text-muted-foreground">
                  {index + 1}
                </div>
                <Input
                  value={message}
                  onChange={(e) => updateMessage(index, e.target.value)}
                  className="h-8 font-mono uppercase"
                  maxLength={48}
                />
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  disabled={row.messages.length <= 1}
                  onClick={() => removeMessage(index)}
                  aria-label={`Remove message ${index + 1}`}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsPanel({
  open,
  onOpenChange,
  config,
  onChange,
}: SettingsPanelProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [siteExportOpen, setSiteExportOpen] = useState(false);

  const patch = (partial: Partial<FlapBoardConfig>) =>
    onChange({ ...config, ...partial });

  const patchColor = (key: keyof FlapThemeColors, value: string) => {
    onChange({
      ...config,
      themeId: "custom",
      customColors: { ...config.customColors, [key]: value },
    });
  };

  const updateRow = (id: string, row: FlapRowConfig) => {
    patch({ rows: config.rows.map((r) => (r.id === id ? row : r)) });
  };

  const addRow = () => {
    const next: FlapRowConfig = {
      id: crypto.randomUUID(),
      label: "LINE",
      showLabel: true,
      messages: ["NEW ROW"],
      columns: 14,
      enabled: true,
    };
    patch({ rows: [...config.rows, next] });
  };

  const removeRow = (id: string) => {
    if (config.rows.length <= 1) return;
    patch({ rows: config.rows.filter((r) => r.id !== id) });
  };

  const handleExport = () => {
    const blob = new Blob([exportConfig(config)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flap-board-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exportConfig(config));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const handleImportFile = async (file: File) => {
    try {
      const text = await file.text();
      const next = importConfig(text);
      onChange(next);
      setImportError(null);
    } catch {
      setImportError("Could not read that config file.");
    }
  };

  return (
    <>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex h-dvh max-h-dvh w-full flex-col gap-0 overflow-hidden border-l border-border p-0 sm:max-w-md"
      >
        <SheetHeader className="shrink-0 border-b border-border px-4 py-4 pr-12">
          <SheetTitle className="tracking-wide">Operator settings</SheetTitle>
          <SheetDescription>
            Rows, playlists, timing, themes — everything a board owner needs.
          </SheetDescription>
        </SheetHeader>

        <Tabs
          defaultValue="rows"
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          <div className="shrink-0 px-4 pt-3">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="rows">Rows</TabsTrigger>
              <TabsTrigger value="timing">Timing</TabsTrigger>
              <TabsTrigger value="look">Look</TabsTrigger>
              <TabsTrigger value="ops">Ops</TabsTrigger>
            </TabsList>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8">
            <TabsContent value="rows" className="mt-0 space-y-3 py-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Board title</Label>
                <Input
                  value={config.title}
                  onChange={(e) => patch({ title: e.target.value })}
                  className="h-8 tracking-[0.2em] uppercase"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-muted-foreground">
                  {config.rows.length} row{config.rows.length === 1 ? "" : "s"}
                </p>
                <Button type="button" size="sm" variant="outline" onClick={addRow}>
                  <Plus data-icon="inline-start" />
                  Add row
                </Button>
              </div>

              <div className="space-y-3">
                {config.rows.map((row) => (
                  <RowEditor
                    key={row.id}
                    row={row}
                    canRemove={config.rows.length > 1}
                    onChange={(next) => updateRow(row.id, next)}
                    onRemove={() => removeRow(row.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timing" className="mt-0 space-y-5 py-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Flip speed</Label>
                  <span className="font-mono text-xs text-muted-foreground">
                    {config.flipDurationMs}ms
                  </span>
                </div>
                <Slider
                  min={60}
                  max={600}
                  step={10}
                  value={[config.flipDurationMs]}
                  onValueChange={(v) =>
                    patch({ flipDurationMs: sliderValue(v, config.flipDurationMs) })
                  }
                />
                <p className="text-[0.7rem] text-muted-foreground">
                  How fast each flap tile completes its hinge animation.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Character stagger</Label>
                  <span className="font-mono text-xs text-muted-foreground">
                    {config.staggerMs}ms
                  </span>
                </div>
                <Slider
                  min={0}
                  max={160}
                  step={5}
                  value={[config.staggerMs]}
                  onValueChange={(v) =>
                    patch({ staggerMs: sliderValue(v, config.staggerMs) })
                  }
                />
                <p className="text-[0.7rem] text-muted-foreground">
                  Cascade delay from left to right across a row.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Hold before next text</Label>
                  <span className="font-mono text-xs text-muted-foreground">
                    {(config.holdDurationMs / 1000).toFixed(1)}s
                  </span>
                </div>
                <Slider
                  min={800}
                  max={12000}
                  step={100}
                  value={[config.holdDurationMs]}
                  onValueChange={(v) =>
                    patch({ holdDurationMs: sliderValue(v, config.holdDurationMs) })
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Change gap</Label>
                  <span className="font-mono text-xs text-muted-foreground">
                    {config.changeGapMs}ms
                  </span>
                </div>
                <Slider
                  min={0}
                  max={2000}
                  step={50}
                  value={[config.changeGapMs]}
                  onValueChange={(v) =>
                    patch({ changeGapMs: sliderValue(v, config.changeGapMs) })
                  }
                />
                <p className="text-[0.7rem] text-muted-foreground">
                  Extra pause after a flip settles before the next playlist step.
                </p>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div>
                  <Label className="text-xs">Auto-rotate playlist</Label>
                  <p className="text-[0.7rem] text-muted-foreground">
                    Cycle columns on a timer
                  </p>
                </div>
                <Switch
                  checked={config.autoRotate}
                  onCheckedChange={(autoRotate) => patch({ autoRotate })}
                />
              </div>
            </TabsContent>

            <TabsContent value="look" className="mt-0 space-y-5 py-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Theme</Label>
                <Select
                  value={config.themeId}
                  items={{
                    ...Object.fromEntries(
                      Object.entries(THEME_PRESETS).map(([id, theme]) => [
                        id,
                        theme.name,
                      ]),
                    ),
                    custom: "Custom colors",
                  }}
                  onValueChange={(themeId) => {
                    if (!themeId) return;
                    const id = themeId as ThemeId;
                    if (id !== "custom" && id in THEME_PRESETS) {
                      patch({
                        themeId: id,
                        customColors: {
                          ...THEME_PRESETS[id as Exclude<ThemeId, "custom">]
                            .colors,
                        },
                      });
                    } else {
                      patch({ themeId: id });
                    }
                  }}
                >
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(THEME_PRESETS).map(([id, theme]) => (
                      <SelectItem key={id} value={id}>
                        {theme.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom colors</SelectItem>
                  </SelectContent>
                </Select>
                {config.themeId !== "custom" && (
                  <p className="text-[0.7rem] text-muted-foreground">
                    {THEME_PRESETS[config.themeId].description}
                  </p>
                )}
              </div>

              <div className="space-y-3 rounded-xl border border-border p-3">
                <p className="text-xs font-medium tracking-wide uppercase">
                  Colors
                </p>
                <ColorField
                  label="Housing"
                  value={config.customColors.housing}
                  onChange={(v) => patchColor("housing", v)}
                />
                <ColorField
                  label="Flap face"
                  value={config.customColors.flap}
                  onChange={(v) => patchColor("flap", v)}
                />
                <ColorField
                  label="Empty flap"
                  value={config.customColors.blank}
                  onChange={(v) => patchColor("blank", v)}
                />
                <ColorField
                  label="Lettering"
                  value={config.customColors.text}
                  onChange={(v) => patchColor("text", v)}
                />
                <ColorField
                  label="Accent"
                  value={config.customColors.accent}
                  onChange={(v) => patchColor("accent", v)}
                />
                <ColorField
                  label="Room"
                  value={config.customColors.room}
                  onChange={(v) => patchColor("room", v)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Align</Label>
                  <Select
                    value={config.align}
                    items={{
                      left: "Left",
                      center: "Center",
                      right: "Right",
                    }}
                    onValueChange={(align) => {
                      if (!align) return;
                      patch({ align: align as AlignMode });
                    }}
                  >
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Charset</Label>
                  <Select
                    value={config.charset}
                    items={{
                      full: "Full",
                      alphanumeric: "A–Z 0–9",
                      letters: "Letters",
                      numeric: "Numeric",
                    }}
                    onValueChange={(charset) => {
                      if (!charset) return;
                      patch({ charset: charset as CharsetId });
                    }}
                  >
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full</SelectItem>
                      <SelectItem value="alphanumeric">A–Z 0–9</SelectItem>
                      <SelectItem value="letters">Letters</SelectItem>
                      <SelectItem value="numeric">Numeric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Scale</Label>
                  <span className="font-mono text-xs text-muted-foreground">
                    {config.scale.toFixed(2)}×
                  </span>
                </div>
                <Slider
                  min={0.55}
                  max={1.45}
                  step={0.05}
                  value={[config.scale]}
                  onValueChange={(v) =>
                    patch({ scale: sliderValue(v, config.scale) })
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Flap gap</Label>
                  <span className="font-mono text-xs text-muted-foreground">
                    {config.flapGap}px
                  </span>
                </div>
                <Slider
                  min={0}
                  max={12}
                  step={1}
                  value={[config.flapGap]}
                  onValueChange={(v) =>
                    patch({ flapGap: sliderValue(v, config.flapGap) })
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Brightness</Label>
                  <span className="font-mono text-xs text-muted-foreground">
                    {Math.round(config.brightness * 100)}%
                  </span>
                </div>
                <Slider
                  min={0.55}
                  max={1.25}
                  step={0.05}
                  value={[config.brightness]}
                  onValueChange={(v) =>
                    patch({ brightness: sliderValue(v, config.brightness) })
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <Label className="text-xs">Force uppercase</Label>
                <Switch
                  checked={config.uppercase}
                  onCheckedChange={(uppercase) => patch({ uppercase })}
                />
              </div>
            </TabsContent>

            <TabsContent value="ops" className="mt-0 space-y-4 py-4">
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div>
                  <Label className="text-xs">Show headers / labels</Label>
                  <p className="text-[0.7rem] text-muted-foreground">
                    Row labels and subtitle
                  </p>
                </div>
                <Switch
                  checked={config.showHeaders}
                  onCheckedChange={(showHeaders) => patch({ showHeaders })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <Label className="text-xs">Show clock</Label>
                <Switch
                  checked={config.showClock}
                  onCheckedChange={(showClock) => patch({ showClock })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div>
                  <Label className="text-xs">Flap sound</Label>
                  <p className="text-[0.7rem] text-muted-foreground">
                    Soft mechanical click
                  </p>
                </div>
                <Switch
                  checked={config.soundEnabled}
                  onCheckedChange={(soundEnabled) => patch({ soundEnabled })}
                />
              </div>

              {config.soundEnabled && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Volume</Label>
                    <span className="font-mono text-xs text-muted-foreground">
                      {Math.round(config.soundVolume * 100)}%
                    </span>
                  </div>
                  <Slider
                    min={0.05}
                    max={1}
                    step={0.05}
                    value={[config.soundVolume]}
                    onValueChange={(v) =>
                      patch({ soundVolume: sliderValue(v, config.soundVolume) })
                    }
                  />
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <p className="text-xs font-medium tracking-wide uppercase">
                  Export to your site
                </p>
                <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
                  Ship this board as a React component or as plain HTML, CSS,
                  and JS — ready to embed anywhere.
                </p>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => setSiteExportOpen(true)}
                >
                  <Code2 data-icon="inline-start" />
                  Export for your site
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-xs font-medium tracking-wide uppercase">
                  Config transfer
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleExport}
                  >
                    <Download data-icon="inline-start" />
                    Export
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileRef.current?.click()}
                  >
                    <Upload data-icon="inline-start" />
                    Import
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                  >
                    <Copy data-icon="inline-start" />
                    {copied ? "Copied" : "Copy JSON"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onChange(createDefaultConfig())}
                  >
                    <RotateCcw data-icon="inline-start" />
                    Reset
                  </Button>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleImportFile(file);
                    e.target.value = "";
                  }}
                />
                {importError && (
                  <p className="text-xs text-destructive">{importError}</p>
                )}
              </div>

              <div className="rounded-lg border border-dashed border-border px-3 py-3 text-[0.7rem] leading-relaxed text-muted-foreground">
                Tip: keep playlists short and readable. Real boards favor 8–18
                columns and a hold time long enough to finish reading before the
                next flip.
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>

      <SiteExportPanel
        open={siteExportOpen}
        onOpenChange={setSiteExportOpen}
        config={config}
      />
    </>
  );
}
