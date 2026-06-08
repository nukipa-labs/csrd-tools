import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { PostCard } from '@/components/PostCard';
import { getNukipaClient } from '@/lib/nukipa';
import type { SlimPost } from '@nukipa/site-sdk';

// Server component. Pulls the latest CMS posts with a graceful empty state.
export async function LatestFromBrief() {
  let posts: SlimPost[] = [];
  try {
    const client = await getNukipaClient();
    posts = await client.listPosts({ limit: 3 });
  } catch {
    posts = [];
  }

  return (
    <Section
      background="paper"
      eyebrow="From the Brief"
      title="From the Brief"
      subtitle="The latest updates and explainers. New entries land here as the rules move."
    >
      {posts.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <p className="mt-8">
            <Link href="/news" className="text-primary font-medium link-underline">
              Read the archive →
            </Link>
          </p>
        </>
      ) : (
        <div className="rounded-card border border-line bg-card p-8 text-center">
          <p className="mx-auto max-w-xl text-ink/80 leading-relaxed">
            The first issues are on their way. Subscribe to The CSRD Brief and you&apos;ll get them in
            your inbox before they reach this page.
          </p>
          <p className="mt-4">
            <Link href="/subscribe" className="text-primary font-medium link-underline">
              Subscribe to The CSRD Brief →
            </Link>
          </p>
        </div>
      )}
    </Section>
  );
}
