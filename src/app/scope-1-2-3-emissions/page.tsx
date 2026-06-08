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
  scope3Standard: 'https://ghgprotocol.org/corporate-value-chain-scope-3-standard',
  ghgCorporate: 'https://ghgprotocol.org/corporate-standard',
  scope2Guidance: 'https://ghgprotocol.org/scope-2-guidance',
  esrs1: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R2772',
  ecRevisedEsrs:
    'https://finance.ec.europa.eu/news/commission-seeks-feedback-revised-sustainability-reporting-standards-2026-05-06_en'
};

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: 'What is the difference between Scope 1, 2 and 3 emissions?',
    a: 'Scope 1 is direct emissions from sources a company owns or controls, such as fuel burned in boilers, furnaces and company vehicles. Scope 2 is indirect emissions from purchased energy: electricity, steam, heating and cooling the company buys. Scope 3 is all other indirect emissions across the value chain, both upstream and downstream, and is usually the largest share of the footprint.'
  },
  {
    q: 'What are the 15 Scope 3 categories?',
    a: 'The GHG Protocol splits Scope 3 into 15 categories: 8 upstream (purchased goods and services; capital goods; fuel- and energy-related activities; upstream transport and distribution; waste; business travel; employee commuting; upstream leased assets) and 7 downstream (downstream transport and distribution; processing of sold products; use of sold products; end-of-life treatment; downstream leased assets; franchises; investments).'
  },
  {
    q: 'What is the difference between location-based and market-based Scope 2?',
    a: 'Location-based Scope 2 multiplies your electricity consumption by the average emission factor for the local grid, reflecting the physical grid mix. Market-based Scope 2 reflects the electricity you contractually buy (power purchase agreements, renewable energy certificates, green tariffs, supplier-specific factors). The GHG Protocol Scope 2 Guidance and ESRS E1-6 require you to report both.'
  },
  {
    q: 'Are Scope 3 emissions mandatory under CSRD?',
    a: 'Yes, for material categories. ESRS E1-6 requires gross Scope 1, 2 and 3 and total GHG emissions, with Scope 3 covering the relevant of the 15 categories. ESRS phase-in reliefs let first-year reporters and smaller companies omit Scope 3 initially, and the revised ESRS reduces the burden, but Scope 3 remains central because it is usually the bulk of the footprint.'
  },
  {
    q: 'How do you calculate Scope 1, 2 and 3 emissions?',
    a: 'The core formula is emissions = activity data times emission factor. Multiply each activity (litres of fuel, kWh of electricity, tonnes purchased, km travelled) by an appropriate emission factor (for example DEFRA, IEA, EPA or EXIOBASE) to get tonnes of CO2 equivalent, then sum by scope and category. Document your factor sources and versions for assurance.'
  },
  {
    q: 'Why is Scope 3 usually the largest?',
    a: 'Because it captures the whole value chain, not just the company itself. For most businesses, emissions embedded in purchased goods and services, in the use of sold products, and in transport and investments far exceed direct fuel and purchased energy. Scope 3 commonly represents 70 to 90 percent of a company total footprint.'
  },
  {
    q: 'What is Scope 4?',
    a: 'Scope 4, or avoided emissions, is not part of the GHG Protocol corporate inventory. It describes emissions reductions that occur outside a product life cycle as a result of using that product (for example a video call avoiding a flight). It can be reported separately for context but must never be netted against Scope 1, 2 or 3.'
  }
];

const UPSTREAM = [
  { n: 1, t: 'Purchased goods and services', d: 'Extraction, production and transport of goods and services a company buys.' },
  { n: 2, t: 'Capital goods', d: 'Emissions from producing the equipment, machinery and buildings you purchase.' },
  { n: 3, t: 'Fuel- and energy-related activities', d: 'Upstream emissions of fuels and energy not already in Scope 1 or 2 (for example extraction and grid losses).' },
  { n: 4, t: 'Upstream transportation and distribution', d: 'Transport and distribution of purchased products between your suppliers and you.' },
  { n: 5, t: 'Waste generated in operations', d: 'Disposal and treatment of waste produced by your operations.' },
  { n: 6, t: 'Business travel', d: 'Employee travel by air, rail, road and hotel stays for business.' },
  { n: 7, t: 'Employee commuting', d: 'Travel between home and work, including any remote-working energy use.' },
  { n: 8, t: 'Upstream leased assets', d: 'Operation of assets you lease in, where not already counted in Scope 1 or 2.' }
];

const DOWNSTREAM = [
  { n: 9, t: 'Downstream transportation and distribution', d: 'Transport, distribution, storage and retail of sold products after they leave you.' },
  { n: 10, t: 'Processing of sold products', d: 'Further processing of intermediate products by third parties.' },
  { n: 11, t: 'Use of sold products', d: 'Emissions from customers using your products over their lifetime, often the biggest category.' },
  { n: 12, t: 'End-of-life treatment of sold products', d: 'Disposal and treatment of your products at the end of their life.' },
  { n: 13, t: 'Downstream leased assets', d: 'Operation of assets you own and lease out to others.' },
  { n: 14, t: 'Franchises', d: 'Operation of franchises not already included in Scope 1 or 2.' },
  { n: 15, t: 'Investments', d: 'Financed emissions from equity and debt investments, key for financial institutions.' }
];

export const metadata: Metadata = {
  title: 'Scope 1, 2 and 3 emissions explained | CSRD Tools',
  description:
    'A plain-English guide to Scope 1, 2 and 3 emissions: definitions, the 15 Scope 3 categories, location-based vs market-based Scope 2, how they fit ESRS E1 and how to calculate them.',
  alternates: { canonical: `${SITE}/scope-1-2-3-emissions` },
  openGraph: {
    type: 'article',
    title: 'Scope 1, 2 and 3 emissions explained | CSRD Tools',
    description:
      'Definitions, the 15 Scope 3 categories, location- vs market-based Scope 2, ESRS E1 and calculation basics. Sourced and kept current.',
    url: `${SITE}/scope-1-2-3-emissions`,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    images: [{ url: '/brand/og.svg', width: 1200, height: 630, alt: 'CSRD Tools' }]
  }
};

export default function ScopeEmissionsPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Scope 1, 2 and 3 emissions explained',
    description:
      'A plain-English guide to Scope 1, 2 and 3 emissions: definitions, the 15 Scope 3 categories, location-based vs market-based Scope 2 and calculation basics.',
    inLanguage: 'en',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/scope-1-2-3-emissions` },
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
        name: 'Scope 1, 2 and 3 emissions',
        item: `${SITE}/scope-1-2-3-emissions`
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
            The plain-English explainer
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-6xl text-ink leading-tight">
            Scope 1, 2 and 3 emissions explained
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">
            A company carbon footprint is split into three scopes under the{' '}
            <Link href="/ghg-protocol">GHG Protocol</Link>: Scope 1 is what you burn, Scope 2 is the
            energy you buy, and Scope 3 is everything else across your value chain. Scope 3 is usually
            the largest by far, and all three feed directly into{' '}
            <Link href="/esrs/e1-climate-change">ESRS E1</Link> under CSRD.{' '}
            <SourceCite href={SRC.scope3Standard}>GHG Protocol</SourceCite>
          </p>

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                <li>
                  <strong className="font-semibold">Scope 1:</strong> direct emissions from sources
                  you own or control (fuel, vehicles, process, refrigerants).
                </li>
                <li>
                  <strong className="font-semibold">Scope 2:</strong> indirect emissions from
                  purchased electricity, steam, heating and cooling.
                </li>
                <li>
                  <strong className="font-semibold">Scope 3:</strong> all other value-chain
                  emissions, 8 upstream and 7 downstream categories. Often 70 to 90 percent of total.
                </li>
                <li>
                  <strong className="font-semibold">Scope 2 twice:</strong> report both location-based
                  and market-based.
                </li>
                <li>
                  <strong className="font-semibold">The maths:</strong> emissions = activity data
                  times emission factor.
                </li>
              </ul>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/emissions-calculator" variant="primary">
              Estimate your emissions
            </Button>
            <Button href="/ghg-protocol" variant="secondary">
              Read the GHG Protocol guide
            </Button>
          </div>
        </Container>
      </header>

      {/* The three scopes */}
      <Section background="paper">
        <Prose className="max-w-3xl">
          <RevealOnScroll>
            <h2 id="the-scopes" className="inline-flex items-center gap-2">
              <Icon name="co2" className="text-primary text-2xl" />
              The three scopes
            </h2>
            <p>
              The GHG Protocol divides a company greenhouse-gas emissions into three scopes so they
              are counted once and only once. Scope 1 is direct emissions from owned or controlled
              sources. Scope 2 is indirect emissions from the energy you purchase and consume. Scope 3
              is every other indirect emission in your value chain, upstream and downstream. Together
              they make up your corporate carbon footprint.{' '}
              <SourceCite href={SRC.ghgCorporate}>GHG Protocol Corporate Standard</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="local_fire_department" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">Scope 1 - direct</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Emissions from sources you own or control: fuel burned in boilers and furnaces,
                company vehicles, on-site process emissions, and fugitive refrigerant leaks.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="bolt" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                Scope 2 - purchased energy
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Indirect emissions from the electricity, steam, heating and cooling you buy and
                consume. Reported both location-based and market-based.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="account_tree" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                Scope 3 - value chain
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                All other indirect emissions, upstream and downstream, across 15 categories. Usually
                the largest part of the footprint, often 70 to 90 percent.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Scope 3 categories */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="scope-3-categories" className="inline-flex items-center gap-2">
              <Icon name="category" className="text-primary text-2xl" />
              The 15 Scope 3 categories
            </h2>
            <p>
              The GHG Protocol Corporate Value Chain (Scope 3) Standard organises Scope 3 into 15
              categories: 8 upstream (linked to what you buy and your operations) and 7 downstream
              (linked to what happens to your products after they leave you). You screen all 15 and
              report those that are relevant and material.{' '}
              <SourceCite href={SRC.scope3Standard}>GHG Protocol Scope 3 Standard</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink inline-flex items-center gap-2">
                <Icon name="north_east" className="text-primary text-xl" /> Upstream (8)
              </h3>
              <ul className="mt-3 space-y-3 list-none p-0">
                {UPSTREAM.map((c) => (
                  <li key={c.n} className="rounded-card border border-line bg-card p-4">
                    <p className="font-display font-semibold text-ink">
                      <span className="font-mono text-accent-deep">{c.n}.</span> {c.t}
                    </p>
                    <p className="mt-1 text-sm text-ink/90 leading-relaxed">{c.d}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink inline-flex items-center gap-2">
                <Icon name="south_east" className="text-primary text-xl" /> Downstream (7)
              </h3>
              <ul className="mt-3 space-y-3 list-none p-0">
                {DOWNSTREAM.map((c) => (
                  <li key={c.n} className="rounded-card border border-line bg-card p-4">
                    <p className="font-display font-semibold text-ink">
                      <span className="font-mono text-accent-deep">{c.n}.</span> {c.t}
                    </p>
                    <p className="mt-1 text-sm text-ink/90 leading-relaxed">{c.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        {/* Scope 2 location vs market */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="scope-2-methods" className="inline-flex items-center gap-2">
              <Icon name="bolt" className="text-primary text-2xl" />
              Scope 2: location-based vs market-based
            </h2>
            <p>
              Scope 2 must be reported two ways. The location-based method multiplies your electricity
              consumption by the average emission factor for the local grid, reflecting the physical
              mix where you operate. The market-based method reflects the electricity you contractually
              buy, so power purchase agreements, renewable certificates and green tariffs reduce it.
              The GHG Protocol Scope 2 Guidance, and ESRS E1-6, require both.{' '}
              <SourceCite href={SRC.scope2Guidance}>GHG Protocol Scope 2 Guidance</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="map" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">Location-based</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Consumption times the average grid emission factor for your region. Reflects the
                physical grid you draw from, regardless of any green contracts.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="receipt_long" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">Market-based</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Reflects the electricity you contractually procure (PPAs, RECs and guarantees of
                origin, green tariffs, supplier-specific factors). Lets renewable procurement show up.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* ESRS E1 fit + calculation */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="esrs-e1" className="inline-flex items-center gap-2">
              <Icon name="description" className="text-primary text-2xl" />
              How the scopes fit ESRS E1 under CSRD
            </h2>
            <p>
              Under CSRD, the scopes are not optional theory: they populate{' '}
              <Link href="/esrs/e1-climate-change">ESRS E1</Link>, the climate standard. Disclosure
              requirement E1-6 asks for gross Scope 1, 2 and 3 and total GHG emissions, with Scope 2
              shown both location-based and market-based and Scope 3 across the relevant of the 15
              categories. E1-5 covers energy consumption, and the inventory underpins E1-4 targets and
              the E1-1 transition plan.{' '}
              <SourceCite href={SRC.esrs1}>ESRS E1, Delegated Reg. (EU) 2023/2772</SourceCite>
            </p>
            <p>
              ESRS E1-6 explicitly requires emissions to be measured in line with the GHG Protocol (or
              ISO 14064-1), so the GHG Protocol is effectively the calculation engine behind CSRD
              climate reporting. See our <Link href="/ghg-protocol">GHG Protocol guide</Link> for
              boundaries and inventory steps.
            </p>

            <h2 id="calculation" className="inline-flex items-center gap-2">
              <Icon name="calculate" className="text-primary text-2xl" />
              Calculation basics
            </h2>
            <p>
              The core formula is simple: emissions = activity data times emission factor. You multiply
              each activity (litres of fuel, kWh of electricity, tonnes of material purchased,
              kilometres travelled) by an appropriate emission factor from a credible source such as
              DEFRA, the IEA, the EPA or EXIOBASE for spend-based Scope 3, then convert all gases to
              CO2 equivalent and sum by scope and category.
            </p>
            <ul>
              <li>
                <strong>Activity-based</strong> data (physical quantities) is more accurate and
                preferred where available.
              </li>
              <li>
                <strong>Spend-based</strong> data (money spent times a spend factor) is a practical
                screening method for large Scope 3 categories early on.
              </li>
              <li>
                Document factor sources and versions, and keep an audit trail; CSRD requires limited
                assurance.
              </li>
            </ul>
            <p>
              Want a quick estimate before you build a full inventory?{' '}
              <Link href="/emissions-calculator">Use the emissions calculator</Link>.
            </p>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8 space-y-4">
          <RevealOnScroll>
            <Callout variant="info" title="Rule of thumb">
              <span className="inline-flex items-start gap-2">
                <Icon name="lightbulb" className="text-accent-deep text-xl shrink-0" />
                <span>
                  If you can only do one thing first, screen all 15 Scope 3 categories with spend
                  data to find the hotspots, then invest effort in measuring the few that dominate
                  (often purchased goods, use of sold products, and transport).
                </span>
              </span>
            </Callout>
          </RevealOnScroll>
          <RevealOnScroll>
            <Callout variant="warn" title="Standards in flux">
              The GHG Protocol is mid-revision (Phase 1 progress update December 2025), and the revised
              ESRS, published for consultation on 6 May 2026, cuts mandatory datapoints by more than 60
              percent and reworks E1. The scopes themselves are stable, but the exact CSRD disclosure
              detail and some boundary rules are changing. We track it in The CSRD Brief.{' '}
              <SourceCite href={SRC.ecRevisedEsrs}>European Commission</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>
      </Section>

      {/* By the numbers */}
      <Section background="sand" eyebrow="By the numbers" title="The scopes in figures">
        <RevealOnScroll>
          <Stats>
            <Stat value="3" label="Scopes: direct, purchased energy, and value chain." />
            <Stat value="15" label="Scope 3 categories: 8 upstream and 7 downstream." />
            <Stat value="70-90%" label="Typical share of total footprint sitting in Scope 3." />
            <Stat value="Both" label="Scope 2 reported location-based and market-based under ESRS E1-6." />
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
            This page explains Scope 1, 2 and 3 emissions in plain English; it is not legal or
            technical accounting advice. For decisions specific to your business, confirm with the
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
                label: 'GHG Protocol Scope 2 Guidance (location- and market-based)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.esrs1,
                label: 'Delegated Regulation (EU) 2023/2772 (ESRS Set 1, incl. ESRS E1)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.ecRevisedEsrs,
                label: 'European Commission: consultation on the revised ESRS (6 May 2026)',
                retrieved: '8 Jun 2026'
              }
            ]}
          />
        </div>
      </Section>

      <NewsletterSignup
        variant="band"
        background="forest"
        heading="Stay current on carbon accounting and ESRS E1"
        subcopy="The CSRD Brief: plain-English updates on the GHG Protocol revision, Scope 3 and ESRS. We watch Brussels so you don't."
        source="scope-1-2-3-emissions"
      />
    </>
  );
}
