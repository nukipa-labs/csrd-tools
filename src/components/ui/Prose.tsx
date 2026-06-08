import type { ReactNode } from 'react';

/**
 * Long-form typography wrapper for STATIC pages (pillar / tool / legal /
 * about). Uses .prose-static (globals.css), distinct from .prose-body
 * which the blog's <PostBody> depends on.
 */
export function Prose({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`prose-static ${className}`}>{children}</div>;
}
