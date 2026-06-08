'use client';

import { useState, type FormEvent } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PACK_URL = '/downloads/csrd-supplier-response-pack.pdf';

export function SupplierForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  function triggerDownload() {
    const a = document.createElement('a');
    a.href = PACK_URL;
    a.download = 'csrd-supplier-response-pack.pdf';
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
        body: JSON.stringify({
          slug: 'supplier-pack',
          email,
          source: 'suppliers'
        })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus('done');
        triggerDownload();
      } else {
        setStatus('error');
        setError(data?.error || `We couldn't submit that just now. Please try again.`);
      }
    } catch {
      setStatus('error');
      setError(`We couldn't submit that just now. Please try again.`);
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-card border border-line bg-card p-6">
        <p className="text-ink leading-relaxed">
          Your download has started. Check your downloads folder for the printable
          supplier-response kit (PDF).
        </p>
        <p className="mt-4">
          <a
            href={PACK_URL}
            download
            className="inline-flex min-h-[44px] items-center rounded-md bg-accent px-5 font-body font-semibold text-ink transition-[transform,box-shadow] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97]"
          >
            Did not start? Download the kit (PDF)
          </a>
        </p>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          You&apos;ve also joined The CSRD Brief, our free plain-English update newsletter, so you hear
          when the rules change and the templates get updated. Unsubscribe any time, in one click.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-line bg-card p-6">
      <p className="text-ink font-medium">
        Want the printable response kit (PDF) to keep? Enter your email and download it instantly.
      </p>

      <div className="mt-4">
        <label htmlFor="supplier-email" className="block font-body font-medium text-ink text-sm">
          Email
        </label>
        <input
          id="supplier-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="mt-1.5 min-h-[44px] w-full rounded-md border border-line bg-white px-3.5 text-ink placeholder:text-muted focus:border-accent focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-3 text-danger text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-5 min-h-[44px] w-full rounded-md bg-accent px-6 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97] disabled:opacity-50"
      >
        {status === 'loading' ? 'Preparing...' : 'Email me + download the kit'}
      </button>

      <p className="mt-4 text-xs text-muted leading-relaxed">
        The templates above are free to copy right now, no email needed. This gives you the
        print-ready PDF kit to keep and joins you to The CSRD Brief, our free plain-English newsletter,
        so you hear when the rules change. Unsubscribe any time, in one click.
      </p>
    </form>
  );
}
