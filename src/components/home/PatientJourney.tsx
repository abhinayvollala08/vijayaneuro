"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";

const steps = [
  { step: 1, title: "Book Appointment", description: "Schedule online, via phone, or WhatsApp.", highlighted: false },
  { step: 2, title: "Consultation", description: "Detailed evaluation by our neurologist.", highlighted: false },
  { step: 3, title: "Diagnostics", description: "In-house EEG, ENMG, Lab & imaging.", highlighted: true },
  { step: 4, title: "Diagnosis", description: "Clear explanation of your condition.", highlighted: false },
  { step: 5, title: "Treatment Plan", description: "Personalized, evidence-based care.", highlighted: false },
  { step: 6, title: "Recovery & Follow-Up", description: "Rehabilitation and ongoing support.", highlighted: false },
];

export function PatientJourney() {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Your Journey"
          title="What to Expect at Vijaya Neuro Hospital"
          subtitle="From your first appointment to full recovery — a clear, supportive path every step of the way."
        />

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-orange via-navy-400 to-navy-700" />

            <div className="grid grid-cols-6 gap-4 relative">
              {steps.map((s, index) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-medium text-lg relative z-10 ${
                      s.highlighted
                        ? "bg-orange-gradient text-white shadow-orange"
                        : "bg-navy-700 text-white"
                    }`}
                  >
                    {s.step}
                  </div>
                  <h3 className="font-sans font-semibold text-navy-700 text-sm mt-4 mb-1">
                    {s.title}
                  </h3>
                  <p className="text-text-muted text-xs font-sans leading-relaxed">
                    {s.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((s, index) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-start gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-medium text-base shrink-0 ${
                    s.highlighted
                      ? "bg-orange-gradient text-white shadow-orange"
                      : "bg-navy-700 text-white"
                  }`}
                >
                  {s.step}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-8 bg-navy-100 mt-2" />
                )}
              </div>
              <div className="pt-2">
                <h3 className="font-sans font-semibold text-navy-700 text-sm">
                  {s.title}
                </h3>
                <p className="text-text-muted text-sm font-sans">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
