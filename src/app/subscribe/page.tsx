import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { NewsletterSignup } from '@/components/ui/NewsletterSignup';
import { ContourBackground } from '@/components/ui/ContourBackground';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Subscribe to The CSRD Brief',
  description:
    'CSRD, ESRS, EU Taxonomy and Omnibus updates, in plain English, when they actually matter. A free newsletter that tells you what changed, what it means for you, and what to do next.',
  alternates: { canonical: '/subscribe' }
};

const WHAT = [
  `What changed, written so you don't need a law degree to follow it.`,
  'What it means for you, separated by company size and role where it matters.',
  'What to do next, in concrete steps.',
  'A link to the official source, every time, so you can check our work.'
];

const WHO = [
  'Sustainability and ESG managers who own the report and need to brief leadership on every change.',
  'CFOs and finance teams now responsible for assurance and the EU Taxonomy turnover, capex and opex KPIs.',
  'Compliance, legal and company-secretary teams tracking scope, transposition and penalties by Member State.',
  'SMEs and suppliers getting sustainability questionnaires from big customers, who need to know what they actually owe.',
  'Non-EU groups working out whether the new EUR 450m EU-turnover threshold reaches them.',
  'Advisers and consultants who need to stay current and client-ready, and who forward the Brief to their teams.'
];

export default function SubscribePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Subscribe to The CSRD Brief',
          url: 'https://csrd-tools.com/subscribe',
          description:
            'The CSRD Brief: plain-English CSRD, ESRS, EU Taxonomy and Omnibus updates when they actually matter. Free.'
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container className="relative z-10 py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
              The CSRD Brief
            </p>
            <h1 className="mt-4 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
              CSRD updates, in plain English, when they actually matter.
            </h1>
            <p className="mt-5 text-lg text-ink/80 leading-relaxed">
              We watch Brussels so you don&apos;t. A plain-English newsletter that tells you what changed
              across the CSRD, the ESRS, the EU Taxonomy and the Omnibus, what it means for you, and
              what to do next.
            </p>
          </div>
        </Container>
      </section>

      {/* Core capture band */}
      <NewsletterSignup
        variant="band"
        background="ink"
        heading="Start receiving The CSRD Brief"
        subcopy="Enter your email to subscribe. Free, and you can unsubscribe in one click."
        source="subscribe-page"
      />

      {/* Why this exists + cadence */}
      <Section background="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <div>
              <h2 className="font-display font-semibold text-2xl text-ink">Why this exists</h2>
              <p className="mt-3 text-ink/80 leading-relaxed">
                The CSRD is a moving target. There has already been a stop-the-clock delay, the
                Omnibus package that cut roughly 80% of companies out of scope, a revised set of ESRS
                still in consultation, a VSME standard being finalised and national transposition due
                by March 2027. You can&apos;t read one article and be done. So instead of asking you to
                watch the EU Official Journal and EFRAG, we do it, and we send you the short version.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <div>
              <h2 className="font-display font-semibold text-2xl text-ink">
                How often you&apos;ll hear from us
              </h2>
              <p className="mt-3 text-ink/80 leading-relaxed">
                Monthly, plus breaking-change alerts. The monthly issue rounds up what moved. The
                alerts go out the moment something material lands, so a scope change, the final ESRS
                or a transposition update reaches you in days, not after your next audit.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* What you get */}
      <Section background="sand" title="What's in each issue">
        <ul className="grid gap-4 sm:grid-cols-2">
          {WHAT.map((w, i) => (
            <RevealOnScroll key={w} delay={i}>
              <li className="flex gap-3 rounded-card border border-line bg-card p-5">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-ink">{w}</span>
              </li>
            </RevealOnScroll>
          ))}
        </ul>
      </Section>

      {/* Who reads it */}
      <Section background="paper" title="Who reads The CSRD Brief">
        <ul className="space-y-3 max-w-2xl">
          {WHO.map((w) => (
            <li key={w} className="flex gap-3 text-ink/85">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Independence + consent */}
      <Section background="forest" title="The fine print, kept honest">
        <p className="max-w-2xl text-paper/85 leading-relaxed">
          We have no software to sell and no demo to book, so the newsletter exists to inform you, not
          to soften you up for a pitch. We won&apos;t sell or share your email. Unsubscribe in one click,
          any time. See how we handle your data on our privacy page.
        </p>
      </Section>
    </>
  );
}
