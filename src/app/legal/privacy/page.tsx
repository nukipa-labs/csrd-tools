import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Prose } from '@/components/ui/Prose';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Nukipa Labs GmbH handles your personal data when you use CSRD Tools, under the GDPR.',
  alternates: { canonical: '/legal/privacy' }
};

export default function PrivacyPage() {
  return (
    <Container size="md" className="py-16 lg:py-24">
      <h1 className="font-display font-semibold text-4xl text-ink">Privacy Policy</h1>
      <div className="mt-8">
        <Prose>
          <p>Last updated: 5 June 2026</p>

          <h2>1. General information</h2>
          <p>
            Nukipa Labs GmbH takes the protection of your personal data seriously. This policy
            explains how information is collected, used, disclosed and safeguarded when you use
            CSRD Tools.
          </p>

          <h2>2. Controller</h2>
          <p>
            Nukipa Labs GmbH, Gunta-St&ouml;lzl-Strasse 7, 80807 M&uuml;nchen, Germany. Email:
            contact@nukipalabs.com
          </p>

          <h2>3. Data we collect</h2>
          <p>
            Automatically when you visit: IP address, browser type and version, operating system,
            referrer URL, time and date of access, and other anonymised technical data.
          </p>
          <p>
            Via contact and signup forms: your name, email address, and the contents of your
            message.
          </p>

          <h2>4. Purpose and legal basis</h2>
          <p>
            We process data under Art. 6(1)(b) GDPR for the performance of a contract, Art.
            6(1)(f) GDPR based on our legitimate interest, and Art. 6(1)(a) GDPR where you have
            given consent.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Essential cookies enable core functionality. Non-essential cookies (analytics,
            marketing) are only set with your consent via the cookie banner. You can manage your
            preferences at any time.
          </p>

          <h2>6. Third-party services</h2>
          <p>
            External integrations may include cloud providers (AWS, Microsoft Azure, Google
            Cloud), hosting services (Cloudflare, Supabase, Modal), AI APIs (Mistral AI, OpenAI,
            Google Gemini), analytics (Google Analytics), office tools (Google Workspace) and
            payment processors (Stripe).
          </p>

          <h2>7. Data retention</h2>
          <p>
            We retain personal data only as long as necessary for the stated purposes or to comply
            with legal obligations.
          </p>

          <h2>8. Your rights</h2>
          <p>
            You have the right to access, rectification, erasure, restriction of processing, data
            portability, to object to processing, and to withdraw consent. To exercise these
            rights, contact contact@nukipalabs.com.
          </p>

          <h2>9. International data transfers</h2>
          <p>Any international transfers comply with GDPR safeguards.</p>

          <h2>10. Security</h2>
          <p>We implement appropriate technical and organisational security measures.</p>

          <h2>11. Complaints</h2>
          <p>
            You may lodge a complaint with the competent supervisory authority, the Bavarian Data
            Protection Authority (BayLDA).
          </p>
        </Prose>
      </div>
    </Container>
  );
}
