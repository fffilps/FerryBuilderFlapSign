"use client";

import { useEffect, useRef, useState } from "react";
import { playFlapClick } from "@/lib/flap/sound";

interface FlapCharProps {
  value: string;
  flipDurationMs: number;
  delayMs?: number;
  soundEnabled?: boolean;
  soundVolume?: number;
}

function glyph(char: string): string {
  return char === " " ? "\u00A0" : char;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function FlapChar({
  value,
  flipDurationMs,
  delayMs = 0,
  soundEnabled = false,
  soundVolume = 0.35,
}: FlapCharProps) {
  const [current, setCurrent] = useState(value);
  const [from, setFrom] = useState(value);
  const [to, setTo] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const queueRef = useRef<string[]>([]);
  const busyRef = useRef(false);
  const timers = useRef<number[]>([]);
  const currentRef = useRef(current);
  const soundRef = useRef({ soundEnabled, soundVolume, flipDurationMs });

  currentRef.current = current;
  soundRef.current = { soundEnabled, soundVolume, flipDurationMs };

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const drainRef = useRef<() => void>(() => undefined);

  const startFlip = (next: string) => {
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
    setAnimKey((k) => k + 1);
    if (soundRef.current.soundEnabled) {
      playFlapClick(soundRef.current.soundVolume);
    }

    const done = window.setTimeout(() => {
      setCurrent(next);
      currentRef.current = next;
      setFlipping(false);
      busyRef.current = false;
      drainRef.current();
    }, soundRef.current.flipDurationMs);
    timers.current.push(done);
  };

  drainRef.current = () => {
    if (busyRef.current) return;
    const next = queueRef.current.shift();
    if (next === undefined) return;
    const latest = queueRef.current.length
      ? queueRef.current[queueRef.current.length - 1]!
      : next;
    queueRef.current = [];
    if (latest === currentRef.current) return;
    startFlip(latest);
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    if (value === currentRef.current && !busyRef.current) return;

    const id = window.setTimeout(() => {
      if (busyRef.current) {
        queueRef.current = [value];
        return;
      }
      startFlip(value);
    }, delayMs);
    timers.current.push(id);

    return () => {
      window.clearTimeout(id);
    };
  }, [value, delayMs]);

  const blank = current === " " && !flipping;

  return (
    <div
      className="flap-char"
      data-blank={blank ? "true" : "false"}
      style={{ ["--flip-ms" as string]: `${flipDurationMs}ms` }}
      aria-hidden
    >
      <div className="flap-well">
        <div className="flap-half top">
          <span>{glyph(flipping ? to : current)}</span>
        </div>
        <div className="flap-half bottom">
          <span>{glyph(flipping ? from : current)}</span>
        </div>
        <div className="flap-hinge" aria-hidden>
          <i className="flap-pin left" />
          <i className="flap-pin right" />
        </div>
        {flipping && (
          <>
            <div className="flap-anim top" key={`t-${animKey}`}>
              <span>{glyph(from)}</span>
            </div>
            <div className="flap-anim bottom" key={`b-${animKey}`}>
              <span>{glyph(to)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
