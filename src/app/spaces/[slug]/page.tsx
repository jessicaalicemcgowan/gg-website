import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import CaseStudyContent from "@/components/CaseStudyContent";
import { getProject, getProjectSlugs } from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProjectSlugs()).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-beige pt-24">
      <SiteHeader variant="page" />
      <CaseStudyContent project={project} />
      <Footer />
    </main>
  );
}
