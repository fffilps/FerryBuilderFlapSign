"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { createDefaultConfig } from "@/lib/flap/defaults";
import { loadConfig, saveConfig } from "@/lib/flap/storage";
import type { FlapBoardConfig } from "@/lib/flap/types";
import { FlapBoard } from "./FlapBoard";
import "./flap.css";

const SettingsPanel = dynamic(
  () =>
    import("./SettingsPanel").then((mod) => ({ default: mod.SettingsPanel })),
  { ssr: false },
);

function indexesFor(config: FlapBoardConfig): Record<string, number> {
  return Object.fromEntries(config.rows.map((row) => [row.id, 0]));
}

export function FlapApp() {
  const [config, setConfig] = useState<FlapBoardConfig>(createDefaultConfig);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    () => indexesFor(createDefaultConfig()),
  );

  useEffect(() => {
    const loaded = loadConfig();
    setConfig(loaded);
    setActiveIndexes(indexesFor(loaded));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveConfig(config);
  }, [config, ready]);

  useEffect(() => {
    setActiveIndexes((prev) => {
      const next: Record<string, number> = {};
      for (const row of config.rows) {
        next[row.id] = prev[row.id] ?? 0;
      }
      return next;
    });
  }, [config.rows]);

  const maxColumnsInRow = useMemo(() => {
    const enabled = config.rows.filter((r) => r.enabled);
    if (enabled.length === 0) return 1;
    return Math.max(1, ...enabled.map((r) => r.columns));
  }, [config.rows]);

  const flipSettleMs =
    config.flipDurationMs + config.staggerMs * Math.max(0, maxColumnsInRow - 1);

  useEffect(() => {
    if (!ready || paused || !config.autoRotate) return;

    const tickMs = Math.max(
      500,
      config.holdDurationMs + config.changeGapMs + flipSettleMs,
    );
    const id = window.setInterval(() => {
      setActiveIndexes((prev) => {
        const next = { ...prev };
        for (const row of config.rows) {
          if (!row.enabled || row.messages.length <= 1) continue;
          const cur = prev[row.id] ?? 0;
          next[row.id] = (cur + 1) % row.messages.length;
        }
        return next;
      });
    }, tickMs);

    return () => window.clearInterval(id);
  }, [
    ready,
    paused,
    config.autoRotate,
    config.holdDurationMs,
    config.changeGapMs,
    config.rows,
    flipSettleMs,
  ]);

  const advance = () => {
    setActiveIndexes((prev) => {
      const next = { ...prev };
      for (const row of config.rows) {
        if (!row.enabled || row.messages.length === 0) continue;
        const cur = prev[row.id] ?? 0;
        next[row.id] = (cur + 1) % row.messages.length;
      }
      return next;
    });
  };

  return (
    <>
      <FlapBoard
        config={config}
        paused={paused}
        activeIndexes={activeIndexes}
        onOpenSettings={() => setSettingsOpen(true)}
        onTogglePause={() => setPaused((p) => !p)}
        onAdvance={advance}
      />
      <SettingsPanel
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        config={config}
        onChange={setConfig}
      />
    </>
  );
}
