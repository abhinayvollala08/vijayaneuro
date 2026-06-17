import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { ToolContainer } from "./ToolContainer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "stroke-risk" },
    { slug: "seizure-assessment" },
    { slug: "symptom-router" },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const metadataMap: Record<string, { title: string; description: string }> = {
    "stroke-risk": {
      title: "Stroke Risk Assessment Tool | Vijaya Neuro Hospital",
      description: "Assess your potential risk factors for stroke using our interactive clinical screening tool. Lower your risk under expert neurological guidance.",
    },
    "seizure-assessment": {
      title: "Seizure & Epilepsy Screening Tool | Vijaya Neuro Hospital",
      description: "Interactive questionnaire for patients experiencing syncopal or seizure episodes. Understand your symptoms and prepare for Video EEG tests.",
    },
    "symptom-router": {
      title: "Neurological Symptom Router & Triage | Vijaya Neuro Hospital",
      description: "Unsure where your symptoms belong? Map your headache, numbness, back pain, or tremors directly to our specialized clinics.",
    },
  };

  const currentMeta = metadataMap[slug];
  if (!currentMeta) return buildMetadata({ title: "Page Not Found", description: "The requested page was not found." });

  return buildMetadata({
    title: currentMeta.title,
    description: currentMeta.description,
  });
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;

  const validSlugs = ["stroke-risk", "seizure-assessment", "symptom-router"];
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return <ToolContainer slug={slug} />;
}
