let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) audioCtx = new Ctor();
  return audioCtx;
}

function tone(
  ctx: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  gainValue: number,
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export function playPhaseComplete(kind: "work" | "break") {
  const ctx = getContext();
  if (!ctx) return;
  void ctx.resume();
  const now = ctx.currentTime + 0.02;
  // Rising chime after focus; falling chime after a break.
  const freqs = kind === "work" ? [392, 523.25, 659.25] : [659.25, 523.25, 392];
  freqs.forEach((freq, i) => {
    tone(ctx, freq, now + i * 0.14, 0.7, 0.08);
  });
}
