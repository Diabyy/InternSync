import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  theme?: "teal" | "coral" | "purple" | "yellow";
  className?: string;
}

export function StatCard({
  icon,
  value,
  label,
  theme = "teal",
  className,
}: StatCardProps) {
  const themeStyles = {
    teal: {
      iconBg: "bg-teal-50 text-teal-700",
      pill: "bg-teal-50",
    },
    coral: {
      iconBg: "bg-rose-50 text-[#f97360]",
      pill: "bg-rose-50",
    },
    purple: {
      iconBg: "bg-indigo-50 text-indigo-600",
      pill: "bg-indigo-50",
    },
    yellow: {
      iconBg: "bg-amber-50 text-amber-600",
      pill: "bg-amber-50",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <div
        className={cn(
          "absolute -right-4 -bottom-4 h-16 w-16 rounded-full opacity-60 pointer-events-none",
          currentTheme.pill
        )}
      />
      <div
        className={cn(
          "mb-3 flex h-10 w-10 items-center justify-center rounded-xl",
          currentTheme.iconBg
        )}
      >
        {icon}
      </div>
      <strong className="block font-heading text-2xl sm:text-3xl text-slate-800 leading-tight">
        {value}
      </strong>
      <small className="block mt-0.5 text-xs font-bold text-slate-500">
        {label}
      </small>
    </article>
  );
}
