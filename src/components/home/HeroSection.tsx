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
    headline: "Expert Neurology & Neurosurgery Care",
    description: "Advanced neurological diagnostics and surgery led by experienced specialists.",
    highlights: [
      "Stroke Emergency Care",
      "Brain & Spine Surgery",
      "Epilepsy & Seizure Care",
      "Movement Disorders"
    ],
    credibility: {
      icon: Award,
      name: SITE.doctor.name,
      quals: SITE.doctor.quals,
      exp: "15+ Years Experience",
    },
    primaryCta: { text: "Book Appointment", href: "/appointment" },
    secondaryCta: { text: "Call Now", href: `tel:${SITE.phone}` },
  },
  {
    image: "/hospital_eeg_lab.png",
    label: "Precision Diagnostics",
    headline: "Precision Neuro Diagnostics",
    description: "Accurate evaluation powered by state-of-the-art neurophysiology lab technology.",
    highlights: [
      "In-House Video EEG",
      "Electromyography (EMG)",
      "High-Resolution Imaging",
      "Rapid Laboratory Lab"
    ],
    credibility: {
      icon: Brain,
      name: "Advanced Diagnostics Lab",
      quals: "In-house Video EEG & ENMG",
      exp: "Accredited Standards",
    },
    primaryCta: { text: "Explore Services", href: "/diagnostics" },
    secondaryCta: { text: "Book Consultation", href: "/appointment" },
  },
  {
    image: "/hospital_icu.png",
    label: "Trusted Hospital Experience",
    headline: "24/7 Emergency Neuro Care",
    description: "World-class care in a patient-first facility with a dedicated neuro ICU.",
    highlights: [
      "24/7 Stroke Response",
      "Dedicated Neuro ICU",
      "Modern Infrastructure",
      "Highly Rated Patient Care"
    ],
    credibility: {
      icon: Shield,
      name: "24/7 Stroke Care Unit",
      quals: "Dedicated Neuro ICU Facility",
      exp: "Immediate Response",
    },
    primaryCta: { text: "Emergency Assistance", href: `tel:${SITE.emergency}` },
    secondaryCta: { text: "Get Directions", href: "/contact" },
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Swipe support states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleManualNext = () => {
    setUserInteracted(true);
    handleNextSlide();
  };

  const handleManualPrev = () => {
    setUserInteracted(true);
    handlePrevSlide();
  };

  const handleSelectSlide = (idx: number) => {
    setUserInteracted(true);
    setCurrentSlide(idx);
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setUserInteracted(true);
        handleNextSlide();
      }
      if (e.key === "ArrowLeft") {
        setUserInteracted(true);
        handlePrevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  // Autoplay (pauses on hover, permanently stops on manual user interaction)
  useEffect(() => {
    if (isHovered || userInteracted) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [isHovered, userInteracted, currentSlide]);

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
    if (isLeftSwipe) {
      setUserInteracted(true);
      handleNextSlide();
    }
    if (isRightSwipe) {
      setUserInteracted(true);
      handlePrevSlide();
    }
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
      className="relative min-h-[100dvh] flex flex-col justify-between bg-navy-900 lg:py-8 py-4"
    >
      {/* Background Images with Fade Transition */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
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

        {/* Dynamic, readability-focused overlay gradients */}
        <div 
          className="absolute inset-0 z-10 block md:hidden" 
          style={{ background: "linear-gradient(to bottom, rgba(12, 36, 68, 0.95), rgba(12, 36, 68, 0.85))" }} 
        />
        <div 
          className="absolute inset-0 z-10 hidden md:block" 
          style={{ background: "linear-gradient(to right, rgba(12, 36, 68, 0.96) 0%, rgba(12, 36, 68, 0.85) 45%, rgba(12, 36, 68, 0.35) 100%)" }} 
        />
      </div>

      {/* Main Slide Content Grid */}
      <div className="container-custom flex-grow flex items-center relative z-25 pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="w-full max-w-3xl">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-left"
            >
              {/* Trust Badge label */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1 shadow-sm">
                <Shield size={12} className="text-brand-orange" />
                <span className="text-white text-[11px] font-bold uppercase tracking-wider font-sans">
                  {slides[currentSlide].label}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-bold text-3xl sm:text-4xl xl:text-5xl text-white leading-[1.10]">
                {slides[currentSlide].headline}
              </h1>

              {/* Description */}
              <p className="text-white/80 text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
                {slides[currentSlide].description}
              </p>

              {/* Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-xl">
                {slides[currentSlide].highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                    <CheckCircle2 size={14} className="text-brand-orange shrink-0" />
                    <span className="font-sans font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Slide Credibility Card */}
              {(() => {
                const cred = slides[currentSlide].credibility;
                if (!cred) return null;
                const IconComponent = cred.icon;
                return (
                  <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xl max-w-lg flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                      <IconComponent size={16} />
                    </div>
                    <div className="text-white">
                      <h4 className="font-display font-bold text-xs sm:text-sm">
                        {cred.name}
                      </h4>
                      <p className="text-[10px] text-white/70 font-sans mt-0.5">
                        {cred.quals} · {cred.exp}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link href={slides[currentSlide].primaryCta.href}>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-sans font-bold px-6 py-3 text-sm rounded-lg shadow-orange hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(246,125,32,0.45)] transition-all cursor-pointer">
                    {slides[currentSlide].primaryCta.text === "Emergency Assistance" ? (
                      <>
                        <Phone size={16} />
                        {slides[currentSlide].primaryCta.text}
                      </>
                    ) : (
                      <>
                        <Calendar size={16} />
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
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white/30 hover:border-brand-orange text-white hover:text-brand-orange font-sans font-bold px-6 py-3 text-sm rounded-lg transition-all cursor-pointer">
                    {slides[currentSlide].secondaryCta.text.includes("Get Directions") ? (
                      <>
                        <MapPin size={16} />
                        {slides[currentSlide].secondaryCta.text}
                      </>
                    ) : (
                      <>
                        <Phone size={16} />
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
              onClick={() => handleSelectSlide(idx)}
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
            onClick={handleManualPrev}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleManualNext}
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
