import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function ProblemSolution() {
  return (
    <Section background="paper">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <RevealOnScroll>
          <div>
            <h2 className="font-display font-semibold text-3xl lg:text-4xl text-ink leading-tight">
              Not sure if the CSRD still applies to you? Start here.
            </h2>
            <p className="mt-5 text-ink/80 text-base lg:text-lg leading-relaxed">
              The rules changed under your feet. The Omnibus package cut roughly 80% of companies out
              of scope, pushed the deadlines back, and is slashing the ESRS datapoints. Maybe you
              started preparing and now don&apos;t know if you still have to. Maybe a big customer is
              asking you for sustainability data and you&apos;re not even sure you owe it.
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <div className="rounded-card bg-low border-l-[3px] border-primary p-6 lg:p-8">
            <p className="text-ink text-base lg:text-lg leading-relaxed">
              Take a breath. The post-Omnibus picture is clearer than the headlines suggest. The CSRD
              now applies mainly to companies with more than 1,000 employees AND more than EUR 450m
              turnover. Many smaller firms are out and can use the voluntary VSME standard instead.
              We&apos;ll help you work out whether you&apos;re in, what you actually have to do, and by when.
              No jargon, no sales pitch.
            </p>
            <p className="mt-5">
              <Link href="/scope-checker" className="text-primary font-medium link-underline">
                Not sure if any of this is even your problem yet? Check in two minutes →
              </Link>
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
