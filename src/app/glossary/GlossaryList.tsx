'use client';

import { useMemo, useState } from 'react';
import { GLOSSARY, type GlossaryTerm } from '@/lib/glossary';

const BY_SLUG = new Map(GLOSSARY.map((t) => [t.slug, t]));

function termOf(slug: string): GlossaryTerm | undefined {
  return BY_SLUG.get(slug);
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function GlossaryList() {
  const [query, setQuery] = useState('');

  const sorted = useMemo(
    () => [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term)),
    []
  );

  const activeLetters = useMemo(() => {
    const set = new Set<string>();
    for (const t of sorted) set.add(t.term[0].toUpperCase());
    return set;
  }, [sorted]);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return sorted;
    return sorted.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.plain.toLowerCase().includes(q) ||
        (t.formal ?? '').toLowerCase().includes(q)
    );
  }, [q, sorted]);

  return (
    <div>
      {/* Search */}
      <div className="mx-auto max-w-xl">
        <label htmlFor="glossary-search" className="sr-only">
          Search the glossary
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a term, e.g. ESRS, double materiality, Scope 3"
          className="w-full rounded-md border border-line bg-white px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper"
        />
        <p className="mt-2 font-mono text-xs text-muted" aria-live="polite">
          {filtered.length} of {sorted.length} terms
        </p>
      </div>

      {/* A-Z jump bar */}
      <nav
        aria-label="Jump to letter"
        className="mt-8 flex flex-wrap justify-center gap-1.5"
      >
        {ALPHABET.map((letter) => {
          const has = activeLetters.has(letter);
          return has ? (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-chip bg-sand-tint font-body text-sm font-semibold text-primary transition-colors hover:bg-sand"
            >
              {letter}
            </a>
          ) : (
            <span
              key={letter}
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-chip font-body text-sm font-semibold text-muted/40"
            >
              {letter}
            </span>
          );
        })}
      </nav>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted">
          No terms match "{query}". Try a shorter search, or browse the list above.
        </p>
      ) : (
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((t) => {
            const firstOfLetter =
              !q && t === sorted.find((s) => s.term[0].toUpperCase() === t.term[0].toUpperCase());
            return (
              <li
                key={t.slug}
                id={t.slug}
                className="group scroll-mt-28 rounded-card border border-line bg-card p-6"
              >
                {firstOfLetter && (
                  <span id={`letter-${t.term[0].toUpperCase()}`} className="sr-only">
                    {t.term[0].toUpperCase()}
                  </span>
                )}
                <h3 className="flex items-baseline gap-2 font-display text-xl font-semibold text-primary">
                  <a href={`#${t.slug}`} className="hover:underline">
                    {t.term}
                  </a>
                  <a
                    href={`#${t.slug}`}
                    aria-label={`Link to ${t.term}`}
                    className="font-body text-base text-accent-deep opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                  >
                    #
                  </a>
                </h3>
                <p className="mt-2 text-ink leading-relaxed">{t.plain}</p>
                {t.formal && (
                  <p className="mt-3 text-sm text-muted leading-relaxed">{t.formal}</p>
                )}
                {t.seeAlso && t.seeAlso.length > 0 && (
                  <p className="mt-4 text-sm text-muted">
                    See also:{' '}
                    {t.seeAlso.map((slug, i) => {
                      const ref = termOf(slug);
                      if (!ref) return null;
                      return (
                        <span key={slug}>
                          {i > 0 && ', '}
                          <a
                            href={`#${slug}`}
                            className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
                          >
                            {ref.term}
                          </a>
                        </span>
                      );
                    })}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
