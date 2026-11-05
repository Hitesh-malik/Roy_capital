import type { Metadata } from "next";
import { site } from "@/config/site";

/** Per-route metadata with canonical URL and Open Graph defaults. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_GB",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export const routes = [
  "/",
  "/about",
  "/programs",
  "/approach",
  "/sponsorships",
  "/philanthropy",
  "/impact",
  "/contact",
  "/privacy",
  "/disclaimer",
] as const;
