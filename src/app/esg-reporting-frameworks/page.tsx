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
    q: 'What is an ESG reporting framework?',
    a: 'An ESG reporting framework is a structured set of standards that tells a company what sustainability information to disclose and how. Several major frameworks coexist (CSRD/ESRS, ISSB, GRI, plus legacy TCFD and SASB). The practical question is which apply to you and how they relate; CSRD/ESRS is increasingly the most comprehensive and is consolidating the field.'
  },
  {
    q: 'What is the difference between GRI, ISSB and ESRS?',
    a: 'GRI is voluntary, impact-materiality focused, for a broad stakeholder audience. ISSB (IFRS S1/S2) is investor-focused, single (financial) materiality, mandatory where jurisdictions adopt it. ESRS is the EU mandatory regime and uses double materiality (impact and financial), so it spans both the GRI and ISSB lenses in one standard.'
  },
  {
    q: 'What is single vs double materiality?',
    a: 'Single materiality, used by ISSB and most investor frameworks, asks only whether a topic affects enterprise value (financial materiality). Double materiality, used by CSRD/ESRS, also asks whether the company affects people and the planet (impact materiality). Under double materiality a topic is reportable if it is material on either lens.'
  },
  {
    q: 'Which framework should we use?',
    a: 'If you are in EU scope, CSRD/ESRS is your anchor. If you have global investors or a non-EU listing, add ISSB. For broad stakeholder communication, GRI. Smaller EU companies can use the voluntary VSME. The efficient approach is to build one data architecture, tag datapoints to multiple frameworks, and report once.'
  },
  {
    q: 'Does CSRD replace GRI?',
    a: 'No. CSRD/ESRS is mandatory EU law; GRI remains a voluntary global standard. They are interoperable: EFRAG and GRI have an interoperability mapping, and because ESRS covers impact materiality, a CSRD reporter can satisfy much of GRI with mapping rather than a separate report.'
  },
  {
    q: 'Can one report satisfy multiple frameworks?',
    a: 'Largely, yes. ESRS double materiality spans both the GRI (impact) and ISSB (financial) lenses, and EFRAG has interoperability guidance with both. ESRS E1 and IFRS S2 share TCFD architecture. Build one data set, tag each datapoint to the frameworks that apply, and you can report once with framework-specific indexes.'
  }
];

type Row = {
  framework: string;
  owner: string;
  mandatory: string;
  materiality: string;
  audience: string;
  status: string;
  highlight?: boolean;
};

const ROWS: Row[] = [
  {
    framework: 'CSRD / ESRS',
    owner: 'EU / EFRAG',
    mandatory: 'Mandatory (EU scope)',
    materiality: 'Double (impact + financial)',
    audience: 'All stakeholders + investors',
    status: 'In force; simplified by Omnibus and revised ESRS',
    highlight: true
  },
  {
    framework: 'ISSB (IFRS S1/S2)',
    owner: 'IFRS Foundation',
    mandatory: 'Mandatory where adopted',
    materiality: 'Single (financial / enterprise value)',
    audience: 'Investors',
    status: 'Adopted in 30+ jurisdictions'
  },
  {
    framework: 'GRI',
    owner: 'GRI',
    mandatory: 'Voluntary',
    materiality: 'Impact',
    audience: 'Broad stakeholders',
    status: 'Most-used voluntary standard'
  },
  {
    framework: 'VSME',
    owner: 'EU / EFRAG',
    mandatory: 'Voluntary',
    materiality: 'Simplified (proportionate)',
    audience: 'Smaller companies and value chain',
    status: 'EU voluntary standard; acts as value-chain cap'
  },
  {
    framework: 'TCFD',
    owner: 'FSB (disbanded)',
    mandatory: 'Legacy / superseded',
    materiality: 'Single (climate)',
    audience: 'Investors',
    status: 'Folded into IFRS S2'
  },
  {
    framework: 'SASB',
    owner: 'Now ISSB',
    mandatory: 'Voluntary',
    materiality: 'Single, industry-specific',
    audience: 'Investors',
    status: 'Consolidated under ISSB'
  }
];

export const metadata: Metadata = {
  title: 'ESG reporting frameworks compared: CSRD vs GRI vs ISSB vs VSME | CSRD Tools',
  description:
    'A neutral comparison of the major ESG reporting frameworks: CSRD/ESRS, GRI, ISSB (IFRS S1/S2), VSME and TCFD. Single vs double materiality, interoperability, and which applies to you.',
  alternates: { canonical: `${SITE}/esg-reporting-frameworks` },
  openGraph: {
    type: 'article',
    title: 'ESG reporting frameworks compared: CSRD vs GRI vs ISSB vs VSME | CSRD Tools',
    description:
      'A neutral comparison of CSRD/ESRS, GRI, ISSB, VSME and TCFD: materiality lens, audience, status and interoperability. Sourced and kept current.',
    url: `${SITE}/esg-reporting-frameworks`,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    images: [{ url: '/brand/og.svg', width: 1200, height: 630, alt: 'CSRD Tools' }]
  }
};

export default function EsgFrameworksPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'ESG reporting frameworks compared: CSRD vs GRI vs ISSB vs VSME',
    description:
      'A neutral comparison of the major ESG reporting frameworks: CSRD/ESRS, GRI, ISSB, VSME and TCFD, with single vs double materiality and interoperability.',
    inLanguage: 'en',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/esg-reporting-frameworks` },
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
        name: 'ESG reporting frameworks',
        item: `${SITE}/esg-reporting-frameworks`
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
            Neutral comparison
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-6xl text-ink leading-tight">
            ESG reporting frameworks compared
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">
            CSRD/ESRS, GRI, ISSB, VSME, TCFD: a crowded field of overlapping standards. We have no
            framework to sell, so here is a straight, side-by-side comparison, with the one distinction
            that explains most of the confusion: single versus double materiality.{' '}
            <SourceCite href={SRC.ecReporting}>European Commission</SourceCite>
          </p>

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                <li>
                  <strong className="font-semibold">CSRD/ESRS:</strong> EU mandatory, double
                  materiality, the most comprehensive regime.
                </li>
                <li>
                  <strong className="font-semibold">ISSB:</strong> investor-focused, single
                  (financial) materiality, adopted in 30-plus jurisdictions.
                </li>
                <li>
                  <strong className="font-semibold">GRI:</strong> voluntary, impact materiality, broad
                  stakeholders.
                </li>
                <li>
                  <strong className="font-semibold">TCFD and SASB:</strong> absorbed into the ISSB.
                </li>
                <li>
                  <strong className="font-semibold">Report once:</strong> they interoperate; build one
                  data set and tag to many.
                </li>
              </ul>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/scope-checker" variant="primary">
              Which applies to me?
            </Button>
            <Button href="/double-materiality" variant="secondary">
              Single vs double materiality
            </Button>
          </div>
        </Container>
      </header>

      {/* Comparison table */}
      <Section background="sand" containerSize="lg">
        <div className="max-w-3xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            The comparison
          </p>
          <h2 className="mt-3 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            CSRD vs GRI vs ISSB vs VSME vs TCFD
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            Owner, whether it is mandatory, the materiality lens, the primary audience and where each
            stands in 2026.
          </p>
        </div>

        <RevealOnScroll>
          <div className="mt-10 overflow-x-auto rounded-card border border-line bg-card">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="bg-ink text-paper">
                  <th className="px-4 py-3 font-display font-semibold">Framework</th>
                  <th className="px-4 py-3 font-display font-semibold">Owner</th>
                  <th className="px-4 py-3 font-display font-semibold">Mandatory?</th>
                  <th className="px-4 py-3 font-display font-semibold">Materiality lens</th>
                  <th className="px-4 py-3 font-display font-semibold">Audience</th>
                  <th className="px-4 py-3 font-display font-semibold">Status 2026</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr
                    key={r.framework}
                    className={`border-t border-line ${
                      r.highlight
                        ? 'bg-low'
                        : i % 2 === 1
                          ? 'bg-sand-tint'
                          : 'bg-card'
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-display font-semibold text-ink align-top"
                    >
                      {r.framework}
                    </th>
                    <td className="px-4 py-3 text-ink/90 align-top">{r.owner}</td>
                    <td className="px-4 py-3 text-ink/90 align-top">{r.mandatory}</td>
                    <td className="px-4 py-3 text-ink/90 align-top">{r.materiality}</td>
                    <td className="px-4 py-3 text-ink/90 align-top">{r.audience}</td>
                    <td className="px-4 py-3 text-ink/90 align-top">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealOnScroll>

        <p className="mt-6 text-sm text-muted">
          CDP (the environmental disclosure questionnaire) is a further voluntary system, aligned to
          the ISSB and ESRS, often used by investors and customers.{' '}
          <SourceCite href={SRC.ecReporting}>European Commission</SourceCite>
        </p>
      </Section>

      {/* Narrative */}
      <Section background="paper">
        <Prose className="max-w-3xl">
          <RevealOnScroll>
            <h2 id="single-vs-double" className="inline-flex items-center gap-2">
              <Icon name="balance" className="text-primary text-2xl" />
              Single vs double materiality: the key distinction
            </h2>
            <p>
              The fault line between the frameworks is the materiality lens. Single materiality, used
              by the ISSB and most investor frameworks, asks only whether a sustainability matter
              affects enterprise value. Double materiality, used by CSRD/ESRS, adds the question of
              whether the company affects people and the planet, so a topic can be reportable on
              either lens. GRI sits on the impact side. Understanding this one distinction explains why
              the same company can look very different across frameworks.{' '}
              <SourceCite href={SRC.esrs1}>ESRS 1, Delegated Reg. (EU) 2023/2772</SourceCite>
            </p>
            <p>
              For the full mechanics, see our{' '}
              <Link href="/double-materiality">double materiality guide</Link>.
            </p>

            <h2 id="interoperability" className="inline-flex items-center gap-2">
              <Icon name="sync_alt" className="text-primary text-2xl" />
              How they interoperate
            </h2>
            <p>
              The frameworks increasingly converge. Because ESRS requires double materiality, it
              effectively spans both the GRI (impact) and ISSB (financial) lenses in one regime. ESRS
              E1 and IFRS S2 share the TCFD architecture; EFRAG has an interoperability mapping with
              GRI and interoperability guidance with the ISSB to reduce double-reporting. TCFD and SASB
              have been absorbed into the ISSB, so they are no longer standalone destinations. A CSRD
              reporter can usually satisfy GRI and much of ISSB with incremental effort.{' '}
              <SourceCite href={SRC.issb}>IFRS Foundation</SourceCite>
            </p>

            <h2 id="which-applies" className="inline-flex items-center gap-2">
              <Icon name="help" className="text-primary text-2xl" />
              Which applies to me?
            </h2>
            <p>Use this as a quick steer, then confirm with the scope checker:</p>
            <ul>
              <li>
                <strong>In EU CSRD scope</strong> (over 1,000 employees and over EUR 450m turnover):
                ESRS is your anchor. <Link href="/scope-checker">Check your scope</Link>.
              </li>
              <li>
                <strong>Global investors or a non-EU listing:</strong> add ISSB (IFRS S1/S2).
              </li>
              <li>
                <strong>Broad stakeholder communication:</strong> GRI.
              </li>
              <li>
                <strong>Smaller EU company, or being asked for data:</strong> the voluntary{' '}
                <Link href="/suppliers">VSME standard</Link> (and the value-chain cap).
              </li>
            </ul>
            <p>
              Whatever the mix, build one data architecture, tag each datapoint to the frameworks that
              apply, and report once. For the broader picture, see our{' '}
              <Link href="/sustainability-reporting">sustainability reporting hub</Link>.
            </p>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="warn" title="The EU frameworks are being revised">
              The Omnibus I Directive (Directive (EU) 2026/470) narrowed CSRD scope and the revised
              ESRS, in consultation from 6 May 2026, cuts mandatory datapoints by more than 60 percent,
              with a final delegated act expected around mid to late 2026. VSME is also being finalised
              as the value-chain ceiling. Statuses in the table above can move; confirm before relying
              on them. We track every change in The CSRD Brief.{' '}
              <SourceCite href={SRC.consilium}>Council of the EU</SourceCite>
            </Callout>
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
            This comparison is a plain-English orientation; it is not legal advice, and we have no
            framework or product to sell. For decisions specific to your business, confirm with the
            official sources we link or a qualified adviser.
          </Callout>

          <Sources
            items={[
              {
                href: SRC.ecReporting,
                label: 'European Commission: Corporate sustainability reporting',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.esrs1,
                label: 'Delegated Regulation (EU) 2023/2772 (ESRS Set 1)',
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
        heading="Stay neutral, stay current"
        subcopy="The CSRD Brief: plain-English updates on CSRD, ESRS, the ISSB and the Omnibus. We watch Brussels so you don't."
        source="esg-reporting-frameworks"
      />
    </>
  );
}
