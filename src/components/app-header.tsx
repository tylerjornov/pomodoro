import { Volume2, VolumeX } from "lucide-react";
import { SettingsDialog } from "@/components/settings-dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePomodoro } from "@/lib/pomodoro-store";

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 text-primary" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-elevated"
      />
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength="100"
        strokeDasharray="70 30"
        transform="rotate(-90 12 12)"
      />
    </svg>
  );
}

export function AppHeader() {
  const completedToday = usePomodoro((s) => s.completedToday);
  const totalWorkSessions = usePomodoro((s) => s.totalWorkSessions);
  const soundEnabled = usePomodoro((s) => s.settings.soundEnabled);
  const updateSettings = usePomodoro((s) => s.updateSettings);

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Mark />
        <div className="leading-tight">
          <h1 className="font-display text-2xl font-medium tracking-tight italic">Still</h1>
          <p className="text-xs text-muted tabular-nums">
            {completedToday.count} today
            <span className="text-subtle"> · {totalWorkSessions} total</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={soundEnabled ? "Mute completion sound" : "Unmute completion sound"}
              onClick={() => updateSettings({ soundEnabled: !soundEnabled })}
            >
              <span className="relative size-4">
                <Volume2
                  className={
                    soundEnabled
                      ? "absolute inset-0 scale-100 opacity-100"
                      : "absolute inset-0 scale-25 opacity-0 blur-sm"
                  }
                  style={{
                    transition:
                      "opacity var(--motion-fast) ease-in-out, transform var(--motion-fast) ease-in-out, filter var(--motion-fast) ease-in-out",
                  }}
                />
                <VolumeX
                  className={
                    soundEnabled
                      ? "absolute inset-0 scale-25 opacity-0 blur-sm"
                      : "absolute inset-0 scale-100 opacity-100"
                  }
                  style={{
                    transition:
                      "opacity var(--motion-fast) ease-in-out, transform var(--motion-fast) ease-in-out, filter var(--motion-fast) ease-in-out",
                  }}
                />
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{soundEnabled ? "Sound on" : "Sound off"}</TooltipContent>
        </Tooltip>
        <SettingsDialog />
      </div>
    </header>
  );
}
