import { DEFAULT_HADITH_LANGUAGE, isHadithLanguage } from "@/data/hadith-format";
import type { HadithProgress } from "@/types/hadith";
import type { HadithSettings, ThemePreference } from "@/types/settings";

/** Namespaced so nothing here collides with another app on the same origin. */
export const STORAGE_KEYS = {
  settings: "hadithly.settings.v1",
} as const;

export const HADITHLY_STORAGE_KEYS = {
  progress: "hadithly.progress.v1",
} as const;

export const DEFAULT_SETTINGS: HadithSettings = {
  hadithTranslation: DEFAULT_HADITH_LANGUAGE,
  showTranslation: true,
  theme: "system",
};

const THEMES: ThemePreference[] = ["system", "light", "dark"];

export function parseSettings(value: unknown): HadithSettings {
  const input = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;

  const theme = THEMES.includes(input.theme as ThemePreference)
    ? (input.theme as ThemePreference)
    : DEFAULT_SETTINGS.theme;

  const hadithTranslation = isHadithLanguage(input.hadithTranslation)
    ? input.hadithTranslation
    : DEFAULT_SETTINGS.hadithTranslation;

  return {
    hadithTranslation,
    showTranslation:
      typeof input.showTranslation === "boolean"
        ? input.showTranslation
        : DEFAULT_SETTINGS.showTranslation,
    theme,
  };
}

/**
 * Structural check only: the collection id, book and hadith number must be
 * plausible. A tampered or stale value must not crash the landing page.
 */
export function parseHadithProgress(value: unknown): HadithProgress | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<HadithProgress>;
  if (typeof candidate.collection !== "string" || !/^[a-z]{3,16}$/.test(candidate.collection)) {
    return null;
  }
  const section = candidate.section;
  if (typeof section !== "number" || !Number.isInteger(section) || section < 0 || section > 999) {
    return null;
  }
  if (
    typeof candidate.number !== "number" ||
    !Number.isFinite(candidate.number) ||
    candidate.number < 1 ||
    candidate.number > 99_999
  ) {
    return null;
  }
  if (typeof candidate.updatedAt !== "string" || Number.isNaN(Date.parse(candidate.updatedAt))) {
    return null;
  }

  const label = (input: unknown) =>
    typeof input === "string" && input.trim() ? input.trim().slice(0, 120) : undefined;
  const collectionName = label(candidate.collectionName);
  const sectionName = label(candidate.sectionName);

  return {
    collection: candidate.collection,
    ...(collectionName ? { collectionName } : {}),
    section,
    ...(sectionName ? { sectionName } : {}),
    number: candidate.number,
    updatedAt: candidate.updatedAt,
  };
}

export function readStorage<T>(key: string, parse: (value: unknown) => T | null): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return parse(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage may be unavailable (private mode, quota). Reading is unaffected.
  }
}
