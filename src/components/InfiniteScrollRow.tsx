"use client";

import { useRef } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/data/caseStudies";

/**
 * User-controlled, infinitely-looping horizontal gallery. The image list is
 * tripled; the strip starts scrolled to the middle copy, and whenever the
 * user drags/scrolls past either edge of that middle copy we silently jump
 * by one set-width (scrollWidth / 3) so it feels endless in both directions.
 */
export default function InfiniteScrollRow({ images }: { images: GalleryImage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

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
        node.scrollLeft = node.scrollWidth / 3;
      });
    }
  };

  const triple = [...images, ...images, ...images];

  return (
    <div
      ref={initRef}
      onScroll={handleScroll}
      className="flex gap-3 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
    >
      {triple.map((img, i) => (
        <div key={i} className="relative flex-none w-[220px] md:w-[300px] aspect-[3/4]">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="300px"
            className="object-cover"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
