/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3005",
        pathname: "/media/**",
      },
      // Cloudflare R2 public CDN
      {
        protocol: "https",
        hostname: "*.r2.dev",
        pathname: "/**",
      },
      // CMS media fallback
      { protocol: "https", hostname: "**", pathname: "/media/**" },
    ],
  },
  env: {
    NEXT_PUBLIC_CMS_URL:
      process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001",
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

module.exports = nextConfig;
