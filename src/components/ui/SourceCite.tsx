import type { ReactNode } from 'react';

/**
 * Inline citation link to an official source (EUR-Lex / EC / TRACES).
 * Forest text, dotted underline that turns amber-deep solid on hover.
 */
export function SourceCite({
  href,
  children,
  n
}: {
  href: string;
  children?: ReactNode;
  n?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="official source"
      className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
    >
      {children ?? 'source'}
      {typeof n === 'number' && (
        <sup className="ml-0.5 font-mono text-[0.7em] text-accent-deep">[{n}]</sup>
      )}
    </a>
  );
}

/** Page-bottom numbered list of official sources. */
export function Sources({
  items,
  title = 'Sources'
}: {
  items: { href: string; label: string; retrieved?: string }[];
  title?: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mt-12 border-t border-line pt-6">
      <h2 className="font-display font-semibold text-xl text-ink">{title}</h2>
      <ol className="mt-4 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={it.href + i} className="flex gap-2 text-muted">
            <span className="font-mono text-accent-deep">[{i + 1}]</span>
            <span>
              <a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                title="official source"
                className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
              >
                {it.label}
              </a>
              {it.retrieved && (
                <span className="ml-2 font-mono text-xs text-muted">
                  retrieved {it.retrieved}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
