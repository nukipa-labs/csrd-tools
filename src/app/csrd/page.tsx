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

// Canonical official + authoritative sources (research/01-regulation.md section 10).
const SRC = {
  csrdEurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2464/oj/eng',
  ecHome:
    'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en',
  omnibusFinal:
    'https://www.consilium.europa.eu/en/press/press-releases/2026/02/24/council-signs-off-simplification-of-sustainability-reporting-and-due-diligence-requirements-to-boost-eu-competitiveness/',
  esrsDelegated:
    'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R2772',
  efragRevision:
    'https://www.efrag.org/en/news-and-calendar/news/efrag-provides-its-technical-advice-on-draft-simplified-esrs-to-the-european-commission',
  ecRevisedConsult:
    'https://finance.ec.europa.eu/news/commission-seeks-feedback-revised-sustainability-reporting-standards-2026-05-06_en',
  stopClock:
    'https://www.sidley.com/en/insights/newsupdates/2025/04/eu-omnibus-package-eu-adopts-stop-the-clock-directive-and-begins-esrs-simplification-process',
  pwcViewpoint: 'https://viewpoint.pwc.com/gx/en/pwc/in-briefs/ib_int202527.html',
  bdoScope:
    'https://www.bdo.com/insights/sustainability-and-esg/csrd-post-omnibus-revised-scope-and-requirements'
};

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: 'What is the CSRD?',
    a: 'The CSRD is the EU Corporate Sustainability Reporting Directive, Directive (EU) 2022/2464, in force since 5 January 2023. It requires large companies to publish standardised, audited, digitally tagged information about their environmental, social and governance impacts, risks and opportunities, using the ESRS standards and a double materiality assessment.'
  },
  {
    q: 'Who has to comply with the CSRD now?',
    a: 'After the Omnibus I Directive (EU) 2026/470, the CSRD applies to EU companies that exceed BOTH thresholds: more than 1,000 employees AND more than EUR 450 million net turnover. Listed SMEs are removed from mandatory scope. Non-EU groups are caught with more than EUR 450m EU turnover plus a qualifying EU subsidiary or branch.'
  },
  {
    q: 'When does the CSRD apply?',
    a: 'Newly in-scope companies (more than 1,000 employees and more than EUR 450m turnover) report for financial years beginning on or after 1 January 2027, with first reports published in 2028. Non-EU groups start with FY2028, reporting in 2029. Wave 1 companies already reporting since FY2024 that remain above the thresholds continue.'
  },
  {
    q: 'What is the difference between the CSRD and the NFRD?',
    a: 'The CSRD replaced the older Non-Financial Reporting Directive (NFRD, Directive 2014/95/EU). The NFRD covered roughly 11,700 large public-interest entities with high-level, unstandardised disclosure. The CSRD mandates detailed ESRS standards, double materiality, third-party assurance and digital tagging, though the Omnibus then narrowed how many companies are caught.'
  },
  {
    q: 'Does the CSRD require assurance?',
    a: 'Yes. The sustainability statement must obtain limited assurance from a third party, such as a statutory auditor or, where a Member State allows it, an independent assurance services provider. The previously planned move to reasonable assurance was removed by the Omnibus, so limited assurance is now the permanent ceiling.'
  },
  {
    q: 'Are SMEs in scope of the CSRD after the Omnibus?',
    a: 'Most are not. Listed SMEs were removed from mandatory scope, and the new threshold (more than 1,000 employees AND more than EUR 450m turnover) excludes the vast majority of smaller companies. SMEs can report voluntarily using the VSME standard, and a value-chain cap limits the data larger customers can demand from them.'
  },
  {
    q: 'What standards do CSRD companies report against?',
    a: 'CSRD companies report under the European Sustainability Reporting Standards (ESRS): 12 standards made up of ESRS 1 and ESRS 2 (cross-cutting) plus E1 to E5 (environment), S1 to S4 (social) and G1 (governance). A double materiality assessment determines which topical standards apply; ESRS 2 applies to everyone.'
  },
  {
    q: 'What are the penalties for not complying with the CSRD?',
    a: 'The CSRD is a directive, so penalties are set by each Member State and must be effective, proportionate and dissuasive. These can include exclusion from public procurement, administrative fines (up to around 5% of turnover in some states) and, in countries such as France, criminal liability. Always check the rules in the relevant Member State.'
  },
  {
    q: 'Did the Omnibus cancel the CSRD?',
    a: 'No. The Omnibus narrowed and simplified the CSRD; it did not cancel it. It raised the scope thresholds, removed listed SMEs, delayed not-yet-reporting waves by two years, cut the ESRS datapoints sharply and softened assurance. The core obligations, double materiality, the ESRS and digital tagging, remain in place.'
  }
];

export const metadata: Metadata = {
  title: 'What is the CSRD? The Corporate Sustainability Reporting Directive | CSRD Tools',
  description:
    'A plain-English, post-Omnibus guide to the EU Corporate Sustainability Reporting Directive (CSRD): who must report now (1,000 employees AND EUR 450m turnover), the ESRS, double materiality, assurance, deadlines and penalties.',
  alternates: { canonical: `${SITE}/csrd` },
  openGraph: {
    type: 'article',
    title: 'What is the CSRD? The Corporate Sustainability Reporting Directive explained',
    description:
      'Plain-English, post-Omnibus guide to the CSRD: who reports now, the ESRS, double materiality, assurance, deadlines and penalties. Sourced and kept current.',
    url: `${SITE}/csrd`,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    images: [{ url: '/brand/og.svg', width: 1200, height: 630, alt: 'CSRD Tools' }]
  }
};

export default function CsrdPillarPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What is the CSRD? The Corporate Sustainability Reporting Directive explained',
    description:
      'A plain-English, post-Omnibus guide to the EU Corporate Sustainability Reporting Directive (CSRD): scope, the ESRS, double materiality, assurance, deadlines and penalties.',
    inLanguage: 'en',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/csrd` },
    author: { '@type': 'Organization', name: 'CSRD Tools', url: SITE },
    publisher: { '@type': 'Organization', name: 'CSRD Tools', url: SITE },
    about: {
      '@type': 'Legislation',
      name: 'Directive (EU) 2022/2464 (Corporate Sustainability Reporting Directive)',
      legislationIdentifier: 'Directive (EU) 2022/2464',
      url: SRC.csrdEurlex
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
      { '@type': 'ListItem', position: 2, name: 'What is the CSRD?', item: `${SITE}/csrd` }
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
            What is the CSRD?
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">
            The CSRD is the EU Corporate Sustainability Reporting Directive, the law that puts
            sustainability reporting on the same footing as financial reporting. After the 2026
            Omnibus, it now applies mainly to companies with more than 1,000 employees and over
            EUR 450 million turnover, who must report under the ESRS standards, run a double
            materiality assessment and get their statement assured.{' '}
            <SourceCite href={SRC.csrdEurlex}>Directive (EU) 2022/2464</SourceCite> sets it out; this
            page explains it without the legalese.
          </p>

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                <li>
                  <strong className="font-semibold">What:</strong> the Corporate Sustainability
                  Reporting Directive, Directive (EU) 2022/2464. It replaced the older NFRD.
                </li>
                <li>
                  <strong className="font-semibold">Who (post-Omnibus):</strong> EU companies with
                  more than 1,000 employees AND more than EUR 450m net turnover. Listed SMEs are out.
                </li>
                <li>
                  <strong className="font-semibold">When:</strong> newly in-scope companies report
                  for FY2027, first reports in 2028; non-EU groups FY2028, reports in 2029.
                </li>
                <li>
                  <strong className="font-semibold">What you report:</strong> the ESRS standards,
                  scoped by a double materiality assessment, plus EU Taxonomy KPIs.
                </li>
                <li>
                  <strong className="font-semibold">How:</strong> limited assurance and digital
                  tagging (Inline XBRL) in the management report.
                </li>
              </ul>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/scope-checker" variant="primary">
              Check if you are in scope
            </Button>
            <Button href="/omnibus" variant="secondary">
              What the Omnibus changed
            </Button>
          </div>
        </Container>
      </header>

      {/* Post-Omnibus headline numbers band */}
      <Section background="ink" eyebrow="Post-Omnibus, at a glance">
        <RevealOnScroll>
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <Icon name="groups" className="text-accent text-3xl" />
              <p className="mt-2 font-display text-3xl lg:text-4xl font-semibold text-accent">
                1,000 + EUR 450m
              </p>
              <p className="mt-2 text-paper/80">
                Employees AND net turnover. Both thresholds must be exceeded to be in scope.
              </p>
            </div>
            <div>
              <Icon name="event" className="text-accent text-3xl" />
              <p className="mt-2 font-display text-3xl lg:text-4xl font-semibold text-accent">
                FY2027 to 2028
              </p>
              <p className="mt-2 text-paper/80">
                Newly in-scope companies report for FY2027, with first reports published in 2028.
              </p>
            </div>
            <div>
              <Icon name="trending_down" className="text-accent text-3xl" />
              <p className="mt-2 font-display text-3xl lg:text-4xl font-semibold text-accent">
                ~80% out
              </p>
              <p className="mt-2 text-paper/80">
                The Commission estimates the Omnibus removed about 80% of previously-covered
                companies.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-paper/70">
            Confirmed by the final Omnibus I Directive (EU) 2026/470, in force 18 March 2026.{' '}
            <SourceCite href={SRC.omnibusFinal}>Council of the EU</SourceCite>.{' '}
            <Link href="/deadlines" className="text-accent underline-offset-2 hover:underline">
              See the full timeline
            </Link>
            .
          </p>
        </RevealOnScroll>
      </Section>

      {/* Main long-form */}
      <Section background="paper">
        <Prose className="max-w-3xl">
          <RevealOnScroll>
            <h2 id="what-it-is" className="inline-flex items-center gap-2">
              <Icon name="description" className="text-primary text-2xl" />
              What the CSRD is, and what it replaced
            </h2>
            <p>
              The Corporate Sustainability Reporting Directive, CSRD for short, is{' '}
              <SourceCite href={SRC.csrdEurlex}>Directive (EU) 2022/2464</SourceCite>, adopted on
              14 December 2022 and in force from 5 January 2023. It requires large companies to
              publish detailed, standardised, audited and machine-readable information about their
              environmental, social and governance impacts, risks and opportunities. It is a
              cornerstone of the European Green Deal and the EU sustainable finance agenda.{' '}
              <SourceCite href={SRC.ecHome}>European Commission</SourceCite>
            </p>
            <p>
              The CSRD replaced and dramatically expanded the older{' '}
              <Link href="/glossary#nfrd">Non-Financial Reporting Directive (NFRD)</Link>,
              Directive 2014/95/EU. The NFRD covered roughly 11,700 large public-interest entities
              and asked only for high-level, largely unstandardised disclosure. The CSRD added
              detailed standards (the ESRS), double materiality, third-party assurance and digital
              tagging. Technically, both operate as amendments to the Accounting Directive
              (2013/34/EU).
            </p>
            <p>
              In plain terms: if you are a big company doing business in the EU, you must report, in
              your management report, in a standardised format, checked by an auditor and digitally
              tagged, how your business affects people and the planet, and how sustainability issues
              affect your business.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="who-must-report" className="inline-flex items-center gap-2">
              <Icon name="groups" className="text-primary text-2xl" />
              Who must report now
            </h2>
            <p>
              After the Omnibus, the CSRD applies to an EU company only if it exceeds{' '}
              <strong>both</strong> of these thresholds: more than <strong>1,000 employees</strong>{' '}
              (average over the financial year) <strong>and</strong> more than{' '}
              <strong>EUR 450 million net turnover</strong>. This is a cumulative AND test on two
              metrics, replacing the old two-of-three test (250 employees / EUR 50m turnover /
              EUR 25m balance sheet); the balance-sheet criterion was dropped entirely.{' '}
              <SourceCite href={SRC.bdoScope}>BDO, post-Omnibus scope</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        {/* Who's in / out cards */}
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="apartment" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                Large EU companies
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                In scope if they exceed more than 1,000 employees AND more than EUR 450m net
                turnover, at individual or group level.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="public" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                Non-EU groups
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Caught with more than EUR 450m EU net turnover (was EUR 150m) plus an EU subsidiary
                that is a large undertaking or a branch with more than EUR 200m turnover.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="storefront" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                Listed SMEs and smaller firms
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Removed from mandatory scope. They can report voluntarily using the{' '}
                <Link href="/glossary#vsme" className="text-primary hover:text-accent-deep">
                  VSME standard
                </Link>{' '}
                and are protected by the value-chain cap.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <Prose className="max-w-3xl mt-8">
          <RevealOnScroll>
            <p>
              A <strong>value-chain cap</strong> protects smaller suppliers: an in-scope company may
              not demand sustainability data beyond the VSME standard from value-chain partners with
              fewer than 1,000 employees. If you are an SME receiving a sprawling questionnaire, you
              can push back. See our{' '}
              <Link href="/suppliers">guide for suppliers being asked for data</Link>.
            </p>
            <p>
              Not sure where you land?{' '}
              <Link href="/scope-checker">Use the scope checker</Link> for a plain-English answer
              including your first reporting year.
            </p>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="info" title="AND, not two-of-three">
              <span className="inline-flex items-start gap-2">
                <Icon name="lightbulb" className="text-accent-deep text-xl shrink-0" />
                <span>
                  Some older summaries still describe scope using the Accounting-Directive
                  two-of-three large-undertaking test. The operative CSRD gate after the Omnibus is
                  the cumulative 1,000-employee AND EUR 450m-turnover combination. Use the AND test.
                </span>
              </span>
            </Callout>
          </RevealOnScroll>
        </div>

        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="omnibus-reset" className="inline-flex items-center gap-2">
              <Icon name="published_with_changes" className="text-primary text-2xl" />
              The Omnibus reset
            </h2>
            <p>
              The single biggest change to the CSRD came from the EU Omnibus I simplification
              process. The final Omnibus I Directive, Directive (EU) 2026/470, was approved by the
              Council on 24 February 2026, published in the Official Journal on 26 February 2026 and
              entered into force on 18 March 2026. Member States must transpose the CSRD parts by
              19 March 2027.{' '}
              <SourceCite href={SRC.omnibusFinal}>Council of the EU</SourceCite>
            </p>
            <p>
              It raised scope thresholds (removing an estimated 80% of previously-covered companies),
              took listed SMEs out, raised the non-EU thresholds, added the value-chain cap, kept
              limited assurance as the ceiling and mandated a sharp cut in ESRS datapoints. There are
              really three separate Omnibus things, and they are easy to confuse: the February 2025
              proposal, the stop-the-clock Directive (EU) 2025/794, and the final Directive (EU)
              2026/470. We keep them straight on the{' '}
              <Link href="/omnibus">Omnibus explainer</Link>.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="timeline" className="inline-flex items-center gap-2">
              <Icon name="schedule" className="text-primary text-2xl" />
              When you report
            </h2>
            <p>
              The Omnibus collapsed the old four-wave structure. Newly in-scope companies (more than
              1,000 employees and more than EUR 450m turnover) report for financial years beginning
              on or after 1 January 2027, with first reports published in 2028. Non-EU groups meeting
              the higher thresholds start with FY2028, reporting in 2029.{' '}
              <SourceCite href={SRC.pwcViewpoint}>PwC Viewpoint</SourceCite>
            </p>
            <p>
              Companies already reporting since FY2024 (the former Wave 1 of large public-interest
              entities with more than 500 employees) that remain above the new thresholds keep
              reporting. Those now below may get a Member-State-optional pause for FY2025 and FY2026,
              with a mandatory exit from FY2027. The full picture, with sources for every date, is on
              the <Link href="/deadlines">deadlines page</Link>.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="what-you-report" className="inline-flex items-center gap-2">
              <Icon name="fact_check" className="text-primary text-2xl" />
              What you report: the ESRS and double materiality
            </h2>
            <p>
              CSRD companies report against the{' '}
              <Link href="/esrs">European Sustainability Reporting Standards (ESRS)</Link>: 12
              standards made up of ESRS 1 and ESRS 2 (cross-cutting) plus E1 to E5 (environment), S1
              to S4 (social) and G1 (governance). The first set was adopted as Delegated Regulation
              (EU) 2023/2772, applicable from FY2024.{' '}
              <SourceCite href={SRC.esrsDelegated}>Delegated Regulation (EU) 2023/2772</SourceCite>
            </p>
            <p>
              Which topical standards apply is decided by a{' '}
              <Link href="/double-materiality">double materiality assessment (DMA)</Link>. A
              sustainability matter is material, and must be reported, if it is significant from{' '}
              <strong>either</strong> an impact perspective (your effect on people and the planet) or
              a financial perspective (its effect on your enterprise value). ESRS 2 general
              disclosures apply to every reporter regardless of materiality.
            </p>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="warn" title="The revised ESRS are still in flux">
              The ESRS are being simplified. EFRAG delivered technical advice on 3 December 2025; the
              Commission published a draft revised delegated act for public consultation from 6 May
              to 3 June 2026, with adoption targeted around 17 September 2026 and application from
              FY2027 (voluntary early use for FY2026). Mandatory datapoints are expected to fall by
              around 60 to 70%, and sector-specific ESRS have been dropped. Treat the current
              ESRS 2023/2772 as the law until the revision is adopted.{' '}
              <SourceCite href={SRC.ecRevisedConsult}>Commission consultation</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>

        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="assurance-digital" className="inline-flex items-center gap-2">
              <Icon name="verified_user" className="text-primary text-2xl" />
              Assurance and digital tagging
            </h2>
            <p>
              The sustainability statement must obtain <strong>limited assurance</strong> from a
              third party, a statutory auditor or, where a Member State allows it, an independent
              assurance services provider. The CSRD originally envisaged a later move to{' '}
              <strong>reasonable</strong> assurance; the Omnibus removed that escalation, so limited
              assurance is now the permanent ceiling. A common EU assurance standard, expected to
              align with ISSA 5000, is anticipated around 1 July 2027.{' '}
              <SourceCite href={SRC.stopClock}>Sidley</SourceCite>
            </p>
            <p>
              Reports must be prepared in <strong>XHTML</strong> and digitally tagged using{' '}
              <Link href="/glossary#xbrl">Inline XBRL</Link> under the European Single Electronic
              Format (ESEF), making them machine-readable and feeding the future European Single
              Access Point (ESAP). EFRAG published the ESRS XBRL taxonomy to enable tagging.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="penalties" className="inline-flex items-center gap-2">
              <Icon name="gavel" className="text-primary text-2xl" />
              Penalties
            </h2>
            <p>
              The CSRD is a directive, so enforcement and sanctions are set by each Member State
              during transposition and must be effective, proportionate and dissuasive. There is no
              single EU-wide penalty, which produces meaningful variation: public-procurement
              exclusion, administrative fines (commentary references up to around 5% of global annual
              turnover in some national regimes), and criminal liability in countries such as France.
              Always check the specific Member State.{' '}
              <SourceCite href={SRC.ecHome}>European Commission</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>
      </Section>

      {/* By the numbers */}
      <Section background="sand" eyebrow="By the numbers" title="The CSRD in a few figures">
        <RevealOnScroll>
          <Stats>
            <Stat value="2022/2464" label="The CSRD directive number; in force since 5 January 2023." />
            <Stat
              value="12"
              label="ESRS standards: ESRS 1 and 2 (cross-cutting) plus E1-E5, S1-S4, G1."
            />
            <Stat
              value="EUR 450m"
              label="Net turnover threshold, combined with more than 1,000 employees (AND test)."
            />
            <Stat value="FY2027" label="First reporting year for the newly in-scope population (reports in 2028)." />
          </Stats>
          <p className="mt-6 text-sm text-muted">
            Scope and timeline confirmed by the Omnibus I Directive (EU) 2026/470.{' '}
            <SourceCite href={SRC.omnibusFinal}>Council of the EU</SourceCite>
          </p>
        </RevealOnScroll>
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

      {/* Sources + closing */}
      <Section background="paper">
        <div className="mx-auto max-w-3xl">
          <Callout variant="info" title="This is guidance, not legal advice">
            This is guidance to help you understand the CSRD, not legal advice. For decisions
            specific to your business, confirm with the official sources we link or a qualified
            adviser. We cannot guarantee compliance, and you should be wary of anyone who says they
            can.
          </Callout>

          <Sources
            items={[
              {
                href: SRC.csrdEurlex,
                label: 'Directive (EU) 2022/2464, the CSRD (EUR-Lex)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.ecHome,
                label: 'European Commission: Corporate sustainability reporting',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.omnibusFinal,
                label: 'Council of the EU: final sign-off of the Omnibus simplification (24 Feb 2026)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.bdoScope,
                label: 'BDO: CSRD post-Omnibus revised scope and requirements',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.pwcViewpoint,
                label: 'PwC Viewpoint: the Omnibus directive finalised',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.esrsDelegated,
                label: 'Delegated Regulation (EU) 2023/2772 (ESRS Set 1)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.ecRevisedConsult,
                label: 'European Commission: consultation on revised ESRS (6 May 2026)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.efragRevision,
                label: 'EFRAG: technical advice on simplified ESRS (3 Dec 2025)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.stopClock,
                label: 'Sidley: stop-the-clock directive and ESRS simplification process',
                retrieved: '8 Jun 2026'
              }
            ]}
          />
        </div>
      </Section>

      <NewsletterSignup
        variant="band"
        background="forest"
        heading="Keep up with the CSRD"
        subcopy="We watch Brussels so you don't. Plain-English CSRD, ESRS and Omnibus updates: what changed, who it hits, what to do."
        source="csrd-pillar"
      />
    </>
  );
}
