import Link from 'next/link';
import { Section, Icon, RevealOnScroll } from '@/components/ui';

export type FaqItem = { q: string; a: React.ReactNode };

/**
 * Home on-page FAQ block. The plain-text answers are also emitted as FAQPage
 * JSON-LD from the home page (see app/page.tsx) for GEO/AI answer engines.
 */
export function HomeFAQ({ items }: { items: FaqItem[] }) {
  return (
    <Section background="sand" containerSize="md">
      <div className="max-w-2xl">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
          The short answers
        </p>
        <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="help" className="text-primary text-3xl" />
          CSRD questions people ask
        </h2>
        <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
          The post-Omnibus essentials in plain English. Each links to the full guide.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {items.map((item, i) => (
          <RevealOnScroll key={i} delay={i}>
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
              <div className="mt-3 text-ink/85 leading-relaxed">{item.a}</div>
            </details>
          </RevealOnScroll>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted leading-relaxed">
        This is guidance to help you understand the CSRD, not legal advice. Always confirm with
        the official sources we link or a qualified adviser.{' '}
        <Link
          href="/csrd"
          className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
        >
          Read the full CSRD explainer
        </Link>
        .
      </p>
    </Section>
  );
}
