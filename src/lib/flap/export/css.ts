/** Standalone flap CSS for site exports (no Next.js font variables). */
export const STANDALONE_FLAP_CSS = `/* FlapSign — exported split-flap styles */
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Syne:wght@400;500;600;700&display=swap");

.flap-room {
  --flap-housing: #0c0c0c;
  --flap-housing-edge: #050505;
  --flap-face: #141414;
  --flap-edge: #1f1f1f;
  --flap-blank: #111111;
  --flap-blank-edge: #0a0a0a;
  --flap-text: #f4f4f2;
  --flap-label: #6a6a6a;
  --flap-accent: #c8c8c4;
  --flap-room: #1a1612;
  --flap-glow: rgba(255, 255, 255, 0.03);
  --flap-w: 1.85rem;
  --flap-h: 2.55rem;
  --flap-font: "Barlow Condensed", ui-sans-serif, sans-serif;
  --font-display: Syne, ui-sans-serif, sans-serif;
  --flip-ms: 160ms;
  --row-gap: 0.35rem;
  --board-pad-x: 0.85rem;
  --board-pad-y: 0.85rem;
  min-height: 100dvh;
  box-sizing: border-box;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--flap-room) 75%, #2a241c) 0%,
      var(--flap-room) 42%,
      color-mix(in srgb, var(--flap-room) 88%, #050403) 100%
    );
  color: var(--flap-label);
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
}

.flap-room *,
.flap-room *::before,
.flap-room *::after {
  box-sizing: border-box;
}

.flap-housing {
  background: var(--flap-housing);
  border: 1px solid var(--flap-housing-edge);
  border-radius: 0;
  position: relative;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.035),
    inset 0 -2px 6px rgba(0, 0, 0, 0.55),
    0 1px 0 rgba(255, 255, 255, 0.04),
    0 22px 50px rgba(0, 0, 0, 0.55);
  width: 100%;
  max-width: 58rem;
}

.flap-housing::before {
  content: "";
  position: absolute;
  inset: 0.38rem;
  border: 1px solid rgba(255, 255, 255, 0.035);
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.65),
    inset 0 8px 18px rgba(0, 0, 0, 0.35);
  pointer-events: none;
  z-index: 2;
}

.flap-housing-inner {
  position: relative;
  z-index: 1;
  padding: var(--board-pad-y) var(--board-pad-x);
  background:
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 0%,
      transparent 18%,
      transparent 82%,
      rgba(0, 0, 0, 0.4) 100%
    );
}

.flap-rows {
  display: flex;
  flex-direction: column;
  gap: var(--row-gap);
}

.flap-brand {
  font-family: var(--font-display);
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--flap-label) 70%, var(--flap-accent));
  font-weight: 500;
  font-size: 0.8rem;
  margin: 0;
}

.flap-header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 1.25rem 0;
}

.flap-subtitle {
  margin: 0.4rem 0 0;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--flap-label);
  opacity: 0.65;
}

.flap-clock {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.18em;
  color: var(--flap-label);
  font-size: 0.875rem;
}

.flap-main {
  position: relative;
  z-index: 10;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0.75rem;
}

.flap-footer {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1.25rem 1.5rem;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--flap-label);
  opacity: 0.55;
}

.flap-char {
  width: var(--flap-w);
  height: var(--flap-h);
  position: relative;
  perspective: 900px;
  font-family: var(--flap-font);
  font-weight: 600;
  font-size: calc(var(--flap-h) * 0.52);
  letter-spacing: 0.02em;
  line-height: 1;
  color: var(--flap-text);
  user-select: none;
  -webkit-user-select: none;
  flex: 0 0 auto;
}

.flap-well {
  position: absolute;
  inset: 0;
  background: #050505;
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.9),
    inset 0 2px 4px rgba(0, 0, 0, 0.7);
}

.flap-half,
.flap-anim {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  overflow: hidden;
  border-radius: 0;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--flap-face) 82%, #2a2a2a) 0%,
      var(--flap-face) 14%,
      var(--flap-face) 100%
    );
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--flap-edge) 40%, #000);
}

.flap-half.top,
.flap-anim.top {
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--flap-edge) 40%, #000),
    inset 0 1px 0 rgba(255, 255, 255, 0.055),
    0 1px 0 rgba(0, 0, 0, 0.85);
}

.flap-half.bottom,
.flap-anim.bottom {
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--flap-edge) 40%, #000),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);
}

.flap-half span,
.flap-anim span {
  position: absolute;
  left: 0;
  width: 100%;
  height: var(--flap-h);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateZ(0);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.45);
}

.flap-half.top {
  top: 0;
  z-index: 2;
}

.flap-half.top span,
.flap-anim.top span {
  top: 0;
}

.flap-half.bottom {
  bottom: 0;
  z-index: 1;
}

.flap-half.bottom span,
.flap-anim.bottom span {
  bottom: 0;
}

.flap-hinge {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 0;
  z-index: 6;
  pointer-events: none;
}

.flap-hinge::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -0.5px;
  height: 1px;
  background: rgba(0, 0, 0, 0.92);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04);
}

.flap-pin {
  position: absolute;
  top: -3px;
  width: 3px;
  height: 6px;
  background:
    linear-gradient(
      180deg,
      #2a2a2a 0%,
      #151515 45%,
      #050505 100%
    );
  border: 1px solid rgba(0, 0, 0, 0.85);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.4);
  display: block;
  font-style: normal;
}

.flap-pin.left {
  left: -1px;
  border-radius: 0 1px 1px 0;
}

.flap-pin.right {
  right: -1px;
  border-radius: 1px 0 0 1px;
}

.flap-anim {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.flap-anim.top {
  top: 0;
  transform-origin: bottom center;
  z-index: 4;
  animation: flap-top calc(var(--flip-ms) * 0.5) ease-in forwards;
}

.flap-anim.bottom {
  bottom: 0;
  transform-origin: top center;
  z-index: 3;
  transform: rotateX(90deg);
  animation: flap-bottom calc(var(--flip-ms) * 0.5) ease-out forwards;
  animation-delay: calc(var(--flip-ms) * 0.5);
}

.flap-char[data-blank="true"] {
  color: transparent;
}

.flap-char[data-blank="true"] .flap-half,
.flap-char[data-blank="true"] .flap-anim {
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--flap-blank) 78%, #222) 0%,
      var(--flap-blank) 16%,
      var(--flap-blank) 100%
    );
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--flap-blank-edge) 55%, #000);
}

.flap-char[data-blank="true"] .flap-half.top,
.flap-char[data-blank="true"] .flap-anim.top {
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--flap-blank-edge) 55%, #000),
    inset 0 1px 0 rgba(255, 255, 255, 0.035),
    0 1px 0 rgba(0, 0, 0, 0.85);
}

@keyframes flap-top {
  0% {
    transform: rotateX(0deg);
    filter: brightness(1);
  }
  100% {
    transform: rotateX(-90deg);
    filter: brightness(0.42);
  }
}

@keyframes flap-bottom {
  0% {
    transform: rotateX(90deg);
    filter: brightness(0.42);
  }
  100% {
    transform: rotateX(0deg);
    filter: brightness(1);
  }
}

.flap-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
}

.flap-row-tiles {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  justify-content: flex-start;
  overflow: hidden;
}

.flap-row-label {
  font-family: var(--font-display);
  letter-spacing: 0.2em;
  font-size: 0.58rem;
  font-weight: 500;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--flap-label) 80%, transparent);
  min-width: 3.4rem;
  line-height: 1;
  text-align: right;
  flex-shrink: 0;
}

.flap-live-dot {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 0;
  background: var(--flap-accent);
  opacity: 0.7;
}

.flap-live-dot[data-paused="true"] {
  opacity: 0.3;
  background: var(--flap-label);
}

.flap-fade-in {
  animation: flap-ui-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes flap-ui-in {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .flap-room {
    --flap-w: 1.45rem;
    --flap-h: 2rem;
    --row-gap: 0.28rem;
    --board-pad-x: 0.55rem;
    --board-pad-y: 0.6rem;
  }
}

@media (max-width: 640px) {
  .flap-room {
    --flap-w: 1.1rem;
    --flap-h: 1.55rem;
    --row-gap: 0.22rem;
    --board-pad-x: 0.4rem;
    --board-pad-y: 0.45rem;
  }

  .flap-header {
    padding: 1.25rem 0.9rem 0;
  }

  .flap-main {
    padding: 1.15rem 0.5rem;
  }

  .flap-pin {
    width: 2px;
    height: 4px;
    top: -2px;
  }

  .flap-row-label {
    min-width: 2.4rem;
    font-size: 0.48rem;
  }

  .flap-housing::before {
    inset: 0.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .flap-anim.top,
  .flap-anim.bottom,
  .flap-fade-in {
    animation: none !important;
  }

  .flap-anim.top,
  .flap-anim.bottom {
    transform: none;
  }
}
`;
