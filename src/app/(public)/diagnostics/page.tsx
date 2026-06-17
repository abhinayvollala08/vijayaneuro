"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BrainCircuit, Waves, FlaskConical, HeartPulse, ScanLine, Calendar, ChevronRight, CheckCircle2 } from "lucide-react";
import { DIAGNOSTICS } from "@/constants/disorders";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { NeuralBackground } from "@/components/shared/NeuralBackground";

const iconMap: Record<string, any> = {
  BrainCircuit,
  Waves,
  FlaskConical,
  HeartPulse,
  ScanLine,
};

// Detailed diagnostics prep data
const diagnosticsDetail = {
  "video-eeg": {
    indications: [
      "Diagnosing epilepsy and classifying seizure types",
      "Differentiating epilepsy from nonepileptic events (e.g., syncope, psychogenic events)",
      "Locating the seizure focus in patients preparing for surgery",
      "Evaluating unexplained changes in consciousness",
    ],
    prep: [
      "Wash your hair with shampoo the night before or morning of the test. Do not use oils, gels, conditioners, or sprays.",
      "Avoid caffeine (coffee, tea, cola, chocolate) for at least 12 hours prior.",
      "Take your usual medications unless explicitly instructed otherwise by Dr. Venkatesh.",
      "Get sleep-deprived if advised (sometimes requested to trigger abnormalities during the test).",
    ],
  },
  "enmg": {
    indications: [
      "Diagnosing peripheral neuropathies and carpal tunnel syndrome",
      "Evaluating muscle weakness, cramping, or twitching",
      "Identifying nerve root compression in neck (cervical) or back (lumbar) disorders",
      "Assessing neuromuscular junction disorders (e.g., Myasthenia Gravis)",
    ],
    prep: [
      "Bathe or shower to remove skin oils. Do not apply lotions, creams, or body oils on your arms and legs.",
      "Wear loose, comfortable clothing; you may be asked to change into a clinical gown.",
      "Inform the technician if you have a pacemaker, take blood thinners (like Warfarin/Aspirin), or have a bleeding disorder.",
    ],
  },
  "laboratory": {
    indications: [
      "Monitoring levels of anti-epileptic drugs (AEDs) in the bloodstream",
      "Biochemical and metabolic screening for systemic causes of neuropathy",
      "Cerebrospinal fluid (CSF) analysis for meningitis, encephalitis, or auto-immune neuro conditions",
      "Routine pre-operative and general health profiles",
    ],
    prep: [
      "For fasting tests (like fasting glucose or lipid profiles), do not eat or drink anything except water for 10-12 hours before.",
      "Take anti-epileptic medications at their exact scheduled time, especially when testing drug trough levels.",
    ],
  },
  "ecg": {
    indications: [
      "Stroke etiology workup (checking for atrial fibrillation or arrhythmias)",
      "Evaluating unexplained fainting (syncope) or dizziness",
      "Cardiovascular pre-assessment before initiating specific neuro-therapies",
    ],
    prep: [
      "No special dietary preparation is required.",
      "Avoid applying greasy body lotions on the chest area.",
    ],
  },
  "digital-xray": {
    indications: [
      "Evaluating cervical spine spondylosis and neck pain",
      "Assessing lumbar spine slip-disc, alignment, or osteoarthritis",
      "Skull imaging for trauma or structural bone abnormalities",
    ],
    prep: [
      "You will need to remove metal items (necklaces, jewelry, clothing with zippers) that could interfere with the X-ray image.",
      "Inform the staff if you are or might be pregnant.",
    ],
  },
};

export default function DiagnosticsPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-20" />
      <NeuralBackground />

      <div className="container-custom relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow block mb-3">Diagnostic Capability</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
              Advanced Neuro-Diagnostics
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-sans">
              Accurate diagnostics are the foundation of successful neurological treatment. We feature state-of-the-art diagnostic utilities directly in our facility.
            </p>
          </motion.div>
        </div>

        {/* Diagnostics Directory */}
        <div className="space-y-12">
          {DIAGNOSTICS.map((diag, index) => {
            const IconComponent = iconMap[diag.icon] || BrainCircuit;
            const detail = diagnosticsDetail[diag.id as keyof typeof diagnosticsDetail];

            return (
              <motion.div
                key={diag.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
              >
                <Card className="p-8 border-navy-100 bg-white/95 shadow-md">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Basic Info */}
                    <div className="lg:w-1/3 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                          <IconComponent size={24} />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-brand-orange tracking-widest">{diag.badge}</span>
                          <h2 className="font-display font-bold text-2xl text-navy-900">{diag.title}</h2>
                        </div>
                      </div>
                      <p className="text-text-body font-sans text-sm leading-relaxed">
                        {diag.desc}
                      </p>
                      <div className="pt-2">
                        <Link href="/appointment">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Calendar size={14} />
                            Schedule Test
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Middle: Clinical Indications */}
                    <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-navy-50 lg:pl-8 pt-6 lg:pt-0">
                      <h3 className="font-display font-bold text-navy-800 text-base mb-3">Common Indications</h3>
                      <ul className="space-y-2.5">
                        {detail?.indications.map((ind, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-text-body leading-relaxed">
                            <CheckCircle2 size={14} className="text-brand-orange shrink-0 mt-0.5" />
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Patient Prep */}
                    <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-navy-50 lg:pl-8 pt-6 lg:pt-0">
                      <h3 className="font-display font-bold text-navy-800 text-base mb-3">Patient Prep Instructions</h3>
                      <ul className="space-y-2.5">
                        {detail?.prep.map((prepInst, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-text-muted leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-navy-50 text-navy-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                            <span>{prepInst}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
