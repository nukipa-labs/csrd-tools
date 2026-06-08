import type { Metadata } from 'next';
import Link from 'next/link';
import { getNukipaClient } from '@/lib/nukipa';
import { PostCard } from '@/components/PostCard';
import { Container } from '@/components/ui/Container';

// Folder-backed archive of update posts (the "news" folder in the CMS).
// Same data flow as /blog but narrowed to one folder. Unknown/empty
// folder returns an empty list (not 404), so we render the empty state.
export const revalidate = 60;

export const metadata: Metadata = {
  title:       'The CSRD Brief: CSRD, ESRS & Omnibus news and updates',
  description:
    "The archive of CSRD, ESRS and Omnibus news and regulatory updates. We watch Brussels so you don't: plain-English summaries of what changed, what it means, and what to do next."
};

export default async function NewsPage() {
  const client = await getNukipaClient();
  const posts  = await client.listPosts({ folder: 'news', limit: 50 });

  return (
    <main className="bg-paper py-20 lg:py-24">
      <Container>
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            The CSRD Brief
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.01em] text-ink lg:text-5xl">
            CSRD, ESRS &amp; Omnibus news and updates
          </h1>
          <p className="mt-4 font-body text-base leading-relaxed text-[color:var(--color-text-muted)] lg:text-lg">
            EU sustainability reporting keeps moving. This is the archive of what changed, in plain
            English, with a link to the official source every time. We watch
            Brussels so you don&apos;t.
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
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
