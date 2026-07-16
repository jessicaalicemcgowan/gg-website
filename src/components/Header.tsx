"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Wordmark from "./Wordmark";
import { useNavTheme } from "@/lib/navTheme";

/**
 * Sticky reduced nav ("Geoffrey Grunfeld" over "Spaces | Objects"), used on
 * every page. On the homepage the wordmark/tagline are instead rendered as
 * an overlay on the hero image itself (see HomeHero) as part of the loading
 * sequence, so this component only fades the reduced nav in once the hero
 * has been scrolled past.
 *
 * Turns beige (via NavThemeProvider) when the Son Rullan gallery slide-out
 * is open behind it, since that panel is brown and would otherwise make
 * the nav's default brown text disappear.
 *
 * There's no standalone /spaces route — Spaces content lives on the
 * homepage (jump to it via "#spaces"). So "Spaces" reads as the
 * current-page indicator (underlined, non-clickable) whenever this reduced
 * nav is showing on the homepage, same treatment "Objects" gets on
 * /objects — since in both cases you're already on that section.
 */
export default function Header({ variant }: { variant: "home" | "page" }) {
  const [showReduced, setShowReduced] = useState(variant === "page");
  const { beige } = useNavTheme();
  const pathname = usePathname();
  const onSpaces = pathname === "/";
  const onObjects = pathname === "/objects" || pathname.startsWith("/objects/");
  const currentPageClass = "underline underline-offset-4 [text-decoration-thickness:0.5px]";
  const linkClass = "hover:underline underline-offset-4 decoration-1";

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    if (variant !== "home") return;
    setShowReduced(y > (typeof window !== "undefined" ? window.innerHeight * 0.7 : 500));
  });

  return (
    <AnimatePresence>
      {showReduced && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={clsx(
            "fixed top-0 left-0 right-0 z-30 transition-colors duration-300",
            beige ? "text-beige" : "text-brown"
          )}
        >
          <div className="flex flex-col items-center gap-2 py-4 px-6 text-[13px]">
            <Wordmark className="text-inherit" />
            <nav className="flex items-center gap-3 font-display tracking-label uppercase">
              {onSpaces ? (
                <span className={currentPageClass} aria-current="page">
                  Spaces
                </span>
              ) : (
                <Link href="/#spaces" className={linkClass}>
                  Spaces
                </Link>
              )}
              <span>|</span>
              {onObjects ? (
                <span className={currentPageClass} aria-current="page">
                  Objects
                </span>
              ) : (
                <Link href="/objects" className={linkClass}>
                  Objects
                </Link>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
