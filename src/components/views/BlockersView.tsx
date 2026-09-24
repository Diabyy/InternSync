"use client";

import React from "react";
import { useInternSync } from "@/context/InternSyncContext";
import {
  AlertTriangle,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  User,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { formatDateTime, getPriorityLabel } from "@/lib/utils";

export function BlockersView() {
  const { role, state, openModal } = useInternSync();

  const openBlockers = state.blockers.filter((b) => b.status === "open");
  const resolvedBlockers = state.blockers.filter((b) => b.status === "resolved");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            {role === "student"
              ? "Jangan Pendam Kendala Teknismu"
              : "Pusat Penanganan Kendala (Blockers)"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {role === "student"
              ? "Laporkan hambatan lebih awal tanpa rasa canggung agar pembimbing bisa langsung memberi solusi."
              : "Daftar kendala teknis dan operasional yang dihadapi peserta agar proyek tidak terhambat deadline."}
          </p>
        </div>

        {role === "student" && (
          <button
            type="button"
            onClick={() => openModal({ type: "blocker" })}
            className="inline-flex items-center gap-2 rounded-xl bg-[#f97360] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#e8624f] transition-all self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Laporkan Kendala Baru
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Open blockers */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-slate-900">
                Menunggu Penanganan ({openBlockers.length})
              </h3>
            </div>

            {openBlockers.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-teal-600 mb-2 opacity-60" />
                <h4 className="text-sm font-bold text-slate-800">
                  Tidak Ada Kendala Aktif
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Semua kendala peserta saat ini sudah terselesaikan.
                </p>
              </div>
            ) : (
              openBlockers.map((b) => {
                const task = state.tasks.find((t) => t.id === b.taskId);
                return (
                  <article
                    key={b.id}
                    className="relative overflow-hidden rounded-2xl border border-slate-200/90 border-l-4 border-l-[#f97360] bg-white p-5 shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-600">
                        {b.id} &bull; {task?.id || b.taskId}
                      </span>
                      <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                        Urgensi: {getPriorityLabel(b.urgency)}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      {b.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 my-2">
                      <span className="flex items-center gap-1 font-semibold text-slate-600">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        {b.author}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {formatDateTime(b.createdAt)}
                      </span>
                      <span>&bull;</span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        Kategori: {b.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-3.5 mt-3">
                      {b.description}
                    </p>

                    {role === "mentor" && (
                      <div className="flex justify-end pt-3 mt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() =>
                            openModal({
                              type: "respond-blocker",
                              blockerId: b.id,
                            })
                          }
                          className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition-all"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Berikan Solusi Pembimbing
                        </button>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </section>

          {/* Resolved blockers archive */}
          {resolvedBlockers.length > 0 && (
            <section className="space-y-3 pt-4 border-t border-slate-200">
              <h3 className="font-heading text-base font-bold text-slate-900">
                Riwayat Kendala Terselesaikan ({resolvedBlockers.length})
              </h3>

              {resolvedBlockers.map((b) => (
                <article
                  key={b.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {b.id} &bull; Selesai
                    </span>
                    <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700">
                      Solusi Diterapkan
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-800">{b.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{b.description}</p>

                  {b.response && (
                    <div className="mt-3.5 rounded-xl border border-teal-200/80 bg-teal-50/60 p-3.5">
                      <strong className="block text-[11px] font-bold uppercase tracking-wider text-teal-800 mb-1">
                        Solusi dari Pembimbing Lapangan:
                      </strong>
                      <p className="text-xs text-teal-900 leading-relaxed font-medium">
                        {b.response}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </section>
          )}
        </div>

        {/* Right side safety panel */}
        <aside>
          <div className="sticky top-24 rounded-3xl bg-[#16324f] p-6 text-white shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-bold -rotate-6 mb-4 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <h3 className="font-heading text-xl font-bold text-white leading-snug">
              Ruang Aman & Bebas Canggung
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Salah satu masalah terbesar peserta PKL adalah sungkan bertanya secara langsung saat menghadapi error.
            </p>

            <div className="mt-5 space-y-3 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-teal-500/20 text-teal-300 font-bold text-[10px]">
                  ✓
                </span>
                <span className="text-slate-200">
                  <strong>Opsi Anonim:</strong> Laporkan masalah teknis tanpa rasa takut dinilai lambat.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-teal-500/20 text-teal-300 font-bold text-[10px]">
                  ✓
                </span>
                <span className="text-slate-200">
                  <strong>Format Terstruktur:</strong> Langsung mengaitkan tugas, error, dan percobaan perbaikan.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-teal-500/20 text-teal-300 font-bold text-[10px]">
                  ✓
                </span>
                <span className="text-slate-200">
                  <strong>Cegah Keterlambatan:</strong> Masalah diselesaikan sejak awal, bukan saat deadline mendekat.
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
