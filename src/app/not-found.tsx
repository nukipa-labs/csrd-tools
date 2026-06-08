import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Container size="sm" className="py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-deep">404</p>
      <h1 className="mt-3 font-display font-semibold text-4xl text-ink">Off the map</h1>
      <p className="mt-4 text-ink/80">
        The page you were looking for doesn&apos;t exist or has moved. Let&apos;s get you back on course.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button href="/" variant="primary">
          Back to home
        </Button>
        <Button href="/csrd" variant="secondary">
          What is the CSRD?
        </Button>
      </div>
    </Container>
  );
}
