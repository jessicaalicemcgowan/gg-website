"use client";

import type { Project } from "@/lib/content";
import CaseStudyGallery from "./CaseStudyGallery";

/**
 * Full case-study content — used both inside the Spaces slide-out panel and
 * (via app/spaces/[slug]/page.tsx) as a standalone, linkable page. Always
 * dark/brown themed (matches the Figma gallery frame background), so it's
 * self-contained regardless of what wraps it.
 */
export default function CaseStudyContent({
  project,
  onOpenInfo,
}: {
  project: Project;
  onOpenInfo?: () => void;
}) {
  return (
    <div className="bg-brown text-beige min-h-full px-6 md:px-10 pt-[200px] pb-[180px] flex flex-col gap-14">
      <div className="flex items-baseline gap-20">
        <p className="font-display text-2xl">{project.name}</p>
        {onOpenInfo && (project.location || project.blurb) && (
          <button
            onClick={onOpenInfo}
            className="text-xs font-display tracking-label uppercase hover:underline underline-offset-4 decoration-1"
          >
            info
          </button>
        )}
      </div>

      <CaseStudyGallery images={project.images} projectName={project.name} />
    </div>
  );
}
