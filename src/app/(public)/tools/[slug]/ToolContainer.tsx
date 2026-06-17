"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Activity,
  Heart,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Phone,
  RefreshCw,
  AlertTriangle,
  Check,
  CheckCircle2,
  Printer,
  Clock,
  ArrowLeft,
  AlertCircle,
  FileText,
  ShieldAlert,
  HelpCircle,
  Zap,
  Info,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { NeuralBackground } from "@/components/shared/NeuralBackground";

interface ToolContainerProps {
  slug: string;
}

export function ToolContainer({ slug }: ToolContainerProps) {
  // Common states
  const [step, setStep] = useState(0);

  // 1. Stroke Risk Calculator States
  const [strokeInputs, setStrokeInputs] = useState({
    age: 55,
    systolicBP: 135,
    hasDiabetes: "no",
    hasAFib: "no",
    isSmoking: "no",
    isSedentary: "no",
    hasStrokeHistory: "no",
  });

  // 2. Seizure Assessment States
  const [seizureInputs, setSeizureInputs] = useState({
    unconscious: "no",
    shaking: "no",
    staring: "no",
    duringSleep: "no",
    frequency: "once",
    postConfusion: "no",
  });

  // 3. Symptom Router States
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSubSymptom, setSelectedSubSymptom] = useState<string | null>(null);

  // Reset tool
  const resetTool = () => {
    setStep(0);
    setStrokeInputs({
      age: 55,
      systolicBP: 135,
      hasDiabetes: "no",
      hasAFib: "no",
      isSmoking: "no",
      isSedentary: "no",
      hasStrokeHistory: "no",
    });
    setSeizureInputs({
      unconscious: "no",
      shaking: "no",
      staring: "no",
      duringSleep: "no",
      frequency: "once",
      postConfusion: "no",
    });
    setSelectedRegion(null);
    setSelectedSubSymptom(null);
  };

  // ─── 1. STROKE RISK CALCULATOR LOGIC ───
  const strokeScore = useMemo(() => {
    let score = 0;
    // Age factor
    if (strokeInputs.age >= 75) score += 4;
    else if (strokeInputs.age >= 65) score += 3;
    else if (strokeInputs.age >= 55) score += 2;
    else if (strokeInputs.age >= 45) score += 1;

    // Blood Pressure factor
    if (strokeInputs.systolicBP >= 160) score += 4; // Stage 2 Hypertension
    else if (strokeInputs.systolicBP >= 140) score += 3; // Stage 1 Hypertension
    else if (strokeInputs.systolicBP >= 120) score += 1.5; // Prehypertension

    // Other conditions
    if (strokeInputs.hasStrokeHistory === "yes") score += 6;
    if (strokeInputs.hasAFib === "yes") score += 5;
    if (strokeInputs.hasDiabetes === "yes") score += 3;
    if (strokeInputs.isSmoking === "yes") score += 2.5;
    if (strokeInputs.isSedentary === "yes") score += 1.5;

    return score;
  }, [strokeInputs]);

  const strokeRiskLevel = useMemo(() => {
    if (strokeScore >= 12) return { level: "High Risk", color: "text-danger bg-danger/10 border-danger/30", text: "Severe risk profile detected. Direct prevention measures, lipid panel optimization, and a detailed clinical stroke screening are strongly recommended.", severity: "high" };
    if (strokeScore >= 6) return { level: "Moderate Risk", color: "text-warning bg-warning/10 border-warning/30", text: "Elevated risk factors. Lifestyle changes and clinical check-up with a neurologist should be scheduled soon.", severity: "medium" };
    return { level: "Low Risk", color: "text-success bg-success/10 border-success/30", text: "Standard risk levels. Continue maintaining physical activity and screening your blood pressure annually.", severity: "low" };
  }, [strokeScore]);

  // ─── 2. SEIZURE ASSESSMENT LOGIC ───
  const seizureEvaluation = useMemo(() => {
    let score = 0;
    if (seizureInputs.unconscious === "yes") score += 2;
    if (seizureInputs.shaking === "yes") score += 3;
    if (seizureInputs.staring === "yes") score += 2;
    if (seizureInputs.duringSleep === "yes") score += 2;
    if (seizureInputs.postConfusion === "yes") score += 2;
    if (seizureInputs.frequency === "multiple") score += 3;
    if (seizureInputs.frequency === "ongoing") score += 4;

    const isVideoEEGRecommended = score >= 5 || seizureInputs.shaking === "yes" || seizureInputs.frequency === "ongoing";

    return {
      score,
      isVideoEEGRecommended,
      recommendation: isVideoEEGRecommended
        ? "Video EEG Study Recommended: Your symptom profile strongly indicates the need for an electroencephalography recording (sleep-deprived or video EEG) to monitor and pinpoint brain wave abnormalities."
        : "Neurological Evaluation Indicated: Although critical seizure markers are lower, a standard consultation and clinical screening are recommended to evaluate the episodes.",
    };
  }, [seizureInputs]);

interface SymptomItem {
  id: string;
  label: string;
  clinic: string;
  slug: string;
  tests: string[];
  urgent?: boolean;
}

interface RegionItem {
  label: string;
  description: string;
  symptoms: SymptomItem[];
}

  // ─── 3. SYMPTOM ROUTER LOGIC ───
  const regions: Record<string, RegionItem> = {
    head: {
      label: "Head & Cognitive Functions",
      description: "Headaches, memory loss, confusion, speech difficulties, or facial twitching",
      symptoms: [
        { id: "migraine", label: "Severe, throbbing headache with nausea or light sensitivity", clinic: "Migraine & Headache Clinic", slug: "migraine-treatment", tests: ["Brain MRI", "Fundoscopy"] },
        { id: "dementia", label: "Progressive memory loss, confusion, or behavioral changes", clinic: "Memory Loss & Dementia Center", slug: "memory-loss-treatment", tests: ["Cognitive Assessment", "Brain MRI"] },
        { id: "stroke_acute", label: "Sudden facial drooping, arm weakness, or slurred speech (Emergency)", clinic: "Stroke Emergency Management Unit", slug: "stroke-treatment", tests: ["Emergency CT/MRI", "Carotid Doppler"], urgent: true },
        { id: "epilepsy", label: "Staring spells, loss of consciousness, or full body convulsions", clinic: "Epilepsy & Seizure Care Center", slug: "epilepsy-treatment", tests: ["Video EEG", "Brain MRI"] },
      ]
    },
    spine: {
      label: "Spine & Back",
      description: "Severe back/neck pain, radiating nerve pain, or stiffness",
      symptoms: [
        { id: "spinal", label: "Neck or lower back pain with numbness shooting down the arm or leg", clinic: "Spinal & Back Disorders Clinic", slug: "spinal-disorders", tests: ["Spine MRI", "Electromyography (EMG)"] }
      ]
    },
    limbs: {
      label: "Limbs & Nerves",
      description: "Numbness, burning sensations, tremors, or muscle weakness",
      symptoms: [
        { id: "neuropathy", label: "Burning sensation, tingling, or 'pins and needles' in hands and feet", clinic: "Neuropathy & Nerve Weakness Clinic", slug: "neuropathy-treatment", tests: ["Nerve Conduction Study (NCS)", "ENMG"] },
        { id: "paralysis", label: "Complete loss of strength or movement in half of the body or limbs", clinic: "Paralysis Treatment & Neuro-Rehab", slug: "paralysis-treatment", tests: ["Brain/Spine MRI", "Physiotherapy Assessment"] }
      ]
    },
    balance: {
      label: "General Balance & Dizziness",
      description: "Feeling unstable, spinning sensations (vertigo), or blackouts",
      symptoms: [
        { id: "vertigo", label: "Spinning room sensation, nausea, or dizziness during head movements", clinic: "Dizziness & Vertigo Clinic", slug: "vertigo-treatment", tests: ["Dix-Hallpike Test", "Audiometry Coordinate"] }
      ]
    }
  };

  const selectedSymptomData = useMemo(() => {
    if (!selectedRegion || !selectedSubSymptom) return null;
    return regions[selectedRegion as keyof typeof regions]?.symptoms.find(s => s.id === selectedSubSymptom) || null;
  }, [selectedRegion, selectedSubSymptom]);


  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-20" />
      <NeuralBackground />

      <div className="container-custom relative z-10">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-orange transition-colors group text-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Dynamic Headers */}
        <div className="max-w-3xl mb-12">
          {slug === "stroke-risk" && (
            <>
              <span className="eyebrow block mb-3">Diagnostic Utility</span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
                Stroke Risk Assessment Tool
              </h1>
              <p className="text-white/70 text-lg leading-relaxed font-sans">
                A clinically guided points calculator to identify primary risk factor indices (BP, Age, Lifestyle, AFib) and fast-track stroke prevention consultations.
              </p>
            </>
          )}

          {slug === "seizure-assessment" && (
            <>
              <span className="eyebrow block mb-3">EEG Screening Portal</span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
                Seizure & Video EEG Prep Quiz
              </h1>
              <p className="text-white/70 text-lg leading-relaxed font-sans">
                Evaluate seizure-like episodes to determine if a diagnostic Video EEG is recommended, and compile your sleep-deprived preparation checklist.
              </p>
            </>
          )}

          {slug === "symptom-router" && (
            <>
              <span className="eyebrow block mb-3">Triage Wizard</span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
                Neurological Symptom Router
              </h1>
              <p className="text-white/70 text-lg leading-relaxed font-sans">
                Locate and categorize your symptoms to immediately map them to our dedicated sub-specialty clinics and schedule targeted diagnostic tests.
              </p>
            </>
          )}
        </div>

        {/* ─── TOOL 1: STROKE RISK CALCULATOR ─── */}
        {slug === "stroke-risk" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 p-8 border-navy-100 bg-white/95 shadow-md flex flex-col justify-between">
              <div>
                {/* Steps Tracker */}
                <div className="flex justify-between items-center mb-8 border-b border-navy-50 pb-4">
                  <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
                    Risk Parameters (Step {step + 1} of 3)
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-2 w-10 rounded-full transition-all duration-300 ${
                          step >= i ? "bg-brand-orange" : "bg-navy-50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="font-display text-xl text-navy-900 font-semibold mb-4">
                        Step 1: Patient Age & Blood Pressure
                      </h3>
                      
                      {/* Age Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-semibold text-navy-700">
                          <span>Patient Age</span>
                          <span className="text-brand-orange font-bold text-base">{strokeInputs.age} Years</span>
                        </div>
                        <input
                          type="range"
                          min="18"
                          max="90"
                          value={strokeInputs.age}
                          onChange={(e) => setStrokeInputs({ ...strokeInputs, age: parseInt(e.target.value) })}
                          className="w-full h-2 bg-navy-50 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                        />
                        <div className="flex justify-between text-xs text-text-muted">
                          <span>18 Years</span>
                          <span>90+ Years</span>
                        </div>
                      </div>

                      {/* Systolic BP Slider */}
                      <div className="space-y-2 pt-4">
                        <div className="flex justify-between text-sm font-semibold text-navy-700">
                          <span>Systolic Blood Pressure (mmHg)</span>
                          <span className="text-brand-orange font-bold text-base">{strokeInputs.systolicBP} mmHg</span>
                        </div>
                        <input
                          type="range"
                          min="90"
                          max="200"
                          value={strokeInputs.systolicBP}
                          onChange={(e) => setStrokeInputs({ ...strokeInputs, systolicBP: parseInt(e.target.value) })}
                          className="w-full h-2 bg-navy-50 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                        />
                        <div className="flex justify-between text-xs text-text-muted">
                          <span>90 mmHg (Low/Normal)</span>
                          <span>200 mmHg (Hypertensive Crisis)</span>
                        </div>
                        <p className="text-xs text-text-muted mt-1 italic">
                          *Systolic BP is the top number of your blood pressure reading.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="font-display text-xl text-navy-900 font-semibold mb-4">
                        Step 2: Medical & Cardiovascular History
                      </h3>

                      {/* Stroke History */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-700 block">
                          Have you previously experienced a Stroke or Transient Ischemic Attack (TIA / mini-stroke)?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {["no", "yes"].map((val) => (
                            <button
                              key={val}
                              onClick={() => setStrokeInputs({ ...strokeInputs, hasStrokeHistory: val })}
                              className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                                strokeInputs.hasStrokeHistory === val
                                  ? "bg-navy-900 text-white border-navy-900 shadow-md"
                                  : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                              }`}
                            >
                              {val === "yes" ? "Yes" : "No"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Atrial Fibrillation */}
                      <div className="space-y-2 pt-2">
                        <label className="text-sm font-semibold text-navy-700 block">
                          Do you have a diagnosis of Atrial Fibrillation (AFib) or irregular heartbeat?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {["no", "yes"].map((val) => (
                            <button
                              key={val}
                              onClick={() => setStrokeInputs({ ...strokeInputs, hasAFib: val })}
                              className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                                strokeInputs.hasAFib === val
                                  ? "bg-navy-900 text-white border-navy-900 shadow-md"
                                  : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                              }`}
                            >
                              {val === "yes" ? "Yes" : "No"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="font-display text-xl text-navy-900 font-semibold mb-4">
                        Step 3: Lifestyle & Metabolic Factors
                      </h3>

                      {/* Diabetes */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-700 block">
                          Do you have Diabetes or taking blood-sugar regulating medications?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {["no", "yes"].map((val) => (
                            <button
                              key={val}
                              onClick={() => setStrokeInputs({ ...strokeInputs, hasDiabetes: val })}
                              className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                                strokeInputs.hasDiabetes === val
                                  ? "bg-navy-900 text-white border-navy-900 shadow-md"
                                  : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                              }`}
                            >
                              {val === "yes" ? "Yes" : "No"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Smoking & Activity */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-navy-700 block">
                            Active Smoker?
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {["no", "yes"].map((val) => (
                              <button
                                key={val}
                                onClick={() => setStrokeInputs({ ...strokeInputs, isSmoking: val })}
                                className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all ${
                                  strokeInputs.isSmoking === val
                                    ? "bg-navy-900 text-white border-navy-900"
                                    : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                                }`}
                              >
                                {val === "yes" ? "Yes" : "No"}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-navy-700 block">
                            Sedentary Lifestyle?
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {["no", "yes"].map((val) => (
                              <button
                                key={val}
                                onClick={() => setStrokeInputs({ ...strokeInputs, isSedentary: val })}
                                className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all ${
                                  strokeInputs.isSedentary === val
                                    ? "bg-navy-900 text-white border-navy-900"
                                    : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                                }`}
                              >
                                {val === "yes" ? "Yes" : "No"}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-12 pt-6 border-t border-navy-50">
                <Button
                  variant="outline"
                  onClick={() => setStep((p) => Math.max(0, p - 1))}
                  disabled={step === 0}
                  className="gap-2"
                >
                  <ChevronLeft size={16} /> Back
                </Button>

                {step < 2 ? (
                  <Button
                    variant="primary"
                    onClick={() => setStep((p) => Math.min(2, p + 1))}
                    className="gap-2"
                  >
                    Next Step <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => setStep(3)} // Triggers result view
                    className="gap-2 bg-brand-orange hover:bg-orange-600 shadow-orange"
                  >
                    Calculate Stroke Risk <Activity size={16} />
                  </Button>
                )}
              </div>
            </Card>

            {/* Results Sidebar Panel */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {step < 3 ? (
                  <motion.div
                    key="pre-result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="p-6 border-navy-100 bg-white/95 shadow-md">
                      <h3 className="font-display font-semibold text-lg text-navy-900 mb-4 flex items-center gap-2">
                        <Info className="text-brand-orange w-5 h-5" />
                        Clinical Context
                      </h3>
                      <p className="text-sm text-text-muted mb-4 leading-relaxed">
                        Stroke is highly preventable when risk factors are monitored. Identifying elevated systolic pressure, arrhythmias like AFib, or high-risk history helps clinicians take immediate preventative actions.
                      </p>
                      <div className="bg-navy-50 rounded-xl p-4 border border-navy-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-navy-700 mb-1">
                          Stroke Warning Signs
                        </h4>
                        <p className="text-xs text-text-body leading-relaxed font-sans">
                          If you experience sudden numbness, facial drooping, speech loss, or vision changes, please bypass this calculator and seek **immediate emergency attention**.
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    <Card className="p-6 border-navy-100 bg-white/95 shadow-md overflow-hidden relative">
                      {/* Gauge Indicator */}
                      <div className="text-center mb-6">
                        <span className="text-xs font-semibold text-text-muted block mb-1">
                          Calculated Score Index
                        </span>
                        <div className="text-5xl font-bold font-display text-navy-900 mb-2">
                          {strokeScore.toFixed(1)}
                        </div>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${strokeRiskLevel.color}`}>
                          {strokeRiskLevel.level}
                        </div>
                      </div>

                      <p className="text-sm text-text-body leading-relaxed mb-6 font-sans">
                        {strokeRiskLevel.text}
                      </p>

                      <div className="space-y-3">
                        <Link href="/appointment" className="w-full">
                          <Button variant="primary" className="w-full justify-center text-sm">
                            Schedule Prevention Consultation
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={resetTool}
                          className="w-full justify-center gap-2 text-sm"
                        >
                          <RefreshCw size={14} /> Recalculate Risk
                        </Button>
                      </div>
                    </Card>

                    {/* F.A.S.T warning banner */}
                    <div className="bg-orange-50 border-2 border-brand-orange/30 rounded-2xl p-6 shadow-md">
                      <div className="flex items-start gap-3 mb-4">
                        <ShieldAlert className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-display font-semibold text-navy-900 text-lg">
                            Think F.A.S.T. (Stroke Signs)
                          </h4>
                          <p className="text-xs text-text-muted">
                            Every minute matters in acute brain care. Memorize these key indicators:
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs font-semibold font-sans">
                        <div className="bg-white p-3 rounded-lg border border-brand-orange/10">
                          <span className="text-brand-orange block text-sm font-bold">F - Face</span>
                          Drooping or numbness on one side.
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-brand-orange/10">
                          <span className="text-brand-orange block text-sm font-bold">A - Arm</span>
                          Weakness or drifting when raised.
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-brand-orange/10">
                          <span className="text-brand-orange block text-sm font-bold">S - Speech</span>
                          Slurred words or difficulty speaking.
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-brand-orange/10">
                          <span className="text-brand-orange block text-sm font-bold">T - Time</span>
                          Immediate emergency response.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ─── TOOL 2: SEIZURE & VIDEO EEG PREP QUIZ ─── */}
        {slug === "seizure-assessment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 p-8 border-navy-100 bg-white/95 shadow-md flex flex-col justify-between">
              <div>
                {/* Steps Tracker */}
                <div className="flex justify-between items-center mb-8 border-b border-navy-50 pb-4">
                  <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
                    Symptom Analysis (Step {step + 1} of 3)
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-2 w-10 rounded-full transition-all duration-300 ${
                          step >= i ? "bg-brand-orange" : "bg-navy-50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="font-display text-xl text-navy-900 font-semibold mb-4">
                        Step 1: Primary Episode Characteristics
                      </h3>

                      {/* Loss of consciousness */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-700 block">
                          Does the episode involve sudden loss of consciousness or fainting?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {["no", "yes"].map((val) => (
                            <button
                              key={val}
                              onClick={() => setSeizureInputs({ ...seizureInputs, unconscious: val })}
                              className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                                seizureInputs.unconscious === val
                                  ? "bg-navy-900 text-white border-navy-900 shadow-md"
                                  : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                              }`}
                            >
                              {val === "yes" ? "Yes" : "No"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Body Shaking */}
                      <div className="space-y-2 pt-2">
                        <label className="text-sm font-semibold text-navy-700 block">
                          Is there physical shaking, body stiffness, or jerking of limbs?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {["no", "yes"].map((val) => (
                            <button
                              key={val}
                              onClick={() => setSeizureInputs({ ...seizureInputs, shaking: val })}
                              className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                                seizureInputs.shaking === val
                                  ? "bg-navy-900 text-white border-navy-900 shadow-md"
                                  : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                              }`}
                            >
                              {val === "yes" ? "Yes" : "No"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="font-display text-xl text-navy-900 font-semibold mb-4">
                        Step 2: Timing & Progression
                      </h3>

                      {/* Staring spells */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-700 block">
                          Have you noticed sudden blank staring or brief unresponsiveness (absence)?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {["no", "yes"].map((val) => (
                            <button
                              key={val}
                              onClick={() => setSeizureInputs({ ...seizureInputs, staring: val })}
                              className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                                seizureInputs.staring === val
                                  ? "bg-navy-900 text-white border-navy-900 shadow-md"
                                  : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                              }`}
                            >
                              {val === "yes" ? "Yes" : "No"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sleep seizures */}
                      <div className="space-y-2 pt-2">
                        <label className="text-sm font-semibold text-navy-700 block">
                          Do these episodes typically happen during sleep or waking transitions?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {["no", "yes"].map((val) => (
                            <button
                              key={val}
                              onClick={() => setSeizureInputs({ ...seizureInputs, duringSleep: val })}
                              className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                                seizureInputs.duringSleep === val
                                  ? "bg-navy-900 text-white border-navy-900 shadow-md"
                                  : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                              }`}
                            >
                              {val === "yes" ? "Yes" : "No"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="font-display text-xl text-navy-900 font-semibold mb-4">
                        Step 3: Post-Episode Effects & Frequency
                      </h3>

                      {/* Frequency */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-700 block">
                          How frequently do these episodes repeat?
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "once", label: "Only Once" },
                            { value: "multiple", label: "Multiple Times" },
                            { value: "ongoing", label: "Frequent/Weekly" },
                          ].map((item) => (
                            <button
                              key={item.value}
                              onClick={() => setSeizureInputs({ ...seizureInputs, frequency: item.value })}
                              className={`py-2 px-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all ${
                                seizureInputs.frequency === item.value
                                  ? "bg-navy-900 text-white border-navy-900"
                                  : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Post confusion */}
                      <div className="space-y-2 pt-2">
                        <label className="text-sm font-semibold text-navy-700 block">
                          Is there deep confusion, headache, or extreme sleepiness after recovering?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {["no", "yes"].map((val) => (
                            <button
                              key={val}
                              onClick={() => setSeizureInputs({ ...seizureInputs, postConfusion: val })}
                              className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                                seizureInputs.postConfusion === val
                                  ? "bg-navy-900 text-white border-navy-900 shadow-md"
                                  : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
                              }`}
                            >
                              {val === "yes" ? "Yes" : "No"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-12 pt-6 border-t border-navy-50">
                <Button
                  variant="outline"
                  onClick={() => setStep((p) => Math.max(0, p - 1))}
                  disabled={step === 0}
                  className="gap-2"
                >
                  <ChevronLeft size={16} /> Back
                </Button>

                {step < 2 ? (
                  <Button
                    variant="primary"
                    onClick={() => setStep((p) => Math.min(2, p + 1))}
                    className="gap-2"
                  >
                    Next Step <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => setStep(3)} // Triggers result view
                    className="gap-2 bg-brand-orange hover:bg-orange-600 shadow-orange"
                  >
                    Analyze & Get Checklist <Brain size={16} />
                  </Button>
                )}
              </div>
            </Card>

            {/* Results Sidebar Panel & EEG Prep Guide */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {step < 3 ? (
                  <motion.div
                    key="pre-result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="p-6 border-navy-100 bg-white/95 shadow-md">
                      <h3 className="font-display font-semibold text-lg text-navy-900 mb-4 flex items-center gap-2">
                        <Clock className="text-brand-orange w-5 h-5" />
                        Why Video EEG?
                      </h3>
                      <p className="text-sm text-text-muted mb-4 leading-relaxed font-sans">
                        A Video EEG records brain waves and synchronized video of your body's physical movements. It is the gold standard for separating epileptic seizures from non-epileptic fainting (syncope).
                      </p>
                      <div className="bg-navy-50 rounded-xl p-4 border border-navy-100 text-xs">
                        <span className="font-bold text-navy-700 block mb-1">Preparation Note:</span>
                        Seizure diagnostic tests often require partial sleep deprivation to trigger underlying epileptiform activities safely.
                      </div>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    <Card className="p-6 border-navy-100 bg-white/95 shadow-md">
                      <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">
                        Screening Outcome
                      </h3>
                      <div className={`p-4 rounded-xl border mb-4 text-xs font-sans leading-relaxed ${
                        seizureEvaluation.isVideoEEGRecommended
                          ? "bg-amber-50 border-amber-300 text-amber-900"
                          : "bg-navy-50 border-navy-100 text-navy-900"
                      }`}>
                        <div className="font-bold text-sm mb-1">
                          {seizureEvaluation.isVideoEEGRecommended ? "Video EEG Indicated" : "Standard Review Recommended"}
                        </div>
                        {seizureEvaluation.recommendation}
                      </div>

                      {/* Prep Guide Checklist */}
                      <div className="space-y-3 border-t border-navy-50 pt-4">
                        <h4 className="font-display font-semibold text-navy-900 text-sm flex items-center gap-1.5">
                          <CheckCircle2 className="text-brand-orange w-4.5 h-4.5" />
                          Video EEG Prep Checklist
                        </h4>
                        <div className="space-y-2 text-xs font-sans text-text-body">
                          <div className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5" />
                            <span><strong>Clean Hair:</strong> Wash head thoroughly the night before. Do NOT apply oils, gels, hairspray, or leave-in conditioners.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5" />
                            <span><strong>No Caffeine:</strong> Avoid tea, coffee, energy drinks, and chocolate for 24 hours prior to testing.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5" />
                            <span><strong>Sleep Deprivation (If Directed):</strong> Restrict sleep to 4 hours the night before to aid testing triggers.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5" />
                            <span><strong>Continue Meds:</strong> Take regular non-neurological meds as scheduled unless otherwise instructed.</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mt-6">
                        <Link href="/appointment" className="w-full">
                          <Button variant="primary" className="w-full justify-center text-sm">
                            Book Video EEG Consultation
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => window.print()}
                          className="w-full justify-center gap-2 text-sm"
                        >
                          <Printer size={14} /> Print Prep Guide
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={resetTool}
                          className="w-full justify-center text-xs text-text-muted hover:text-navy-900"
                        >
                          Restart Screening
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ─── TOOL 3: NEUROLOGICAL SYMPTOM ROUTER ─── */}
        {slug === "symptom-router" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 p-8 border-navy-100 bg-white/95 shadow-md">
              <h3 className="font-display font-semibold text-2xl text-navy-900 mb-6 flex items-center gap-2">
                <Stethoscope className="text-brand-orange w-6 h-6" />
                Step 1: Select Main Symptom Area
              </h3>

              {/* Grid of Regions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {Object.entries(regions).map(([key, data]) => {
                  const isSelected = selectedRegion === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedRegion(key);
                        setSelectedSubSymptom(null);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                        isSelected
                          ? "bg-navy-900 text-white border-navy-900 shadow-md"
                          : "bg-white hover:bg-navy-50 text-navy-700 border-navy-100"
                      }`}
                    >
                      <h4 className="font-display font-semibold text-base mb-1 group-hover:text-brand-orange transition-colors">
                        {data.label}
                      </h4>
                      <p className={`text-xs ${isSelected ? "text-white/70" : "text-text-muted"}`}>
                        {data.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Sub Symptoms */}
              <AnimatePresence mode="wait">
                {selectedRegion && (
                  <motion.div
                    key={selectedRegion}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="border-t border-navy-50 pt-6"
                  >
                    <h3 className="font-display font-semibold text-lg text-navy-900 mb-4">
                      Step 2: Choose the closest description
                    </h3>
                    <div className="flex flex-col gap-3">
                      {regions[selectedRegion as keyof typeof regions]?.symptoms.map((sym) => {
                        const isSubSelected = selectedSubSymptom === sym.id;
                        return (
                          <button
                            key={sym.id}
                            onClick={() => setSelectedSubSymptom(sym.id)}
                            className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer ${
                              isSubSelected
                                ? "bg-brand-orange text-white border-brand-orange shadow-md"
                                : "bg-white text-navy-700 border-navy-50 hover:bg-navy-50"
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isSubSelected ? "bg-white text-brand-orange" : "bg-navy-50 text-navy-700"
                            }`}>
                              {isSubSelected ? <Check size={12} className="stroke-[3]" /> : null}
                            </span>
                            <span>{sym.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Referral Dashboard Panel */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {!selectedSymptomData ? (
                  <motion.div
                    key="pre-referral"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="p-6 border-navy-100 bg-white/95 shadow-md">
                      <h3 className="font-display font-semibold text-lg text-navy-900 mb-4 flex items-center gap-2">
                        <HelpCircle className="text-brand-orange w-5 h-5" />
                        Triage Assistance
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed font-sans">
                        Select a body region and corresponding symptom description on the left to see our clinical recommendation, matching sub-specialty clinics, and target diagnostic tests.
                      </p>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="referral-result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    <Card className="p-6 border-navy-100 bg-white/95 shadow-md relative overflow-hidden">
                      {selectedSymptomData.urgent && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs font-semibold flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                          <span>Emergency Pathway: Acute stroke symptoms require immediate medical intervention!</span>
                        </div>
                      )}

                      <span className="text-xs uppercase tracking-wider text-text-muted font-bold block mb-1">
                        Recommended Pathway
                      </span>
                      <h3 className="font-display font-semibold text-xl text-navy-900 mb-1">
                        {selectedSymptomData.clinic}
                      </h3>
                      <p className="text-xs text-text-muted mb-4 font-sans">
                        Direct specialty routing for targeted disease management.
                      </p>

                      {/* Primary Diagnostic Tests */}
                      <div className="space-y-2 border-t border-navy-50 pt-4 mb-6">
                        <span className="text-xs font-bold text-navy-900 block">
                          Standard Diagnostic Testing Recommended:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedSymptomData.tests.map((test) => (
                            <span
                              key={test}
                              className="px-2.5 py-1 rounded-full bg-navy-50 border border-navy-100 text-[11px] text-navy-700 font-semibold"
                            >
                              {test}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Link href={`/disorders/${selectedSymptomData.slug}`} className="w-full">
                          <Button variant="outline" className="w-full justify-between text-sm">
                            <span>Read Treatment Protocols</span>
                            <ChevronRight size={16} />
                          </Button>
                        </Link>

                        <Link href="/appointment" className="w-full">
                          <Button variant="primary" className="w-full justify-center text-sm shadow-orange">
                            Schedule Clinic Appointment
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          onClick={resetTool}
                          className="w-full justify-center text-xs text-text-muted hover:text-navy-900"
                        >
                          Clear Selection
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
