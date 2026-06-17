import { DisorderPageTemplate } from "@/components/shared/DisorderPageTemplate";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Paralysis Treatment & Recovery",
  description: "Comprehensive care for motor weakness, paralysis recovery, and customized neuro-rehabilitation at Vijaya Neuro Hospital.",
});

export default function ParalysisTreatmentPage() {
  return (
    <DisorderPageTemplate
      slug="paralysis-treatment"
      title="Paralysis Management & Recovery"
      shortDesc="Detailed neurological profiling, spasticity management, and advanced neuro-rehabilitation for motor restoration."
      overview={`Paralysis is the loss of the ability to move some or all of your body. It can be temporary or permanent, and it can affect one side of the body (hemiplegia), both legs (paraplegia), or all four limbs (quadriplegia). It is typically caused by damage to the nervous system, such as a stroke, spinal cord injury, or peripheral nerve disorder.

At Vijaya Neuro Hospital, we treat paralysis by first identifying the exact level of neurological disruption (brain, spinal cord, or peripheral nerves) using electrodiagnostic tools (ENMG) and neuroimaging.

We integrate pharmacological treatments for muscle stiffness (spasticity) with aggressive physical and occupational therapies to rebuild neural pathways, improve range of motion, and restore independence.`}
      symptoms={[
        "Loss of muscle function or sensation in face, arms, or legs",
        "Muscle stiffness, tightness, or painful spasms (spasticity)",
        "Muscle flaccidity or extreme weakness (floppiness)",
        "Difficulty with fine motor skills like writing or holding a cup",
        "Loss of bladder or bowel control",
        "Difficulty speaking, swallowing, or breathing",
      ]}
      diagnostics={[
        "Electroneuromyography (ENMG) for nerve/muscle conduction",
        "Somatosensory Evoked Potentials (SSEP) where indicated",
        "Brain or Spine MRI coordination",
        "Muscle and nerve biopsy coordination",
      ]}
      treatments={[
        "Antispasmodic medication management (Baclofen, Tizanidine)",
        "Botulinum Toxin injections for focal spasticity",
        "Intensive physical rehabilitation (gait training, muscle strengthening)",
        "Occupational therapy for assistive device training and daily living skills",
      ]}
    />
  );
}
