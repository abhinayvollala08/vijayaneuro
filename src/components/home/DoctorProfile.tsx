"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Calendar } from "lucide-react";
import { SITE } from "@/constants/site";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/Button";

const expertise = [
  "Stroke Management & Prevention",
  "Epilepsy & Seizure Disorders",
  "Migraine & Chronic Headaches",
  "Paralysis & Motor Recovery",
  "Memory Loss & Dementia",
  "Vertigo & Balance Disorders",
  "Neuropathy & Nerve Weakness",
  "Spinal & Back Disorders",
];

export function DoctorProfile() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full bg-brand-orange/[0.12] blur-2xl pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-navy-700 to-navy-900 p-12">
              <div className="text-center text-white">
                <div className="w-36 h-36 rounded-full bg-navy-600/50 border-4 border-brand-orange/30 flex items-center justify-center mx-auto mb-8">
                  <Brain size={56} className="text-brand-orange" />
                </div>
                <p className="font-display font-bold text-3xl">{SITE.doctor.name}</p>
                <p className="font-sans text-brand-orange font-medium mt-2">{SITE.doctor.specialty}</p>
                <p className="font-sans text-white/60 text-sm mt-1">{SITE.doctor.quals}</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 left-8 bg-white rounded-2xl px-5 py-3 shadow-card-lg border-l-4 border-brand-orange">
              <p className="font-sans font-semibold text-navy-700 text-sm">
                {SITE.doctor.experience}
              </p>
            </div>
          </motion.div>

          {/* Right: Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionHeader
              eyebrow="Lead Neurologist"
              title={SITE.doctor.name}
              centered={false}
            />

            <p className="text-brand-orange font-sans font-semibold text-base mb-4">
              {SITE.doctor.title} · {SITE.doctor.specialty}
            </p>

            {/* Qualification pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {SITE.doctor.quals.split(", ").map((qual) => (
                <span
                  key={qual}
                  className="bg-navy-50 text-navy-700 font-sans font-medium text-sm px-4 py-1.5 rounded-full"
                >
                  {qual}
                </span>
              ))}
            </div>

            <p className="text-text-body font-sans leading-relaxed mb-4">
              {SITE.doctor.name} is a distinguished neurologist with extensive training
              in both general medicine and neurology. With dual DNB qualifications,
              he brings comprehensive expertise to the diagnosis and management of
              complex neurological conditions.
            </p>
            <p className="text-text-body font-sans leading-relaxed mb-8">
              Formerly a resident at Care Hospital, Hyderabad — one of India&apos;s premier
              healthcare institutions — Dr. Venkatesh gained invaluable experience
              in acute neurology, stroke management, and epilepsy care before
              establishing Vijaya Neuro Hospital.
            </p>

            {/* Expertise grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-8">
              {expertise.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                  <span className="text-sm font-sans text-text-body">{item}</span>
                </div>
              ))}
            </div>

            <Button asChild>
              <Link href="/appointment">
                <Calendar size={16} />
                Schedule Consultation
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
