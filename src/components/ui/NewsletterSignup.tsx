'use client';

import { useState, type FormEvent } from 'react';
import { ContourBackground } from './ContourBackground';

type Variant = 'band' | 'inline' | 'footer';
type Background = 'ink' | 'forest';

const COPY = {
  heading: 'Subscribe to The CSRD Brief',
  subcopy: "We watch Brussels so you don't. Plain-English CSRD updates, free.",
  placeholder: 'you@company.com',
  button: 'Subscribe',
  microtrust: 'No spam. Unsubscribe anytime.',
  success: "You're on the list. Watch your inbox for the next Brief.",
  errorGeneric: 'Something went wrong on our end. Please try again in a moment.',
  errorEmail: "That doesn't look like a valid email address. Mind checking it?"
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSignup({
  variant = 'band',
  background = 'ink',
  heading = COPY.heading,
  subcopy = COPY.subcopy,
  source = 'site'
}: {
  variant?: Variant;
  background?: Background;
  heading?: string;
  subcopy?: string;
  source?: string;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      setError(COPY.errorEmail);
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: 'newsletter', email, source })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus('done');
        setEmail('');
      } else {
        setStatus('error');
        setError(data?.error || COPY.errorGeneric);
      }
    } catch {
      setStatus('error');
      setError(COPY.errorGeneric);
    }
  }

  // Footer variant: compact single row, no band/heading block.
  if (variant === 'footer') {
    return (
      <div className="w-full">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          The CSRD Brief
        </p>
        <p className="mt-1 text-sm text-paper/70">{subcopy}</p>
        {status === 'done' ? (
          <p className="mt-3 text-sm text-accent">{COPY.success}</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-3 flex flex-col sm:flex-row gap-2">
            <label className="sr-only" htmlFor="nl-footer">
              Email address
            </label>
            <input
              id="nl-footer"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={COPY.placeholder}
              className="min-h-[44px] flex-1 rounded-md bg-ink-dark border border-ink px-3.5 text-paper placeholder:text-paper/40 focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="min-h-[44px] rounded-md bg-accent px-5 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97] disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : COPY.button}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-2 text-sm text-accent">{error}</p>
        )}
        <p className="mt-2 text-xs text-paper/55">{COPY.microtrust}</p>
      </div>
    );
  }

  const dark = background === 'ink';
  const bandBg = dark ? 'bg-ink' : 'bg-primary';

  const inner = (
    <div className={variant === 'band' ? 'relative z-10 mx-auto max-w-2xl text-center' : ''}>
      <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        The CSRD Brief
      </p>
      <h2 className="mt-3 font-display font-semibold text-3xl lg:text-4xl text-paper">
        {heading}
      </h2>
      <p className="mt-3 text-paper/80 text-base lg:text-lg">{subcopy}</p>

      {status === 'done' ? (
        <p
          role="status"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-paper/10 px-4 py-3 text-accent font-medium"
        >
          {COPY.success}
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className={`mt-6 flex flex-col sm:flex-row gap-3 ${
            variant === 'band' ? 'mx-auto max-w-md' : ''
          }`}
        >
          <label className="sr-only" htmlFor={`nl-${variant}`}>
            Email address
          </label>
          <input
            id={`nl-${variant}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={COPY.placeholder}
            className="min-h-[48px] flex-1 rounded-md bg-ink-dark border border-ink px-4 text-paper placeholder:text-paper/40 focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="min-h-[48px] rounded-md bg-accent px-6 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97] disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : COPY.button}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p role="alert" className="mt-3 text-accent text-sm">
          {error}
        </p>
      )}
      <p className="mt-4 text-sm text-paper/70">{COPY.microtrust}</p>
    </div>
  );

  if (variant === 'inline') {
    // Caller wraps in its own band; render content on the given bg.
    return <div className={`rounded-card ${bandBg} p-8 lg:p-12 relative overflow-hidden`}>
      <ContourBackground className="opacity-60" />
      <div className="relative z-10 text-center">{inner}</div>
    </div>;
  }

  // band: full-bleed section
  return (
    <section className={`relative overflow-hidden ${bandBg} py-16 lg:py-24`}>
      <ContourBackground className="opacity-60" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {inner}
      </div>
    </section>
  );
}
