let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

/** Soft mechanical flap click — short noise burst + tone. */
export function playFlapClick(volume: number): void {
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
  for (let i = 0; i < data.length; i++) {
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
