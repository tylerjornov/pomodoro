import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePomodoro } from "@/lib/pomodoro-store";

export function TimerControls() {
  const status = usePomodoro((s) => s.status);
  const phase = usePomodoro((s) => s.phase);
  const start = usePomodoro((s) => s.start);
  const pause = usePomodoro((s) => s.pause);
  const reset = usePomodoro((s) => s.reset);
  const skip = usePomodoro((s) => s.skip);

  const running = status === "running";
  const skipLabel = phase === "work" ? "Skip to break" : "Skip to focus";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={reset}
              aria-label="Reset timer"
            >
              <RotateCcw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reset</TooltipContent>
        </Tooltip>

        <Button
          type="button"
          size="lg"
          onClick={running ? pause : start}
          aria-label={running ? "Pause" : "Start"}
          className="min-w-40"
        >
          <span className="relative size-4">
            <Play
              className={
                running
                  ? "absolute inset-0 scale-25 opacity-0 blur-sm"
                  : "absolute inset-0 scale-100 opacity-100"
              }
              style={{
                transition:
                  "opacity var(--motion-fast) ease-in-out, transform var(--motion-fast) ease-in-out, filter var(--motion-fast) ease-in-out",
              }}
            />
            <Pause
              className={
                running
                  ? "absolute inset-0 scale-100 opacity-100"
                  : "absolute inset-0 scale-25 opacity-0 blur-sm"
              }
              style={{
                transition:
                  "opacity var(--motion-fast) ease-in-out, transform var(--motion-fast) ease-in-out, filter var(--motion-fast) ease-in-out",
              }}
            />
          </span>
          {running ? "Pause" : status === "paused" ? "Resume" : "Start"}
        </Button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={skip}
              aria-label={skipLabel}
            >
              <SkipForward />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{skipLabel}</TooltipContent>
        </Tooltip>
      </div>
      <p className="hidden text-xs text-subtle sm:block">
        Space to {running ? "pause" : status === "paused" ? "resume" : "start"}
      </p>
    </div>
  );
}
