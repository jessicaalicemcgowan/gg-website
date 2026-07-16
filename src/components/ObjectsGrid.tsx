import Image from "next/image";
import Link from "next/link";
import { objects } from "@/data/objects";
import Reveal from "@/components/Reveal";

export default function ObjectsGrid() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-[60px] pb-24 flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-[110px] md:gap-y-[90px]">
      {objects.map((o) => (
        <Reveal key={o.slug} className="w-[calc(50%-12px)] md:w-[280px]">
          <Link href={`/objects/${o.slug}`} className="flex flex-col gap-2">
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-beige-dark">
              <Image
                src={o.image}
                alt={o.title}
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
            <p className="font-display text-xs tracking-[2.4px] uppercase text-[#352523]">{o.price}</p>
          </Link>
        </Reveal>
      ))}
    </section>
  );
}
