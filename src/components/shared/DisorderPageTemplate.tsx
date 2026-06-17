"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, CheckCircle2, ArrowLeft, Calendar, FileText, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { NeuralBackground } from "@/components/shared/NeuralBackground";

interface DisorderPageProps {
  title: string;
  shortDesc: string;
  overview: string;
  symptoms: string[];
  diagnostics: string[];
  treatments: string[];
  slug: string;
}

const allDisorders = [
  { slug: "stroke-treatment", title: "Stroke Management" },
  { slug: "epilepsy-treatment", title: "Epilepsy / Seizure Care" },
  { slug: "paralysis-treatment", title: "Paralysis Treatment" },
  { slug: "migraine-treatment", title: "Migraine & Headaches" },
  { slug: "memory-loss-treatment", title: "Memory Loss / Dementia" },
  { slug: "vertigo-treatment", title: "Dizziness & Vertigo" },
  { slug: "neuropathy-treatment", title: "Neuropathy & Nerve Weakness" },
  { slug: "spinal-disorders", title: "Spinal & Back Disorders" },
];

export function DisorderPageTemplate({
  title,
  shortDesc,
  overview,
  symptoms,
  diagnostics,
  treatments,
  slug,
}: DisorderPageProps) {
  const otherDisorders = allDisorders.filter((d) => d.slug !== slug);

  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-20" />
      <NeuralBackground />

      <div className="container-custom relative z-10">
        {/* Back Link */}
        <Link
          href="/disorders"
          className="inline-flex items-center gap-2 text-white/60 hover:text-brand-orange mb-8 transition-colors group text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Treatments
        </Link>

        {/* Hero Header */}
        <div className="max-w-4xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow block mb-3">Neurological Specialty</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
              {title}
            </h1>
            <p className="text-white/70 text-lg sm:text-xl font-sans leading-relaxed">
              {shortDesc}
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-8 border-navy-100 bg-white/95 shadow-md">
                <h2 className="font-display font-semibold text-2xl text-navy-900 mb-4 flex items-center gap-3">
                  <Brain className="text-brand-orange w-6 h-6 shrink-0" />
                  Condition Overview
                </h2>
                <div className="text-text-body font-sans space-y-4 leading-relaxed whitespace-pre-line">
                  {overview}
                </div>
              </Card>
            </motion.div>

            {/* Symptoms & Signs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-8 border-navy-100 bg-white/95 shadow-md">
                <h2 className="font-display font-semibold text-2xl text-navy-900 mb-6">
                  Common Symptoms & Warning Signs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <span className="text-text-body text-sm font-medium">{symptom}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Diagnostics & Treatment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Diagnostics */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-6 border-navy-100 bg-white/95 shadow-md h-full flex flex-col">
                  <h3 className="font-display font-semibold text-xl text-navy-900 mb-4 flex items-center gap-2">
                    <Activity className="text-brand-orange w-5 h-5 shrink-0" />
                    How We Diagnose
                  </h3>
                  <ul className="space-y-3 flex-grow">
                    {diagnostics.map((test, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-2" />
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              {/* Treatment Protocols */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-6 border-navy-100 bg-white/95 shadow-md h-full flex flex-col">
                  <h3 className="font-display font-semibold text-xl text-navy-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-brand-orange w-5 h-5 shrink-0" />
                    Our Treatment Approach
                  </h3>
                  <ul className="space-y-3 flex-grow">
                    {treatments.map((treatment, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-navy-500 shrink-0 mt-2" />
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Booking & Sidebar Navigation */}
          <div className="space-y-6">
            {/* Quick Action Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6 border-navy-100 bg-white/95 shadow-md text-center">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-brand-orange w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-xl text-navy-900 mb-2">
                  Need Consultation?
                </h3>
                <p className="text-sm text-text-muted mb-6">
                  Schedule an appointment with Dr. Dasari Venkatesh for a comprehensive neurological examination.
                </p>
                <div className="flex flex-col gap-3">
                  <Link href="/appointment" className="w-full">
                    <Button variant="primary" className="w-full justify-center">
                      Book Appointment
                    </Button>
                  </Link>
                  <a href="https://wa.me/919121568899" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full justify-center text-emerald-600 border-emerald-600/30 hover:bg-emerald-50">
                      WhatsApp Booking
                    </Button>
                  </a>
                </div>
              </Card>
            </motion.div>

            {/* Other Specialties Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="p-6 border-navy-100 bg-white/95 shadow-md">
                <h3 className="font-display font-semibold text-lg text-navy-900 mb-4">
                  Other Specialties
                </h3>
                <div className="flex flex-col divide-y divide-navy-50">
                  {otherDisorders.map((disorder) => (
                    <Link
                      key={disorder.slug}
                      href={`/disorders/${disorder.slug}`}
                      className="py-3 flex items-center justify-between group hover:text-brand-orange transition-colors"
                    >
                      <span className="text-sm font-medium text-text-body group-hover:text-brand-orange">
                        {disorder.title}
                      </span>
                      <ChevronRight size={16} className="text-text-subtle group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
