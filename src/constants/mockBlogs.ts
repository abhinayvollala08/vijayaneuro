export interface MockBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  readTime: number;
  views: number;
  createdAt: string;
  authorName: string;
}

export const MOCK_BLOGS: MockBlog[] = [
  {
    title: "Understanding Stroke: The 'FAST' Warning Signs & Instant Actions",
    slug: "understanding-stroke-fast-signs",
    excerpt: "Learn how to detect a stroke immediately using the clinically proven FAST method, and understand why every second count in stroke recovery.",
    category: "Stroke Prevention",
    tags: ["Stroke", "Emergency", "First Aid", "Brain Health"],
    readTime: 4,
    views: 1420,
    createdAt: "2026-05-10T10:00:00.000Z",
    authorName: "Dr. Dasari Venkatesh",
    content: `A stroke is a medical emergency that occurs when the blood supply to part of your brain is interrupted or reduced, depriving brain tissue of essential oxygen and nutrients. Within minutes, brain cells begin to die. That is why immediate medical action is absolutely critical.

### The FAST Method: How to Spot a Stroke
The FAST acronym is a simple, effective tool for remembering the primary symptoms of a stroke and taking quick action:

1. **F - Face Drooping**: Does one side of the face droop or is it numb? Ask the person to smile. Is the smile uneven or lopsided?
2. **A - Arm Weakness**: Is one arm weak or numb? Ask the person to raise both arms. Does one arm drift downward?
3. **S - Speech Difficulty**: Is speech slurred? Is the person unable to speak or hard to understand? Ask the person to repeat a simple sentence, like "The sky is blue." Is the sentence repeated correctly?
4. **T - Time to Call Emergency**: If the person shows any of these symptoms, even if the symptoms go away, check the time so you know when they first started and call for emergency medical help immediately.

### Why Every Second Counts
During a stroke, approximately 1.9 million brain cells die every minute the brain is deprived of oxygen. Immediate medical intervention—such as thrombolytic therapy (clot-busting medication) or mechanical thrombectomy—must ideally be administered within 3 to 4.5 hours of the onset of symptoms to minimize long-term disability or brain damage.

### What to Do While Waiting for Help
* **Stay Calm**: Keep the patient calm and comfortable.
* **Position Safely**: Lay the patient down on their side with their head slightly elevated. This helps keep the airway clear and prevents choking if they vomit.
* **Do NOT Give Medication**: Do not give the patient aspirin or any other medication, food, or drink. If the stroke is caused by a hemorrhage (bleeding in the brain), aspirin can make the bleeding worse.
* **Note the Time**: Keep a precise note of when the symptoms first started. This information is vital for the emergency room physician to determine suitable treatment options.`
  },
  {
    title: "Video EEG: A Complete Patient Guide to Brainwave Monitoring",
    slug: "video-eeg-patient-guide",
    excerpt: "What is a Video EEG, why has your neurologist ordered one, and how can you prepare for your monitoring session? Find all answers here.",
    category: "Diagnostics",
    tags: ["Video EEG", "Epilepsy", "Seizures", "Brain Mapping"],
    readTime: 5,
    views: 928,
    createdAt: "2026-05-18T14:30:00.000Z",
    authorName: "Dr. Dasari Venkatesh",
    content: `If you or a loved one has experienced unexplained blackouts, fainting spells, or jerking movements, your neurologist may have ordered a **Video EEG (Electroencephalogram)**. 

### What is a Video EEG?
A standard EEG records the electrical activity of your brain via electrodes attached to your scalp. A Video EEG goes a step further: it records your brainwaves and simultaneously records a continuous video of your body's physical movements. 

By comparing the electrical brainwaves with your physical behavior in real-time, your neurologist can:
* Confirm whether your episodes are epileptic seizures or other events (such as fainting, panic attacks, or sleep disorders).
* Determine the exact type of seizure you are experiencing.
* Pinpoint the specific area of the brain where the seizures originate.

### Why is Video EEG Necessary?
Seizures can be brief and difficult to describe. Standard EEGs only record brainwaves for 20-30 minutes, which may miss transient seizure activity. A longer Video EEG (ranging from 2 hours to 24 hours or more) increases the likelihood of capturing an event, allowing for an accurate diagnosis and target-specific antiepileptic drug selection.

### Patient Preparation Guidelines
To ensure clean recordings and clear brainwave tracing, please follow these instructions:
1. **Clean Hair is Vital**: Wash your hair thoroughly with shampoo the night before or the morning of the test. Do not apply hair oils, hair gels, conditioners, pomades, or sprays. The electrodes require a clean, dry scalp to adhere properly.
2. **Avoid Stimulants**: Do not consume caffeine (coffee, tea, energy drinks, chocolate) for at least 12 hours before the test, as caffeine alter brainwave patterns.
3. **Follow Medication Instructions**: Unless specifically told otherwise by Dr. Venkatesh, take your regular medications as scheduled. 
4. **Wear Comfortable Clothing**: Choose a shirt that buttons down the front rather than a pullover. This makes it easier to change without pulling clothes over the head and disturbing the electrodes.`
  },
  {
    title: "Navigating Migraines: Understanding Triggers and Preventive Therapies",
    slug: "managing-migraine-triggers-treatment",
    excerpt: "Migraines are more than just bad headaches. Learn about common sensory and dietary triggers, and the latest clinical options to reduce attack frequency.",
    category: "Headache Support",
    tags: ["Migraine", "Headache", "Pain Management", "Neurology"],
    readTime: 5,
    views: 1205,
    createdAt: "2026-06-02T09:15:00.000Z",
    authorName: "Dr. Dasari Venkatesh",
    content: `Migraine is a complex neurological disorder characterized by recurring attacks of moderate-to-severe throbbing pain. The pain is typically unilateral (on one side of the head) and is frequently accompanied by nausea, vomiting, and extreme sensitivity to light, sound, and smell.

### Common Migraine Triggers
While the exact cause of migraines is neurological, specific triggers can set off an attack. Identifying and tracking these triggers in a headache diary is a key part of management:

* **Dietary Triggers**: Aged cheeses, processed meats (containing nitrates), monosodium glutamate (MSG), artificial sweeteners, alcohol (particularly red wine), and excessive caffeine (or caffeine withdrawal).
* **Sleep Disturbances**: Too much sleep, too little sleep, or irregular sleep schedules.
* **Environmental Stimuli**: Bright lights, sun glare, flickering screens, loud sounds, and strong odors (perfumes, paint, smoke).
* **Hormonal Changes**: Estrogen fluctuations in women, particularly before or during menstrual cycles.
* **Stress & Relaxation**: High stress, or the sudden release of stress (sometimes called a "weekend headache").

### Clinical Management Strategies
At Vijaya Neuro Hospital, we categorize migraine treatments into two main types:

1. **Acute (Abortive) Treatment**: Taken immediately during an attack to stop the progression of pain. These include triptans, NSAIDs, and anti-nausea medications. For maximum effectiveness, these should be taken at the very first sign of a migraine.
2. **Preventive (Prophylactic) Treatment**: Taken daily on a long-term basis to reduce the frequency, duration, and severity of migraine attacks. Recommended for patients experiencing more than 3-4 disabling attacks per month. Medications include beta-blockers, tricyclic antidepressants, anticonvulsants, and modern CGRP inhibitors.`
  },
  {
    title: "Diabetic Peripheral Neuropathy: Guidelines for Nerve Health",
    slug: "diabetic-peripheral-neuropathy-guide",
    excerpt: "High blood sugar can damage peripheral nerves. Read about the symptoms of neuropathy and clinical steps to manage nerve pain.",
    category: "Nerve Health",
    tags: ["Neuropathy", "Diabetes", "Nerve Pain", "ENMG"],
    readTime: 4,
    views: 840,
    createdAt: "2026-06-12T11:00:00.000Z",
    authorName: "Dr. Dasari Venkatesh",
    content: `Peripheral neuropathy is a type of nerve damage that commonly affects people with diabetes. Chronic high blood sugar (glucose) levels damage the delicate nerve fibers, primarily in the legs and feet, leading to sensory abnormalities and pain.

### Recognizing the Symptoms
Symptoms of diabetic neuropathy often develop gradually and can include:
* Numbness or reduced ability to feel pain or temperature changes.
* A tingling, burning, or "pins and needles" sensation.
* Sharp, jabbing pains or cramps, which are often worse at night.
* Extreme sensitivity to light touch (even the weight of a bedsheet can be painful).
* Muscle weakness, loss of reflexes, or balance problems leading to difficulty walking.

### The Role of ENMG in Diagnosis
**Electroneuromyography (ENMG)** is the gold standard diagnostic tool for neuropathy. It measures the speed and strength of electrical signals traveling through your nerves. This test helps confirm if the symptoms are due to peripheral nerve damage, identifies the severity of the damage, and rules out other localized nerve compressions (such as a pinched nerve in the back).

### Essential Foot Care Guidelines
Because neuropathy can cause loss of sensation in the feet, minor cuts, blisters, or sores can go unnoticed and escalate into severe ulcers or infections. Follow these daily foot care rules:
1. **Inspect Your Feet Daily**: Check for cuts, blisters, redness, swelling, or nail problems. Use a mirror if you cannot see the bottoms of your feet.
2. **Wash Feet Daily**: Use lukewarm water and mild soap. Dry them thoroughly, especially between the toes.
3. **Moisturize But Avoid Toes**: Apply a moisturizing lotion to dry skin on the feet, but do not apply it between the toes, as excess moisture there can promote fungal infections.
4. **Never Go Barefoot**: Always wear socks and supportive shoes, even indoors, to protect your feet from stubbing toes or stepping on small objects.
5. **Control Blood Sugar**: Maintaining your HbA1c within target ranges is the single most effective way to prevent the onset or progression of diabetic neuropathy.`
  }
];
