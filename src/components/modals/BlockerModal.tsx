"use client";

import React, { useState } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import { X, AlertTriangle, ShieldCheck } from "lucide-react";
import { BlockerCategory, BlockerUrgency } from "@/types";

interface BlockerModalProps {
  initialTaskId?: string;
}

export function BlockerModal({ initialTaskId }: BlockerModalProps) {
  const { activeTasks, addBlocker, closeModal } = useInternSync();

  const [taskId, setTaskId] = useState(initialTaskId || activeTasks[0]?.id || "");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<BlockerCategory>("Teknis");
  const [urgency, setUrgency] = useState<BlockerUrgency>("medium");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId || !title.trim() || !description.trim()) return;

    addBlocker({
      taskId,
      title: title.trim(),
      category,
      urgency,
      description: description.trim(),
      anonymous,
      author: anonymous ? "Peserta Anonim" : "Andi Pratama",
    });
  };

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900">
            Laporkan Kendala Proyek
          </h2>
          <p className="text-xs text-slate-500">
            Beri konteks tugas agar pembimbing dapat memberi solusi cepat.
          </p>
        </div>
        <button
          type="button"
          onClick={closeModal}
          aria-label="Tutup dialog"
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label
            htmlFor="blocker-task"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Tugas Terkait <span className="text-rose-500">*</span>
          </label>
          <select
            id="blocker-task"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
          >
            <option value="">Pilih tugas yang mengalami kendala</option>
            {activeTasks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.id} — {t.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="blocker-title"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Ringkasan Kendala <span className="text-rose-500">*</span>
          </label>
          <input
            id="blocker-title"
            type="text"
            required
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Error validasi form saat nomor WA kosong"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="blocker-category"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Kategori Kendala
            </label>
            <select
              id="blocker-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as BlockerCategory)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
            >
              <option value="Teknis">Teknis (Kode/Bug)</option>
              <option value="Instruksi">Instruksi Kurang Jelas</option>
              <option value="Desain">Acuan Desain UI/UX</option>
              <option value="Akses">Akses Akun / File</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="blocker-urgency"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Tingkat Urgensi
            </label>
            <select
              id="blocker-urgency"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as BlockerUrgency)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
            >
              <option value="medium">Sedang (Bisa lanjut hal lain)</option>
              <option value="high">Tinggi (Menghambat sebagian)</option>
              <option value="urgent">Mendesak (Berhenti total)</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="blocker-desc"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Apa yang Terjadi & yang Sudah Dicoba?{" "}
            <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="blocker-desc"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan detail error atau bagian instruksi yang membingungkan..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Gunakan bahasa sehari-hari yang nyaman, tidak perlu ragu bertanya.
          </p>
        </div>

        {/* Anonymous toggle */}
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 cursor-pointer hover:bg-slate-50 transition-colors">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="h-4 w-4 rounded-md border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          <div className="flex-1">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              Sembunyikan nama saya (Kirim sebagai Anonim)
            </span>
            <p className="text-[11px] text-slate-500">
              Pembimbing tetap menerima konteks tugas dan dapat memberikan solusi.
            </p>
          </div>
        </label>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#f97360] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#e8624f] transition-all"
          >
            <AlertTriangle className="h-4 w-4" />
            Kirim Laporan Kendala
          </button>
        </div>
      </form>
    </div>
  );
}
