import { draftMode } from "next/headers";

/** Small bar shown only while draft preview is on. */
export default async function PreviewBanner() {
  if (!(await draftMode()).isEnabled) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-[#352523] text-white text-[11px] tracking-[1.8px] uppercase px-4 py-2 rounded-full shadow-lg">
      <span>Preview — drafts included</span>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/api/preview/exit" className="underline underline-offset-4">
        exit
      </a>
    </div>
  );
}
