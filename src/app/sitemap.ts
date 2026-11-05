import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { routes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/sponsorships" ? 0.9 : 0.7,
  }));
}
