import { DisorderPageTemplate } from "@/components/shared/DisorderPageTemplate";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Spinal & Back Disorders Treatment",
  description: "Non-surgical neurological management of slip disc, neck pain, sciatica, and cervical spondylosis at Vijaya Neuro Hospital.",
});

export default function SpinalDisordersPage() {
  return (
    <DisorderPageTemplate
      slug="spinal-disorders"
      title="Spinal & Back Disorders"
      shortDesc="Non-surgical management of slip disc, sciatica, cervical spondylosis, and nerve compression."
      overview={`Spinal disorders involve damage or compression of the spinal cord or the nerve roots exiting the spine. These conditions can cause localized neck or back pain, as well as radiating pain, numbness, or weakness in the arms or legs (radiculopathy). Common causes include herniated discs, spinal stenosis, and spondylosis.

At Vijaya Neuro Hospital, we focus on identifying the neurological component of spine pain. We rule out myelopathy (spinal cord compression) and guide non-surgical management of nerve compression.

Dr. Dasari Venkatesh coordinates targeted medical therapies, physical rehabilitation, and provides guidance on ergonomic modifications and preventive spine care.`}
      symptoms={[
        "Localized pain or stiffness in the neck, mid-back, or lower back",
        "Sharp, radiating pain traveling down the arm (cervical radiculopathy) or leg (sciatica)",
        "Numbness, tingling, or 'pins and needles' in hands, fingers, legs, or feet",
        "Weakness in hand grip, foot drop, or difficulty lifting the arm",
        "Loss of balance, clumsy hands, or difficulty walking (possible signs of myelopathy)",
        "Loss of bladder/bowel control (requires emergency surgical referral)",
      ]}
      diagnostics={[
        "MRI Spine coordination (Cervical/Lumbar spine)",
        "ENMG (Electroneuromyography) to verify active nerve root compression",
        "Spine X-Rays for alignment and bony structures",
        "Clinical testing of reflexes, sensory mapping, and motor power",
      ]}
      treatments={[
        "Anti-inflammatory, neuropathic, and muscle relaxant medications",
        "Lumbar/Cervical traction and targeted physical therapy",
        "Ergonomic counseling, posture correction, and spine-strengthening exercises",
        "Coordination for spine injections or neurosurgical evaluation when indicated",
      ]}
    />
  );
}
