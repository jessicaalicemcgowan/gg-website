import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import HomeHero from "@/components/HomeHero";
import SonRullanNarrative from "@/components/SonRullanNarrative";
import { getCarousel, getHomepage } from "@/lib/content";

// Always fetch fresh content from Sanity, so published edits show up straight away.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [slides, data] = await Promise.all([getCarousel(), getHomepage()]);
  return (
    <main className="min-h-screen bg-beige">
      <SiteHeader variant="home" />
      <HomeHero slides={slides} tagline={data.tagline} />
      {/* The Spaces content sits directly below the hero — scrolling past
          the hero takes you straight into it. */}
      <SonRullanNarrative data={data} footer={<Footer />} />
    </main>
  );
}
