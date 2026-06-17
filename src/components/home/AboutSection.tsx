"use client";

import { motion } from "framer-motion";
import { Brain, Stethoscope, Users, Award, Clock } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SITE } from "@/constants/site";
import { useIntersection } from "@/hooks/useIntersection";
import { useEffect, useState } from "react";

const features = [
  {
    icon: Stethoscope,
    title: "Specialist-Led Care",
    desc: "Every patient is treated by a qualified neurologist with years of clinical experience.",
  },
  {
    icon: Brain,
    title: "Advanced Diagnostics",
    desc: "In-house Video EEG, ENMG, ECG, Digital X-Ray, and full laboratory for comprehensive evaluation.",
  },
  {
    icon: Users,
    title: "Patient-Centric Approach",
    desc: "We take time to explain diagnoses and treatment plans in simple, understandable language.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    desc: "Trusted by thousands of patients for expert neurological care and rehabilitation.",
  },
  {
    icon: Clock,
    title: "Timely Intervention",
    desc: "Rapid assessment and emergency protocols for time-sensitive conditions like stroke.",
  },
];

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isIntersecting } = useIntersection({ threshold: 0.5 });

  useEffect(() => {
    if (!isIntersecting) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isIntersecting, end, duration]);

  return (
    <div ref={ref}>
      <span className="font-mono font-medium text-3xl sm:text-4xl text-brand-orange">
        {count.toLocaleString()}{suffix}
      </span>
    </div>
  );
}

const stats = [
  { value: 10000, suffix: "+", label: "Patients Treated" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "", label: "Diagnostics" },
  { value: 4.9, suffix: "/5", label: "Patient Rating" },
];

export function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
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
              eyebrow="About Vijaya Neuro Hospital"
              title="Advanced Neurological Care Under One Roof"
              centered={false}
            />

            <p className="text-text-body font-sans leading-relaxed mb-4">
              Vijaya Neuro Hospital is a dedicated neurology center providing
              comprehensive diagnostic, therapeutic, and rehabilitative services
              for all neurological conditions. Founded with the vision of making
              expert neuro care accessible, we combine advanced technology with
              compassionate, patient-first treatment.
            </p>
            <p className="text-text-body font-sans leading-relaxed mb-8">
              Led by <strong className="text-navy-700">{SITE.doctor.name}</strong>,
              a DNB-qualified neurologist with extensive experience in stroke
              management and epilepsy care, our hospital offers five in-house
              diagnostic facilities ensuring rapid and accurate assessments.
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center shrink-0">
                    <feature.icon size={18} className="text-navy-700" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-navy-700 text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted text-sm font-sans leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-8 -right-8 w-72 h-72 rounded-full bg-brand-orange/[0.08] blur-3xl pointer-events-none" />

            {/* Main card */}
            <div className="relative bg-navy-gradient rounded-2xl p-8 text-white shadow-card-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Brain size={24} className="text-brand-orange" />
                </div>
                <div>
                  <p className="font-display font-bold text-xl">Specialized</p>
                  <p className="text-white/60 text-sm font-sans">
                    Neurology Center
                  </p>
                </div>
              </div>
              <p className="text-white/70 text-sm font-sans leading-relaxed mb-6">
                One of the few dedicated neurology hospitals with five in-house
                diagnostic facilities — offering complete neurological workup
                under one roof.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Video EEG", "ENMG", "ECG", "Digital X-Ray"].map((diag) => (
                  <div
                    key={diag}
                    className="bg-white/[0.08] rounded-xl px-4 py-3 text-center"
                  >
                    <p className="text-white/90 text-sm font-sans font-medium">
                      {diag}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlapping stat card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-card-lg border border-border max-w-[220px]">
              <p className="font-mono font-medium text-3xl text-brand-orange">
                {SITE.stats.patients}
              </p>
              <p className="text-text-muted text-sm font-sans mt-1">
                Patients trust us
              </p>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
                <span className="text-text-muted text-xs ml-1">
                  {SITE.stats.rating}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats row */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
              />
              <p className="text-text-muted text-sm font-sans mt-2 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
