"use client";

import React, { useState, useEffect } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import {
  Clock,
  Play,
  Square,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import { formatDate, formatMinutes, formatTimer, todayKey } from "@/lib/utils";

export function WorkLogView() {
  const { role, state, toggleClock, totalWeekMinutes } = useInternSync();

  const [liveTimer, setLiveTimer] = useState("00:00:00");

  useEffect(() => {
    const updateTimer = () => {
      if (state.currentShift) {
        setLiveTimer(formatTimer(Date.now() - state.currentShift.startedAt));
      } else {
        setLiveTimer("00:00:00");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [state.currentShift]);

  const clockedIn = Boolean(state.currentShift);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
          Transparansi Jam Kerja & Work-Log
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Pencatatan jam kerja agar waktu operasional dan jam pulang peserta PKL lebih teratur dan terukur.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Timer Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#16324f] p-6 sm:p-8 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">
                  SESI KERJA HARI INI
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  {formatDate(todayKey(), {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-teal-300">
                <Clock className="h-5 w-5" />
              </div>
            </div>

            <div className="my-4">
              <div className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white">
                {clockedIn ? liveTimer : "00:00:00"}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {clockedIn
                  ? `Sesi aktif dimulai pukul ${state.currentShift?.start} WIB`
                  : "Tekan tombol di bawah saat Anda siap memulai aktivitas kerja."}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={toggleClock}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold transition-all shadow-sm ${
                  clockedIn
                    ? "bg-[#f97360] hover:bg-[#e8624f] text-white"
                    : "bg-amber-400 hover:bg-amber-300 text-slate-950 font-black"
                }`}
              >
                {clockedIn ? (
                  <>
                    <Square className="h-4 w-4" />
                    Selesaikan Sesi Kerja Hari Ini
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Mulai Jam Kerja Sekarang
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Work logs table */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Riwayat Jam Operasional
                </h3>
                <p className="text-xs text-slate-500">
                  Catatan waktu masuk, jam selesai, dan total durasi kerja
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                    <th className="pb-3">Tanggal</th>
                    <th className="pb-3">Jam Masuk</th>
                    <th className="pb-3">Jam Pulang</th>
                    <th className="pb-3">Total Durasi</th>
                    <th className="pb-3">Catatan Aktivitas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {state.workLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 font-bold text-slate-800">
                        {formatDate(log.date, { day: "numeric", month: "short" })}
                      </td>
                      <td className="py-3.5 text-slate-600 font-mono">{log.start}</td>
                      <td className="py-3.5 text-slate-600 font-mono">{log.end}</td>
                      <td className="py-3.5">
                        <span className="inline-flex rounded-lg bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-700">
                          {formatMinutes(log.duration)}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-600">{log.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right side stats */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <span className="text-xs font-bold text-slate-400">Total Jam Kerja Minggu Ini</span>
            <strong className="block font-heading text-3xl font-bold text-teal-800 mt-1">
              {formatMinutes(totalWeekMinutes)}
            </strong>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 mb-2">
                Distribusi Hari Kerja
              </h4>
              <div className="flex items-end justify-between gap-2 h-32 pt-4 px-1">
                {[
                  { day: "Sen", val: 92 },
                  { day: "Sel", val: 94 },
                  { day: "Rab", val: 88 },
                  { day: "Kam", val: 91 },
                  { day: "Jum", val: clockedIn ? 50 : 20 },
                ].map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full max-w-[24px] rounded-t-lg bg-teal-500"
                      style={{ height: `${item.val}%` }}
                    />
                    <span className="text-[10px] font-bold text-slate-400">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 space-y-3">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-xs">
              <AlertCircle className="h-4 w-4 text-teal-600" />
              <span>Standar Operasional Industri</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jam kerja resmi peserta PKL adalah <strong>08.00 s/d 16.00 WIB</strong>. Apabila pembimbing memberikan tugas tambahan di luar jam tersebut, waktu akan tercatat transparan di sistem.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
