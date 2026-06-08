import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Prose } from '@/components/ui/Prose';

export const metadata: Metadata = {
  title: 'Imprint',
  description: 'Imprint and provider information for CSRD Tools, operated by Nukipa Labs GmbH.',
  alternates: { canonical: '/legal/imprint' }
};

export default function ImprintPage() {
  return (
    <Container size="md" className="py-16 lg:py-24">
      <h1 className="font-display font-semibold text-4xl text-ink">Imprint</h1>
      <div className="mt-8">
        <Prose>
          <p>Information pursuant to &sect; 5 DDG / &sect; 5 TMG:</p>

          <h2>Provider</h2>
          <p>
            Nukipa Labs GmbH
            <br />
            Gunta-St&ouml;lzl-Strasse 7
            <br />
            80807 M&uuml;nchen
            <br />
            Germany
          </p>

          <h2>Represented by</h2>
          <p>
            The Managing Directors (Gesch&auml;ftsf&uuml;hrer): Fabien Nestmann and Steffen Iwan
          </p>

          <h2>Contact</h2>
          <p>contact@nukipalabs.com</p>

          <h2>Register details</h2>
          <p>
            Register court: Amtsgericht M&uuml;nchen
            <br />
            Commercial register number: HRB 301802
            <br />
            VAT identification number (USt-IdNr.): DE456506273
          </p>

          <h2>Responsible for content</h2>
          <p>
            Responsible for content pursuant to &sect; 18 Abs. 2 MStV: Fabien Nestmann and
            Steffen Iwan, address as above.
          </p>

          <h2>About this service</h2>
          <p>
            CSRD Tools is a free information service operated by Nukipa Labs GmbH. The
            information provided is general guidance on the EU Corporate Sustainability Reporting
            Directive and EU sustainability reporting, and is not legal advice.
          </p>
        </Prose>
      </div>
    </Container>
  );
}
