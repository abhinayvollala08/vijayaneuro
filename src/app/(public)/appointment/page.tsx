import { AppointmentForm } from "@/components/home/AppointmentForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book an Appointment",
  description: "Schedule your neurology consultation or diagnostic tests (Video EEG, ENMG) with Dr. Dasari Venkatesh at Vijaya Neuro Hospital.",
});

export default function AppointmentPage() {
  return (
    <div className="bg-navy-900/5 min-h-screen pt-24 pb-12">
      <div className="container-custom max-w-4xl pt-8 text-center mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 mb-3">
          Book Your Appointment
        </h1>
        <p className="text-text-muted font-sans text-sm sm:text-base max-w-lg mx-auto">
          Please fill out the form below. Our clinic staff will contact you shortly via phone or WhatsApp to finalize your consultation time.
        </p>
      </div>

      <div className="relative -mt-10">
        <AppointmentForm />
      </div>

      {/* Appointment Prep Information */}
      <div className="container-custom max-w-4xl mt-12 bg-white rounded-2xl border border-navy-100 p-8 shadow-sm">
        <h2 className="font-display font-semibold text-xl text-navy-900 mb-4">
          Important Consultation Guidelines
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-text-body font-sans leading-relaxed">
          <div>
            <h3 className="font-bold text-navy-800 mb-2">What to Bring</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>All previous medical records, prescriptions, and discharge summaries</li>
              <li>Recent brain/spine CT scans or MRI films and reports</li>
              <li>A list of current medications and dosages</li>
              <li>Government ID and insurance cards (if applicable)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-navy-800 mb-2">EEG & ENMG Patient Prep</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>For **EEG**: Wash your hair thoroughly with shampoo the night before or morning of. Do not apply hair oils, gels, or sprays.</li>
              <li>For **ENMG**: Ensure your skin is clean. Avoid applying body lotions, creams, or oils on your limbs prior to the test.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
