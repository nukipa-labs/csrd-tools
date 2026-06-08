import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Prose } from '@/components/ui/Prose';
import { Callout } from '@/components/ui/Callout';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'About and methodology: how we keep this accurate',
  description:
    'CSRD Tools is a free hub explaining the EU Corporate Sustainability Reporting Directive in plain English. How we source, update and keep it accurate.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About CSRD Tools',
          url: 'https://csrd-tools.com/about',
          description:
            'A plain-English guide to the CSRD, built to stay accurate. How we source and update it.'
        }}
      />
      <Container size="md" className="py-16 lg:py-24">
        <header className="max-w-3xl">
          <h1 className="font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            A plain-English guide to EU sustainability reporting, built to stay accurate.
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            CSRD Tools is a free hub explaining the EU Corporate Sustainability Reporting
            Directive and the standards around it in plain English. No software to sell. No consulting
            upsell. Just the rules, kept current.
          </p>
          <p className="mt-3 font-display text-lg text-primary">
            Find your way through EU sustainability reporting.
          </p>
        </header>

        <div className="mt-12">
          <Prose>
            <h2>How we keep this accurate</h2>
            <p>
              This is a regulation that keeps changing, so accuracy is the whole job. Here&apos;s how we
              approach it.
            </p>

            <h3>No software to sell, no consulting upsell</h3>
            <p>
              We don&apos;t sell reporting software and we don&apos;t run a consultancy. Nobody pays us to
              point you at a product. That&apos;s deliberate: it means our answers can stay neutral, so we
              can honestly tell you when you&apos;re out of scope, when the voluntary VSME standard is
              enough, or when you can decline a data request, even though a vendor never would.
            </p>

            <h3>Where our facts come from</h3>
            <p>
              Every factual claim traces back to an official source: the directives themselves on
              EUR-Lex, the European Commission&apos;s sustainable-finance and company-reporting pages,
              EFRAG (which writes the ESRS), and the Council of the EU. We link the source so you can
              check our work.
            </p>

            <h3>How we keep it current</h3>
            <p>
              Key pages carry a visible &ldquo;Last updated&rdquo; date and, where it helps, a short
              changelog. When something material changes, a scope rule, the final ESRS, the VSME
              standard or a Member State&apos;s transposition, we revise the affected pages and send it
              to subscribers of The CSRD Brief.
            </p>

            <h3>When the rules aren&apos;t settled</h3>
            <p>
              Sometimes the law is genuinely in flux. As of mid-2026, the revised ESRS delegated act
              and the VSME act are still being finalised, and most Member States have not yet
              transposed the new thresholds. When that&apos;s the case, we say so plainly and mark it,
              rather than guess. We&apos;d rather tell you &ldquo;this isn&apos;t decided&rdquo; than sound
              more certain than the facts allow.
            </p>
          </Prose>
        </div>

        <div className="mt-10 max-w-2xl">
          <Callout variant="info" title="This is guidance, not legal advice">
            This is guidance to help you understand the CSRD and EU sustainability reporting, not
            legal advice. We&apos;ve worked hard to get it right and to link our sources, but for
            decisions specific to your business, confirm with the official sources we link or a
            qualified adviser. We can&apos;t guarantee compliance, and you should be wary of anyone who
            says they can.
          </Callout>
        </div>

        <div className="mt-12 max-w-2xl">
          <Prose>
            <h2>Who&apos;s behind it</h2>
            <p>
              {/* TODO: real maintainer name */}
              CSRD Tools is a free information service operated by Nukipa Labs GmbH. It is
              maintained as an editorial project, not by a regulator and not by a vendor.
            </p>

            <h2>Get in touch</h2>
            <p>
              Spotted something out of date, or have a question we should answer? Tell us. We read
              everything and we&apos;d rather hear it from you than leave a mistake live. Email us at{' '}
              <a href="mailto:contact@nukipalabs.com">contact@nukipalabs.com</a>.
            </p>
            <p>
              Want the updates without checking back?{' '}
              <Link href="/subscribe">Subscribe to The CSRD Brief.</Link>
            </p>
          </Prose>
        </div>
      </Container>
    </>
  );
}
