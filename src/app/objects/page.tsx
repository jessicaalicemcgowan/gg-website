import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ObjectsGrid from "@/components/ObjectsGrid";
import Reveal from "@/components/Reveal";

export default function ObjectsPage() {
  return (
    <main className="min-h-screen bg-beige pt-24">
      <Header variant="page" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] pt-[100px] pb-14">
        <Reveal className="flex flex-col md:flex-row gap-6 md:gap-[80px] items-baseline w-full">
          <p className="font-display tracking-label uppercase text-xs shrink-0">object design</p>
          <p className="font-body text-[1.35rem] md:text-2xl leading-[1.4]">
            Geoffrey’s curiosity for space, lights and objects developed at a very young age,
            crafting fallen branches into functioning objects such as spoons or masks,
            experimenting making lights with materials around him. Each piece is made to order,
            with bespoke commissions developed in response to their setting. Drawing inspiration
            from the architecture, atmosphere and surrounding environment, Geoffrey creates
            objects that are uniquely connected to the spaces they inhabit.
          </p>
        </Reveal>
      </div>
      <ObjectsGrid />
      <Footer />
    </main>
  );
}
