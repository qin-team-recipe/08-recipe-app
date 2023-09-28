/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { typedRoutes: true, serverActions: true },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default config;
