"use client";

import React from "react";
import { useInternSync } from "@/context/InternSyncContext";
import {
  LayoutDashboard,
  CheckSquare,
  AlertTriangle,
  MessageSquare,
  Clock,
  BookOpen,
  RotateCcw,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { ActiveTab } from "@/types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const {
    role,
    setRole,
    activeTab,
    setActiveTab,
    activeTasks,
    openBlockers,
    openModal,
    resetDemo,
  } = useInternSync();

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ReactNode;
    count?: number;
    countAlert?: boolean;
  }> = [
    {
      id: "dashboard",
      label: "Ringkasan",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "tasks",
      label: "Papan Tugas",
      icon: <CheckSquare className="h-5 w-5" />,
      count: activeTasks.length,
    },
    {
      id: "blockers",
      label: "Laporan Kendala",
      icon: <AlertTriangle className="h-5 w-5" />,
      count: openBlockers.length,
      countAlert: openBlockers.length > 0,
    },
    {
      id: "standup",
      label: "Daily Standup",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "worklog",
      label: "Jam Kerja",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: "resources",
      label: "Pusat Informasi",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-68 flex-col border-r border-slate-200/90 bg-white p-5 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigasi utama"
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 pb-6">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16324f] shadow-sm -rotate-6">
            <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-amber-400" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-teal-400" />
            <span className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-[#f97360]" />
            <span className="h-4 w-0.5 bg-white/70 rotate-45" />
            <span className="h-4 w-0.5 bg-white/70 -rotate-45" />
          </div>
          <div>
            <strong className="block font-heading text-2xl font-bold tracking-tight text-slate-900 leading-none">
              InternSync
            </strong>
            <small className="block mt-1 text-[11px] font-black uppercase tracking-widest text-teal-600">
              grow together
            </small>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="mb-5">
          <span className="mb-2 block px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Mode Tampilan
          </span>
          <div className="grid gap-1 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-1.5">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex items-center gap-2.5 rounded-xl p-2 text-left transition-all ${
                role === "student"
                  ? "bg-white shadow-xs font-bold text-slate-800"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
                A
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block text-xs leading-none">Peserta</strong>
                <small className="block truncate text-[11px] text-slate-400">
                  Andi Pratama
                </small>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRole("mentor")}
              className={`flex items-center gap-2.5 rounded-xl p-2 text-left transition-all ${
                role === "mentor"
                  ? "bg-white shadow-xs font-bold text-slate-800"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
                RP
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block text-xs leading-none">
                  Pembimbing
                </strong>
                <small className="block truncate text-[11px] text-slate-400">
                  Rina Putri
                </small>
              </span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-left font-bold text-sm transition-all ${
                  isActive
                    ? "bg-teal-50 text-teal-800 font-extrabold"
                    : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-md bg-teal-600" />
                )}
                <span className={isActive ? "text-teal-600" : "text-slate-400"}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {typeof item.count === "number" && (
                  <span
                    className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                      item.countAlert
                        ? "bg-rose-100 text-rose-700"
                        : "bg-slate-200/70 text-slate-600"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Help Card */}
        <div className="relative mt-auto overflow-hidden rounded-2xl bg-[#16324f] p-4 text-white shadow-sm">
          <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-[#16324f] font-heading font-bold text-lg">
            <HelpCircle className="h-5 w-5" />
          </div>
          <strong className="block text-sm font-bold">Butuh Bantuan?</strong>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
            Laporkan kendala tugas tanpa rasa sungkan. Tim siap bantu.
          </p>
          <button
            type="button"
            onClick={() => openModal({ type: "blocker" })}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Laporkan kendala <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Reset Demo */}
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Kembalikan seluruh data ke kondisi awal?")) {
              resetDemo();
            }
          }}
          className="mt-3 flex items-center gap-2 rounded-xl px-2 py-2 text-xs font-bold text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset data demo
        </button>
      </aside>
    </>
  );
}
