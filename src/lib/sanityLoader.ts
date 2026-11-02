"use client";

// next/image loader: Sanity-hosted images are resized/compressed by Sanity's
// CDN; anything else (e.g. files in /public) is served as-is.
export default function sanityLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("https://cdn.sanity.io")) {
    return `${src}?w=${width}&q=${quality ?? 80}&auto=format`;
  }
  return src;
}
