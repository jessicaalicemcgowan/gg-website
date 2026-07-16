"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-triggered reveal: fades in and eases up into place as an element
 * enters the viewport, and reverses (fades/settles back down) as it leaves
 * — `viewport={{ once: false }}` re-triggers every time, in both
 * directions, rather than only playing once.
 */
export default function Reveal({
  children,
  className,
  id,
  delay = 0,
  y = 12,
  amount = 0.15,
  duration = 1.8,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  y?: number;
  amount?: number;
  duration?: number;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount }}
      transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}
