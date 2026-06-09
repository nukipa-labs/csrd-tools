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
  efragIg1: 'https://knowledgehub.efrag.org/eng/interactive/ig/ig1/09-2025',
  esrs1: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R2772',
  ecReporting:
    'https://finance.ec.europa.eu/financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en',
  ecRevisedEsrs:
    'https://finance.ec.europa.eu/news/commission-seeks-feedback-revised-sustainability-reporting-standards-2026-05-06_en',
  consilium:
    'https://www.consilium.europa.eu/en/press/press-releases/2026/02/24/council-signs-off-simplification-of-sustainability-reporting-and-due-diligence-requirements-to-boost-eu-competitiveness/'
};

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: 'What is a double materiality assessment?',
    a: 'A double materiality assessment (DMA) is the structured process CSRD reporters use to decide which sustainability topics they must disclose. It tests each topic from two angles: impact materiality (how the business affects people and the planet) and financial materiality (how sustainability issues affect the business). A topic is material, and must be reported, if it crosses the threshold on either dimension.'
  },
  {
    q: 'What is the difference between impact and financial materiality?',
    a: 'Impact materiality is the inside-out view: how your operations and value chain affect people and the environment, whether or not that affects your finances. Financial materiality is the outside-in view: how a sustainability matter creates risks or opportunities that affect your cash flows, performance, or access to finance. CSRD requires both; a topic is material if either applies.'
  },
  {
    q: 'How do you do a double materiality assessment?',
    a: 'Per EFRAG Implementation Guidance 1, you map your business and value chain, draw up a long-list of sustainability matters, engage stakeholders, translate matters into specific impacts, risks and opportunities (IROs), score each IRO on impact and financial materiality, set and apply thresholds, then aggregate to a list of material topics. The result drives your ESRS disclosure scope.'
  },
  {
    q: 'What are IROs?',
    a: 'IROs are Impacts, Risks and Opportunities, the unit of analysis in a DMA. An impact is an effect your business has on people or the environment (actual or potential, positive or negative). A risk or opportunity is a sustainability matter that could affect your financial position or performance. Each candidate topic is broken into concrete IROs that are then scored.'
  },
  {
    q: 'What threshold makes a topic material?',
    a: 'There is no single legal number. You define your own cut-off score for impact materiality (based on scale, scope, irremediability and likelihood) and for financial materiality (magnitude of financial effect times likelihood). Thresholds should be informed by quantitative data where possible and documented so an auditor can follow your reasoning under limited assurance.'
  },
  {
    q: 'Is a materiality matrix required under CSRD?',
    a: 'No. ESRS does not require a materiality matrix. The required output is a documented, IRO-based assessment and a list of material topics. A materiality matrix is an optional presentation aid that plots topics on impact and financial axes; many companies now use ranked tables or heat maps instead, because a 2x2 grid can wrongly imply a topic is not material.'
  },
  {
    q: 'What is the difference between double and single materiality?',
    a: 'Single materiality, used by ISSB (IFRS S1/S2) and investor-focused frameworks, asks only whether a sustainability matter affects enterprise value (financial materiality). Double materiality, unique to CSRD/ESRS, adds impact materiality, so a topic with no near-term financial effect can still be material because of its effect on people or planet.'
  },
  {
    q: 'Did the Omnibus change double materiality?',
    a: 'No. The Omnibus I Directive simplified CSRD and cut ESRS datapoints, but double materiality survives as the core principle. EFRAG\'s revised guidance encourages a lighter top-down approach (conclude materiality at topic level first, then drill into IROs only for topics that pass), reducing effort, but the impact-plus-financial test itself remains.'
  }
];

export const metadata: Metadata = {
  title: 'Double materiality assessment (DMA) explained | CSRD Tools',
  description:
    'A plain-English guide to double materiality and the CSRD double materiality assessment (DMA): impact vs financial materiality, IROs, scoring, thresholds, the matrix and post-Omnibus simplification.',
  alternates: { canonical: `${SITE}/double-materiality` },
  openGraph: {
    type: 'article',
    title: 'Double materiality assessment (DMA) explained | CSRD Tools',
    description:
      'Impact vs financial materiality, the DMA step-by-step, IRO scoring, thresholds, the materiality matrix and what the Omnibus changed. Sourced and kept current.',
    url: `${SITE}/double-materiality`,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'CSRD Tools' }]
  }
};

export default function DoubleMaterialityPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Double materiality assessment (DMA) explained',
    description:
      'A plain-English guide to double materiality and the CSRD double materiality assessment: impact vs financial materiality, IROs, scoring, thresholds and the matrix.',
    inLanguage: 'en',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/double-materiality` },
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Double materiality',
        item: `${SITE}/double-materiality`
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
            Double materiality and the double materiality assessment
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">
            Double materiality is the principle at the heart of CSRD: a sustainability topic matters
            if it is significant for people and the planet (impact) or for your business (financial),
            or both. The double materiality assessment (DMA) is how you work that out, and it decides
            exactly which <Link href="/esrs">ESRS</Link> disclosures you must make.{' '}
            <SourceCite href={SRC.efragIg1}>EFRAG IG 1</SourceCite>
          </p>

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                <li>
                  <strong className="font-semibold">Two lenses:</strong> impact materiality
                  (inside-out) and financial materiality (outside-in).
                </li>
                <li>
                  <strong className="font-semibold">Either is enough:</strong> a topic is material if
                  it crosses the threshold on impact OR financial grounds.
                </li>
                <li>
                  <strong className="font-semibold">The output:</strong> a documented, IRO-based list
                  of material topics that scopes your ESRS report.
                </li>
                <li>
                  <strong className="font-semibold">The matrix is optional:</strong> ESRS requires the
                  assessment, not a 2x2 chart.
                </li>
                <li>
                  <strong className="font-semibold">Post-Omnibus:</strong> double materiality survives;
                  EFRAG now encourages a lighter top-down approach.
                </li>
              </ul>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/materiality-matrix-builder" variant="primary">
              Build your materiality matrix
            </Button>
            <Button href="/scope-checker" variant="secondary">
              Am I in scope?
            </Button>
          </div>

          <div className="mt-8">
            <Byline />
          </div>
        </Container>
      </header>

      {/* Main long-form */}
      <Section background="paper">
        <Prose className="max-w-3xl">
          <RevealOnScroll>
            <h2 id="what-it-is" className="inline-flex items-center gap-2">
              <Icon name="balance" className="text-primary text-2xl" />
              What double materiality means
            </h2>
            <p>
              Double materiality is a way of deciding what counts as material for sustainability
              reporting by combining two perspectives. Impact materiality looks outward from the
              company (inside-out): how your business affects people and the environment. Financial
              materiality looks inward (outside-in): how sustainability matters affect your financial
              position, performance and cash flows. Under CSRD, a topic is material if it is
              significant under either lens.{' '}
              <SourceCite href={SRC.efragIg1}>EFRAG IG 1</SourceCite>
            </p>
            <p>
              This is what makes CSRD distinctive. Investor-focused frameworks such as the{' '}
              <Link href="/esg-reporting-frameworks">ISSB standards</Link> use only financial
              materiality. CSRD, via the ESRS, requires both, so a company must report a topic such as
              its pollution even when that pollution does not yet hit its profit and loss. The
              concept is set out in <Link href="/esrs">ESRS 1</Link>, the cross-cutting standard that
              defines how reporting works.{' '}
              <SourceCite href={SRC.esrs1}>ESRS 1, Delegated Reg. (EU) 2023/2772</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        {/* Two lenses cards */}
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="public" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                Impact materiality (inside-out)
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                How your own operations and value chain affect people and the environment, positive or
                negative, actual or potential. Scored on scale, scope and irremediability (plus
                likelihood for potential impacts). This lens does not depend on any financial effect.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="trending_up" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                Financial materiality (outside-in)
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                How a sustainability matter creates risks or opportunities that affect your cash
                flows, financial position, performance, cost of capital or access to finance. Scored
                on the magnitude of the financial effect times its likelihood, over short, medium and
                long horizons.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="dma-steps" className="inline-flex items-center gap-2">
              <Icon name="checklist" className="text-primary text-2xl" />
              The double materiality assessment, step by step
            </h2>
            <p>
              The double materiality assessment (DMA) is the mandatory first step of CSRD reporting:
              it determines which ESRS topics and datapoints you must disclose. EFRAG Implementation
              Guidance 1 sets out a structured method. The eight steps below reflect how companies
              actually run it in practice.{' '}
              <SourceCite href={SRC.efragIg1}>EFRAG IG 1</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        {/* DMA steps */}
        <RevealOnScroll>
          <ol className="mx-auto max-w-3xl mt-8 space-y-4 list-none p-0">
            {[
              {
                t: 'Understand context and value chain',
                d: 'Map your business model, activities, geographies and the upstream and downstream value chain. Use the ESRS AR 16 topic list as a starting point to draw up a long-list of candidate sustainability matters.'
              },
              {
                t: 'Engage stakeholders',
                d: 'Identify and map stakeholders (employees, investors, customers, suppliers, communities, NGOs, regulators) plus the silent stakeholders, nature and future generations. Gather input via surveys, interviews and workshops.'
              },
              {
                t: 'Identify IROs',
                d: 'Translate each candidate matter into concrete Impacts, Risks and Opportunities. Distinguish actual from potential, positive from negative, and locate each in your own operations or the value chain.'
              },
              {
                t: 'Score impact materiality',
                d: 'Rate each impact on scale, scope and irremediability (and likelihood for potential impacts), typically on a 1 to 5 scale.'
              },
              {
                t: 'Score financial materiality',
                d: 'Rate each risk or opportunity on magnitude of financial effect times likelihood, across short, medium and long-term horizons.'
              },
              {
                t: 'Set thresholds',
                d: 'Define the cut-off score above which an IRO is material. Inform thresholds with quantitative data where possible and document them for the auditor.'
              },
              {
                t: 'Aggregate and determine material topics',
                d: 'Roll IRO scores up to topic level. A topic is material if any associated IRO exceeds the threshold on either the impact or financial dimension.'
              },
              {
                t: 'Validate and visualise',
                d: 'Validate with management, board and stakeholders. Output a list of material topics (and optionally a materiality matrix). This drives your disclosure scope.'
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

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="info" title="The 2026 top-down approach">
              EFRAG&apos;s revised guidance endorses a top-down method: conclude materiality at topic
              level first, using strategy and sector context, then drill into IRO-level scoring only
              for the topics that pass the initial filter. For most companies this is far less work
              than scoring every IRO from scratch. <SourceCite href={SRC.efragIg1}>EFRAG IG 1</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>

        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="the-matrix" className="inline-flex items-center gap-2">
              <Icon name="scatter_plot" className="text-primary text-2xl" />
              The materiality matrix (and why it is optional)
            </h2>
            <p>
              A materiality matrix is the visual output of the assessment: a chart that plots
              sustainability topics so readers can see priorities at a glance. Under double
              materiality, one axis is impact materiality and the other is financial materiality.
              Topics in the top-right quadrant score high on both, but a topic is material, and must
              be reported, if it is significant on either axis alone.
            </p>
            <p>
              ESRS does not require a matrix. The required output is a documented, IRO-based
              assessment and a list of material topics. Because a 2x2 grid can wrongly imply that a
              topic in the bottom-left is not material when it actually crosses a single-axis
              threshold, many companies now present ranked tables or heat maps instead. Use the matrix
              as an explanatory aid, not the conclusion.
            </p>
            <p>
              Want to produce one quickly?{' '}
              <Link href="/materiality-matrix-builder">Use the materiality matrix builder</Link> to
              plot your scored IROs on impact and financial axes and export the result.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="double-vs-single" className="inline-flex items-center gap-2">
              <Icon name="compare_arrows" className="text-primary text-2xl" />
              Double materiality vs single materiality
            </h2>
            <p>
              Single materiality asks one question: does a sustainability matter affect enterprise
              value? It is the lens used by the ISSB (IFRS S1 and S2) and other investor-focused
              frameworks. Double materiality adds the impact lens on top, so a topic can be material
              because of its effect on people or the planet even if it has no near-term financial
              effect. CSRD is the major regime that requires both.
            </p>
            <p>
              In practice this means a CSRD double materiality assessment can satisfy much of an{' '}
              <Link href="/esg-reporting-frameworks">ISSB or GRI</Link> assessment, because it spans
              both lenses. See how the frameworks compare and interoperate on our{' '}
              <Link href="/esg-reporting-frameworks">frameworks comparison page</Link>.
            </p>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="warn" title="The standards are being revised">
              The Omnibus I Directive (Directive (EU) 2026/470) and the revised ESRS cut mandatory
              datapoints by more than 60 percent and simplify guidance. The European Commission
              published a draft revised ESRS for consultation on 6 May 2026, with a final delegated
              act expected around mid to late 2026, applicable from FY2027 (optional early use FY2026).
              Double materiality survives, but the detail of what you disclose for a material topic is
              changing. We track every change in The CSRD Brief.{' '}
              <SourceCite href={SRC.ecRevisedEsrs}>European Commission</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>
      </Section>

      {/* By the numbers */}
      <Section background="sand" eyebrow="By the numbers" title="Double materiality in figures">
        <RevealOnScroll>
          <Stats>
            <Stat value="2" label="Lenses: impact materiality (inside-out) and financial materiality (outside-in)." />
            <Stat value="Either" label="A topic is material if it crosses the threshold on either lens, not both." />
            <Stat value="8" label="Practical steps in a DMA, from value-chain mapping to a validated topic list." />
            <Stat value="Optional" label="The materiality matrix: a presentation aid, not an ESRS requirement." />
          </Stats>
        </RevealOnScroll>
      </Section>

      {/* DMA workbook soft upgrade */}
      <Section background="paper">
        <div className="mx-auto max-w-3xl">
          <RevealOnScroll>
            <div className="rounded-card border border-line bg-card p-8 text-center">
              <Icon name="description" className="text-primary text-4xl" />
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
                Get the DMA workbook
              </h2>
              <p className="mt-3 text-ink/80 leading-relaxed">
                A free Excel double materiality workbook: a topic long-list, an IRO scoring sheet for
                impact and financial materiality, threshold logic and an auto-generated material-topic
                list. Score your topics in the matrix builder, then download the workbook instantly
                with your email and stay posted as the ESRS revision lands.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/materiality-matrix-builder" variant="primary">
                  Get the DMA workbook
                </Button>
                <Button href="/subscribe" variant="secondary">
                  Just the newsletter
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
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
            This page explains double materiality and the DMA in plain English; it is not legal
            advice. For decisions specific to your business, confirm with the official sources we link
            or a qualified adviser. A defensible DMA must be documented for your auditor under limited
            assurance.
          </Callout>

          <Sources
            items={[
              {
                href: SRC.efragIg1,
                label: 'EFRAG Implementation Guidance 1: Materiality Assessment',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.esrs1,
                label: 'Delegated Regulation (EU) 2023/2772 (ESRS Set 1, incl. ESRS 1)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.ecReporting,
                label: 'European Commission: Corporate sustainability reporting',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.ecRevisedEsrs,
                label: 'European Commission: consultation on the revised ESRS (6 May 2026)',
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
        heading="Keep your DMA defensible as the rules change"
        subcopy="The CSRD Brief: plain-English updates on ESRS, double materiality and the Omnibus. We watch Brussels so you don't."
        source="double-materiality"
      />
    </>
  );
}
