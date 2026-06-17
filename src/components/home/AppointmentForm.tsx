"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Calendar, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { SITE } from "@/constants/site";
import { SERVICES } from "@/constants/disorders";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  appointmentSchema,
  type AppointmentFormData,
} from "@/lib/validations/appointment";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      reset();
      toast.success("Appointment request submitted successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="appointment" className="py-20 lg:py-28 overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-card-lg">
          {/* Left: Navy panel */}
          <div className="bg-navy-gradient p-10 lg:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-orange/[0.08] blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <SectionHeader
                eyebrow="Book Appointment"
                title="Schedule Your Consultation"
                centered={false}
                dark
              />

              <p className="text-white/65 font-sans leading-relaxed mb-10">
                Take the first step towards better neurological health.
                Book your appointment with our specialist today.
              </p>

              {/* Quick contact links */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: Phone, label: SITE.phone, href: `tel:${SITE.phone}` },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp Us",
                    href: `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}`,
                  },
                  { icon: MapPin, label: SITE.address.full, href: "#" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm font-sans"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center">
                      <item.icon size={16} className="text-brand-orange" />
                    </div>
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Timings card */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-brand-orange" />
                  <span className="font-sans font-semibold text-sm">
                    Clinic Hours
                  </span>
                </div>
                <div className="text-white/60 text-sm font-sans space-y-1">
                  <p>
                    {SITE.timings.days}: {SITE.timings.morning}
                  </p>
                  <p>Evening: {SITE.timings.evening}</p>
                  <p className="text-brand-orange">{SITE.timings.closed}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-10 lg:p-14">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-emerald-600" />
                </div>
                <h3 className="font-display font-bold text-navy-700 text-2xl mb-3">
                  Thank You!
                </h3>
                <p className="text-text-muted font-sans max-w-sm mb-6">
                  Your appointment request has been received. Our team will
                  contact you shortly to confirm your booking.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Book Another Appointment
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <h3 className="font-display font-bold text-navy-700 text-xl mb-6">
                  Fill Your Details
                </h3>

                <Input
                  label="Patient Name *"
                  placeholder="Full name"
                  {...register("patientName")}
                  error={errors.patientName?.message?.toString()}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Mobile Number *"
                    placeholder="+91 XXXXX XXXXX"
                    {...register("phone")}
                    error={errors.phone?.message?.toString()}
                  />
                  <Input
                    label="Age"
                    type="number"
                    placeholder="Age"
                    {...register("age")}
                    error={errors.age?.message?.toString()}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5 font-sans">
                      Gender
                    </label>
                    <select
                      {...register("gender")}
                      className="flex h-11 w-full rounded-xl border border-border bg-white px-4 py-2 text-sm font-sans text-text-body transition-all focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5 font-sans">
                      Service Required *
                    </label>
                    <select
                      {...register("service")}
                      className="flex h-11 w-full rounded-xl border border-border bg-white px-4 py-2 text-sm font-sans text-text-body transition-all focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                    >
                      <option value="">Select service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1.5 text-xs text-danger font-sans">
                        {errors.service.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>

                <Input
                  label="Preferred Date *"
                  type="date"
                  {...register("preferredDate")}
                  error={errors.preferredDate?.message?.toString()}
                />

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5 font-sans">
                    Message (Optional)
                  </label>
                  <textarea
                    {...register("message")}
                    placeholder="Describe your symptoms or concerns..."
                    rows={3}
                    className="flex w-full rounded-xl border border-border bg-white px-4 py-3 text-sm font-sans text-text-body placeholder:text-text-subtle transition-all resize-y focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      Book Appointment
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
