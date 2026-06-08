import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContourBackground } from '@/components/ui/ContourBackground';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

const DEADLINES = [
  {
    date: 'FY2027 to 2028',
    who: 'Newly in-scope companies file their first report.',
    note: 'Companies above the new thresholds (more than 1,000 employees AND more than EUR 450m turnover) report for financial years starting on or after 1 January 2027, so the first reports land in 2028. Non-EU groups follow for FY2028, reported in 2029.'
  },
  {
    date: '19 March 2027',
    who: 'Member-State transposition deadline.',
    note: 'Each of the 27 EU states has until this date to write the Omnibus thresholds into national law. Until they do, the exact in-scope population in a given country is still being settled.'
  }
];

export function DeadlineBand() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper py-16 lg:py-20">
      <ContourBackground className="opacity-60" />
      <Container className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Confirmed deadlines
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {DEADLINES.map((d, i) => (
            <RevealOnScroll key={d.date} delay={i}>
              <div className="rounded-card border border-paper/15 bg-paper/[0.04] p-6 h-full">
                <div className="font-display font-semibold text-3xl lg:text-4xl text-accent">
                  {d.date}
                </div>
                <p className="mt-3 font-medium text-paper">{d.who}</p>
                <p className="mt-2 text-sm text-paper/70 leading-relaxed">{d.note}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-paper/75">
            These dates are set by the final Omnibus directive (in force March 2026). The revised
            ESRS, the standards that say what to report, are due to be adopted around September 2026
            and apply from FY2027. If anything moves, we&apos;ll tell you.
          </p>
          <Link
            href="/scope-checker"
            className="shrink-0 text-accent font-medium link-underline"
          >
            What applies to me? →
          </Link>
        </div>
      </Container>
    </section>
  );
}
