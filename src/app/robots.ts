import type { MetadataRoute } from 'next';
import { SITE_URL, SITE_LIVE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Until the public domain is live, disallow all crawling so the preview is
  // not indexed. Flip SITE_LIVE in lib/seo.ts to open it up.
  if (!SITE_LIVE) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
