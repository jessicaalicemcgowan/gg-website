import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ObjectsGrid from "@/components/ObjectsGrid";
import Reveal from "@/components/Reveal";
import { getObjectsPage } from "@/lib/content";

export const revalidate = 60;

export default async function ObjectsPage() {
  const { introText, objects } = await getObjectsPage();
  return (
    <main className="min-h-screen bg-beige pt-24">
      <SiteHeader variant="page" />
      {introText && (
        <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] pt-[100px] pb-14">
          <Reveal className="flex flex-col md:flex-row gap-6 md:gap-[80px] items-baseline w-full">
            <p className="font-display tracking-label uppercase text-xs shrink-0">object design</p>
            <p className="font-body text-[1.35rem] md:text-2xl leading-[1.4] whitespace-pre-line">{introText}</p>
          </Reveal>
        </div>
      )}
      <ObjectsGrid objects={objects} />
      <Footer />
    </main>
  );
}
