import { siteConfig } from "@/lib/site";

export const metadata = {
  title: `About | ${siteConfig.title}`,
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">About</p>
        <h1 className="text-4xl font-semibold tracking-tight">About Me</h1>
      </header>

      <section className="rounded-3xl border border-border/70 bg-white p-8 shadow-sm">
        <div className="prose prose-zinc max-w-none">
          <p>{siteConfig.intro}</p>
          <p>{siteConfig.bio}</p>
        </div>
      </section>
    </div>
  );
}
