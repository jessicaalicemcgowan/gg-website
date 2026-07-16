"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryImage } from "@/data/caseStudies";

/**
 * Click-to-advance carousel: clicking the image softly crossfades to the
 * next one in place, caption updates with it. Captions already carry their
 * own "N / 8 …" numbering as literal text from Figma, so this component
 * doesn't add a second counter on top of it.
 */
export default function Carousel({
  images,
  className,
}: {
  images: GalleryImage[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index];

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
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </button>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-3 text-xs font-body leading-[1.4] opacity-80"
        >
          {current.caption}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
