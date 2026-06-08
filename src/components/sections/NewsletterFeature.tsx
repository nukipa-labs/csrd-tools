import { Container } from '@/components/ui/Container';
import { ContourBackground } from '@/components/ui/ContourBackground';
import { NewsletterSignup } from '@/components/ui/NewsletterSignup';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

const BULLETS = [
  `A monthly issue rounding up what moved and what's coming.`,
  'Breaking-change alerts the moment something material lands: a scope change, the final ESRS, a VSME update or national transposition news.',
  'Plain-English summaries with a link to the official source, every time.'
];

export function NewsletterFeature() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper py-16 lg:py-24">
      <ContourBackground className="opacity-60" />
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <RevealOnScroll>
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                The CSRD Brief
              </p>
              <h2 className="mt-3 font-display font-semibold text-3xl lg:text-4xl text-paper leading-tight">
                We watch Brussels so you don&apos;t.
              </h2>
              <p className="mt-4 text-paper/80 text-base lg:text-lg leading-relaxed">
                The CSRD keeps changing. One email, plain English, tells you what changed across the
                CSRD, the ESRS, the EU Taxonomy and the Omnibus, what it means for you, and what to do
                about it. So you can stop refreshing EUR-Lex and get back to your actual job.
              </p>
              <ul className="mt-6 space-y-3">
                {BULLETS.map((b) => (
                  <li key={b} className="flex gap-3 text-paper/85">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <NewsletterSignup
              variant="inline"
              background="forest"
              heading="Enter your email to subscribe"
              subcopy="Free, and you can unsubscribe in one click. No spam, no selling your address."
              source="home-feature"
            />
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
