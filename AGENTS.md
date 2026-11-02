<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Geoffrey Grunfeld — website

Live (review) site: https://geoffrey-grunfeld-website.netlify.app — final domain https://geoffreygrunfeld.com
Repo: GitHub `jessicaalicemcgowan/gg-website`, branch `main`. Netlify auto-deploys on every push to `main`.

## Stack

- Next.js 16 (App Router), TypeScript, React 19, Tailwind v4 (CSS-first, see `@theme` in `src/app/globals.css`), Framer Motion.
- Content: **Sanity** (project `nwnucp27`, dataset `production`, public). Studio is hosted at https://geoffrey-grunfeld.sanity.studio/ and its schema is **MCP-managed** (there is no local studio code; schema changes are deployed with the Sanity MCP `deploy_schema`, then `deploy_studio`).
- Layout/design is code (not client-editable). Text, images, projects, objects, order and footer are CMS-editable.

## Sanity content model

- `homepageCarousel` (singleton): `slides[]` — desktop image, optional mobile image, caption. Max 8; the "1/8" numbering is automatic.
- `project`: name, slug, location, blurb, `images[]` (image + optional caption). Opens in the slide-out drawer (location + blurb = "info" panel).
- `shopObject`: name, slug, `active`, `priceOnRequest`, `price`, description, materials, measurements, `images[]` (1st = grid thumbnail, 2nd = hover). The "inquire" button is a pre-filled `mailto:` built in `src/app/objects/[slug]/page.tsx`. (The type is `shopObject` because `object` is a reserved Sanity name.)
- `homepage` (singleton): tagline, header links, intro image/caption/project, origins, featured project (+text), paragraph, `projectsGrid[]` (ordered picks: project + image + optional caption; projects not listed are appended automatically), approach text/images, feature image + caption, exhibition text.
- `objectsPage` (singleton): intro text + ordered `objectsGrid[]` (active objects not listed are appended).
- `siteSettings` (singleton): contact email, follow link, legal text (footer).

All queries live in `src/lib/content.ts`. Pages use `export const revalidate = 60` (ISR), so edits appear within about a minute — no webhooks. Images are served and resized by the Sanity CDN through a custom `next/image` loader (`src/lib/sanityLoader.ts`).

## Key files

- `src/app/page.tsx` — homepage: `HomeHero` (carousel) then `SonRullanNarrative` (the Spaces content, driven by the `homepage` document).
- `src/components/SonRullanNarrative.tsx` — fixed layout; the projects grid cycles through wide / pair / wide / narrow slots using each image's native aspect ratio.
- `src/components/CaseStudyContent.tsx`, `CaseStudyGallery.tsx`, `CaseStudyInfoContent.tsx`, `SlideOutPanel.tsx` — project drawer.
- `src/components/Header.tsx` (client) + `SiteHeader.tsx` (server wrapper that loads links), `Footer.tsx` (server, loads settings).
- `src/app/objects/*` — objects grid and product pages. `src/app/spaces/[slug]` — direct project pages.
- `src/components/Reveal.tsx` — scroll fade/drag-in wrapper used on most blocks.
- Fonts: Albertus site-wide (`font-display` / `font-body`).
- Files containing only `export {}` with an "Obsolete" comment (`SpacesSection`, `HeroImage`, `InfiniteScrollRow`, `src/data/*`) are leftovers that couldn't be deleted from the synced folder — safe to delete.

## Hidden from search until launch

`src/app/layout.tsx` (`robots: { index: false }`), `src/app/robots.ts` (disallow all) and `netlify.toml` (`X-Robots-Tag`) keep the site out of Google. **To launch: remove all three**, then redeploy.

## Working on this project

- The folder is Dropbox-synced and `.git` lives in it, so `node_modules`/`.next` are slow and file deletes from agent sandboxes often fail. `npm run dev` uses `--webpack` because Turbopack's cache corrupts under Dropbox. Agent sandboxes: copy the source to a temp dir outside Dropbox, install and build there, and copy only source files back.
- Agent sandboxes can't reach Sanity/Netlify from the shell (network allowlist), so a local `next build` fails at data fetching; use `tsc --noEmit` + `eslint`, and use the Sanity MCP `query_documents` to test GROQ. Real builds happen on Netlify.
- Agents have no git identity or GitHub credentials: the human runs `git add/commit/push` from their own terminal (not the `npm run dev` tab).
- Never commit tokens. The Sanity project ID and dataset are public and live in `src/lib/content.ts`; no env vars are needed.
- Hand-over: the client gets a Sanity login (project member, Editor role) invited via sanity.io/manage. Sanity stays on Jessica's account.
