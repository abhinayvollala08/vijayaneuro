"use client";

import { Bell, Menu, User } from "lucide-react";
import { useSession } from "next-auth/react";

interface DashboardTopbarProps {
  onMenuClick: () => void;
  title?: string;
}

export function DashboardTopbar({ onMenuClick, title }: DashboardTopbarProps) {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b border-navy-50 sticky top-0 z-30 flex items-center justify-between px-6">
      {/* Left side: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg text-text-muted hover:bg-navy-50 hover:text-navy-900 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        {title && (
          <h1 className="font-display font-semibold text-lg sm:text-xl text-navy-900 leading-none">
            {title}
          </h1>
        )}
      </div>

      {/* Right side: Session Profile & Notifications */}
      <div className="flex items-center gap-4 font-sans">
        {/* Notification bell placeholder */}
        <button
          className="p-2 text-text-muted hover:bg-navy-50 hover:text-navy-900 rounded-xl relative transition-colors"
          aria-label="View notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-orange" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 border-l border-navy-50 pl-4">
          <div className="text-right hidden sm:block">
            <span className="block text-xs font-bold text-navy-900 leading-none">
              {session?.user?.name || "User"}
            </span>
            <span className="inline-block text-[9px] font-bold text-brand-orange uppercase tracking-wider mt-1 leading-none">
              {session?.user?.role || "Patient"}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
