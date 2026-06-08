import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ContourBackground } from '@/components/ui/ContourBackground';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-primary text-paper py-16 lg:py-24">
      <ContourBackground className="opacity-50" />
      <Container className="relative z-10">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-semibold text-3xl lg:text-4xl text-paper leading-tight">
              Stay ahead of the next CSRD change.
            </h2>
            <p className="mt-4 text-paper/80 text-base lg:text-lg">
              Free, plain-English updates. We watch Brussels so you don&apos;t.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/scope-checker" variant="primary">
                Am I in scope?
              </Button>
              <Button
                href="/subscribe"
                variant="secondary"
                className="!border-paper !text-paper hover:!bg-paper/10"
              >
                Subscribe to The CSRD Brief
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
