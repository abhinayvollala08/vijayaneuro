"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Activity, Zap, PersonStanding, Brain, CircleDot,
  Compass, Waves, Link as LinkIcon, Hand, Ear,
  HeartPulse, Bone, ArrowRight,
} from "lucide-react";
import { DISORDERS } from "@/constants/disorders";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Activity, Zap, PersonStanding, Brain, CircleDot,
  Compass, Waves, Link: LinkIcon, Hand, Ear,
  HeartPulse, Bone,
};

const categories = [
  { id: "all", label: "All Conditions" },
  { id: "core", label: "Emergency & Brain Care" },
  { id: "nerve", label: "Nerve & Spinal Care" },
  { id: "chronic", label: "Chronic & Sensory Care" }
];

export function DisordersGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredDisorders = DISORDERS.filter((disorder) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "core") {
      return ["stroke-treatment", "epilepsy-treatment", "paralysis-treatment"].includes(disorder.slug);
    }
    if (activeCategory === "nerve") {
      return ["neuropathy-treatment", "spinal-disorders"].includes(disorder.slug) ||
             disorder.title.includes("Numbness") ||
             disorder.title.includes("Neck");
    }
    if (activeCategory === "chronic") {
      return ["migraine-treatment", "memory-loss-treatment", "vertigo-treatment"].includes(disorder.slug) ||
             disorder.title.includes("Chronic") ||
             disorder.title.includes("Hearing");
    }
    return true;
  });

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Neurological Disorders"
          title="Conditions We Treat & Cure"
          subtitle="From common headaches to complex neurological conditions — expert diagnosis and evidence-based treatment for every patient."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold font-sans transition-all duration-300 cursor-pointer border",
                activeCategory === cat.id
                  ? "bg-brand-orange border-brand-orange text-white shadow-orange"
                  : "bg-white border-border text-navy-700 hover:border-brand-orange hover:text-brand-orange"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredDisorders.map((disorder, index) => {
              const IconComp = iconMap[disorder.icon] || Brain;
              const hasPage = disorder.slug !== "";

              return (
                <motion.div
                  layout
                  key={disorder.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {hasPage ? (
                    <Link
                      href={`/disorders/${disorder.slug}`}
                      className="group relative block h-full bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
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
                      <p className="text-text-muted text-sm font-sans leading-relaxed mb-4">
                        {disorder.shortDesc}
                      </p>

                      <span className="flex items-center gap-1.5 text-brand-orange text-sm font-semibold font-sans transition-colors group-hover:text-brand-orange-dark">
                        Learn More <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ) : (
                    <div className="group relative h-full bg-white rounded-2xl p-6 border border-border shadow-sm">
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
          </AnimatePresence>
        </motion.div>

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
