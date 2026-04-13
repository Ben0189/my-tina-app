import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

import "@/styles.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#e5eefb_0%,#ffffff_45%,#ffffff_100%)]">
          <header className="border-b border-border/80 bg-background/90 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
              <Link href="/" className="text-lg font-semibold tracking-[0.18em]">
                {siteConfig.title}
              </Link>
              <nav className="flex items-center gap-6 text-sm text-muted-foreground">
                {siteConfig.nav.map((item) => (
                  <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-6 py-16">{children}</main>
          <footer className="border-t border-border/80 py-8">
            <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} {siteConfig.title}</p>
              <div className="flex items-center gap-4">
                {siteConfig.socialLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
