import Image from "next/image";

const img = (name: string) => `/images/${name}`;

const captionClass = "font-body text-[11px] leading-[1.4] opacity-90 mt-2 max-w-[400px]";

function Figure({
  src,
  alt,
  aspect,
  caption,
  captionText,
  width,
  mobileWidth = "w-full",
  className,
}: {
  src: string;
  alt: string;
  aspect: string;
  caption?: boolean;
  captionText: string;
  width: string;
  mobileWidth?: string;
  className?: string;
}) {
  return (
    <figure className={`${mobileWidth} ${width} ${className ?? ""}`}>
      <div className={`relative w-full ${aspect}`}>
        <Image src={src} alt={alt} fill sizes="600px" className="object-cover" />
      </div>
      {caption && <figcaption className={captionClass}>{captionText}</figcaption>}
    </figure>
  );
}

/**
 * Vertically-stacked editorial masonry gallery — a 1:1 rebuild of the Figma
 * slide-out gallery frame (node 65:899, block sequence at 65:903..65:932).
 * Image assignment and order confirmed directly against Figma's
 * get_design_context output: nine blocks (four two-up rows alternating with
 * five full-width singles), five of which carry the repeated caption per
 * Figma. Distinct source assets — SonRu_Fanette-Guilloud_001, image 70,
 * a third instance of _028, _017, _018 and image 71 — are each used exactly
 * once, matching Figma rather than reusing 044/045/028 as earlier drafts did.
 */
export default function CaseStudyGallery({ projectName = "Son Rullan" }: { projectName?: string }) {
  const captionText = `${projectName.toUpperCase()}, Mallorca Spain. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.`;

  return (
    <div className="flex flex-col gap-14 md:gap-[100px]">
      {/* Row 1 — _001 (no caption) + image 70 (caption) */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-[60px] sm:items-start sm:justify-center">
        <Figure
          src={img("6145c7caa128c0b12c242334cbd20b7703eb4ea9.png")}
          alt={projectName}
          aspect="aspect-[506/633]"
          captionText={captionText}
          width="sm:w-[506px]"
        />
        <Figure
          src={img("984d24e5a66a0cdd8167d8c17088c405d891ce78.png")}
          alt={`${projectName} detail`}
          aspect="aspect-[404/323]"
          caption
          captionText={captionText}
          width="sm:w-[404px]"
        />
      </div>

      {/* Single — _028 (third instance, no caption) */}
      <Figure
        src={img("7febb41bdcc72499039b3e62cb8053e7e5a81e2b.png")}
        alt={`${projectName} detail`}
        aspect="aspect-[400/325]"
        captionText={captionText}
        width="sm:w-[400px]"
        mobileWidth="w-[70%] mr-auto"
        className="sm:mx-auto"
      />

      {/* Row 2 — _045 (caption) + _044 (no caption) */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-[60px] sm:items-start sm:justify-center">
        <Figure
          src={img("7ed79b1e6413eecadde7785501891d8d81d5cea3.png")}
          alt={`${projectName} detail`}
          aspect="aspect-[404/323]"
          caption
          captionText={captionText}
          width="sm:w-[404px]"
        />
        <Figure
          src={img("a4daf582f74e6864739b2d6d90aed84f27e48dc1.png")}
          alt={projectName}
          aspect="aspect-[506/633]"
          captionText={captionText}
          width="sm:w-[506px]"
        />
      </div>

      {/* Single — _028 (second instance, caption) */}
      <Figure
        src={img("da3fcc0defefd94d06fe2fdf5b0680d8653945bd.png")}
        alt={`${projectName} detail`}
        aspect="aspect-[400/325]"
        caption
        captionText={captionText}
        width="sm:w-[400px]"
        mobileWidth="w-[70%] ml-auto"
        className="sm:mx-auto"
      />

      {/* Row 3 — _013 (no caption) + _042 (caption) */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-[60px] sm:items-start sm:justify-center">
        <Figure
          src={img("08653bb0a5685d9c303fbe6f28aa13c3dfcae0dd.png")}
          alt={`${projectName} detail`}
          aspect="aspect-[404/505]"
          captionText={captionText}
          width="sm:w-[404px]"
        />
        <Figure
          src={img("ffe222202da7afd63ed12494ff3d71695c77493a.png")}
          alt={`${projectName} detail`}
          aspect="aspect-[404/505]"
          caption
          captionText={captionText}
          width="sm:w-[404px]"
        />
      </div>

      {/* Single — image 69 (caption) */}
      <Figure
        src={img("25b1c02e29615a767f02c7c54bf990cb2b1bbcec.png")}
        alt={`${projectName} detail`}
        aspect="aspect-[615/411]"
        caption
        captionText={captionText}
        width="sm:w-[615px]"
        mobileWidth="w-full"
        className="sm:mx-auto"
      />

      {/* Single — _002 (no caption) */}
      <Figure
        src={img("dedfba55394bb0291a446bc221bbf7f4b267f843.png")}
        alt={`${projectName} detail`}
        aspect="aspect-[400/500]"
        captionText={captionText}
        width="sm:w-[400px]"
        mobileWidth="w-full"
        className="sm:mx-auto"
      />

      {/* Row 4 — _017 (caption) + _018 (no caption) */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-[60px] sm:items-start sm:justify-center">
        <Figure
          src={img("def6a06bb4f25c7baab81e4a7878947d54991f82.png")}
          alt={`${projectName} detail`}
          aspect="aspect-[404/323]"
          caption
          captionText={captionText}
          width="sm:w-[404px]"
        />
        <Figure
          src={img("f0c90a01f07ff01c5e6667c99d58545fa3af9d6b.png")}
          alt={projectName}
          aspect="aspect-[506/633]"
          captionText={captionText}
          width="sm:w-[506px]"
        />
      </div>

      {/* Single — image 71 (no caption) */}
      <Figure
        src={img("35c1a853e7c0800b5c029ff148a8903ef76a7868.png")}
        alt={`${projectName} detail`}
        aspect="aspect-[615/500]"
        captionText={captionText}
        width="sm:w-[615px]"
        mobileWidth="w-[70%] mr-auto"
        className="sm:mx-auto"
      />
    </div>
  );
}
