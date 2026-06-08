import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Container,
  Section,
  RevealOnScroll,
  JsonLd,
  NewsletterSignup
} from '@/components/ui';

const SITE = 'https://csrd-tools.com';
const PAGE_URL = `${SITE}/tools`;

export const metadata: Metadata = {
  title: 'CSRD Resources, Tools & Templates | CSRD Tools',
  description:
    'Free, no-email-wall CSRD tools: a scope checker, a Scope 1-2-3 emissions calculator, a materiality matrix builder, a supplier-data toolkit and a plain-English glossary. Use them on the page.',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Free CSRD tools & templates',
    description:
      'Free CSRD tools: scope checker, emissions calculator, materiality matrix builder, supplier toolkit and glossary.',
    url: PAGE_URL,
    type: 'website'
  }
};

// ---- glyphs (compass / contour / chart cues, not emoji) --------------------

function CompassGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.3 5.2-5.2 2.3 2.3-5.2 5.2-2.3Z" />
    </svg>
  );
}

function ChartGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="m7 15 3-4 3 2 4-6" />
    </svg>
  );
}

function GridGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M12 3.5v17M3.5 12h17" />
    </svg>
  );
}

function ContourGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7c4-3 14-3 18 0" />
      <path d="M5 12c3.5-2.4 10.5-2.4 14 0" />
      <path d="M7 17c2.8-1.8 7.2-1.8 10 0" />
    </svg>
  );
}

function BookGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

type Tool = {
  title: string;
  value: string;
  href: string;
  glyph: ReactNode;
};

const TOOLS: Tool[] = [
  {
    title: 'CSRD Scope Checker',
    value:
      'Answer a few questions and find out whether the CSRD still applies to you after the Omnibus, plus the year your first report is due.',
    href: '/scope-checker',
    glyph: <CompassGlyph />
  },
  {
    title: 'Scope 1, 2 & 3 Emissions Calculator',
    value:
      'Estimate your direct, purchased-energy and value-chain emissions, including a walk through the 15 Scope 3 categories.',
    href: '/emissions-calculator',
    glyph: <ChartGlyph />
  },
  {
    title: 'Materiality Matrix Builder',
    value:
      'Plot your impacts, risks and opportunities on impact and financial axes, then export the matrix for your double materiality assessment.',
    href: '/materiality-matrix-builder',
    glyph: <GridGlyph />
  },
  {
    title: 'For Suppliers (VSME)',
    value:
      'Being asked for sustainability data by a big customer? Find out if you even have to respond, learn about the value-chain cap, and copy-paste a reply.',
    href: '/suppliers',
    glyph: <MailGlyph />
  },
  {
    title: 'The ESRS Standards',
    value:
      'The 12 European Sustainability Reporting Standards mapped out: the two cross-cutting ones plus E1-E5, S1-S4 and G1, each in plain English.',
    href: '/esrs',
    glyph: <ContourGlyph />
  },
  {
    title: 'Double Materiality',
    value:
      'What double materiality means, how to run a double materiality assessment (DMA), and how impact and financial materiality differ.',
    href: '/double-materiality',
    glyph: <GridGlyph />
  },
  {
    title: 'EU Taxonomy',
    value:
      'The six environmental objectives, eligibility versus alignment, DNSH and the turnover, capex and opex KPIs CSRD companies report.',
    href: '/eu-taxonomy',
    glyph: <ChartGlyph />
  },
  {
    title: 'Deadlines & Timeline',
    value:
      'The post-Omnibus reporting timeline: who reports when, the FY2027 first reports, transposition by 19 March 2027 and the ESRS revision.',
    href: '/deadlines',
    glyph: <ContourGlyph />
  },
  {
    title: 'CSRD & ESG Glossary',
    value:
      'Every term decoded in plain English: ESRS, DMA, IRO, DNSH, VSME, double materiality, Scope 1-2-3, limited assurance, XBRL and more.',
    href: '/glossary',
    glyph: <BookGlyph />
  }
];

export default function ToolsPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free CSRD tools and templates',
    url: PAGE_URL,
    itemListElement: TOOLS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.title,
      url: `${SITE}${t.href}`
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: PAGE_URL
      }
    ]
  };

  return (
    <>
      <JsonLd data={[itemListSchema, breadcrumbSchema]} />

      <Container size="lg" className="pt-16 lg:pt-20">
        <header className="max-w-3xl">
          <h1 className="font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            CSRD Resources, Tools &amp; Templates
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            Everything here is free and works on the page. These tools and resources only ask for
            your email if you want a result or a PDF sent to you. Pick the one that matches what you
            need right now, whether that is checking your scope, building a materiality matrix or
            working out your emissions.
          </p>
        </header>
      </Container>

      <Section background="paper" containerSize="lg">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <RevealOnScroll key={tool.href} delay={i}>
              <li className="h-full list-none">
                <Link
                  href={tool.href}
                  className="group flex h-full flex-col rounded-card border border-line bg-card p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-accent hover:shadow-[0_12px_32px_-10px_rgba(15,42,63,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-low">
                    {tool.glyph}
                  </span>
                  <h2 className="mt-4 font-display font-semibold text-xl text-ink">
                    {tool.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                    {tool.value}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-semibold text-primary transition-colors group-hover:text-accent-deep">
                    Open
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </li>
            </RevealOnScroll>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl text-sm text-muted">
          This is guidance to help you understand the CSRD and EU sustainability reporting, not legal
          advice. Confirm with the official sources we link or a qualified adviser.
        </p>
      </Section>

      <NewsletterSignup
        variant="band"
        heading="New tools land in The CSRD Brief first"
        subcopy="We watch Brussels so you don't. Get the next tool, template and rule change by email, free."
        source="tools"
      />
    </>
  );
}
