import Link from "next/link";
import { getLatestPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const revalidate = 300;

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <div className="space-y-16">
      <section className="space-y-6 rounded-3xl border border-border/70 bg-white/80 p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Home</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {siteConfig.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{siteConfig.intro}</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest blog posts</h2>
            <Link href="/posts" className="text-sm text-muted-foreground underline underline-offset-4">
              View all posts
            </Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="space-y-4">
              {latestPosts.map((post) => (
                <article key={post.slug} className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm">
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                  <h3 className="mt-2 text-xl font-semibold">
                    <Link href={`/posts/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-muted-foreground">{post.summary}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-6 text-muted-foreground">
              No posts yet. Add your first post in `content/posts/`.
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Short bio</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{siteConfig.bio}</p>
          </section>

          <section className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Social profiles</h2>
            <div className="mt-4 flex flex-col gap-3">
              {siteConfig.socialLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4">
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
