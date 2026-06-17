import { DisorderPageTemplate } from "@/components/shared/DisorderPageTemplate";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Stroke Management & Treatment",
  description: "Advanced, rapid stroke treatment, emergency management, and comprehensive rehabilitation care at Vijaya Neuro Hospital.",
});

export default function StrokeTreatmentPage() {
  return (
    <DisorderPageTemplate
      slug="stroke-treatment"
      title="Stroke Management & Emergency Care"
      shortDesc="Rapid neurological intervention and customized neuro-rehabilitation programs to maximize recovery."
      overview={`A stroke is a medical emergency that occurs when the blood supply to part of your brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Brain cells begin to die in minutes.

At Vijaya Neuro Hospital, we follow evidence-based acute stroke protocols. Our immediate focus is on stabilization, neuroprotection, and prompt diagnostic imaging. 

Following the acute phase, we design an intensive, multidisciplinary rehabilitation plan targeting motor function, spasticity, speech, and cognitive retraining under the guidance of Dr. Dasari Venkatesh.`}
      symptoms={[
        "Sudden numbness or weakness in the face, arm, or leg (especially on one side of the body)",
        "Sudden trouble speaking, slurred speech, or difficulty understanding speech",
        "Sudden confusion, disorientation, or difficulty thinking",
        "Sudden trouble seeing in one or both eyes or double vision",
        "Sudden trouble walking, loss of balance, coordination, or severe dizziness",
        "Sudden severe headache with no known cause",
      ]}
      diagnostics={[
        "Emergency Head CT Scan / Brain MRI coordination",
        "Carotid Doppler Ultrasound (Neck vessel screening)",
        "ECG and Echocardiography (Cardiac source screening)",
        "Comprehensive blood panel including lipid profile, glucose, and coagulation markers",
      ]}
      treatments={[
        "Acute medical management and blood pressure regulation",
        "Antiplatelet, anticoagulant, and statin therapies",
        "Targeted spasticity management (including botulinum toxin injections for rigid muscles)",
        "Integrated physical therapy, occupational therapy, and speech-language rehabilitation",
      ]}
    />
  );
}
