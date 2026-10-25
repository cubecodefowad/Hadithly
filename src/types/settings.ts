import type { HadithLanguageCode } from "@/types/hadith";

/** How the reader wants the library to look and read. */
export type ThemePreference = "system" | "light" | "dark";

export type HadithSettings = {
  /** The translation the reader picked, used wherever a collection has it. */
  hadithTranslation: HadithLanguageCode;
  showTranslation: boolean;
  theme: ThemePreference;
};
