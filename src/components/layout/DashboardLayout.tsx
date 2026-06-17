"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-50/20">
        <div className="w-8 h-8 border-3 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback role if session not initialized (should be caught by middleware)
  const role = (session?.user?.role as any) || "PATIENT";

  return (
    <div className="min-h-screen bg-navy-50/20 text-text-body">
      {/* Sidebar */}
      <DashboardSidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <DashboardTopbar
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
        />

        {/* Content body */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
