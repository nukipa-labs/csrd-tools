// Content-hub nav structure. Groups with dropdown panels (NOT mega-glass).
// Every href has a route created elsewhere in the build so no 404-guarding is
// needed.

export type NavLink = { label: string; href: string; note?: string };
export type NavGroup = {
  label: string;
  href: string; // group landing (clicking the group label goes here)
  items?: NavLink[]; // dropdown panel items
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'CSRD',
    href: '/csrd',
    items: [
      { label: 'What is the CSRD?', href: '/csrd' },
      { label: 'The Omnibus changes', href: '/omnibus' },
      { label: 'Deadlines & timeline', href: '/deadlines' },
      { label: 'Glossary', href: '/glossary' }
    ]
  },
  {
    label: 'ESRS & Reporting',
    href: '/esrs',
    items: [
      { label: 'The ESRS standards', href: '/esrs' },
      { label: 'ESRS E1: Climate change', href: '/esrs/e1-climate-change' },
      { label: 'Double materiality', href: '/double-materiality' },
      { label: 'EU Taxonomy', href: '/eu-taxonomy' },
      { label: 'Frameworks compared', href: '/esg-reporting-frameworks' },
      { label: 'Sustainability reporting', href: '/sustainability-reporting' }
    ]
  },
  {
    label: 'Emissions',
    href: '/scope-1-2-3-emissions',
    items: [
      { label: 'Scope 1, 2 & 3 emissions', href: '/scope-1-2-3-emissions' },
      { label: 'The GHG Protocol', href: '/ghg-protocol' },
      { label: 'Emissions calculator', href: '/emissions-calculator' }
    ]
  },
  {
    label: 'Tools',
    href: '/tools',
    items: [
      { label: 'CSRD scope checker', href: '/scope-checker' },
      { label: 'Emissions calculator', href: '/emissions-calculator' },
      { label: 'Materiality matrix builder', href: '/materiality-matrix-builder' },
      { label: 'For suppliers (VSME)', href: '/suppliers' }
    ]
  },
  {
    label: 'About',
    href: '/about'
  }
];

export const SUBSCRIBE_HREF = '/subscribe';

export const PRIMARY_CTA = { label: 'Am I in scope?', href: '/scope-checker' };

// Footer columns mirror the nav groups.
export const FOOTER_COLUMNS: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Understand',
    links: [
      { label: 'What is the CSRD?', href: '/csrd' },
      { label: 'The Omnibus changes', href: '/omnibus' },
      { label: 'Deadlines', href: '/deadlines' },
      { label: 'ESRS standards', href: '/esrs' },
      { label: 'Glossary', href: '/glossary' }
    ]
  },
  {
    heading: 'Reporting',
    links: [
      { label: 'Double materiality', href: '/double-materiality' },
      { label: 'EU Taxonomy', href: '/eu-taxonomy' },
      { label: 'Frameworks compared', href: '/esg-reporting-frameworks' },
      { label: 'Sustainability reporting', href: '/sustainability-reporting' },
      { label: 'Scope 1, 2 & 3 emissions', href: '/scope-1-2-3-emissions' },
      { label: 'GHG Protocol', href: '/ghg-protocol' }
    ]
  },
  {
    heading: 'Tools',
    links: [
      { label: 'CSRD scope checker', href: '/scope-checker' },
      { label: 'Emissions calculator', href: '/emissions-calculator' },
      { label: 'Materiality matrix builder', href: '/materiality-matrix-builder' },
      { label: 'For suppliers', href: '/suppliers' }
    ]
  },
  {
    heading: 'The CSRD Brief',
    links: [
      { label: 'Subscribe', href: '/subscribe' }
    ]
  },
  {
    heading: 'About',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Imprint', href: '/legal/imprint' }
    ]
  }
];
