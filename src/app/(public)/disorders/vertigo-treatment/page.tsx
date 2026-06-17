import { DisorderPageTemplate } from "@/components/shared/DisorderPageTemplate";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dizziness & Vertigo Treatment",
  description: "Comprehensive diagnostics and rehabilitation for vertigo, balance disorders, and inner ear conditions at Vijaya Neuro Hospital.",
});

export default function VertigoTreatmentPage() {
  return (
    <DisorderPageTemplate
      slug="vertigo-treatment"
      title="Dizziness & Vertigo Management"
      shortDesc="Accurate vestibular profiling, particle repositioning maneuvers, and balance rehabilitation."
      overview={`Vertigo is a sensation of spinning or movement, even when you are perfectly still. It is often caused by an issue in the inner ear (vestibular system) or the brain (central nervous system). Conditions like BPPV (Benign Paroxysmal Positional Vertigo), Meniere's disease, and vestibular migraine are common causes.

At Vijaya Neuro Hospital, we conduct a systematic examination to differentiate central vertigo (brain-related) from peripheral vertigo (inner ear-related).

Dr. Dasari Venkatesh performs specialized bedside maneuvers (like the Epley Maneuver) to treat BPPV instantly, along with prescribing vestibular suppressants and balance rehabilitation therapies.`}
      symptoms={[
        "A sensation of spinning, tilting, swaying, or being off-balance",
        "Nausea, vomiting, or motion sickness during attacks",
        "Nystagmus (abnormal, involuntary rapid eye movements)",
        "Hearing loss, ringing in the ears (tinnitus), or ear fullness",
        "Lightheadedness, unsteadiness, or feeling faint",
        "Double vision, difficulty walking, or limb weakness (requires emergency evaluation)",
      ]}
      diagnostics={[
        "Positional testing (Dix-Hallpike maneuver)",
        "Detailed neuro-otological bedside examination (HINTS exam)",
        "Brain MRI (to rule out posterior fossa stroke, acoustic neuroma)",
        "Audiometry coordination",
      ]}
      treatments={[
        "Canalith repositioning maneuvers (Epley, Semont, barbecue roll maneuvers)",
        "Vestibular suppressant medications (for acute symptom relief)",
        "Prophylactic therapy for vestibular migraine",
        "Vestibular rehabilitation therapy (VRT) for balance training",
      ]}
    />
  );
}
