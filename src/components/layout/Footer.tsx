import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { HADITHLY_SOURCE, HADITHLY_TOTALS, formatCount } from "@/data/hadith";

export function Footer() {
  return (
    <footer className="site-footer mt-20 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-[1.4fr_1fr] sm:px-8">
        <div>
          <p className="flex items-center gap-2 text-lg">
            <BrandMark className="h-5 w-5" />
            <span className="display">Hadithly</span>
          </p>
          <p className="mt-2 max-w-sm text-[0.8125rem] leading-relaxed text-muted">
            Ten collections of hadith in Arabic, with the translations the dataset publishes and
            each grading beside the text. No account, no cookies, nothing substituted.
          </p>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
            {formatCount(HADITHLY_TOTALS.hadiths)} hadiths in{" "}
            {formatCount(HADITHLY_TOTALS.sections)} books, across{" "}
            {HADITHLY_TOTALS.languages} translations.
          </p>
        </div>

        <div className="text-[0.8125rem] leading-relaxed text-muted">
          <p className="meta mb-3">Source</p>
          <p>
            Text and translations:{" "}
            <a
              className="underline decoration-line underline-offset-4 hover:text-ink"
              href={`${HADITHLY_SOURCE.repository}/tree/${HADITHLY_SOURCE.revision}`}
              target="_blank"
              rel="noreferrer"
            >
              {HADITHLY_SOURCE.name}
            </a>{" "}
            ({HADITHLY_SOURCE.license}).
          </p>
          <p className="mt-2">
            Pinned revision {HADITHLY_SOURCE.revision.slice(0, 7)}, checked against the local files
            at build time.
          </p>
          <p className="mt-3">
            <Link
              className="underline decoration-line underline-offset-4 hover:text-ink"
              href="/sources/"
            >
              What this text is, and what it is not
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
