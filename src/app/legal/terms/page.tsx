import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Prose } from '@/components/ui/Prose';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms that govern your use of CSRD Tools.',
  alternates: { canonical: '/legal/terms' }
};

export default function TermsPage() {
  return (
    <Container size="md" className="py-16 lg:py-24">
      <h1 className="font-display font-semibold text-4xl text-ink">Terms of Use</h1>
      <div className="mt-8">
        <Prose>
          <p>
            These Terms of Use govern your access to and use of CSRD Tools. By using the site you
            agree to these terms.
            {/* TODO: confirm publisher entity, governing law and jurisdiction before go-live. */}
          </p>

          <h2>Not legal advice</h2>
          <p>
            CSRD Tools provides plain-English information about the EU Corporate Sustainability
            Reporting Directive and EU sustainability reporting. This is general guidance to help you
            understand the rules, not legal advice, and it does not create a lawyer-client
            relationship. For decisions specific to your business, confirm with the official sources
            we link or a qualified adviser. We cannot guarantee compliance, and you should be cautious
            of anyone who claims they can.
          </p>

          <h2>Accuracy and updates</h2>
          <p>
            The CSRD changes over time. We work to keep the site accurate and to cite official
            sources, and we show a &ldquo;Last updated&rdquo; date on key pages. Even so, the content may
            not always reflect the very latest position, and where the law is unsettled we say so.
            You are responsible for checking the official sources before acting.
          </p>

          <h2>Use of the site</h2>
          <p>
            You may use the site for your own information and internal business purposes. You may not
            misuse the site, attempt to disrupt it, or use it in any unlawful way.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The content, design and branding of CSRD Tools are owned by the publisher or its
            licensors, except for official EU texts and other third-party material, which remain the
            property of their respective owners. You may share short extracts with attribution and a
            link, but you may not republish substantial parts without permission.
          </p>

          <h2>Third-party links</h2>
          <p>
            We link to official sources such as EUR-Lex, the European Commission, EFRAG and the
            Council of the EU, as well as other third-party sites. We are not responsible for the
            content of external sites.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, we are not liable for any loss arising from your
            reliance on the information on this site. The site is provided on an &ldquo;as is&rdquo; basis
            without warranties of any kind.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The &ldquo;Last updated&rdquo; date above reflects
            the most recent revision.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us.
            {/* TODO: contact email/route to be supplied. */}
          </p>
        </Prose>
      </div>
    </Container>
  );
}
