(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/flap/FlapApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlapApp",
    ()=>FlapApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flap/defaults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flap/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$flap$2f$FlapBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/flap/FlapBoard.tsx [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const SettingsPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/flap/SettingsPanel.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>({
            default: mod.SettingsPanel
        })), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/flap/SettingsPanel.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = SettingsPanel;
function indexesFor(config) {
    return Object.fromEntries(config.rows.map((row)=>[
            row.id,
            0
        ]));
}
function FlapApp() {
    _s();
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultConfig"]);
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paused, setPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeIndexes, setActiveIndexes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "FlapApp.useState": ()=>indexesFor((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultConfig"])())
    }["FlapApp.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlapApp.useEffect": ()=>{
            const loaded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadConfig"])();
            setConfig(loaded);
            setActiveIndexes(indexesFor(loaded));
            setReady(true);
        }
    }["FlapApp.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlapApp.useEffect": ()=>{
            if (!ready) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveConfig"])(config);
        }
    }["FlapApp.useEffect"], [
        config,
        ready
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlapApp.useEffect": ()=>{
            setActiveIndexes({
                "FlapApp.useEffect": (prev)=>{
                    const next = {};
                    for (const row of config.rows){
                        next[row.id] = prev[row.id] ?? 0;
                    }
                    return next;
                }
            }["FlapApp.useEffect"]);
        }
    }["FlapApp.useEffect"], [
        config.rows
    ]);
    const maxColumnsInRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlapApp.useMemo[maxColumnsInRow]": ()=>{
            const enabled = config.rows.filter({
                "FlapApp.useMemo[maxColumnsInRow].enabled": (r)=>r.enabled
            }["FlapApp.useMemo[maxColumnsInRow].enabled"]);
            if (enabled.length === 0) return 1;
            return Math.max(1, ...enabled.map({
                "FlapApp.useMemo[maxColumnsInRow]": (r)=>r.columns
            }["FlapApp.useMemo[maxColumnsInRow]"]));
        }
    }["FlapApp.useMemo[maxColumnsInRow]"], [
        config.rows
    ]);
    const flipSettleMs = config.flipDurationMs + config.staggerMs * Math.max(0, maxColumnsInRow - 1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlapApp.useEffect": ()=>{
            if (!ready || paused || !config.autoRotate) return;
            const tickMs = Math.max(500, config.holdDurationMs + config.changeGapMs + flipSettleMs);
            const id = window.setInterval({
                "FlapApp.useEffect.id": ()=>{
                    setActiveIndexes({
                        "FlapApp.useEffect.id": (prev)=>{
                            const next = {
                                ...prev
                            };
                            for (const row of config.rows){
                                if (!row.enabled || row.messages.length <= 1) continue;
                                const cur = prev[row.id] ?? 0;
                                next[row.id] = (cur + 1) % row.messages.length;
                            }
                            return next;
                        }
                    }["FlapApp.useEffect.id"]);
                }
            }["FlapApp.useEffect.id"], tickMs);
            return ({
                "FlapApp.useEffect": ()=>window.clearInterval(id)
            })["FlapApp.useEffect"];
        }
    }["FlapApp.useEffect"], [
        ready,
        paused,
        config.autoRotate,
        config.holdDurationMs,
        config.changeGapMs,
        config.rows,
        flipSettleMs
    ]);
    const advance = ()=>{
        setActiveIndexes((prev)=>{
            const next = {
                ...prev
            };
            for (const row of config.rows){
                if (!row.enabled || row.messages.length === 0) continue;
                const cur = prev[row.id] ?? 0;
                next[row.id] = (cur + 1) % row.messages.length;
            }
            return next;
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$flap$2f$FlapBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlapBoard"], {
                config: config,
                paused: paused,
                activeIndexes: activeIndexes,
                onOpenSettings: ()=>setSettingsOpen(true),
                onTogglePause: ()=>setPaused((p)=>!p),
                onAdvance: advance
            }, void 0, false, {
                fileName: "[project]/src/components/flap/FlapApp.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsPanel, {
                open: settingsOpen,
                onOpenChange: setSettingsOpen,
                config: config,
                onChange: setConfig
            }, void 0, false, {
                fileName: "[project]/src/components/flap/FlapApp.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/flap/FlapApp.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(FlapApp, "2/JaBIbsoQL0I/fQEYqN4wh4l+g=");
_c1 = FlapApp;
var _c, _c1;
__turbopack_context__.k.register(_c, "SettingsPanel");
__turbopack_context__.k.register(_c1, "FlapApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/flap/FlapBoard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlapBoard",
    ()=>FlapBoard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.mjs [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings-2.mjs [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skip$2d$forward$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SkipForward$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/skip-forward.mjs [app-client] (ecmascript) <export default as SkipForward>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flap/themes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$flap$2f$FlapRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/flap/FlapRow.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function useClock(enabled) {
    _s();
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useClock.useEffect": ()=>{
            if (!enabled) {
                setNow(null);
                return;
            }
            setNow(new Date());
            const id = window.setInterval({
                "useClock.useEffect.id": ()=>setNow(new Date())
            }["useClock.useEffect.id"], 1000);
            return ({
                "useClock.useEffect": ()=>window.clearInterval(id)
            })["useClock.useEffect"];
        }
    }["useClock.useEffect"], [
        enabled
    ]);
    return now;
}
_s(useClock, "z7BF03mi9TSA+mHelO7IwQHRwX4=");
function FlapBoard({ config, onOpenSettings, onTogglePause, onAdvance, paused, activeIndexes }) {
    _s1();
    const colors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveColors"])(config.themeId, config.customColors);
    const now = useClock(config.showClock);
    const rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FlapBoard.useMemo[rows]": ()=>config.rows.filter({
                "FlapBoard.useMemo[rows]": (r)=>r.enabled
            }["FlapBoard.useMemo[rows]"])
    }["FlapBoard.useMemo[rows]"], [
        config.rows
    ]);
    const clockText = now === null ? "--:--" : now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flap-room flex flex-1 flex-col",
        style: {
            ["--flap-housing"]: colors.housing,
            ["--flap-housing-edge"]: colors.housingEdge,
            ["--flap-face"]: colors.flap,
            ["--flap-edge"]: colors.flapEdge,
            ["--flap-blank"]: colors.blank,
            ["--flap-blank-edge"]: colors.blankEdge,
            ["--flap-text"]: colors.text,
            ["--flap-label"]: colors.label,
            ["--flap-accent"]: colors.accent,
            ["--flap-room"]: colors.room,
            ["--flap-glow"]: colors.roomGlow,
            ["--flap-w"]: `${1.85 * config.scale}rem`,
            ["--flap-h"]: `${2.55 * config.scale}rem`,
            filter: `brightness(${config.brightness})`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flap-fade-in relative z-10 flex items-end justify-between gap-4 px-5 pt-6 sm:px-10 sm:pt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flap-brand text-[0.75rem] sm:text-[0.8rem]",
                                children: config.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            config.showHeaders && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1.5 text-[0.62rem] tracking-[0.2em] text-[color:var(--flap-label)] uppercase opacity-65",
                                children: "Split-flap display"
                            }, void 0, false, {
                                fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/flap/FlapBoard.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            config.showClock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mr-2 hidden tabular-nums tracking-[0.18em] text-[color:var(--flap-label)] sm:block sm:text-sm",
                                children: clockText
                            }, void 0, false, {
                                fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "ghost",
                                size: "icon",
                                onClick: onTogglePause,
                                "aria-label": paused ? "Resume rotation" : "Pause rotation",
                                className: "flap-chrome-btn text-[color:var(--flap-label)] hover:bg-white/5 hover:text-[color:var(--flap-accent)]",
                                children: paused ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {}, void 0, false, {
                                    fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                    lineNumber: 102,
                                    columnNumber: 23
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {}, void 0, false, {
                                    fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                    lineNumber: 102,
                                    columnNumber: 34
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "ghost",
                                size: "icon",
                                onClick: onAdvance,
                                "aria-label": "Advance messages",
                                className: "flap-chrome-btn text-[color:var(--flap-label)] hover:bg-white/5 hover:text-[color:var(--flap-accent)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skip$2d$forward$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SkipForward$3e$__["SkipForward"], {}, void 0, false, {
                                    fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "outline",
                                size: "icon",
                                onClick: onOpenSettings,
                                "aria-label": "Open board settings",
                                className: "flap-settings-btn flap-chrome-btn text-[color:var(--flap-label)] hover:text-[color:var(--flap-accent)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {}, void 0, false, {
                                    fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/flap/FlapBoard.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/flap/FlapBoard.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flap-fade-in relative z-10 flex flex-1 items-center justify-center px-3 py-6 sm:px-8 sm:py-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flap-housing w-full max-w-[58rem]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flap-housing-inner",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flap-rows",
                            children: rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "py-8 text-center text-sm tracking-wide text-[color:var(--flap-label)]",
                                children: "No active rows. Open settings to add a line."
                            }, void 0, false, {
                                fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                lineNumber: 132,
                                columnNumber: 17
                            }, this) : rows.map((row, rowIndex)=>{
                                const idx = activeIndexes[row.id] ?? 0;
                                const message = row.messages[idx % Math.max(row.messages.length, 1)] ?? "";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flap-fade-in",
                                    style: {
                                        animationDelay: `${rowIndex * 55}ms`
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$flap$2f$FlapRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlapRow"], {
                                        label: row.label,
                                        showLabel: row.showLabel && config.showHeaders,
                                        message: message,
                                        columns: row.columns,
                                        align: config.align,
                                        charset: config.charset,
                                        uppercase: config.uppercase,
                                        padChar: config.padChar,
                                        flipDurationMs: config.flipDurationMs,
                                        staggerMs: config.staggerMs,
                                        flapGap: config.flapGap,
                                        soundEnabled: config.soundEnabled,
                                        soundVolume: config.soundVolume,
                                        scale: config.scale
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                        lineNumber: 146,
                                        columnNumber: 23
                                    }, this)
                                }, row.id, false, {
                                    fileName: "[project]/src/components/flap/FlapBoard.tsx",
                                    lineNumber: 141,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/flap/FlapBoard.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/flap/FlapBoard.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/flap/FlapBoard.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/flap/FlapBoard.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "flap-fade-in relative z-10 flex items-center justify-center gap-2 px-5 pb-6 text-[0.6rem] tracking-[0.2em] text-[color:var(--flap-label)] uppercase opacity-55 sm:px-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flap-live-dot",
                        "data-paused": paused ? "true" : "false",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/src/components/flap/FlapBoard.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            paused ? "Paused" : "Live",
                            " · ",
                            rows.length,
                            " rows"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/flap/FlapBoard.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/flap/FlapBoard.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/flap/FlapBoard.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s1(FlapBoard, "QWYwwBTPOeO9qQYNJWMjUiK2Omg=", false, function() {
    return [
        useClock
    ];
});
_c = FlapBoard;
var _c;
__turbopack_context__.k.register(_c, "FlapBoard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/flap/FlapChar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlapChar",
    ()=>FlapChar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flap/sound.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function glyph(char) {
    return char === " " ? "\u00A0" : char;
}
function prefersReducedMotion() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function FlapChar({ value, flipDurationMs, delayMs = 0, soundEnabled = false, soundVolume = 0.35 }) {
    _s();
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const [from, setFrom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const [to, setTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const [flipping, setFlipping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [animKey, setAnimKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const queueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const busyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const timers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const currentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(current);
    const soundRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        soundEnabled,
        soundVolume,
        flipDurationMs
    });
    currentRef.current = current;
    soundRef.current = {
        soundEnabled,
        soundVolume,
        flipDurationMs
    };
    const clearTimers = ()=>{
        timers.current.forEach((id)=>window.clearTimeout(id));
        timers.current = [];
    };
    const drainRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        "FlapChar.useRef[drainRef]": ()=>undefined
    }["FlapChar.useRef[drainRef]"]);
    const startFlip = (next)=>{
        if (next === currentRef.current) {
            busyRef.current = false;
            drainRef.current();
            return;
        }
        if (prefersReducedMotion()) {
            setCurrent(next);
            currentRef.current = next;
            setFrom(next);
            setTo(next);
            setFlipping(false);
            busyRef.current = false;
            drainRef.current();
            return;
        }
        busyRef.current = true;
        setFrom(currentRef.current);
        setTo(next);
        setFlipping(true);
        setAnimKey((k)=>k + 1);
        if (soundRef.current.soundEnabled) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playFlapClick"])(soundRef.current.soundVolume);
        }
        const done = window.setTimeout(()=>{
            setCurrent(next);
            currentRef.current = next;
            setFlipping(false);
            busyRef.current = false;
            drainRef.current();
        }, soundRef.current.flipDurationMs);
        timers.current.push(done);
    };
    drainRef.current = ()=>{
        if (busyRef.current) return;
        const next = queueRef.current.shift();
        if (next === undefined) return;
        const latest = queueRef.current.length ? queueRef.current[queueRef.current.length - 1] : next;
        queueRef.current = [];
        if (latest === currentRef.current) return;
        startFlip(latest);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlapChar.useEffect": ()=>{
            return ({
                "FlapChar.useEffect": ()=>clearTimers()
            })["FlapChar.useEffect"];
        }
    }["FlapChar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlapChar.useEffect": ()=>{
            if (value === currentRef.current && !busyRef.current) return;
            const id = window.setTimeout({
                "FlapChar.useEffect.id": ()=>{
                    if (busyRef.current) {
                        queueRef.current = [
                            value
                        ];
                        return;
                    }
                    startFlip(value);
                }
            }["FlapChar.useEffect.id"], delayMs);
            timers.current.push(id);
            return ({
                "FlapChar.useEffect": ()=>{
                    window.clearTimeout(id);
                }
            })["FlapChar.useEffect"];
        }
    }["FlapChar.useEffect"], [
        value,
        delayMs
    ]);
    const blank = current === " " && !flipping;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flap-char",
        "data-blank": blank ? "true" : "false",
        style: {
            ["--flip-ms"]: `${flipDurationMs}ms`
        },
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flap-well",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flap-half top",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: glyph(flipping ? to : current)
                    }, void 0, false, {
                        fileName: "[project]/src/components/flap/FlapChar.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/flap/FlapChar.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flap-half bottom",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: glyph(flipping ? from : current)
                    }, void 0, false, {
                        fileName: "[project]/src/components/flap/FlapChar.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/flap/FlapChar.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flap-hinge",
                    "aria-hidden": true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "flap-pin left"
                        }, void 0, false, {
                            fileName: "[project]/src/components/flap/FlapChar.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "flap-pin right"
                        }, void 0, false, {
                            fileName: "[project]/src/components/flap/FlapChar.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/flap/FlapChar.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this),
                flipping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flap-anim top",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: glyph(from)
                            }, void 0, false, {
                                fileName: "[project]/src/components/flap/FlapChar.tsx",
                                lineNumber: 144,
                                columnNumber: 15
                            }, this)
                        }, `t-${animKey}`, false, {
                            fileName: "[project]/src/components/flap/FlapChar.tsx",
                            lineNumber: 143,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flap-anim bottom",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: glyph(to)
                            }, void 0, false, {
                                fileName: "[project]/src/components/flap/FlapChar.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this)
                        }, `b-${animKey}`, false, {
                            fileName: "[project]/src/components/flap/FlapChar.tsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/flap/FlapChar.tsx",
                    lineNumber: 142,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/flap/FlapChar.tsx",
            lineNumber: 130,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/flap/FlapChar.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_s(FlapChar, "iVUSnbBssbtMDiyb7CjwUDz6yOI=");
_c = FlapChar;
var _c;
__turbopack_context__.k.register(_c, "FlapChar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/flap/FlapRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlapRow",
    ()=>FlapRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$charset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flap/charset.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFillColumns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFillColumns.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$flap$2f$FlapChar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/flap/FlapChar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function FlapRow({ label, showLabel, message, columns, align, charset, uppercase, padChar, flipDurationMs, staggerMs, flapGap, soundEnabled, soundVolume, scale }) {
    _s();
    const tilesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fillColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFillColumns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFillColumns"])(tilesRef, flapGap, `${scale}-${showLabel ? "1" : "0"}`, columns);
    const chars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$charset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["padMessage"])(message, fillColumns, align, padChar, charset, uppercase);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flap-row",
        children: [
            showLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flap-row-label shrink-0 text-right",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/flap/FlapRow.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: tilesRef,
                className: "flap-row-tiles",
                style: {
                    gap: `${flapGap}px`
                },
                role: "text",
                "aria-label": `${label || "row"}: ${message}`,
                children: chars.map((char, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$flap$2f$FlapChar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlapChar"], {
                        value: char,
                        flipDurationMs: flipDurationMs,
                        delayMs: index * staggerMs,
                        soundEnabled: soundEnabled,
                        soundVolume: soundVolume
                    }, `${fillColumns}-${index}`, false, {
                        fileName: "[project]/src/components/flap/FlapRow.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/flap/FlapRow.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/flap/FlapRow.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(FlapRow, "XfMfOe8reF2Gw52f+kOQuIC8QvM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFillColumns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFillColumns"]
    ];
});
_c = FlapRow;
var _c;
__turbopack_context__.k.register(_c, "FlapRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui/react/button/Button.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/cn/dist/index.js [app-client] (ecmascript) <locals>");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            icon: "size-8",
            "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
            "icon-lg": "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useFillColumns.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFillColumns",
    ()=>useFillColumns
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function readFlapWidthPx(fromEl) {
    const room = fromEl.closest(".flap-room") ?? fromEl;
    const raw = getComputedStyle(room).getPropertyValue("--flap-w").trim();
    if (!raw) return 29.6;
    if (raw.endsWith("rem")) {
        const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return parseFloat(raw) * root;
    }
    if (raw.endsWith("px")) return parseFloat(raw);
    return parseFloat(raw) || 29.6;
}
function useFillColumns(ref, flapGap, /** Re-measure when scale / theme sizing changes. */ sizingKey, minColumns) {
    _s();
    const [fit, setFit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(minColumns);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFillColumns.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            const measure = {
                "useFillColumns.useEffect.measure": ()=>{
                    const width = el.clientWidth;
                    if (width <= 0) return;
                    const flapPx = readFlapWidthPx(el);
                    const stride = flapPx + flapGap;
                    if (stride <= 0) return;
                    const next = Math.max(1, Math.floor((width + flapGap) / stride));
                    setFit(next);
                }
            }["useFillColumns.useEffect.measure"];
            measure();
            const ro = new ResizeObserver(measure);
            ro.observe(el);
            window.addEventListener("resize", measure);
            return ({
                "useFillColumns.useEffect": ()=>{
                    ro.disconnect();
                    window.removeEventListener("resize", measure);
                }
            })["useFillColumns.useEffect"];
        }
    }["useFillColumns.useEffect"], [
        ref,
        flapGap,
        sizingKey,
        minColumns
    ]);
    return Math.max(minColumns, fit);
}
_s(useFillColumns, "VxjF9PIFgEn02hc1ZDM/eXYCw18=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/flap/charset.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHARSETS",
    ()=>CHARSETS,
    "flapSteps",
    ()=>flapSteps,
    "normalizeChar",
    ()=>normalizeChar,
    "padMessage",
    ()=>padMessage
]);
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const PUNCT = " .,:-/'\"!?&@#%+*=<>()[]";
const CHARSETS = {
    letters: ` ${LETTERS}`,
    numeric: ` ${DIGITS}`,
    alphanumeric: ` ${LETTERS}${DIGITS}`,
    full: ` ${LETTERS}${DIGITS}${PUNCT}`
};
function normalizeChar(char, charset, uppercase) {
    const raw = uppercase ? char.toUpperCase() : char;
    const set = CHARSETS[charset];
    if (set.includes(raw)) return raw;
    if (raw === "\t") return " ";
    return set.includes("?") ? "?" : " ";
}
function padMessage(message, columns, align, padChar, charset, uppercase) {
    const pad = normalizeChar(padChar || " ", charset, uppercase);
    const chars = Array.from(message).map((c)=>normalizeChar(c, charset, uppercase));
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
function flapSteps(from, to, charset) {
    const set = CHARSETS[charset];
    const a = set.indexOf(from);
    const b = set.indexOf(to);
    if (a < 0 || b < 0 || a === b) return 0;
    return (b - a + set.length) % set.length;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/flap/defaults.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STORAGE_KEY",
    ()=>STORAGE_KEY,
    "createDefaultConfig",
    ()=>createDefaultConfig,
    "createDefaultRows",
    ()=>createDefaultRows
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flap/themes.ts [app-client] (ecmascript)");
;
function row(partial) {
    return {
        id: partial.id ?? crypto.randomUUID(),
        label: partial.label,
        showLabel: partial.showLabel,
        messages: partial.messages,
        columns: partial.columns,
        enabled: partial.enabled
    };
}
function createDefaultRows() {
    return [
        row({
            id: "row-1",
            label: "",
            showLabel: false,
            messages: [
                "BARS   STADIUMS   HOTELS",
                "FLAP SIGN   NOW LIVE"
            ],
            columns: 24,
            enabled: true
        }),
        row({
            id: "row-2",
            label: "",
            showLabel: false,
            messages: [
                "AIRPORTS   RETAIL   CAFES",
                "GATE OPEN   ALL CLEAR"
            ],
            columns: 24,
            enabled: true
        }),
        row({
            id: "row-3",
            label: "",
            showLabel: false,
            messages: [
                "EXPERIENTIAL MARKETING",
                "OPERATOR READY"
            ],
            columns: 24,
            enabled: true
        }),
        row({
            id: "row-4",
            label: "",
            showLabel: false,
            messages: [
                "LOBBIES   TRAIN STATIONS",
                "PLATFORM A   MAIN HALL"
            ],
            columns: 24,
            enabled: true
        }),
        row({
            id: "row-5",
            label: "",
            showLabel: false,
            messages: [
                "EDUCATION   CRUISE SHIPS",
                "BOARDING   ON TIME"
            ],
            columns: 24,
            enabled: true
        }),
        row({
            id: "row-6",
            label: "",
            showLabel: false,
            messages: [
                "RESTAURANTS   OFFICES",
                "HOME BASE   NOW BOARDING"
            ],
            columns: 24,
            enabled: true
        }),
        row({
            id: "row-7",
            label: "",
            showLabel: false,
            messages: [
                "TRANSPORTATION   CASINOS",
                "EDIT IN SETTINGS"
            ],
            columns: 24,
            enabled: true
        })
    ];
}
function createDefaultConfig() {
    return {
        title: "FLAP",
        rows: createDefaultRows(),
        flipDurationMs: 160,
        staggerMs: 28,
        holdDurationMs: 4200,
        changeGapMs: 350,
        themeId: "solari",
        customColors: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$themes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEME_PRESETS"].solari.colors
        },
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
        padChar: " "
    };
}
const STORAGE_KEY = "flap-sign-config-v3";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/flap/sound.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "playFlapClick",
    ()=>playFlapClick
]);
let ctx = null;
function getCtx() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
    }
    return ctx;
}
function playFlapClick(volume) {
    const audio = getCtx();
    if (!audio || volume <= 0) return;
    if (audio.state === "suspended") {
        void audio.resume();
    }
    const now = audio.currentTime;
    const gain = audio.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.min(0.4, volume) * 0.08, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
    gain.connect(audio.destination);
    const osc = audio.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(180 + Math.random() * 80, now);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.045);
    const noise = audio.createBufferSource();
    const buffer = audio.createBuffer(1, audio.sampleRate * 0.02, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for(let i = 0; i < data.length; i++){
        data[i] = (Math.random() * 2 - 1) * 0.35;
    }
    noise.buffer = buffer;
    const nGain = audio.createGain();
    nGain.gain.setValueAtTime(volume * 0.05, now);
    nGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
    noise.connect(nGain);
    nGain.connect(audio.destination);
    noise.start(now);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/flap/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exportConfig",
    ()=>exportConfig,
    "importConfig",
    ()=>importConfig,
    "loadConfig",
    ()=>loadConfig,
    "saveConfig",
    ()=>saveConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flap/defaults.ts [app-client] (ecmascript)");
;
;
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function loadConfig() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"]);
        if (!raw) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultConfig"])();
        const parsed = JSON.parse(raw);
        if (!isObject(parsed) || !Array.isArray(parsed.rows)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultConfig"])();
        }
        const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultConfig"])();
        return {
            ...base,
            ...parsed,
            rows: parsed.rows,
            customColors: {
                ...base.customColors,
                ...isObject(parsed.customColors) ? parsed.customColors : {}
            }
        };
    } catch  {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultConfig"])();
    }
}
function saveConfig(config) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"], JSON.stringify(config));
}
function exportConfig(config) {
    return JSON.stringify(config, null, 2);
}
function importConfig(json) {
    const parsed = JSON.parse(json);
    if (!isObject(parsed) || !Array.isArray(parsed.rows)) {
        throw new Error("Invalid board config");
    }
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flap$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultConfig"])();
    return {
        ...base,
        ...parsed,
        rows: parsed.rows,
        customColors: {
            ...base.customColors,
            ...isObject(parsed.customColors) ? parsed.customColors : {}
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/flap/themes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "THEME_PRESETS",
    ()=>THEME_PRESETS,
    "resolveColors",
    ()=>resolveColors
]);
const THEME_PRESETS = {
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
            roomGlow: "rgba(255, 255, 255, 0.03)"
        }
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
            roomGlow: "rgba(200, 210, 230, 0.04)"
        }
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
            roomGlow: "rgba(224, 180, 86, 0.05)"
        }
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
            roomGlow: "rgba(58, 168, 122, 0.05)"
        }
    }
};
function resolveColors(themeId, custom) {
    if (themeId === "custom") return custom;
    return THEME_PRESETS[themeId].colors;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0jce3b-._.js.map