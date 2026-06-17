"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Dumbbell, Brain, MessageSquare, Activity, ShieldCheck, Calendar, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { NeuralBackground } from "@/components/shared/NeuralBackground";

const rehabPrograms = [
  {
    icon: Brain,
    title: "Post-Stroke Recovery",
    desc: "Intensive rehabilitation program focused on motor retraining, balance, speech therapy, and spasticity relief to help stroke survivors regain independence.",
  },
  {
    icon: Activity,
    title: "Parkinson's Mobility Care",
    desc: "Targeted exercise protocols to manage tremors, stiffness, slow movements (bradykinesia), and walking balance, slowing the impact on daily coordination.",
  },
  {
    icon: Dumbbell,
    title: "Neuropathy Balance Clinic",
    desc: "Specialized sensory stimulation and strength training for peripheral neuropathy patients to prevent foot drop, weakness, and falls.",
  },
  {
    icon: ShieldCheck,
    title: "Spinal Rehab & Pain Relief",
    desc: "Non-surgical physical therapy for neck spondylosis, lumbar slip-disc, sciatica, and chronic back pain to strengthen spinal support muscles.",
  },
  {
    icon: MessageSquare,
    title: "Speech & Language Therapy",
    desc: "Dedicated clinical support for patients suffering from speech difficulties (aphasia, dysarthria) or swallowing issues (dysphagia) following neurological injury.",
  },
  {
    icon: Activity,
    title: "Bell's Palsy & Facial Rehab",
    desc: "Electrical stimulation, facial muscle exercises, and medical support to restore symmetrical facial movement and quicken nerve recovery.",
  },
];

export default function RehabilitationPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-20" />
      <NeuralBackground />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow block mb-3">Therapeutic Recovery</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
              Neuro-Rehabilitation Unit
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-sans">
              Neurological recovery doesn't end with medical treatment. Our clinical rehabilitation services help patients restore motor control, speech, and independence.
            </p>
          </motion.div>
        </div>

        {/* Unified Approach banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-white/95 rounded-3xl p-8 lg:p-12 border border-navy-100 shadow-md"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2 font-sans">Our Methodology</span>
              <h2 className="font-display font-bold text-3xl text-navy-900 mb-6 leading-tight">
                Personalized Step-Down Recovery Programs
              </h2>
              <p className="text-text-body font-sans text-sm sm:text-base leading-relaxed mb-6">
                Every neurological condition affects movement, sensation, and speech differently. That is why we do not believe in generic physical therapy.
              </p>
              <p className="text-text-body font-sans text-sm sm:text-base leading-relaxed mb-6">
                Under the clinical oversight of Dr. Dasari Venkatesh, our physiotherapists and speech therapists design tailored recovery plans. We combine motor training, gait analysis, electrical stimulation, and speech coaching to achieve realistic, positive improvements in daily living.
              </p>
              <div className="pt-2">
                <Link href="/appointment">
                  <Button variant="primary" className="gap-2">
                    <Calendar size={16} />
                    Schedule Rehabilitation Consultation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-display font-bold text-navy-800 text-lg mb-4">Rehabilitation Modalities</h3>
              {[
                { title: "Physical Therapy (PT)", desc: "Focuses on gross motor skills, gait training, muscle strengthening, and joint range of motion." },
                { title: "Occupational Therapy (OT)", desc: "Helps patients adapt to daily tasks like eating, dressing, writing, and utilizing assistive aids." },
                { title: "Speech & Swallowing Therapy", desc: "Aids in vocabulary recovery, articulation correction, and safe swallowing exercises." },
              ].map((modality, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-navy-50/50 border border-navy-50">
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-navy-900 text-sm">{modality.title}</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed font-sans">{modality.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Specialized Programs Grid */}
        <div className="mb-8">
          <SectionHeader
            eyebrow="Targeted Care"
            title="Specialized Rehabilitation Programs"
            centered={true}
            dark={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {rehabPrograms.map((prog, index) => {
              const IconComponent = prog.icon;
              return (
                <motion.div
                  key={prog.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                >
                  <Card className="p-6 border-navy-100 bg-white/95 shadow-sm h-full hover:border-brand-orange/40 transition-colors flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4 shrink-0">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-navy-900 mb-2">{prog.title}</h3>
                    <p className="text-text-body text-xs sm:text-sm font-sans leading-relaxed flex-grow">{prog.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
