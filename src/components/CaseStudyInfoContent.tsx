import type { CaseStudy } from "@/data/caseStudies";

/**
 * Text-only "info" sub-panel — a 1:1 rebuild of Figma node 65:1093/1096/1097:
 * stone-gray background (#96938a, matches --color-stone), no close button,
 * and the location heading + body paragraph sit in a single horizontal row
 * on larger screens (items-baseline, not stacked), same as Figma. Stacks
 * vertically below sm since the fixed 160px label column left the paragraph
 * too cramped on narrow viewports. Top/side padding matches
 * CaseStudyContent's pt-[200px]/px so the text lines up with the "info"
 * label in the main gallery panel it layers on top of.
 */
export default function CaseStudyInfoContent({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  return (
    <div className="bg-stone text-beige min-h-full px-6 md:px-10 pt-[208px] pb-[180px]">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-6 sm:gap-[10px]">
        <p className="font-display tracking-label uppercase text-xs shrink-0 sm:w-[160px]">{caseStudy.infoLocation}</p>
        <p className="font-body text-sm md:text-base leading-[1.4] opacity-90">{caseStudy.infoText}</p>
      </div>
    </div>
  );
}
