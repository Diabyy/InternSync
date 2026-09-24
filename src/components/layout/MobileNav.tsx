"use client";

import React from "react";
import { useInternSync } from "@/context/InternSyncContext";
import {
  LayoutDashboard,
  CheckSquare,
  Plus,
  MessageSquare,
  Clock,
} from "lucide-react";
import { ActiveTab } from "@/types";

export function MobileNav() {
  const { activeTab, setActiveTab, openModal } = useInternSync();

  return (
    <nav
      className="fixed bottom-3 left-3 right-3 z-40 grid grid-cols-5 items-center rounded-2xl border border-slate-200/90 bg-white/95 p-1.5 shadow-xl backdrop-blur-md md:hidden"
      aria-label="Navigasi seluler"
    >
      <button
        type="button"
        onClick={() => setActiveTab("dashboard")}
        className={`flex h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold transition-all ${
          activeTab === "dashboard"
            ? "bg-teal-50 text-teal-700"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <LayoutDashboard className="h-4 w-4" />
        <span>Beranda</span>
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("tasks")}
        className={`flex h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold transition-all ${
          activeTab === "tasks"
            ? "bg-teal-50 text-teal-700"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <CheckSquare className="h-4 w-4" />
        <span>Tugas</span>
      </button>

      <button
        type="button"
        onClick={() => openModal({ type: "blocker" })}
        aria-label="Laporkan kendala tugas"
        className="flex h-11 w-11 items-center justify-center justify-self-center rounded-2xl bg-[#f97360] text-white shadow-md shadow-rose-500/30 transition-transform active:scale-95 -translate-y-2 -rotate-3"
      >
        <Plus className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("standup")}
        className={`flex h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold transition-all ${
          activeTab === "standup"
            ? "bg-teal-50 text-teal-700"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <MessageSquare className="h-4 w-4" />
        <span>Standup</span>
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("worklog")}
        className={`flex h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold transition-all ${
          activeTab === "worklog"
            ? "bg-teal-50 text-teal-700"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <Clock className="h-4 w-4" />
        <span>Jam Kerja</span>
      </button>
    </nav>
  );
}
