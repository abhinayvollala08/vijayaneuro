"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Brain, CheckCircle2, ArrowLeft, Calendar, FileText, ChevronRight, Activity, Clock, ShieldAlert, Sparkles, Printer } from "lucide-react";
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

  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [selectedTestType, setSelectedTestType] = useState("mri_ct");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const timelineSteps = [
    {
      title: "Initial Evaluation",
      desc: "Comprehensive clinical examination of motor, sensory, cognitive, and reflex pathways.",
      prep: "Bring all past medications, prescriptions, and any family medical history details.",
    },
    {
      title: "Diagnostic Mapping",
      desc: "Targeted neuroimaging and electrophysiological tests to localize the brain/nerve issue.",
      prep: "Depends on the test (e.g. clean hair for EEG, metal removal for MRI). See our test prep below.",
    },
    {
      title: "Custom Therapy Plan",
      desc: "Formulation of medical treatments, spasticity controls, or surgical pathways.",
      prep: "Carefully follow dosage and lifestyle adjustments recommended by Dr. Venkatesh.",
    },
    {
      title: "Neuro-Rehabilitation",
      desc: "Dedicated physical, occupational, and cognitive retraining programs to build recovery.",
      prep: "Wear loose clothing. Keep rehabilitation schedules consistent for maximum neuroplastic recovery.",
    },
  ];

  const prepChecklists = {
    mri_ct: {
      name: "Brain / Spine MRI & CT",
      items: [
        "Remove all metallic items: jewelry, watches, keys, eyeglasses, belts, and hairpins.",
        "Wear loose, comfortable clothing without metal zippers or buttons.",
        "Inform staff of any implants (pacemakers, aneurysm clips, metal pins).",
        "Bring all previous scan reports (X-rays, CTs, MRIs) for clinical comparison.",
        "Notify the technician if you are or might be pregnant.",
      ],
    },
    eeg: {
      name: "Video EEG & EEG",
      items: [
        "Wash hair thoroughly the night before. Do NOT apply oils, gels, hairspray, or hair creams.",
        "Avoid caffeinated drinks (coffee, tea, cola) and chocolate for 12 hours prior to the test.",
        "If a sleep-deprived EEG is ordered: sleep only 4 hours the night before the test.",
        "Continue taking regular medications unless specifically told to stop by the doctor.",
        "Have a light meal/snack before the test (low blood sugar can affect EEG patterns).",
      ],
    },
    ncs_emg: {
      name: "Nerve Studies (NCS/EMG)",
      items: [
        "Take a bath or shower to keep skin clean. Do NOT apply lotions, creams, or oils.",
        "Wear loose, warm clothing to ensure limbs are warm (cold limbs slow nerve conduction).",
        "Inform the doctor if you have a pacemaker or are taking blood thinners (aspirin, warfarin).",
        "You can eat and drink normally prior to the test.",
      ],
    },
    blood: {
      name: "Comprehensive Bloods",
      items: [
        "Fast for 8-12 hours if your tests include fasting blood sugar or lipid panels (water is fine).",
        "Inform the clinic of any medications or supplements you took in the morning.",
        "Stay hydrated: drinking water makes veins easier to locate for blood draws.",
      ],
    },
  };

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

            {/* Interactive Treatment Care Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Card className="p-8 border-navy-100 bg-white/95 shadow-md">
                <h2 className="font-display font-semibold text-2xl text-navy-900 mb-4 flex items-center gap-3">
                  <Sparkles className="text-brand-orange w-6 h-6 shrink-0 animate-pulse" />
                  Your Care Pathway Timeline
                </h2>
                <p className="text-sm text-text-muted mb-6">
                  Click on each stage of the timeline below to see what to expect and how to prepare.
                </p>

                {/* Timeline Stepper UI */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {timelineSteps.map((stepItem, idx) => {
                    const isActive = activeTimelineStep === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveTimelineStep(idx)}
                        className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                          isActive
                            ? "bg-navy-900 text-white border-navy-900 shadow-md"
                            : "bg-white hover:bg-navy-50 text-navy-700 border-navy-100"
                        }`}
                      >
                        <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                          isActive ? "text-brand-orange" : "text-text-muted group-hover:text-brand-orange"
                        }`}>
                          Stage 0{idx + 1}
                        </span>
                        <h4 className="font-display font-semibold text-xs sm:text-sm">
                          {stepItem.title}
                        </h4>
                      </button>
                    );
                  })}
                </div>

                {/* Active Step Details Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTimelineStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-5 rounded-2xl bg-navy-50 border border-navy-100"
                  >
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-display font-semibold text-navy-900 text-base mb-1">
                          {timelineSteps[activeTimelineStep].title} Overview
                        </h4>
                        <p className="text-sm text-text-body mb-3 leading-relaxed">
                          {timelineSteps[activeTimelineStep].desc}
                        </p>
                        <div className="flex items-start gap-2 text-xs border-t border-navy-100/50 pt-2 text-text-muted">
                          <ShieldAlert className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                          <span><strong>Patient Instruction:</strong> {timelineSteps[activeTimelineStep].prep}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Diagnostic Preparation Checklist Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <Card className="p-8 border-navy-100 bg-white/95 shadow-md">
                <h2 className="font-display font-semibold text-2xl text-navy-900 mb-4 flex items-center gap-3">
                  <FileText className="text-brand-orange w-6 h-6 shrink-0" />
                  Diagnostic Test Prep Checklist
                </h2>
                <p className="text-sm text-text-muted mb-6">
                  Select a diagnostic screening procedure to generate your interactive safety and prep checklist.
                </p>

                {/* Checklist Select Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.entries(prepChecklists).map(([key, value]) => {
                    const isSelected = selectedTestType === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedTestType(key)}
                        className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-brand-orange text-white border-brand-orange shadow-sm"
                            : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                        }`}
                      >
                        {value.name}
                      </button>
                    );
                  })}
                </div>

                {/* Checklist Checklist Items */}
                <div className="p-5 rounded-2xl bg-white border border-navy-50 shadow-sm space-y-3">
                  <h4 className="font-display font-semibold text-navy-900 text-sm border-b border-navy-50 pb-2 flex justify-between items-center">
                    <span>{prepChecklists[selectedTestType as keyof typeof prepChecklists].name} Preparation</span>
                    <button
                      onClick={() => window.print()}
                      className="text-xs text-brand-orange hover:text-brand-orange-dark font-sans flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Printer size={12} /> Print Prep Guide
                    </button>
                  </h4>
                  <div className="space-y-3">
                    {prepChecklists[selectedTestType as keyof typeof prepChecklists].items.map((item, idx) => {
                      const checkboxKey = `${selectedTestType}-${idx}`;
                      const isChecked = !!checkedItems[checkboxKey];
                      return (
                        <label
                          key={idx}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-navy-50/50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => setCheckedItems({
                              ...checkedItems,
                              [checkboxKey]: !isChecked
                            })}
                            className="mt-1 h-4 w-4 rounded border-navy-100 text-brand-orange focus:ring-brand-orange accent-brand-orange cursor-pointer"
                          />
                          <span className={`text-xs sm:text-sm font-sans leading-relaxed transition-all ${
                            isChecked ? "text-text-muted line-through" : "text-text-body font-medium"
                          }`}>
                            {item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>
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
