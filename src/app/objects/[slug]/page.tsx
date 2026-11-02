import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";
import { getObject, getObjectSlugs, getSettings } from "@/lib/content";

// Always fetch fresh content from Sanity, so published edits show up straight away.
export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getObject(slug), getSettings()]);
  if (!product) notFound();

  const carouselImages = product.images.map((im, i) => ({
    src: im.url,
    alt: `${product.name} ${i + 1}`,
    caption: im.caption,
  }));

  // Pre-filled inquiry email with the product details.
  const lines = [
    "Hello,",
    "",
    `I'd like to inquire about ${product.name}.`,
    "",
    `Price: ${product.priceLabel}`,
    product.materials ? `Materials: ${product.materials}` : "",
    product.measurements ? `Measurements: ${product.measurements}` : "",
  ].filter((l, i, a) => l !== "" || a[i - 1] !== "");
  const mailto = `mailto:${settings.contactEmail}?subject=${encodeURIComponent(`Inquiry: ${product.name}`)}&body=${encodeURIComponent(lines.join("\n"))}`;

  return (
    <main className="min-h-screen bg-beige pt-24">
      <SiteHeader variant="page" />
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
          <h1 className="font-display tracking-[0.72px] text-2xl">{product.name}</h1>
          <p className="font-display text-xs tracking-[2.4px] uppercase">{product.priceLabel}</p>
          {product.description && (
            <p className="font-body text-sm leading-[1.4] text-left w-full max-w-[446px] whitespace-pre-line">{product.description}</p>
          )}
          <div className="font-display text-xs tracking-[0.36px] leading-[1.3]">
            {product.materials && <p>Materials: {product.materials}</p>}
            {product.measurements && <p>Measurements: {product.measurements}</p>}
          </div>
          <a
            href={mailto}
            className="font-display tracking-[2.4px] uppercase text-xs border-b-[0.6px] border-brown pb-1 hover:opacity-70 transition-opacity"
          >
            inquire ›
          </a>
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}
