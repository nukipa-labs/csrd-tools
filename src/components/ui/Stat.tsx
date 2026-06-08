import type { ReactNode } from 'react';

export function Stat({
  value,
  label,
  source
}: {
  value: string;
  label: string;
  source?: ReactNode;
}) {
  return (
    <div className="relative px-2 py-4">
      {/* amber latitude tick (kept tiny - a tick, not a side-stripe) */}
      <span aria-hidden="true" className="block h-[2px] w-6 bg-accent" />
      <div className="mt-3 font-display font-semibold text-4xl lg:text-5xl text-primary leading-none">
        {value}
      </div>
      <p className="mt-3 text-ink text-sm lg:text-base leading-relaxed">{label}</p>
      {source && <div className="mt-2 text-xs text-muted">{source}</div>}
    </div>
  );
}

export function Stats({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 divide-y-0">
      {children}
    </div>
  );
}
