/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove swcMinify as it's deprecated
  images: {
    // Replace domains with remotePatterns
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
    // Add unoptimized flag for GIF images
    unoptimized: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable static export
  output: 'export',
};

export default nextConfig;
