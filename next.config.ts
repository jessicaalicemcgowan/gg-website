import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images are served and resized by the Sanity CDN (see src/lib/sanityLoader.ts).
  images: {
    loader: "custom",
    loaderFile: "./src/lib/sanityLoader.ts",
  },
};

export default nextConfig;
