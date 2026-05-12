/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
      {
        protocol: 'https',
        hostname: 'next.minimog.co',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
