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
  Prose,
  Icon,
  Byline
} from '@/components/ui';
import { ESRS_STANDARDS, type EsrsStandard } from '@/lib/esrs';
import { LAST_REVIEWED_ISO, FIRST_PUBLISHED_ISO } from '@/lib/seo';

const SITE = 'https://csrd-tools.com';
const PUBLISHED = FIRST_PUBLISHED_ISO;
const MODIFIED = LAST_REVIEWED_ISO;

const SRC = {
  esrsDelegated: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R2772',
  efragHub: 'https://www.efrag.org/en',
  efragRevision:
    'https://www.efrag.org/en/news-and-calendar/news/efrag-provides-its-technical-advice-on-draft-simplified-esrs-to-the-european-commission',
  ecRevisedConsult:
    'https://finance.ec.europa.eu/news/commission-seeks-feedback-revised-sustainability-reporting-standards-2026-05-06_en',
  ey:
    'https://www.ey.com/en_gl/technical/csrd-technical-resources/efrag-proposes-major-esrs-simplifications-to-cut-reporting-burden'
};

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: 'How many ESRS standards are there?',
    a: 'There are 12 ESRS in the first set: 2 cross-cutting standards (ESRS 1 General requirements and ESRS 2 General disclosures) plus 10 topical standards, made up of E1 to E5 (environment), S1 to S4 (social) and G1 (governance).'
  },
  {
    q: 'Which ESRS are mandatory?',
    a: 'ESRS 1 and ESRS 2 apply to every reporter regardless of materiality (ESRS 1 sets the rules; ESRS 2 contains baseline disclosures). The 10 topical standards apply only where the relevant topic is material under the double materiality assessment, so the set you actually report is company-specific.'
  },
  {
    q: 'Who develops the ESRS?',
    a: 'The ESRS are developed by EFRAG (the European Financial Reporting Advisory Group) as the European Commission technical adviser, then adopted by the Commission as a delegated act. EFRAG proposes; the Commission enacts. The first set is Delegated Regulation (EU) 2023/2772.'
  },
  {
    q: 'What is the difference between ESRS 1 and ESRS 2?',
    a: 'ESRS 1 sets the architecture and core concepts (double materiality, value chain, time horizons, the structure of the statement) and contains no disclosure requirements itself. ESRS 2 contains the mandatory baseline disclosures every reporter must make: governance, strategy, impact/risk/opportunity management, and metrics and targets.'
  },
  {
    q: 'Are the ESRS being simplified?',
    a: 'Yes. Under the Omnibus, EFRAG delivered technical advice in December 2025 and the Commission published a draft revised ESRS for consultation on 6 May 2026. The revision cuts mandatory datapoints by around 60 to 70%, drops sector-specific ESRS and clarifies the materiality filter. It applies from FY2027 once adopted.'
  }
];

const PILLARS: { key: EsrsStandard['pillar']; label: string; blurb: string }[] = [
  {
    key: 'Cross-cutting',
    label: 'Cross-cutting',
    blurb: 'The rules and baseline disclosures that apply to every reporter.'
  },
  {
    key: 'Environment',
    label: 'Environment (E)',
    blurb: 'Climate, pollution, water, biodiversity and circular economy.'
  },
  {
    key: 'Social',
    label: 'Social (S)',
    blurb: 'Own workforce, value-chain workers, communities and consumers.'
  },
  {
    key: 'Governance',
    label: 'Governance (G)',
    blurb: 'Business conduct: anti-corruption, lobbying, payment practices.'
  }
];

export const metadata: Metadata = {
  title: 'ESRS Standards: The 12 European Sustainability Reporting Standards | CSRD Tools',
  description:
    'A plain-English map of the 12 ESRS standards under the CSRD: ESRS 1 and 2 (cross-cutting) plus E1 to E5, S1 to S4 and G1. What the ESRS are, who develops them (EFRAG), and the 2026 revision cutting datapoints by around 60 to 70%.',
  alternates: { canonical: `${SITE}/esrs` },
  openGraph: {
    type: 'website',
    title: 'ESRS Standards: the 12 European Sustainability Reporting Standards',
    description:
      'The 12 ESRS mapped by pillar, plus what they are, EFRAG, ESRS 1 vs 2 and the 2026 datapoint cuts. Sourced and kept current.',
    url: `${SITE}/esrs`,
    images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'CSRD Tools' }]
  }
};

export default function EsrsHubPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'The 12 ESRS standards',
    dateModified: MODIFIED,
    itemListElement: ESRS_STANDARDS.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${s.code} ${s.name}`,
      url: `${SITE}/esrs/${s.slug}`
    }))
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
      { '@type': 'ListItem', position: 2, name: 'ESRS standards', item: `${SITE}/esrs` }
    ]
  };

  return (
    <>
      <JsonLd data={[itemListSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <header className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container size="md" className="relative z-10 py-16 lg:py-24">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            The standards map
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-6xl text-ink leading-tight">
            The ESRS standards
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">
            The European Sustainability Reporting Standards (ESRS) are the rulebook companies use to
            report under the CSRD. The first set has 12 standards: ESRS 1 and ESRS 2 (cross-cutting)
            plus E1 to E5 (environment), S1 to S4 (social) and G1 (governance). Pick a standard below
            for a plain-English guide to what it requires.{' '}
            <SourceCite href={SRC.esrsDelegated}>Delegated Regulation (EU) 2023/2772</SourceCite>
          </p>

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                <li>
                  The ESRS are developed by <strong>EFRAG</strong> and adopted by the European
                  Commission as a delegated act.
                </li>
                <li>
                  <strong>ESRS 1 and 2</strong> apply to everyone; the 10 topical standards apply
                  only where the topic is material under{' '}
                  <Link href="/double-materiality" className="text-primary hover:text-accent-deep">
                    double materiality
                  </Link>
                  .
                </li>
                <li>
                  The <strong>2026 revision</strong> cuts mandatory datapoints by around 60 to 70%
                  and drops sector-specific standards (in consultation as of June 2026).
                </li>
              </ul>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/esrs/e1-climate-change" variant="primary">
              Start with ESRS E1 (climate)
            </Button>
            <Button href="/double-materiality" variant="secondary">
              How materiality scopes the ESRS
            </Button>
          </div>

          <div className="mt-8">
            <Byline />
          </div>
        </Container>
      </header>

      {/* Standards map, grouped by pillar */}
      <Section background="paper" eyebrow="The 12 standards" title="Browse the ESRS by pillar">
        <div className="space-y-12">
          {PILLARS.map((pillar) => {
            const standards = ESRS_STANDARDS.filter((s) => s.pillar === pillar.key);
            if (!standards.length) return null;
            return (
              <div key={pillar.key}>
                <div className="flex flex-col gap-1 border-b border-line pb-3">
                  <h3 className="font-display text-2xl font-semibold text-ink">{pillar.label}</h3>
                  <p className="text-sm text-muted">{pillar.blurb}</p>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {standards.map((s, i) => (
                    <RevealOnScroll key={s.slug} delay={i}>
                      <Link
                        href={`/esrs/${s.slug}`}
                        className="group flex h-full flex-col rounded-card border border-line bg-card p-6 transition hover:border-accent hover:-translate-y-[3px]"
                      >
                        <div className="flex items-center gap-3">
                          <Icon name={s.icon} className="text-primary text-3xl" />
                          <span className="font-mono text-xs font-semibold text-accent-deep">
                            {s.code}
                          </span>
                        </div>
                        <h4 className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-primary">
                          {s.name}
                        </h4>
                        <p className="mt-2 flex-1 text-sm text-ink/80 leading-relaxed">
                          {s.tagline}
                        </p>
                        <span className="mt-4 text-sm font-semibold text-accent-deep">
                          Read the {s.code} guide {'->'}
                        </span>
                      </Link>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* What the ESRS are */}
      <Section background="sand">
        <Prose className="max-w-3xl">
          <RevealOnScroll>
            <h2 id="what-esrs-are" className="inline-flex items-center gap-2">
              <Icon name="menu_book" className="text-primary text-2xl" />
              What the ESRS are
            </h2>
            <p>
              The European Sustainability Reporting Standards define what and how CSRD companies
              report. They turn the directive's high-level requirements into concrete disclosure
              requirements and datapoints. The first set, Delegated Regulation (EU) 2023/2772, was
              adopted on 31 July 2023 and applies from FY2024.{' '}
              <SourceCite href={SRC.esrsDelegated}>Delegated Regulation (EU) 2023/2772</SourceCite>
            </p>
            <p>
              They were developed by <strong>EFRAG</strong>, the European Financial Reporting
              Advisory Group, acting as the Commission's technical adviser, and then adopted by the
              Commission as a delegated act. In short: EFRAG proposes, the Commission enacts.{' '}
              <SourceCite href={SRC.efragHub}>EFRAG</SourceCite>
            </p>

            <h2 id="cross-cutting-vs-topical" className="inline-flex items-center gap-2">
              <Icon name="rule" className="text-primary text-2xl" />
              ESRS 1 and ESRS 2 versus the topical standards
            </h2>
            <p>
              The two cross-cutting standards behave differently from the ten topical ones.{' '}
              <strong>ESRS 1 (General requirements)</strong> sets the architecture and core concepts,
              double materiality, value chain, time horizons, and contains no disclosures itself.{' '}
              <strong>ESRS 2 (General disclosures)</strong> contains the mandatory baseline that every
              reporter must make, organised around governance, strategy, impact/risk/opportunity
              management, and metrics and targets, the same four pillars as TCFD.
            </p>
            <p>
              The ten topical standards (E1 to E5, S1 to S4, G1) apply only where the topic is{' '}
              <Link href="/double-materiality">material under double materiality</Link>. So two
              companies in scope of the CSRD can report very different sets of topical standards,
              while both always report ESRS 1 and 2.
            </p>

            <h2 id="datapoints-revision" className="inline-flex items-center gap-2">
              <Icon name="content_cut" className="text-primary text-2xl" />
              Datapoints and the 2026 revision
            </h2>
            <p>
              Each topical standard contains disclosure requirements, and each breaks down into
              datapoints, narrative, quantitative, monetary or percentage. The original ESRS Set 1
              contained roughly 1,100 or more datapoints. Under the Omnibus, EFRAG and the Commission
              revised the ESRS to cut mandatory datapoints by over 60% and total datapoints by over
              70%, and to clarify the materiality filter.{' '}
              <SourceCite href={SRC.ey}>EY</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="warn" title="The revised ESRS are not yet adopted">
              The Commission published the draft revised ESRS delegated act for public consultation
              from 6 May to 3 June 2026, with adoption targeted around 17 September 2026 and
              application from FY2027 (voluntary early use for FY2026). Sector-specific ESRS have been
              dropped. Until the revision is adopted, the current ESRS 2023/2772 remain the law, and
              the exact final datapoint counts may still move.{' '}
              <SourceCite href={SRC.ecRevisedConsult}>Commission consultation</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="paper" eyebrow="FAQ" title="People also ask">
        <div className="mx-auto max-w-3xl">
          <dl className="divide-y divide-line">
            {FAQS.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-lg font-semibold text-ink">{f.q}</dt>
                <dd className="mt-2 text-ink/90 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Sources + disclaimer */}
      <Section background="paper">
        <div className="mx-auto max-w-3xl">
          <Callout variant="info" title="This is guidance, not legal advice">
            This is guidance to help you understand the ESRS, not legal advice. For decisions
            specific to your business, confirm with the official sources we link or a qualified
            adviser.
          </Callout>

          <Sources
            items={[
              {
                href: SRC.esrsDelegated,
                label: 'Delegated Regulation (EU) 2023/2772 (ESRS Set 1) (EUR-Lex)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.efragHub,
                label: 'EFRAG: European Financial Reporting Advisory Group',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.efragRevision,
                label: 'EFRAG: technical advice on simplified ESRS (3 Dec 2025)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.ecRevisedConsult,
                label: 'European Commission: consultation on revised ESRS (6 May 2026)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.ey,
                label: 'EY: EFRAG proposes major ESRS simplifications to cut reporting burden',
                retrieved: '8 Jun 2026'
              }
            ]}
          />
        </div>
      </Section>

      <NewsletterSignup
        variant="band"
        background="forest"
        heading="Track the ESRS revision"
        subcopy="We watch Brussels so you don't. Plain-English alerts when the simplified ESRS, datapoints and timeline change."
        source="esrs-hub"
      />
    </>
  );
}
