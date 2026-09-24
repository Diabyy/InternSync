"use client";

import React, { useState, useEffect } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import {
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Clock,
  ArrowRight,
  Plus,
  Play,
  Square,
  Users,
} from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { formatDate, formatDateTime, formatTimer, getStatusLabel } from "@/lib/utils";

export function DashboardView() {
  const {
    role,
    state,
    setActiveTab,
    openModal,
    activeTasks,
    openBlockers,
    completedTasks,
    todayStandup,
    toggleClock,
  } = useInternSync();

  const [liveTimer, setLiveTimer] = useState("00:00:00");

  useEffect(() => {
    const updateTimer = () => {
      if (state.currentShift) {
        setLiveTimer(formatTimer(Date.now() - state.currentShift.startedAt));
      } else {
        const now = new Date();
        setLiveTimer(
          new Intl.DateTimeFormat("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(now)
        );
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [state.currentShift]);

  const hasStandup = Boolean(todayStandup);
  const clockedIn = Boolean(state.currentShift);

  if (role === "mentor") {
    const completionRate =
      state.tasks.length > 0
        ? Math.round((completedTasks.length / state.tasks.length) * 100)
        : 0;

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Selamat Pagi, Bu Rina
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pantauan tugas peserta PKL dan kendala proyek yang membutuhkan arahan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openModal({ type: "new-task" })}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-all self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Buat Tugas Baru
          </button>
        </div>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Statistik Pembimbing">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            value={state.participants.length}
            label="Peserta Aktif"
            theme="purple"
          />
          <StatCard
            icon={<AlertTriangle className="h-5 w-5" />}
            value={openBlockers.length}
            label="Blocker Menunggu"
            theme="coral"
          />
          <StatCard
            icon={<CheckSquare className="h-5 w-5" />}
            value={state.tasks.length}
            label="Total Tugas"
            theme="teal"
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            value={`${completionRate}%`}
            label="Tingkat Selesai"
            theme="yellow"
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Blocker queue */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    Kendala Menunggu Solusi
                  </h3>
                  <p className="text-xs text-slate-500">
                    Diurutkan berdasarkan tingkat urgensi proyek
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("blockers")}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800"
                >
                  Lihat Semua
                </button>
              </div>

              {openBlockers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-slate-200 rounded-xl">
                  <CheckCircle2 className="h-10 w-10 text-teal-600 mb-2 opacity-60" />
                  <p className="text-sm font-bold text-slate-700">Semua Kendala Tertangani</p>
                  <p className="text-xs text-slate-400 mt-0.5">Tidak ada blocker terbuka saat ini.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {openBlockers.slice(0, 3).map((b) => (
                    <div
                      key={b.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                              b.urgency === "urgent"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {b.urgency}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {b.author}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 truncate">
                          {b.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {b.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          openModal({ type: "respond-blocker", blockerId: b.id })
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-50 px-3.5 py-2 text-xs font-bold text-teal-700 hover:bg-teal-100 shrink-0 transition-colors"
                      >
                        Beri Solusi
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Participant progress dynamically from state.participants */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    Progres Peserta Bimbingan
                  </h3>
                  <p className="text-xs text-slate-500">
                    Status pekerjaan dan kepatuhan daily standup hari ini
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {state.participants.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/70 p-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-700 text-xs">
                        {p.initials}
                      </div>
                      <div>
                        <strong className="block text-sm font-bold text-slate-800">
                          {p.name}
                        </strong>
                        <span className="block text-xs text-slate-400">
                          {p.division} &bull; {p.activeTasks} tugas aktif
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <strong className="block text-sm font-bold text-teal-700">
                        {p.progress}%
                      </strong>
                      <span
                        className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                          p.standup
                            ? "bg-teal-50 text-teal-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {p.standup ? "Sudah standup" : "Belum standup"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Project status */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
              <h3 className="font-heading text-base font-bold text-slate-900 mb-1">
                Website UMKM Sari Rasa
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Rata-rata progres pengerjaan mingguan
              </p>

              <div className="flex items-end justify-between gap-2 h-36 pt-4 px-2">
                {[
                  { day: "Sen", val: 42 },
                  { day: "Sel", val: 56 },
                  { day: "Rab", val: 68 },
                  { day: "Kam", val: 64 },
                  { day: "Jum", val: 78 },
                ].map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full max-w-[28px] rounded-t-lg bg-teal-500 transition-all duration-500"
                      style={{ height: `${item.val}%` }}
                    />
                    <span className="text-[11px] font-bold text-slate-400">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standup reminder prompt */}
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-900">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h4 className="font-heading text-base font-bold text-slate-900">
                Pembaruan Daily Standup
              </h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                3 dari 4 peserta telah mengisi catatan hari ini. Review progres dapat dilakukan dengan cepat.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("standup")}
                className="mt-3.5 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50"
              >
                Buka Laporan Standup <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Student Dashboard
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Halo, Andi! :)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kerjakan satu langkah demi satu langkah. Pembimbing siap bantu jika ada hambatan.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openModal({ type: "blocker" })}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-all self-start sm:self-auto"
        >
          <AlertTriangle className="h-4 w-4" />
          Laporkan Kendala
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Sync Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-[#16324f] p-6 sm:p-8 text-white shadow-md">
            <div className="relative z-10 max-w-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">
                FOKUS HARI INI
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold leading-tight mt-1.5">
                Progres kecil tetap membawa proyek bergerak.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kamu memiliki {activeTasks.length} tugas aktif. Prioritaskan validasi formulir yang sedang terhambat.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("tasks")}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-black text-slate-900 shadow-sm hover:bg-amber-300 transition-all"
              >
                Buka Papan Tugas <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Sync Line Illustration */}
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 hidden sm:flex items-center gap-4 opacity-90 pointer-events-none">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/90 text-white shadow-lg -rotate-6">
                <CheckSquare className="h-6 w-6" />
              </div>
              <div className="h-1 w-12 border-t-2 border-dashed border-teal-300/50" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f97360] text-white shadow-lg rotate-3">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="h-1 w-12 border-t-2 border-dashed border-teal-300/50" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-900 shadow-lg -rotate-3">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4" aria-label="Statistik Peserta">
            <StatCard
              icon={<CheckSquare className="h-5 w-5" />}
              value={activeTasks.length}
              label="Tugas Aktif"
              theme="teal"
            />
            <StatCard
              icon={<AlertTriangle className="h-5 w-5" />}
              value={openBlockers.length}
              label="Butuh Bantuan"
              theme="coral"
            />
            <StatCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              value={completedTasks.length}
              label="Sudah Selesai"
              theme="purple"
            />
            <StatCard
              icon={<MessageSquare className="h-5 w-5" />}
              value={hasStandup ? "1/1" : "0/1"}
              label="Standup Hari Ini"
              theme="yellow"
            />
          </section>

          {/* Priority task list */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Prioritas Tugas
                </h3>
                <p className="text-xs text-slate-500">
                  Tugas yang perlu kamu perhatikan lebih dulu
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("tasks")}
                className="text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                Lihat Semua
              </button>
            </div>

            <div className="space-y-2.5">
              {activeTasks.slice(0, 4).map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => openModal({ type: "task-detail", taskId: task.id })}
                  className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 p-3.5 text-left hover:border-teal-400 hover:bg-slate-50/50 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ${
                        task.status === "blocker"
                          ? "bg-rose-500 ring-4 ring-rose-100"
                          : task.status === "progress"
                          ? "bg-amber-400 ring-4 ring-amber-100"
                          : "bg-blue-400 ring-4 ring-blue-100"
                      }`}
                    />
                    <div className="min-w-0">
                      <strong className="block text-sm font-bold text-slate-800 truncate">
                        {task.title}
                      </strong>
                      <span className="block text-xs text-slate-400 truncate">
                        {task.project} &bull; {task.estimate}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="block text-xs font-bold text-slate-600">
                      {getStatusLabel(task.status)}
                    </span>
                    <span className="block text-[11px] text-slate-400">
                      {formatDate(task.due, { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side panels */}
        <aside className="space-y-6">
          {/* Work clock card */}
          <div className="relative overflow-hidden rounded-2xl border border-teal-200/80 bg-teal-50/60 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900">
                  Jam Kerja PKL
                </h3>
                <p className="text-xs text-slate-500">
                  {clockedIn ? "Sesi kerja sedang berjalan" : "Belum mulai kerja hari ini"}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                <Clock className="h-5 w-5" />
              </div>
            </div>

            <div className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 my-3">
              {liveTimer}
            </div>

            <p className="text-xs text-slate-500 mb-4">
              {clockedIn
                ? `Mulai pukul ${state.currentShift?.start}`
                : "Standar jam operasional: 08.00 - 16.00 WIB"}
            </p>

            <button
              type="button"
              onClick={toggleClock}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white shadow-sm transition-all ${
                clockedIn
                  ? "bg-rose-500 hover:bg-rose-600"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {clockedIn ? (
                <>
                  <Square className="h-4 w-4" />
                  Akhiri Sesi Kerja
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Mulai Jam Kerja
                </>
              )}
            </button>
          </div>

          {/* Standup prompt */}
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 shadow-sm">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-900 -rotate-3">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h4 className="font-heading text-base font-bold text-slate-900">
              {hasStandup ? "Standup Hari Ini Terkirim" : "Sudah Update Hari Ini?"}
            </h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              {hasStandup
                ? "Pembimbing sudah dapat melihat perkembangan dan rencanamu hari ini."
                : "Hanya butuh 1 menit agar pembimbing tahu progresmu tanpa perlu bertanya berulang kali."}
            </p>
            <button
              type="button"
              onClick={() => setActiveTab("standup")}
              className="mt-3.5 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50"
            >
              {hasStandup ? "Lihat Laporan" : "Isi Sekarang"}{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Recent blockers */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading text-sm font-bold text-slate-900">
                Kendala Terbaru
              </h4>
              <button
                type="button"
                onClick={() => setActiveTab("blockers")}
                className="text-[11px] font-bold text-teal-700 hover:text-teal-800"
              >
                Semua
              </button>
            </div>

            <div className="space-y-2">
              {state.blockers.slice(0, 2).map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActiveTab("blockers")}
                  className="w-full text-left rounded-xl border-l-4 border-l-[#f97360] bg-rose-50/50 p-3 hover:bg-rose-50 transition-colors"
                >
                  <strong className="block text-xs font-bold text-slate-800 truncate">
                    {b.title}
                  </strong>
                  <span className="block mt-1 text-[11px] text-slate-500">
                    {b.status === "open" ? "Menunggu respons" : "Sudah ada solusi"} &bull;{" "}
                    {formatDateTime(b.createdAt)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
