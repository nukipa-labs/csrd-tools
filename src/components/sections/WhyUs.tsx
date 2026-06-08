import { Section } from '@/components/ui/Section';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

const POINTS = [
  {
    title: 'No upsell',
    body: `We're not selling you reporting software, and there's no demo to book. That means we can honestly tell you when you're out of scope, when VSME is enough, or when you can refuse a data request. We just explain the rules.`
  },
  {
    title: 'Always current',
    body: 'The CSRD keeps moving: a stop-the-clock delay, the Omnibus scope cut, an ESRS revision still in consultation and national transposition due by March 2027. Every page carries the sources we used and the date we last checked them, and we update when things change.'
  },
  {
    title: 'Plain English, with free tools',
    body: 'A scope checker, an emissions calculator, a materiality matrix builder and a glossary, written for people without a sustainability team. Terms are explained the first time we use them, then linked to the glossary.'
  }
];

export function WhyUs() {
  return (
    <Section
      background="forest"
      eyebrow="Why use this hub"
      title="Why use this hub"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {POINTS.map((p, i) => (
          <RevealOnScroll key={p.title} delay={i}>
            <div>
              <span aria-hidden="true" className="block h-[2px] w-8 bg-accent" />
              <h3 className="mt-4 font-display font-semibold text-xl text-paper">{p.title}</h3>
              <p className="mt-3 text-paper/80 leading-relaxed">{p.body}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}
