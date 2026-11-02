"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Wordmark from "./Wordmark";
import Tagline from "./Tagline";
import type { TaglineBlock } from "@/lib/content";

const AUTO_ADVANCE_MS = 5000;

export type HeroSlide = { desktop: string; mobile?: string; caption?: string };

export default function HomeHero({ slides, tagline }: { slides: HeroSlide[]; tagline?: TaglineBlock[] }) {
  const [index, setIndex] = useState(0);
  const total = Math.max(slides.length, 1);
  const advance = () => setIndex((i) => (i + 1) % total);
  const multiple = slides.length > 1;

  useEffect(() => {
    if (!multiple) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % total), AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [multiple, total]);

  return (
    <div className="relative w-full h-screen">
      <button
        onClick={advance}
        disabled={!multiple}
        aria-label="Next image"
        className="absolute inset-0 z-0 cursor-pointer"
      >
        {/* True crossfade: every slide is stacked and animated
            independently (no "wait" mode), so the outgoing image is still
            fading out while the incoming one fades in — the beige page
            background never shows through. */}
        {slides.map((slide, i) => (
          <motion.div
            key={slide.desktop + i}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <picture>
              {slide.mobile && <source media="(max-width: 767px)" srcSet={`${slide.mobile}?w=1000&q=80&auto=format`} />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${slide.desktop}?w=2400&q=80&auto=format`}
                alt=""
                fetchPriority={i === 0 ? "high" : "auto"}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </picture>
          </motion.div>
        ))}
      </button>

      {/* Wordmark + tagline sit together at the top, per Figma (node
          65:113/65:114) — not spread top/bottom. */}
      <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center gap-4 p-6 md:p-10 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <Wordmark className="text-[#fbf8f2]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto max-w-md"
        >
          <Tagline blocks={tagline} className="text-[#fbf8f2] [&_a]:text-[#fbf8f2]" />
        </motion.div>
      </div>

      {slides.length > 0 && (
        <div className="absolute bottom-6 right-6 z-10 pointer-events-none max-w-[480px] text-right">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] leading-[1.4] text-[#fbf8f2]"
            >
              {index + 1} / {total}
              <span className="inline-block w-6" aria-hidden />
              {slides[index].caption}
            </motion.p>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
