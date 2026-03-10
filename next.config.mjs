import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bsc.deployer3000.halvooo.com',
      },
    ],
  },
}

export default withPayload(nextConfig)
