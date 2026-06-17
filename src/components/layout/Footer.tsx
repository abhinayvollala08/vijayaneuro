import Link from "next/link";
import {
  Brain,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { SITE } from "@/constants/site";
import { DISORDERS } from "@/constants/disorders";

function FacebookIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <polygon points="9.7 9 15.5 12 9.7 15" />
    </svg>
  );
}

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Doctor", href: "/doctor" },
  { label: "Diagnostics", href: "/diagnostics" },
  { label: "Rehabilitation", href: "/rehabilitation" },
  { label: "Contact", href: "/contact" },
  { label: "Book Appointment", href: "/appointment" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      {/* Main footer */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white block leading-none">
                  Vijaya Neuro
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-brand-orange font-semibold">
                  Hospital
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm font-sans leading-relaxed mb-6">
              {SITE.tagline}. Comprehensive diagnosis, treatment, and
              rehabilitation for all neurological conditions.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FacebookIcon, href: "#", label: "Facebook" },
                { icon: YoutubeIcon, href: "#", label: "YouTube" },
                { icon: InstagramIcon, href: "#", label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:bg-brand-orange/20 hover:text-brand-orange hover:border-brand-orange/30 transition-all"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm font-sans hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Treatments */}
          <div>
            <h3 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-6">
              Treatments
            </h3>
            <ul className="space-y-3">
              {DISORDERS.filter((d) => d.slug).slice(0, 6).map((disorder) => (
                <li key={disorder.slug}>
                  <Link
                    href={`/disorders/${disorder.slug}`}
                    className="text-white/60 text-sm font-sans hover:text-brand-orange transition-colors"
                  >
                    {disorder.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-brand-orange mt-0.5 shrink-0"
                />
                <span className="text-white/60 text-sm font-sans">
                  {SITE.address.full}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-3 text-white/60 text-sm font-sans hover:text-brand-orange transition-colors"
                >
                  <Phone size={16} className="text-brand-orange shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-white/60 text-sm font-sans hover:text-brand-orange transition-colors"
                >
                  <Mail size={16} className="text-brand-orange shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  size={16}
                  className="text-brand-orange mt-0.5 shrink-0"
                />
                <div className="text-white/60 text-sm font-sans">
                  <p>{SITE.timings.days}</p>
                  <p>
                    {SITE.timings.morning} | {SITE.timings.evening}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-white/40 text-xs font-sans">
            © {currentYear} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/40 text-xs font-sans">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
