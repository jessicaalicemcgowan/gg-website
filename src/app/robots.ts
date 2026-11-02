import type { MetadataRoute } from "next";

// Disallow all crawling while the site is still in build/review — remove
// this file (and the noindex block in layout.tsx) when launching for real.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
