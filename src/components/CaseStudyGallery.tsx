import type { ReactElement } from "react";
import Image from "next/image";
import type { Img } from "@/lib/content";

const captionClass = "font-body text-[11px] leading-[1.4] opacity-90 mt-2 max-w-[400px]";

function Figure({
  image,
  alt,
  width,
  mobileWidth = "w-full",
  className,
}: {
  image: Img;
  alt: string;
  width: string;
  mobileWidth?: string;
  className?: string;
}) {
  return (
    <figure className={`${mobileWidth} ${width} ${className ?? ""}`}>
      <div className="relative w-full" style={{ aspectRatio: `${image.w} / ${image.h}` }}>
        <Image src={image.url} alt={alt} fill sizes="600px" className="object-cover" />
      </div>
      {image.caption && <figcaption className={captionClass}>{image.caption}</figcaption>}
    </figure>
  );
}

const portrait = (i: Img) => i.h >= i.w;

/**
 * Vertically-stacked editorial gallery for a project. Images come from the
 * CMS in order; the layout alternates two-up rows and single images
 * (pair, single, pair, single…), sizing each by its own orientation and
 * aspect ratio, so any number of images works.
 */
export default function CaseStudyGallery({ images, projectName }: { images: Img[]; projectName: string }) {
  const blocks: ReactElement[] = [];
  let i = 0;
  let n = 0;
  while (i < images.length) {
    const isPair = n % 2 === 0 && i + 1 < images.length;
    if (isPair) {
      const [a, b] = [images[i], images[i + 1]];
      const flip = Math.floor(n / 2) % 2 === 1;
      const row = flip ? [b, a] : [a, b];
      blocks.push(
        <div key={i} className="flex flex-col sm:flex-row gap-6 sm:gap-[60px] sm:items-start sm:justify-center">
          {row.map((im, k) => (
            <Figure
              key={k}
              image={im}
              alt={projectName}
              width={portrait(im) ? "sm:w-[404px]" : "sm:w-[460px]"}
            />
          ))}
        </div>
      );
      i += 2;
    } else {
      const im = images[i];
      const side = Math.floor(n / 2) % 2 === 0 ? "mr-auto" : "ml-auto";
      blocks.push(
        <Figure
          key={i}
          image={im}
          alt={projectName}
          width={portrait(im) ? "sm:w-[400px]" : "sm:w-[615px]"}
          mobileWidth={portrait(im) ? `w-[70%] ${side}` : "w-full"}
          className="sm:mx-auto"
        />
      );
      i += 1;
    }
    n += 1;
  }
  return <div className="flex flex-col gap-14 md:gap-[100px]">{blocks}</div>;
}
