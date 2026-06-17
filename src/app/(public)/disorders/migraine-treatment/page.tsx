import { DisorderPageTemplate } from "@/components/shared/DisorderPageTemplate";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Migraine & Headache Treatment",
  description: "Comprehensive migraine prophylaxis, abortive therapies, and headache management at Vijaya Neuro Hospital.",
});

export default function MigraineTreatmentPage() {
  return (
    <DisorderPageTemplate
      slug="migraine-treatment"
      title="Migraine & Headache Management"
      shortDesc="Advanced prophylactic regimens, abortive therapies, and trigger management for chronic headache disorders."
      overview={`A migraine is a neurological condition that causes intense, throbbing headaches, often accompanied by nausea, vomiting, and extreme sensitivity to light and sound. Migraine attacks can last for hours or days, and the pain can be severe enough to interfere with your daily activities.

At Vijaya Neuro Hospital, we recognize that no two headache profiles are identical. We perform a detailed clinical evaluation to rule out secondary headache causes.

Under Dr. Dasari Venkatesh's guidance, we offer specialized acute abortive therapies and long-term prophylactic medications, alongside guidance on dietary triggers, sleep hygiene, and stress management.`}
      symptoms={[
        "Moderate to severe throbbing or pulsing pain, usually on one side of the head",
        "Sensory aura (seeing flashes of light, blind spots, or feeling tingling in arms/legs)",
        "Nausea, vomiting, or abdominal discomfort",
        "Extreme sensitivity to light (photophobia) and sound (phonophobia)",
        "Dizziness, lightheadedness, or feeling faint",
        "Neck pain or stiffness accompanying the headache",
      ]}
      diagnostics={[
        "Detailed clinical headache diary review",
        "Brain MRI/CT (to rule out vascular anomalies, tumors, or secondary causes)",
        "Fundoscopy (to check for elevated intracranial pressure)",
        "Blood pressure and endocrine profiling",
      ]}
      treatments={[
        "Customized abortive therapy (Triptans, NSAIDs, antiemetics)",
        "Prophylactic medications (Beta-blockers, Amitriptyline, Flunarizine, Valproate)",
        "CGRP inhibitor advice and counseling",
        "Lifestyle counseling (trigger mapping, sleep optimization, stress reduction)",
      ]}
    />
  );
}
