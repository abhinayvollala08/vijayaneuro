"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity, Zap, PersonStanding, Brain, CircleDot,
  Compass, Waves, Link as LinkIcon, Hand, Ear,
  HeartPulse, Bone, ArrowRight,
} from "lucide-react";
import { DISORDERS } from "@/constants/disorders";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/Badge";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Activity, Zap, PersonStanding, Brain, CircleDot,
  Compass, Waves, Link: LinkIcon, Hand, Ear,
  HeartPulse, Bone,
};

export function DisordersGrid() {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Neurological Disorders"
          title="Conditions We Treat & Cure"
          subtitle="From common headaches to complex neurological conditions — expert diagnosis and evidence-based treatment for every patient."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DISORDERS.map((disorder, index) => {
            const IconComp = iconMap[disorder.icon] || Brain;
            const hasPage = disorder.slug !== "";

            return (
              <motion.div
                key={disorder.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                {hasPage ? (
                  <Link
                    href={`/disorders/${disorder.slug}`}
                    className="group relative block bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Top accent bar */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[3px] bg-brand-orange transition-transform duration-300 origin-left ${
                        disorder.priority ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />

                    {disorder.priority && (
                      <Badge variant="orange" className="absolute top-4 right-4 text-[10px]">
                        Specialist
                      </Badge>
                    )}

                    <div className="w-12 h-12 rounded-xl bg-navy-50 group-hover:bg-orange-50 flex items-center justify-center transition-colors mb-4">
                      <IconComp size={22} className="text-navy-700 group-hover:text-brand-orange transition-colors" />
                    </div>

                    <h3 className="font-sans font-semibold text-navy-700 text-[15px] mb-2">
                      {disorder.title}
                    </h3>
                    <p className="text-text-muted text-sm font-sans leading-relaxed">
                      {disorder.shortDesc}
                    </p>

                    <span className="flex items-center gap-1.5 text-brand-orange text-sm font-semibold font-sans mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ArrowRight size={14} />
                    </span>
                  </Link>
                ) : (
                  <div className="group relative bg-white rounded-2xl p-6 border border-border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-4">
                      <IconComp size={22} className="text-navy-700" />
                    </div>
                    <h3 className="font-sans font-semibold text-navy-700 text-[15px] mb-2">
                      {disorder.title}
                    </h3>
                    <p className="text-text-muted text-sm font-sans leading-relaxed">
                      {disorder.shortDesc}
                    </p>
                  </div>
                )}
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
            href="/disorders"
            className="inline-flex items-center gap-2 border-2 border-navy-700 text-navy-700 font-sans font-semibold text-sm px-6 py-3 rounded-xl hover:bg-navy-700 hover:text-white transition-all"
          >
            View All Disorders <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
