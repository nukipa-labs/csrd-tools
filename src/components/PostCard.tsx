import Link from 'next/link';
import type { SlimPost } from '@nukipa/site-sdk';

/**
 * Card used by the blog index, the /news folder archive, and the
 * related-posts strip on a post detail page. The prop is the canonical
 * `SlimPost` shape from the SDK (`client.listPosts(...)` /
 * `client.listRelatedPosts(...)`); don't redefine it.
 *
 * Brand treatment (DESIGN.md > Cards): card surface, 1px sand border,
 * rounded-card, flat at rest, lift + amber border on hover. Title in
 * Spectral forest, excerpt in muted ink, date as a mono LastUpdated-style
 * chip, optional folder badge.
 */
export function PostCard({ post }: { post: SlimPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="post-card group flex flex-col overflow-hidden rounded-card border border-line bg-card transition-[transform,box-shadow,border-color] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[3px] hover:border-accent hover:shadow-[0_12px_32px_-10px_var(--color-primary-shadow)]"
    >
      {post.cover?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover.url}
          alt={post.cover.alt || post.title}
          className="aspect-[16/9] w-full object-cover"
        />
      )}

      <div className="flex flex-1 flex-col p-6">
        {post.folder?.name && (
          <span className="mb-3 inline-flex w-fit items-center rounded-chip border border-line-strong bg-sand px-2.5 py-0.5 font-body text-xs font-semibold text-ink">
            {post.folder.name}
          </span>
        )}

        <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-primary">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-[color:var(--color-text-muted)]">
            {post.excerpt}
          </p>
        )}

        {post.published_at && (
          <time
            dateTime={post.published_at}
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-accent-deep"
          >
            <span
              aria-hidden="true"
              className="inline-block h-[7px] w-[7px] rounded-full bg-accent"
            />
            {new Date(post.published_at).toLocaleDateString(undefined, {
              year: 'numeric', month: 'short', day: 'numeric'
            })}
          </time>
        )}
      </div>
    </Link>
  );
}
