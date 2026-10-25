import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  formatCount,
  HADITHLY_LANGUAGES,
  HADITHLY_SOURCE,
  HADITHLY_TOTALS,
  HADITH_COLLECTIONS,
} from "@/data/hadith";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Sources and accuracy",
  description:
    "Where Hadithly's Arabic, translations and gradings come from, what has been checked, and how to report a discrepancy.",
  path: "/sources/",
});

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
      <nav className="text-xs">
        <Link href="/" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
          <ArrowLeft size={14} strokeWidth={1.8} aria-hidden />
          All collections
        </Link>
      </nav>

      <p className="meta mt-8">About</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">Sources and accuracy</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
        Hadithly displays text it did not write. This page states where every part of it comes from,
        what has been checked, and what to do if something looks wrong.
      </p>

      <section className="mt-12 border-t border-line pt-8" aria-labelledby="text">
        <h2 id="text" className="display text-2xl">
          The text
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Arabic, translations and gradings come from the{" "}
            <a
              className="underline decoration-line underline-offset-2 hover:text-ink"
              href={`${HADITHLY_SOURCE.repository}/tree/${HADITHLY_SOURCE.revision}`}
              target="_blank"
              rel="noreferrer"
            >
              {HADITHLY_SOURCE.name}
            </a>{" "}
            datasets, pinned to revision {HADITHLY_SOURCE.revision.slice(0, 7)} rather than the
            moving branch the project publishes. The datasets are released under{" "}
            {HADITHLY_SOURCE.license}.
          </p>
          <p>
            {formatCount(HADITHLY_TOTALS.hadiths)} narrations are held in{" "}
            {formatCount(HADITHLY_TOTALS.sections)} books across{" "}
            {HADITHLY_TOTALS.collections} collections. The book divisions and their names are the
            dataset&apos;s own; nothing has been regrouped editorially.
          </p>
          <p>
            Each narration also carries the dataset&apos;s own reference, and totals do not always
            match the printed numbering of a collection: upward of a hundred Bukhari rows have no
            Arabic text of their own upstream and are omitted rather than filled in from a
            neighbouring narration.
          </p>
        </div>
      </section>

      <section className="mt-10 border-t border-line pt-8" aria-labelledby="translations">
        <h2 id="translations" className="display text-2xl">
          The translations
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {HADITHLY_LANGUAGES.length} languages are published for these ten collections. Coverage is
          uneven and often partial — a translation is present for the narrations the edition
          actually contains, not for every narration in the collection.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {HADITHLY_LANGUAGES.map((language) => (
            <li key={language.code} className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
              <span>
                <span className="text-ink/85">{language.name}</span>
                {language.native !== language.name ? (
                  <span
                    lang={language.code}
                    className={`ml-2 ${language.direction === "rtl" ? "font-arabic" : ""}`}
                  >
                    {language.native}
                  </span>
                ) : null}
              </span>
              <span className="tabular-nums text-xs">
                {formatCount(language.hadiths)} narrations · {language.collections} collections
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          A translation is human work, and a translation of a hadith is not the hadith itself. Where
          an edition stops, the page says so instead of filling the gap with English.
        </p>
      </section>

      <section className="mt-10 border-t border-line pt-8" aria-labelledby="gradings">
        <h2 id="gradings" className="display text-2xl">
          The gradings
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          A grade is a scholar&apos;s judgement about a chain of transmission, not revelation.
          Hadithly prints the dataset&apos;s verdicts exactly, and every chip names the scholar who
          issued it, so two chips may disagree without the page taking a side. Bukhari, Muslim and
          the three sets of forty ship no gradings upstream, so none are shown rather than inferred.
        </p>
      </section>

      <section className="mt-10 border-t border-line pt-8" aria-labelledby="checked">
        <h2 id="checked" className="display text-2xl">
          What is checked at build time
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
          <li>Every book listed in the index has its file, and every file has its index entry.</li>
          <li>No narration is empty, and numbering never runs backwards inside a book.</li>
          <li>
            Every translated row names a narration that exists in that book, and every language a
            collection advertises has its files.
          </li>
          <li>
            Defects in the source are counted, not repaired: a handful of narrations are published
            only in English, and some carry a replacement character from the dataset&apos;s own
            encoding. Both are marked where they appear.
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          A build fails when any of those checks fails. What the checks cannot do is confirm that a
          translation is faithful, or that a grade is correct; that is the work of the scholars the
          chips name.
        </p>
      </section>

      <section className="mt-10 border-t border-line pt-8" aria-labelledby="report">
        <h2 id="report" className="display text-2xl">
          Reporting a problem
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          If a narration looks wrong, check it against{" "}
          <a
            className="underline decoration-line underline-offset-2 hover:text-ink"
            href={HADITHLY_SOURCE.repository}
            target="_blank"
            rel="noreferrer"
          >
            the source dataset
          </a>{" "}
          first: a discrepancy that exists there is reported there. A problem introduced here — a
          missing book, a misplaced narration, a translation attached to the wrong row — belongs in
          this repository&apos;s issues.
        </p>
      </section>

      <section className="mt-10 border-t border-line pt-8" aria-labelledby="collections">
        <h2 id="collections" className="display text-2xl">
          What is included
        </h2>
        <ul className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
          {HADITH_COLLECTIONS.map((collection) => (
            <li key={collection.id}>
              <Link href={collection.href} className="hover:text-ink">
                {collection.name}
              </Link>{" "}
              <span className="text-xs">
                · {formatCount(collection.hadiths)} · {collection.languages.length} languages
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
