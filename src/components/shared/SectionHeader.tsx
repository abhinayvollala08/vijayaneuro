"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        centered && "text-center",
        className
      )}
    >
      <p
        className={cn(
          "eyebrow mb-3",
          dark ? "text-brand-orange" : "text-brand-orange"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "heading-section",
          dark && "!text-white"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base font-sans leading-relaxed",
            centered && "mx-auto",
            dark ? "text-white/65" : "text-text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
