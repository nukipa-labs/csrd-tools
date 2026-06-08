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

const SITE_URL = 'https://csrd-tools.com';

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CSRD Tools',
  url: SITE_URL,
  description:
    'A free, plain-English information hub about the EU Corporate Sustainability Reporting Directive (CSRD).',
  slogan: 'Find your way through EU sustainability reporting.',
  logo: `${SITE_URL}/brand/og.svg`
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CSRD Tools',
  url: SITE_URL,
  description:
    'Plain-English answers, free tools and trustworthy updates on the EU Corporate Sustainability Reporting Directive and the ESRS.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/glossary?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationLd, websiteLd]} />
      <Hero />
      <DeadlineBand />
      <ProblemSolution />
      <Pathways />
      <ToolsStrip />
      <WhyUs />
      <NewsletterFeature />
      <Stats />
      <CTABanner />
    </>
  );
}
