"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Calendar,
  Menu,
  X,
  ChevronDown,
  Brain,
} from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Top info bar */}
      <div className="hidden lg:block bg-navy-800 text-white/80 text-xs font-sans">
        <div className="container-custom flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <span>{SITE.timings.days}: {SITE.timings.morning} | {SITE.timings.evening}</span>
            <span className="text-orange-400">{SITE.timings.closed}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-card border-b border-border"
            : "bg-white"
        )}
      >
        <div className="container-custom flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-navy-gradient flex items-center justify-center shadow-card group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-navy-700 text-lg leading-none block">
                Vijaya Neuro
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-brand-orange font-semibold">
                Hospital
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium font-sans transition-colors",
                    pathname === item.href
                      ? "text-brand-orange bg-orange-50"
                      : "text-navy-700 hover:text-brand-orange hover:bg-navy-50"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-card-lg border border-border p-2 z-50"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2.5 rounded-xl text-sm font-sans transition-colors",
                            pathname === child.href
                              ? "text-brand-orange bg-orange-50"
                              : "text-navy-700 hover:bg-navy-50 hover:text-brand-orange"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 text-sm text-navy-700 hover:text-brand-orange transition-colors font-sans"
            >
              <Phone size={16} />
              <span className="font-medium">Call</span>
            </a>
            <Button asChild size="sm">
              <Link href="/appointment">
                <Calendar size={15} />
                Book Appointment
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-navy-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X size={24} className="text-navy-700" />
            ) : (
              <Menu size={24} className="text-navy-700" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border bg-white overflow-hidden"
            >
              <nav className="container-custom py-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-sm font-medium font-sans transition-colors",
                        pathname === item.href
                          ? "text-brand-orange bg-orange-50"
                          : "text-navy-700 hover:bg-navy-50"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 rounded-lg text-sm text-text-muted hover:text-brand-orange hover:bg-navy-50 transition-colors font-sans"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-border">
                  <Button asChild className="w-full">
                    <Link href="/appointment">
                      <Calendar size={16} />
                      Book Appointment
                    </Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
