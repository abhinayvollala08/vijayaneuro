import { DisorderPageTemplate } from "@/components/shared/DisorderPageTemplate";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Neuropathy & Nerve Weakness",
  description: "Electrodiagnostic ENMG evaluation, diagnosis of peripheral neuropathies, and neuropathic pain management at Vijaya Neuro Hospital.",
});

export default function NeuropathyTreatmentPage() {
  return (
    <DisorderPageTemplate
      slug="neuropathy-treatment"
      title="Neuropathy & Nerve Weakness"
      shortDesc="ENMG-guided nerve mapping, metabolic screening, and modern neuropathic pain therapies."
      overview={`Peripheral neuropathy is a result of damage to the nerves outside the brain and spinal cord (peripheral nerves). It often causes numbness, tingling, and weakness, usually in the hands and feet. It can also affect other areas and bodily functions, and is frequently caused by diabetes, infections, nutritional deficiencies, and toxins.

At Vijaya Neuro Hospital, we prioritize electrodiagnostic mapping (ENMG) to determine if the neuropathy is axonal or demyelinating, focal or generalized.

Dr. Dasari Venkatesh addresses the underlying cause (e.g., blood sugar control, vitamin replacement) and utilizes advanced neuropathic pain relievers to improve patient quality of life.`}
      symptoms={[
        "Gradual onset of numbness, prickling, or tingling in your feet or hands",
        "Sharp, jabbing, throbbing, or burning pain",
        "Extreme sensitivity to touch (allodynia)",
        "Muscle weakness or loss of coordination, leading to frequent falls",
        "Feeling as if you're wearing gloves or socks when you're not",
        "Autonomic changes (changes in sweating, blood pressure, or digestion)",
      ]}
      diagnostics={[
        "Electroneuromyography (ENMG) for nerve conduction velocity & EMG",
        "Metabolic blood screen (HbA1c, Vitamin B12, renal & liver profiles)",
        "Vasculitis and autoimmune blood markers",
        "Autonomic function tests (where indicated)",
      ]}
      treatments={[
        "Neuropathic pain agents (Pregabalin, Gabapentin, Duloxetine, Amitriptyline)",
        "Underlying metabolic management (strict diabetic control, renal care)",
        "Nutritional supplementation (Methylcobalamin, folic acid)",
        "Orthotic support and diabetic foot care education",
      ]}
    />
  );
}
