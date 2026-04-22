"use client";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components } from "@/components/mdx-components";
import type { PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

interface PostClientProps {
  data: PostQuery;
  variables: PostQueryVariables;
  query: string;
}

export default function PostClient({ data, variables, query }: PostClientProps) {
  const { data: tinaData } = useTina({ data, variables, query });
  const post = tinaData.post;

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-4">
        <p className="text-sm text-muted-foreground">{post.date}</p>
        <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
      </header>

      <div className="prose prose-zinc max-w-none rounded-3xl border border-border/70 bg-white p-8 shadow-sm">
        <TinaMarkdown content={post._body} components={components} />
      </div>
    </article>
  );
}
