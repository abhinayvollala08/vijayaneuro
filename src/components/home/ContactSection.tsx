"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, AlertTriangle } from "lucide-react";
import { SITE } from "@/constants/site";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function ContactSection() {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Contact Vijaya Neuro Hospital"
          subtitle="We're here to help. Reach out for appointments, inquiries, or emergency assistance."
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Phone */}
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-start gap-4 bg-white rounded-2xl p-6 border-l-4 border-brand-orange shadow-sm hover:shadow-card transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Phone size={20} className="text-brand-orange" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-navy-700 text-sm">
                  Phone
                </h3>
                <p className="text-text-body font-sans text-sm mt-1">
                  {SITE.phone}
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}?text=Hi, I would like to inquire about neurological consultation at Vijaya Neuro Hospital.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 bg-white rounded-2xl p-6 border-l-4 border-[#25D366] shadow-sm hover:shadow-card transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <MessageCircle size={20} className="text-[#25D366]" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-navy-700 text-sm">
                  WhatsApp
                </h3>
                <p className="text-text-body font-sans text-sm mt-1">
                  Chat with us instantly
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-start gap-4 bg-white rounded-2xl p-6 border-l-4 border-navy-400 shadow-sm hover:shadow-card transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
                <Mail size={20} className="text-navy-600" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-navy-700 text-sm">
                  Email
                </h3>
                <p className="text-text-body font-sans text-sm mt-1">
                  {SITE.email}
                </p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border-l-4 border-navy-400 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-navy-600" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-navy-700 text-sm">
                  Address
                </h3>
                <p className="text-text-body font-sans text-sm mt-1">
                  {SITE.address.full}
                </p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border-l-4 border-navy-400 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
                <Clock size={20} className="text-navy-600" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-navy-700 text-sm">
                  Clinic Hours
                </h3>
                <p className="text-text-body font-sans text-sm mt-1">
                  {SITE.timings.days}: {SITE.timings.morning} | {SITE.timings.evening}
                </p>
                <p className="text-brand-orange font-sans text-sm">
                  {SITE.timings.closed}
                </p>
              </div>
            </div>

            {/* Emergency */}
            <div className="flex items-start gap-4 bg-red-50 rounded-2xl p-6 border-l-4 border-red-500 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-red-700 text-sm">
                  Emergency
                </h3>
                <p className="text-red-600 font-sans font-medium text-sm mt-1">
                  {SITE.emergency}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-card border border-border h-full min-h-[400px] bg-navy-50 flex items-center justify-center">
              {/* Placeholder for Google Maps embed */}
              <div className="text-center p-8">
                <MapPin size={48} className="text-navy-100 mx-auto mb-4" />
                <p className="text-text-muted font-sans text-sm">
                  Google Maps embed will be added here
                </p>
                <p className="text-text-subtle font-sans text-xs mt-1">
                  {SITE.address.full}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
