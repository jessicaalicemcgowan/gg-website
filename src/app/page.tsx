import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import HomeHero from "@/components/HomeHero";
import SonRullanNarrative from "@/components/SonRullanNarrative";
import { getCarousel, getHomepage } from "@/lib/content";

// Content comes from Sanity; refresh the page at most once a minute.
export const revalidate = 60;

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
