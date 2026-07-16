"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Wordmark from "./Wordmark";
import Tagline from "./Tagline";

const img = (name: string) => `/images/${name}`;

const slides = [
  img("image-1.jpg"),
  img("image-2.jpg"),
  img("image-3.jpg"),
  img("image-4.jpg"),
  img("image-5.jpg"),
  img("image-6.jpg"),
];

const AUTO_ADVANCE_MS = 5000;

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const advance = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    const t = setInterval(advance, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <button
        onClick={advance}
        aria-label="Next image"
        className="absolute inset-0 z-0 cursor-pointer"
      >
        {/* True crossfade: every slide is stacked and animated
            independently (no "wait" mode), so the outgoing image is still
            fading out while the incoming one fades in — the beige page
            background never shows through. */}
        {slides.map((src, i) => (
          <motion.div
            key={src}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image src={src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
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
          <Tagline className="text-[#fbf8f2] [&_a]:text-[#fbf8f2]" />
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 pointer-events-none max-w-sm text-right">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] leading-[1.4] text-[#fbf8f2]"
          >
            {index + 1} / {total}{" ".repeat(8)}SON RULLAN, Mallorca Spain. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
