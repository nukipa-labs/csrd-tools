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
  Icon,
  Byline
} from '@/components/ui';
import { SupplierForm } from './SupplierForm';
import { EDITOR_ORG, LAST_REVIEWED_ISO, FIRST_PUBLISHED_ISO } from '@/lib/seo';

const SITE = 'https://csrd-tools.com';
const PUBLISHED = FIRST_PUBLISHED_ISO;
const MODIFIED = LAST_REVIEWED_ISO;

// Canonical official sources (from research/01-regulation.md sec 10).
const SRC = {
  csrd: 'https://eur-lex.europa.eu/eli/dir/2022/2464/oj/eng',
  omnibus: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202600470',
  ecHome:
    'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en',
  vsme: 'https://www.efrag.org/en/projects/voluntary-reporting-standard-for-smes-vsme/concluded',
  council:
    'https://www.consilium.europa.eu/en/press/press-releases/2026/02/24/council-signs-off-simplification-of-sustainability-reporting-and-due-diligence-requirements-to-boost-eu-competitiveness/'
};

// The three copy-paste response templates (ungated, on-page).
const TEMPLATES: { id: string; label: string; when: string; subject: string; body: string }[] = [
  {
    id: 'out-of-scope',
    label: 'Template 1: You are a small supplier (under 1,000 employees)',
    when: 'Use this when a customer sends a long sustainability questionnaire and your company has fewer than 1,000 employees.',
    subject: 'Our response to your CSRD / sustainability data request',
    body: `Hi [Contact name],

Thanks for your sustainability data request. We want to help you meet your reporting obligations, so here is where we stand.

Our company has fewer than 1,000 employees. Under the CSRD as amended by the Omnibus directive, companies in your reporting scope may not require value-chain partners below 1,000 employees to provide more sustainability information than the voluntary VSME standard sets out. This is often called the "value-chain cap."

On that basis:
- We are happy to share the data points covered by the VSME standard (the basic module).
- For anything beyond VSME, we may not be able to provide it, and we are not required to.

If you can point us to which of your questions map to VSME, we will fill those in promptly. If it would help, we are also glad to send what we already track on energy, emissions and headcount.

Happy to talk it through.

[Your name]
[Your company]`
  },
  {
    id: 'partial',
    label: 'Template 2: You will share VSME-level data',
    when: 'Use this to offer the data you can reasonably provide, on your terms, in a structured way.',
    subject: 'Sustainability data we can provide (VSME basis)',
    body: `Hi [Contact name],

Following up on your request. Here is what we can share, set out against the voluntary VSME standard so it slots into your reporting:

- General information: business model, headcount, locations.
- Environment: energy consumption, Scope 1 and Scope 2 greenhouse-gas emissions where we have them, water and waste basics.
- Social: number of employees, health-and-safety incidents, basic workforce figures.
- Governance: any convictions or fines for corruption or bribery (none, in our case, unless stated otherwise).

We have used our best available figures and flagged any estimates. If you need a specific format (a spreadsheet template, a particular reporting period), send it over and we will fill it in.

For data points outside the VSME standard, please note the value-chain cap applies to us as a company with fewer than 1,000 employees, so we may not be able to provide those.

Best regards,
[Your name]
[Your company]`
  },
  {
    id: 'clarify',
    label: 'Template 3: Ask the customer to narrow the request',
    when: 'Use this when the questionnaire is huge, generic, or clearly built for a large reporter rather than a small supplier.',
    subject: 'Quick question on your sustainability data request',
    body: `Hi [Contact name],

Thanks for sending the sustainability questionnaire. Before we invest time in it, could you help us scope it correctly?

We are a smaller company (fewer than 1,000 employees). Under the CSRD value-chain cap, companies in reporting scope can ask value-chain partners our size only for data within the voluntary VSME standard, not the full ESRS data set. A lot of the questions in your form look like full-ESRS items.

Could you let us know:
1. Which questions you actually need from a supplier of our size?
2. Whether the VSME basic module would meet your needs?
3. The reporting period and format you need?

Once we know that, we will turn the relevant answers around quickly. We would rather give you accurate VSME-level data than guess at items that do not apply to us.

Thanks,
[Your name]
[Your company]`
  }
];

const FAQ = [
  {
    q: 'Do I even have to respond to a CSRD data request?',
    a: 'Not necessarily. If your company has fewer than 1,000 employees, the CSRD value-chain cap means an in-scope customer cannot require you to provide more than the voluntary VSME standard contains. You are not legally obliged to complete a full-ESRS questionnaire. In practice you will often still want to share VSME-level data to keep the commercial relationship healthy, but you can decline anything beyond it.'
  },
  {
    q: 'What is VSME?',
    a: 'VSME is the Voluntary Sustainability Reporting Standard for SMEs, developed by EFRAG. It is a much shorter, simpler standard than the full ESRS, built for smaller companies that are not in mandatory CSRD scope. It also acts as the ceiling for what in-scope companies can demand from value-chain partners with fewer than 1,000 employees.'
  },
  {
    q: 'What is the value-chain cap?',
    a: 'The value-chain cap is a protection in the Omnibus directive. Companies that are in CSRD scope may not require sustainability information beyond the VSME standard from value-chain partners (suppliers, customers) that have fewer than 1,000 employees. It exists to stop the reporting burden trickling down onto smaller firms that the CSRD deliberately took out of scope.'
  },
  {
    q: 'My company is large. Am I in scope myself?',
    a: 'You are in mandatory CSRD scope only if you exceed both thresholds: more than 1,000 employees AND more than EUR 450 million net turnover. If you meet both, you are a reporter, not just a requestee, and you should use the scope checker and the ESRS pages. If you do not, the value-chain cap protects you when others ask for data.'
  }
];

export const metadata: Metadata = {
  title: 'Asked for CSRD or sustainability data? Your supplier guide (+ free templates) | CSRD Tools',
  description:
    'A plain-English guide for suppliers and SMEs asked for sustainability data: whether you have to respond, the value-chain cap, the VSME standard, and three copy-paste response templates.',
  alternates: { canonical: '/suppliers' },
  openGraph: {
    title: 'Asked for CSRD or sustainability data? Your supplier guide (+ free templates)',
    description:
      'Whether you have to respond, the value-chain cap, VSME, and three copy-paste response templates. Free to use.',
    url: `${SITE}/suppliers`,
    type: 'article'
  }
};

function TemplateBlock({
  label,
  when,
  subject,
  body
}: {
  label: string;
  when: string;
  subject: string;
  body: string;
}) {
  return (
    <figure className="overflow-hidden rounded-card border border-line bg-card">
      <figcaption className="border-b border-line bg-sand-tint px-5 py-3">
        <p className="font-display font-semibold text-lg text-ink">{label}</p>
        <p className="mt-1 text-sm text-muted">{when}</p>
      </figcaption>
      <div className="px-5 py-4">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent-deep">Subject</p>
        <p className="mt-1 font-mono text-sm text-ink">{subject}</p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-accent-deep">Body</p>
        <pre className="mt-2 max-h-[28rem] overflow-auto whitespace-pre-wrap break-words rounded-md bg-sand-tint p-4 font-mono text-sm leading-relaxed text-ink">
{body}
        </pre>
        <p className="mt-3 text-xs text-muted">
          Select the text above to copy it, then swap in the [bracketed] details for your situation.
        </p>
      </div>
    </figure>
  );
}

export default function SuppliersPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline:
              'Asked for CSRD or sustainability data? A plain-English guide for suppliers',
            description:
              'Whether you have to respond to a sustainability data request, the value-chain cap, the VSME standard, and copy-paste response templates.',
            datePublished: PUBLISHED,
            dateModified: MODIFIED,
            author: EDITOR_ORG,
            reviewedBy: EDITOR_ORG,
            publisher: { '@type': 'Organization', name: 'CSRD Tools' }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a }
            }))
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'For suppliers',
                item: `${SITE}/suppliers`
              }
            ]
          }
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container size="md" className="relative z-10 py-16 lg:py-24">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            For suppliers and SMEs
          </p>
          <h1 className="mt-4 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            A customer is asking you for sustainability data. Now what?
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            A big customer has sent you a CSRD or ESG questionnaire and you have no sustainability
            team, no budget for software, and no idea whether you even have to fill it in. The good
            news: if your company has fewer than 1,000 employees, the rules are firmly on your side.
            This page explains whether you have to respond, what you can decline, and gives you three
            ready-to-send replies.
          </p>
          <div className="mt-6">
            <Byline />
          </div>
        </Container>
      </section>

      {/* TL;DR */}
      <Section background="sand" containerSize="md">
        <RevealOnScroll>
          <TLDR>
            If your company has <strong>fewer than 1,000 employees</strong>, an in-scope customer{' '}
            <strong>cannot require you to provide more than the voluntary VSME standard</strong> (the{' '}
            <strong>value-chain cap</strong>). You are not obliged to complete a full-ESRS
            questionnaire. In practice it is usually smart to share VSME-level data to keep the
            relationship healthy, but anything beyond that is optional, and you can say no.
          </TLDR>
        </RevealOnScroll>
      </Section>

      {/* 1. Do you even have to respond? */}
      <Section background="paper" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="help" className="text-primary text-3xl" />
          Do you even have to respond?
        </h2>
        <div className="mt-12">
          <RevealOnScroll>
            <div className="space-y-4 text-ink/90 leading-relaxed">
              <p>
                Whether you have to respond, and how much, depends almost entirely on your size. The
                CSRD was deliberately narrowed by the Omnibus directive so that the reporting burden
                falls on large companies, not their smaller partners.
              </p>
              <ul className="space-y-4">
                <li className="rounded-card border border-line bg-card p-5">
                  <p className="font-display font-semibold text-lg text-ink">
                    Fewer than 1,000 employees
                  </p>
                  <p className="mt-2 text-ink/90">
                    The value-chain cap protects you. An in-scope customer may not require more than
                    the VSME standard from you. You can share VSME-level data and decline the rest. A
                    full-ESRS questionnaire is not something you are obliged to complete.{' '}
                    <SourceCite href={SRC.council}>
                      Council, Omnibus sign-off (Feb 2026)
                    </SourceCite>
                    .
                  </p>
                </li>
                <li className="rounded-card border border-line bg-card p-5">
                  <p className="font-display font-semibold text-lg text-ink">
                    Over 1,000 employees but under EUR 450m turnover
                  </p>
                  <p className="mt-2 text-ink/90">
                    You are not a mandatory CSRD reporter (you need both thresholds), but the
                    value-chain cap is written around the 1,000-employee line, so check carefully and
                    negotiate. You may still choose to report voluntarily.
                  </p>
                </li>
                <li className="rounded-card border border-line bg-card p-5">
                  <p className="font-display font-semibold text-lg text-ink">
                    Over 1,000 employees AND over EUR 450m turnover
                  </p>
                  <p className="mt-2 text-ink/90">
                    You are likely an in-scope reporter yourself, not just a requestee. Use the{' '}
                    <Link href="/scope-checker" className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid">
                      scope checker
                    </Link>{' '}
                    to confirm, then head to the{' '}
                    <Link href="/esrs" className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid">
                      ESRS
                    </Link>{' '}
                    and{' '}
                    <Link href="/double-materiality" className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid">
                      double materiality
                    </Link>{' '}
                    pages.
                  </p>
                </li>
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* 2. The value-chain cap */}
      <Section background="sand" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="shield" className="text-primary text-3xl" />
          The value-chain cap, plainly
        </h2>
        <div className="mt-12">
          <RevealOnScroll>
            <div className="space-y-4 text-ink/90 leading-relaxed">
              <p>
                The value-chain cap is the single most useful fact for a smaller supplier. It says:
                companies that are in CSRD scope <strong>may not demand sustainability data beyond
                the VSME standard</strong> from value-chain partners with{' '}
                <strong>fewer than 1,000 employees</strong>. It was added precisely to stop large
                reporters pushing their full reporting burden down onto small firms.
              </p>
              <p>
                In practice that means you can read any monster questionnaire through one filter: is
                this within VSME? If yes, it is reasonable to answer. If no, you can point to the cap
                and decline, politely, using the templates below.
              </p>
              <Callout variant="warn" title="The detail is still being finalised">
                The VSME standard and parts of the Omnibus implementation are still being formalised
                through 2026 (the VSME delegated act is expected around mid-2026, and Member States
                must transpose the new rules by 19 March 2027). The core principle, the cap at 1,000
                employees, is confirmed in the directive, but the exact VSME data points may shift a
                little. We track this in The CSRD Brief.{' '}
                <SourceCite href={SRC.vsme}>EFRAG, VSME standard</SourceCite>.
              </Callout>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* 3. The response templates (ungated) */}
      <Section background="paper" containerSize="md">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Copy-paste, free
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="mail" className="text-primary text-3xl" />
            Three replies you can send today
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            Plain-English and ready to send. Copy the text, swap in your details, hit send. No email
            or signup needed to use these.
          </p>
        </div>
        <div className="mt-12 space-y-8">
          {TEMPLATES.map((t, i) => (
            <RevealOnScroll key={t.id} delay={i}>
              <TemplateBlock label={t.label} when={t.when} subject={t.subject} body={t.body} />
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* 4. How to handle the request well */}
      <Section background="sand" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="checklist" className="text-primary text-3xl" />
          How to handle the request well
        </h2>
        <RevealOnScroll>
          <div className="mt-12 space-y-4 text-ink/90 leading-relaxed">
            <p>
              <strong>Confirm your size first.</strong> The whole answer turns on whether you are
              under 1,000 employees. Get that straight before you respond, because it decides whether
              the value-chain cap applies to you.
            </p>
            <p>
              <strong>Offer something, don&apos;t just refuse.</strong> Even when you can decline the
              full questionnaire, sharing VSME-level data, headcount, energy use, Scope 1 and Scope 2
              emissions, keeps the relationship warm and is usually quick. A helpful partial answer
              beats a flat no.
            </p>
            <p>
              <strong>Ask the customer to narrow the ask.</strong> Many large companies send the same
              generic full-ESRS form to every supplier. It is fair to ask which questions actually
              apply to a supplier of your size. Template 3 does this.
            </p>
            <p>
              <strong>Keep a copy of what you sent.</strong> Save your response and the data behind
              it. If the same customer (or another) asks again next year, you can reuse it, and you
              have a record of what you provided and on what basis.
            </p>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Soft upgrade: SupplierForm */}
      <Section background="paper" containerSize="md">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Optional
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="print" className="text-primary text-3xl" />
            Want the printable kit?
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            The templates above stay free to copy. If you&apos;d like a print-ready PDF kit, and a
            heads-up when the VSME standard and the rules change, leave your email.
          </p>
        </div>
        <div className="mt-12">
          <RevealOnScroll>
            <SupplierForm />
          </RevealOnScroll>
        </div>
      </Section>

      {/* 5. FAQ */}
      <Section background="sand" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="help" className="text-primary text-3xl" />
          Questions suppliers ask
        </h2>
        <div className="mt-12 space-y-6">
          {FAQ.map((f, i) => (
            <RevealOnScroll key={f.q} delay={i}>
              <div className="rounded-card border border-line bg-card p-6">
                <h3 className="font-display font-semibold text-xl text-ink">{f.q}</h3>
                <p className="mt-3 text-ink/90 leading-relaxed">{f.a}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* Cross-links */}
      <Section background="forest" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-paper">
          <Icon name="arrow_forward" className="text-accent text-3xl" />
          Keep going
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link
            href="/scope-checker"
            className="rounded-card border border-paper/20 bg-paper/5 p-5 transition-colors hover:border-accent"
          >
            <p className="font-display font-semibold text-lg text-paper">Am I in scope?</p>
            <p className="mt-1 text-sm text-paper/80">
              Check whether the CSRD applies to you, and which first-report year is yours.
            </p>
          </Link>
          <Link
            href="/csrd"
            className="rounded-card border border-paper/20 bg-paper/5 p-5 transition-colors hover:border-accent"
          >
            <p className="font-display font-semibold text-lg text-paper">What is the CSRD?</p>
            <p className="mt-1 text-sm text-paper/80">
              The plain-English explainer, post-Omnibus: who it covers and what it requires.
            </p>
          </Link>
          <Link
            href="/emissions-calculator"
            className="rounded-card border border-paper/20 bg-paper/5 p-5 transition-colors hover:border-accent"
          >
            <p className="font-display font-semibold text-lg text-paper">Emissions calculator</p>
            <p className="mt-1 text-sm text-paper/80">
              Work out the Scope 1 and 2 figures a customer may reasonably ask for.
            </p>
          </Link>
          <Link
            href="/glossary"
            className="rounded-card border border-paper/20 bg-paper/5 p-5 transition-colors hover:border-accent"
          >
            <p className="font-display font-semibold text-lg text-paper">Glossary</p>
            <p className="mt-1 text-sm text-paper/80">
              VSME, ESRS, double materiality and the rest of the acronyms, in plain English.
            </p>
          </Link>
        </div>
        <p className="mt-8">
          <Button as="a" href="/scope-checker" variant="primary">
            Check if you are in scope
          </Button>
        </p>
      </Section>

      {/* Sources + not-legal-advice */}
      <Section background="paper" containerSize="md">
        <Sources
          items={[
            {
              href: SRC.csrd,
              label: 'Directive (EU) 2022/2464 (CSRD), on EUR-Lex',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.omnibus,
              label: 'Directive (EU) 2026/470 (Omnibus I), on EUR-Lex',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.council,
              label: 'Council of the EU, Omnibus simplification sign-off, Feb 2026',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.vsme,
              label: 'EFRAG, Voluntary Sustainability Reporting Standard for SMEs (VSME)',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.ecHome,
              label: 'European Commission, Corporate sustainability reporting',
              retrieved: '8 Jun 2026'
            }
          ]}
        />
        <p className="mt-8 text-sm text-muted leading-relaxed">
          This is guidance to help you understand the CSRD and EU sustainability reporting, not legal
          advice. For decisions specific to your business, confirm with the official sources we link
          or a qualified adviser.
        </p>
      </Section>
    </>
  );
}
