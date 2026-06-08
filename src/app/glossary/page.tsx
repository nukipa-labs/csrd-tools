import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { JsonLd } from '@/components/ui';
import { NewsletterSignup } from '@/components/ui';
import { GLOSSARY } from '@/lib/glossary';
import { GlossaryList } from './GlossaryList';

const SITE = 'https://csrd-tools.com';

export const metadata: Metadata = {
  title: 'CSRD Glossary: every term in plain English',
  description:
    'Every CSRD and ESG reporting term decoded in plain English: ESRS, double materiality, DMA, IRO, Scope 1/2/3, EU Taxonomy, VSME, XBRL/ESEF and more. Sourced from the regulation.',
  alternates: { canonical: '/glossary' },
  openGraph: {
    type: 'article',
    title: 'CSRD Glossary: every term in plain English',
    description:
      'Every CSRD and ESG term decoded in plain English: ESRS, double materiality, DMA, Scope 1/2/3, EU Taxonomy, VSME and more.',
    url: `${SITE}/glossary`,
    images: [{ url: '/brand/og.svg', width: 1200, height: 630, alt: 'CSRD Tools' }]
  }
};

export default function GlossaryPage() {
  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'CSRD Glossary',
    description:
      'Plain-English definitions of the key terms in the EU Corporate Sustainability Reporting Directive (Directive (EU) 2022/2464) and the wider ESG reporting landscape.',
    url: `${SITE}/glossary`,
    hasDefinedTerm: GLOSSARY.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE}/glossary#${t.slug}`,
      name: t.term,
      description: t.formal ? `${t.plain} ${t.formal}` : t.plain,
      inDefinedTermSet: `${SITE}/glossary`
    }))
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'CSRD Glossary', item: `${SITE}/glossary` }
    ]
  };

  return (
    <>
      <JsonLd data={[definedTermSet, breadcrumb]} />

      <Container size="lg" className="py-16 lg:py-24">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            CSRD Glossary
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            Every CSRD term, in plain English
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            CSRD and sustainability reporting come with their own vocabulary: ESRS, double
            materiality, DMA, IRO, Scope 1, 2 and 3, EU Taxonomy, VSME, XBRL. Here is each term
            explained simply first, then with the precise legal phrasing, so you can read any CSRD
            document without a law degree. Every definition is grounded in the regulation itself.
          </p>
          <p className="mt-4 text-sm text-muted">
            Need the bigger picture first?{' '}
            <Link
              href="/csrd"
              className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
            >
              Read what the CSRD is
            </Link>
            , or check{' '}
            <Link
              href="/scope-checker"
              className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
            >
              whether you are in scope
            </Link>
            .
          </p>
        </header>

        <div className="mt-12">
          <GlossaryList />
        </div>

        <p className="mt-12 mx-auto max-w-2xl text-center text-sm text-muted">
          This is guidance, not legal advice. Confirm with the official sources we link
          or a qualified adviser. Definitions reference Directive (EU) 2022/2464 (CSRD) as
          amended by the Omnibus I Directive (EU) 2026/470, and related EU instruments.
        </p>
      </Container>

      <NewsletterSignup variant="band" />
    </>
  );
}
