import type { Metadata } from "next";
import { SITE } from "@/constants/site";

interface SEOParams {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  keywords = [],
  noindex = false,
}: SEOParams): Metadata {
  const url = `${SITE.url}${path}`;

  return {
    title,
    description,
    keywords: [
      ...keywords,
      "neurologist",
      "neurology hospital",
      "Vijaya Neuro Hospital",
      "Telangana",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_IN",
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
