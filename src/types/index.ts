/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}

/* ── Common Types ─────────────────────────────── */

export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN" | "EDITOR";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: string;
}

export interface Disorder {
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  color: string;
  priority: boolean;
}

export interface Diagnostic {
  id: string;
  title: string;
  icon: string;
  desc: string;
  badge: string;
  featured: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  phone: string;
  whatsapp: string;
  email: string;
  emergency: string;
  address: {
    street: string;
    city: string;
    state: string;
    pin: string;
    full: string;
  };
  timings: {
    morning: string;
    evening: string;
    days: string;
    closed: string;
  };
  stats: {
    patients: string;
    experience: string;
    diagnostics: string;
    rating: string;
  };
  doctor: {
    name: string;
    quals: string;
    title: string;
    specialty: string;
    experience: string;
  };
}

export interface TestimonialData {
  patientName: string;
  treatment: string;
  content: string;
  rating: number;
  location?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TimelineStep {
  step: number;
  title: string;
  description: string;
  highlighted?: boolean;
}

export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
}

export interface RehabProgram {
  icon: string;
  title: string;
  description: string;
}
