import fs from "node:fs/promises";
import path from "node:path";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function parseFrontmatter(fileContent: string) {
  if (!fileContent.startsWith("---")) {
    return { data: {}, content: fileContent.trim() };
  }

  const end = fileContent.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: fileContent.trim() };
  }

  const rawFrontmatter = fileContent.slice(3, end).trim();
  const content = fileContent.slice(end + 4).trim();
  const data: Record<string, string> = {};

  for (const line of rawFrontmatter.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");
    data[key] = value;
  }

  return { data, content };
}

function getSlugFromFilename(filename: string) {
  return filename.replace(/\.(md|mdx)$/, "");
}

async function getPostFiles() {
  const entries = await fs.readdir(postsDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && /\.(md|mdx)$/.test(entry.name))
    .map((entry) => entry.name);
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  const files = await getPostFiles();
  const posts = await Promise.all(
    files.map(async (filename) => {
      const fullPath = path.join(postsDirectory, filename);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const { data } = parseFrontmatter(fileContent);

      return {
        slug: getSlugFromFilename(filename),
        title: data.title || "Untitled Post",
        date: data.date || "",
        summary: data.summary || "",
      };
    }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getLatestPosts(limit = 3) {
  const posts = await getAllPostsMeta();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const candidates = [`${slug}.md`, `${slug}.mdx`];

  for (const candidate of candidates) {
    try {
      const fullPath = path.join(postsDirectory, candidate);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const { data, content } = parseFrontmatter(fileContent);

      return {
        slug,
        title: data.title || "Untitled Post",
        date: data.date || "",
        summary: data.summary || "",
        content,
      };
    } catch {
      continue;
    }
  }

  return null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderInlineMarkdown(text: string) {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline underline-offset-4">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

export function renderMarkdownToHtml(markdown: string) {
  const lines = markdown.split("\n");
  const output: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    output.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    output.push(`<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`);
    listItems = [];
  };

  const flushCodeBlock = () => {
    if (codeLines.length === 0) return;
    output.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    codeLines = [];
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushParagraph();
      flushList();
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      output.push(`<h3>${renderInlineMarkdown(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      output.push(`<h2>${renderInlineMarkdown(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      output.push(`<h1>${renderInlineMarkdown(line.slice(2))}</h1>`);
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listItems.push(line.slice(2).trim());
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  if (inCodeBlock) flushCodeBlock();

  return output.join("\n");
}
