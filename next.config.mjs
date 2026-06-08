/** @type {import('next').NextConfig} */
const nextConfig = {
  // Baked in for the deployed build (.env.local is gitignored, never reaches prod).
  // The gateway resolves this tenant from any csrd.* subdomain.
  env: {
    NUKIPA_GATEWAY_URL:             'https://api.nukipa.com',
    NEXT_PUBLIC_NUKIPA_GATEWAY_URL: 'https://api.nukipa.com',
    NUKIPA_TENANT_HOST:             'csrd.nukipa.com',
  },
  // Tenants serve images from their own assets, the Nukipa storage bucket,
  // and the customer's existing CDN (logos/OG images sometimes hot-link
  // during the first pass). Add specific allow-listed remotePatterns
  // before going live in production.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};

export default nextConfig;
