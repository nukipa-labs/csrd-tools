import Link from 'next/link';
import { JsonLd } from '@/components/ui';
import { Hero } from '@/components/sections/Hero';
import { DeadlineBand } from '@/components/sections/DeadlineBand';
import { ProblemSolution } from '@/components/sections/ProblemSolution';
import { Pathways } from '@/components/sections/Pathways';
import { ToolsStrip } from '@/components/sections/ToolsStrip';
import { WhyUs } from '@/components/sections/WhyUs';
import { NewsletterFeature } from '@/components/sections/NewsletterFeature';
import { Stats } from '@/components/sections/Stats';
import { CTABanner } from '@/components/sections/CTABanner';
import { HomeFAQ, type FaqItem } from '@/components/sections/HomeFAQ';
import {
  SITE_URL,
  ORGANIZATION_LD,
  WEBSITE_LD,
  EDITOR_ORG,
  LAST_REVIEWED_ISO,
  FIRST_PUBLISHED_ISO,
  faqPageLd
} from '@/lib/seo';

// FAQ - plain-text answers feed FAQPage schema; the `node` adds links on-page.
const FAQ: { q: string; answer: string; node: React.ReactNode }[] = [
  {
    q: 'What is the CSRD?',
    answer:
      'The Corporate Sustainability Reporting Directive (Directive (EU) 2022/2464) is the EU law that requires large companies to publish audited, standardised information about their sustainability impacts, risks and opportunities, using the European Sustainability Reporting Standards (ESRS). After the 2026 Omnibus it applies mainly to companies with more than 1,000 employees and over EUR 450 million net turnover.',
    node: (
      <p>
        The Corporate Sustainability Reporting Directive (Directive (EU) 2022/2464) is the EU law
        that requires large companies to publish audited, standardised information about their
        sustainability impacts, risks and opportunities, using the ESRS. After the 2026 Omnibus it
        applies mainly to companies with more than 1,000 employees and over EUR 450 million net
        turnover.{' '}
        <Link href="/csrd" className="text-primary underline decoration-dotted underline-offset-2 hover:text-accent-deep">
          Full CSRD explainer
        </Link>
        .
      </p>
    )
  },
  {
    q: 'Am I in scope for the CSRD after the Omnibus?',
    answer:
      'You are in mandatory CSRD scope only if you exceed both thresholds: more than 1,000 employees AND more than EUR 450 million net turnover. Listed SMEs are now out and can use the voluntary VSME standard. Non-EU groups are caught above EUR 450 million of EU turnover plus a qualifying EU subsidiary or branch.',
    node: (
      <p>
        You are in mandatory scope only if you exceed both thresholds: more than 1,000 employees AND
        more than EUR 450 million net turnover. Listed SMEs are now out and can use the voluntary
        VSME standard. Non-EU groups are caught above EUR 450 million of EU turnover plus a
        qualifying EU presence.{' '}
        <Link href="/scope-checker" className="text-primary underline decoration-dotted underline-offset-2 hover:text-accent-deep">
          Check your scope in two minutes
        </Link>
        .
      </p>
    )
  },
  {
    q: 'What changed with the CSRD Omnibus?',
    answer:
      'The Omnibus directive (Directive (EU) 2026/470, in force 18 March 2026) cut the number of companies in scope by about 80%, raised the thresholds to 1,000 employees and EUR 450 million turnover, removed listed SMEs, postponed reporting so newly in-scope companies first report for financial year 2027 (published in 2028), and is simplifying the ESRS.',
    node: (
      <p>
        The Omnibus directive (Directive (EU) 2026/470, in force 18 March 2026) cut the number of
        companies in scope by about 80%, raised the thresholds, removed listed SMEs, postponed
        reporting (newly in-scope companies first report for FY2027, published 2028), and is
        simplifying the ESRS.{' '}
        <Link href="/omnibus" className="text-primary underline decoration-dotted underline-offset-2 hover:text-accent-deep">
          What the Omnibus changed
        </Link>
        .
      </p>
    )
  },
  {
    q: 'What are the ESRS?',
    answer:
      'The European Sustainability Reporting Standards are the 12 standards that define what CSRD companies report: ESRS 1 and ESRS 2 (cross-cutting) plus E1 to E5 (environment), S1 to S4 (social) and G1 (governance). A revision is cutting the mandatory datapoints by roughly 60 to 70%, applying from financial year 2027.',
    node: (
      <p>
        The European Sustainability Reporting Standards are the 12 standards that define what CSRD
        companies report: ESRS 1 and 2 (cross-cutting) plus E1 to E5 (environment), S1 to S4
        (social) and G1 (governance). A revision is cutting mandatory datapoints by roughly 60 to
        70%, applying from FY2027.{' '}
        <Link href="/esrs" className="text-primary underline decoration-dotted underline-offset-2 hover:text-accent-deep">
          The 12 ESRS standards
        </Link>
        .
      </p>
    )
  }
];

const faqItems: FaqItem[] = FAQ.map((f) => ({ q: f.q, a: f.node }));
const faqLd = faqPageLd(FAQ.map((f) => ({ q: f.q, a: f.answer })));

const webPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: 'CSRD Tools: the plain-English CSRD & ESRS hub',
  description:
    'Plain-English answers, free tools and trustworthy updates on the EU Corporate Sustainability Reporting Directive (CSRD), the ESRS and the Omnibus.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  primaryImageOfPage: `${SITE_URL}/brand/og.png`,
  inLanguage: 'en',
  datePublished: FIRST_PUBLISHED_ISO,
  dateModified: LAST_REVIEWED_ISO,
  author: EDITOR_ORG,
  reviewedBy: EDITOR_ORG
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[ORGANIZATION_LD, WEBSITE_LD, webPageLd, faqLd]} />
      <Hero />
      <DeadlineBand />
      <ProblemSolution />
      <Pathways />
      <ToolsStrip />
      <WhyUs />
      <NewsletterFeature />
      <Stats />
      <HomeFAQ items={faqItems} />
      <CTABanner />
    </>
  );
}
