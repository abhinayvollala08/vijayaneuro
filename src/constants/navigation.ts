import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Doctor", href: "/doctor" },
  {
    label: "Treatments",
    href: "/disorders",
    children: [
      { label: "Stroke Treatment", href: "/disorders/stroke-treatment" },
      { label: "Epilepsy Care", href: "/disorders/epilepsy-treatment" },
      { label: "Migraine Treatment", href: "/disorders/migraine-treatment" },
      { label: "Paralysis Treatment", href: "/disorders/paralysis-treatment" },
      {
        label: "Memory Loss / Dementia",
        href: "/disorders/memory-loss-treatment",
      },
      { label: "Vertigo Treatment", href: "/disorders/vertigo-treatment" },
      { label: "Neuropathy", href: "/disorders/neuropathy-treatment" },
      { label: "Spinal Disorders", href: "/disorders/spinal-disorders" },
      { label: "View All Disorders", href: "/disorders" },
    ],
  },
  { label: "Diagnostics", href: "/diagnostics" },
  { label: "Rehabilitation", href: "/rehabilitation" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Health Blog", href: "/resources" },
      { label: "Symptom Router", href: "/tools/symptom-router" },
      { label: "Stroke Risk Calculator", href: "/tools/stroke-risk" },
      { label: "Seizure Prep Quiz", href: "/tools/seizure-assessment" },
      { label: "FAQs", href: "/resources#faq" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const DASHBOARD_NAV = {
  PATIENT: [
    { label: "Dashboard", href: "/patient/dashboard", icon: "LayoutDashboard" },
    {
      label: "Appointments",
      href: "/patient/appointments",
      icon: "Calendar",
    },
    { label: "Reports", href: "/patient/reports", icon: "FileText" },
    {
      label: "Consultations",
      href: "/patient/consultations",
      icon: "MessageSquare",
    },
    {
      label: "Notifications",
      href: "/patient/notifications",
      icon: "Bell",
    },
    { label: "Profile", href: "/patient/profile", icon: "User" },
  ],
  DOCTOR: [
    { label: "Dashboard", href: "/doctor/dashboard", icon: "LayoutDashboard" },
    { label: "Schedule", href: "/doctor/schedule", icon: "Clock" },
    { label: "Patients", href: "/doctor/patients", icon: "Users" },
    {
      label: "Appointments",
      href: "/doctor/appointments",
      icon: "Calendar",
    },
    { label: "Records", href: "/doctor/records", icon: "FolderOpen" },
    { label: "Messages", href: "/doctor/messages", icon: "MessageSquare" },
    { label: "Profile", href: "/doctor/profile", icon: "User" },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
    {
      label: "Appointments",
      href: "/admin/appointments",
      icon: "Calendar",
    },
    { label: "Users", href: "/admin/users", icon: "Users" },
    { label: "Doctors", href: "/admin/doctors", icon: "Stethoscope" },
    { label: "Content", href: "/admin/content", icon: "FileText" },
    { label: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
    { label: "Settings", href: "/admin/settings", icon: "Settings" },
  ],
  EDITOR: [
    { label: "Dashboard", href: "/editor/dashboard", icon: "LayoutDashboard" },
    { label: "Blog Posts", href: "/editor/blogs", icon: "PenSquare" },
    { label: "Media", href: "/editor/media", icon: "Image" },
    { label: "SEO", href: "/editor/seo", icon: "Search" },
  ],
};
