# Hadithly

Ten hadith collections in Arabic, with every translation the dataset publishes
and each scholar's grading printed beside the narration. A static Next.js app:
no account, no server, no database.

- **The Six Books**: Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah.
- **Also**: the Muwatta of Malik, the Forty of al-Nawawi, the Forty Qudsi and
  the Forty of Shah Waliullah Dehlawi.
- 36,110 narrations in 399 books, in eight languages.
- Gradings exactly as published, each chip naming the scholar who issued it.

Hadithly began as the hadith section of [Mushafly](https://github.com/cubecodefowad/Mushafly)
and now stands on its own: this repository holds the reader, the data pipeline
and the corpus, with no Quran code.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
npm run start      # serves out/ on http://127.0.0.1:3200
npm run lint       # tsc --noEmit
```

`npm run build` runs `npm run data:validate` first and fails if the corpus and
its index disagree.

## The data

The text comes from
[fawazahmed0/hadith-api](https://github.com/fawazahmed0/hadith-api), pinned to a
commit rather than the moving `1` branch:

```bash
npm run data:hadith   # download every edition, split by book and language
```

The downloader reads `editions.json` and fetches every edition the upstream
publishes for these ten collections: the Arabic, the English and each further
translation. The registry lists 74 editions; the ten `ara-*1` copies — the same
Arabic without diacritics, kept upstream for searching — are skipped, leaving
eight languages: English, Urdu, Indonesian, Turkish, Bengali, French, Russian
and Tamil.

It writes one file per book to `public/hadith/{collection}/{section}.json` for
the Arabic and English, and one per book per language to
`public/hadith/{collection}/{language}/{section}.json`; counts, chapter names
and the source revision live in `src/data/generated/hadith-index.json`.

Editions are joined on the in-book `book:hadith` reference first and the
collection number second, never on array order, so a shifted row cannot attach
the wrong text. The dataset's `0:0` placeholder is matched by number alone:
treating it as a real reference would give hundreds of narrations the same
Arabic. A page loads a single book (about 1 MB at the largest, in the language
the reader picked) instead of a 10 MB collection, and paints the window only
once that file arrives. English sits beside the Arabic so the first paint always
has a translation; every other language is fetched when it is chosen.

`npm run data:validate` checks that every book in the index has its file and
every file its index entry, that no narration is empty, that numbering never
runs backwards inside a book, that every translated row names a narration that
exists, and that the declared defect counts have not drifted. Two source shapes
are declared rather than repaired: a few narrations are published only in
English, and some carry a U+FFFD from the dataset's own encoding. Both are
marked in the data and explained where they appear. Bukhari leaves narrations
outside any chapter; they are placed in the chapter whose published number range
contains them rather than in a synthetic "Book 0".

## The reader

- Arabic first, then the translation, with a picker for every language that
  collection actually has.
- A collection that was never translated into the chosen language says so; a
  narration with no text shows the Arabic alone rather than a silent fallback.
- Long books render in windows of 25, and `#hadith-N` deep links open the book
  at that narration.
- Your place is kept in `localStorage` on the device, so "continue reading"
  survives a reload and nothing leaves the browser.
- Light and dark follow the system until you pick one.

Routes:

| Path | Page |
| --- | --- |
| `/` | every collection |
| `/{collection}/` | the books in a collection |
| `/{collection}/{section}/` | one book |
| `/sources/` | provenance, translations and what the build checks |

## Licence and provenance

The application code is MIT (see [LICENSE](LICENSE)). The hadith datasets are
public domain (Unlicense) and the fonts are under the SIL Open Font License;
both are reproduced in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). A
translation of a hadith is human work, and a grade is a scholar's judgement, not
revelation: verify a narration against a printed edition before relying on it.
