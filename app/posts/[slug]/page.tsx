import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site";
import client from "@/tina/__generated__/client";
import PostClient from "./post-client";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await client.queries.postConnection();
  return (posts.data.postConnection.edges ?? []).map((edge) => ({
    slug: edge!.node!._sys.filename,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const res = await client.queries.post({ relativePath: `${slug}.mdx` });
    const post = res.data.post;
    return {
      title: `${post.title} | ${siteConfig.title}`,
    };
  } catch {
    return { title: `Post | ${siteConfig.title}` };
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let res;
  try {
    res = await client.queries.post({ relativePath: `${slug}.mdx` });
  } catch {
    notFound();
  }

  return <PostClient data={res.data} variables={res.variables} query={res.query} />;
}
