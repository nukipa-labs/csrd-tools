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
  Icon,
  Byline
} from '@/components/ui';
import { EDITOR_ORG, LAST_REVIEWED_ISO } from '@/lib/seo';
import { LeadMagnet } from '@/components/sections/LeadMagnet';

const SITE = 'https://csrd-tools.com';
const PAGE_URL = `${SITE}/deadlines`;

// ---- Canonical official + authoritative sources (research/01 sections 3, 10) ----
const SRC = {
  csrdEurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2464/oj/eng',
  council:
    'https://www.consilium.europa.eu/en/press/press-releases/2026/02/24/council-signs-off-simplification-of-sustainability-reporting-and-due-diligence-requirements-to-boost-eu-competitiveness/',
  stopClock:
    'https://www.sidley.com/en/insights/newsupdates/2025/04/eu-omnibus-package-eu-adopts-stop-the-clock-directive-and-begins-esrs-simplification-process',
  dlaPiper:
    'https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/corporate-sustainability-reporting-directive-amendments-under-omnibus-i-finalised',
  coolset:
    'https://www.coolset.com/academy/csrd-under-omnibus-updated-scope-timelines-and-what-companies-should-do-in-2026',
  ecRevisedConsult:
    'https://finance.ec.europa.eu/news/commission-seeks-feedback-revised-sustainability-reporting-standards-2026-05-06_en',
  covington:
    'https://www.cov.com/en/news-and-insights/insights/2026/02/eu-csddd-csrd-omnibus-published-in-official-journal-transposition-delegated-acts-and-guidelines-are-next'
};

export const metadata: Metadata = {
  title: 'CSRD Deadlines & Reporting Timeline (post-Omnibus) | CSRD Tools',
  description:
    'The CSRD reporting timeline after the Omnibus: newly in-scope companies report for FY2027 (first reports 2028), non-EU groups FY2028 to 2029, Wave 1 continues, an optional Member-State pause for FY2025-26, transposition by 19 March 2027 and ESRS revision adoption around September 2026.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'CSRD deadlines and reporting timeline (post-Omnibus)',
    description:
      'The confirmed CSRD timeline after the stop-the-clock delay and the final Omnibus, plus a live status board on what is still moving.',
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
// Timeline
// ----------------------------------------------------------------------------

type TimelineEvent = {
  date: string;
  title: string;
  meaning: string;
  status: Status;
  dot: 'done' | 'now' | 'upcoming';
  source: { href: string; label: string };
};

const TIMELINE: TimelineEvent[] = [
  {
    date: '5 Jan 2023',
    title: 'The CSRD enters into force',
    meaning:
      'Directive (EU) 2022/2464 becomes law, replacing the NFRD and putting sustainability reporting on a financial footing. The original four-wave rollout begins.',
    status: 'confirmed',
    dot: 'done',
    source: { href: SRC.csrdEurlex, label: 'EUR-Lex' }
  },
  {
    date: '2025',
    title: 'Wave 1 reports for FY2024',
    meaning:
      'The former NFRD population (large public-interest entities with more than 500 employees) published its first CSRD reports in 2025. Those still above the new thresholds keep reporting.',
    status: 'confirmed',
    dot: 'done',
    source: { href: SRC.csrdEurlex, label: 'EUR-Lex' }
  },
  {
    date: '17 Apr 2025',
    title: 'Stop-the-clock (Directive (EU) 2025/794)',
    meaning:
      'Published in the Official Journal on 16 April 2025 and in force from 17 April 2025, the stop-the-clock directive postponed Waves 2 and 3 by two years. It changed timing only, not thresholds.',
    status: 'confirmed',
    dot: 'done',
    source: { href: SRC.stopClock, label: 'Sidley' }
  },
  {
    date: '18 Mar 2026',
    title: 'Final Omnibus (Directive (EU) 2026/470)',
    meaning:
      'Approved by the Council on 24 February 2026, published in the Official Journal on 26 February 2026 and in force from 18 March 2026. It raised thresholds, removed listed SMEs and collapsed the old wave structure.',
    status: 'confirmed',
    dot: 'now',
    source: { href: SRC.council, label: 'Council of the EU' }
  },
  {
    date: '~17 Sep 2026',
    title: 'Revised ESRS adoption target',
    meaning:
      'The Commission committed to adopt the simplified ESRS delegated act within six months of the Omnibus entering into force, around 17 September 2026. In consultation as of June 2026; not yet adopted.',
    status: 'influx',
    dot: 'upcoming',
    source: { href: SRC.ecRevisedConsult, label: 'European Commission' }
  },
  {
    date: 'FY2027 -> 2028',
    title: 'Newly in-scope companies report',
    meaning:
      'Companies with more than 1,000 employees AND more than EUR 450m turnover report for financial years beginning on or after 1 January 2027, with first reports published in 2028. The revised ESRS apply from FY2027.',
    status: 'confirmed',
    dot: 'upcoming',
    source: { href: SRC.dlaPiper, label: 'DLA Piper' }
  },
  {
    date: '19 Mar 2027',
    title: 'CSRD transposition deadline',
    meaning:
      'Member States must transpose the Omnibus CSRD changes into national law by 19 March 2027. Until each country legislates, the precise in-scope population and penalties in that jurisdiction stay uncertain.',
    status: 'confirmed',
    dot: 'upcoming',
    source: { href: SRC.covington, label: 'Covington' }
  },
  {
    date: 'FY2028 -> 2029',
    title: 'Non-EU groups report',
    meaning:
      'Third-country groups meeting the higher thresholds (more than EUR 450m EU turnover plus a qualifying EU subsidiary or branch) report for FY2028, with first reports in 2029.',
    status: 'confirmed',
    dot: 'upcoming',
    source: { href: SRC.dlaPiper, label: 'DLA Piper' }
  }
];

function TimelineDot({ kind }: { kind: TimelineEvent['dot'] }) {
  if (kind === 'now') {
    return (
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute h-5 w-5 rounded-full bg-accent/25" />
        <span className="relative h-3.5 w-3.5 rounded-full bg-accent" />
      </span>
    );
  }
  if (kind === 'done') {
    return <span className="h-3.5 w-3.5 rounded-full bg-primary" />;
  }
  return <span className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-paper" />;
}

// ----------------------------------------------------------------------------
// Status board rows
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
    title: 'Wave 1 continues (if still above thresholds)',
    date: 'Confirmed',
    status: 'confirmed',
    body: (
      <>
        Companies that already reported for FY2024 and remain above the new thresholds keep
        reporting each year. The headline "first mandatory reports in 2028" applies to the newly
        defined in-scope population, not to large companies already in the system.
      </>
    ),
    source: { href: SRC.coolset, label: 'Coolset' }
  },
  {
    title: 'Optional Member-State pause for FY2025-FY2026',
    date: 'Confirmed, but country-dependent',
    status: 'influx',
    body: (
      <>
        Wave 1 companies that now fall below the new thresholds may be allowed a transition pause for
        FY2025 and FY2026, then exit fully from FY2027, but only if their Member State opts to grant
        it. Whether you can pause depends on your country.
      </>
    ),
    source: { href: SRC.dlaPiper, label: 'DLA Piper' }
  },
  {
    title: 'Revised ESRS adoption',
    date: 'Target ~17 Sep 2026',
    status: 'influx',
    body: (
      <>
        The simplified ESRS were in public consultation from 6 May to 3 June 2026, with adoption
        targeted around 17 September 2026 and application from FY2027 (voluntary early use for
        FY2026). Mandatory datapoints are expected to fall by around 60 to 70%. Not yet adopted.{' '}
        <Link
          href="/esrs"
          className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
        >
          See the ESRS standards
        </Link>
        .
      </>
    ),
    source: { href: SRC.ecRevisedConsult, label: 'European Commission' }
  },
  {
    title: 'National transposition',
    date: 'Due 19 Mar 2027',
    status: 'influx',
    body: (
      <>
        Transposition of the original CSRD was slow and uneven, and the new Omnibus thresholds need
        fresh transposition by 19 March 2027. The practical enforcement picture will keep shifting
        through 2026 and 2027. Always check the specific Member State.
      </>
    ),
    source: { href: SRC.covington, label: 'Covington' }
  }
];

// ----------------------------------------------------------------------------
// Changelog
// ----------------------------------------------------------------------------

const CHANGELOG: { date: string; entry: string }[] = [
  {
    date: '8 Jun 2026',
    entry:
      'Reviewed after the revised-ESRS consultation closed (3 Jun 2026). Confirmed the ~17 Sep 2026 adoption target and FY2027 application as still pending.'
  },
  {
    date: '18 Mar 2026',
    entry:
      'Final Omnibus I Directive (EU) 2026/470 entered into force. Rebuilt the timeline around FY2027 (reports 2028) for the newly in-scope population and the 19 Mar 2027 transposition deadline.'
  },
  {
    date: '17 Apr 2025',
    entry:
      'Added the stop-the-clock Directive (EU) 2025/794, which postponed Waves 2 and 3 by two years.'
  }
];

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------

export default function DeadlinesPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'CSRD deadlines and reporting timeline (post-Omnibus)',
    description:
      'The confirmed CSRD reporting timeline after the stop-the-clock delay and the final Omnibus, plus a live status board on what is still moving.',
    url: PAGE_URL,
    datePublished: '2026-03-18',
    dateModified: LAST_REVIEWED_ISO,
    author: EDITOR_ORG,
    reviewedBy: EDITOR_ORG,
    publisher: { '@type': 'Organization', name: 'CSRD Tools' },
    isBasedOn: SRC.csrdEurlex
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When does the CSRD apply after the Omnibus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Newly in-scope companies (more than 1,000 employees and more than EUR 450 million turnover) report for financial years beginning on or after 1 January 2027, with first reports published in 2028. Non-EU groups start with FY2028, reporting in 2029. Wave 1 companies already reporting since FY2024 that remain above the thresholds continue.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the CSRD transposition deadline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Member States must transpose the Omnibus CSRD changes into national law by 19 March 2027. The CSDDD parts have a later deadline of 26 July 2028. Until a country transposes, the precise in-scope population and penalties there remain uncertain.'
        }
      },
      {
        '@type': 'Question',
        name: 'Did the CSRD waves change?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The stop-the-clock directive postponed Waves 2 and 3 by two years, and the final Omnibus then collapsed the old four-wave structure. Newly in-scope companies now report for FY2027 (reports in 2028), Wave 3 listed SMEs were dropped from mandatory scope entirely, and non-EU groups report from FY2028.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can a company pause its CSRD reporting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Wave 1 company that now falls below the new thresholds may be granted an optional transition pause for FY2025 and FY2026, then exit fully from FY2027, but only if its Member State chooses to allow it. Whether you can pause depends on your country.'
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Deadlines and timeline', item: PAGE_URL }
    ]
  };

  return (
    <>
      <JsonLd data={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Header + answer-first */}
      <Container size="lg" className="pt-16 lg:pt-20">
        <header className="max-w-3xl">
          <h1 className="font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            CSRD Deadlines &amp; Timeline
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            After the stop-the-clock delay and the final Omnibus, the CSRD timeline is much simpler.
            Newly in-scope companies report for FY2027, with first reports in 2028. Below are the
            confirmed dates, the full history, and a live status board on the parts still moving.
          </p>
          <div className="mt-6">
            <Byline />
          </div>
        </header>
      </Container>

      {/* The confirmed dates band */}
      <Section background="ink" className="mt-12" containerSize="lg">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Confirmed dates
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-card border border-paper/15 p-6 lg:p-8">
            <p className="font-display font-semibold text-3xl lg:text-4xl text-accent leading-none">
              FY2027 to 2028
            </p>
            <p className="mt-4 text-lg text-paper font-medium">Newly in-scope companies</p>
            <p className="mt-2 text-paper/80 leading-relaxed">
              More than 1,000 employees AND more than EUR 450m turnover. Report for FY2027, first
              reports published in 2028.
            </p>
          </div>
          <div className="rounded-card border border-paper/15 p-6 lg:p-8">
            <p className="font-display font-semibold text-3xl lg:text-4xl text-accent leading-none">
              FY2028 to 2029
            </p>
            <p className="mt-4 text-lg text-paper font-medium">Non-EU groups</p>
            <p className="mt-2 text-paper/80 leading-relaxed">
              Third-country groups meeting the higher thresholds report for FY2028, with first reports
              in 2029.
            </p>
          </div>
          <div className="rounded-card border border-paper/15 p-6 lg:p-8">
            <p className="font-display font-semibold text-3xl lg:text-4xl text-accent leading-none">
              19 Mar 2027
            </p>
            <p className="mt-4 text-lg text-paper font-medium">Transposition deadline</p>
            <p className="mt-2 text-paper/80 leading-relaxed">
              Member States must transpose the Omnibus CSRD changes into national law by this date.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-paper/70">
          Confirmed by the stop-the-clock Directive (EU) 2025/794 and the final Omnibus Directive
          (EU) 2026/470.{' '}
          <SourceCite href={SRC.council}>
            <span className="text-accent">See the Council statement</span>
          </SourceCite>
        </p>
      </Section>

      {/* TLDR + what applies to me */}
      <Section background="paper" containerSize="lg">
        <div className="max-w-3xl">
          <TLDR title="What applies to me, and when">
            <p>
              If you are an <strong>EU company over both thresholds</strong> (more than 1,000
              employees and more than EUR 450m turnover), your first report covers{' '}
              <strong>FY2027</strong> and is published in <strong>2028</strong>. If you are a{' '}
              <strong>non-EU group</strong> meeting the higher thresholds, it is{' '}
              <strong>FY2028</strong>, published in <strong>2029</strong>. If you already report
              (Wave 1) and remain above the thresholds, you <strong>continue</strong>; if you have
              fallen below, you may get a country-dependent pause.
            </p>
          </TLDR>
        </div>

        {/* Mini matrix */}
        <div className="mt-8 overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">
              CSRD reporting timeline by company type after the Omnibus.
            </caption>
            <thead>
              <tr className="bg-sand text-ink">
                <th scope="col" className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold">
                  Who you are
                </th>
                <th scope="col" className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold">
                  First financial year
                </th>
                <th scope="col" className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold">
                  First report
                </th>
                <th scope="col" className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-paper">
                <th scope="row" className="px-4 py-3 font-body font-semibold text-ink align-top">
                  Wave 1 (former 500+ PIEs) still above thresholds
                </th>
                <td className="px-4 py-3 font-mono text-sm text-ink align-top">FY2024 (reported)</td>
                <td className="px-4 py-3 font-mono text-sm text-ink align-top">2025, continuing</td>
                <td className="px-4 py-3 text-sm text-muted align-top">In scope, continues</td>
              </tr>
              <tr className="bg-sand-tint">
                <th scope="row" className="px-4 py-3 font-body font-semibold text-ink align-top">
                  Wave 1 now below thresholds
                </th>
                <td className="px-4 py-3 font-mono text-sm text-ink align-top">n/a</td>
                <td className="px-4 py-3 font-mono text-sm text-ink align-top">n/a</td>
                <td className="px-4 py-3 text-sm text-muted align-top">
                  Optional pause FY2025-26; mandatory exit FY2027 (country-dependent)
                </td>
              </tr>
              <tr className="bg-paper">
                <th scope="row" className="px-4 py-3 font-body font-semibold text-ink align-top">
                  Newly in-scope (1,000+ emp AND EUR 450m+)
                </th>
                <td className="px-4 py-3 font-mono text-sm text-ink align-top">FY2027</td>
                <td className="px-4 py-3 font-mono text-sm text-ink align-top">2028</td>
                <td className="px-4 py-3 text-sm text-muted align-top">In scope</td>
              </tr>
              <tr className="bg-sand-tint">
                <th scope="row" className="px-4 py-3 font-body font-semibold text-ink align-top">
                  Former Wave 2/3 below threshold (incl. listed SMEs)
                </th>
                <td className="px-4 py-3 font-mono text-sm text-ink align-top">n/a</td>
                <td className="px-4 py-3 font-mono text-sm text-ink align-top">n/a</td>
                <td className="px-4 py-3 text-sm text-muted align-top">Out; use voluntary VSME</td>
              </tr>
              <tr className="bg-paper">
                <th scope="row" className="px-4 py-3 font-body font-semibold text-ink align-top">
                  Non-EU groups meeting new thresholds
                </th>
                <td className="px-4 py-3 font-mono text-sm text-ink align-top">FY2028</td>
                <td className="px-4 py-3 font-mono text-sm text-ink align-top">2029</td>
                <td className="px-4 py-3 text-sm text-muted align-top">In scope</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-sm text-muted">
          Not sure which row is you, or whether the CSRD applies at all?{' '}
          <Link
            href="/scope-checker"
            className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
          >
            Try the scope checker for a personalised answer
          </Link>
          .
        </p>
      </Section>

      {/* Timeline */}
      <Section background="sand" containerSize="lg">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            The full history
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="history" className="text-primary text-3xl" />
            How the timeline moved
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            From entry into force to the post-Omnibus state, with the source for each step.
          </p>
        </div>
        <ol className="relative mt-12 space-y-8 border-l border-line pl-8">
          {TIMELINE.map((ev) => (
            <li key={ev.date + ev.title} className="relative">
              <span className="absolute -left-[2.55rem] top-1.5 flex items-center justify-center">
                <TimelineDot kind={ev.dot} />
              </span>
              <div className="rounded-card border border-line bg-card p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm text-accent-deep">{ev.date}</span>
                  <StatusPill status={ev.status} />
                </div>
                <h3 className="mt-2 font-display font-semibold text-xl text-ink">{ev.title}</h3>
                <p className="mt-1.5 text-ink/80 leading-relaxed">{ev.meaning}</p>
                <p className="mt-2 text-sm">
                  <SourceCite href={ev.source.href}>{ev.source.label}</SourceCite>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Status board */}
      <Section background="paper" containerSize="lg">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Live status board
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="dashboard" className="text-primary text-3xl" />
            What is settled, and what is still moving
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            The timing-related parts of the CSRD that are in flux right now. We mark each one plainly
            so you are not caught out.
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
          <Callout variant="warn" title="Not fully settled yet">
            The scope thresholds and reporting dates are <strong>confirmed law</strong>, but the
            revised ESRS delegated act, national transposition and the optional Wave 1 pause are
            still settling, and the pause is country-dependent. We will update this page as each
            piece lands.{' '}
            <SourceCite href={SRC.ecRevisedConsult}>Commission consultation</SourceCite>
          </Callout>
        </div>
      </Section>

      {/* Changelog */}
      <Section background="sand" containerSize="md">
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
            This is guidance to help you understand the CSRD timeline, not legal advice. For
            decisions specific to your business, confirm with the official sources we link or a
            qualified adviser.
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
              href: SRC.dlaPiper,
              label: 'DLA Piper: CSRD amendments under Omnibus I finalised',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.coolset,
              label: 'Coolset: CSRD under the Omnibus, updated scope and timelines',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.stopClock,
              label: 'Sidley: stop-the-clock directive (EU) 2025/794',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.ecRevisedConsult,
              label: 'European Commission: consultation on revised ESRS (6 May 2026)',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.covington,
              label: 'Covington: Omnibus published in the Official Journal; transposition next',
              retrieved: '8 Jun 2026'
            },
            {
              href: SRC.csrdEurlex,
              label: 'Directive (EU) 2022/2464, the CSRD (EUR-Lex)',
              retrieved: '8 Jun 2026'
            }
          ]}
        />
      </Section>

      <LeadMagnet
        slug="cheat-sheet"
        file="/downloads/csrd-scope-deadlines-cheat-sheet.pdf"
        fileName="csrd-scope-deadlines-cheat-sheet.pdf"
        title="Keep the dates handy: the CSRD Scope & Deadlines Cheat-Sheet"
        description="A one-page PDF with the post-Omnibus scope test and every key date, sourced and free. Email it to yourself to keep on file."
        bullets={[
          'The scope test: 1,000 employees AND EUR 450m, both',
          'Transposition 19 Mar 2027, FY2027 to 2028, non-EU FY2028 to 2029',
          'What an in-scope company reports, on one page'
        ]}
        source="deadlines"
      />

      <NewsletterSignup
        variant="band"
        background="forest"
        heading="Get alerted when this changes"
        subcopy="We watch Brussels so you don't. Plain-English alerts the moment a CSRD deadline, the ESRS revision or transposition moves."
        source="deadlines"
      />
    </>
  );
}
