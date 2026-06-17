"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Phone,
  Brain,
  Activity,
  Shield,
  Star,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Clock,
  Building,
  Users,
  Award
} from "lucide-react";
import { SITE } from "@/constants/site";

const slides = [
  {
    image: "/doctor-hero2.jpg",
    label: "Expert Neurology Care",
    headline: "Expert Neurology & Neurosurgery Care You Can Trust",
    description: "Advanced neurological diagnosis and treatment delivered by experienced specialists using modern clinical protocols.",
    highlights: [
      "Stroke & Emergency Neuro Care",
      "Brain & Spine Surgery",
      "Epilepsy Management",
      "Movement Disorders Treatment",
    ],
    credibility: {
      name: SITE.doctor.name,
      quals: SITE.doctor.quals,
      exp: "15+ Years of Clinical Experience",
    },
    primaryCta: { text: "Book Appointment", href: "/appointment" },
    secondaryCta: { text: "Call Now", href: "tel:+919121568899" },
  },
  {
    image: "/hospital_eeg_lab.png",
    label: "Precision Diagnostics",
    headline: "Precision Diagnostics with Advanced Neuro Technology",
    description: "Accurate neurological evaluation powered by modern imaging and diagnostic systems for faster, safer treatment decisions.",
    highlights: [
      "MRI & CT Scans",
      "EEG & EMG Testing",
      "Neurophysiology Lab",
      "Early Detection Systems",
    ],
    primaryCta: { text: "Explore Services", href: "/diagnostics" },
    secondaryCta: { text: "Book Consultation", href: "/appointment" },
  },
  {
    image: "/hospital_icu.png",
    label: "Trusted Hospital Experience",
    headline: "Compassionate Care in a World-Class Neuro Hospital",
    description: "We combine advanced neurological care with a patient-first approach, ensuring safety, comfort, and trust at every stage of treatment.",
    highlights: [
      "24/7 Emergency Neuro Care",
      "Dedicated Neuro ICU",
      "Hygienic, Modern Infrastructure",
      "High Patient Satisfaction",
    ],
    primaryCta: { text: "Emergency Assistance", href: "tel:+919121568899" },
    secondaryCta: { text: "Get Directions (Google Maps)", href: "https://maps.google.com/?q=Vijaya+Neuro+Hospital" },
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Swipe support states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNextSlide();
      if (e.key === "ArrowLeft") handlePrevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  // Autoplay (pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, currentSlide]);

  // Mobile swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) handleNextSlide();
    if (isRightSwipe) handlePrevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[100vh] lg:h-[100vh] flex flex-col justify-between overflow-hidden bg-navy-900"
    >
      {/* Background Images with Fade Transition */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].headline}
              fill
              className="object-cover object-center pointer-events-none"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Linear dark gradient overlay for typography contrast */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right, rgba(12, 36, 68, 0.75), rgba(12, 36, 68, 0.55))" }} />
      </div>

      {/* Main Slide Content Grid */}
      <div className="container-custom flex-grow flex items-center relative z-25 py-16 md:py-24">
        <div className="w-full max-w-3xl">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-left"
            >
              {/* Trust Badge label */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4.5 py-1.5 shadow-sm">
                <Shield size={14} className="text-brand-orange" />
                <span className="text-white text-xs font-bold uppercase tracking-wider font-sans">
                  {slides[currentSlide].label}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-bold text-4xl sm:text-5xl xl:text-6xl text-white leading-[1.10]">
                {slides[currentSlide].headline}
              </h1>

              {/* Description */}
              <p className="text-white/80 text-base sm:text-lg font-sans leading-relaxed max-w-2xl">
                {slides[currentSlide].description}
              </p>

              {/* Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl">
                {slides[currentSlide].highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                    <span className="font-sans font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Slide 1 Doctor Specific Credibility Card */}
              {slides[currentSlide].credibility && (
                <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl max-w-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                    <Award size={20} />
                  </div>
                  <div className="text-white">
                    <h4 className="font-display font-bold text-sm">
                      {slides[currentSlide].credibility?.name}
                    </h4>
                    <p className="text-[11px] text-white/70 font-sans mt-0.5">
                      {slides[currentSlide].credibility?.quals} · {slides[currentSlide].credibility?.exp}
                    </p>
                  </div>
                </div>
              )}

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href={slides[currentSlide].primaryCta.href}>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-sans font-bold px-8 py-4 rounded-xl shadow-orange hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(246,125,32,0.45)] transition-all cursor-pointer">
                    {slides[currentSlide].primaryCta.text === "Emergency Assistance" ? (
                      <>
                        <Phone size={18} />
                        {slides[currentSlide].primaryCta.text}
                      </>
                    ) : (
                      <>
                        <Calendar size={18} />
                        {slides[currentSlide].primaryCta.text}
                      </>
                    )}
                  </button>
                </Link>
                <Link 
                  href={slides[currentSlide].secondaryCta.href}
                  target={slides[currentSlide].secondaryCta.href.startsWith("http") ? "_blank" : undefined}
                  rel={slides[currentSlide].secondaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white/30 hover:border-brand-orange text-white hover:text-brand-orange font-sans font-bold px-8 py-4 rounded-xl transition-all cursor-pointer">
                    {slides[currentSlide].secondaryCta.text.includes("Get Directions") ? (
                      <>
                        <MapPin size={18} />
                        {slides[currentSlide].secondaryCta.text}
                      </>
                    ) : (
                      <>
                        <Phone size={18} />
                        {slides[currentSlide].secondaryCta.text}
                      </>
                    )}
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Manual Slide Controls + Dot Navigation */}
      <div className="container-custom flex justify-between items-center relative z-25 py-4 border-t border-white/10">
        {/* Pagination indicator dots */}
        <div className="flex gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? "w-8 bg-brand-orange" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Arrow navigators */}
        <div className="flex gap-3">
          <button
            onClick={handlePrevSlide}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextSlide}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Global Trust Badges below Hero Content */}
      <div className="bg-navy-950 border-t border-white/5 py-5 relative z-25">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            {[
              { label: "24/7 Emergency Care", subtitle: "Immediate stroke triage code", icon: Clock },
              { label: "Experienced Specialists", subtitle: "Expert clinical leadership", icon: Award },
              { label: "Advanced Neuro Technology", subtitle: "High precision EEG & diagnostics", icon: Brain },
              { label: "Patient-Centered Care", subtitle: "Accredited standards facility", icon: Shield }
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col sm:flex-row items-center md:items-start gap-3 px-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 text-brand-orange flex items-center justify-center shrink-0">
                  <badge.icon size={20} />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white font-sans leading-tight">
                    {badge.label}
                  </h4>
                  <p className="text-[10px] text-white/50 font-sans mt-0.5">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
