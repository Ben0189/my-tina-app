import Link from "next/link";
import { getAllPostsMeta } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const revalidate = 300;

export default async function PostsPage() {
  const posts = await getAllPostsMeta();

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Blog</p>
        <h1 className="text-4xl font-semibold tracking-tight">Blog Posts</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Writing about Azure cloud architecture, infrastructure as code, and consulting work.
        </p>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">{post.date}</p>
            <h2 className="mt-2 text-2xl font-semibold">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-muted-foreground">{post.summary}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-border p-6 text-muted-foreground">
        Write new posts by adding Markdown files in `content/posts/`.
      </div>
    </div>
  );
}
