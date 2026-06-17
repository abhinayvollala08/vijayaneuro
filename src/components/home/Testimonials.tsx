"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const testimonials = [
  {
    patientName: "Rajesh Kumar",
    treatment: "Stroke Recovery",
    content: "After my stroke, I was worried about recovery. Dr. Venkatesh and the team at Vijaya Neuro Hospital gave me hope and an excellent treatment plan. Within months, I regained significant mobility. The rehabilitation program was thorough and compassionate.",
    rating: 5,
    location: "Telangana",
  },
  {
    patientName: "Priya Sharma",
    treatment: "Epilepsy Management",
    content: "My daughter was diagnosed with epilepsy, and the Video EEG facility here was crucial for accurate diagnosis. Dr. Venkatesh explained everything clearly, adjusted her medication perfectly, and she has been seizure-free for over a year now.",
    rating: 5,
    location: "Telangana",
  },
  {
    patientName: "Mohammed Farooq",
    treatment: "Migraine Treatment",
    content: "I suffered from severe migraines for years, visiting multiple doctors without relief. At Vijaya Neuro Hospital, the approach was different — thorough evaluation, proper diagnosis, and a treatment plan that actually works. My quality of life has improved dramatically.",
    rating: 5,
    location: "Telangana",
  },
  {
    patientName: "Lakshmi Devi",
    treatment: "Neuropathy Diagnosis",
    content: "The numbness and weakness in my hands had been worsening for months. The ENMG test at Vijaya Neuro identified the exact nerve problem. Dr. Venkatesh started the right treatment immediately, and I have seen remarkable improvement.",
    rating: 5,
    location: "Telangana",
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);

    // Auto-play
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Patient Testimonials"
          title="Lives Changed Through Expert Neurological Care"
          subtitle="Real stories from patients who trusted Vijaya Neuro Hospital for their neurological care."
        />

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div className="bg-white rounded-2xl border border-border shadow-card p-8 h-full flex flex-col">
                    {/* Quote mark */}
                    <span className="font-display text-6xl text-orange-100 leading-none -mt-2 -mb-4">
                      &ldquo;
                    </span>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-text-body text-[15px] font-sans leading-relaxed italic flex-1 mb-6">
                      {t.content}
                    </p>

                    {/* Patient info */}
                    <div className="pt-4 border-t border-border">
                      <p className="font-sans font-bold text-navy-700 text-sm">
                        {t.patientName}
                      </p>
                      <p className="text-text-muted text-xs font-sans">
                        {t.location}
                      </p>
                      <span className="inline-block mt-2 bg-orange-100 text-orange-600 text-xs font-semibold font-sans px-3 py-1 rounded-full">
                        {t.treatment}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-navy-700 hover:bg-navy-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === selectedIndex ? "bg-navy-700" : "bg-gray-200"
                  }`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-navy-700 hover:bg-navy-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
