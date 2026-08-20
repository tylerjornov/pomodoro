import { useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { usePomodoro } from "@/lib/pomodoro-store";
import { cn } from "@/lib/utils";

export function TaskList() {
  const tasks = usePomodoro((s) => s.tasks);
  const activeTaskId = usePomodoro((s) => s.activeTaskId);
  const addTask = usePomodoro((s) => s.addTask);
  const toggleTask = usePomodoro((s) => s.toggleTask);
  const removeTask = usePomodoro((s) => s.removeTask);
  const setActiveTask = usePomodoro((s) => s.setActiveTask);
  const [draft, setDraft] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    addTask(draft);
    setDraft("");
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-lg font-medium tracking-tight">This session</h2>
        <p className="text-xs font-medium tracking-wide text-muted tabular-nums">
          {remaining} open
        </p>
      </div>

      <form onSubmit={onSubmit} className="mb-4 flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a task"
          aria-label="New task"
          maxLength={80}
        />
        <Button type="submit" size="icon" variant="secondary" aria-label="Add task">
          <Plus />
        </Button>
      </form>

      {tasks.length === 0 ? (
        <p className="py-6 text-center text-sm text-subtle">
          Nothing queued. Add what you want to finish this session.
        </p>
      ) : (
        <ul className="flex flex-col gap-1">
          {tasks.map((task) => {
            const active = task.id === activeTaskId && !task.done;
            return (
              <li
                key={task.id}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-2 py-1.5",
                  "transition-colors duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)]",
                  active && "bg-elevated",
                )}
              >
                <Checkbox
                  checked={task.done}
                  onCheckedChange={() => toggleTask(task.id)}
                  aria-label={task.done ? `Restore ${task.title}` : `Complete ${task.title}`}
                />
                <button
                  type="button"
                  onClick={() => !task.done && setActiveTask(task.id)}
                  className={cn(
                    "min-h-11 flex-1 py-2 text-left text-sm",
                    task.done ? "text-subtle line-through" : "text-fg",
                    !task.done && "hover:text-primary",
                  )}
                >
                  {task.title}
                  {active ? (
                    <span className="ml-2 text-xs font-medium tracking-wide text-muted uppercase">
                      Now
                    </span>
                  ) : null}
                </button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${task.title}`}
                  onClick={() => removeTask(task.id)}
                  className="opacity-70 group-hover:opacity-100"
                >
                  <Trash2 />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
