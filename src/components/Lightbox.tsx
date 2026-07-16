"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export type LightboxImage = { src: string; alt?: string };

export default function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: LightboxImage[];
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  const total = images.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange(((index as number) + 1) % total);
      if (e.key === "ArrowLeft") onIndexChange(((index as number) - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, total, onClose, onIndexChange]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 bg-brown/95 flex items-center justify-center"
          onClick={onClose}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-6 right-6 text-beige text-xs font-display tracking-label uppercase hover:underline underline-offset-4 decoration-1"
          >
            close
          </button>

          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + total) % total);
            }}
            className="absolute left-4 md:left-8 text-beige text-2xl px-3 py-2 hover:opacity-60 transition-opacity"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % total);
            }}
            className="absolute right-4 md:right-8 text-beige text-2xl px-3 py-2 hover:opacity-60 transition-opacity"
          >
            ›
          </button>

          <div
            className="relative w-[85vw] h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[index].src}
                  alt={images[index].alt ?? ""}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="absolute bottom-6 right-6 text-beige text-xs font-body">
            {index + 1} / {total}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
