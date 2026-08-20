import { useLayoutEffect } from "react";
import { applyResolvedTheme, resolveTheme } from "@/lib/theme";
import { usePomodoro } from "@/lib/pomodoro-store";

export function ThemeEngine() {
  const hydrated = usePomodoro((s) => s.hydrated);
  const theme = usePomodoro((s) => s.settings.theme);

  useLayoutEffect(() => {
    if (!hydrated) return;
    const apply = () => applyResolvedTheme(resolveTheme(theme));
    apply();
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [hydrated, theme]);

  return null;
}
