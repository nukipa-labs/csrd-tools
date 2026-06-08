import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Container,
  Section,
  Button,
  TLDR,
  Callout,
  SourceCite,
  Sources,
  JsonLd,
  RevealOnScroll,
  ContourBackground,
  NewsletterSignup,
  Stat,
  Stats,
  Prose,
  Icon
} from '@/components/ui';

const SITE = 'https://csrd-tools.com';
const PUBLISHED = '2025-09-01';
const MODIFIED = '2026-06-08';

const SRC = {
  ecReporting:
    'https://finance.ec.europa.eu/financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en',
  gri: 'https://www.globalreporting.org/standards/',
  issb: 'https://www.ifrs.org/groups/international-sustainability-standards-board/',
  esrs1: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R2772',
  consilium:
    'https://www.consilium.europa.eu/en/press/press-releases/2026/02/24/council-signs-off-simplification-of-sustainability-reporting-and-due-diligence-requirements-to-boost-eu-competitiveness/'
};

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: 'What is sustainability reporting?',
    a: 'Sustainability reporting is the practice of disclosing a company environmental, social and governance (ESG) performance, impacts, risks and strategy alongside its financial reporting, so investors, regulators, customers and the public can assess the business beyond its profit and loss. It increasingly follows standardised frameworks such as the ESRS, GRI and ISSB.'
  },
  {
    q: 'Is sustainability reporting mandatory?',
    a: 'It depends on where you operate and your size. In the EU, CSRD makes it mandatory for large companies above the thresholds. Globally, ISSB standards are being adopted in 30-plus jurisdictions. Elsewhere, frameworks such as GRI remain voluntary. Many smaller companies report voluntarily, often using the VSME standard, or because customers ask.'
  },
  {
    q: 'What frameworks exist for sustainability reporting?',
    a: 'The major frameworks are CSRD/ESRS (the EU mandatory regime, double materiality), the ISSB IFRS S1 and S2 (investor-focused, financial materiality), GRI (the most-used voluntary impact standard), and the legacy TCFD and SASB, both now folded into the ISSB. VSME is the EU voluntary standard for smaller companies.'
  },
  {
    q: 'What goes in a sustainability report?',
    a: 'A typical sustainability report covers governance of sustainability, strategy and business model (including a transition plan), the materiality assessment and material topics, policies, actions and targets per topic, metrics such as Scope 1/2/3 emissions, energy, water, waste, diversity and safety, value-chain and due-diligence information, often EU Taxonomy KPIs, and a third-party assurance statement.'
  },
  {
    q: 'What is the difference between GRI, ISSB and CSRD?',
    a: 'GRI focuses on impact materiality for a broad stakeholder audience and is voluntary. ISSB focuses on financial materiality for investors and is mandatory where jurisdictions adopt it. CSRD/ESRS is the EU mandatory regime and is unique in requiring double materiality, both impact and financial, so it effectively spans the other two lenses.'
  },
  {
    q: 'Where does CSRD fit in the landscape?',
    a: 'CSRD is the most comprehensive regime and is consolidating the field. Because it requires double materiality, an ESRS report can cover much of GRI (impact) and ISSB (financial) with mapping. ESRS E1 and IFRS S2 share the TCFD architecture, and EFRAG has interoperability guidance with both GRI and the ISSB to reduce double-reporting.'
  }
];

export const metadata: Metadata = {
  title: 'Sustainability reporting: a plain-English guide | CSRD Tools',
  description:
    'What sustainability reporting is, why it matters, the frameworks landscape (CSRD/ESRS, GRI, ISSB, VSME, TCFD), what a report contains, and where CSRD fits. A top-of-funnel hub.',
  alternates: { canonical: `${SITE}/sustainability-reporting` },
  openGraph: {
    type: 'article',
    title: 'Sustainability reporting: a plain-English guide | CSRD Tools',
    description:
      'What sustainability reporting is, the frameworks landscape, what a report contains, and where CSRD/ESRS fits. Sourced and kept current.',
    url: `${SITE}/sustainability-reporting`,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    images: [{ url: '/brand/og.svg', width: 1200, height: 630, alt: 'CSRD Tools' }]
  }
};

export default function SustainabilityReportingPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sustainability reporting: a plain-English guide',
    description:
      'What sustainability reporting is, why it matters, the frameworks landscape, what a report contains, and where CSRD/ESRS fits.',
    inLanguage: 'en',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/sustainability-reporting` },
    author: { '@type': 'Organization', name: 'CSRD Tools', url: SITE },
    publisher: { '@type': 'Organization', name: 'CSRD Tools', url: SITE }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sustainability reporting',
        item: `${SITE}/sustainability-reporting`
      }
    ]
  };

  return (
    <>
      <JsonLd data={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <header className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container size="md" className="relative z-10 py-16 lg:py-24">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Start here
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-6xl text-ink leading-tight">
            Sustainability reporting, explained
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">
            Sustainability reporting is how companies disclose their environmental, social and
            governance performance alongside their financial results. It is a crowded space of
            frameworks and acronyms; this hub maps the whole landscape in plain English and points you
            to the deeper guides for each piece, including where the EU{' '}
            <Link href="/csrd">CSRD</Link> fits.{' '}
            <SourceCite href={SRC.ecReporting}>European Commission</SourceCite>
          </p>

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                <li>
                  <strong className="font-semibold">What:</strong> disclosing ESG performance, impacts,
                  risks and strategy alongside financials.
                </li>
                <li>
                  <strong className="font-semibold">Why:</strong> investors, regulators and customers
                  want comparable, decision-useful, audited data.
                </li>
                <li>
                  <strong className="font-semibold">The frameworks:</strong> CSRD/ESRS, GRI, ISSB
                  (IFRS S1/S2), VSME, and legacy TCFD and SASB.
                </li>
                <li>
                  <strong className="font-semibold">Where CSRD fits:</strong> the most comprehensive
                  regime, unique for double materiality.
                </li>
              </ul>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/esg-reporting-frameworks" variant="primary">
              Compare the frameworks
            </Button>
            <Button href="/scope-checker" variant="secondary">
              Am I in scope for CSRD?
            </Button>
          </div>
        </Container>
      </header>

      {/* What + why */}
      <Section background="paper">
        <Prose className="max-w-3xl">
          <RevealOnScroll>
            <h2 id="what-it-is" className="inline-flex items-center gap-2">
              <Icon name="description" className="text-primary text-2xl" />
              What sustainability reporting is
            </h2>
            <p>
              Sustainability reporting is the practice of disclosing a company environmental, social
              and governance (ESG) performance, impacts, risks and strategy alongside its financial
              reporting, so investors, regulators, customers and the public can assess the business
              beyond its profit and loss. Over the past decade it has shifted from glossy voluntary
              brochures toward standardised, audited, machine-readable disclosure.{' '}
              <SourceCite href={SRC.ecReporting}>European Commission</SourceCite>
            </p>

            <h2 id="why-it-matters" className="inline-flex items-center gap-2">
              <Icon name="trending_up" className="text-primary text-2xl" />
              Why it matters
            </h2>
            <p>
              The logic is simple: to allocate capital and manage risk, stakeholders need reliable,
              comparable sustainability data, just as they rely on audited financial statements.
              Regulation, investor demand and customer pressure have all converged, so sustainability
              data is increasingly mandatory, assured, and tied directly into corporate reporting
              rather than sitting in a separate report.
            </p>
          </RevealOnScroll>
        </Prose>

        {/* The frameworks landscape */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="frameworks" className="inline-flex items-center gap-2">
              <Icon name="dashboard" className="text-primary text-2xl" />
              The frameworks landscape
            </h2>
            <p>
              Several major frameworks coexist. The practical question is which apply to you and how
              they relate. Here is the short version; for a side-by-side comparison see our{' '}
              <Link href="/esg-reporting-frameworks">ESG reporting frameworks page</Link>.
            </p>
          </RevealOnScroll>
        </Prose>

        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                t: 'CSRD / ESRS',
                d: 'The EU mandatory regime. Unique for requiring double materiality (impact and financial). The most comprehensive standard, and the one consolidating the field.',
                href: '/csrd'
              },
              {
                t: 'ISSB (IFRS S1 / S2)',
                d: 'The global baseline of investor-focused, financial-materiality disclosures from the IFRS Foundation. Being adopted across 30-plus jurisdictions.',
                href: '/esg-reporting-frameworks'
              },
              {
                t: 'GRI',
                d: 'The longest-established, most-used voluntary standard. Impact-materiality focus, broad stakeholder audience. Interoperable with ESRS.',
                href: '/esg-reporting-frameworks'
              },
              {
                t: 'VSME',
                d: 'The EU voluntary standard for smaller companies, also acting as the value-chain cap: a ceiling on what large companies can demand from small suppliers.',
                href: '/suppliers'
              },
              {
                t: 'TCFD',
                d: 'The four-pillar climate framework, now absorbed into ISSB IFRS S2 and reflected in the ESRS structure. The task force itself has been disbanded.',
                href: '/esg-reporting-frameworks'
              },
              {
                t: 'SASB',
                d: 'Industry-specific financial-materiality metrics, now consolidated under the ISSB. No longer a standalone destination.',
                href: '/esg-reporting-frameworks'
              }
            ].map((c) => (
              <Link
                key={c.t}
                href={c.href}
                className="block rounded-card border border-line bg-card p-6 transition-colors hover:border-accent"
              >
                <h3 className="font-display text-xl font-semibold text-ink">{c.t}</h3>
                <p className="mt-2 text-sm text-ink/90 leading-relaxed">{c.d}</p>
              </Link>
            ))}
          </div>
        </RevealOnScroll>

        {/* What a report contains */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="report-contents" className="inline-flex items-center gap-2">
              <Icon name="list_alt" className="text-primary text-2xl" />
              What a sustainability report contains
            </h2>
            <p>
              Whatever the framework, a sustainability report typically covers the same building
              blocks. Under CSRD these map onto the <Link href="/esrs">ESRS</Link> structure of
              governance, strategy, impact/risk/opportunity management, and metrics and targets.
            </p>
            <ul>
              <li>Governance of sustainability (board oversight, management roles).</li>
              <li>Strategy and business model, including the transition plan and resilience.</li>
              <li>
                The <Link href="/double-materiality">materiality assessment</Link> and material topics.
              </li>
              <li>Policies, actions and targets per topic.</li>
              <li>
                Metrics:{' '}
                <Link href="/scope-1-2-3-emissions">GHG emissions (Scopes 1, 2 and 3)</Link>, energy,
                water, waste, diversity, safety.
              </li>
              <li>Value-chain and due-diligence information.</li>
              <li>
                Often <Link href="/eu-taxonomy">EU Taxonomy</Link> KPIs and third-party assurance.
              </li>
            </ul>
          </RevealOnScroll>

          {/* Where CSRD fits + convergence */}
          <RevealOnScroll>
            <h2 id="where-csrd-fits" className="inline-flex items-center gap-2">
              <Icon name="hub" className="text-primary text-2xl" />
              Where CSRD fits, and why frameworks are converging
            </h2>
            <p>
              CSRD is the most far-reaching sustainability-disclosure law in the world. Because it
              requires double materiality, an ESRS report effectively spans both the GRI impact lens
              and the ISSB financial lens, so a CSRD reporter can usually satisfy much of GRI and ISSB
              with incremental mapping. ESRS E1 and IFRS S2 share the TCFD architecture, and EFRAG has
              interoperability guidance with both GRI and the ISSB to cut double-reporting.{' '}
              <SourceCite href={SRC.esrs1}>ESRS Set 1, Delegated Reg. (EU) 2023/2772</SourceCite>
            </p>
            <p>
              The practical takeaway: build one data architecture, tag each datapoint to the
              frameworks that apply, and report once. New here? Start with{' '}
              <Link href="/csrd">what CSRD is</Link>, check{' '}
              <Link href="/scope-checker">whether you are in scope</Link>, then read up on{' '}
              <Link href="/double-materiality">double materiality</Link>.
            </p>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="warn" title="The EU rules are in flux">
              The Omnibus I Directive (Directive (EU) 2026/470) narrowed CSRD scope sharply and the
              revised ESRS, in public consultation from 6 May 2026, cuts mandatory datapoints by more
              than 60 percent, with a final delegated act expected around mid to late 2026 (applying
              FY2027). If you read older guidance, check it against the current position. We track
              every change in The CSRD Brief.{' '}
              <SourceCite href={SRC.consilium}>Council of the EU</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Explore the hub */}
      <Section background="sand" eyebrow="Go deeper" title="Explore the rest of the hub">
        <RevealOnScroll>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: 'What is CSRD?', d: 'The EU regime, post-Omnibus.', href: '/csrd', icon: 'gavel' },
              { t: 'The ESRS standards', d: 'The 12-standard map.', href: '/esrs', icon: 'menu_book' },
              { t: 'Double materiality', d: 'The DMA, step by step.', href: '/double-materiality', icon: 'balance' },
              { t: 'Scope 1, 2 and 3', d: 'The carbon footprint, explained.', href: '/scope-1-2-3-emissions', icon: 'co2' },
              { t: 'GHG Protocol', d: 'Boundaries and inventories.', href: '/ghg-protocol', icon: 'inventory_2' },
              { t: 'EU Taxonomy', d: 'Eligibility, alignment, KPIs.', href: '/eu-taxonomy', icon: 'eco' },
              { t: 'Frameworks compared', d: 'CSRD vs GRI vs ISSB.', href: '/esg-reporting-frameworks', icon: 'compare_arrows' },
              { t: 'For suppliers', d: 'Asked for data? Start here.', href: '/suppliers', icon: 'forward' },
              { t: 'Tools', d: 'Free, ungated calculators.', href: '/tools', icon: 'build' }
            ].map((c) => (
              <Link
                key={c.t}
                href={c.href}
                className="flex items-start gap-3 rounded-card border border-line bg-card p-5 transition-colors hover:border-accent"
              >
                <Icon name={c.icon} className="text-primary text-2xl shrink-0" />
                <span>
                  <span className="block font-display font-semibold text-ink">{c.t}</span>
                  <span className="mt-1 block text-sm text-ink/80">{c.d}</span>
                </span>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </Section>

      {/* FAQ */}
      <Section background="paper" eyebrow="FAQ" title="People also ask">
        <div className="mx-auto max-w-3xl">
          <dl className="divide-y divide-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-display text-lg font-semibold text-ink list-none">
                  <span>{f.q}</span>
                  <Icon
                    name="expand_more"
                    className="text-primary text-2xl shrink-0 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-2 text-ink/90 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </dl>
        </div>
      </Section>

      {/* Sources + closing */}
      <Section background="paper">
        <div className="mx-auto max-w-3xl">
          <Callout variant="info" title="This is guidance, not legal advice">
            This page is a plain-English orientation to sustainability reporting; it is not legal
            advice. For decisions specific to your business, confirm with the official sources we link
            or a qualified adviser.
          </Callout>

          <Sources
            items={[
              {
                href: SRC.ecReporting,
                label: 'European Commission: Corporate sustainability reporting',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.gri,
                label: 'Global Reporting Initiative (GRI) Standards',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.issb,
                label: 'IFRS Foundation: International Sustainability Standards Board (ISSB)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.esrs1,
                label: 'Delegated Regulation (EU) 2023/2772 (ESRS Set 1)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.consilium,
                label: 'Council of the EU: sign-off of the Omnibus simplification (24 Feb 2026)',
                retrieved: '8 Jun 2026'
              }
            ]}
          />
        </div>
      </Section>

      <NewsletterSignup
        variant="band"
        background="forest"
        heading="One email to stay on top of the whole space"
        subcopy="The CSRD Brief: plain-English updates on CSRD, ESRS, the EU Taxonomy and the Omnibus. We watch Brussels so you don't."
        source="sustainability-reporting"
      />
    </>
  );
}
