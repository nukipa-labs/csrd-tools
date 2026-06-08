'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Simple consent notice. The site sets no analytics or advertising cookies,
// so this is informational: the visitor's choice is remembered in
// localStorage (not a cookie), and there are no non-essential cookies to
// disable on "Decline".
const STORAGE_KEY = 'csrd-cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem(STORAGE_KEY);
      if (choice !== 'accepted' && choice !== 'declined') setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(choice: 'accepted' | 'declined') {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage unavailable: just close the banner */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-card border border-ink/40 bg-ink p-5 text-paper shadow-[0_-8px_40px_-12px_rgba(15,42,63,0.45)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-paper/90">
          We use only the cookies this site needs to work. We do not use analytics or
          advertising cookies and we do not track you across other sites. See our{' '}
          <Link href="/legal/privacy" className="font-semibold text-accent underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose('declined')}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-paper/35 px-5 font-body text-sm font-semibold text-paper transition-colors hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-5 font-body text-sm font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
