/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  /* image url */
  images: {
    domains: ['localhost', 'cdn.sanity.io'],
  },
}

module.exports = nextConfig
