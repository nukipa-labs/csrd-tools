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
  Icon,
  Byline
} from '@/components/ui';
import { EDITOR_ORG, LAST_REVIEWED_ISO, FIRST_PUBLISHED_ISO } from '@/lib/seo';

const SITE = 'https://csrd-tools.com';
const PUBLISHED = FIRST_PUBLISHED_ISO;
const MODIFIED = LAST_REVIEWED_ISO;

const SRC = {
  ghgCorporate: 'https://ghgprotocol.org/corporate-standard',
  scope3Standard: 'https://ghgprotocol.org/corporate-value-chain-scope-3-standard',
  scope2Guidance: 'https://ghgprotocol.org/scope-2-guidance',
  epaBoundaries: 'https://www.epa.gov/climateleadership/determine-organizational-boundaries',
  phase1: 'https://ghgprotocol.org/sites/default/files/2025-12/CS-Phase1-ProgressUpdate.pdf',
  esrs1: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R2772'
};

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: 'What is the GHG Protocol?',
    a: 'The Greenhouse Gas (GHG) Protocol is the world most widely used carbon-accounting framework. It provides the standardised methodology for measuring and reporting corporate greenhouse-gas emissions, defining the three scopes and the rules for building an organisational inventory. It underpins CSRD ESRS E1, ISSB IFRS S2 and the Science Based Targets initiative.'
  },
  {
    q: 'Who created the GHG Protocol?',
    a: 'The GHG Protocol was developed by the World Resources Institute (WRI) and the World Business Council for Sustainable Development (WBCSD). It has been maintained and expanded by these bodies since the early 2000s and is now the de facto global standard for corporate carbon accounting.'
  },
  {
    q: 'What is the GHG Protocol Corporate Standard?',
    a: 'The Corporate Accounting and Reporting Standard, known as the Corporate Standard, defines Scope 1 and Scope 2 and the rules for an organisational inventory: setting boundaries, choosing a base year, and accounting consistently. It is complemented by the Corporate Value Chain (Scope 3) Standard and the Scope 2 Guidance.'
  },
  {
    q: 'What is the difference between operational control, financial control and equity share?',
    a: 'These are the three consolidation approaches for organisational boundaries. Equity share accounts for emissions in proportion to your ownership interest. Financial control accounts for 100 percent of operations you financially control. Operational control accounts for 100 percent of operations where you can set operating policies, and is the most common in practice. You pick one and apply it consistently.'
  },
  {
    q: 'What is a greenhouse gas inventory?',
    a: 'A GHG inventory is a structured account of all the greenhouse-gas emissions a company is responsible for in a reporting period. Built using the GHG Protocol Corporate Standard, it sets organisational and operational boundaries, chooses a base year, collects activity data, applies emission factors, and reports emissions by scope. It is the foundation behind every climate target and CSRD E1-6 disclosure.'
  },
  {
    q: 'Does CSRD require the GHG Protocol?',
    a: 'Effectively yes. ESRS E1-6 requires GHG emissions to be measured in line with the GHG Protocol (or ISO 14064-1). So the GHG Protocol is the calculation engine behind CSRD climate disclosure, just as it is behind ISSB IFRS S2 and the SBTi.'
  },
  {
    q: 'What is a base year?',
    a: 'A base year is the representative reference year (or multi-year average) against which you track emissions progress and set targets. You also define a base-year recalculation policy so that structural changes such as acquisitions, divestitures or methodology updates are restated, keeping trends comparable over time.'
  }
];

export const metadata: Metadata = {
  title: 'GHG Protocol and greenhouse gas inventory explained | CSRD Tools',
  description:
    'A plain-English guide to the GHG Protocol: the Corporate Standard, the three scopes, organisational boundaries (control vs equity), and how to build a greenhouse gas inventory for ESRS E1.',
  alternates: { canonical: `${SITE}/ghg-protocol` },
  openGraph: {
    type: 'article',
    title: 'GHG Protocol and greenhouse gas inventory explained | CSRD Tools',
    description:
      'The Corporate Standard, the scopes, control vs equity boundaries, and building a GHG inventory for CSRD ESRS E1. Sourced and kept current.',
    url: `${SITE}/ghg-protocol`,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'CSRD Tools' }]
  }
};

export default function GhgProtocolPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'GHG Protocol and greenhouse gas inventory explained',
    description:
      'A plain-English guide to the GHG Protocol: the Corporate Standard, the three scopes, organisational boundaries and how to build a greenhouse gas inventory.',
    inLanguage: 'en',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/ghg-protocol` },
    author: EDITOR_ORG,
    reviewedBy: EDITOR_ORG,
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
      { '@type': 'ListItem', position: 2, name: 'GHG Protocol', item: `${SITE}/ghg-protocol` }
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
            The plain-English explainer
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-6xl text-ink leading-tight">
            The GHG Protocol and the greenhouse gas inventory
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">
            The GHG Protocol is the world standard for corporate carbon accounting. It defines the
            three <Link href="/scope-1-2-3-emissions">scopes</Link>, the rules for setting boundaries,
            and how to build a greenhouse gas inventory. CSRD leans on it directly: ESRS E1-6 requires
            emissions measured in line with the GHG Protocol.{' '}
            <SourceCite href={SRC.ghgCorporate}>GHG Protocol</SourceCite>
          </p>

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                <li>
                  <strong className="font-semibold">What:</strong> the global carbon-accounting
                  framework from WRI and WBCSD.
                </li>
                <li>
                  <strong className="font-semibold">Key standards:</strong> Corporate Standard, Scope
                  3 Standard, Scope 2 Guidance.
                </li>
                <li>
                  <strong className="font-semibold">Boundaries:</strong> pick one approach, equity
                  share, financial control or operational control, and apply it consistently.
                </li>
                <li>
                  <strong className="font-semibold">Inventory:</strong> boundaries, base year,
                  activity data, emission factors, calculate, document.
                </li>
                <li>
                  <strong className="font-semibold">CSRD link:</strong> ESRS E1-6 requires the GHG
                  Protocol (or ISO 14064-1).
                </li>
              </ul>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/emissions-calculator" variant="primary">
              Start your inventory
            </Button>
            <Button href="/scope-1-2-3-emissions" variant="secondary">
              Read the scopes guide
            </Button>
          </div>

          <div className="mt-8">
            <Byline />
          </div>
        </Container>
      </header>

      {/* What it is + standards */}
      <Section background="paper">
        <Prose className="max-w-3xl">
          <RevealOnScroll>
            <h2 id="what-it-is" className="inline-flex items-center gap-2">
              <Icon name="menu_book" className="text-primary text-2xl" />
              What the GHG Protocol is
            </h2>
            <p>
              The Greenhouse Gas Protocol is the most widely used carbon-accounting framework in the
              world, developed by the World Resources Institute (WRI) and the World Business Council
              for Sustainable Development (WBCSD). It provides the standardised methodology for
              measuring and reporting corporate greenhouse-gas emissions, and it is the common
              foundation under CSRD, ISSB and the Science Based Targets initiative.{' '}
              <SourceCite href={SRC.ghgCorporate}>GHG Protocol Corporate Standard</SourceCite>
            </p>

            <h2 id="standards" className="inline-flex items-center gap-2">
              <Icon name="library_books" className="text-primary text-2xl" />
              The key standards
            </h2>
            <p>The GHG Protocol is a family of standards. The ones that matter most for corporate reporting are:</p>
            <ul>
              <li>
                <strong>Corporate Accounting and Reporting Standard</strong> (the Corporate Standard):
                defines Scope 1 and 2 and the rules for an organisational inventory.
              </li>
              <li>
                <strong>Corporate Value Chain (Scope 3) Standard</strong>: the{' '}
                <Link href="/scope-1-2-3-emissions">15 Scope 3 categories</Link>.
              </li>
              <li>
                <strong>Scope 2 Guidance</strong>: the location-based and market-based methods.
              </li>
              <li>
                Plus the Project, Product Life-Cycle and sector-specific standards.
              </li>
            </ul>
          </RevealOnScroll>
        </Prose>

        {/* Scopes recap */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="scopes" className="inline-flex items-center gap-2">
              <Icon name="co2" className="text-primary text-2xl" />
              The three scopes, in brief
            </h2>
            <p>
              The GHG Protocol splits emissions into three scopes so they are counted once: Scope 1 is
              direct emissions from owned or controlled sources; Scope 2 is indirect emissions from
              purchased energy; and Scope 3 is all other value-chain emissions, usually the largest
              share. For the full breakdown, including the 15 Scope 3 categories and the two Scope 2
              methods, see our <Link href="/scope-1-2-3-emissions">Scope 1, 2 and 3 guide</Link>.{' '}
              <SourceCite href={SRC.scope2Guidance}>GHG Protocol Scope 2 Guidance</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        {/* Boundaries */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="boundaries" className="inline-flex items-center gap-2">
              <Icon name="account_tree" className="text-primary text-2xl" />
              Organisational boundaries: control vs equity
            </h2>
            <p>
              Before you count anything, you decide which operations are yours. The GHG Protocol gives
              three consolidation approaches; you pick one and apply it consistently across all scopes.
              The choice matters most for leased assets and joint ventures.{' '}
              <SourceCite href={SRC.epaBoundaries}>EPA, organisational boundaries</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="pie_chart" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">Equity share</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Account for emissions in proportion to your percentage ownership or economic interest
                in an operation.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="account_balance" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">Financial control</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Account for 100 percent of operations you financially control, where you can direct
                financial and operating policies to gain economic benefit.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="settings" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">Operational control</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Account for 100 percent of operations where you have authority to introduce and
                implement operating policies. The most common approach in practice.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="warn" title="The GHG Protocol is mid-revision">
              The GHG Protocol is being revised. The Phase 1 progress update of December 2025 signals a
              direction that keeps optionality while potentially eliminating the equity-share approach
              and retaining operational control as a standalone option. Treat current guidance as the
              standard until the revision is finalised. We track it in The CSRD Brief.{' '}
              <SourceCite href={SRC.phase1}>GHG Protocol Phase 1 update</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>

        {/* GHG inventory how-to */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="inventory" className="inline-flex items-center gap-2">
              <Icon name="inventory_2" className="text-primary text-2xl" />
              Building a greenhouse gas inventory
            </h2>
            <p>
              A greenhouse gas inventory is a structured account of all the emissions a company is
              responsible for in a reporting period, the foundational deliverable behind every climate
              target, CSRD E1-6 disclosure and SBTi submission. Building one follows the GHG Protocol
              Corporate Standard in seven steps.{' '}
              <SourceCite href={SRC.ghgCorporate}>GHG Protocol Corporate Standard</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        <RevealOnScroll>
          <ol className="mx-auto max-w-3xl mt-8 space-y-4 list-none p-0">
            {[
              {
                t: 'Set organisational boundaries',
                d: 'Choose a consolidation approach (operational control, financial control or equity share) and apply it consistently to decide which subsidiaries, joint ventures, facilities and vehicles are in.'
              },
              {
                t: 'Set operational boundaries',
                d: 'Classify emission sources into Scope 1, 2 and 3, and decide which Scope 3 categories are relevant and material.'
              },
              {
                t: 'Choose a base year',
                d: 'Pick a representative year (or multi-year average) with good data as the benchmark for tracking progress, and define a base-year recalculation policy to handle structural changes.'
              },
              {
                t: 'Collect activity data',
                d: 'Gather the underlying quantities: litres of fuel, kWh of electricity, business-travel km, tonnes purchased, waste tonnage, spend data. Traceability matters for assurance.'
              },
              {
                t: 'Select emission factors',
                d: 'Apply credible factors (DEFRA, IEA, EPA, IPCC, EXIOBASE for spend-based Scope 3) to convert activity data into tonnes of CO2 equivalent. Document factor sources and versions.'
              },
              {
                t: 'Calculate',
                d: 'Emissions = activity data times emission factor, summed by scope and category. Convert all gases to CO2 equivalent using global warming potential values.'
              },
              {
                t: 'Quality-check, document, report',
                d: 'Keep a methodology log and audit trail; report Scope 2 both location-based and market-based. A weak inventory is the most common reason ESRS E1 fails assurance.'
              }
            ].map((s, i) => (
              <li key={s.t} className="rounded-card border border-line bg-card p-5">
                <div className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-display font-semibold text-paper">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{s.t}</h3>
                    <p className="mt-1 text-sm text-ink/90 leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </RevealOnScroll>

        {/* CSRD link */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="csrd-link" className="inline-flex items-center gap-2">
              <Icon name="link" className="text-primary text-2xl" />
              Relationship to CSRD and ESRS E1
            </h2>
            <p>
              ESRS E1-6 explicitly requires GHG emissions to be measured in line with the GHG Protocol
              (or ISO 14064-1), so the GHG Protocol is effectively the calculation engine behind CSRD
              climate disclosure. Your inventory directly populates{' '}
              <Link href="/esrs/e1-climate-change">ESRS E1</Link>: E1-5 (energy), E1-6 (Scopes 1, 2 and
              3), and it underpins E1-4 targets and the E1-1 transition plan. The same inventory also
              feeds ISSB IFRS S2 and the SBTi.{' '}
              <SourceCite href={SRC.esrs1}>ESRS E1, Delegated Reg. (EU) 2023/2772</SourceCite>
            </p>
            <p>
              Ready to put numbers to it?{' '}
              <Link href="/emissions-calculator">Use the emissions calculator</Link>, or read how the
              scopes break down in our{' '}
              <Link href="/scope-1-2-3-emissions">Scope 1, 2 and 3 guide</Link>.
            </p>
          </RevealOnScroll>
        </Prose>
      </Section>

      {/* By the numbers */}
      <Section background="sand" eyebrow="By the numbers" title="The GHG Protocol in figures">
        <RevealOnScroll>
          <Stats>
            <Stat value="3" label="Scopes defined by the GHG Protocol: direct, purchased energy, value chain." />
            <Stat value="3" label="Consolidation approaches: equity share, financial, operational control." />
            <Stat value="7" label="Steps to build a GHG inventory, from boundaries to reporting." />
            <Stat value="ESRS E1-6" label="The CSRD disclosure that requires GHG Protocol alignment." />
          </Stats>
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
            This page explains the GHG Protocol and GHG inventories in plain English; it is not legal
            or technical accounting advice. For decisions specific to your business, confirm with the
            official sources we link or a qualified adviser.
          </Callout>

          <Sources
            items={[
              {
                href: SRC.ghgCorporate,
                label: 'GHG Protocol Corporate Accounting and Reporting Standard',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.scope3Standard,
                label: 'GHG Protocol Corporate Value Chain (Scope 3) Standard',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.scope2Guidance,
                label: 'GHG Protocol Scope 2 Guidance',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.epaBoundaries,
                label: 'US EPA: Determine organizational boundaries',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.phase1,
                label: 'GHG Protocol: Corporate Standard Phase 1 progress update (Dec 2025)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.esrs1,
                label: 'Delegated Regulation (EU) 2023/2772 (ESRS Set 1, incl. ESRS E1)',
                retrieved: '8 Jun 2026'
              }
            ]}
          />
        </div>
      </Section>

      <NewsletterSignup
        variant="band"
        background="forest"
        heading="Track the GHG Protocol revision and ESRS E1"
        subcopy="The CSRD Brief: plain-English updates on carbon accounting, the GHG Protocol revision and ESRS. We watch Brussels so you don't."
        source="ghg-protocol"
      />
    </>
  );
}
