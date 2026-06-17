import { DisorderPageTemplate } from "@/components/shared/DisorderPageTemplate";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Memory Loss & Dementia Treatment",
  description: "Early diagnosis, cognitive profiling, and management of Alzheimer's and memory disorders at Vijaya Neuro Hospital.",
});

export default function MemoryLossTreatmentPage() {
  return (
    <DisorderPageTemplate
      slug="memory-loss-treatment"
      title="Memory Loss & Dementia Management"
      shortDesc="Comprehensive cognitive screening, identifying reversible causes of memory loss, and slow-progression therapies."
      overview={`Memory loss is a decline in cognitive functions such as remembering, reasoning, and thinking, which is severe enough to interfere with daily life. It can be a symptom of various conditions, with Alzheimer's disease and vascular dementia being the most common.

At Vijaya Neuro Hospital, we understand the emotional impact of cognitive decline on patients and their families. Our diagnosis focuses on distinguishing normal age-related memory changes from pathological dementia, and ruling out reversible causes (e.g., Vitamin B12 deficiency, thyroid dysfunction, normal pressure hydrocephalus).

Dr. Dasari Venkatesh provides pharmacotherapy to slow cognitive decline, treats associated behavioral disturbances, and counsels families on home care and safety.`}
      symptoms={[
        "Asking the same questions repeatedly or forgetting recently learned information",
        "Difficulty performing familiar tasks (e.g., following a recipe or managing bills)",
        "Confusion about time, places, dates, or current events",
        "Misplacing items in unusual places and being unable to retrace steps",
        "Changes in mood, personality, or social withdrawal",
        "Difficulty finding the right words or following a conversation",
      ]}
      diagnostics={[
        "Standardized cognitive testing (MMSE / MoCA assessment)",
        "Brain MRI (Volumetric analysis of hippocampus)",
        "Dementia blood panel (Vitamin B12, TSH, folate, metabolic screening)",
        "CSF biomarkers (where indicated)",
      ]}
      treatments={[
        "Cholinesterase Inhibitors (Donepezil, Rivastigmine)",
        "NMDA receptor antagonists (Memantine)",
        "Management of neuropsychiatric symptoms (anxiety, agitation, sleep issues)",
        "Cognitive rehabilitation and caregiver support counseling",
      ]}
    />
  );
}
