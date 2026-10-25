/**
 * Canonical site identity.
 *
 * `NEXT_PUBLIC_SITE_URL` lets a deployment advertise its own origin; the
 * fallback is the local preview, because this app ships as a static export
 * with no host of its own.
 */
function resolveSiteUrl(): string {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3200";
  try {
    return new URL(candidate).origin;
  } catch {
    return "http://localhost:3200";
  }
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Hadithly";
export const SITE_TITLE = "Hadithly — the hadith library";
export const SITE_DESCRIPTION =
  "Read the Six Books, the Muwatta and three collections of forty narrations in Arabic, with every published translation and each scholar's grading beside the text.";
export const SITE_KEYWORDS = [
  "hadith",
  "Sahih al-Bukhari",
  "Sahih Muslim",
  "the Six Books",
  "hadith translation",
  "Urdu hadith",
  "Hadithly",
];

/** Keep internal links and canonicals in the same trailing-slash shape. */
export function canonicalPath(path = "/"): string {
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export function absoluteUrl(path = "/"): string {
  return new URL(canonicalPath(path), `${SITE_URL}/`).toString();
}
