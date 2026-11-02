import type { ReactElement } from "react";
import Image from "next/image";
import type { Img } from "@/lib/content";

const captionClass = "font-body text-[11px] leading-[1.4] opacity-90 mt-2 max-w-[400px]";

type Slot = { aspect: string; width: string; mobileWidth?: string; className?: string };

// The fixed editorial layout (Figma node 65:899): 13 image slots arranged as
// pair · single · pair · single · pair · single · single · pair · single.
// It repeats if a project has more than 13 images; fewer images just stop early.
const SLOTS: Slot[] = [
  { aspect: "aspect-[506/633]", width: "sm:w-[506px]" },
  { aspect: "aspect-[404/323]", width: "sm:w-[404px]" },
  { aspect: "aspect-[400/325]", width: "sm:w-[400px]", mobileWidth: "w-[70%] mr-auto", className: "sm:mx-auto" },
  { aspect: "aspect-[404/323]", width: "sm:w-[404px]" },
  { aspect: "aspect-[506/633]", width: "sm:w-[506px]" },
  { aspect: "aspect-[400/325]", width: "sm:w-[400px]", mobileWidth: "w-[70%] ml-auto", className: "sm:mx-auto" },
  { aspect: "aspect-[404/505]", width: "sm:w-[404px]" },
  { aspect: "aspect-[404/505]", width: "sm:w-[404px]" },
  { aspect: "aspect-[615/411]", width: "sm:w-[615px]", mobileWidth: "w-[70%] mr-auto", className: "sm:mx-auto" },
  { aspect: "aspect-[400/500]", width: "sm:w-[400px]", mobileWidth: "w-full", className: "sm:mx-auto" },
  { aspect: "aspect-[404/323]", width: "sm:w-[404px]", mobileWidth: "w-[70%] ml-auto" },
  { aspect: "aspect-[506/633]", width: "sm:w-[506px]" },
  { aspect: "aspect-[615/500]", width: "sm:w-[615px]", mobileWidth: "w-[70%] mr-auto", className: "sm:mx-auto" },
];
const PAIR_STARTS = new Set([0, 3, 6, 10]);

function Figure({ image, slot, alt }: { image: Img; slot: Slot; alt: string }) {
  return (
    <figure className={`${slot.mobileWidth ?? "w-full"} ${slot.width} ${slot.className ?? ""}`}>
      <div className={`relative w-full ${slot.aspect}`}>
        <Image src={image.url} alt={alt} fill sizes="600px" className="object-cover" />
      </div>
      {image.caption && <figcaption className={captionClass}>{image.caption}</figcaption>}
    </figure>
  );
}

export default function CaseStudyGallery({ images, projectName }: { images: Img[]; projectName: string }) {
  const blocks: ReactElement[] = [];
  let i = 0;
  while (i < images.length) {
    const s = i % SLOTS.length;
    if (PAIR_STARTS.has(s) && i + 1 < images.length) {
      blocks.push(
        <div key={i} className="flex flex-col sm:flex-row gap-[100px] sm:gap-[60px] sm:items-start sm:justify-center">
          <Figure image={images[i]} slot={SLOTS[s]} alt={projectName} />
          <Figure image={images[i + 1]} slot={SLOTS[s + 1]} alt={projectName} />
        </div>
      );
      i += 2;
    } else {
      blocks.push(<Figure key={i} image={images[i]} slot={SLOTS[s]} alt={projectName} />);
      i += 1;
    }
  }
  return <div className="flex flex-col gap-[100px]">{blocks}</div>;
}
