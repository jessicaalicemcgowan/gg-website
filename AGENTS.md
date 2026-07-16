<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Geoffrey Grunfeld — website

Frontend-first build (same approach as Michael's site): build and refine
design/animation/feel here first on static/placeholder content, get client
sign-off, THEN wire up Sanity (content) and Shopify (Objects/shop). Not
approved yet as of this writing — do not start CMS/commerce wiring without
checking in first.

## Stack

- Next.js 16 (App Router, Turbopack), TypeScript, React 19
- Tailwind CSS v4 (CSS-first config — see `@theme` block in
  `src/app/globals.css`, there is no `tailwind.config.js`)
- Framer Motion for animation/transitions
- No CMS/commerce wired up yet. All content lives in `src/data/*.ts` as
  typed placeholder data, shaped so it maps cleanly onto future Sanity
  documents / Shopify products later. Confirmed headless: this Next.js app
  is the only frontend — Shopify is Storefront-API-only for Objects/shop
  data (no theme, no Liquid), Sanity is the content layer for Spaces/case
  studies.

## IMPORTANT: this folder is Dropbox-synced

This whole project lives inside a Dropbox folder
(`~/Dropbox/Geoffry Grunfeld/GG-Website`). **Never install `node_modules` or
run builds (`.next/`) inside this folder** — it's slow to sync, and in this
Cowork/agent environment write/delete permissions on Dropbox-mounted folders
are unreliable (deletes can silently fail). If you're working from an agent
sandbox: install deps and run dev/build somewhere outside Dropbox (e.g. a
temp dir or a proper git clone location), and only copy clean *source*
files back into this folder. `.gitignore` already excludes `node_modules`
and `.next`.

If you're a human running this locally in a normal editor/terminal, this
constraint doesn't apply to you — `npm install && npm run dev` works
normally, just be aware Dropbox will sync `node_modules` unless you move the
repo out of Dropbox or add `node_modules`/`.next` to Dropbox's ignore list
(Finder → right-click folder → "Ignore" or the `com.dropbox.ignored` xattr).

There is currently a leftover `node_modules` / `.next` / `delete-test.txt`
in this folder from an agent mistake early in the project — safe to delete
via Finder, an agent sandbox could not remove them.

## Design source

- Figma: "Geoffrey Grunfeld We..." file, **"Dev" page** (not "Page 1" —
  that's WIP/exploration). All copy in `src/data/*.ts` is transcribed
  verbatim from the Dev page's text layers. Per client instruction, do not
  rewrite any copy — including the Lorem Ipsum placeholder captions, which
  are baked into the Figma file itself, not something we introduced.
- Animation reference: cabinberlin.com/residency (scroll feel) and
  cabinberlin.com/exhibition/transmissons (slide-out panel behavior).
- Real photography/product images have been exported from Figma into
  `public/images/` (hashed filenames, referenced directly from
  `src/data/caseStudies.ts` and `src/data/objects.ts`). The old
  `public/images/placeholder/` solid-color stand-ins are no longer
  referenced by any page but are still on disk — safe to delete. Not every
  image in the Dev page has been pulled yet (e.g. Spaces grid cards beyond
  Son Rullan reuse Son Rullan's photos as placeholders); to pull more, add
  more node IDs via the Figma MCP `get_design_context` tool with
  `dirForAssetWrites` pointed at this folder's `public/images` path.

## Structure

- `src/app/page.tsx` — homepage: loading sequence (beige → wordmark fades in
  → hero image fades in → tagline/nav fades in), then directly into the
  Spaces grid (no gap — scrolling the homepage takes you straight into
  Spaces, per brief).
- `src/components/SonRullanNarrative.tsx` — the actual Spaces page content:
  a 1:1 rebuild of Figma node 65:111, a single long-form editorial page
  (hero card → origins → gallery strip → pull-quote → unlabeled paragraph →
  image collage → approach → second gallery strip (mix-blend-exclusion) →
  exhibition → "next: Objects" → footer). This is NOT a grid of project
  thumbnails — an earlier version of this codebase built a grid+slide-out
  pattern based on a misreading of the brief; that was wrong and has been
  replaced. `src/app/page.tsx` renders it directly below `HomeHero`
  (continuous scroll, per brief), and `src/app/spaces/page.tsx` renders it
  standalone with the sticky nav.
- `src/components/SlideOutPanel.tsx` / `CaseStudyContent.tsx` /
  `CaseStudyInfoContent.tsx` — the right-drawer pattern, now wired back in:
  clicking any image in `SonRullanNarrative.tsx`'s first ("origins") gallery
  strip opens this drawer (`CaseStudyContent` using `caseStudies[0]` /
  Son Rullan data), with an "info" button that layers a second drawer
  (`CaseStudyInfoContent`) on top, per Figma node 65:775. The second gallery
  strip (mix-blend-exclusion, further down the page) still opens the plain
  `Lightbox` on click — that scoping was intentional per the brief ("Son Ru
  horizontal scroll row" specifically).
- `src/app/spaces/[slug]/page.tsx` — direct/linkable per-case-study page,
  still using the placeholder-duplication approach (Can Cigonya/Gelat/German
  reuse Son Rullan's content) until more properties are designed.
- `src/app/objects/page.tsx` + `src/app/objects/[slug]/page.tsx` — shop grid
  + PDP. No cart/checkout yet (explicitly out of scope for now).
- `src/components/Header.tsx` — the two nav states + hover-reveal behavior.
  `variant="home"` renders the inline extended nav as part of the loading
  sequence and swaps to a sticky reduced nav on scroll; `variant="page"` is
  the sticky reduced nav from first paint (used on every other page).
  Hovering the wordmark in the reduced nav drops down the full extended nav
  in a brown overlay.
- `src/components/SlideOutPanel.tsx` — generic right-side drawer; a second
  instance with `layer={1}` stacks on top for the "info" panel.
- `src/components/InfiniteScrollRow.tsx` — user-controlled, infinitely
  looping horizontal gallery (triples the image list, silently jumps by one
  set-width at either edge).
- `src/components/Carousel.tsx` — click-to-advance, soft crossfade,
  caption updates with the image.
- `src/data/caseStudies.ts` — Son Rullan is the one fully-designed case
  study; the other Spaces grid cards (Can Cigonya, Can Gelat, Can German)
  reuse its content as a placeholder per client instruction, ready to swap
  for real Sanity content per-property later.
- `src/data/objects.ts` — same placeholder approach: one designed PDP
  ("CH 0045"), reused across the grid until Shopify products exist.

## Fonts

Site-wide, every piece of text uses Albertus Light (`--font-body` is
aliased to `--font-albertus` in `globals.css`) — this matches the Figma
spec exactly (H1/Paragraph/Paragraph Caps all specify the MAlbertus
family). There is no second body serif; don't reintroduce one without
checking Figma first.

## Images

`public/images/image-1.jpg` … `image-6.jpg` are real property photos
Jessica dropped directly into the folder (also present under their
original `Image 1.jpg` … `Image 6.jpg` names — harmless duplicates, safe to
delete via Finder). They're used in the homepage hero carousel and in
`SonRullanNarrative.tsx`. Everything else under `public/images/` is a
hash-named export pulled from Figma via the Dev Mode MCP — when pulling
more, note that Figma sometimes exports the *same* underlying photo under
different node names in different pulls, which caused a real duplicate
image bug (same file used twice in the collage) that got fixed on
2026-07-16. Sanity-check for repeated `src` values when using these.

## Status / next up

1. Get real images exported from Figma (see Design source above) and swap
   into `public/images/`.
2. Client review of feel/motion against cabinberlin.com reference.
3. Once approved: wire up Sanity for case studies/objects content, Shopify
   Storefront API for the Objects shop (cart/checkout still out of scope
   until specced).
4. Two open items from the 2026-07-16 feedback round couldn't be resolved
   with confidence from screenshots alone and are still outstanding on the
   image collage in `SonRullanNarrative.tsx`: "swap the order of the images
   in image 2" and "change the size of image in (image 3) to match the size
   of (image 4)". Everything else from that round is done (hero header
   full-bleed/no-padding, 6-image crossfading carousel with 1/6..6/6
   captions, extended nav moved to top, Albertus font site-wide, origins
   strip top-aligned + clickable + opens the slide-out drawer, infinite loop
   scroll on both strips, footer matched to node 65:239, the Can
   German/Can Cigonya two-up block removed). Next time, ask Jessica to
   describe these two by content/position (e.g. "the fireplace photo," "the
   third image in the collage") rather than by screenshot number, since
   "Image N" numbering hasn't lined up 1:1 with collage order across
   messages.
