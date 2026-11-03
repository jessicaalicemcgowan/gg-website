"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import clsx from "clsx";

/**
 * Right-hand slide-out drawer, styled after cabinberlin.com's exhibition
 * panels (cabinberlin.com/exhibition/transmissons): slides in from the
 * right edge of the viewport. No dimming overlay on the rest of the page —
 * clicking outside the panel still closes it, it's just not visually
 * darkened. `layer` lets a second panel (the "info" sub-panel) stack on
 * top of the first with a slight inset.
 *
 * Both layers sit BEHIND the sticky Header (z-20/z-25 vs Header's z-30) so
 * the nav stays visible/interactive over the top of either panel as it
 * slides in — see Header.tsx's beige color-swap via NavThemeProvider for
 * how it stays legible against layer 0's brown background.
 *
 * layer 1's backdrop (z-22) sits ABOVE layer 0's panel (z-20) so that while
 * the info panel is open, clicking anywhere on the main gallery panel
 * behind it — not just the empty page margin — closes the info panel, same
 * as clicking any other "outside" area.
 *
 * On small breakpoints the panel width jumps to `w-full`, leaving no
 * visible "outside" area to click to close — so below `sm` a small fixed
 * "close" button appears in the top-right corner, under the sticky Header.
 */
export default function SlideOutPanel({
  open,
  onClose,
  layer = 0,
  children,
}: {
  open: boolean;
  onClose: () => void;
  layer?: 0 | 1;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className={clsx("fixed inset-0 bg-black/25", layer === 0 ? "z-10" : "z-[22]")}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={clsx(
              "fixed top-0 bottom-0 overflow-y-auto no-scrollbar",
              layer === 0
                ? "right-0 w-full sm:w-[86%] md:w-3/4 bg-brown text-beige z-20"
                : "right-0 w-full sm:w-[86%] md:w-[74%] lg:w-[60%] bg-stone text-beige z-[25]"
            )}
          >
            {children}
            <button
              onClick={onClose}
              aria-label="Close"
              className={clsx(
                "sm:hidden absolute top-[120px] right-5 text-[10px] font-display tracking-label uppercase hover:underline underline-offset-4 decoration-1",
                layer === 0 ? "z-[21]" : "z-[26]"
              )}
            >
              close
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
