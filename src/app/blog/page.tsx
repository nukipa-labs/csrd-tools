import type { Metadata } from 'next';
import Link from 'next/link';
import { getNukipaClient } from '@/lib/nukipa';
import { PostCard } from '@/components/PostCard';
import { Container } from '@/components/ui/Container';

// Revalidate the listing every minute. Posts are published from the
// Nukipa dashboard, not committed to this repo; ISR keeps the listing
// fresh without redeploying.
export const revalidate = 60;

export const metadata: Metadata = {
  title:       'All articles',
  description:
    'Every plain-English CSRD, ESRS and Omnibus explainer and update from CSRD Tools, in one place.'
};

export default async function BlogIndex() {
  const client = await getNukipaClient();
  const posts  = await client.listPosts({ limit: 50 });

  return (
    <main className="bg-paper py-20 lg:py-24">
      <Container>
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            From the Brief
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.01em] text-ink lg:text-5xl">
            All articles
          </h1>
          <p className="mt-4 font-body text-base leading-relaxed text-[color:var(--color-text-muted)] lg:text-lg">
            Plain-English CSRD, ESRS and Omnibus explainers and updates. New entries land here as
            the rules move. For the regulatory updates on their own, see{' '}
            <Link
              href="/news"
              className="font-medium text-primary underline decoration-line underline-offset-2 hover:decoration-accent-deep"
            >
              The CSRD Brief
            </Link>
            .
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-card border border-line bg-card p-8 lg:p-10">
            <p className="font-body text-base leading-relaxed text-[color:var(--color-text-muted)]">
              The first briefings are coming soon. Subscribe to The CSRD Brief to
              get them.
            </p>
            <Link
              href="/subscribe"
              className="mt-5 inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[2px] hover:shadow-[0_8px_22px_-6px_var(--color-accent-shadow)] active:scale-[0.97]"
            >
              Subscribe to The CSRD Brief
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
