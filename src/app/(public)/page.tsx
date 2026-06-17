import { HeroSection } from "@/components/home/HeroSection";
import { QuickServices } from "@/components/home/QuickServices";
import { AboutSection } from "@/components/home/AboutSection";
import { DisordersGrid } from "@/components/home/DisordersGrid";
import { DiagnosticsSection } from "@/components/home/DiagnosticsSection";
import { RehabSection } from "@/components/home/RehabSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { DoctorProfile } from "@/components/home/DoctorProfile";
import { PatientJourney } from "@/components/home/PatientJourney";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
import { AppointmentForm } from "@/components/home/AppointmentForm";
import { ContactSection } from "@/components/home/ContactSection";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { SITE } from "@/constants/site";

const hospitalSchema = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: SITE.name,
  description: SITE.tagline,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.pin,
    addressCountry: "IN",
  },
  medicalSpecialty: "Neurology",
  openingHours: "Mo-Sa 09:00-13:00, Mo-Sa 17:00-20:00",
};

const doctorSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: SITE.doctor.name,
  description: `${SITE.doctor.title} — ${SITE.doctor.specialty}`,
  medicalSpecialty: "Neurology",
  worksFor: {
    "@type": "Hospital",
    name: SITE.name,
  },
};

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={hospitalSchema} />
      <SchemaMarkup schema={doctorSchema} />

      <HeroSection />
      <QuickServices />
      <AboutSection />
      <DisordersGrid />
      <DiagnosticsSection />
      <RehabSection />
      <WhyChooseUs />
      <DoctorProfile />
      <PatientJourney />
      <Testimonials />
      <FAQSection />
      <AppointmentForm />
      <ContactSection />
    </>
  );
}
