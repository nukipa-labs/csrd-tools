// Shared SEO/GEO constants and JSON-LD building blocks.
// Single source of truth for the canonical URL, indexability toggle, the
// "last reviewed" date (a genuine manual review stamp, NOT auto-generated),
// the enriched Organization graph, and the editorial author used in schema.

export const SITE_URL = 'https://csrd-tools.com';

// true once the site is live and should be indexed. When true: no robots
// noindex meta (layout) and robots.txt allows crawling + exposes the sitemap.
// When false: every page is noindex and robots.txt disallows all.
export const SITE_LIVE = true;

// Genuine last-review date. Bump this only when the content has actually been
// re-checked against primary sources (EUR-Lex / EFRAG / European Commission /
// Council) - it must not be an auto-stamp. Used in schema dateModified and the
// visible "Last reviewed" byline.
export const LAST_REVIEWED_ISO = '2026-06-08';
export const LAST_REVIEWED_LABEL = '8 June 2026';
export const FIRST_PUBLISHED_ISO = '2026-06-08';

export const EDITOR_NAME = 'CSRD Tools editorial team';

// Author/reviewer used as author + reviewedBy in Article schema across the site.
export const EDITOR_ORG = {
  '@type': 'Organization',
  name: EDITOR_NAME,
  url: `${SITE_URL}/about`
} as const;

// Enriched Organization graph: sameAs, postal address, contact, imprint link,
// and the operating legal entity (Nukipa Labs GmbH).
export const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'CSRD Tools',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/brand/og.png`,
    width: 1200,
    height: 630
  },
  image: `${SITE_URL}/brand/og.png`,
  description:
    'Independent, free, plain-English hub and tools for the EU Corporate Sustainability Reporting Directive (CSRD), the ESRS standards and the Omnibus changes.',
  slogan: 'Find your way through EU sustainability reporting.',
  email: 'contact@nukipalabs.com',
  sameAs: [
    'https://github.com/nukipa-labs/csrd-tools',
    `${SITE_URL}/legal/imprint`
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gunta-Stoelzl-Strasse 7',
    postalCode: '80807',
    addressLocality: 'Muenchen',
    addressCountry: 'DE'
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'Nukipa Labs GmbH',
    url: `${SITE_URL}/legal/imprint`
  }
};

export const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'CSRD Tools',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  description:
    'Plain-English answers, free tools and trustworthy updates on the EU Corporate Sustainability Reporting Directive and the ESRS.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/glossary?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

/** Build a FAQPage node from {q, a} pairs. */
export function faqPageLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
}

/** Build a BreadcrumbList from [name, path] pairs (path relative to SITE_URL). */
export function breadcrumbLd(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`
    }))
  };
}
