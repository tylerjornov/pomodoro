import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePomodoro } from "@/lib/pomodoro-store";
import { THEME_OPTIONS } from "@/lib/theme";
import { cn } from "@/lib/utils";

function LengthRow({
  id,
  label,
  value,
  min,
  max,
  formatValue = (n) => `${n} min`,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  formatValue?: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-sm text-muted tabular-nums">{formatValue(value)}</span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={1}
        value={[value]}
        onValueChange={(v) => {
          const next = v[0];
          if (typeof next !== "number" || next === value) return;
          onChange(next);
        }}
        aria-label={label}
      />
    </div>
  );
}

function AppearanceRow() {
  const theme = usePomodoro((s) => s.settings.theme);
  const updateSettings = usePomodoro((s) => s.updateSettings);

  return (
    <div className="grid gap-3">
      <div className="grid gap-0.5">
        <Label id="appearance-label">Appearance</Label>
        <p className="text-xs text-muted">Light is the default. System follows the device.</p>
      </div>
      <div
        role="radiogroup"
        aria-labelledby="appearance-label"
        className="grid grid-cols-3 rounded-md bg-elevated p-1"
      >
        {THEME_OPTIONS.map((option) => {
          const selected = theme === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => updateSettings({ theme: option.id })}
              className={cn(
                "h-11 rounded-sm text-sm font-medium",
                "transition-colors duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected ? "bg-raised text-fg" : "text-muted hover:text-fg",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SettingsDialog() {
  const settings = usePomodoro((s) => s.settings);
  const updateSettings = usePomodoro((s) => s.updateSettings);

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="icon" aria-label="Settings">
              <Settings />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Length changes apply to the next idle phase. A running timer keeps its remaining time.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <LengthRow
            id="work-length"
            label="Focus"
            value={settings.workMinutes}
            min={5}
            max={60}
            onChange={(workMinutes) => updateSettings({ workMinutes })}
          />
          <LengthRow
            id="short-break"
            label="Short break"
            value={settings.shortBreakMinutes}
            min={1}
            max={20}
            onChange={(shortBreakMinutes) => updateSettings({ shortBreakMinutes })}
          />
          <LengthRow
            id="long-break"
            label="Long break"
            value={settings.longBreakMinutes}
            min={5}
            max={45}
            onChange={(longBreakMinutes) => updateSettings({ longBreakMinutes })}
          />
          <LengthRow
            id="until-long"
            label="Long break every"
            value={settings.sessionsUntilLongBreak}
            min={2}
            max={8}
            formatValue={(n) => `${n} sessions`}
            onChange={(sessionsUntilLongBreak) =>
              updateSettings({ sessionsUntilLongBreak })
            }
          />
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="grid gap-0.5">
              <Label htmlFor="sound">Sound on complete</Label>
              <p className="text-xs text-muted">A short chime when a phase ends.</p>
            </div>
            <Switch
              id="sound"
              checked={settings.soundEnabled}
              onCheckedChange={(soundEnabled) => updateSettings({ soundEnabled })}
            />
          </div>
          <Separator />
          <AppearanceRow />
        </div>
      </DialogContent>
    </Dialog>
  );
}
