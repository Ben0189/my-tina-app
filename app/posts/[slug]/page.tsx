import { notFound } from "next/navigation";
import { getAllPostsMeta, getPostBySlug, renderMarkdownToHtml } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: `Post | ${siteConfig.title}`,
    };
  }

  return {
    title: `${post.title} | ${siteConfig.title}`,
    description: post.summary,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const html = renderMarkdownToHtml(post.content);

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-4">
        <p className="text-sm text-muted-foreground">{post.date}</p>
        <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
        {post.summary ? <p className="text-lg text-muted-foreground">{post.summary}</p> : null}
      </header>

      <div
        className="prose prose-zinc max-w-none rounded-3xl border border-border/70 bg-white p-8 shadow-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
