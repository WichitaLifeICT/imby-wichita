/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static prototype — no server code — so we export a static site
  // that Vercel can serve directly from the epe-membership/ subfolder.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
