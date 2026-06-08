import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PostBody, renderSourcesList } from '@nukipa/post-renderer-react';
import { getNukipaClient } from '@/lib/nukipa';
import { PostCard } from '@/components/PostCard';
import { GateForm, type GateFormProps } from '@/components/GateForm';
import { Container } from '@/components/ui/Container';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client   = await getNukipaClient();
  const post     = await client.getPostBySlug(slug);
  if (!post) return {};
  const seo = (post.seo as Record<string, string | undefined>) || {};
  return {
    title:       seo.title       || post.title,
    description: seo.description || post.excerpt || undefined,
    openGraph: {
      title:       seo.title       || post.title,
      description: seo.description || post.excerpt || undefined,
      images:      seo.og_image ? [{ url: seo.og_image }]
                 : (post.cover?.url ? [{ url: post.cover.url }] : undefined),
      type:        'article'
    }
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const client   = await getNukipaClient();
  const post     = await client.getPostBySlug(slug);
  if (!post) notFound();

  // `<PostBody>` hydrates interactive islands (CTA tracking, contact-form
  // submissions, lead-gen forms) - DO NOT replace with
  // dangerouslySetInnerHTML or a markdown-to-html call, that collapses
  // every island to dead HTML and breaks analytics + form submissions.
  const related     = await client.listRelatedPosts(slug, { limit: 3 });
  const sourcesHtml = renderSourcesList(post.sources ?? []);

  // Gating fields (`is_gated`, `gated_form_*`) are returned by the public
  // API on locked posts but aren't in this SDK version's FullPost type, so
  // read them through a narrow view. This keeps the platform gating
  // contract (see blog-integration.md > Gating) intact and type-clean.
  const gated = post as typeof post & {
    is_gated?:          boolean;
    gated_form_slug?:   string | null;
    gated_form_name?:   string | null;
    gated_form_fields?: GateFormProps['fields'];
  };

  // Article JSON-LD (structured data for the post).
  const jsonLd = {
    '@context':     'https://schema.org',
    '@type':        'BlogPosting',
    headline:       post.title,
    description:    post.excerpt ?? undefined,
    datePublished:  post.published_at ?? undefined,
    dateModified:   post.updated_at ?? post.published_at ?? undefined,
    image:          post.cover?.url ?? undefined,
    publisher: {
      '@type': 'Organization',
      name:    'CSRD Tools'
    }
  };

  const publishedLabel = post.published_at
    ? new Date(post.published_at).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : null;

  return (
    <main className="bg-paper py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <Container size="md">
          <Link
            href="/blog"
            className="font-body text-sm text-primary underline decoration-line underline-offset-2 transition-colors hover:decoration-accent-deep"
          >
            &larr; Back to all articles
          </Link>

          <header className="mt-6 mb-8">
            {post.folder?.name && (
              <span className="mb-4 inline-flex w-fit items-center rounded-chip border border-line-strong bg-sand px-2.5 py-0.5 font-body text-xs font-semibold text-ink">
                {post.folder.name}
              </span>
            )}

            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-[-0.01em] text-ink lg:text-5xl">
              {post.title}
            </h1>

            {publishedLabel && (
              <time
                dateTime={post.published_at ?? undefined}
                className="mt-4 inline-flex items-center gap-1.5 rounded-chip border border-line bg-sand-tint px-2.5 py-1 font-mono text-xs text-accent-deep"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-[7px] w-[7px] rounded-full bg-accent"
                />
                Last updated &middot; {publishedLabel}
              </time>
            )}
          </header>

          {post.cover?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover.url}
              alt={post.cover.alt || post.title}
              className="mb-10 w-full rounded-card border border-line"
            />
          )}

          <div className="prose-body">
            <PostBody
              body={post.body ?? ''}
              components={post.components ?? []}
              sources={post.sources ?? []}
              postId={post.id}
              lang={post.language ?? undefined}
            />
            {sourcesHtml && <div dangerouslySetInnerHTML={{ __html: sourcesHtml }} />}
          </div>

          {/* Gating: the CMS truncates `body` and clears `components` +
              `sources` when a visitor hasn't unlocked yet. The truncated body
              renders above; the form below collects the unlock identity
              (typically email) and posts to /public/v1/forms/<slug>/submit. */}
          {gated.is_gated && gated.gated_form_slug && (
            <GateForm
              formSlug={gated.gated_form_slug}
              formName={gated.gated_form_name ?? null}
              fields={gated.gated_form_fields ?? []}
            />
          )}
        </Container>

        {related.length > 0 && (
          <Container size="lg" className="mt-20">
            <h2 className="mb-6 font-display text-2xl font-semibold tracking-[-0.01em] text-ink lg:text-3xl">
              Related reading
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {related.map((r) => (
                <PostCard key={r.id} post={r} />
              ))}
            </div>
          </Container>
        )}
      </article>
    </main>
  );
}
