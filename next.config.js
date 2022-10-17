/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
