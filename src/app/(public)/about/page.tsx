"use client";

import { motion } from "framer-motion";
import { Brain, Award, ShieldCheck, HeartPulse, Building2, CheckCircle2, Stethoscope, Activity } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { NeuralBackground } from "@/components/shared/NeuralBackground";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-20" />
      <NeuralBackground />

      <div className="container-custom relative z-10">
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow block mb-3">About Our Institution</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
              Pioneering Neurological Excellence
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-sans">
              Vijaya Neuro Hospital is a premier, dedicated neuro-care center providing state-of-the-art neurological diagnosis, treatment, and physical rehabilitation under one roof.
            </p>
          </motion.div>
        </div>

        {/* Philosophy - Under One Roof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center bg-white/95 rounded-3xl p-8 lg:p-12 border border-navy-100 shadow-md">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2 font-sans">Our Care Philosophy</span>
              <h2 className="font-display font-bold text-3xl text-navy-900 mb-6 leading-tight">
                "Advanced Neurology Diagnosis, Treatment & Rehab — Under One Roof"
              </h2>
              <p className="text-text-body font-sans text-sm sm:text-base leading-relaxed mb-6">
                Too often, neurological patients are forced to travel back and forth between different clinics for consultation, diagnostic labs for tests like EEGs, and separate rehab centers for physical recovery.
              </p>
              <p className="text-text-body font-sans text-sm sm:text-base leading-relaxed mb-6">
                At Vijaya Neuro Hospital, we eliminated this friction. From your initial clinical consultation with a highly qualified neurologist, to high-resolution neuro-diagnostics, to personalized step-down stroke and neuropathy rehabilitation, every single service is unified within our modern facility.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Outpatient Clinic", desc: "Expert neurological consultations", icon: Stethoscope },
                { title: "Neuro-Diagnostics", desc: "Advanced Video EEG and ENMG lab", icon: Activity },
                { title: "Rehabilitation", desc: "Comprehensive motor & speech therapy", icon: Brain },
                { title: "Daycare Beds", desc: "Daycare support for emergency therapies", icon: Building2 },
              ].map((item, idx) => (
                <Card key={idx} className="p-5 border-navy-50 bg-navy-50/20 hover:bg-navy-50/50 transition-colors flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-navy-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-[11px] text-text-muted leading-normal font-sans">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Infrastructure & Facility Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 border-navy-100 bg-white/95 shadow-sm h-full">
              <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-800 mb-6">
                <Building2 size={24} />
              </div>
              <h3 className="font-display font-semibold text-xl text-navy-900 mb-4">Daycare & Emergency Beds</h3>
              <p className="text-text-body font-sans text-sm leading-relaxed">
                Equipped with comfortable day-care observation beds for patients requiring short-term intravenous infusions, post-seizure recovery monitoring, and urgent stroke stabilization.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 border-navy-100 bg-white/95 shadow-sm h-full">
              <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-800 mb-6">
                <HeartPulse size={24} />
              </div>
              <h3 className="font-display font-semibold text-xl text-navy-900 mb-4">In-House Laboratory</h3>
              <p className="text-text-body font-sans text-sm leading-relaxed">
                A fully operational biochemistry and hematology laboratory enabling immediate blood workup, drug level monitoring, and neuro-inflammatory markers testing for prompt decision making.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8 border-navy-100 bg-white/95 shadow-sm h-full">
              <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-800 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-display font-semibold text-xl text-navy-900 mb-4">In-House Pharmacy</h3>
              <p className="text-text-body font-sans text-sm leading-relaxed">
                Our fully stocked, specialized neurology pharmacy ensures that critical and life-saving anti-epileptic drugs, stroke management therapeutics, and pain medications are readily available at all times.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Mission, Vision, and Core Values */}
        <div className="bg-navy-900/40 rounded-3xl border border-white/10 p-8 lg:p-12">
          <SectionHeader
            eyebrow="Our Foundational Pillars"
            title="Vision, Mission & Core Values"
            centered={true}
            dark={true}
          />
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="space-y-4 text-white/80 font-sans">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 mt-1">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Our Mission</h3>
                  <p className="text-sm leading-relaxed">
                    To deliver compassionate, clinical excellence in neuroscience care by integrating cutting-edge diagnostics with comprehensive therapy under the strict guidance of qualified specialists.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-white/80 font-sans">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 mt-1">
                  <Award size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Our Vision</h3>
                  <p className="text-sm leading-relaxed">
                    To be the leading, trust-based neurological center known for transforming patient outcomes through early accurate diagnosis, rapid intervention, and complete physical rehabilitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
