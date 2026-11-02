import Image from "next/image";
import Link from "next/link";
import type { ShopObject } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function ObjectsGrid({ objects }: { objects: ShopObject[] }) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-[60px] pb-24 flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-[110px] md:gap-y-[90px]">
      {objects.map((o) => {
        const [first, second] = o.images;
        return (
          <Reveal key={o.slug} className="w-[calc(50%-12px)] md:w-[280px]">
            <Link href={`/objects/${o.slug}`} className="group flex flex-col gap-2">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-beige-dark">
                {first && (
                  <Image src={first.url} alt={o.name} fill sizes="280px" className="object-cover" />
                )}
                {second && (
                  <Image
                    src={second.url}
                    alt=""
                    fill
                    sizes="280px"
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}
              </div>
              <p className="font-display text-xs tracking-[2.4px] uppercase text-[#352523]">{o.priceLabel}</p>
            </Link>
          </Reveal>
        );
      })}
    </section>
  );
}
