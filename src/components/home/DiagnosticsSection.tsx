"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BrainCircuit, Waves, FlaskConical, HeartPulse, ScanLine, ArrowRight } from "lucide-react";
import { DIAGNOSTICS } from "@/constants/disorders";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { NeuralBackground } from "@/components/shared/NeuralBackground";
import { Badge } from "@/components/ui/Badge";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BrainCircuit, Waves, FlaskConical, HeartPulse, ScanLine,
};

export function DiagnosticsSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-hero-gradient overflow-hidden">
      <NeuralBackground className="opacity-50" nodeCount={25} />

      <div className="container-custom relative z-10">
        <SectionHeader
          eyebrow="Diagnostic Facilities"
          title="Advanced Neuro Diagnostics Under One Roof"
          subtitle="Five specialized diagnostic services for comprehensive neurological assessment — all available in-house for rapid and accurate evaluation."
          dark
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIAGNOSTICS.map((diag, index) => {
            const IconComp = iconMap[diag.icon] || BrainCircuit;

            return (
              <motion.div
                key={diag.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group glass-card p-8 hover:bg-brand-orange/[0.12] hover:border-brand-orange/40 hover:-translate-y-1.5 transition-all duration-300 ${
                  index >= 3 ? "lg:col-span-1 lg:mx-auto lg:w-full lg:max-w-md" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-xl bg-brand-orange/20 flex items-center justify-center">
                    <IconComp size={26} className="text-brand-orange" />
                  </div>
                  <Badge variant="glass" className="text-[10px]">
                    {diag.badge}
                  </Badge>
                </div>

                <h3 className="font-sans font-bold text-white text-lg mb-3">
                  {diag.title}
                </h3>
                <p className="text-white/60 text-sm font-sans leading-relaxed mb-4">
                  {diag.desc}
                </p>

                <span className="flex items-center gap-1.5 text-brand-orange text-sm font-semibold font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={14} />
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/diagnostics"
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-sans font-semibold text-sm px-6 py-3 rounded-xl hover:border-brand-orange hover:text-brand-orange transition-all"
          >
            View All Diagnostics <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
