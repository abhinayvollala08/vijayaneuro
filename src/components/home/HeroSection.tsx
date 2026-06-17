"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Phone, Brain, Activity, Shield, Waves } from "lucide-react";
import { SITE } from "@/constants/site";
import { NeuralBackground } from "@/components/shared/NeuralBackground";
import { EEGWave } from "@/components/shared/EEGWave";

const floatingCards = [
  { icon: Waves, label: "Video EEG", delay: 0.4, pos: "top-16 right-8" as const },
  { icon: Activity, label: "Stroke Care", delay: 0.6, pos: "top-48 right-[-16px]" as const },
  { icon: Brain, label: "ENMG Testing", delay: 0.8, pos: "bottom-32 right-4" as const },
  { icon: Shield, label: "Neuro Rehab", delay: 1.0, pos: "bottom-16 left-[-8px]" as const },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      <NeuralBackground />
      <EEGWave className="absolute bottom-0 left-0 right-0 h-32 opacity-20" />

      {/* Radial glows */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-navy-600/30 blur-3xl pointer-events-none" />
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-orange/10 blur-2xl pointer-events-none" />

      <div className="container-custom py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-white"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.15] rounded-full px-4 py-2 text-sm mb-8"
            >
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-white/80 font-sans font-medium tracking-wide">
                Vijaya Neuro Hospital — Specialized Neuro Care
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-display font-bold leading-[1.08] mb-6 text-[clamp(36px,6vw,68px)]"
            >
              Expert Neurology{" "}
              <span className="block">Care Powered by</span>
              <span className="text-brand-orange block">
                Advanced Diagnostics
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/75 text-lg font-sans leading-relaxed max-w-[540px] mb-8"
            >
              Comprehensive diagnosis, treatment, and rehabilitation for stroke,
              epilepsy, migraines, nerve disorders, memory problems, spinal
              conditions, and chronic neurological diseases.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2.5 mb-10"
            >
              {[
                "Stroke Specialist",
                "Epilepsy Expert",
                "Video EEG Facility",
                "ENMG Testing",
                "Neuro Rehabilitation",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/[0.08] border border-white/[0.12] rounded-full px-3 py-1.5"
                >
                  <span className="text-brand-orange text-sm">✓</span>
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                href="/appointment"
                className="flex items-center gap-2.5 bg-brand-orange hover:bg-orange-600 text-white font-sans font-semibold text-base px-7 py-4 rounded-xl shadow-orange transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(246,125,32,0.45)]"
              >
                <Calendar size={18} />
                Book Appointment
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-2.5 border-2 border-white/30 text-white font-sans font-semibold text-base px-7 py-4 rounded-xl hover:border-brand-orange hover:text-brand-orange transition-all"
              >
                <Phone size={18} />
                Call Now
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-6 sm:gap-8"
            >
              {[
                { value: SITE.stats.patients, label: "Patients Treated" },
                { value: `${SITE.stats.experience} Yrs`, label: "Experience" },
                { value: SITE.stats.diagnostics, label: "Diagnostics" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-10 bg-white/15" />}
                  <div>
                    <p className="font-mono font-medium text-xl sm:text-2xl text-brand-orange leading-none">
                      {s.value}
                    </p>
                    <p className="font-sans text-[10px] sm:text-xs text-white/55 mt-1 uppercase tracking-wider">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Doctor visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-orange/[0.12] blur-2xl" />

            {/* Doctor card placeholder */}
            <div className="relative z-10 w-[380px] h-[500px] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
              <div className="w-full h-full bg-gradient-to-br from-navy-600 to-navy-800 flex flex-col items-center justify-center text-white p-8">
                <div className="w-32 h-32 rounded-full bg-navy-500/50 border-4 border-brand-orange/30 flex items-center justify-center mb-6">
                  <Brain size={48} className="text-brand-orange" />
                </div>
                <p className="font-display font-bold text-2xl text-center">
                  {SITE.doctor.name}
                </p>
                <p className="font-sans text-sm text-white/70 text-center mt-2">
                  {SITE.doctor.quals}
                </p>
                <p className="font-sans text-sm text-brand-orange font-medium mt-1">
                  {SITE.doctor.specialty}
                </p>
              </div>

              {/* Credential overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white">
                <p className="font-display font-bold text-lg">
                  {SITE.doctor.name}
                </p>
                <p className="font-sans text-sm text-white/70">
                  DNB Neurology · {SITE.doctor.specialty}
                </p>
              </div>
            </div>

            {/* Floating cards */}
            {floatingCards.map((card) => (
              <motion.div
                key={card.label}
                className={`absolute ${card.pos} bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 z-20`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: card.delay, duration: 0.5 }}
              >
                <div className="w-9 h-9 bg-brand-orange/20 rounded-lg flex items-center justify-center text-brand-orange">
                  <card.icon size={18} />
                </div>
                <span className="font-sans text-sm font-medium text-white">
                  {card.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-sans text-xs uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
