import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.ophim.live',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.ophim1.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.ophim10.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
