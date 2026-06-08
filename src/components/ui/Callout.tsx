import type { ReactNode } from 'react';

type Variant = 'info' | 'warn' | 'danger';

const STYLES: Record<Variant, { box: string; heading: string }> = {
  info: {
    box: 'bg-sand-tint border-primary',
    heading: 'text-primary'
  },
  warn: {
    box: 'bg-warn border-accent',
    heading: 'text-accent-deep'
  },
  danger: {
    box: 'bg-[#FBEAE2] border-danger',
    heading: 'text-danger'
  }
};

function Glyph({ variant }: { variant: Variant }) {
  if (variant === 'info') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </svg>
    );
  }
  // warn + danger share the triangular warning glyph (NOT emoji)
  const color = variant === 'warn' ? 'text-accent-deep' : 'text-danger';
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-5 w-5 shrink-0 ${color}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86 1.82 18a1.5 1.5 0 0 0 1.29 2.25h17.78A1.5 1.5 0 0 0 22.18 18L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

export function Callout({
  variant = 'info',
  title,
  children
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const s = STYLES[variant];
  return (
    <div className={`rounded-card border-l-[3px] p-5 ${s.box}`}>
      <div className="flex gap-3">
        <Glyph variant={variant} />
        <div className="min-w-0">
          {title && (
            <p className={`font-display font-semibold text-base ${s.heading}`}>
              {title}
            </p>
          )}
          <div className={`text-ink leading-relaxed ${title ? 'mt-1' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
