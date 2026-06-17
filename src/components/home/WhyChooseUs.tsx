"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const reasons = [
  { title: "DNB-Qualified Neurologist", desc: "Treatment by a highly trained neurology specialist with proven clinical expertise." },
  { title: "5 In-House Diagnostics", desc: "Complete neurological workup without referrals — Video EEG, ENMG, ECG, Lab, X-Ray." },
  { title: "Stroke Emergency Care", desc: "Rapid assessment protocols for time-critical conditions like acute stroke." },
  { title: "Evidence-Based Treatment", desc: "Treatment plans backed by latest neurological research and clinical guidelines." },
  { title: "Affordable & Accessible", desc: "Quality neuro care at reasonable costs, accessible to all communities." },
  { title: "Comprehensive Rehabilitation", desc: "Post-treatment recovery programs tailored to individual patient needs." },
  { title: "Patient-First Philosophy", desc: "Clear communication, thorough explanation, and compassionate care always." },
  { title: "Trusted by Thousands", desc: "Over 10,000 patients treated with consistently high satisfaction ratings." },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-navy-700 overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="A Hospital Built on Trust & Expertise"
          subtitle="Every aspect of Vijaya Neuro Hospital is designed to deliver exceptional neurological care with compassion."
          dark
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="group bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6 hover:bg-brand-orange/[0.10] hover:border-brand-orange/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-orange/[0.15] flex items-center justify-center mb-4">
                <Check size={18} className="text-brand-orange" />
              </div>
              <h3 className="font-sans font-semibold text-white text-sm mb-2">
                {reason.title}
              </h3>
              <p className="text-white/50 text-sm font-sans leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
