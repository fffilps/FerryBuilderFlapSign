# FLAP — Split-Flap Board

A living homepage that behaves like a real split-flap departure board: hinged tiles, cascading flips, playlist columns, and an operator settings console.

## Run locally

```bash
npm install
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## What you can do

- **Rows** — add, remove, enable/disable, set labels and column width
- **Playlist columns** — each row cycles through multiple messages
- **Timing** — flip speed, character stagger, hold time, change gap, auto-rotate
- **Look** — Solari / Terminal / Night Ops / Harbor themes, custom colors, scale, gap, brightness, alignment, charset
- **Ops** — headers, clock, flap sound, export/import JSON, reset defaults
- **Export to site** — download a React component or HTML/CSS/JS pack with your board baked in
- **Live controls** — pause, skip, open settings (gear)

Settings persist in `localStorage`.

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui.
