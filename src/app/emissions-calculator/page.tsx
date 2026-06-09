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
  Icon,
  Byline
} from '@/components/ui';
import { EmissionsCalculator } from './EmissionsCalculator';
import { EDITOR_ORG, LAST_REVIEWED_ISO, FIRST_PUBLISHED_ISO } from '@/lib/seo';

const CANONICAL = 'https://csrd-tools.com/emissions-calculator';

export const metadata: Metadata = {
  title: 'Scope 1, 2 & 3 Emissions Calculator (Indicative) | CSRD Tools',
  description:
    'A free, simple Scope 1, 2 and 3 emissions estimator using rough default factors. Get an indicative tCO2e footprint by scope as a first step toward your ESRS E1 GHG inventory.',
  alternates: { canonical: '/emissions-calculator' },
  openGraph: {
    title: 'Free Scope 1, 2 & 3 emissions calculator',
    description:
      'Estimate your indicative carbon footprint by scope, a screening first step toward a CSRD-grade GHG inventory.',
    url: CANONICAL,
    type: 'website'
  }
};

const GHG_SCOPE3 = 'https://ghgprotocol.org/corporate-value-chain-scope-3-standard';
const GHG_HOME = 'https://ghgprotocol.org/corporate-standard';
const EFRAG_E1 =
  'https://www.efrag.org/en/sustainability-reporting/esrs/draft-esrs';

const FAQ = [
  {
    q: 'What is the difference between Scope 1, 2 and 3 emissions?',
    a: 'Scope 1 is direct emissions from sources you own or control, such as fuel burned in boilers and company vehicles. Scope 2 is indirect emissions from the energy you purchase and consume, mainly electricity, heat and steam. Scope 3 is all other indirect emissions across your value chain, both upstream and downstream, split into 15 categories and typically the largest share of the total.'
  },
  {
    q: 'How are emissions calculated?',
    a: 'The basic formula is emissions = activity data x emission factor. You multiply each activity (litres of fuel, kWh of electricity, EUR of spend, passenger-km) by an appropriate emission factor to get a result in tonnes of CO2 equivalent (tCO2e). Credible factor sources include DEFRA, IEA, EPA, IPCC and EXIOBASE for spend-based Scope 3.'
  },
  {
    q: 'What is location-based vs market-based Scope 2?',
    a: 'Location-based Scope 2 uses the average emission factor of the local grid, reflecting the physical electricity mix. Market-based Scope 2 reflects the electricity you contractually buy (power purchase agreements, renewable certificates, green tariffs, supplier-specific factors). The GHG Protocol Scope 2 Guidance and ESRS E1-6 require both to be reported. This calculator gives an indicative location-based figure only.'
  },
  {
    q: 'Is this calculator good enough for CSRD reporting?',
    a: 'No. This is an indicative screening estimate using rough default factors. A CSRD-grade ESRS E1 disclosure needs a proper greenhouse-gas inventory: documented organisational and operational boundaries, dated source-specific emission factors, all 15 Scope 3 categories assessed for relevance, Scope 2 reported both location-based and market-based, and the whole statement subject to limited assurance.'
  }
];

export default function EmissionsCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Scope 1, 2 & 3 Emissions Calculator',
            url: CANONICAL,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any (web)',
            author: EDITOR_ORG,
            datePublished: FIRST_PUBLISHED_ISO,
            dateModified: LAST_REVIEWED_ISO,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'A free interactive tool that estimates an indicative Scope 1, 2 and 3 carbon footprint in tonnes of CO2 equivalent using rough default emission factors.'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to estimate your Scope 1, 2 and 3 emissions',
            description:
              'Produce an indicative carbon footprint by entering a few common activity lines for each scope and multiplying by default emission factors.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Enter Scope 1 fuel use',
                text: 'Add the natural gas, diesel and petrol you burn directly in owned or controlled sources.'
              },
              {
                '@type': 'HowToStep',
                name: 'Enter Scope 2 purchased energy',
                text: 'Add the electricity and district heat you buy. This gives an indicative location-based figure.'
              },
              {
                '@type': 'HowToStep',
                name: 'Enter a few Scope 3 lines',
                text: 'Add common value-chain activities such as purchased goods spend, business air travel, commuting and road freight.'
              },
              {
                '@type': 'HowToStep',
                name: 'Read your indicative total',
                text: 'See your estimated tCO2e by scope and as a stacked total. Treat it as a screening estimate, not a reportable figure.'
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
                name: 'Emissions calculator',
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
            Scope 1, 2 & 3 Emissions Calculator
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            Get a quick, honest first estimate of your carbon footprint by scope. Enter a few common
            activity lines and we'll convert them to an indicative tCO2e total, a screening first step
            toward the greenhouse-gas inventory behind ESRS E1.
          </p>
          <div className="mt-6">
            <Byline />
          </div>
        </Container>
      </section>

      {/* The tool */}
      <Section background="sand" id="calculator">
        <EmissionsCalculator />
      </Section>

      {/* Supporting section */}
      <Section background="paper" containerSize="md">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            The short version
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="co2" className="text-primary text-3xl" />
            How emissions accounting works
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            Every footprint splits into three scopes, and every line follows the same simple formula.
            Here is the picture in plain English.
          </p>
        </div>
        <div className="mt-12">
          <TLDR>
            A carbon footprint is split into Scope 1 (direct), Scope 2 (purchased energy) and Scope 3
            (everything else in the value chain). You calculate each line as activity data times an
            emission factor, summed into tonnes of CO2 equivalent. Scope 3 is usually the biggest
            share. ESRS E1-6 requires all three, with Scope 2 reported both location-based and
            market-based.
          </TLDR>

          <Prose className="mt-10">
            <h3 className="inline-flex items-center gap-2">
              <Icon name="calculate" className="text-primary text-xl" />
              The formula: activity data times emission factor
            </h3>
            <p>
              Every line in a greenhouse-gas inventory follows one rule: emissions = activity data x
              emission factor. Multiply how much you did (litres of fuel, kWh of electricity, EUR of
              spend, passenger-km flown) by a factor that converts it to tonnes of CO2 equivalent. The
              quality of your factors decides the quality of your numbers, which is why a real
              inventory uses dated, source-specific factors rather than the rough defaults in this
              tool.{' '}
              <SourceCite href={GHG_HOME}>GHG Protocol Corporate Standard</SourceCite>
            </p>

            <h3 className="inline-flex items-center gap-2">
              <Icon name="account_tree" className="text-primary text-xl" />
              Scope 3 is usually the largest part
            </h3>
            <p>
              Scope 3 covers all other indirect emissions across your value chain, organised into 15
              categories (8 upstream, 7 downstream): purchased goods and services, capital goods,
              business travel, employee commuting, transport and distribution, use of sold products,
              investments and more. For most organisations Scope 3 is 70 to 90 percent of the total
              once fully measured, so a footprint that looks small on Scope 3 usually just has gaps.{' '}
              <SourceCite href={GHG_SCOPE3}>GHG Protocol Scope 3 Standard</SourceCite>
            </p>

            <h3 className="inline-flex items-center gap-2">
              <Icon name="bolt" className="text-primary text-xl" />
              Scope 2: location-based and market-based
            </h3>
            <p>
              For purchased electricity you report two figures. Location-based uses the average grid
              factor for your region; market-based reflects the electricity you contractually buy
              through power purchase agreements, renewable certificates or green tariffs. ESRS E1-6
              requires both. This calculator shows an indicative location-based estimate only.{' '}
              <SourceCite href={EFRAG_E1}>EFRAG, ESRS E1</SourceCite>
            </p>
          </Prose>

          <div className="mt-8">
            <Callout variant="warn" title="A screening estimate, not a reportable figure">
              The default factors here are rough mid-2020s ballparks, not the dated, source-specific
              factors a CSRD-grade inventory needs. Use this to scope the size of the problem and
              spot which scope dominates, then build a proper inventory with documented boundaries and
              credible factors. We track ESRS E1 and factor guidance in The CSRD Brief.
            </Callout>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="sand" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="help" className="text-primary text-3xl" />
          Emissions questions people ask
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
          This is an indicative estimate to help you orient, not a reportable figure or legal advice.
          Confirm against the GHG Protocol and dated emission factors, or a qualified adviser.
        </p>

        <Sources
          items={[
            {
              href: GHG_HOME,
              label: 'GHG Protocol, Corporate Accounting and Reporting Standard',
              retrieved: '8 Jun 2026'
            },
            {
              href: GHG_SCOPE3,
              label: 'GHG Protocol, Corporate Value Chain (Scope 3) Standard',
              retrieved: '8 Jun 2026'
            },
            {
              href: EFRAG_E1,
              label: 'EFRAG, ESRS E1 Climate change',
              retrieved: '8 Jun 2026'
            }
          ]}
        />
      </Section>
    </>
  );
}
