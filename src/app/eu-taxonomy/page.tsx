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
  taxonomyReg: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32020R0852',
  ecTaxonomy:
    'https://finance.ec.europa.eu/sustainable-finance/tools-and-standards/eu-taxonomy-sustainable-activities_en',
  consilium:
    'https://www.consilium.europa.eu/en/press/press-releases/2026/02/24/council-signs-off-simplification-of-sustainability-reporting-and-due-diligence-requirements-to-boost-eu-competitiveness/',
  esrs1: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R2772'
};

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: 'What is the EU Taxonomy?',
    a: 'The EU Taxonomy is a classification system, set out in Regulation (EU) 2020/852, that defines which economic activities count as environmentally sustainable. It gives investors and companies a common, science-based language to channel capital toward the green transition and to prevent greenwashing. In-scope companies report what share of their turnover, capex and opex is Taxonomy-aligned.'
  },
  {
    q: 'What are the six environmental objectives?',
    a: 'The EU Taxonomy has six environmental objectives: climate change mitigation; climate change adaptation; sustainable use and protection of water and marine resources; transition to a circular economy; pollution prevention and control; and protection and restoration of biodiversity and ecosystems. An activity must substantially contribute to at least one of these.'
  },
  {
    q: 'What is the difference between eligible and aligned?',
    a: 'Eligible means the activity is described in the Taxonomy delegated acts and has technical screening criteria; it says nothing about performance, only that the activity is on the list. Aligned means the activity actually meets the bar: it substantially contributes to an objective, does no significant harm to the other five, and complies with minimum safeguards.'
  },
  {
    q: 'What is DNSH?',
    a: 'DNSH stands for Do No Significant Harm. To be Taxonomy-aligned, an activity that substantially contributes to one environmental objective must not significantly harm any of the other five. For example, a wind farm that substantially contributes to climate mitigation must not significantly harm biodiversity.'
  },
  {
    q: 'What are minimum safeguards?',
    a: 'Minimum safeguards require companies to run due-diligence processes on human rights, labour, anti-corruption and bribery, taxation, and fair competition, aligned with the OECD Guidelines for Multinational Enterprises and the UN Guiding Principles on Business and Human Rights. They are the social floor an activity must meet to be Taxonomy-aligned.'
  },
  {
    q: 'What are the turnover, capex and opex KPIs?',
    a: 'In-scope companies report the proportion of their turnover, capital expenditure (capex) and operating expenditure (opex) associated with Taxonomy-eligible and Taxonomy-aligned activities. Mapping revenue and spend to specific economic activities is the hardest operational part, and falls largely on finance teams.'
  },
  {
    q: 'How does the Taxonomy relate to CSRD?',
    a: 'EU Taxonomy reporting is embedded in CSRD: companies in CSRD scope disclose their Taxonomy KPIs as part of their sustainability statement, and ESRS E1 cross-references it. The Omnibus simplifies Taxonomy reporting, raising thresholds, reducing templates, and making it voluntary for some companies below thresholds.'
  }
];

const OBJECTIVES = [
  { n: 1, t: 'Climate change mitigation', icon: 'co2' },
  { n: 2, t: 'Climate change adaptation', icon: 'thermostat' },
  { n: 3, t: 'Water and marine resources', icon: 'water_drop' },
  { n: 4, t: 'Transition to a circular economy', icon: 'recycling' },
  { n: 5, t: 'Pollution prevention and control', icon: 'masks' },
  { n: 6, t: 'Biodiversity and ecosystems', icon: 'forest' }
];

export const metadata: Metadata = {
  title: 'EU Taxonomy explained: eligibility, alignment, DNSH and KPIs | CSRD Tools',
  description:
    'A plain-English guide to the EU Taxonomy: the 6 environmental objectives, eligibility vs alignment, DNSH, minimum safeguards, the turnover/capex/opex KPIs and the CSRD link.',
  alternates: { canonical: `${SITE}/eu-taxonomy` },
  openGraph: {
    type: 'article',
    title: 'EU Taxonomy explained: eligibility, alignment, DNSH and KPIs | CSRD Tools',
    description:
      'The 6 objectives, eligibility vs alignment, DNSH, minimum safeguards and the turnover/capex/opex KPIs, with the Omnibus simplification. Sourced and kept current.',
    url: `${SITE}/eu-taxonomy`,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'CSRD Tools' }]
  }
};

export default function EuTaxonomyPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EU Taxonomy explained: eligibility, alignment, DNSH and KPIs',
    description:
      'A plain-English guide to the EU Taxonomy: the 6 environmental objectives, eligibility vs alignment, DNSH, minimum safeguards and the turnover/capex/opex KPIs.',
    inLanguage: 'en',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/eu-taxonomy` },
    author: EDITOR_ORG,
    reviewedBy: EDITOR_ORG,
    publisher: { '@type': 'Organization', name: 'CSRD Tools', url: SITE },
    about: {
      '@type': 'Legislation',
      name: 'Regulation (EU) 2020/852 (EU Taxonomy Regulation)',
      legislationIdentifier: 'Regulation (EU) 2020/852',
      url: SRC.taxonomyReg
    }
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
      { '@type': 'ListItem', position: 2, name: 'EU Taxonomy', item: `${SITE}/eu-taxonomy` }
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
            The EU Taxonomy explained
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">
            The EU Taxonomy is a classification system that defines which economic activities count as
            environmentally sustainable. The part everyone trips over is eligibility versus alignment:
            being on the list is not the same as meeting the bar. This page nails that distinction,
            plus DNSH, minimum safeguards and the three KPIs.{' '}
            <SourceCite href={SRC.taxonomyReg}>Regulation (EU) 2020/852</SourceCite>
          </p>

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                <li>
                  <strong className="font-semibold">What:</strong> Regulation (EU) 2020/852, a list of
                  which activities are environmentally sustainable.
                </li>
                <li>
                  <strong className="font-semibold">Six objectives:</strong> mitigation, adaptation,
                  water, circular economy, pollution, biodiversity.
                </li>
                <li>
                  <strong className="font-semibold">Eligible vs aligned:</strong> eligible = on the
                  list; aligned = meets the criteria, DNSH and safeguards.
                </li>
                <li>
                  <strong className="font-semibold">Three KPIs:</strong> share of turnover, capex and
                  opex that is eligible and aligned.
                </li>
                <li>
                  <strong className="font-semibold">CSRD link:</strong> reported inside the
                  sustainability statement; simplified by the Omnibus.
                </li>
              </ul>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/csrd" variant="primary">
              How CSRD fits together
            </Button>
            <Button href="/sustainability-reporting" variant="secondary">
              The bigger picture
            </Button>
          </div>

          <div className="mt-8">
            <Byline />
          </div>
        </Container>
      </header>

      {/* What it is + objectives */}
      <Section background="paper">
        <Prose className="max-w-3xl">
          <RevealOnScroll>
            <h2 id="what-it-is" className="inline-flex items-center gap-2">
              <Icon name="eco" className="text-primary text-2xl" />
              What the EU Taxonomy is, and what it is for
            </h2>
            <p>
              The EU Taxonomy is a classification system that defines which economic activities count
              as environmentally sustainable. It exists to channel capital toward the green transition
              and to give investors a common, science-based language, preventing greenwashing. It is
              the green dictionary that sits alongside CSRD (corporate disclosure) and SFDR (financial
              product disclosure).{' '}
              <SourceCite href={SRC.ecTaxonomy}>European Commission</SourceCite>
            </p>

            <h2 id="objectives" className="inline-flex items-center gap-2">
              <Icon name="public" className="text-primary text-2xl" />
              The six environmental objectives
            </h2>
            <p>
              The Taxonomy is built around six environmental objectives. To count, an activity must
              substantially contribute to at least one of them, while not undermining the others.{' '}
              <SourceCite href={SRC.taxonomyReg}>Art. 9, Reg. (EU) 2020/852</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        <RevealOnScroll>
          <ul className="mx-auto max-w-3xl mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 list-none p-0">
            {OBJECTIVES.map((o) => (
              <li
                key={o.n}
                className="flex flex-col items-center gap-2 rounded-card border border-line bg-card p-4 text-center text-ink"
              >
                <Icon name={o.icon} className="text-primary text-3xl" />
                <span className="font-display font-semibold text-sm">
                  <span className="font-mono text-accent-deep">{o.n}.</span> {o.t}
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        {/* Eligibility vs alignment */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="eligible-vs-aligned" className="inline-flex items-center gap-2">
              <Icon name="rule" className="text-primary text-2xl" />
              Eligibility vs alignment (the bit everyone confuses)
            </h2>
            <p>
              This is the single most misunderstood part of the Taxonomy, so be precise. Eligibility
              means the activity is described in the Taxonomy delegated acts and has technical
              screening criteria. It says nothing about performance, only that the activity is the kind
              of thing the Taxonomy covers. Alignment means the activity actually meets the bar.{' '}
              <SourceCite href={SRC.ecTaxonomy}>European Commission</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="checklist" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">Eligible</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                The activity is on the list: it is described in the delegated acts and has technical
                screening criteria. Being eligible does not mean it is green; it just means it can be
                assessed for alignment.
              </p>
            </div>
            <div className="rounded-card border border-primary/30 bg-low p-6">
              <Icon name="verified" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">Aligned</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                The activity meets the bar. It must substantially contribute to at least one
                objective, do no significant harm to the other five, and comply with minimum
                safeguards. Only aligned activities count as environmentally sustainable.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <Prose className="max-w-3xl mt-8">
          <RevealOnScroll>
            <p>To be aligned, an activity must clear three tests together:</p>
            <ol>
              <li>
                <strong>Substantial contribution:</strong> meet the Technical Screening Criteria for
                at least one of the six objectives.
              </li>
              <li>
                <strong>Do No Significant Harm (DNSH):</strong> not significantly harm any of the other
                five objectives.
              </li>
              <li>
                <strong>Minimum safeguards:</strong> comply with social due-diligence standards.
              </li>
            </ol>
          </RevealOnScroll>
        </Prose>

        {/* DNSH + safeguards */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="dnsh" className="inline-flex items-center gap-2">
              <Icon name="block" className="text-primary text-2xl" />
              DNSH and minimum safeguards
            </h2>
            <p>
              Do No Significant Harm ensures a green activity does not damage other objectives: a wind
              farm that contributes to climate mitigation must not significantly harm biodiversity, for
              example. Minimum safeguards add a social floor, requiring due-diligence processes on
              human rights, labour, anti-corruption and bribery, taxation, and fair competition,
              aligned with the OECD Guidelines and the UN Guiding Principles.{' '}
              <SourceCite href={SRC.taxonomyReg}>Art. 18, Reg. (EU) 2020/852</SourceCite>
            </p>

            <h2 id="kpis" className="inline-flex items-center gap-2">
              <Icon name="assessment" className="text-primary text-2xl" />
              The three KPIs: turnover, capex and opex
            </h2>
            <p>
              In-scope companies report the proportion of their turnover, capital expenditure (capex)
              and operating expenditure (opex) associated with Taxonomy-eligible and Taxonomy-aligned
              activities. The hard operational part is mapping revenue and spend to specific economic
              activities, which is why this work usually lands on finance teams.{' '}
              <SourceCite href={SRC.ecTaxonomy}>European Commission</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="payments" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">Turnover</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                The share of net revenue from products and services tied to Taxonomy-aligned
                activities.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="construction" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">CapEx</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                The share of investment in assets or processes linked to aligned activities, including
                plans to become aligned.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="receipt_long" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">OpEx</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                The share of direct non-capitalised operating costs tied to aligned activities (for
                example maintenance and R and D).
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* CSRD link */}
        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="csrd-link" className="inline-flex items-center gap-2">
              <Icon name="link" className="text-primary text-2xl" />
              How the Taxonomy links to CSRD
            </h2>
            <p>
              Taxonomy reporting is embedded in the CSRD: companies in{' '}
              <Link href="/csrd">CSRD scope</Link> disclose their Taxonomy KPIs as part of their
              sustainability statement, and <Link href="/esrs/e1-climate-change">ESRS E1</Link>{' '}
              cross-references it (the original Article 8 obligation under the Taxonomy Regulation). One
              data architecture, two outputs. See how the wider landscape connects on our{' '}
              <Link href="/sustainability-reporting">sustainability reporting hub</Link>.{' '}
              <SourceCite href={SRC.esrs1}>ESRS E1, Delegated Reg. (EU) 2023/2772</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="warn" title="The Omnibus is simplifying Taxonomy reporting">
              The Omnibus I Directive (Directive (EU) 2026/470) simplifies Taxonomy reporting: raising
              materiality and exemption thresholds, reducing the reporting templates, and making
              Taxonomy reporting voluntary for some companies below thresholds. The objectives,
              eligibility-vs-alignment logic and DNSH stay, but who must report and how much is
              changing. Confirm your current obligation before relying on older guidance. We track it in
              The CSRD Brief.{' '}
              <SourceCite href={SRC.consilium}>Council of the EU</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>
      </Section>

      {/* By the numbers */}
      <Section background="sand" eyebrow="By the numbers" title="The EU Taxonomy in figures">
        <RevealOnScroll>
          <Stats>
            <Stat value="6" label="Environmental objectives an activity can substantially contribute to." />
            <Stat value="3" label="Tests for alignment: contribution, DNSH, minimum safeguards." />
            <Stat value="3" label="KPIs reported: turnover, capex and opex." />
            <Stat value="2020/852" label="The EU Taxonomy Regulation that defines it all." />
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
            This page explains the EU Taxonomy in plain English; it is not legal advice. For decisions
            specific to your business, confirm with the official sources we link or a qualified
            adviser.
          </Callout>

          <Sources
            items={[
              {
                href: SRC.taxonomyReg,
                label: 'Regulation (EU) 2020/852 (EU Taxonomy Regulation), EUR-Lex',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.ecTaxonomy,
                label: 'European Commission: EU taxonomy for sustainable activities',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.consilium,
                label: 'Council of the EU: sign-off of the Omnibus simplification (24 Feb 2026)',
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
        heading="Keep up with Taxonomy simplification"
        subcopy="The CSRD Brief: plain-English updates on the EU Taxonomy, the Omnibus and ESRS. We watch Brussels so you don't."
        source="eu-taxonomy"
      />
    </>
  );
}
