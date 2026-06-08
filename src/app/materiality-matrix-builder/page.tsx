import type { Metadata } from 'next';
import {
  Container,
  Section,
  TLDR,
  Callout,
  SourceCite,
  Sources,
  JsonLd,
  ContourBackground,
  RevealOnScroll,
  Prose,
  Icon
} from '@/components/ui';
import { MatrixBuilder } from './MatrixBuilder';

const CANONICAL = 'https://csrd-tools.com/materiality-matrix-builder';

export const metadata: Metadata = {
  title: 'Materiality Matrix Builder (CSRD Double Materiality) | CSRD Tools',
  description:
    'A free tool to plot CSRD sustainability topics on an impact vs financial materiality matrix. Prefilled with the ESRS topical list (E1-E5, S1-S4, G1); add, score and visualise topics.',
  alternates: { canonical: '/materiality-matrix-builder' },
  openGraph: {
    title: 'Free CSRD materiality matrix builder',
    description:
      'Plot your sustainability topics on a double materiality matrix: impact materiality against financial materiality.',
    url: CANONICAL,
    type: 'website'
  }
};

const EFRAG_IG1 = 'https://www.efrag.org/en/sustainability-reporting';
const EC_HOME =
  'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en';

const FAQ = [
  {
    q: 'What is a materiality matrix?',
    a: 'A materiality matrix is the visual output of a materiality assessment: a chart that plots sustainability topics by importance so readers can see priorities at a glance. Under CSRD double materiality, one axis is impact materiality (effect on people and planet) and the other is financial materiality (effect on enterprise value). Topics in the top-right are high on both.'
  },
  {
    q: 'What goes on the X and Y axis?',
    a: 'Under CSRD double materiality, the horizontal axis is typically financial materiality (how sustainability issues affect the company financially) and the vertical axis is impact materiality (how the company affects people and the environment). This replaces the older single-materiality framing of business importance against stakeholder importance.'
  },
  {
    q: 'Is a materiality matrix required under CSRD?',
    a: 'No. The matrix is an optional presentation aid, not a CSRD requirement. What ESRS requires is a documented double materiality assessment based on impacts, risks and opportunities (IROs) with defined thresholds. A topic is material, and must be disclosed, if it crosses the threshold on either the impact or the financial axis, even if it is low on the other.'
  },
  {
    q: 'How is a double materiality matrix different from the old version?',
    a: 'The classic single-materiality matrix blended everything into one importance score (often business importance vs stakeholder importance). The double materiality version uses two distinct definitions: impact materiality and financial materiality. A topic can be material from the impact side alone even with no near-term financial effect, which is why some companies now prefer ranked tables or heat maps over a 2x2 grid.'
  }
];

export default function MaterialityMatrixPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'CSRD Materiality Matrix Builder',
            url: CANONICAL,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any (web)',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'A free interactive tool that lets a company score sustainability topics on impact and financial materiality and plot them on a CSRD double materiality matrix.'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to build a CSRD materiality matrix',
            description:
              'Plot your sustainability topics on a double materiality matrix by scoring each on impact materiality and financial materiality.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Start from the ESRS topical list',
                text: 'Begin with the prefilled ESRS topics (E1-E5, S1-S4, G1), then add or remove rows for topics specific to your business.'
              },
              {
                '@type': 'HowToStep',
                name: 'Score impact materiality',
                text: 'Rate each topic from 0 to 5 on how the company affects people and the environment across its value chain.'
              },
              {
                '@type': 'HowToStep',
                name: 'Score financial materiality',
                text: 'Rate each topic from 0 to 5 on how the sustainability issue affects the company financially.'
              },
              {
                '@type': 'HowToStep',
                name: 'Read the matrix',
                text: 'See each topic plotted as a point. Topics past the threshold on either axis are flagged material.'
              }
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a }
            }))
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://csrd-tools.com/'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Tools',
                item: 'https://csrd-tools.com/tools'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Materiality matrix builder',
                item: CANONICAL
              }
            ]
          }
        ]}
      />

      {/* Hero intro */}
      <section className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container className="relative z-10 py-16 lg:py-24" size="md">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Free tool
          </p>
          <h1 className="mt-4 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            Materiality Matrix Builder
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            Plot your CSRD sustainability topics on a double materiality matrix. Start from the ESRS
            topical list, score each topic on impact and financial materiality, and see your
            priorities laid out: a working aid for your double materiality assessment.
          </p>
        </Container>
      </section>

      {/* The tool */}
      <Section background="sand" id="builder">
        <MatrixBuilder />
      </Section>

      {/* Supporting section */}
      <Section background="paper" containerSize="md">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            The short version
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="balance" className="text-primary text-3xl" />
            How the double materiality matrix works
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            Two axes, two definitions of materiality, one rule for what counts. Here is the picture in
            plain English.
          </p>
        </div>
        <div className="mt-12">
          <TLDR>
            Under CSRD double materiality, you score each topic on impact materiality (effect on
            people and planet) and financial materiality (effect on enterprise value). A topic is
            material, and must be disclosed, if it crosses your threshold on either axis. The matrix
            is an optional way to visualise this; the requirement is a documented, IRO-based
            assessment.
          </TLDR>

          <Prose className="mt-10">
            <h3 className="inline-flex items-center gap-2">
              <Icon name="swap_horiz" className="text-primary text-xl" />
              Two axes, not one blended score
            </h3>
            <p>
              The defining feature of CSRD is double materiality. Impact materiality (inside-out) is
              how your business affects people and the environment across the value chain. Financial
              materiality (outside-in) is how sustainability issues create risks and opportunities
              that affect your cash flows, performance and access to finance. These are two separate
              lenses, scored separately, not merged into one importance number.{' '}
              <SourceCite href={EC_HOME}>European Commission, CSRD overview</SourceCite>
            </p>

            <h3 className="inline-flex items-center gap-2">
              <Icon name="rule" className="text-primary text-xl" />
              Material under either lens
            </h3>
            <p>
              A topic is material if it crosses the threshold on impact materiality or on financial
              materiality. It does not need to be material under both. This is why a 2x2 grid can
              mislead: a topic sitting low-financial but high-impact is still material and must be
              disclosed. Some companies now prefer ranked tables or heat maps for exactly this reason.{' '}
              <SourceCite href={EFRAG_IG1}>EFRAG, materiality assessment guidance (IG 1)</SourceCite>
            </p>

            <h3 className="inline-flex items-center gap-2">
              <Icon name="account_tree" className="text-primary text-xl" />
              The matrix is the output, not the assessment
            </h3>
            <p>
              The matrix is an explanatory aid. ESRS requires a documented assessment of impacts,
              risks and opportunities (IROs), with defined thresholds you can show an auditor. Use
              this builder to visualise and prioritise, then take the result into a proper double
              materiality assessment. Our DMA workbook walks through the steps.
            </p>
          </Prose>

          <div className="mt-8">
            <Callout variant="info" title="Topic-level first, then drill down">
              EFRAG's revised guidance endorses a top-down approach: conclude materiality at topic
              level first using your strategy and sector context, then score individual IROs only for
              topics that pass the initial filter. This builder works at topic level, which is the
              right altitude to start.
            </Callout>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="sand" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="help" className="text-primary text-3xl" />
          Materiality questions people ask
        </h2>
        <div className="mt-12 space-y-4">
          {FAQ.map((item, i) => (
            <RevealOnScroll key={item.q} delay={i}>
              <details className="group rounded-card border border-line bg-card p-5 lg:p-6">
                <summary className="cursor-pointer list-none font-display font-semibold text-lg text-ink marker:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent-deep transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-open:rotate-45"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-ink/85 leading-relaxed">{item.a}</p>
              </details>
            </RevealOnScroll>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted leading-relaxed">
          This is a working aid to help you orient, not a CSRD deliverable or legal advice. The
          formal requirement is a documented, IRO-based double materiality assessment.
        </p>

        <Sources
          items={[
            {
              href: EC_HOME,
              label: 'European Commission, Corporate sustainability reporting',
              retrieved: '8 Jun 2026'
            },
            {
              href: EFRAG_IG1,
              label: 'EFRAG, sustainability reporting and materiality guidance',
              retrieved: '8 Jun 2026'
            }
          ]}
        />
      </Section>
    </>
  );
}
