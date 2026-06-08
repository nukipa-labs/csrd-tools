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
import { ScopeChecker } from './ScopeChecker';

const CANONICAL = 'https://csrd-tools.com/scope-checker';

export const metadata: Metadata = {
  title: 'CSRD Scope Checker: Am I in Scope After the Omnibus? | CSRD Tools',
  description:
    'Answer a few plain-English questions to find out whether the CSRD applies to your business after the Omnibus, and when you would first report. Free and caveated guidance.',
  alternates: { canonical: '/scope-checker' },
  openGraph: {
    title: 'Am I in scope for CSRD? Free post-Omnibus scope checker',
    description:
      'A free, plain-English decision tool to check whether the CSRD applies to your business after the Omnibus, and by when you would report.',
    url: CANONICAL,
    type: 'website'
  }
};

const EURLEX_CSRD = 'https://eur-lex.europa.eu/eli/dir/2022/2464/oj/eng';
const EC_HOME =
  'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en';
const CONSILIUM =
  'https://www.consilium.europa.eu/en/press/press-releases/2026/02/24/council-signs-off-simplification-of-sustainability-reporting-and-due-diligence-requirements-to-boost-eu-competitiveness/';

const FAQ = [
  {
    q: 'Who has to comply with CSRD after the Omnibus?',
    a: 'After the Omnibus, an EU undertaking is in mandatory CSRD scope only if it exceeds both more than 1,000 employees and more than EUR 450 million net turnover, measured at individual or group level. This cumulative AND test replaced the old two-of-three test (250 employees, EUR 50m turnover, EUR 25m balance sheet). The balance-sheet criterion was dropped entirely.'
  },
  {
    q: 'Are SMEs and listed SMEs in scope after the Omnibus?',
    a: 'No. Listed SMEs were removed from mandatory CSRD scope, and smaller companies that miss the thresholds are out of mandatory scope. They can report voluntarily using the VSME (Voluntary SME) standard if they choose. The value-chain cap also protects them: an in-scope customer may not demand data beyond VSME from value-chain partners with fewer than 1,000 employees.'
  },
  {
    q: 'When do newly in-scope companies first report?',
    a: 'Newly defined in-scope EU companies (more than 1,000 employees and more than EUR 450 million turnover) report for financial year 2027, with the first report published in 2028. Non-EU groups that meet the higher thresholds report for FY2028, published in 2029. Former Wave 1 companies that already reported for FY2024 and remain above the thresholds simply continue.'
  },
  {
    q: 'Does CSRD apply to non-EU (third-country) companies?',
    a: 'It can. A non-EU parent is in scope if its group generates more than EUR 450 million of net turnover in the EU for two consecutive years (raised from EUR 150 million) and it has either an EU subsidiary that is a large undertaking or an EU branch with net turnover above EUR 200 million (raised from EUR 40 million). Such groups report at group level under the dedicated non-EU standards (N-ESRS) from FY2028.'
  },
  {
    q: 'I am a small supplier being asked for CSRD data. Do I have to provide it?',
    a: 'Usually not beyond the VSME standard. The Omnibus added a value-chain cap: an in-scope company may not require sustainability data beyond what the voluntary VSME standard specifies from value-chain partners with fewer than 1,000 employees. You can provide VSME-level information and decline requests that go further.'
  }
];

export default function ScopeCheckerPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'CSRD Scope Checker',
            url: CANONICAL,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any (web)',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'A free interactive tool that helps a business work out whether the EU Corporate Sustainability Reporting Directive (CSRD) applies to it after the Omnibus, and when it would first report.'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to check if CSRD applies to your business',
            description:
              'Work out whether the CSRD applies to you after the Omnibus by checking what kind of entity you are, your employee count, your net turnover, and your EU presence.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Identify your entity type',
                text: 'Confirm whether you are an EU undertaking, a non-EU parent with EU activity, or a smaller supplier being asked for data.'
              },
              {
                '@type': 'HowToStep',
                name: 'Check the employee gate',
                text: 'For an EU undertaking, confirm whether you have more than 1,000 employees on average over the financial year, at group level if you consolidate.'
              },
              {
                '@type': 'HowToStep',
                name: 'Check the turnover gate',
                text: 'Confirm whether your net turnover exceeds EUR 450 million. Both gates must be met for mandatory scope.'
              },
              {
                '@type': 'HowToStep',
                name: 'Check your timing',
                text: 'Newly in-scope EU companies first report for FY2027 (published 2028); non-EU groups for FY2028 (published 2029); former Wave 1 reporters continue.'
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
                name: 'Scope checker',
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
            CSRD Scope Checker
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            Not sure if the CSRD applies to your business after the Omnibus? Answer a few
            plain-English questions and get a tailored steer: whether it applies, on what basis,
            when you would first report, and what to do next.
          </p>
        </Container>
      </section>

      {/* The tool */}
      <Section background="sand" id="checker">
        <ScopeChecker />
      </Section>

      {/* How scope works (SEO / GEO supporting section) */}
      <Section background="paper" containerSize="md">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            The short version
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="conversion_path" className="text-primary text-3xl" />
            How CSRD scope works after the Omnibus
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            Three things decide whether the directive lands on you: what kind of entity you are,
            your size, and your EU footprint. Here is each in plain English.
          </p>
        </div>
        <div className="mt-12">
          <TLDR>
            After the Omnibus, an EU undertaking is in mandatory CSRD scope only if it exceeds both
            more than 1,000 employees and more than EUR 450 million net turnover. Listed SMEs are out
            (they can use voluntary VSME). Non-EU parents are caught above EUR 450 million EU turnover
            plus a qualifying EU subsidiary or branch. Newly in-scope EU firms first report for FY2027,
            published in 2028.
          </TLDR>

          <Prose className="mt-10">
            <h3 className="inline-flex items-center gap-2">
              <Icon name="groups" className="text-primary text-xl" />
              The new EU test: 1,000 employees AND EUR 450m turnover
            </h3>
            <p>
              The single biggest Omnibus change is scope. An EU undertaking is now in mandatory scope
              only if it exceeds <strong>both</strong> more than 1,000 employees (average over the
              financial year) <strong>and</strong> more than EUR 450 million net turnover, assessed at
              individual or group level. This is a cumulative AND test on two metrics: the old
              two-of-three test (250 employees, EUR 50m turnover, EUR 25m balance sheet) is superseded,
              and the balance-sheet criterion is dropped.{' '}
              <SourceCite href={CONSILIUM}>Council of the EU, 24 Feb 2026</SourceCite>
            </p>
            <p>
              The Commission claims this removes around 80 percent of previously covered companies,
              taking the population from roughly 50,000 down to about 5,000. <strong>Listed SMEs are
              removed from mandatory scope</strong> and, like other smaller companies, can report
              voluntarily using the VSME standard instead.
            </p>

            <h3 className="inline-flex items-center gap-2">
              <Icon name="public" className="text-primary text-xl" />
              Non-EU parents: tested on their EU footprint
            </h3>
            <p>
              A non-EU (third-country) parent is in scope if its group generates more than{' '}
              <strong>EUR 450 million</strong> of net turnover in the EU for two consecutive years
              (raised from EUR 150 million), <strong>and</strong> it has either an EU subsidiary that
              is a large undertaking or an EU branch with net turnover above{' '}
              <strong>EUR 200 million</strong> (raised from EUR 40 million). These groups report at
              group level under the dedicated standards for non-EU groups (N-ESRS).{' '}
              <SourceCite href={EC_HOME}>European Commission, CSRD overview</SourceCite>
            </p>

            <h3 className="inline-flex items-center gap-2">
              <Icon name="schedule" className="text-primary text-xl" />
              When you report
            </h3>
            <p>
              Newly defined in-scope EU companies report for <strong>financial year 2027</strong>, with
              the first report published in <strong>2028</strong>. Non-EU groups report for{' '}
              <strong>FY2028</strong>, published in <strong>2029</strong>. Former Wave 1 companies
              (large public-interest entities with more than 500 employees) that already reported for
              FY2024 and remain above the thresholds simply continue; those now below may get a
              Member-State-optional pause for FY2025 and FY2026, with a mandatory exit from FY2027.{' '}
              <SourceCite href={EURLEX_CSRD}>Directive (EU) 2022/2464, as amended</SourceCite>
            </p>
          </Prose>

          <div className="mt-8">
            <Callout variant="warn" title="Two parts are still moving">
              The new thresholds are confirmed law (Directive (EU) 2026/470, in force 18 March 2026),
              but they must be transposed into national law by 19 March 2027, and penalties and
              transition options differ by Member State. Separately, the revised "ESRS 2.0" delegated
              act, which cuts mandatory datapoints by roughly 60 to 70 percent, was in public
              consultation (6 May to 3 June 2026) and is not yet adopted. We track both in The CSRD
              Brief.
            </Callout>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="sand" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="help" className="text-primary text-3xl" />
          Scope questions people ask
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
          This is guidance to help you understand the CSRD, not legal advice. CSRD is a directive
          transposed country by country, and some parts are still in flux. For decisions specific to
          your business, confirm with the official sources we link or a qualified adviser.
        </p>

        <Sources
          items={[
            {
              href: EURLEX_CSRD,
              label: 'Directive (EU) 2022/2464 (CSRD) on EUR-Lex',
              retrieved: '8 Jun 2026'
            },
            {
              href: CONSILIUM,
              label:
                'Council of the EU, sign-off of the sustainability reporting simplification (Omnibus), 24 Feb 2026',
              retrieved: '8 Jun 2026'
            },
            {
              href: EC_HOME,
              label: 'European Commission, Corporate sustainability reporting',
              retrieved: '8 Jun 2026'
            }
          ]}
        />
      </Section>
    </>
  );
}
