import { create } from "zustand";
import { todayKey } from "@/lib/format";
import { playPhaseComplete } from "@/lib/sound";
import { isTheme, type Theme } from "@/lib/theme";

export type Phase = "work" | "shortBreak" | "longBreak";
export type Status = "idle" | "running" | "paused";

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export type Settings = {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsUntilLongBreak: number;
  soundEnabled: boolean;
  theme: Theme;
};

type TodayCount = { date: string; count: number };

type Persisted = {
  settings: Settings;
  tasks: Task[];
  activeTaskId: string | null;
  completedToday: TodayCount;
  totalWorkSessions: number;
  phase: Phase;
  remainingMs: number;
  status: Status;
};

const STORAGE_KEY = "still-pomodoro-v1";

export const DEFAULT_SETTINGS: Settings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsUntilLongBreak: 4,
  soundEnabled: true,
  theme: "light",
};

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function normalizeSettings(input: Partial<Settings> | undefined): Settings {
  const merged = { ...DEFAULT_SETTINGS, ...input };
  return {
    workMinutes: clamp(merged.workMinutes, 5, 60),
    shortBreakMinutes: clamp(merged.shortBreakMinutes, 1, 20),
    longBreakMinutes: clamp(merged.longBreakMinutes, 5, 45),
    sessionsUntilLongBreak: clamp(merged.sessionsUntilLongBreak, 2, 8),
    soundEnabled: Boolean(merged.soundEnabled),
    theme: isTheme(merged.theme) ? merged.theme : "light",
  };
}

export function phaseDurationMs(phase: Phase, settings: Settings): number {
  const minutes =
    phase === "work"
      ? settings.workMinutes
      : phase === "shortBreak"
        ? settings.shortBreakMinutes
        : settings.longBreakMinutes;
  return minutes * 60 * 1000;
}

function loadPersisted(): Persisted | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Persisted;
  } catch {
    return null;
  }
}

let persistBound = false;
let persistTimer: number | null = null;

function persistSnapshot(state: PomodoroState) {
  if (typeof window === "undefined") return;
  const payload: Persisted = {
    settings: state.settings,
    tasks: state.tasks,
    activeTaskId: state.activeTaskId,
    completedToday: state.completedToday,
    totalWorkSessions: state.totalWorkSessions,
    phase: state.phase,
    remainingMs: state.remainingMs,
    status: state.status === "running" ? "paused" : state.status,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export type PomodoroState = {
  hydrated: boolean;
  settings: Settings;
  tasks: Task[];
  activeTaskId: string | null;
  completedToday: TodayCount;
  totalWorkSessions: number;
  phase: Phase;
  status: Status;
  remainingMs: number;
  endsAt: number | null;
  hydrate: () => void;
  tick: () => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  updateSettings: (partial: Partial<Settings>) => void;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  setActiveTask: (id: string | null) => void;
  completePhase: () => void;
};

function bindPersist() {
  if (persistBound) return;
  persistBound = true;
  usePomodoro.subscribe((state, prev) => {
    const remainingOnly =
      state.remainingMs !== prev.remainingMs &&
      state.settings === prev.settings &&
      state.tasks === prev.tasks &&
      state.phase === prev.phase &&
      state.status === prev.status &&
      state.activeTaskId === prev.activeTaskId &&
      state.completedToday === prev.completedToday;

    if (remainingOnly) {
      const prevSec = Math.floor(prev.remainingMs / 1000);
      const nextSec = Math.floor(state.remainingMs / 1000);
      if (prevSec === nextSec) return;
      if (persistTimer) window.clearTimeout(persistTimer);
      persistTimer = window.setTimeout(() => persistSnapshot(state), 400);
      return;
    }
    persistSnapshot(state);
  });
}

export const usePomodoro = create<PomodoroState>((set, get) => ({
  hydrated: false,
  settings: DEFAULT_SETTINGS,
  tasks: [],
  activeTaskId: null,
  completedToday: { date: todayKey(), count: 0 },
  totalWorkSessions: 0,
  phase: "work",
  status: "idle",
  remainingMs: phaseDurationMs("work", DEFAULT_SETTINGS),
  endsAt: null,

  hydrate: () => {
    if (get().hydrated) return;
    const saved = loadPersisted();
    const date = todayKey();
    if (saved) {
      const settings = normalizeSettings(saved.settings);
      const completedToday =
        saved.completedToday?.date === date
          ? saved.completedToday
          : { date, count: 0 };
      const phase = saved.phase ?? "work";
      const full = phaseDurationMs(phase, settings);
      const remainingMs = Math.min(Math.max(0, saved.remainingMs ?? full), full);
      const status: Status =
        remainingMs > 0 && remainingMs < full && saved.status === "paused"
          ? "paused"
          : "idle";
      set({
        hydrated: true,
        settings,
        tasks: Array.isArray(saved.tasks) ? saved.tasks : [],
        activeTaskId: saved.activeTaskId ?? null,
        completedToday,
        totalWorkSessions: saved.totalWorkSessions ?? 0,
        phase,
        remainingMs: status === "idle" && remainingMs === 0 ? full : remainingMs,
        status: remainingMs === 0 ? "idle" : status,
        endsAt: null,
      });
    } else {
      set({ hydrated: true });
    }
    bindPersist();
  },

  tick: () => {
    const { status, endsAt } = get();
    if (status !== "running" || endsAt === null) return;
    const remaining = endsAt - Date.now();
    if (remaining <= 0) {
      get().completePhase();
      return;
    }
    set({ remainingMs: remaining });
  },

  start: () => {
    const { remainingMs, status } = get();
    if (status === "running") return;
    const remaining = Math.max(remainingMs, 0);
    if (remaining <= 0) return;
    set({ status: "running", endsAt: Date.now() + remaining });
  },

  pause: () => {
    const { status, endsAt, remainingMs } = get();
    if (status !== "running") return;
    const remaining = endsAt ? Math.max(0, endsAt - Date.now()) : remainingMs;
    set({ status: "paused", remainingMs: remaining, endsAt: null });
  },

  reset: () => {
    const { phase, settings } = get();
    set({
      status: "idle",
      remainingMs: phaseDurationMs(phase, settings),
      endsAt: null,
    });
  },

  skip: () => {
    const { phase, settings } = get();
    if (phase === "work") {
      set({
        phase: "shortBreak",
        status: "idle",
        remainingMs: phaseDurationMs("shortBreak", settings),
        endsAt: null,
      });
      return;
    }
    set({
      phase: "work",
      status: "idle",
      remainingMs: phaseDurationMs("work", settings),
      endsAt: null,
    });
  },

  updateSettings: (partial) => {
    const settings = normalizeSettings({ ...get().settings, ...partial });
    const { status, phase } = get();
    if (status === "idle") {
      set({ settings, remainingMs: phaseDurationMs(phase, settings) });
      return;
    }
    set({ settings });
  },

  addTask: (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const task: Task = {
      id: crypto.randomUUID(),
      title: trimmed,
      done: false,
    };
    const { tasks, activeTaskId } = get();
    const hasActive = activeTaskId && tasks.some((t) => t.id === activeTaskId && !t.done);
    set({
      tasks: [...tasks, task],
      activeTaskId: hasActive ? activeTaskId : task.id,
    });
  },

  toggleTask: (id) => {
    const tasks = get().tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t,
    );
    let activeTaskId = get().activeTaskId;
    const active = tasks.find((t) => t.id === activeTaskId);
    if (!active || active.done) {
      activeTaskId = tasks.find((t) => !t.done)?.id ?? null;
    }
    set({ tasks, activeTaskId });
  },

  removeTask: (id) => {
    const tasks = get().tasks.filter((t) => t.id !== id);
    let activeTaskId = get().activeTaskId;
    if (activeTaskId === id) {
      activeTaskId = tasks.find((t) => !t.done)?.id ?? null;
    }
    set({ tasks, activeTaskId });
  },

  setActiveTask: (id) => {
    if (id === null) {
      set({ activeTaskId: null });
      return;
    }
    const task = get().tasks.find((t) => t.id === id);
    if (!task || task.done) return;
    set({ activeTaskId: id });
  },

  completePhase: () => {
    const { phase, settings, completedToday, totalWorkSessions } = get();
    if (settings.soundEnabled) {
      playPhaseComplete(phase === "work" ? "work" : "break");
    }
    if (phase === "work") {
      const date = todayKey();
      const count = completedToday.date === date ? completedToday.count + 1 : 1;
      const next: Phase =
        count % settings.sessionsUntilLongBreak === 0 ? "longBreak" : "shortBreak";
      set({
        completedToday: { date, count },
        totalWorkSessions: totalWorkSessions + 1,
        phase: next,
        status: "idle",
        remainingMs: phaseDurationMs(next, settings),
        endsAt: null,
      });
      return;
    }
    set({
      phase: "work",
      status: "idle",
      remainingMs: phaseDurationMs("work", settings),
      endsAt: null,
    });
  },
}));

export function cycleFilled(
  completedCount: number,
  untilLong: number,
  phase: Phase,
): number {
  const n = Math.max(1, untilLong);
  const mod = completedCount % n;
  if (mod === 0 && completedCount > 0 && phase !== "work") return n;
  return mod;
}
