# Personal Blog

This project is a Markdown-driven personal blog built with Next.js.

It still uses Tina's local tooling for schema and content generation, but it no longer assumes Tina Cloud for production builds.

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the app:

```bash
pnpm dev
```

## Deployment

Deploy to Vercel with the default build command:

```bash
pnpm build
```

The default build uses Tina local mode, so Tina Cloud credentials are optional.
