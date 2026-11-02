/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@sanity/client";
import { draftMode } from "next/headers";

const base = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "nwnucp27",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  useCdn: false,
};

export const client = createClient(base);

/**
 * Normal visitors get published content. When preview mode is on (cookie set via
 * /api/preview?secret=…) and a read token exists, drafts are included too.
 */
async function sanity() {
  const token = process.env.SANITY_READ_TOKEN;
  if (token && (await draftMode()).isEnabled) {
    return createClient({ ...base, token, perspective: "drafts" });
  }
  return client;
}

export type Img = { url: string; w: number; h: number; caption?: string };

export type TaglineBlock = {
  _key: string;
  markDefs?: { _key: string; target?: string; url?: string }[];
  children?: { _key: string; text: string; marks?: string[] }[];
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  location?: string;
  blurb?: string;
  images: Img[];
};

export type SiteSettings = {
  contactEmail: string;
  followLabel: string;
  followUrl: string;
  legalText: string;
};

export type HeaderLink = { label: string; url: string };

const IMG = `{ "url": image.asset->url, "w": image.asset->metadata.dimensions.width, "h": image.asset->metadata.dimensions.height, caption }`;
const RAW = (f: string) =>
  `{ "url": ${f}.asset->url, "w": ${f}.asset->metadata.dimensions.width, "h": ${f}.asset->metadata.dimensions.height }`;

const PROJECT = `{ "id": _id, "slug": slug.current, name, location, blurb, "images": images[defined(image.asset)] ${IMG} }`;

const clean = <T,>(arr: (T | null | undefined)[] | null | undefined) =>
  (arr ?? []).filter(Boolean) as T[];

export const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: "hello@geoffreygrunfeld.com",
  followLabel: "follow",
  followUrl: "https://www.instagram.com/geoffrey_grunfeld/",
  legalText: "©Geoffrey Grunfeld, 2026",
};

export async function getSettings(): Promise<SiteSettings> {
  const s = await (await sanity()).fetch(`*[_type=="siteSettings"][0]{contactEmail, followLabel, followUrl, legalText}`);
  return {
    contactEmail: s?.contactEmail || DEFAULT_SETTINGS.contactEmail,
    followLabel: s?.followLabel || DEFAULT_SETTINGS.followLabel,
    followUrl: s?.followUrl || DEFAULT_SETTINGS.followUrl,
    legalText: s?.legalText || DEFAULT_SETTINGS.legalText,
  };
}

export const DEFAULT_LINKS: HeaderLink[] = [
  { label: "Spaces", url: "/#spaces" },
  { label: "Objects", url: "/objects" },
];

export async function getHeaderLinks(): Promise<HeaderLink[]> {
  const h = await (await sanity()).fetch(`*[_type=="homepage"][0]{ "links": headerLinks[defined(label) && defined(url)]{label, url} }`);
  return h?.links?.length ? h.links : DEFAULT_LINKS;
}

export type CarouselSlide = { desktop: string; mobile?: string; caption?: string };

export async function getCarousel(): Promise<CarouselSlide[]> {
  const c = await (await sanity()).fetch(
    `*[_type=="homepageCarousel"][0].slides[defined(imageDesktop.asset)][0...8]{ "desktop": imageDesktop.asset->url, "mobile": imageMobile.asset->url, caption }`
  );
  return clean<CarouselSlide>(c);
}

export type Homepage = {
  tagline?: TaglineBlock[];
  introImage?: Img;
  introCaption?: string;
  introProject?: string; // project id
  originsText?: string;
  featuredProject?: string;
  featuredImages: Img[];
  featuredText?: string;
  paragraph?: string;
  grid: { projectId: string; image: Img; caption?: string }[];
  approachText?: string;
  approachImages: Img[];
  featureImage?: Img;
  exhibitionText?: string;
  projects: Record<string, Project>;
};

export async function getHomepage(): Promise<Homepage> {
  const data = await (await sanity()).fetch(`{
    "h": *[_type=="homepage"][0]{
      "tagline": tagline[]{ _key, markDefs, children },
      introCaption, originsText, featuredText, paragraph, approachText, exhibitionText,
      "introImage": introImage ${RAW("@")},
      "introProject": introProject._ref,
      "featuredProject": featuredProject._ref,
      "grid": projectsGrid[defined(project._ref)]{ "projectId": project._ref, "image": image ${RAW("@")}, extraCaption },
      "featuredImages": featuredImages[defined(image.asset)] ${IMG},
      "approachImages": approachImages[defined(image.asset)] ${IMG},
      "featureImage": featureImage ${IMG}
    },
    "projects": *[_type=="project"] | order(name asc) ${PROJECT}
  }`);
  const projects: Record<string, Project> = {};
  for (const p of data.projects ?? []) projects[p.id] = { ...p, images: clean(p.images) };
  const h = data.h ?? {};

  // Ordered picks first, then any project not yet in the grid (so nothing is
  // silently left out); fall back to a project's first image.
  const grid: Homepage["grid"] = [];
  // Each entry shows the chosen image of its project; the caption is the
  // project's name and location (plus any extra text).
  const push = (projectId: string, image?: Img, extra?: string) => {
    const p = projects[projectId];
    if (!p) return;
    const img = image?.url ? image : p.images[0];
    if (!img) return;
    const base = [p.name.toUpperCase(), p.location].filter(Boolean).join(", ");
    grid.push({ projectId, image: img, caption: extra ? `${base}. ${extra}` : base });
  };
  for (const g of h.grid ?? []) push(g.projectId, g.image, g.extraCaption);
  const listed = new Set<string>((h.grid ?? []).map((g: { projectId: string }) => g.projectId));
  for (const p of Object.values(projects)) if (!listed.has(p.id)) push(p.id);

  return {
    tagline: Array.isArray(h.tagline) && h.tagline.length ? h.tagline : undefined,
    introImage: h.introImage?.url ? h.introImage : undefined,
    introCaption: h.introCaption,
    introProject: h.introProject,
    originsText: h.originsText,
    featuredProject: h.featuredProject,
    featuredImages: clean(h.featuredImages),
    featuredText: h.featuredText,
    paragraph: h.paragraph,
    grid,
    approachText: h.approachText,
    approachImages: clean(h.approachImages),
    featureImage: h.featureImage?.url ? h.featureImage : undefined,
    exhibitionText: h.exhibitionText,
    projects,
  };
}

export async function getProject(slug: string): Promise<Project | null> {
  const p = await (await sanity()).fetch(`*[_type=="project" && slug.current==$slug][0] ${PROJECT}`, { slug });
  return p ? { ...p, images: clean(p.images) } : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  return clean<string>(await (await sanity()).fetch(`*[_type=="project" && defined(slug.current)].slug.current`));
}

export type ShopObject = {
  id: string;
  slug: string;
  name: string;
  priceLabel: string;
  description?: string;
  materials?: string;
  measurements?: string;
  images: Img[];
};

const OBJ = `{ "id": _id, "slug": slug.current, name, priceOnRequest, price, description, materials, measurements, "images": images[defined(image.asset)] ${IMG} }`;

function toObject(o: any): ShopObject {
  return {
    id: o._id ?? o.id,
    slug: o.slug,
    name: o.name,
    priceLabel: o.priceOnRequest || o.price == null ? "price on request" : `${o.price}€`,
    description: o.description,
    materials: o.materials,
    measurements: o.measurements,
    images: clean(o.images),
  };
}

export async function getObjectsPage(): Promise<{ introText?: string; objects: ShopObject[] }> {
  const d = await (await sanity()).fetch(`{
    "intro": *[_type=="objectsPage"][0].introText,
    "order": *[_type=="objectsPage"][0].objectsGrid[]._ref,
    "all": *[_type=="shopObject" && active != false && defined(slug.current)] | order(name asc) ${OBJ}
  }`);
  const all: ShopObject[] = (d.all ?? []).map(toObject);
  const byId = new Map(all.map((o) => [o.id, o]));
  const ordered: ShopObject[] = [];
  for (const id of d.order ?? []) {
    const o = byId.get(id);
    if (o) {
      ordered.push(o);
      byId.delete(id);
    }
  }
  return { introText: d.intro, objects: [...ordered, ...byId.values()] };
}

export async function getObject(slug: string): Promise<ShopObject | null> {
  const o = await (await sanity()).fetch(`*[_type=="shopObject" && active != false && slug.current==$slug][0] ${OBJ}`, { slug });
  return o ? toObject(o) : null;
}

export async function getObjectSlugs(): Promise<string[]> {
  return clean<string>(await (await sanity()).fetch(`*[_type=="shopObject" && active != false && defined(slug.current)].slug.current`));
}
