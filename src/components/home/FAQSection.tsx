"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

const faqs = [
  {
    question: "What conditions does a neurologist treat?",
    answer: "A <strong>neurologist</strong> specializes in diagnosing and treating disorders of the <strong>nervous system</strong>, including the brain, spinal cord, and peripheral nerves. Common conditions include <strong>stroke</strong>, <strong>epilepsy</strong>, <strong>migraines</strong>, <strong>Parkinson's disease</strong>, <strong>multiple sclerosis</strong>, <strong>neuropathy</strong>, <strong>dementia</strong>, <strong>vertigo</strong>, and spinal disorders.",
  },
  {
    question: "What is Video EEG and when is it needed?",
    answer: "<strong>Video EEG</strong> (Electroencephalogram) is an advanced diagnostic test that simultaneously records brain electrical activity and video of the patient. It is essential for diagnosing <strong>epilepsy</strong>, classifying <strong>seizure types</strong>, localizing seizure origin, and differentiating epileptic seizures from non-epileptic events. It is recommended when routine EEG is inconclusive or when surgical evaluation is needed.",
  },
  {
    question: "What is ENMG and what does it diagnose?",
    answer: "<strong>ENMG</strong> (Electroneuromyography) combines nerve conduction studies and electromyography to evaluate the health of muscles and the nerves controlling them. It diagnoses conditions like <strong>neuropathy</strong>, <strong>carpal tunnel syndrome</strong>, <strong>radiculopathy</strong>, <strong>myopathy</strong>, and <strong>motor neuron disease</strong>. The test helps determine the type, location, and severity of nerve or muscle damage.",
  },
  {
    question: "How is stroke treated at Vijaya Neuro Hospital?",
    answer: "At Vijaya Neuro Hospital, <strong>stroke</strong> treatment follows a time-critical protocol. We provide rapid clinical assessment, emergency stabilization, and appropriate medical management. Our approach includes early intervention to minimize brain damage, identification of stroke type (ischemic vs. hemorrhagic), secondary prevention strategies, and comprehensive <strong>stroke rehabilitation</strong> programs for recovery.",
  },
  {
    question: "What is the difference between a neurologist and a neurosurgeon?",
    answer: "A <strong>neurologist</strong> is a physician who diagnoses and treats neurological conditions using non-surgical methods — medications, therapies, and rehabilitation. A <strong>neurosurgeon</strong> performs surgical procedures on the brain, spine, and nerves. Most neurological conditions are managed by neurologists; surgery is recommended only when non-surgical options are insufficient.",
  },
  {
    question: "How do I know if my headache is a migraine?",
    answer: "<strong>Migraines</strong> are typically characterized by intense, throbbing pain (usually on one side), lasting 4–72 hours. They may be accompanied by <strong>nausea</strong>, <strong>vomiting</strong>, sensitivity to light and sound, and visual disturbances called <strong>aura</strong>. If your headaches are recurring, severe, or affecting daily life, consult a neurologist for proper evaluation and treatment.",
  },
  {
    question: "What does neuro rehabilitation involve?",
    answer: "<strong>Neuro rehabilitation</strong> is a comprehensive recovery program for patients with neurological conditions. It includes <strong>physiotherapy</strong> for motor recovery, <strong>occupational therapy</strong> for daily living skills, <strong>speech therapy</strong> for language and swallowing issues, <strong>cognitive therapy</strong> for memory and attention, and medication management — all personalized to the patient's condition and recovery goals.",
  },
  {
    question: "Can epilepsy be completely cured?",
    answer: "Many patients with <strong>epilepsy</strong> can achieve complete <strong>seizure freedom</strong> with proper medication. About 60–70% of epilepsy patients respond well to anti-seizure medications. Some may be candidates for surgical treatment. With accurate diagnosis (using <strong>Video EEG</strong>) and appropriate treatment, many patients lead seizure-free lives. Regular follow-up and medication compliance are essential.",
  },
];

export function FAQSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]+>/g, ""),
      },
    })),
  };

  return (
    <section className="py-20 lg:py-28 bg-navy-50">
      <SchemaMarkup schema={faqSchema} />

      <div className="container-custom max-w-3xl">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          title="Common Questions About Neurological Care"
          subtitle="Expert answers to help you understand neurological conditions and our services."
        />

        <Accordion.Root type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Accordion.Item
                value={`faq-${index}`}
                className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
              >
                <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-5 text-left group cursor-pointer">
                  <span className="font-sans font-semibold text-navy-700 text-[15px] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className="text-text-muted shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 pb-5 data-[state=open]:animate-fade-up">
                  <p
                    className="text-text-body text-sm font-sans leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
