import Link from 'next/link';
import { Icon } from './Icon';
import { EDITOR_NAME, LAST_REVIEWED_LABEL } from '@/lib/seo';

/**
 * E-E-A-T byline: who reviewed the page and when. The date is a genuine manual
 * review stamp (LAST_REVIEWED in lib/seo.ts), not auto-generated.
 */
export function Byline({ className = '' }: { className?: string }) {
  return (
    <p
      className={
        'inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-sm text-muted ' +
        className
      }
    >
      <Icon name="verified" className="text-primary text-base" />
      <span>
        Reviewed by the{' '}
        <Link
          href="/about"
          className="font-medium text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
        >
          {EDITOR_NAME}
        </Link>
      </span>
      <span aria-hidden="true" className="text-line-strong">
        &middot;
      </span>
      <span>
        Last reviewed{' '}
        <time dateTime="2026-06-08" className="font-mono text-xs text-accent-deep">
          {LAST_REVIEWED_LABEL}
        </time>
      </span>
    </p>
  );
}
