import { formatMs, phaseLabel } from "@/lib/format";
import { cycleFilled, phaseDurationMs, usePomodoro } from "@/lib/pomodoro-store";
import { cn } from "@/lib/utils";

const SIZE = 320;
const STROKE = 7;
const RADIUS = (SIZE - STROKE) / 2 - 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TimerRing() {
  const remainingMs = usePomodoro((s) => s.remainingMs);
  const phase = usePomodoro((s) => s.phase);
  const status = usePomodoro((s) => s.status);
  const settings = usePomodoro((s) => s.settings);
  const completedToday = usePomodoro((s) => s.completedToday);
  const tasks = usePomodoro((s) => s.tasks);
  const activeTaskId = usePomodoro((s) => s.activeTaskId);

  const total = phaseDurationMs(phase, settings);
  const progress = total > 0 ? Math.min(1, Math.max(0, remainingMs / total)) : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const filled = cycleFilled(
    completedToday.count,
    settings.sessionsUntilLongBreak,
    phase,
  );
  const activeTask = tasks.find((t) => t.id === activeTaskId && !t.done);
  const statusCopy =
    status === "running" ? "In session" : status === "paused" ? "Paused" : "Ready";

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative size-64 sm:size-80">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="size-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            className="text-elevated"
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className={cn(
              "text-primary",
              status === "paused" && "opacity-50",
            )}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
          <p
            className="font-display text-5xl font-medium tracking-tight text-fg tabular-nums sm:text-6xl"
            aria-live="polite"
            aria-atomic="true"
          >
            {formatMs(remainingMs)}
          </p>
          <p className="mt-2 text-xs font-medium tracking-widest text-muted uppercase">
            {phaseLabel(phase)}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3" aria-label={`${filled} of ${settings.sessionsUntilLongBreak} focus sessions this cycle`}>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: settings.sessionsUntilLongBreak }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "size-2 rounded-full transition-colors duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
                  i < filled ? "bg-primary" : "bg-elevated",
                )}
              />
            ))}
          </div>
          <span className="text-xs font-medium tracking-wide text-muted tabular-nums">
            {filled}/{settings.sessionsUntilLongBreak}
          </span>
        </div>
        <p className="text-sm text-subtle">{statusCopy}</p>
        {activeTask ? (
          <p className="max-w-xs text-center text-sm text-muted">
            <span className="text-subtle">Now · </span>
            {activeTask.title}
          </p>
        ) : null}
      </div>
    </div>
  );
}
