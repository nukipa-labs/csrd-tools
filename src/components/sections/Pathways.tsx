import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

type Card = { title: string; body: string; href: string; tag: string };

const CARDS: Card[] = [
  {
    tag: 'Understand',
    title: 'What is the CSRD?',
    body: 'The plain-English explainer, post-Omnibus: who it covers now, the new thresholds, double materiality, and how reporting works.',
    href: '/csrd'
  },
  {
    tag: 'Check',
    title: 'Am I in scope?',
    body: 'Answer a few questions and find out whether the CSRD still applies to you, and when your first report is due.',
    href: '/scope-checker'
  },
  {
    tag: 'Track',
    title: 'The Omnibus changes',
    body: 'What changed, what is confirmed and what is still in flux: the scope cut, the new deadlines and the ESRS revision.',
    href: '/omnibus'
  },
  {
    tag: 'Report',
    title: 'The ESRS standards',
    body: 'The 12 European Sustainability Reporting Standards mapped out: the two cross-cutting ones plus E1-E5, S1-S4 and G1.',
    href: '/esrs'
  }
];

function NeedleGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary group-hover:text-accent transition-colors"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 4 L14.5 12 L12 11 L9.5 12 Z" fill="currentColor" stroke="none" />
      <path d="M12 20 L14.5 12 L12 13 L9.5 12 Z" opacity="0.4" />
    </svg>
  );
}

function PathwayCard({ card, delay }: { card: Card; delay: number }) {
  return (
    <RevealOnScroll delay={delay}>
      <Link
        href={card.href}
        className="group block h-full rounded-card border border-line bg-card p-6 transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-accent hover:[transform:translateY(-3px)] hover:shadow-[var(--shadow-card-hover)]"
      >
        <NeedleGlyph />
        <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
          {card.tag}
        </p>
        <h3 className="mt-2 font-display font-semibold text-xl text-ink">{card.title}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed">{card.body}</p>
        <span className="mt-4 inline-block text-sm font-medium text-primary">Open →</span>
      </Link>
    </RevealOnScroll>
  );
}

export function Pathways() {
  return (
    <Section
      background="sand"
      eyebrow="Start here"
      title="Start where you are"
      subtitle="Four routes through the regulation, depending on what you need right now."
    >
      {/* Asymmetric zig-zag layout (not an identical 3-up grid) */}
      <div className="grid gap-5 md:grid-cols-6">
        <div className="md:col-span-4">
          <PathwayCard card={CARDS[0]} delay={0} />
        </div>
        <div className="md:col-span-2">
          <PathwayCard card={CARDS[1]} delay={1} />
        </div>
        <div className="md:col-span-2">
          <PathwayCard card={CARDS[2]} delay={2} />
        </div>
        <div className="md:col-span-4">
          <PathwayCard card={CARDS[3]} delay={3} />
        </div>
      </div>
    </Section>
  );
}
