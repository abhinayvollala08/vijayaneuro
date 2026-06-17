"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Stethoscope, ScanLine, Pill, HeartHandshake, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Expert Consultation",
    description: "Comprehensive neurological evaluation by experienced specialists.",
    href: "/appointment",
  },
  {
    icon: ScanLine,
    title: "Advanced Diagnostics",
    description: "Video EEG, ENMG, ECG, Digital X-Ray, and full laboratory services.",
    href: "/diagnostics",
  },
  {
    icon: Pill,
    title: "Specialized Treatment",
    description: "Evidence-based treatment for stroke, epilepsy, migraines, and more.",
    href: "/disorders",
  },
  {
    icon: HeartHandshake,
    title: "Neuro Rehabilitation",
    description: "Personalized recovery programs for every patient's journey.",
    href: "/rehabilitation",
  },
];

export function QuickServices() {
  return (
    <section className="relative -mt-16 z-20 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={service.href}
                className="group block bg-white rounded-2xl p-6 shadow-card border border-border hover:shadow-card-lg hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-gradient flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <service.icon size={22} />
                </div>
                <h3 className="font-sans font-semibold text-navy-700 text-base mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-text-muted font-sans leading-relaxed mb-3">
                  {service.description}
                </p>
                <span className="flex items-center gap-1.5 text-brand-orange text-sm font-semibold font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
