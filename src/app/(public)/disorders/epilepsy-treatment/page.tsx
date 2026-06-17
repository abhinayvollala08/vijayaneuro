import { DisorderPageTemplate } from "@/components/shared/DisorderPageTemplate";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Epilepsy & Seizure Care",
  description: "Comprehensive epilepsy monitoring, advanced Video EEG, and personalized seizure management plans at Vijaya Neuro Hospital.",
});

export default function EpilepsyTreatmentPage() {
  return (
    <DisorderPageTemplate
      slug="epilepsy-treatment"
      title="Epilepsy & Seizure Care"
      shortDesc="Advanced Video EEG diagnosis, precise classification, and individualized antiepileptic therapy for seizure control."
      overview={`Epilepsy is a chronic neurological disorder characterized by recurrent, unprovoked seizures. A seizure is a sudden surge of electrical activity in the brain, which can cause temporary changes in behavior, movements, feelings, and levels of consciousness.

At Vijaya Neuro Hospital, we use advanced diagnostic tools including state-of-the-art Video EEG monitoring to accurately characterize the seizure type, distinguish epilepsy from pseudoseizures or cardiac syncope, and pinpoint the seizure focus.

Dr. Dasari Venkatesh specializes in optimizing antiepileptic drug (AED) regimens, managing medication side effects, and counseling patients on lifestyle modifications to achieve a seizure-free life.`}
      symptoms={[
        "Temporary confusion or cognitive fuzziness",
        "Staring spells or brief absences of awareness",
        "Stiffening of muscles (tonic phase)",
        "Uncontrollable jerking movements of the arms and legs (clonic phase)",
        "Loss of consciousness or sudden fainting",
        "Sensory disturbances (strange smells, tastes, or a feeling of deja vu)",
      ]}
      diagnostics={[
        "In-House Video EEG (Electroencephalogram) monitoring",
        "High-resolution Epilepsy Protocol Brain MRI coordination",
        "Routine and emergency therapeutic drug level monitoring",
        "Comprehensive metabolic panels and genetic/autoimmune screening",
      ]}
      treatments={[
        "Personalized antiepileptic drug (AED) initiation and management",
        "Intractable (drug-resistant) epilepsy evaluation and guidance",
        "Vagus Nerve Stimulation (VNS) and neuromodulation advisory",
        "Seizure safety counseling and lifestyle adjustments",
      ]}
    />
  );
}
