import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { LofiEmbed } from "@/components/lofi-embed";
import { TaskList } from "@/components/task-list";
import { ThemeEngine } from "@/components/theme-engine";
import { TimerControls } from "@/components/timer-controls";
import { TimerEngine } from "@/components/timer-engine";
import { TimerRing } from "@/components/timer-ring";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LOFI_CHANNELS } from "@/lib/lofi-catalog";
import { getLofiLiveStreams } from "@/lib/lofi-streams";
import { usePomodoro } from "@/lib/pomodoro-store";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      return await getLofiLiveStreams();
    } catch {
      return {
        channels: LOFI_CHANNELS.map((ch) => ({ ...ch, streams: [] })),
        fetchedAt: Date.now(),
      };
    }
  },
  component: Home,
});

function Home() {
  const phase = usePomodoro((s) => s.phase);
  const catalog = Route.useLoaderData();

  return (
    <TooltipProvider>
      <TimerEngine />
      <ThemeEngine />
      <div
        data-phase={phase}
        className="phase-shell flex min-h-svh flex-col px-5 pt-6 pb-10 sm:px-8"
      >
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col">
          <AppHeader />
          <main className="flex flex-1 flex-col gap-10 pt-10 sm:pt-12">
            <div className="flex flex-col items-center gap-8">
              <TimerRing />
              <TimerControls />
            </div>
            <LofiEmbed initialCatalog={catalog} />
            <TaskList />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
