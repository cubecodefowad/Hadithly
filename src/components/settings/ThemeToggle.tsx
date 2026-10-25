"use client";

import { Moon, Sun } from "lucide-react";
import { useSettings } from "@/components/settings/SettingsProvider";

/**
 * Two states, not three: the toggle writes an explicit choice, and the
 * operating system's preference is what you get until you make one.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useSettings();
  const next = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="icon-button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to the ${next} theme`}
      title={`Switch to the ${next} theme`}
    >
      {resolvedTheme === "dark" ? (
        <Sun size={16} strokeWidth={1.8} aria-hidden />
      ) : (
        <Moon size={16} strokeWidth={1.8} aria-hidden />
      )}
    </button>
  );
}
