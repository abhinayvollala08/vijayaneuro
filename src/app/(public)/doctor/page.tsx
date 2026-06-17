"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, GraduationCap, Clock, Calendar, CheckCircle2, HeartHandshake, BookOpen } from "lucide-react";
import { SITE } from "@/constants/site";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { NeuralBackground } from "@/components/shared/NeuralBackground";

export default function DoctorProfilePage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-20" />
      <NeuralBackground />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
          
          {/* Left Side: Avatar/Photo & Quick Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 border-navy-100 bg-white/95 shadow-md text-center">
              {/* Photo placeholder with nice gradient styling */}
              <div className="relative w-48 h-48 rounded-2xl mx-auto mb-6 bg-gradient-to-tr from-navy-900 to-brand-orange p-1 shadow-md overflow-hidden">
                <div className="w-full h-full rounded-2xl bg-navy-800 flex items-center justify-center text-white flex-col">
                  <span className="font-display font-bold text-4xl">DV</span>
                  <span className="text-[10px] tracking-wider uppercase opacity-60 mt-1">Dr. Dasari Venkatesh</span>
                </div>
              </div>

              <h1 className="font-display font-bold text-2xl text-navy-900 mb-1">
                Dr. Dasari Venkatesh
              </h1>
              <p className="text-sm font-semibold text-brand-orange uppercase tracking-wider mb-3">
                Consultant Neurologist
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-semibold mb-6">
                <GraduationCap size={14} />
                DNB (Neurology), MD, MBBS
              </div>

              {/* Consultation timings summary */}
              <div className="border-t border-navy-50 pt-6 text-left space-y-4 font-sans text-sm">
                <div className="flex gap-3 items-start">
                  <Clock size={16} className="text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-navy-900 text-xs uppercase tracking-wider">Consultation Hours</h3>
                    <p className="text-text-body mt-1">Morning: {SITE.timings.morning}</p>
                    <p className="text-text-body">Evening: {SITE.timings.evening}</p>
                    <p className="text-brand-orange text-xs mt-1 font-semibold">{SITE.timings.days}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <HeartHandshake size={16} className="text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-navy-900 text-xs uppercase tracking-wider">Focus Areas</h3>
                    <p className="text-text-body mt-1 text-xs">Stroke, Epilepsy (Video EEG), Neuropathies (ENMG), Migraine, Spine Care</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <Link href="/appointment" className="w-full">
                  <Button variant="primary" className="w-full justify-center gap-2">
                    <Calendar size={16} />
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Right Side: Bio, Qualifications & Experience (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Bio & Philosophy */}
            <Card className="p-8 border-navy-100 bg-white/95 shadow-md">
              <h2 className="font-display font-semibold text-2xl text-navy-900 mb-4 flex items-center gap-3">
                <Award className="text-brand-orange w-6 h-6 shrink-0" />
                Physician Overview
              </h2>
              <div className="text-text-body font-sans space-y-4 leading-relaxed">
                <p>
                  Dr. Dasari Venkatesh is a highly respected, DNB-qualified Consultant Neurologist committed to delivering comprehensive, patient-centered neurological care. With extensive training and clinical experience across premier tertiary neurology institutions, he specializes in treating complex cerebrovascular conditions, seizure disorders, and peripheral neuropathies.
                </p>
                <p>
                  Believing in an integrated recovery approach, Dr. Venkatesh established Vijaya Neuro Hospital to house advanced clinical diagnostics (such as Video EEG and ENMG profiling) and a dedicated rehabilitation unit within a single facility. This "under one roof" model ensures that patients receive immediate, precise intervention followed by structured recovery support.
                </p>
              </div>
            </Card>

            {/* Academic & Credentials Details */}
            <Card className="p-8 border-navy-100 bg-white/95 shadow-md">
              <h2 className="font-display font-semibold text-2xl text-navy-900 mb-6 flex items-center gap-3">
                <GraduationCap className="text-brand-orange w-6 h-6 shrink-0" />
                Education & Credentials
              </h2>
              <div className="space-y-4 font-sans">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center text-navy-800 shrink-0 mt-1">
                    <span className="font-bold text-xs">DNB</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-sm">DNB (Neurology)</h3>
                    <p className="text-xs text-text-muted">National Board of Examinations, India — Specialization in Neurological Disorders</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-t border-navy-50 pt-4">
                  <div className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center text-navy-800 shrink-0 mt-1">
                    <span className="font-bold text-xs">MD</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-sm">MD (General Medicine)</h3>
                    <p className="text-xs text-text-muted">Post-Graduate Clinical Residency and Thesis Research</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-t border-navy-50 pt-4">
                  <div className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center text-navy-800 shrink-0 mt-1">
                    <span className="font-bold text-xs">MBBS</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-sm">MBBS</h3>
                    <p className="text-xs text-text-muted">Undergraduate Medical Education & Compulsory Rotary Internship</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Scientific Contributions & Affiliations */}
            <Card className="p-8 border-navy-100 bg-white/95 shadow-md">
              <h2 className="font-display font-semibold text-2xl text-navy-900 mb-6 flex items-center gap-3">
                <BookOpen className="text-brand-orange w-6 h-6 shrink-0" />
                Academic Contributions & Affiliations
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Life Member of Indian Academy of Neurology (IAN)",
                  "Active participant in National Stroke Registry forums",
                  "Published research papers on stroke recovery and electrodiagnostics",
                  "Regular speaker at state-level neurological symposia",
                  "Committed to community awareness programs for epilepsy and stroke prevention",
                  "Participant in ongoing medical education and clinical research trials",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-text-body leading-relaxed font-sans">
                    <CheckCircle2 size={14} className="text-brand-orange shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
