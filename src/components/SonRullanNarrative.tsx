"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import GalleryStrip from "./GalleryStrip";
import SlideOutPanel from "./SlideOutPanel";
import CaseStudyContent from "./CaseStudyContent";
import CaseStudyInfoContent from "./CaseStudyInfoContent";
import Reveal from "./Reveal";
import type { Homepage, Img, Project } from "@/lib/content";
import { useNavTheme } from "@/lib/navTheme";

const label = "font-display tracking-label uppercase text-xs shrink-0";
const body = "font-body text-[1.35rem] md:text-2xl leading-[1.4] whitespace-pre-line";
const caption = "font-body text-[11px] leading-[1.4] opacity-90 max-w-[400px]";

// Heights cycle so the horizontal strips keep an uneven, editorial rhythm.
const STRIP_HEIGHTS = [250, 300, 208, 250, 300, 195, 208, 250, 200, 300, 195];
const toStrip = (images: Img[], heights = STRIP_HEIGHTS) =>
  images.map((im, i) => {
    const h = heights[i % heights.length];
    return { src: im.url, w: Math.round((h * im.w) / im.h), h };
  });

type Item = Homepage["grid"][number];

function Fig({
  item,
  width,
  captionFirst,
  onOpen,
  delay,
  num,
  total,
}: {
  num: number;
  total: number;
  item: Item;
  width: string;
  captionFirst?: boolean;
  onOpen: () => void;
  delay?: number;
}) {
  const cap = (
    <figcaption className={caption + (captionFirst ? " order-2 md:order-1" : "")}>
      {num} / {total}
      <span className="inline-block w-6" aria-hidden />
      {item.caption}
    </figcaption>
  );
  return (
    <Reveal className={`flex flex-col gap-2 w-full ${width}`} delay={delay}>
      <figure className="flex flex-col gap-2 w-full">
        {captionFirst && cap}
        <button
          onClick={onOpen}
          className={"relative block w-full" + (captionFirst ? " order-1 md:order-2" : "")}
          style={{ aspectRatio: `${item.image.w} / ${item.image.h}` }}
        >
          <Image src={item.image.url} alt={item.caption ?? ""} fill sizes="700px" className="object-cover" />
        </button>
        {!captionFirst && cap}
      </figure>
    </Reveal>
  );
}

/**
 * The homepage / Spaces narrative, driven by the "Homepage / Spaces" document
 * in Sanity. The layout is fixed; the content (text, images, projects, order)
 * is edited in the CMS.
 */
export default function SonRullanNarrative({ data, footer }: { data: Homepage; footer: ReactNode }) {
  const [slideOutOpen, setSlideOutOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [active, setActive] = useState<Project | null>(null);
  const { setBeige } = useNavTheme();

  const openSlideOut = (projectId?: string) => {
    const p = projectId ? data.projects[projectId] : undefined;
    if (!p) return;
    setActive(p);
    setSlideOutOpen(true);
    setInfoOpen(false);
    setBeige(true);
  };
  const closeSlideOut = () => {
    setSlideOutOpen(false);
    setInfoOpen(false);
    setBeige(false);
  };

  const featured = data.featuredProject ? data.projects[data.featuredProject] : undefined;
  const rowImages = data.featuredImages.length ? data.featuredImages : (featured?.images ?? []);
  const grid = data.grid;

  // Collage layout cycles: wide · pair (portrait + landscape) · wide · narrow portrait
  const blocks: ReactNode[] = [];
  for (let i = 0, step = 0; i < grid.length; step++) {
    const kind = step % 4;
    const open = (it: Item) => () => openSlideOut(it.projectId);
    if (kind === 1 && i + 1 < grid.length) {
      const [a, b] = [grid[i], grid[i + 1]];
      blocks.push(
        <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-[100px] justify-center w-full">
          <Fig item={a} num={i + 1} total={grid.length} width="md:w-[506px]" captionFirst onOpen={open(a)} />
          <Fig item={b} num={i + 2} total={grid.length} width="md:w-[404px]" delay={0.1} onOpen={open(b)} />
        </div>
      );
      i += 2;
    } else {
      const it = grid[i];
      blocks.push(
        <Fig
          key={i}
          item={it}
          num={i + 1}
          total={grid.length}
          width={kind === 3 ? "max-w-[455px]" : "max-w-[692px]"}
          captionFirst={kind === 3}
          onOpen={open(it)}
        />
      );
      i += 1;
    }
  }

  return (
    <div className="bg-beige text-[#352523]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] pb-10 pt-16 md:pt-24 flex flex-col items-center gap-16">
        {data.introImage && (
          <Reveal id="spaces" className="flex flex-col gap-3 w-full max-w-[458px] scroll-mt-28 md:scroll-mt-24">
            <button
              onClick={() => openSlideOut(data.introProject)}
              className="relative block w-full"
              style={{ aspectRatio: `${data.introImage.w} / ${data.introImage.h}` }}
            >
              <Image src={data.introImage.url} alt={data.introCaption ?? ""} fill sizes="500px" className="object-cover" />
            </button>
            {data.introCaption && <p className={caption}>{data.introCaption}</p>}
          </Reveal>
        )}
        {data.originsText && (
          <Reveal className="flex flex-col md:flex-row gap-6 md:gap-[80px] items-baseline w-full">
            <p className={label}>origins</p>
            <p className={body}>{data.originsText}</p>
          </Reveal>
        )}
      </div>

      {rowImages.length > 0 && (
        <GalleryStrip
          objectPosition="top"
          onImageClick={() => openSlideOut(featured?.id)}
          scaleOnMobile={0.65}
          images={toStrip(rowImages)}
        />
      )}

      {featured && data.featuredText && (
        <div className="max-w-[1440px] mx-auto px-6 md:px-[138px] pt-10 flex justify-end">
          <Reveal className="flex flex-col md:flex-row gap-6 md:gap-[80px] items-baseline w-full max-w-[577px]">
            <p className={label}>{featured.name}</p>
            <p className="font-body text-base leading-[1.4] whitespace-pre-line">{data.featuredText}</p>
          </Reveal>
        </div>
      )}

      {data.paragraph && (
        <div className="max-w-[900px] mx-auto px-6 pt-16 md:pt-24 text-left">
          <Reveal>
            <p className={body}>{data.paragraph}</p>
          </Reveal>
        </div>
      )}

      {blocks.length > 0 && (
        <div className="max-w-[1440px] mx-auto px-6 md:px-5 py-16 md:py-20 flex flex-col items-center gap-16 md:gap-24">
          {blocks}
        </div>
      )}

      {data.approachText && (
        <div className="max-w-[1440px] mx-auto px-6 md:pl-[138px] md:pr-[255px] pt-16 md:pt-24 pb-10">
          <Reveal className="flex flex-col md:flex-row gap-6 md:gap-[80px] items-baseline w-full max-w-[800px]">
            <p className={label}>approach</p>
            <p className="font-body text-[1.35rem] md:text-2xl leading-[1.4] w-full md:w-[613px] whitespace-pre-line">
              {data.approachText}
            </p>
          </Reveal>
        </div>
      )}

      {data.approachImages.length > 0 && (
        <GalleryStrip exclusion gap={70} clickable={false} images={data.approachImages.map((im) => ({ src: im.url, w: 200, h: 250 }))} />
      )}

      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] pt-16 md:pt-24 pb-8 flex flex-col items-center gap-16">
        {data.featureImage && (
          <Reveal className="flex flex-col gap-3 w-full max-w-[458px]">
            <div className="relative w-full" style={{ aspectRatio: `${data.featureImage.w} / ${data.featureImage.h}` }}>
              <Image src={data.featureImage.url} alt={data.featureImage.caption ?? ""} fill sizes="500px" className="object-cover" />
            </div>
            {data.featureImage.caption && <p className={caption}>{data.featureImage.caption}</p>}
          </Reveal>
        )}
        {data.exhibitionText && (
          <Reveal className="flex flex-col md:flex-row gap-6 md:gap-[80px] items-baseline w-full">
            <p className={label}>exhibition</p>
            <p className={body}>{data.exhibitionText}</p>
          </Reveal>
        )}
      </div>

      <Reveal className="flex flex-col items-center py-16 md:py-24">
        <Link href="/objects" className="flex items-baseline gap-4 font-display tracking-label uppercase">
          <span className="text-xs">next</span>
          <span className="text-2xl flex items-center gap-2">
            OBJECTS <span aria-hidden>›</span>
          </span>
        </Link>
      </Reveal>

      {footer}

      <SlideOutPanel open={slideOutOpen} onClose={closeSlideOut} layer={0}>
        {active && <CaseStudyContent project={active} onOpenInfo={() => setInfoOpen(true)} />}
      </SlideOutPanel>
      <SlideOutPanel open={infoOpen} onClose={() => setInfoOpen(false)} layer={1}>
        {active && <CaseStudyInfoContent project={active} />}
      </SlideOutPanel>
    </div>
  );
}
