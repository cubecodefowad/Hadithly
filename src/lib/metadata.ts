import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type PageMetadataOptions = {
  /** Short page title; the root template appends “· Hadithly”. */
  title: string;
  description: string;
  /** Route path such as `/bukhari/`; used for the canonical and OG URLs. */
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

/** One canonical URL and one social title per page. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = `${title} · ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
