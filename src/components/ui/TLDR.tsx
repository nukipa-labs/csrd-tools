import type { ReactNode } from 'react';

export function TLDR({
  title = 'TL;DR',
  children
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-card bg-low border-l-[3px] border-primary p-5 lg:p-6">
      <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {title}
      </p>
      <div className="mt-2 text-ink text-lg leading-relaxed">{children}</div>
    </div>
  );
}
