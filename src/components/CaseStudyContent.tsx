"use client";

import type { CaseStudy } from "@/data/caseStudies";
import CaseStudyGallery from "./CaseStudyGallery";

/**
 * Full case-study content — used both inside the Spaces slide-out panel and
 * (via app/spaces/[slug]/page.tsx) as a standalone, linkable page. Always
 * dark/brown themed (matches the Figma gallery frame background), so it's
 * self-contained regardless of what wraps it.
 */
export default function CaseStudyContent({
  caseStudy,
  onOpenInfo,
}: {
  caseStudy: CaseStudy;
  onOpenInfo?: () => void;
}) {
  return (
    <div className="bg-brown text-beige min-h-full px-6 md:px-10 pt-[200px] pb-[180px] flex flex-col gap-14">
      <div className="flex items-baseline gap-20">
        <p className="font-display text-2xl">{caseStudy.title}</p>
        {onOpenInfo && (
          <button
            onClick={onOpenInfo}
            className="text-xs font-display tracking-label uppercase hover:underline underline-offset-4 decoration-1"
          >
            info
          </button>
        )}
      </div>

      <CaseStudyGallery projectName={caseStudy.title} />
    </div>
  );
}
