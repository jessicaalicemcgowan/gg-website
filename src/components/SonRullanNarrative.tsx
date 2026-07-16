"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GalleryStrip from "./GalleryStrip";
import Footer from "./Footer";
import SlideOutPanel from "./SlideOutPanel";
import CaseStudyContent from "./CaseStudyContent";
import CaseStudyInfoContent from "./CaseStudyInfoContent";
import Reveal from "./Reveal";
import { caseStudies } from "@/data/caseStudies";
import { useNavTheme } from "@/lib/navTheme";

const img = (name: string) => `/images/${name}`;

const label = "font-display tracking-label uppercase text-xs shrink-0";
const body = "font-body text-[1.35rem] md:text-2xl leading-[1.4]";
const caption = "font-body text-[11px] leading-[1.4] opacity-90 max-w-[400px]";
const SP = " ".repeat(8); // 8-space visual gap between "N / total" and the project name

const sonRullan = caseStudies[0];
const canCigonya = caseStudies.find((c) => c.slug === "can-cigonya")!;
const canGelat = caseStudies.find((c) => c.slug === "can-gelat")!;
const canGerman = caseStudies.find((c) => c.slug === "can-german")!;

/**
 * Faithful rebuild of Figma node 65:111 ("Spaces") — this single long-form
 * narrative *is* the Spaces page. It sits directly below the homepage hero
 * (per brief) and is also what "/spaces" renders directly.
 *
 * Clicking any image in the "origins" gallery strip opens the right-side
 * case-study slide-out (node 65:775) rather than a plain lightbox — same
 * SlideOutPanel/CaseStudyContent drawer built earlier for the Spaces grid,
 * reconnected here per the brief's click-through behavior.
 *
 * Every distinct block (hero cards, text rows, collage figures) is wrapped
 * in <Reveal> so it fades + eases into place on scroll-in and reverses on
 * scroll-out, rather than everything being visible on load.
 */
export default function SonRullanNarrative() {
  const [slideOutOpen, setSlideOutOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(sonRullan);
  const { setBeige } = useNavTheme();

  const openSlideOut = (caseStudy: typeof sonRullan = sonRullan) => {
    setActiveCaseStudy(caseStudy);
    setSlideOutOpen(true);
    setInfoOpen(false);
    setBeige(true);
  };
  const closeSlideOut = () => {
    setSlideOutOpen(false);
    setInfoOpen(false);
    setBeige(false);
  };

  return (
    <div className="bg-beige text-[#352523]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] pb-10 pt-16 md:pt-24 flex flex-col items-center gap-16">
        <Reveal id="spaces" className="flex flex-col gap-3 w-full max-w-[458px] scroll-mt-28 md:scroll-mt-24">
          <button onClick={() => openSlideOut()} className="relative block w-full aspect-[2500/3125]">
            <Image src={img("a0364afee0fdf552721b3d5d0e6ce87bf5ad1b49.png")} alt="Son Rullan" fill sizes="500px" className="object-cover" />
          </button>
          <p className={caption}>SON RULLAN, Mallorca Spain. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.</p>
        </Reveal>
        <Reveal className="flex flex-col md:flex-row gap-6 md:gap-[80px] items-baseline w-full">
          <p className={label}>origins</p>
          <p className={body}>
            Geoffrey Grunfeld was born and raised in Mallorca, on Traumuntana mountain range. Growing up in an old monastery Son Rullan, a property that was purchased and carefully restored with respect to Mallorquin estatic by his father, Fred Grunfeld, and later on became a pinnacle point of Deia community Geoffrey was surrounded by nature, people and spirits of Mallorquin.
          </p>
        </Reveal>
      </div>

      <GalleryStrip
        objectPosition="top"
        onImageClick={() => openSlideOut()}
        scaleOnMobile={0.65}
        images={[
          { src: img("a4daf582f74e6864739b2d6d90aed84f27e48dc1.png"), w: 200, h: 250 },
          { src: img("6145c7caa128c0b12c242334cbd20b7703eb4ea9.png"), w: 240, h: 300 },
          { src: img("7ed79b1e6413eecadde7785501891d8d81d5cea3.png"), w: 260, h: 208 },
          { src: img("08653bb0a5685d9c303fbe6f28aa13c3dfcae0dd.png"), w: 200, h: 250 },
          { src: img("ffe222202da7afd63ed12494ff3d71695c77493a.png"), w: 240, h: 300 },
          { src: img("da3fcc0defefd94d06fe2fdf5b0680d8653945bd.png"), w: 240, h: 195 },
          { src: img("35c1a853e7c0800b5c029ff148a8903ef76a7868.png"), w: 260, h: 208 },
          { src: img("dedfba55394bb0291a446bc221bbf7f4b267f843.png"), w: 200, h: 250 },
          { src: img("984d24e5a66a0cdd8167d8c17088c405d891ce78.png"), w: 300, h: 200 },
          { src: img("f0c90a01f07ff01c5e6667c99d58545fa3af9d6b.png"), w: 240, h: 300 },
          { src: img("def6a06bb4f25c7baab81e4a7878947d54991f82.png"), w: 240, h: 195 },
        ]}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-[138px] pt-10 flex justify-end">
        <Reveal className="flex flex-col md:flex-row gap-6 md:gap-[80px] items-baseline w-full max-w-[577px]">
          <p className="font-display tracking-label uppercase text-xs shrink-0">son rullan</p>
          <p className="font-body text-base leading-[1.4]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit. Vestibulum imperdiet nisi et nisi condimentum, vitae lobortis erat lacinia. Suspendisse potenti. Integer lacinia risus iaculis neque consequat efficitur. Nullam ipsum orci, bibendum in pellentesque ut, efficitur sit amet nisl. Donec sagittis tortor ut eros tempor, et scelerisque tellus tempor. Nunc egestas libero vitae elit faucibus consectetur. Vivamus a aliquet tellus, ac rutrum leo. Proin in dictum nisl. Maecenas ac diam id quam feugiat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque et ligula dui.
          </p>
        </Reveal>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-16 md:pt-24 text-left">
        <Reveal>
          <p className={body}>
            After graduating St.Martin for Architecture &ldquo;Spaces and Objects&rdquo; degree, Grunfeld returned home and started working as a designer refurbishing houses on the island. His early on work show us glimpse of his whimsical functional space. From multiple-curving-layers bathtub to Mallorquin style fire place. While making houses as a way of earning, his passion for objects continue to developed and being included through out his works.
          </p>
        </Reveal>
      </div>

      {/* Image collage. Note: the "Can German / Can Cigonya" two-up block
          (staircase + fireplace-nook photos) that used to sit here was
          removed per feedback. */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-5 py-16 md:py-20 flex flex-col items-center gap-16 md:gap-24">
        <Reveal className="flex flex-col gap-2 w-full max-w-[692px]">
          <figure className="flex flex-col gap-2 w-full">
            <button onClick={() => openSlideOut(canGelat)} className="relative block w-full aspect-[692/462]">
              <Image src={img("d38af03a961ec052bb19d3937b00545e5797b79e.png")} alt="Can Gelat" fill sizes="700px" className="object-cover" />
            </button>
            <figcaption className={caption}>1 / 6{SP}CAN GELAT, Mallorca Spain. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.</figcaption>
          </figure>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-8 md:gap-[100px] justify-center w-full">
          <Reveal className="w-full md:w-[506px]">
            <figure className="flex flex-col gap-2 w-full">
              <figcaption className={caption + " order-2 md:order-1"}>2 / 6{SP}CAN GERMAN, Mallorca Spain. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.</figcaption>
              <button onClick={() => openSlideOut(canGerman)} className="relative block w-full aspect-[506/633] order-1 md:order-2">
                <Image src={img("afcad3cac1626947f19d148545400f1cf826c646.png")} alt="Can German" fill sizes="600px" className="object-cover" />
              </button>
            </figure>
          </Reveal>
          <Reveal className="w-full md:w-[404px]" delay={0.1}>
            <figure className="flex flex-col gap-2 w-full">
              <button onClick={() => openSlideOut(canCigonya)} className="relative block w-full aspect-[404/323]">
                <Image src={img("851762aedafc6060e7bc8078189e0bfc050a0463.png")} alt="Can Cigonya" fill sizes="500px" className="object-cover" />
              </button>
              <figcaption className={caption}>3 / 6{SP}CAN CIGONYA, Mallorca Spain. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.</figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal className="flex flex-col gap-2 w-full max-w-[692px]">
          <figure className="flex flex-col gap-2 w-full">
            <button onClick={() => openSlideOut(canGelat)} className="relative block w-full aspect-[692/462]">
              <Image src={img("67ca925554d6d0c44e243bb1f09a34b747dd1b27.png")} alt="Can Gelat" fill sizes="700px" className="object-cover" />
            </button>
            <figcaption className={caption}>4 / 6{SP}CAN GELAT, Mallorca Spain. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.</figcaption>
          </figure>
        </Reveal>

        <Reveal className="flex flex-col gap-2 w-full max-w-[455px]">
          <figure className="flex flex-col gap-2 w-full">
            <figcaption className={caption}>5 / 6{SP}CAN CIGONYA, Mallorca Spain. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.</figcaption>
            <button onClick={() => openSlideOut(canCigonya)} className="relative block w-full aspect-[455/600]">
              <Image src={img("cdb1bb7ab36aafdd4660dd29c47e37ebf1368406.png")} alt="Exterior terrace" fill sizes="500px" className="object-cover" />
            </button>
          </figure>
        </Reveal>

        <Reveal className="flex flex-col gap-2 w-full max-w-[692px]">
          <figure className="flex flex-col gap-2 w-full">
            <button onClick={() => openSlideOut(canCigonya)} className="relative block w-full aspect-[692/462]">
              <Image src={img("image-6.jpg")} alt="Fireplace" fill sizes="700px" className="object-cover" />
            </button>
            <figcaption className={caption}>6 / 6{SP}CAN CIGONYA, Mallorca Spain. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.</figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:pl-[138px] md:pr-[255px] pt-16 md:pt-24 pb-10">
        <Reveal className="flex flex-col md:flex-row gap-6 md:gap-[80px] items-baseline w-full max-w-[800px]">
          <p className={label}>approach</p>
          <p className="font-body text-[1.35rem] md:text-2xl leading-[1.4] w-full md:w-[613px]">
            His curiosity for space, lights and objects developed at a very young age, crafting fallen branches into functioning objects such as spoons or masks, experimenting making lights with materials around him. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit. Vestibulum imperdiet nisi et nisi condimentum, vitae lobortis erat lacinia. Suspendisse potenti.
          </p>
        </Reveal>
      </div>

      <GalleryStrip
        exclusion
        gap={70}
        clickable={false}
        images={[
          { src: img("da86bf5e573a6a23ff7cb8d49905568ce3d1e9b7.png"), w: 200, h: 249 },
          { src: img("cd4642a6c9ff389d0e7bfdff7052c1e206bdaa48.png"), w: 200, h: 249 },
          { src: img("d93c13c7b162a8848d70c66c916521aeb4a154be.png"), w: 200, h: 249 },
          { src: img("b3a34729914e3396e3072f012b381e89db3c20cd.png"), w: 200, h: 249 },
          { src: img("9c7c27c7ac7684ecb5b208d4b420c2110b9d1b22.png"), w: 200, h: 249 },
          { src: img("f89252e05e8aa5f1813a921e0e9c7c17e133afbe.png"), w: 200, h: 249 },
        ]}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] pt-16 md:pt-24 pb-8 flex flex-col items-center gap-16">
        <Reveal className="flex flex-col gap-3 w-full max-w-[458px]">
          <div className="relative w-full aspect-[2500/3125]">
            <Image src={img("ef213e2637e0640f1bb5324d32e4987eed54c0db.png")} alt="Chair 004" fill sizes="500px" className="object-cover" />
          </div>
          <p className={caption}>CHAIR 004 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.</p>
        </Reveal>
        <Reveal className="flex flex-col md:flex-row gap-6 md:gap-[80px] items-baseline w-full">
          <p className={label}>exhibition</p>
          <p className={body}>
            In Objectos Perdidos, the artist present us his inspiration for his works, lost objects often found in various places such as flea market in Mallorca to Berlin as well as family personal object such as a fig grabber his father introduced to him at a very young age. The inspirational objects give us a dialogue with his own designed and crafted objects. When put them all together, they sang in the melody of the land and sea.
          </p>
        </Reveal>
      </div>

      <Reveal className="flex flex-col items-center py-16 md:py-24">
        <Link href="/objects" className="flex items-baseline gap-4 font-display tracking-label uppercase">
          <span className="text-xs">next</span>
          <span className="text-2xl flex items-center gap-2">
            OBJECTS <span aria-hidden>›</span>
          </span>
        </Link>
      </Reveal>

      <Footer />

      <SlideOutPanel open={slideOutOpen} onClose={closeSlideOut} layer={0}>
        <CaseStudyContent
          caseStudy={activeCaseStudy}
          onOpenInfo={() => setInfoOpen(true)}
        />
      </SlideOutPanel>
      <SlideOutPanel open={infoOpen} onClose={() => setInfoOpen(false)} layer={1}>
        <CaseStudyInfoContent caseStudy={activeCaseStudy} />
      </SlideOutPanel>
    </div>
  );
}
