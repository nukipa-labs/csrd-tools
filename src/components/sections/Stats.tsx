import { Section } from '@/components/ui/Section';
import { Stat, Stats as StatsGrid } from '@/components/ui/Stat';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function Stats() {
  return (
    <Section
      background="sand"
      eyebrow="By the numbers"
      title="The CSRD in a few numbers"
      subtitle="The figures worth keeping in your head, all post-Omnibus. Each one is set in law or in the official guidance we link from the pillar page."
    >
      <RevealOnScroll>
        <StatsGrid>
          <Stat
            value="~80%"
            label="Of previously-covered companies removed from CSRD scope by the Omnibus, from roughly 50,000 down to around 5,000 (European Commission estimate)."
          />
          <Stat
            value="1,000 / 450m"
            label="The new EU test: more than 1,000 employees AND more than EUR 450m net turnover. Both must be true. The balance-sheet criterion was dropped."
          />
          <Stat
            value="12"
            label="ESRS standards: two cross-cutting (ESRS 1 and 2) plus E1-E5 for environment, S1-S4 for social and G1 for governance."
          />
          <Stat
            value="2028"
            label="When newly in-scope companies file their first report, covering financial year 2027. Non-EU groups follow for FY2028, reported in 2029."
          />
        </StatsGrid>
      </RevealOnScroll>
      <p className="mt-8 text-sm text-muted">
        Listed SMEs are out of mandatory scope and can use the voluntary VSME standard. In-scope
        firms may not demand more than VSME from value-chain partners with fewer than 1,000 employees.
      </p>
    </Section>
  );
}
