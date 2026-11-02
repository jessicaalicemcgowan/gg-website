"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import clsx from "clsx";
import Lightbox from "./Lightbox";

export type StripImage = { src: string; w: number; h: number; alt?: string };

// <1 slows the strip's horizontal pan feel under trackpad/shift-wheel input.
const SCROLL_DAMPING = 0.35;

/**
 * The full-width overflow galleries inside the Son Rullan narrative (Figma
 * nodes 65:136 and 65:213). Infinitely-looping, user-controlled horizontal
 * scroll (triples the list, silently rewraps at the edges) with faded
 * edges, matching the brief's "infinite scroll" requirement.
 *
 * By default, clicking an image opens a full-screen lightbox. Pass
 * `onImageClick` to override that (e.g. the Son Rullan "origins" strip
 * opens the right-side case-study slide-out instead — see
 * SonRullanNarrative.tsx / node 65:775).
 *
 * `stackOnMobile` swaps the horizontal drag-strip for a plain stacked,
 * non-interactive column below the `sm` breakpoint (the desktop strip is
 * unaffected) — used for the purely decorative "exclusion" strip, which
 * doesn't need horizontal scrolling or a lightbox on narrow screens.
 *
 * `scaleOnMobile` (0-1) uniformly shrinks every image's own width below the
 * `sm` breakpoint instead of clamping each one to a flat `40vw` cap. A flat
 * cap makes images of different desktop widths (e.g. 200px vs 300px) render
 * at the *same* mobile width, flattening the desktop rhythm — a uniform
 * scale keeps each image's width proportional to the others, just smaller.
 *
 * `clickable` (default true) — set false to render plain, non-interactive
 * images (no button, no lightbox) at every breakpoint while keeping the
 * horizontal drag-strip layout — used for the purely decorative "exclusion"
 * strip.
 */
export default function GalleryStrip({
  images,
  exclusion = false,
  gap = 10,
  objectPosition = "center",
  onImageClick,
  stackOnMobile = false,
  scaleOnMobile,
  clickable = true,
  startInset,
}: {
  images: StripImage[];
  exclusion?: boolean;
  gap?: number;
  objectPosition?: "center" | "top";
  onImageClick?: (index: number) => void;
  stackOnMobile?: boolean;
  scaleOnMobile?: number;
  clickable?: boolean;
  /** Where the first image sits on load, in px from the left edge (desktop). Mobile uses 24px. Omit to start flush left. */
  startInset?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const setWidth = track.scrollWidth / 3;
    if (track.scrollLeft <= setWidth * 0.05) {
      track.scrollLeft += setWidth;
    } else if (track.scrollLeft >= setWidth * 1.95) {
      track.scrollLeft -= setWidth;
    }
  };

  const initRef = (node: HTMLDivElement | null) => {
    trackRef.current = node;
    if (node && node.dataset.init !== "1") {
      node.dataset.init = "1";
      requestAnimationFrame(() => {
        // Start on the second copy of the list so it can loop both ways. If an
        // inset is set, line the first image up with the page's content edge.
        const first = node.children[images.length] as HTMLElement | undefined;
        if (first && startInset != null) {
          const inset = window.innerWidth >= 768 ? startInset : 24;
          node.scrollLeft = first.getBoundingClientRect().left - node.getBoundingClientRect().left + node.scrollLeft - inset;
        } else {
          node.scrollLeft = node.scrollWidth / 3;
        }
      });
    }
  };

  // Trackpad/shift-wheel horizontal panning otherwise scrolls at native
  // speed, which feels too fast for this strip — damp genuinely
  // horizontal wheel gestures. Vertical wheel scrolling (normal page
  // scroll) is left untouched. Requires a native, non-passive listener
  // since React's onWheel is passive by default and can't preventDefault.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        track.scrollLeft += e.deltaX * SCROLL_DAMPING;
      }
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  const triple = [...images, ...images, ...images];

  return (
    <div className={clsx("relative w-full overflow-hidden", stackOnMobile ? "py-6 sm:py-10" : "py-10")}>
      {/* Mobile-only stacked, non-interactive column (item 4/5: not clickable, stacked). */}
      {stackOnMobile && (
        <div className="flex sm:hidden flex-col" style={{ gap }}>
          {images.map((img, i) => (
            <div key={i} className="relative w-full" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
              <Image
                src={img.src}
                alt={img.alt ?? ""}
                fill
                sizes="100vw"
                className={clsx("object-cover", objectPosition === "top" && "object-top")}
                draggable={false}
              />
              {exclusion && <div className="absolute inset-0 bg-brown mix-blend-exclusion pointer-events-none" />}
            </div>
          ))}
        </div>
      )}

      <div className={stackOnMobile ? "hidden sm:block relative" : "relative"}>
        <div
          ref={initRef}
          onScroll={handleScroll}
          className={clsx(
            "flex items-start overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none",
            scaleOnMobile != null && "[--gs-scale:var(--gs-scale-mobile)] sm:[--gs-scale:1]"
          )}
          style={
            scaleOnMobile != null
              ? ({ gap, "--gs-scale-mobile": scaleOnMobile } as CSSProperties)
              : { gap }
          }
        >
          {triple.map((img, i) => {
            const itemStyle =
              scaleOnMobile != null
                ? { width: `calc(${img.w}px * var(--gs-scale, 1))`, aspectRatio: `${img.w} / ${img.h}` }
                : { width: img.w, maxWidth: "40vw", aspectRatio: `${img.w} / ${img.h}` };
            const itemContent = (
              <>
                <Image
                  src={img.src}
                  alt={img.alt ?? ""}
                  fill
                  sizes="300px"
                  className={clsx("object-cover", objectPosition === "top" && "object-top")}
                  draggable={false}
                />
                {exclusion && <div className="absolute inset-0 bg-brown mix-blend-exclusion pointer-events-none" />}
              </>
            );
            if (!clickable) {
              return (
                <div key={i} className="relative flex-none" style={itemStyle}>
                  {itemContent}
                </div>
              );
            }
            return (
              <button
                key={i}
                onClick={() => {
                  const realIndex = i % images.length;
                  if (onImageClick) onImageClick(realIndex);
                  else setLightboxIndex(realIndex);
                }}
                className="relative flex-none"
                style={itemStyle}
                aria-label="Open image"
              >
                {itemContent}
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#fbf9f6] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#fbf9f6] to-transparent" />
      </div>

      {clickable && !onImageClick && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
