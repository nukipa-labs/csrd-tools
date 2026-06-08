import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
import { ESRS_STANDARDS, getStandard } from '@/lib/esrs';

const SITE = 'https://csrd-tools.com';
const PUBLISHED = '2025-09-01';
const MODIFIED = '2026-06-08';

const SRC = {
  esrsDelegated: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R2772',
  csrdEurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2464/oj/eng',
  efragHub: 'https://www.efrag.org/en',
  ecRevisedConsult:
    'https://finance.ec.europa.eu/news/commission-seeks-feedback-revised-sustainability-reporting-standards-2026-05-06_en'
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ESRS_STANDARDS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getStandard(slug);
  if (!s) return {};
  const url = `${SITE}/esrs/${s.slug}`;
  const title = `${s.code} ${s.name}: requirements and disclosures | CSRD Tools`;
  const description = `${s.code} (${s.name}) under the CSRD: ${s.tagline} What it covers, why it matters and common questions, in plain English. Post-Omnibus and sourced.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${s.code} ${s.name}: requirements and disclosures`,
      description,
      url,
      publishedTime: PUBLISHED,
      modifiedTime: MODIFIED,
      images: [{ url: '/brand/og.svg', width: 1200, height: 630, alt: 'CSRD Tools' }]
    }
  };
}

export default async function EsrsStandardPage({ params }: Props) {
  const { slug } = await params;
  const s = getStandard(slug);
  if (!s) notFound();

  const url = `${SITE}/esrs/${s.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${s.code} ${s.name}: requirements and disclosures`,
    description: `${s.code} (${s.name}) under the CSRD. ${s.tagline}`,
    inLanguage: 'en',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'CSRD Tools', url: SITE },
    publisher: { '@type': 'Organization', name: 'CSRD Tools', url: SITE },
    about: {
      '@type': 'Legislation',
      name: 'Delegated Regulation (EU) 2023/2772 (ESRS)',
      legislationIdentifier: 'Delegated Regulation (EU) 2023/2772',
      url: SRC.esrsDelegated
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faqs.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'ESRS standards', item: `${SITE}/esrs` },
      { '@type': 'ListItem', position: 3, name: `${s.code} ${s.name}`, item: url }
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
            ESRS standard {'·'} {s.pillar}
          </p>
          <div className="mt-3 flex items-center gap-4">
            <Icon name={s.icon} className="text-primary text-5xl" />
            <div>
              <p className="font-mono text-sm font-semibold text-accent-deep">{s.code}</p>
              <h1 className="font-display font-semibold text-4xl lg:text-6xl text-ink leading-tight">
                {s.name}
              </h1>
            </div>
          </div>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">{s.intro}</p>

          <div className="mt-8">
            <TLDR title={`${s.code} in brief`}>
              <p>{s.tagline}</p>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/esrs" variant="secondary">
              Back to all ESRS
            </Button>
            <Button href="/double-materiality" variant="ghost">
              How materiality decides if this applies
            </Button>
          </div>
        </Container>
      </header>

      {/* What it covers */}
      <Section background="paper" eyebrow="In scope">
        <div className="mx-auto max-w-3xl">
          <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="fact_check" className="text-primary text-3xl" />
            What {s.code} requires
          </h2>
          <RevealOnScroll>
            <Prose className="mt-6">
              <ul>
                {s.covers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                These requirements sit in the ESRS, adopted as{' '}
                <SourceCite href={SRC.esrsDelegated}>Delegated Regulation (EU) 2023/2772</SourceCite>,
                under the CSRD,{' '}
                <SourceCite href={SRC.csrdEurlex}>Directive (EU) 2022/2464</SourceCite>.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Why material */}
      {s.whyMaterial ? (
        <Section background="sand" eyebrow="Materiality">
          <div className="mx-auto max-w-3xl">
            <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
              <Icon name="balance" className="text-primary text-3xl" />
              When {s.code} tends to be material
            </h2>
            <RevealOnScroll>
              <Prose className="mt-6">
                <p>{s.whyMaterial}</p>
                <p>
                  Whether you must report {s.code} is decided by your{' '}
                  <Link href="/double-materiality">double materiality assessment</Link>. A topic is
                  material, and must be disclosed, if it is significant from either an impact or a
                  financial perspective.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </Section>
      ) : null}

      {/* Revision flag */}
      <Section background={s.whyMaterial ? 'paper' : 'sand'}>
        <div className="mx-auto max-w-3xl">
          <RevealOnScroll>
            <Callout variant="warn" title="Datapoints are changing under the revised ESRS">
              The ESRS are being simplified under the Omnibus. The Commission published a draft
              revised delegated act for consultation from 6 May to 3 June 2026, cutting mandatory
              datapoints by around 60 to 70% and clarifying the materiality filter, with adoption
              targeted around 17 September 2026 and application from FY2027. The specific disclosure
              requirements in {s.code} may be restructured. Treat the current ESRS 2023/2772 as the
              law until the revision is adopted.{' '}
              <SourceCite href={SRC.ecRevisedConsult}>Commission consultation</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>
      </Section>

      {/* FAQ */}
      <Section background={s.whyMaterial ? 'sand' : 'paper'} eyebrow="FAQ">
        <div className="mx-auto max-w-3xl">
          <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="help" className="text-primary text-3xl" />
            {s.code}: common questions
          </h2>
          <dl className="mt-6 divide-y divide-line">
            {s.faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-lg font-semibold text-ink">{f.q}</dt>
                <dd className="mt-2 text-ink/90 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* CTA + cross-links */}
      <Section background="forest" align="center">
        <div className="mx-auto max-w-2xl text-center">
          <RevealOnScroll>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-paper">
              Work out which ESRS apply to you
            </h2>
            <p className="mt-4 text-paper/80 leading-relaxed">
              Your double materiality assessment decides which topical standards you must report.
              Start there, then explore the rest of the ESRS.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/double-materiality" variant="primary">
                Double materiality guide
              </Button>
            </div>
            <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/esrs" className="text-accent underline-offset-2 hover:underline">
                All ESRS standards
              </Link>
              <Link href="/csrd" className="text-accent underline-offset-2 hover:underline">
                What is the CSRD?
              </Link>
              <Link
                href="/scope-1-2-3-emissions"
                className="text-accent underline-offset-2 hover:underline"
              >
                Scope 1, 2 & 3 emissions
              </Link>
              <Link href="/scope-checker" className="text-accent underline-offset-2 hover:underline">
                Am I in scope?
              </Link>
            </nav>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Sources + disclaimer */}
      <Section background="paper">
        <div className="mx-auto max-w-3xl">
          <Callout variant="info" title="This is guidance, not legal advice">
            This is guidance to help you understand {s.code} ({s.name}), not legal advice. For
            decisions specific to your business, confirm with the official sources we link or a
            qualified adviser.
          </Callout>

          <Sources
            items={[
              {
                href: SRC.esrsDelegated,
                label: 'Delegated Regulation (EU) 2023/2772 (ESRS Set 1) (EUR-Lex)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.csrdEurlex,
                label: 'Directive (EU) 2022/2464, the CSRD (EUR-Lex)',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.efragHub,
                label: 'EFRAG: European Financial Reporting Advisory Group',
                retrieved: '8 Jun 2026'
              },
              {
                href: SRC.ecRevisedConsult,
                label: 'European Commission: consultation on revised ESRS (6 May 2026)',
                retrieved: '8 Jun 2026'
              }
            ]}
          />
        </div>
      </Section>

      <NewsletterSignup
        variant="band"
        background="forest"
        heading="Stay current on the ESRS"
        subcopy="We watch Brussels so you don't. Plain-English alerts when the simplified ESRS and datapoints change."
        source={`esrs-${s.slug}`}
      />
    </>
  );
}
