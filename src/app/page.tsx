import Header from "@/components/Header";
import HomeHero from "@/components/HomeHero";
import SonRullanNarrative from "@/components/SonRullanNarrative";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-beige">
      <Header variant="home" />
      <HomeHero />
      {/* Per brief: the Spaces page sits directly below the homepage hero —
          scrolling past the hero takes you straight into it. This is a 1:1
          rebuild of Figma node 65:111 ("Spaces"). */}
      <SonRullanNarrative />
    </main>
  );
}
