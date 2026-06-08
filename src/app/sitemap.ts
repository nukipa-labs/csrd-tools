import type { MetadataRoute } from 'next';
import { ESRS_STANDARDS } from '@/lib/esrs';

const BASE = 'https://csrd-tools.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/csrd', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/omnibus', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/deadlines', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/esrs', priority: 0.9, changeFrequency: 'monthly' },
    // ESRS standard subpages added below
    { path: '/double-materiality', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/scope-1-2-3-emissions', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ghg-protocol', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/eu-taxonomy', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/sustainability-reporting', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/esg-reporting-frameworks', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/scope-checker', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/emissions-calculator', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/materiality-matrix-builder', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/suppliers', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/glossary', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/subscribe', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/imprint', priority: 0.3, changeFrequency: 'yearly' }
  ];

  for (const s of ESRS_STANDARDS) {
    routes.push({ path: `/esrs/${s.slug}`, priority: 0.7, changeFrequency: 'monthly' });
  }

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority
  }));
}
