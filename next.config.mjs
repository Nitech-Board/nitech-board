/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/search",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
