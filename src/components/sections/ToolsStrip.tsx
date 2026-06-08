import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

const TOOLS = [
  {
    title: 'CSRD Scope Checker',
    body: 'Find out whether the CSRD still applies to you after the Omnibus, in a few clicks, with your first-report year.',
    href: '/scope-checker'
  },
  {
    title: 'Scope 1, 2 & 3 Emissions Calculator',
    body: 'Estimate your direct, energy and value-chain emissions across the 15 Scope 3 categories.',
    href: '/emissions-calculator'
  },
  {
    title: 'Materiality Matrix Builder',
    body: 'Plot your impacts, risks and opportunities on impact and financial axes, then export the matrix.',
    href: '/materiality-matrix-builder'
  },
  {
    title: 'For Suppliers (VSME)',
    body: 'Being asked for sustainability data? Find out if you have to respond, and copy-paste a reply.',
    href: '/suppliers'
  }
];

export function ToolsStrip() {
  return (
    <Section
      background="paper"
      eyebrow="Free tools"
      title="Free tools, no email wall"
      subtitle="Use them on the page. We'll only ask for your email if you want your result or a PDF sent to you."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((t, i) => (
          <RevealOnScroll key={t.href} delay={i}>
            <Link
              href={t.href}
              className="group block h-full rounded-card border border-line bg-card p-6 transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-accent hover:[transform:translateY(-3px)] hover:shadow-[var(--shadow-card-hover)]"
            >
              <h3 className="font-display font-semibold text-lg text-ink group-hover:text-primary transition-colors">
                {t.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{t.body}</p>
              <span className="mt-4 inline-block text-sm font-medium text-primary">Open →</span>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}
