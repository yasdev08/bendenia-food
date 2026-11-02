import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    // Only /photos may be optimized. Query strings are allowed there because
    // lib/photos.ts appends a per-file content hash (?v=…) for cache busting.
    localPatterns: [{ pathname: "/photos/**" }],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
