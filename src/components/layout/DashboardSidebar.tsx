"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
  Bell,
  User,
  Clock,
  Users,
  FolderOpen,
  Stethoscope,
  BarChart3,
  Settings,
  PenSquare,
  Image as ImageIcon,
  Search,
  LogOut,
  Brain,
  X,
} from "lucide-react";
import { DASHBOARD_NAV } from "@/constants/navigation";

const iconMap: Record<string, any> = {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
  Bell,
  User,
  Clock,
  Users,
  FolderOpen,
  Stethoscope,
  BarChart3,
  Settings,
  PenSquare,
  Image: ImageIcon,
  Search,
};

interface DashboardSidebarProps {
  role: "PATIENT" | "DOCTOR" | "ADMIN" | "EDITOR";
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ role, isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const navItems = DASHBOARD_NAV[role] || [];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-navy-900 border-r border-white/5 text-white flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center">
              <Brain className="w-4.5 h-4.5 text-brand-orange" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-none">
                Vijaya Neuro
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-brand-orange font-bold">
                Hospital
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-brand-orange text-white shadow-orange"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer sign out */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
          >
            <LogOut size={18} className="shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
