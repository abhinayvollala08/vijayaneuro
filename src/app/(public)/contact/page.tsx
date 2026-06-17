"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, AlertTriangle, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { SITE } from "@/constants/site";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSubmitted(true);
      reset();
      toast.success("Your message has been sent successfully!");
    } catch {
      toast.error("Could not send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-navy-900/5 min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Contact Vijaya Neuro Hospital"
          subtitle="We're here to help. Reach out directly or send us an inquiry online."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
          {/* Left Panel: Contact info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone */}
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-start gap-4 bg-white rounded-2xl p-5 border-l-4 border-brand-orange shadow-sm hover:shadow-md transition-all block"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-brand-orange">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-navy-700 text-sm">Phone</h3>
                <p className="text-text-body font-sans text-sm mt-1">{SITE.phone}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}?text=Hi, I would like to inquire about neurological consultation at Vijaya Neuro Hospital.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 bg-white rounded-2xl p-5 border-l-4 border-[#25D366] shadow-sm hover:shadow-md transition-all block"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-[#25D366]">
                <MessageCircle size={18} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-navy-700 text-sm">WhatsApp</h3>
                <p className="text-text-body font-sans text-sm mt-1">Chat with us instantly</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-start gap-4 bg-white rounded-2xl p-5 border-l-4 border-navy-400 shadow-sm hover:shadow-md transition-all block"
            >
              <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center shrink-0 text-navy-600">
                <Mail size={18} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-navy-700 text-sm">Email</h3>
                <p className="text-text-body font-sans text-sm mt-1">{SITE.email}</p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border-l-4 border-navy-400 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center shrink-0 text-navy-600">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-navy-700 text-sm">Location Address</h3>
                <p className="text-text-body font-sans text-sm mt-1 leading-relaxed">{SITE.address.full}</p>
              </div>
            </div>

            {/* Clinic Timings */}
            <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border-l-4 border-navy-400 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center shrink-0 text-navy-600">
                <Clock size={18} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-navy-700 text-sm">Clinic Timings</h3>
                <p className="text-text-body font-sans text-xs sm:text-sm mt-1">
                  {SITE.timings.days}: {SITE.timings.morning} | {SITE.timings.evening}
                </p>
                <p className="text-brand-orange font-sans font-semibold text-xs mt-1">
                  {SITE.timings.closed}
                </p>
              </div>
            </div>

            {/* Emergency Hotline */}
            <div className="flex items-start gap-4 bg-red-50 rounded-2xl p-5 border-l-4 border-red-500 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0 text-red-600">
                <AlertTriangle size={18} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-red-700 text-sm">Stroke / Neuro Emergency</h3>
                <p className="text-red-600 font-sans font-bold text-sm mt-1">{SITE.emergency}</p>
              </div>
            </div>
          </div>

          {/* Right Panel: Form and Map (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Form Card */}
            <Card className="p-8 border-navy-100 bg-white shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                    <CheckCircle size={28} className="text-emerald-600" />
                  </div>
                  <h3 className="font-display font-bold text-navy-700 text-2xl mb-2">Message Sent!</h3>
                  <p className="text-text-muted font-sans text-sm max-w-sm mb-6">
                    We've received your query. Our clinic coordinator will get back to you by email or phone shortly.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <h2 className="font-display font-bold text-xl text-navy-900 mb-4">Send Us an Inquiry</h2>
                  
                  <Input
                    label="Your Name *"
                    placeholder="Full name"
                    {...register("name")}
                    error={errors.name?.message}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address *"
                      type="email"
                      placeholder="name@example.com"
                      {...register("email")}
                      error={errors.email?.message}
                    />
                    <Input
                      label="Phone Number (Optional)"
                      placeholder="+91 XXXXX XXXXX"
                      {...register("phone")}
                      error={errors.phone?.message}
                    />
                  </div>

                  <Input
                    label="Subject *"
                    placeholder="What is your query about?"
                    {...register("subject")}
                    error={errors.subject?.message}
                  />

                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5 font-sans">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      placeholder="Type your message, questions, or medical concerns here..."
                      rows={4}
                      className="flex w-full rounded-xl border border-border bg-white px-4 py-3 text-sm font-sans text-text-body placeholder:text-text-subtle transition-all resize-y focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-danger font-sans">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" disabled={loading} className="w-full justify-center mt-2">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Inquiry Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>

            {/* Map Placeholder or Embed */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-navy-100 h-64 bg-navy-50 flex items-center justify-center relative group">
              <div className="text-center p-6 relative z-10">
                <MapPin size={32} className="text-brand-orange mx-auto mb-2" />
                <p className="text-text-primary font-sans text-sm font-semibold">Vijaya Neuro Hospital Location</p>
                <p className="text-text-muted font-sans text-xs mt-1 max-w-md">{SITE.address.full}</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block mt-4 text-xs font-bold text-brand-orange hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
