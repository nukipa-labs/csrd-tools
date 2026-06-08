import Link from 'next/link';
import { Logo } from './Logo';
import { NewsletterSignup } from './ui/NewsletterSignup';
import { ContourBackground } from './ui/ContourBackground';
import { FOOTER_COLUMNS } from '@/lib/nav';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-dark text-paper">
      <ContourBackground className="opacity-50" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 py-14 lg:py-16">
        {/* Top: newsletter + link columns */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo tone="dark" size="md" />
            <p className="mt-4 max-w-xs font-body text-sm text-paper/70">
              The free, plain-English hub for the EU Corporate Sustainability Reporting Directive.
            </p>
            <p className="mt-3 max-w-xs font-body text-sm text-paper/60">
              Find your way through EU sustainability reporting.
            </p>
            <div className="mt-6 max-w-sm">
              <NewsletterSignup variant="footer" source="footer" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  {col.heading}
                </h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-paper/75 hover:text-paper transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Independence + not-legal-advice + sourcing */}
        <div className="mt-12 border-t border-paper/15 pt-6 space-y-2">
          <p className="text-sm text-paper/60">
            Free. No software to sell, no demo to book. We just explain the rules.
            Not affiliated with the EU.
          </p>
          <p className="text-sm text-paper/60">
            This is guidance to help you understand the CSRD, not legal advice. Always
            confirm with the official sources we link or a qualified adviser.
          </p>
          <p className="text-sm text-paper/55">
            Sourced from EUR-Lex, EFRAG and the European Commission. Last reviewed 8 Jun 2026.
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-6 flex flex-col gap-3 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-paper/55">
            © 2026 CSRD Tools.
          </p>
          <nav className="flex flex-wrap gap-4">
            <Link href="/legal/privacy" className="text-sm text-paper/55 hover:text-paper">
              Privacy
            </Link>
            <Link href="/legal/terms" className="text-sm text-paper/55 hover:text-paper">
              Terms
            </Link>
            <Link href="/legal/imprint" className="text-sm text-paper/55 hover:text-paper">
              Imprint
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
