/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { typedRoutes: true, serverActions: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1rgfhxamwr44reom.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
export default config;
