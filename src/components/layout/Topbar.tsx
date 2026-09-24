"use client";

import React from "react";
import { useInternSync } from "@/context/InternSyncContext";
import { Menu, Calendar, Bell } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { role, activeTab } = useInternSync();

  const titleMap: Record<string, string> = {
    dashboard: role === "student" ? "Ringkasan" : "Dashboard Pembimbing",
    tasks: "Papan Tugas",
    blockers: "Laporan Kendala",
    standup: "Daily Standup",
    worklog: "Jam Kerja",
    resources: "Pusat Informasi",
  };

  const todayLabel = new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 flex min-h-[72px] sm:min-h-[80px] items-center justify-between border-b border-slate-200/80 bg-[#f4f9fb]/90 px-4 sm:px-8 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Buka menu navigasi"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 md:hidden hover:border-teal-500 hover:text-teal-700 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-teal-600">
            {role === "student" ? "RUANG KERJA PKL" : "PANEL PEMBIMBING"}
          </span>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {titleMap[activeTab] || "InternSync"}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="hidden sm:flex h-10 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 text-xs font-bold text-slate-600">
          <Calendar className="h-4 w-4 text-teal-600" />
          <span>{todayLabel}</span>
        </div>

        <button
          type="button"
          aria-label="Notifikasi"
          className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:border-teal-500 hover:text-teal-700 transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-[#f97360] ring-2 ring-white" />
        </button>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold ${
            role === "student"
              ? "bg-amber-100 text-amber-900"
              : "bg-purple-100 text-purple-900"
          }`}
        >
          {role === "student" ? "A" : "RP"}
        </div>
      </div>
    </header>
  );
}
