"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  Zap,
  PersonStanding,
  Brain,
  CircleDot,
  Compass,
  Waves,
  Link as LinkIcon,
  Hand,
  Ear,
  HeartPulse,
  Bone,
  ArrowRight,
  Search,
} from "lucide-react";
import { DISORDERS } from "@/constants/disorders";
import { NeuralBackground } from "@/components/shared/NeuralBackground";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const iconMap: Record<string, any> = {
  Activity,
  Zap,
  PersonStanding,
  Brain,
  CircleDot,
  Compass,
  Waves,
  Link: LinkIcon,
  Hand,
  Ear,
  HeartPulse,
  Bone,
};

export default function DisordersHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "primary" | "supportive">("all");

  const filteredDisorders = DISORDERS.filter((disorder) => {
    const matchesSearch =
      disorder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disorder.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === "primary") {
      return disorder.slug !== "";
    }
    if (filterType === "supportive") {
      return disorder.slug === "";
    }
    return true;
  });

  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-20" />
      <NeuralBackground />

      <div className="container-custom relative z-10">
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow block mb-3">Neurological Expertise</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
              Neurological Disorders & Treatments
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-sans">
              Comprehensive outpatient and inpatient care for a full spectrum of brain, spine, muscle, and nerve conditions under the guidance of Dr. Dasari Venkatesh.
            </p>
          </motion.div>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search disorders, symptoms, or treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "All Conditions" },
              { id: "primary", label: "Core Specialties" },
              { id: "supportive", label: "Other Symptoms & Diseases" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filterType === tab.id
                    ? "bg-brand-orange text-white shadow-orange"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Disorders Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDisorders.map((disorder, index) => {
            const IconComponent = iconMap[disorder.icon] || Brain;
            const hasDetail = disorder.slug !== "";

            return (
              <motion.div
                key={disorder.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                className="h-full"
              >
                <Card
                  className={`p-6 bg-white/95 border border-navy-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group ${
                    hasDetail ? "hover:border-brand-orange/40" : ""
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-800 shrink-0 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-navy-900 group-hover:text-navy-700 transition-colors">
                        {disorder.title}
                      </h3>
                      {hasDetail && (
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-brand-orange">
                          Full Speciality Program
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-text-body text-sm leading-relaxed font-sans mb-6 flex-grow">
                    {disorder.shortDesc}
                  </p>

                  <div className="mt-auto">
                    {hasDetail ? (
                      <Link
                        href={`/disorders/${disorder.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-navy-900 group-hover:text-brand-orange transition-colors"
                      >
                        Read Treatment Protocols
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <span className="text-xs font-semibold text-text-muted italic">
                        Informational Profile & Consultation Care
                      </span>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredDisorders.length === 0 && (
          <div className="text-center py-20 text-white/50">
            <p className="text-lg mb-2">No matching conditions found.</p>
            <p className="text-sm">Try modifying your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
