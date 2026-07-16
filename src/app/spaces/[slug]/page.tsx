import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudyContent from "@/components/CaseStudyContent";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <main className="min-h-screen bg-beige pt-24">
      <Header variant="page" />
      <CaseStudyContent caseStudy={caseStudy} />
      <Footer />
    </main>
  );
}
