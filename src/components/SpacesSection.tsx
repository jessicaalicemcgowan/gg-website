"use client";

import { useState } from "react";
import Image from "next/image";
import { caseStudies } from "@/data/caseStudies";
import SlideOutPanel from "./SlideOutPanel";
import CaseStudyContent from "./CaseStudyContent";
import CaseStudyInfoContent from "./CaseStudyInfoContent";

/**
 * The Spaces grid: a featured strip of Son Rullan images (image 3 in the
 * brief — every image in the strip opens the same Son Rullan slide-out),
 * followed by the remaining case-study cards (image 6 in the brief — each
 * its own card, reusing the Son Rullan template/copy as placeholder).
 */
export default function SpacesSection() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const [featured, ...rest] = caseStudies;
  const active = caseStudies.find((c) => c.slug === activeSlug) ?? null;

  const open = (slug: string) => {
    setActiveSlug(slug);
    setInfoOpen(false);
  };
  const close = () => {
    setActiveSlug(null);
    setInfoOpen(false);
  };

  return (
    <section className="px-4 md:px-6 pb-24">
      {/* Featured strip — Son Rullan */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6">
        {featured.gallery.slice(0, 6).map((img, i) => (
          <button
            key={i}
            onClick={() => open(featured.slug)}
            className="relative flex-none w-[46vw] md:w-[16vw] aspect-[3/4] overflow-hidden"
          >
            <Image src={img.src} alt={img.alt} fill sizes="20vw" className="object-cover hover:scale-[1.03] transition-transform duration-700" />
          </button>
        ))}
      </div>

      {/* Remaining case studies */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {rest.map((cs) => (
          <button key={cs.slug} onClick={() => open(cs.slug)} className="relative aspect-[4/5] overflow-hidden text-left">
            <Image src={cs.gridImage} alt={cs.title} fill sizes="33vw" className="object-cover hover:scale-[1.03] transition-transform duration-700" />
            <span className="absolute bottom-3 left-3 text-beige text-xs font-display tracking-label uppercase drop-shadow">
              {cs.title}
            </span>
          </button>
        ))}
      </div>

      <SlideOutPanel open={!!active} onClose={close} layer={0}>
        {active && (
          <CaseStudyContent
            caseStudy={active}
            onOpenInfo={() => setInfoOpen(true)}
          />
        )}
      </SlideOutPanel>

      <SlideOutPanel open={infoOpen} onClose={() => setInfoOpen(false)} layer={1}>
        {active && (
          <CaseStudyInfoContent caseStudy={active} />
        )}
      </SlideOutPanel>
    </section>
  );
}
