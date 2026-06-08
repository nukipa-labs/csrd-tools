import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ContourBackground } from '@/components/ui/ContourBackground';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <ContourBackground />
      <Container className="relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <RevealOnScroll>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
              Your CSRD resource hub
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <h1 className="mt-4 font-display font-semibold text-ink text-4xl sm:text-5xl lg:text-6xl leading-[1.08]">
              Make sense of EU sustainability reporting, fast.
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <p className="mt-5 text-lg lg:text-xl text-ink/80 leading-relaxed max-w-2xl">
              The Omnibus reset the CSRD. Roughly 80% of companies are now out of scope, the
              deadlines moved, and the ESRS are being cut. Plain-English answers, free tools and
              updates you can trust, so you know exactly where you stand.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={3}>
            <p className="mt-4 font-display text-lg lg:text-xl text-primary">
              Find your way through EU sustainability reporting.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={4}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/scope-checker" variant="primary">
                Am I in scope?
              </Button>
              <Button href="/tools" variant="secondary">
                Explore CSRD tools &amp; resources
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
