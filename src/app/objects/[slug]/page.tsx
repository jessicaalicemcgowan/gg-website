import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";
import { objects, getObject } from "@/data/objects";

export function generateStaticParams() {
  return objects.map((o) => ({ slug: o.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getObject(slug);
  if (!product) notFound();

  const carouselImages = product.images.map((src, i) => ({
    src,
    alt: `${product.title} ${i + 1}`,
    caption: product.description.replace(/^1 \/ 8/, `${i + 1} \/ 8`),
  }));

  return (
    <main className="min-h-screen bg-beige pt-24">
      <Header variant="page" />
      <div className="max-w-[1162px] mx-auto px-6 md:px-[100px] pt-[100px] pb-10">
        <Link href="/objects" className="text-xs font-display tracking-[2.4px] uppercase hover:underline underline-offset-4 decoration-1 w-fit">
          ‹ back
        </Link>
      </div>
      <div className="max-w-[1162px] mx-auto px-6 md:px-[100px] pb-24 flex flex-col md:flex-row gap-8 md:gap-[60px] justify-center">
        <Reveal className="w-full md:w-auto">
          <Carousel images={carouselImages} className="w-full md:w-[573px]" />
        </Reveal>
        <Reveal className="flex flex-col items-center text-center gap-[30px] pt-2 w-full md:w-[577px]" delay={0.1}>
          <h1 className="font-display tracking-[0.72px] text-2xl">{product.title}</h1>
          <p className="font-display text-xs tracking-[2.4px] uppercase">{product.price}</p>
          <p className="font-body text-sm leading-[1.4] text-left w-full max-w-[446px]">{product.bodyText}</p>
          <div className="font-display text-xs tracking-[0.36px] leading-[1.3]">
            <p>Materials: {product.materials}</p>
            <p>Measurements: {product.measurements}</p>
          </div>
          <button className="font-display tracking-[2.4px] uppercase text-xs border-b-[0.6px] border-brown pb-1 hover:opacity-70 transition-opacity">
            inquire ›
          </button>
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}
