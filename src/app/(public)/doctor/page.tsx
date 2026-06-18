"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  Volume2,
  VolumeX,
  Activity,
  CheckCircle2,
  Brain,
  Compass,
  Shield,
  Star
} from "lucide-react";
import { SITE } from "@/constants/site";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { NeuralBackground } from "@/components/shared/NeuralBackground";
import { useIntersection } from "@/hooks/useIntersection";

// Animated Counter Component reused from Home
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

// Patient Testimonials Video Data
const patientTestimonials = [
  {
    name: "Rajesh Kumar",
    condition: "Stroke Recovery",
    story: "Dr. Venkatesh and the stroke team diagnosed me in the critical golden hour. Their rapid clot-dissolving therapy and subsequent rehabilitation plan restored my speech and motor function completely.",
    stats: "Full recovery in 45 days",
    thumbnail: "/hospital_icu.png",
    videoTitle: "Patient Rajesh Kumar's Recovery Journey"
  },
  {
    name: "Sunitha Rao",
    condition: "Epilepsy Management",
    story: "For years, my seizures were unpredictable. Dr. Venkatesh conducted detailed Video EEG monitoring, adjusted my therapeutic regimen, and provided the counseling I needed. I am now living free of fear.",
    stats: "Seizure-free for 24 months",
    thumbnail: "/hospital_eeg_lab.png",
    videoTitle: "Patient Sunitha Rao's Epilepsy Care Story"
  },
  {
    name: "Laxman Prasad",
    condition: "Neuropathy Diagnosis",
    story: "Unbearable burning sensations in my feet kept me awake at night. Through precise nerve conduction studies (ENMG) and a customized medication protocol, I've regained restful sleep and pain-free walks.",
    stats: "90% reduction in symptoms",
    thumbnail: "/hospital_rehab.png",
    videoTitle: "Patient Laxman Prasad's Neuropathy Relief Case"
  }
];

// Clinical documentary gallery images
const galleryImages = [
  {
    src: "/doctor-hero.png",
    caption: "Dr. Venkatesh during a diagnostic clinical consultation with a patient."
  },
  {
    src: "/hospital_eeg_lab.png",
    caption: "Interpretation of brainwave diagnostics inside the Video EEG Suite."
  },
  {
    src: "/hospital_rehab.png",
    caption: "A physical therapist conducting motor recovery training in the Neuro-Rehab wing."
  },
  {
    src: "/hospital_icu.png",
    caption: "Daycare and emergency observation beds fully equipped for neurological emergencies."
  }
];

export default function DoctorProfilePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<typeof patientTestimonials[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Testimonial Carousel API
  const [testRef, testApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [testIndex, setTestIndex] = useState(0);

  // Gallery Carousel API
  const [galRef, galApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [galIndex, setGalIndex] = useState(0);

  const onSelectTest = useCallback(() => {
    if (!testApi) return;
    setTestIndex(testApi.selectedScrollSnap());
  }, [testApi]);

  const onSelectGal = useCallback(() => {
    if (!galApi) return;
    setGalIndex(galApi.selectedScrollSnap());
  }, [galApi]);

  useEffect(() => {
    if (!testApi) return;
    onSelectTest();
    testApi.on("select", onSelectTest);
  }, [testApi, onSelectTest]);

  useEffect(() => {
    if (!galApi) return;
    onSelectGal();
    galApi.on("select", onSelectGal);

    // Subtle Gallery Autoplay
    const interval = setInterval(() => galApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [galApi, onSelectGal]);

  // Video modal progress bar
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (modalOpen && isPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1.6;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [modalOpen, isPlaying]);

  const handlePlayVideo = (video: typeof patientTestimonials[0]) => {
    setActiveVideo(video);
    setVideoProgress(0);
    setModalOpen(true);
    setIsPlaying(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsPlaying(false);
    setActiveVideo(null);
  };

  return (
    <div className="relative min-h-screen bg-white text-text-body font-sans overflow-hidden">

      {/* ==================== 1. SUBPAGE HERO HEADER ==================== */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900">
        <NeuralBackground />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="eyebrow text-brand-orange block uppercase tracking-wider font-semibold">
              Medical Leadership
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight">
              Dr. Dasari Venkatesh
            </h1>
            <p className="text-white/80 font-sans text-sm sm:text-base max-w-2xl mx-auto">
              Consultant Neuro Physician — DNB (Neurology) · MD (General Medicine) · MBBS. Dedicated to advanced diagnostic precision and structured neurological rehabilitation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== 2. BIOGRAPHY & JOURNEY ==================== */}
      <section className="py-20 bg-white border-b border-border" aria-labelledby="bio-heading">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Left: Image & 2x2 Grid */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
                <Image
                  src="/doctor-hero.png"
                  alt="Dr. Dasari Venkatesh — Specialist in Neurology Care"
                  width={600}
                  height={550}
                  className="w-full h-auto object-cover filter contrast-[1.02]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* Metric 1: Patients */}
                <div className="bg-white rounded-xl border border-border p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center mx-auto mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy-700"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
                  </div>
                  <p className="font-bold text-navy-700 text-lg">10,000+</p>
                  <p className="text-text-muted text-xs font-sans">Patients Treated</p>
                </div>

                {/* Metric 2: Experience */}
                <div className="bg-white rounded-xl border border-border p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center mx-auto mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy-700"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
                  </div>
                  <p className="font-bold text-navy-700 text-lg">15+ Years</p>
                  <p className="text-text-muted text-xs font-sans">Clinical Experience</p>
                </div>

                {/* Metric 3: Certified */}
                <div className="bg-white rounded-xl border border-border p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center mx-auto mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy-700"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                  </div>
                  <p className="font-bold text-navy-700 text-lg">Board Certified</p>
                  <p className="text-text-muted text-xs font-sans">DNB Neurology</p>
                </div>

                {/* Metric 4: Recoveries */}
                <div className="bg-white rounded-xl border border-border p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center mx-auto mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="text-navy-700"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>
                  </div>
                  <p className="font-bold text-navy-700 text-lg">2,000+</p>
                  <p className="text-text-muted text-xs font-sans">Neuro Procedures</p>
                </div>

              </div>
            </div>

            {/* Right: Content details */}
            <div className="text-left space-y-6">
              <div className="space-y-6 font-sans">

                {/* 1. Header Details */}
                <div className="space-y-1">
                  <h2 id="bio-heading" className="text-3xl font-display font-bold text-navy-900">Dr. Dasari Venkatesh</h2>
                  <p className="text-brand-orange font-semibold text-sm">Founder & Senior Consultant Neuro Physician</p>
                </div>

                <div className="w-12 h-0.5 bg-brand-orange" />

                {/* 2. Professional Introduction */}
                <p className="text-text-body leading-relaxed text-sm sm:text-base">
                  Dr. Dasari Venkatesh has spent over 15 years at the forefront of clinical neurology in South India. Driven by a commitment to absolute diagnostic precision, he established Vijaya Neuro Hospital to deliver comprehensive brain, nerve, and spine care under one roof.
                </p>

                {/* 3. Structured Experience Details */}
                <div className="space-y-4">

                  {/* Subsection 1: Education */}
                  <div className="border-l-2 border-slate-200 pl-4 py-1">
                    <span className="text-xs uppercase tracking-wider text-navy-700 font-bold block mb-1">Academic Background</span>
                    <p className="text-xs text-text-body leading-relaxed">
                      Board-Certified <strong>DNB (Neurology)</strong> from the National Board of Examinations, following a specialized <strong>MD (General Medicine)</strong> and <strong>MBBS</strong>.
                    </p>
                  </div>

                  {/* Subsection 2: Clinical Focus */}
                  <div className="border-l-2 border-slate-200 pl-4 py-1">
                    <span className="text-xs uppercase tracking-wider text-navy-700 font-bold block mb-1">Specialized Expertise</span>
                    <p className="text-xs text-text-body leading-relaxed">
                      Key specialist in hyper-acute stroke care, advanced Video EEG diagnostics for refractory epilepsy, Electroneuromyography (ENMG) for neuropathic assessment, and spinal spondylosis treatment.
                    </p>
                  </div>

                  {/* Subsection 3: History & Care Hospital */}
                  <div className="border-l-2 border-slate-200 pl-4 py-1">
                    <span className="text-xs uppercase tracking-wider text-navy-700 font-bold block mb-1">Clinical Journey</span>
                    <p className="text-xs text-text-body leading-relaxed">
                      Acquired deep clinical expertise during his intensive residency at <strong>Care Hospital, Hyderabad</strong>, managing high-volume neurological emergencies and neurophysiology labs prior to founding Vijaya Neuro Hospital.
                    </p>
                  </div>

                </div>
              </div>

              {/* Mission Statement Box */}
              <div className="mt-8 p-5 bg-navy-50 rounded-xl border border-navy-100 flex flex-col font-sans">
                <h3 className="text-navy-900 font-semibold mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-brand-orange"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>
                  Our Mission
                </h3>
                <p className="text-text-body text-sm leading-relaxed italic">
                  “To deliver advanced neurology diagnostics, ethical medical consultations, and step-down physical rehabilitation under a single, unified roof — because every patient deserves clinical excellence and compassionate support.”
                </p>
                <p className="text-navy-700 font-semibold text-xs mt-3">— Dr. D. Venkatesh</p>
              </div>

              <div className="mt-6">
                <Link href="/appointment">
                  <Button className="gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="m9 16 2 2 4-4"></path></svg>
                    Book a Consultation
                  </Button>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================== 3. VISION, MISSION & CORE VALUES ==================== */}
      <section className="py-20 lg:py-28 bg-surface border-b border-border">
        <div className="container-custom">

          <SectionHeader
            eyebrow="Our Commitments"
            title="Vision, Mission & Core Values"
            subtitle="Representing the clinical philosophy and patient-first dedication of Dr. Venkatesh and the hospital."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 items-stretch">

            {/* Vision Card */}
            <Card className="p-8 hover:shadow-card-lg transition-all border-border bg-white flex flex-col justify-between text-left">
              <div>
                <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mb-6 shrink-0">
                  <Compass size={20} className="text-navy-700" />
                </div>
                <h3 className="font-sans font-bold text-navy-700 text-lg mb-3">Our Vision</h3>
                <p className="text-text-muted font-sans text-sm leading-relaxed">
                  To be the region's lead benchmark for specialized, trust-based neurological care, fostering community well-being through advanced medical delivery and ethical treatment.
                </p>
              </div>
            </Card>

            {/* Mission Card */}
            <Card className="p-8 hover:shadow-card-lg transition-all border-border bg-white flex flex-col justify-between text-left">
              <div>
                <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mb-6 shrink-0">
                  <Brain size={20} className="text-navy-700" />
                </div>
                <h3 className="font-sans font-bold text-navy-700 text-lg mb-3">Our Mission</h3>
                <p className="text-text-muted font-sans text-sm leading-relaxed">
                  We are committed to delivering high-quality healthcare by integrating precise, early diagnostics with compassionate consultations and structured physical rehabilitation under one roof.
                </p>
              </div>
            </Card>

            {/* Core Values Card */}
            <Card className="p-8 hover:shadow-card-lg transition-all border-border bg-white text-left">
              <div>
                <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mb-6 shrink-0">
                  <Shield size={20} className="text-navy-700" />
                </div>
                <h3 className="font-sans font-bold text-navy-700 text-lg mb-4">Core Values</h3>

                <ul className="space-y-2.5 font-sans">
                  {[
                    "Compassion First",
                    "Upholding Integrity",
                    "Clinical Excellence",
                    "Patient Trust & Transparency",
                    "Continuous Academic Learning",
                    "Hygienic Recovery Environment"
                  ].map((val) => (
                    <li key={val} className="flex gap-2 items-center text-xs text-text-body">
                      <CheckCircle2 size={14} className="text-brand-orange shrink-0" />
                      <span>{val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* ==================== 4. ACHIEVEMENTS & RECOGNITION ==================== */}
      <section className="py-20 lg:py-28 bg-white border-b border-border">
        <div className="container-custom">

          <SectionHeader
            eyebrow="Credentials"
            title="Academic & Clinical Milestones"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            {/* Awards & Certifications */}
            <Card className="p-8 hover:shadow-card-lg transition-all border-border bg-white text-left">
              <h3 className="font-sans font-bold text-navy-700 text-base border-b border-border pb-3 mb-6">
                Awards & Certifications
              </h3>
              <ul className="space-y-4 text-sm text-text-body">
                <li className="flex gap-3 items-start">
                  <span className="text-brand-orange font-bold font-mono shrink-0">01</span>
                  <span>Board Certified Neurologist — National Board of Examinations</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-brand-orange font-bold font-mono shrink-0">02</span>
                  <span>Distinguished Resident Award in Stroke Intervention (Care Hospital)</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-brand-orange font-bold font-mono shrink-0">03</span>
                  <span>Certificate of Excellence in Neurophysiology Diagnostics</span>
                </li>
              </ul>
            </Card>

            {/* Organizations & Memberships */}
            <Card className="p-8 hover:shadow-card-lg transition-all border-border bg-white text-left">
              <h3 className="font-sans font-bold text-navy-700 text-base border-b border-border pb-3 mb-6">
                Professional Memberships
              </h3>
              <ul className="space-y-4 text-sm text-text-body">
                <li className="flex gap-3 items-start">
                  <span className="text-brand-orange font-bold font-mono shrink-0">01</span>
                  <span>Life Member — Indian Academy of Neurology (IAN)</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-brand-orange font-bold font-mono shrink-0">02</span>
                  <span>Member — Neurological Society of India (NSI)</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-brand-orange font-bold font-mono shrink-0">03</span>
                  <span>Active Contributor — World Stroke Organization (WSO)</span>
                </li>
              </ul>
            </Card>

            {/* Research & Publications */}
            <Card className="p-8 hover:shadow-card-lg transition-all border-border bg-white text-left">
              <h3 className="font-sans font-bold text-navy-700 text-base border-b border-border pb-3 mb-6">
                Research & Publications
              </h3>
              <ul className="space-y-4 text-sm text-text-body">
                <li className="flex gap-3 items-start">
                  <span className="text-brand-orange font-bold font-mono shrink-0">01</span>
                  <span>"Comparative Analysis of Video EEG in Diagnosing Seizures"</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-brand-orange font-bold font-mono shrink-0">02</span>
                  <span>"Efficacy of Early Electromyography (ENMG) in Neuropathies"</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-brand-orange font-bold font-mono shrink-0">03</span>
                  <span>"Acute Stroke Triage Protocols in Secondary Care Hospitals"</span>
                </li>
              </ul>
            </Card>

          </div>
        </div>
      </section>

      {/* ==================== 5. PATIENT TESTIMONIAL VIDEOS (EMBLA CAROUSEL) ==================== */}
      <section className="py-20 lg:py-28 bg-surface border-b border-border">
        <div className="container-custom">

          <SectionHeader
            eyebrow="Recovery Stories"
            title="Real Patient Testimonial Videos"
            subtitle="Understand the diagnostic path and recovery outcomes from patients who underwent therapy."
          />

          {/* Clean Carousel — items are not inside cards, shadows, or boxes */}
          <div className="relative mt-8">
            <div className="overflow-hidden" ref={testRef}>
              <div className="flex gap-6">
                {patientTestimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                  >
                    <div className="space-y-4 text-left">
                      {/* Video frame */}
                      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group flex items-center justify-center">
                        <Image
                          src={testimonial.thumbnail}
                          alt={testimonial.name}
                          fill
                          className="object-cover opacity-60 group-hover:scale-102 transition-transform duration-300"
                        />
                        <button
                          onClick={() => handlePlayVideo(testimonial)}
                          className="w-12 h-12 rounded-full bg-white text-navy-700 hover:bg-navy-50 flex items-center justify-center shadow-md transition-all scale-95 group-hover:scale-100 cursor-pointer z-10"
                          aria-label={`Play recovery video of ${testimonial.name}`}
                        >
                          <Play size={18} className="fill-navy-700 text-navy-700 ml-0.5" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-navy-950/80 px-2 py-0.5 rounded text-[10px] text-white tracking-wide">
                          {testimonial.stats}
                        </div>
                      </div>

                      {/* Bio info */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-orange tracking-widest block mb-0.5">
                          {testimonial.condition}
                        </span>
                        <h3 className="font-sans font-bold text-navy-700 text-sm">
                          {testimonial.name}
                        </h3>
                        <p className="text-text-muted text-xs leading-relaxed font-sans italic mt-1.5">
                          "{testimonial.story}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => testApi?.scrollPrev()}
                className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-navy-700 hover:bg-navy-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {patientTestimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${i === testIndex ? "bg-navy-750" : "bg-gray-200"
                      }`}
                    onClick={() => testApi?.scrollTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => testApi?.scrollNext()}
                className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-navy-700 hover:bg-navy-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== 6. TREATMENT GALLERY (EMBLA CAROUSEL) ==================== */}
      <section className="py-20 lg:py-28 bg-white border-b border-border">
        <div className="container-custom">

          <SectionHeader
            eyebrow="Clinical Workspace"
            title="Treatment & Patient Gallery"
            subtitle="Documenting our daily clinical operations, EEG diagnostic suites, and patient care rooms."
          />

          {/* Simple, clean documentary Carousel — items are not inside cards */}
          <div className="relative mt-8">
            <div className="overflow-hidden" ref={galRef}>
              <div className="flex gap-6">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <Image
                          src={image.src}
                          alt={image.caption}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-xs text-text-muted font-sans leading-relaxed text-center">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => galApi?.scrollPrev()}
                className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-navy-700 hover:bg-navy-50 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${i === galIndex ? "bg-navy-750" : "bg-gray-200"
                      }`}
                    onClick={() => galApi?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => galApi?.scrollNext()}
                className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-navy-700 hover:bg-navy-50 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== 7. TRUST STATISTICS SECTION (NAVY GRADIENT) ==================== */}
      <section className="py-20 bg-navy-gradient text-white relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">

            {/* Metric 1 */}
            <div>
              <AnimatedCounter end={15} suffix="+" />
              <p className="text-white/60 text-xs font-sans mt-2 uppercase tracking-wider">
                Years Experience
              </p>
            </div>

            {/* Metric 2 */}
            <div>
              <AnimatedCounter end={10000} suffix="+" />
              <p className="text-white/60 text-xs font-sans mt-2 uppercase tracking-wider">
                Patients Treated
              </p>
            </div>

            {/* Metric 3 */}
            <div>
              <AnimatedCounter end={5} suffix="+" />
              <p className="text-white/60 text-xs font-sans mt-2 uppercase tracking-wider">
                In-House Diagnostics
              </p>
            </div>

            {/* Metric 4 */}
            <div>
              <AnimatedCounter end={4.9} suffix="/5" />
              <p className="text-white/60 text-xs font-sans mt-2 uppercase tracking-wider">
                Patient Rating
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 8. VIDEO PLAYBACK MODAL ==================== */}
      <AnimatePresence>
        {modalOpen && activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.98, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 8 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl text-navy-900 font-sans"
            >

              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div className="text-left">
                  <h3 className="font-display font-bold text-sm text-navy-900">
                    {activeVideo.videoTitle}
                  </h3>
                  <p className="text-[10px] text-brand-orange font-semibold font-sans mt-0.5">
                    {activeVideo.name} · {activeVideo.condition}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close video player"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Simulated Video Player Screen */}
              <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-6 text-center">

                {/* Pulse wave backdrop */}
                <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center">
                  <div className="w-80 h-80 rounded-full border border-brand-orange animate-ping" style={{ animationDuration: "3s" }} />
                  <div className="w-60 h-60 rounded-full border border-white animate-ping" style={{ animationDuration: "2s" }} />
                </div>

                <div className="relative z-10 space-y-4 max-w-md">
                  {isPlaying ? (
                    <>
                      <div className="w-14 h-14 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange flex items-center justify-center mx-auto mb-2">
                        <Activity size={24} className="animate-pulse" />
                      </div>
                      <h4 className="text-sm font-semibold text-white/90">
                        Streaming Patient Recovery Story...
                      </h4>
                      <p className="text-xs text-white/70 leading-relaxed italic">
                        "{activeVideo.story}"
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                        <Activity size={24} />
                      </div>
                      <h4 className="text-sm font-semibold text-white">Playback Paused / Finished</h4>
                      <button
                        onClick={() => {
                          setVideoProgress(0);
                          setIsPlaying(true);
                        }}
                        className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold rounded transition-colors"
                      >
                        Replay Testimony
                      </button>
                    </>
                  )}
                </div>

                {/* Bottom Overlay Controls */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 border border-white/10 p-3 rounded flex justify-between items-center text-white text-left">
                  <div>
                    <p className="text-[9px] text-white/50 uppercase tracking-wide">Case Outcome</p>
                    <p className="text-xs font-semibold text-white">{activeVideo.stats}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/80"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3 py-1 bg-white/25 hover:bg-white/35 text-white text-xs font-medium rounded"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>
                  </div>
                </div>

              </div>

              {/* Progress Seek Bar */}
              <div className="h-1 w-full bg-slate-100 relative">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-brand-orange transition-all duration-300"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
