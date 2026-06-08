# Tenant site starter

This is the canonical starting point for a Nukipa-managed tenant site. The `nukipa-site-one-shot` skill copies this directory verbatim into a fresh project at Phase 5, then layers the design + content + structure agents' output on top.

## What ships pre-wired

These files are part of the **platform contract** - they shouldn't be deleted or rewritten by the agent. Restyle is fine; rewiring is not.

| Path | Role |
|------|------|
| `package.json` | Deps + scripts. Pinned versions match what the platform's runtime expects. |
| `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `next-env.d.ts` | Standard Next 15 + TypeScript + Tailwind v4 setup. |
| `.env.example` | Lists `NUKIPA_GATEWAY_URL` + the optional `NUKIPA_TENANT_HOST` override. The values are blank by design - the agent fills them from `BRIEF.preload.md` so a staging-generated site doesn't point at prod. |
| `src/lib/nukipa.ts` | SDK wrapper: `getNukipaClient()` for server components, `getMiddlewareClient(req)` for middleware. Every API call goes through here. |
| `src/middleware.ts` | Fire-and-forget page-view ping via `client.recordVisit(...)`. Skips static assets + API routes. |
| `src/app/blog/page.tsx` | Blog index - `listPosts({ limit: 50 })` -> grid of `<PostCard>`. |
| `src/app/blog/[slug]/page.tsx` | Blog detail - `getPostBySlug` -> `<PostBody>` for the body. NEVER replace with `dangerouslySetInnerHTML`; it breaks interactive islands (CTA tracking, form submissions, etc.). |
| `src/components/PostCard.tsx` | Card used by the index + related-posts strip. Restyle freely; keep the prop shape. |
| `src/components/NukipaFeedback.tsx` | Mounts the floating feedback widget. Server component that renders a single `<Script>` tag pointing at `/nukipa-widget.js`. Read-only for the design agents. |
| `public/nukipa-widget.js` | The actual feedback widget - vanilla JS, closed Shadow DOM, re-mounts itself if anything removes its host element. Lives outside React so design rewrites can't reach it. |
| `src/app/not-found.tsx` | 404 page. |
| `scripts/sanitize.mjs` | Strips smart quotes, en/em dashes, NBSPs, zero-width whitespace, and LLM citation artefacts from every text file under `src/` + the root. Runnable via `npm run sanitize`. Mandatory step before pushing the finished site to GitHub (see `SKILL.md` Phase 11). |

## What the agent customizes / replaces

| Path | Role |
|------|------|
| `src/app/page.tsx` | Placeholder - the merger replaces this with the real homepage (Hero + supporting sections). |
| `src/app/layout.tsx` | Minimal - the merger adds fonts, brand metadata, global Navbar + Footer wrappers. The `<NukipaFeedback />` mount inside `<body>` is platform contract and must stay. |
| `src/app/globals.css` | Neutral tokens - the design agent overrides the palette in Phase 5 per `DESIGN.md`. The `.prose-body` block is platform-shaped for `<PostBody>`; don't change its semantics. |
| `src/app/legal/*` | Privacy / Terms / Imprint - the merger generates these; the legal-polish phase refines. |
| `src/components/sections/*`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/Logo.tsx` | The static-pages merger adds these based on `CONTENT.md` + `DESIGN.md`. |
| `public/*` | Brand assets the agent downloads (logo, favicon, OG image). Note: `public/nukipa-widget.js` is platform contract - do not overwrite, rename, or delete. |

## Running locally

```bash
cp .env.example .env.local        # then set NUKIPA_GATEWAY_URL from BRIEF.preload.md
npm install
npm run dev                       # http://localhost:3000
```

The dev server throws at startup if `NUKIPA_GATEWAY_URL` is blank (see `src/lib/nukipa.ts`) - that's intentional; running against the wrong environment silently serves the wrong tenant data.
