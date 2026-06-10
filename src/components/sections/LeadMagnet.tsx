'use client';

import { useState, type FormEvent } from 'react';
import { Container } from '@/components/ui/Container';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadMagnetProps = {
  /** Form slug (must be allow-listed in /api/lead and exist as a tenant form row). */
  slug: string;
  /** Public path to the file, e.g. /downloads/csrd-scope-deadlines-cheat-sheet.pdf */
  file: string;
  /** Suggested download filename. */
  fileName: string;
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  /** Analytics-ish source label sent with the lead. */
  source?: string;
  /** Button label before submit. */
  cta?: string;
};

/**
 * Gated PDF lead magnet: the visitor must enter an email to get the download.
 * On success it posts the lead to /api/lead (joining The CSRD Brief) and starts
 * the download immediately, with a manual fallback link.
 */
export function LeadMagnet({
  slug,
  file,
  fileName,
  eyebrow = 'Free download',
  title,
  description,
  bullets = [],
  source,
  cta = 'Email me the PDF'
}: LeadMagnetProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  function triggerDownload() {
    const a = document.createElement('a');
    a.href = file;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      setError("That doesn't look like a valid email address. Mind checking it?");
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, email, source: source || slug })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus('done');
        setEmail('');
        triggerDownload();
      } else {
        setStatus('error');
        setError(data?.error || 'Something went wrong on our end. Please try again in a moment.');
      }
    } catch {
      setStatus('error');
      setError('Something went wrong on our end. Please try again in a moment.');
    }
  }

  return (
    <section className="bg-paper py-16 lg:py-20">
      <Container size="lg">
        <div className="overflow-hidden rounded-card bg-ink">
          <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_1fr] lg:p-12">
            {/* Left: pitch */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {eyebrow}
              </p>
              <h2 className="mt-3 font-display font-semibold text-2xl lg:text-3xl text-paper leading-tight">
                {title}
              </h2>
              <p className="mt-3 text-paper/80 leading-relaxed">{description}</p>
              {bullets.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-paper/85">
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-1 h-4 w-4 shrink-0 text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right: gate */}
            <div className="flex flex-col justify-center rounded-card bg-ink-dark p-6 lg:p-8">
              {status === 'done' ? (
                <div role="status">
                  <p className="font-display font-semibold text-lg text-accent">
                    Your download has started.
                  </p>
                  <p className="mt-2 text-paper/80 leading-relaxed">
                    Check your downloads folder for the PDF. You have also joined The CSRD Brief, so
                    you hear when the rules change. Unsubscribe in one click.
                  </p>
                  <p className="mt-3 text-sm text-paper/70">
                    Did not start?{' '}
                    <a
                      href={file}
                      download={fileName}
                      className="font-semibold text-accent underline underline-offset-2"
                    >
                      Download it here
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <label htmlFor={`lm-${slug}`} className="block font-body font-medium text-paper">
                    Enter your email to get the PDF
                  </label>
                  <input
                    id={`lm-${slug}`}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-3 min-h-[48px] w-full rounded-md border border-paper/20 bg-ink px-4 text-paper placeholder:text-paper/40 focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-3 min-h-[48px] w-full rounded-md bg-accent px-6 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97] disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Preparing...' : cta}
                  </button>
                  {status === 'error' && (
                    <p role="alert" className="mt-3 text-sm text-accent">
                      {error}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-paper/60 leading-relaxed">
                    We email you the PDF and add you to The CSRD Brief, our free plain-English
                    newsletter. No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
