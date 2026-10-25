import type { MetadataRoute } from "next";
import { HADITH_COLLECTIONS } from "@/data/hadith";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
  ];

  const collections: MetadataRoute.Sitemap = HADITH_COLLECTIONS.map((collection) => ({
    url: absoluteUrl(`/${collection.id}/`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Every book is its own page, and the whole point of the library is that a
  // reader can land on one, so all 399 are listed.
  const books: MetadataRoute.Sitemap = HADITH_COLLECTIONS.flatMap((collection) =>
    collection.sections.map((section) => ({
      url: absoluteUrl(`/${collection.id}/${section.number}/`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  );

  const supporting: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/sources/"), changeFrequency: "yearly", priority: 0.4 },
  ];

  return [...home, ...collections, ...books, ...supporting];
}
