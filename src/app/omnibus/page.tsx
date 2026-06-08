import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Container,
  Section,
  TLDR,
  Callout,
  SourceCite,
  Sources,
  JsonLd,
  NewsletterSignup,
  Icon
} from '@/components/ui';

const SITE = 'https://csrd-tools.com';
const PAGE_URL = `${SITE}/omnibus`;

// ---- Canonical official + authoritative sources (research/01 sections 4, 10) ----
const SRC = {
  council:
    'https://www.consilium.europa.eu/en/press/press-releases/2026/02/24/council-signs-off-simplification-of-sustainability-reporting-and-due-diligence-requirements-to-boost-eu-competitiveness/',
  legTrain:
    'https://www.europarl.europa.eu/legislative-train/package-simplification-business/file-first-omnibus-package-on-sustainability-proposal-amending-csrd-and-csddd',
  stopClock:
    'https://www.sidley.com/en/insights/newsupdates/2025/04/eu-omnibus-package-eu-adopts-stop-the-clock-directive-and-begins-esrs-simplification-process',
  covington:
    'https://www.cov.com/en/news-and-insights/insights/2026/02/eu-csddd-csrd-omnibus-published-in-official-journal-transposition-delegated-acts-and-guidelines-are-next',
  pwcViewpoint: 'https://viewpoint.pwc.com/gx/en/pwc/in-briefs/ib_int202527.html',
  bdoScope:
    'https://www.bdo.com/insights/sustainability-and-esg/csrd-post-omnibus-revised-scope-and-requirements',
  ecRevisedConsult:
    'https://finance.ec.europa.eu/news/commission-seeks-feedback-revised-sustainability-reporting-standards-2026-05-06_en',
  efragRevision:
    'https://www.efrag.org/en/news-and-calendar/news/efrag-provides-its-technical-advice-on-draft-simplified-esrs-to-the-european-commission',
  dlaPiper:
    'https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/corporate-sustainability-reporting-directive-amendments-under-omnibus-i-finalised'
};

export const metadata: Metadata = {
  title: 'The CSRD Omnibus: What Changed (Live Tracker) | CSRD Tools',
  description:
    'A plain-English, live explainer of the CSRD Omnibus: the three Omnibus things (proposal, stop-the-clock 2025/794, final 2026/470), what changed (scope ~80% cut, listed SMEs out, FY2027 to 2028, value-chain cap, ESRS revision), and what is settled versus still pending.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'The CSRD Omnibus: what changed, settled vs pending',
    description:
      'The three Omnibus things kept straight, what the final Directive (EU) 2026/470 changed, and a live status board on what is still in flux.',
    url: PAGE_URL,
    type: 'article'
  }
};

// ----------------------------------------------------------------------------
// Status pill
// ----------------------------------------------------------------------------

type Status = 'confirmed' | 'influx' | 'proposed' | 'superseded';

const STATUS_STYLE: Record<Status, string> = {
  confirmed: 'bg-low text-primary border border-primary/25',
  influx: 'bg-warn text-accent-deep border border-accent/40',
  proposed: 'bg-transparent text-accent-deep border border-dashed border-accent/60',
  superseded: 'bg-sand-tint text-muted border border-line'
};

const STATUS_LABEL: Record<Status, string> = {
  confirmed: 'Confirmed law',
  influx: 'In flux',
  proposed: 'Proposed',
  superseded: 'Superseded'
};

function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-chip px-2.5 py-0.5 font-body text-xs font-semibold ${STATUS_STYLE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

// ----------------------------------------------------------------------------
// The three Omnibus things
// ----------------------------------------------------------------------------

type OmnibusThing = {
  tag: string;
  title: string;
  date: string;
  status: Status;
  body: ReactNode;
  source: { href: string; label: string };
};

const THREE_THINGS: OmnibusThing[] = [
  {
    tag: '1. The proposal',
    title: 'Omnibus I proposal',
    date: '26 Feb 2025',
    status: 'superseded',
    body: (
      <>
        The European Commission published the Omnibus I package, a set of proposals to simplify
        CSRD, the CSDDD, the EU Taxonomy and CBAM together, driven by the EU competitiveness agenda.
        This was a proposal only, not law. It was split into a timing track and a substantive track.
      </>
    ),
    source: { href: SRC.legTrain, label: 'European Parliament Legislative Train' }
  },
  {
    tag: '2. Stop-the-clock',
    title: 'Directive (EU) 2025/794',
    date: 'In force 17 Apr 2025',
    status: 'confirmed',
    body: (
      <>
        The timing track. Published in the Official Journal on 16 April 2025 and in force from
        17 April 2025, it postponed CSRD Waves 2 and 3 by two years (and delayed the CSDDD), buying
        time to negotiate the substance. It did not change thresholds, only timing.
      </>
    ),
    source: { href: SRC.stopClock, label: 'Sidley' }
  },
  {
    tag: '3. Final Omnibus',
    title: 'Directive (EU) 2026/470',
    date: 'In force 18 Mar 2026',
    status: 'confirmed',
    body: (
      <>
        The substantive track. The Council approved the final text on 24 February 2026; it was
        published in the Official Journal on 26 February 2026 and entered into force on 18 March
        2026. This is the directive that actually changed scope, thresholds, assurance and the
        value-chain rules. CSRD transposition is due 19 March 2027.
      </>
    ),
    source: { href: SRC.council, label: 'Council of the EU' }
  }
];

// ----------------------------------------------------------------------------
// What changed (status board rows)
// ----------------------------------------------------------------------------

type StatusRow = {
  title: string;
  date: string;
  status: Status;
  body: ReactNode;
  source: { href: string; label: string };
};

const STATUS_BOARD: StatusRow[] = [
  {
    title: 'Scope cut ~80% (new thresholds)',
    date: 'Confirmed (Dir. 2026/470)',
    status: 'confirmed',
    body: (
      <>
        The CSRD now applies to EU companies with more than 1,000 employees AND more than EUR 450m
        net turnover, a cumulative AND test that drops the old two-of-three rule. The Commission
        estimates this removes about 80% of previously-covered companies, from roughly 50,000 to
        around 5,000.
      </>
    ),
    source: { href: SRC.bdoScope, label: 'BDO' }
  },
  {
    title: 'Listed SMEs removed from mandatory scope',
    date: 'Confirmed (Dir. 2026/470)',
    status: 'confirmed',
    body: (
      <>
        The entire former Wave 3 listed-SME category is taken out of mandatory CSRD. Smaller
        companies instead use the voluntary{' '}
        <Link
          href="/glossary#vsme"
          className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
        >
          VSME standard
        </Link>{' '}
        if they choose to report.
      </>
    ),
    source: { href: SRC.pwcViewpoint, label: 'PwC Viewpoint' }
  },
  {
    title: 'Non-EU thresholds raised',
    date: 'Confirmed (Dir. 2026/470)',
    status: 'confirmed',
    body: (
      <>
        Third-country groups are caught with more than EUR 450m EU net turnover (up from EUR 150m)
        plus an EU subsidiary that is a large undertaking or an EU branch with more than EUR 200m
        turnover (up from EUR 40m).
      </>
    ),
    source: { href: SRC.bdoScope, label: 'BDO' }
  },
  {
    title: 'Reporting delayed: FY2027, first reports 2028',
    date: 'Confirmed (stop-the-clock + Dir. 2026/470)',
    status: 'confirmed',
    body: (
      <>
        The old wave structure is effectively collapsed. Newly in-scope companies report for FY2027,
        with first reports in 2028; non-EU groups start FY2028, reporting 2029. Wave 1 companies that
        already report and remain above the thresholds continue.{' '}
        <Link
          href="/deadlines"
          className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
        >
          See the full timeline
        </Link>
        .
      </>
    ),
    source: { href: SRC.dlaPiper, label: 'DLA Piper' }
  },
  {
    title: 'Value-chain cap (trickle-down protection)',
    date: 'Confirmed (Dir. 2026/470)',
    status: 'confirmed',
    body: (
      <>
        In-scope companies may not demand sustainability data beyond the VSME standard from
        value-chain partners with fewer than 1,000 employees. This shields smaller suppliers from
        sprawling questionnaires.
      </>
    ),
    source: { href: SRC.council, label: 'Council of the EU' }
  },
  {
    title: 'Reasonable assurance dropped',
    date: 'Confirmed (Dir. 2026/470)',
    status: 'confirmed',
    body: (
      <>
        The planned move from limited to reasonable assurance was removed. Limited assurance is now
        the permanent ceiling, not a transitional step. A common EU assurance standard (aligned with
        ISSA 5000) is expected around 1 July 2027.
      </>
    ),
    source: { href: SRC.stopClock, label: 'Sidley' }
  },
  {
    title: 'ESRS revision (datapoints cut ~60-70%)',
    date: 'In consultation, adoption target ~17 Sep 2026',
    status: 'influx',
    body: (
      <>
        EFRAG delivered technical advice on 3 December 2025; the Commission published a draft revised
        ESRS delegated act for consultation from 6 May to 3 June 2026. Mandatory datapoints are
        expected to fall by around 60 to 70%. Adoption is targeted around 17 September 2026, applying
        from FY2027 (voluntary early use FY2026). Not yet adopted.
      </>
    ),
    source: { href: SRC.ecRevisedConsult, label: 'European Commission' }
  },
  {
    title: 'Sector-specific ESRS scrapped',
    date: 'Confirmed direction',
    status: 'confirmed',
    body: (
      <>
        The originally planned sector-specific ESRS, a major second tranche, have effectively been
        cancelled under the simplification drive. Watch for any residual voluntary or sectoral
        guidance.
      </>
    ),
    source: { href: SRC.efragRevision, label: 'EFRAG' }
  },
  {
    title: 'National transposition',
    date: 'Due 19 Mar 2027',
    status: 'influx',
    body: (
      <>
        Member States must transpose the Omnibus CSRD changes by 19 March 2027. Until each country
        legislates, the precise in-scope population, and the exact penalties, in that jurisdiction
        remain uncertain.
      </>
    ),
    source: { href: SRC.covington, label: 'Covington' }
  },
  {
    title: 'VSME delegated act',
    date: 'Expected ~mid-2026',
    status: 'influx',
    body: (
      <>
        EFRAG developed the voluntary SME (VSME) standard, adopted as a Commission Recommendation in
        late 2025. A delegated act formalising VSME, which also defines the value-chain cap, is
        expected around mid-2026. Pending.
      </>
    ),
    source: { href: SRC.efragRevision, label: 'EFRAG' }
  }
];

// ----------------------------------------------------------------------------
// Changelog
// ----------------------------------------------------------------------------

const CHANGELOG: { date: string; entry: string }[] = [
  {
    date: '8 Jun 2026',
    entry:
      'Reviewed after the revised-ESRS consultation closed (3 Jun 2026). Confirmed the ~60-70% datapoint cut and the ~17 Sep 2026 adoption target as still pending.'
  },
  {
    date: '6 May 2026',
    entry:
      'Added the draft revised ESRS delegated act and its one-month public consultation (6 May to 3 June 2026).'
  },
  {
    date: '18 Mar 2026',
    entry:
      'Final Omnibus I Directive (EU) 2026/470 entered into force. Updated scope, thresholds, assurance and the value-chain cap to confirmed law.'
  },
  {
    date: '26 Feb 2026',
    entry:
      'Directive (EU) 2026/470 published in the Official Journal after Council sign-off on 24 February 2026.'
  }
];

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------

export default function OmnibusPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'The CSRD Omnibus: what changed, settled vs pending',
    description:
      'A live, plain-English explainer of the CSRD Omnibus: the three Omnibus things, what the final Directive (EU) 2026/470 changed, and what is still in flux.',
    url: PAGE_URL,
    datePublished: '2026-02-26',
    dateModified: '2026-06-08',
    author: { '@type': 'Organization', name: 'CSRD Tools' },
    publisher: { '@type': 'Organization', name: 'CSRD Tools' },
    isBasedOn: SRC.council
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the CSRD Omnibus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The CSRD Omnibus (formally Omnibus I) is the EU simplification package that amends the CSRD, the EU Taxonomy and the CSDDD to cut reporting burden. It was proposed in February 2025 and finalised as Directive (EU) 2026/470, which the Council approved on 24 February 2026 and which entered into force on 18 March 2026.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is the CSRD Omnibus final?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The scope and timeline changes are final and in force: Directive (EU) 2026/470 entered into force on 18 March 2026. Some pieces are still pending, including the revised ESRS delegated act, the VSME delegated act, the EU assurance standard and national transposition (due 19 March 2027).'
        }
      },
      {
        '@type': 'Question',
        name: 'What is stop-the-clock?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stop-the-clock is Directive (EU) 2025/794, the timing part of the Omnibus. Published on 16 April 2025 and in force from 17 April 2025, it postponed CSRD Waves 2 and 3 by two years. It did not change thresholds, only deadlines, to allow time to negotiate the substantive directive.'
        }
      },
      {
        '@type': 'Question',
        name: 'Did the Omnibus cancel the CSRD?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The Omnibus narrowed and simplified the CSRD; it did not cancel it. It raised scope thresholds, removed listed SMEs, delayed reporting by two years, cut the ESRS datapoints and softened assurance. Double materiality, the ESRS and digital tagging remain.'
        }
      },
      {
        '@type': 'Question',
        name: 'Am I still in scope after the Omnibus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You are in mandatory CSRD scope only if your EU company exceeds both more than 1,000 employees and more than EUR 450 million net turnover. Listed SMEs and smaller companies are out and can use the voluntary VSME standard. Use the scope checker for a personalised answer.'
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'The CSRD Omnibus', item: PAGE_URL }
    ]
  };

  return (
    <>
      <JsonLd data={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Header + answer-first */}
      <Container size="lg" className="pt-16 lg:pt-20">
        <header className="max-w-3xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Live explainer, updated 8 Jun 2026
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            The CSRD Omnibus: what changed
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            The Omnibus is the EU simplification package that reshaped the CSRD. The final Directive
            (EU) 2026/470 is now in force: it cut scope by about 80%, removed listed SMEs, delayed
            reporting by two years and softened assurance. Below we keep the three Omnibus things
            straight and track what is settled versus still moving.{' '}
            <SourceCite href={SRC.council}>Council of the EU</SourceCite>
          </p>
        </header>
      </Container>

      {/* TLDR */}
      <Section background="paper" className="pt-10" containerSize="lg">
        <div className="max-w-3xl">
          <TLDR title="The Omnibus in five lines">
            <ul className="space-y-2 text-base">
              <li>
                <strong>Final and in force.</strong> Directive (EU) 2026/470, in force 18 March 2026;
                CSRD transposition due 19 March 2027.
              </li>
              <li>
                <strong>Scope cut ~80%.</strong> Mandatory CSRD now needs more than 1,000 employees
                AND more than EUR 450m turnover; listed SMEs are out.
              </li>
              <li>
                <strong>Two-year delay.</strong> Newly in-scope companies report for FY2027, first
                reports in 2028.
              </li>
              <li>
                <strong>Lighter standards.</strong> The revised ESRS cut mandatory datapoints by
                around 60 to 70% (still in consultation as of June 2026).
              </li>
              <li>
                <strong>Assurance softened.</strong> The move to reasonable assurance was dropped;
                limited assurance stays.
              </li>
            </ul>
          </TLDR>
        </div>
      </Section>

      {/* The three Omnibus things */}
      <Section background="ink" containerSize="lg">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Never conflate these
        </p>
        <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-paper">
          <Icon name="account_tree" className="text-accent text-3xl" />
          The three Omnibus things
        </h2>
        <p className="mt-4 max-w-2xl text-base lg:text-lg leading-relaxed text-paper/80">
          When someone says the Omnibus, they could mean any of three different things. Here is how
          to tell them apart, and which one actually changed the law.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {THREE_THINGS.map((t) => (
            <div key={t.title} className="rounded-card border border-paper/15 p-6">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {t.tag}
              </p>
              <h3 className="mt-2 font-display font-semibold text-xl text-paper">{t.title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <StatusPill status={t.status} />
                <span className="font-mono text-xs text-paper/70">{t.date}</span>
              </div>
              <p className="mt-3 text-sm text-paper/80 leading-relaxed">{t.body}</p>
              <p className="mt-3 text-sm">
                <SourceCite href={t.source.href}>
                  <span className="text-accent">{t.source.label}</span>
                </SourceCite>
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* What changed: status board */}
      <Section background="paper" containerSize="lg">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Live status board
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="dashboard" className="text-primary text-3xl" />
            What changed, settled vs pending
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            Every Omnibus change with its current status. We mark each one plainly so you know what
            is locked in and what could still shift.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {STATUS_BOARD.map((row) => (
            <div key={row.title} className="rounded-card border border-line bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill status={row.status} />
                <span className="font-mono text-xs text-muted">{row.date}</span>
              </div>
              <h3 className="mt-3 font-display font-semibold text-xl text-ink">{row.title}</h3>
              <div className="mt-2 text-ink/80 leading-relaxed">{row.body}</div>
              <p className="mt-3 text-sm">
                <SourceCite href={row.source.href}>{row.source.label}</SourceCite>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-3xl">
          <Callout variant="warn" title="Still in flux">
            The revised ESRS delegated act, the VSME delegated act, the EU assurance standard and
            national transposition are <strong>not yet finalised</strong> as of June 2026. The scope
            and timeline changes are confirmed law, but the detail of what you report and how it is
            assured is still settling. We will update this page as each piece lands.{' '}
            <SourceCite href={SRC.ecRevisedConsult}>Commission consultation</SourceCite>
          </Callout>
        </div>
      </Section>

      {/* What it means for you */}
      <Section background="sand" containerSize="lg">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            What it means for you
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="help" className="text-primary text-3xl" />
            So, do I still have to do this?
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-card border border-line bg-card p-6">
            <h3 className="font-display text-lg font-semibold text-ink">Many companies are now out</h3>
            <p className="mt-2 text-sm text-ink/90 leading-relaxed">
              If you no longer exceed both thresholds, you are out of mandatory scope. You can report
              voluntarily with VSME, or not at all.{' '}
              <Link href="/scope-checker" className="text-primary hover:text-accent-deep">
                Check your status
              </Link>
              .
            </p>
          </div>
          <div className="rounded-card border border-line bg-card p-6">
            <h3 className="font-display text-lg font-semibold text-ink">Others gained two years</h3>
            <p className="mt-2 text-sm text-ink/90 leading-relaxed">
              Newly in-scope companies now start with FY2027 (reports in 2028). Use the reprieve to
              build a defensible double materiality assessment and GHG inventory rather than pausing
              entirely.
            </p>
          </div>
          <div className="rounded-card border border-line bg-card p-6">
            <h3 className="font-display text-lg font-semibold text-ink">The core work remains</h3>
            <p className="mt-2 text-sm text-ink/90 leading-relaxed">
              Double materiality, the ESRS and{' '}
              <Link href="/scope-1-2-3-emissions" className="text-primary hover:text-accent-deep">
                Scope 1, 2 and 3 emissions
              </Link>{' '}
              still apply if you are in scope, and value-chain data requests still flow down.
            </p>
          </div>
        </div>
      </Section>

      {/* Changelog */}
      <Section background="paper" containerSize="md">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Changelog
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="update" className="text-primary text-3xl" />
            What we changed, and when
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            This is a living page. Every material edit is logged here.
          </p>
        </div>
        <ul className="mt-12 space-y-4">
          {CHANGELOG.map((c) => (
            <li key={c.date} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <span className="shrink-0 font-mono text-sm text-accent-deep sm:w-28">{c.date}</span>
              <span className="text-ink/80 leading-relaxed">{c.entry}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Callout variant="info" title="This is guidance, not legal advice">
            This is guidance to help you understand the CSRD Omnibus, not legal advice. For decisions
            specific to your business, confirm with the official sources we link or a qualified
            adviser.
          </Callout>
        </div>

        <Sources
          items={[
            {
              href: SRC.council,
              label: 'Council of the EU: sign-off of the Omnibus simplification (24 Feb 2026)',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.covington,
              label: 'Covington: Omnibus published in the Official Journal; transposition next',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.pwcViewpoint,
              label: 'PwC Viewpoint: the Omnibus directive finalised',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.bdoScope,
              label: 'BDO: CSRD post-Omnibus revised scope and requirements',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.dlaPiper,
              label: 'DLA Piper: CSRD amendments under Omnibus I finalised',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.legTrain,
              label: 'European Parliament Legislative Train: first Omnibus package',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.stopClock,
              label: 'Sidley: stop-the-clock directive and ESRS simplification process',
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
            }
          ]}
        />
      </Section>

      <NewsletterSignup
        variant="band"
        background="forest"
        heading="Get alerted when the Omnibus moves"
        subcopy="We watch Brussels so you don't. Plain-English alerts the moment the ESRS revision, VSME or transposition lands."
        source="omnibus"
      />
    </>
  );
}
