"use client";

import { motion } from "framer-motion";
import { Activity, Brain, Dumbbell, MessageSquare, Pill, Users, Zap } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const programs = [
  { icon: Activity, title: "Stroke Rehabilitation", desc: "Motor recovery and functional independence after stroke." },
  { icon: Brain, title: "Cognitive Therapy", desc: "Memory, attention, and executive function training." },
  { icon: Dumbbell, title: "Physiotherapy", desc: "Strength, balance, and coordination exercises." },
  { icon: MessageSquare, title: "Speech Therapy", desc: "Language and swallowing disorder rehabilitation." },
  { icon: Users, title: "Occupational Therapy", desc: "Daily living skills and adaptive techniques." },
  { icon: Pill, title: "Medication Management", desc: "Ongoing pharmacological optimization for recovery." },
  { icon: Zap, title: "Nerve Stimulation", desc: "Therapeutic electrical stimulation for nerve recovery." },
];

export function RehabSection() {
  return (
    <section className="py-20 lg:py-28 bg-navy-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="Neuro Rehabilitation"
              title="Recovery That Goes Beyond Treatment"
              centered={false}
            />
            <p className="text-text-body font-sans leading-relaxed mb-4">
              At Vijaya Neuro Hospital, we believe treatment doesn&apos;t end with a diagnosis.
              Our comprehensive rehabilitation programs are designed to help every patient
              regain maximum function and independence.
            </p>
            <p className="text-text-body font-sans leading-relaxed mb-8">
              Each program is personalized based on the patient&apos;s specific condition,
              severity, and recovery goals — ensuring the best possible outcomes.
            </p>

            <div className="space-y-3">
              {programs.map((program, index) => (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 border-l-4 border-brand-orange shadow-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                    <program.icon size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-navy-700 text-sm">
                      {program.title}
                    </h3>
                    <p className="text-text-muted text-sm font-sans">{program.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-6 -right-6 w-64 h-64 rounded-full bg-brand-orange/[0.08] blur-3xl pointer-events-none" />

            <div className="relative bg-navy-gradient rounded-2xl p-10 text-white shadow-card-lg">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <Activity size={36} className="text-brand-orange" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-3">
                  Personalized Recovery
                </h3>
                <p className="text-white/65 font-sans text-sm leading-relaxed mb-8">
                  Every rehabilitation plan is tailored to the patient&apos;s
                  unique needs, condition, and recovery timeline.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "90%", label: "Recovery Rate" },
                    { val: "7+", label: "Programs" },
                    { val: "1:1", label: "Patient Care" },
                    { val: "Daily", label: "Monitoring" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/[0.08] rounded-xl p-4"
                    >
                      <p className="font-mono font-medium text-2xl text-brand-orange">
                        {stat.val}
                      </p>
                      <p className="text-white/50 text-xs font-sans mt-1 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
