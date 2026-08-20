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
    let id = 0;
    let last = 0;
    const loop = (t: number) => {
      if (t - last >= 50) {
        last = t;
        tick();
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    const onVis = () => tick();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(id);
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
