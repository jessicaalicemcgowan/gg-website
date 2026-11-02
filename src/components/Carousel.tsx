"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export type CarouselImage = { src: string; alt: string; caption?: string };

/**
 * Click-to-advance carousel. All images are stacked and cross-faded, so the
 * outgoing image fades out while the next fades in (no blank gap in
 * between). Images are loaded up front so nothing pops in mid-fade.
 */
export default function Carousel({
  images,
  className,
}: {
  images: CarouselImage[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index];
  if (!current) return null;

  const advance = () => setIndex((i) => (i + 1) % total);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={advance}
        className="relative block w-full aspect-[573/715] overflow-hidden cursor-pointer"
        aria-label="Show next image"
        disabled={total <= 1}
      >
        {images.map((img, i) => (
          <motion.div
            key={img.src + i}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 573px, 100vw" priority={i < 2} className="object-cover" />
          </motion.div>
        ))}
      </button>
      {current.caption && (
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-xs font-body leading-[1.4] opacity-80"
          >
            {current.caption}
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
}
