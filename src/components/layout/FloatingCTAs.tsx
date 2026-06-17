"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { SITE } from "@/constants/site";

export function FloatingCTAs() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Scroll to top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-navy-700 text-white shadow-card-lg flex items-center justify-center hover:bg-navy-600 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call button */}
      <a
        href={`tel:${SITE.phone}`}
        className="w-12 h-12 rounded-full bg-brand-orange text-white shadow-orange flex items-center justify-center hover:bg-orange-600 transition-colors hover:-translate-y-0.5"
        aria-label="Call us"
      >
        <Phone size={20} />
      </a>

      {/* WhatsApp button */}
      <a
        href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}?text=Hi, I would like to book an appointment at Vijaya Neuro Hospital.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:bg-[#20BD5A] transition-colors hover:-translate-y-0.5"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={20} />
      </a>
    </div>
  );
}
