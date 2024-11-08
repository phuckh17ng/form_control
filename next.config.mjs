/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "form-control-api.vercel.app",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
