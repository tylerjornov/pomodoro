import { useEffect } from "react";
import { formatMs, phaseLabel } from "@/lib/format";
import { usePomodoro } from "@/lib/pomodoro-store";

export function TimerEngine() {
  const status = usePomodoro((s) => s.status);
  const remainingMs = usePomodoro((s) => s.remainingMs);
  const phase = usePomodoro((s) => s.phase);
  const tick = usePomodoro((s) => s.tick);
  const hydrate = usePomodoro((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (status !== "running") return;

    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      if (now - last >= 50) {
        last = now;
        tick();
      }
      raf = requestAnimationFrame(loop);
    };

    const startRaf = () => {
      cancelAnimationFrame(raf);
      last = 0;
      raf = requestAnimationFrame(loop);
    };

    // Background tabs freeze rAF, so an interval keeps the title and
    // phase completion moving while the page is hidden.
    const interval = window.setInterval(tick, 250);
    const onVis = () => {
      tick();
      if (document.hidden) cancelAnimationFrame(raf);
      else startRaf();
    };

    if (!document.hidden) startRaf();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [status, tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
      e.preventDefault();
      const state = usePomodoro.getState();
      if (state.status === "running") state.pause();
      else state.start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const label = phaseLabel(phase);
    if (status === "running") {
      document.title = `${formatMs(remainingMs)} · ${label}`;
    } else if (status === "paused") {
      document.title = `Paused · ${label}`;
    } else {
      document.title = "Still";
    }
  }, [remainingMs, phase, status]);

  return null;
}
