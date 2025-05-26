
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // i18n configuration will be handled by middleware and route structure
  // No need for the deprecated i18n object here in Next.js 13+ App Router

  // Add your Cloud Workstation URL to allowedDevOrigins for Fast Refresh
  experimental: {
    allowedDevOrigins: [
      '9083-firebase-studio-1747975805701.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev',
      '9003-firebase-studio-1747975805701.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
