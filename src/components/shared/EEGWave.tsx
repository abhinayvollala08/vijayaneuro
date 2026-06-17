"use client";

import { cn } from "@/lib/utils";

interface EEGWaveProps {
  className?: string;
}

export function EEGWave({ className }: EEGWaveProps) {
  return (
    <div className={cn("pointer-events-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,60 L40,60 L60,20 L70,90 L80,30 L90,75 L100,45 L120,60
             L160,60 L180,15 L190,95 L200,25 L210,80 L220,40 L240,60
             L280,60 L300,10 L310,100 L320,20 L330,85 L340,35 L360,60
             L400,60 L420,25 L430,85 L440,30 L450,70 L460,45 L480,60
             L520,60 L540,15 L550,95 L560,20 L570,80 L580,40 L600,60
             L640,60 L660,20 L670,90 L680,25 L690,75 L700,45 L720,60
             L760,60 L780,10 L790,100 L800,15 L810,85 L820,35 L840,60
             L880,60 L900,25 L910,85 L920,30 L930,70 L940,45 L960,60
             L1000,60 L1020,20 L1030,90 L1040,25 L1050,75 L1060,45 L1080,60
             L1120,60 L1140,15 L1150,95 L1160,20 L1170,80 L1180,40 L1200,60"
          fill="none"
          stroke="var(--orange-500)"
          strokeWidth="2"
          strokeDasharray="1600"
          strokeDashoffset="1600"
          className="animate-eeg-pulse"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
