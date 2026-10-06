import type { FlapBoardConfig } from "../types";
import { getStandaloneCss, serializeExportConfig } from "./types";
import type { SiteExportBundle } from "./types";

/** Shared board runtime used by the HTML/JS export. */
function generateFlapRuntimeJs(configJson: string): string {
  return `/**
 * FlapSign — vanilla runtime
 * Drop this next to flap-sign.css and call FlapSign.mount("#root")
 */
(function (global) {
  "use strict";

  var CONFIG = ${configJson};

  var CHARSETS = {
    letters: " ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numeric: " 0123456789",
    alphanumeric: " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    full: " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,:-/'\\"!?&@#%+*=<>()[]",
  };

  function normalizeChar(char, charset, uppercase) {
    var raw = uppercase ? String(char).toUpperCase() : String(char);
    var set = CHARSETS[charset] || CHARSETS.full;
    if (set.indexOf(raw) !== -1) return raw;
    if (raw === "\\t") return " ";
    return set.indexOf("?") !== -1 ? "?" : " ";
  }

  function padMessage(message, columns, align, padChar, charset, uppercase) {
    var pad = normalizeChar(padChar || " ", charset, uppercase);
    var chars = Array.from(String(message)).map(function (c) {
      return normalizeChar(c, charset, uppercase);
    });
    var clipped = chars.slice(0, columns);
    var missing = columns - clipped.length;
    if (missing <= 0) return clipped;
    var filler = [];
    for (var i = 0; i < missing; i++) filler.push(pad);
    if (align === "right") return filler.concat(clipped);
    if (align === "center") {
      var left = Math.floor(missing / 2);
      return filler.slice(0, left).concat(clipped, filler.slice(left));
    }
    return clipped.concat(filler);
  }

  function glyph(char) {
    return char === " " ? "\\u00A0" : char;
  }

  function prefersReducedMotion() {
    return (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  var audioCtx = null;
  function playFlapClick(volume) {
    if (!volume || typeof window === "undefined") return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === "suspended") audioCtx.resume();
      var now = audioCtx.currentTime;
      var gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(Math.min(0.4, volume) * 0.08, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      gain.connect(audioCtx.destination);
      var osc = audioCtx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180 + Math.random() * 80, now);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch (e) {
      /* ignore audio errors */
    }
  }

  function readFlapWidthPx(fromEl) {
    var room = fromEl.closest(".flap-room") || fromEl;
    var raw = getComputedStyle(room).getPropertyValue("--flap-w").trim();
    if (!raw) return 29.6;
    if (raw.slice(-3) === "rem") {
      var root = parseFloat(getComputedStyle(document.documentElement).fontSize);
      return parseFloat(raw) * root;
    }
    if (raw.slice(-2) === "px") return parseFloat(raw);
    return parseFloat(raw) || 29.6;
  }

  function measureFillColumns(el, flapGap, minColumns) {
    var width = el.clientWidth;
    if (width <= 0) return minColumns;
    var flapPx = readFlapWidthPx(el);
    var stride = flapPx + flapGap;
    if (stride <= 0) return minColumns;
    return Math.max(minColumns, Math.max(1, Math.floor((width + flapGap) / stride)));
  }

  function createChar(value, flipDurationMs, delayMs, soundEnabled, soundVolume) {
    var root = document.createElement("div");
    root.className = "flap-char";
    root.setAttribute("aria-hidden", "true");
    root.style.setProperty("--flip-ms", flipDurationMs + "ms");

    var well = document.createElement("div");
    well.className = "flap-well";

    var top = document.createElement("div");
    top.className = "flap-half top";
    var topSpan = document.createElement("span");
    topSpan.textContent = glyph(value);
    top.appendChild(topSpan);

    var bottom = document.createElement("div");
    bottom.className = "flap-half bottom";
    var bottomSpan = document.createElement("span");
    bottomSpan.textContent = glyph(value);
    bottom.appendChild(bottomSpan);

    var hinge = document.createElement("div");
    hinge.className = "flap-hinge";
    hinge.setAttribute("aria-hidden", "true");
    hinge.innerHTML = '<i class="flap-pin left"></i><i class="flap-pin right"></i>';

    well.appendChild(top);
    well.appendChild(bottom);
    well.appendChild(hinge);
    root.appendChild(well);

    var current = value;
    var busy = false;
    var queue = [];
    var timers = [];
    var animKey = 0;

    function clearTimers() {
      timers.forEach(function (id) {
        clearTimeout(id);
      });
      timers = [];
    }

    function setBlank() {
      root.setAttribute("data-blank", current === " " && !busy ? "true" : "false");
    }

    function startFlip(next) {
      if (next === current) {
        busy = false;
        drain();
        return;
      }
      if (prefersReducedMotion()) {
        current = next;
        topSpan.textContent = glyph(current);
        bottomSpan.textContent = glyph(current);
        busy = false;
        setBlank();
        drain();
        return;
      }

      busy = true;
      setBlank();
      var from = current;
      var to = next;
      animKey += 1;
      topSpan.textContent = glyph(to);
      bottomSpan.textContent = glyph(from);

      var oldAnims = well.querySelectorAll(".flap-anim");
      oldAnims.forEach(function (n) {
        n.remove();
      });

      var animTop = document.createElement("div");
      animTop.className = "flap-anim top";
      animTop.innerHTML = "<span></span>";
      animTop.querySelector("span").textContent = glyph(from);

      var animBottom = document.createElement("div");
      animBottom.className = "flap-anim bottom";
      animBottom.innerHTML = "<span></span>";
      animBottom.querySelector("span").textContent = glyph(to);

      well.appendChild(animTop);
      well.appendChild(animBottom);

      if (soundEnabled) playFlapClick(soundVolume);

      var done = setTimeout(function () {
        current = next;
        topSpan.textContent = glyph(current);
        bottomSpan.textContent = glyph(current);
        animTop.remove();
        animBottom.remove();
        busy = false;
        setBlank();
        drain();
      }, flipDurationMs);
      timers.push(done);
    }

    function drain() {
      if (busy) return;
      if (!queue.length) return;
      var latest = queue[queue.length - 1];
      queue = [];
      if (latest === current) return;
      startFlip(latest);
    }

    function setValue(next) {
      var id = setTimeout(function () {
        if (busy) {
          queue = [next];
          return;
        }
        startFlip(next);
      }, delayMs);
      timers.push(id);
    }

    setBlank();

    return {
      el: root,
      setValue: setValue,
      destroy: clearTimers,
    };
  }

  function createRow(row, config, message) {
    var wrap = document.createElement("div");
    wrap.className = "flap-row";

    var showLabel = row.showLabel && config.showHeaders;
    if (showLabel) {
      var label = document.createElement("div");
      label.className = "flap-row-label";
      label.textContent = row.label;
      wrap.appendChild(label);
    }

    var tiles = document.createElement("div");
    tiles.className = "flap-row-tiles";
    tiles.style.gap = config.flapGap + "px";
    tiles.setAttribute("role", "text");
    tiles.setAttribute(
      "aria-label",
      (row.label || "row") + ": " + message
    );
    wrap.appendChild(tiles);

    var chars = [];
    var fillColumns = row.columns;

    function render(msg) {
      chars.forEach(function (c) {
        c.destroy();
      });
      tiles.innerHTML = "";
      chars = [];
      fillColumns = measureFillColumns(tiles, config.flapGap, row.columns);
      var values = padMessage(
        msg,
        fillColumns,
        config.align,
        config.padChar,
        config.charset,
        config.uppercase
      );
      values.forEach(function (ch, index) {
        var cell = createChar(
          ch,
          config.flipDurationMs,
          index * config.staggerMs,
          config.soundEnabled,
          config.soundVolume
        );
        chars.push(cell);
        tiles.appendChild(cell.el);
      });
    }

    function update(msg) {
      fillColumns = measureFillColumns(tiles, config.flapGap, row.columns);
      var values = padMessage(
        msg,
        fillColumns,
        config.align,
        config.padChar,
        config.charset,
        config.uppercase
      );
      if (values.length !== chars.length) {
        render(msg);
        return;
      }
      tiles.setAttribute(
        "aria-label",
        (row.label || "row") + ": " + msg
      );
      values.forEach(function (ch, index) {
        chars[index].setValue(ch);
      });
    }

    render(message);

    return {
      el: wrap,
      tiles: tiles,
      update: update,
      remasure: function (msg) {
        update(msg);
      },
    };
  }

  function applyTheme(room, config) {
    var c = config.colors;
    room.style.setProperty("--flap-housing", c.housing);
    room.style.setProperty("--flap-housing-edge", c.housingEdge);
    room.style.setProperty("--flap-face", c.flap);
    room.style.setProperty("--flap-edge", c.flapEdge);
    room.style.setProperty("--flap-blank", c.blank);
    room.style.setProperty("--flap-blank-edge", c.blankEdge);
    room.style.setProperty("--flap-text", c.text);
    room.style.setProperty("--flap-label", c.label);
    room.style.setProperty("--flap-accent", c.accent);
    room.style.setProperty("--flap-room", c.room);
    room.style.setProperty("--flap-glow", c.roomGlow);
    room.style.setProperty("--flap-w", 1.85 * config.scale + "rem");
    room.style.setProperty("--flap-h", 2.55 * config.scale + "rem");
    room.style.filter = "brightness(" + config.brightness + ")";
  }

  function mount(target, userConfig) {
    var config = Object.assign({}, CONFIG, userConfig || {});
    var el =
      typeof target === "string" ? document.querySelector(target) : target;
    if (!el) throw new Error("FlapSign: mount target not found");

    var enabledRows = config.rows.filter(function (r) {
      return r.enabled;
    });
    var activeIndexes = {};
    enabledRows.forEach(function (r) {
      activeIndexes[r.id] = 0;
    });

    var room = document.createElement("div");
    room.className = "flap-room";
    applyTheme(room, config);

    var header = document.createElement("header");
    header.className = "flap-header flap-fade-in";
    var brandWrap = document.createElement("div");
    var brand = document.createElement("p");
    brand.className = "flap-brand";
    brand.textContent = config.title;
    brandWrap.appendChild(brand);
    if (config.showHeaders) {
      var sub = document.createElement("p");
      sub.className = "flap-subtitle";
      sub.textContent = "Split-flap display";
      brandWrap.appendChild(sub);
    }
    header.appendChild(brandWrap);

    var clockEl = null;
    if (config.showClock) {
      clockEl = document.createElement("div");
      clockEl.className = "flap-clock";
      clockEl.textContent = "--:--";
      header.appendChild(clockEl);
    }
    room.appendChild(header);

    var main = document.createElement("main");
    main.className = "flap-main flap-fade-in";
    var housing = document.createElement("div");
    housing.className = "flap-housing";
    var inner = document.createElement("div");
    inner.className = "flap-housing-inner";
    var rowsEl = document.createElement("div");
    rowsEl.className = "flap-rows";
    inner.appendChild(rowsEl);
    housing.appendChild(inner);
    main.appendChild(housing);
    room.appendChild(main);

    var footer = document.createElement("footer");
    footer.className = "flap-footer flap-fade-in";
    var dot = document.createElement("span");
    dot.className = "flap-live-dot";
    var status = document.createElement("span");
    status.textContent = "Live · " + enabledRows.length + " rows";
    footer.appendChild(dot);
    footer.appendChild(status);
    room.appendChild(footer);

    el.innerHTML = "";
    el.appendChild(room);

    var rowViews = enabledRows.map(function (row, rowIndex) {
      var wrap = document.createElement("div");
      wrap.className = "flap-fade-in";
      wrap.style.animationDelay = rowIndex * 55 + "ms";
      var msg =
        row.messages[activeIndexes[row.id] % Math.max(row.messages.length, 1)] ||
        "";
      var view = createRow(row, config, msg);
      wrap.appendChild(view.el);
      rowsEl.appendChild(wrap);
      return { row: row, view: view };
    });

    var clockTimer = null;
    if (clockEl) {
      function tickClock() {
        clockEl.textContent = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      tickClock();
      clockTimer = setInterval(tickClock, 1000);
    }

    var maxCols = 1;
    enabledRows.forEach(function (r) {
      if (r.columns > maxCols) maxCols = r.columns;
    });
    var flipSettle =
      config.flipDurationMs + config.staggerMs * Math.max(0, maxCols - 1);
    var rotateTimer = null;

    function advance() {
      enabledRows.forEach(function (row) {
        if (row.messages.length <= 1) return;
        activeIndexes[row.id] =
          ((activeIndexes[row.id] || 0) + 1) % row.messages.length;
      });
      rowViews.forEach(function (item) {
        var idx = activeIndexes[item.row.id] || 0;
        var msg =
          item.row.messages[idx % Math.max(item.row.messages.length, 1)] || "";
        item.view.update(msg);
      });
    }

    function startRotate() {
      stopRotate();
      if (!config.autoRotate) return;
      var tickMs = Math.max(
        500,
        config.holdDurationMs + config.changeGapMs + flipSettle
      );
      rotateTimer = setInterval(advance, tickMs);
    }

    function stopRotate() {
      if (rotateTimer) {
        clearInterval(rotateTimer);
        rotateTimer = null;
      }
    }

    var resizeObserver = new ResizeObserver(function () {
      rowViews.forEach(function (item) {
        var idx = activeIndexes[item.row.id] || 0;
        var msg =
          item.row.messages[idx % Math.max(item.row.messages.length, 1)] || "";
        item.view.remasure(msg);
      });
    });
    resizeObserver.observe(room);

    startRotate();

    return {
      advance: advance,
      destroy: function () {
        stopRotate();
        if (clockTimer) clearInterval(clockTimer);
        resizeObserver.disconnect();
        el.innerHTML = "";
      },
      config: config,
    };
  }

  global.FlapSign = {
    config: CONFIG,
    mount: mount,
  };
})(typeof window !== "undefined" ? window : globalThis);
`;
}

export function generateHtmlBundle(config: FlapBoardConfig): SiteExportBundle {
  const configJson = serializeExportConfig(config);
  const css = getStandaloneCss();
  const js = generateFlapRuntimeJs(configJson);

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(config.title)} — FlapSign</title>
    <link rel="stylesheet" href="./flap-sign.css" />
    <style>
      html, body {
        margin: 0;
        min-height: 100%;
        background: #0a0806;
      }
      #flap-root {
        min-height: 100dvh;
      }
    </style>
  </head>
  <body>
    <div id="flap-root"></div>
    <script src="./flap-sign.js"></script>
    <script>
      FlapSign.mount("#flap-root");
    </script>
  </body>
</html>
`;

  const readme = `# FlapSign HTML export

Drop these three files on any static host or into your site:

- \`index.html\` — page shell
- \`flap-sign.css\` — flap styles + fonts
- \`flap-sign.js\` — board runtime with your config baked in

## Usage

Open \`index.html\` in a browser, or mount into an existing page:

\`\`\`html
<link rel="stylesheet" href="/path/to/flap-sign.css" />
<div id="board"></div>
<script src="/path/to/flap-sign.js"></script>
<script>
  const board = FlapSign.mount("#board");
  // board.advance();
  // board.destroy();
</script>
\`\`\`

Your current operator settings (rows, playlists, timing, colors) are embedded in \`flap-sign.js\`.
`;

  return {
    format: "html",
    label: "HTML · CSS · JS",
    description:
      "Three static files you can drop on any site. No framework required.",
    files: [
      { filename: "index.html", language: "html", content: html },
      { filename: "flap-sign.css", language: "css", content: css },
      { filename: "flap-sign.js", language: "js", content: js },
      { filename: "README.md", language: "md", content: readme },
    ],
    readme,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
