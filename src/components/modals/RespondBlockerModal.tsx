"use client";

import React, { useState } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import { X, CheckCircle, MessageSquare } from "lucide-react";

interface RespondBlockerModalProps {
  blockerId: string;
}

export function RespondBlockerModal({ blockerId }: RespondBlockerModalProps) {
  const { state, resolveBlocker, closeModal } = useInternSync();

  const blocker = state.blockers.find((b) => b.id === blockerId);
  const task = state.tasks.find((t) => t.id === blocker?.taskId);

  const [response, setResponse] = useState("");

  if (!blocker) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;
    resolveBlocker(blocker.id, response.trim());
  };

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-rose-600">
            Penanganan Blocker &bull; {blocker.id}
          </span>
          <h2 className="font-heading text-xl font-bold text-slate-900 mt-0.5">
            Berikan Solusi Pembimbing
          </h2>
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

      <div className="p-6 space-y-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Pelapor: <strong>{blocker.author}</strong></span>
            <span>Tugas: <strong>{task?.title || blocker.taskId}</strong></span>
          </div>
          <strong className="block text-sm font-bold text-slate-800">
            {blocker.title}
          </strong>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {blocker.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="mentor-response"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Arahan / Solusi untuk Peserta <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="mentor-response"
              required
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Contoh: Gunakan breakpoint CSS sebelum tombol bertumpuk, atau gunakan try...catch pada handler validasi..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Solusi ini akan langsung tampil di panel peserta dan membuka status tugas kembali.
            </p>
          </div>

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
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-all"
            >
              <CheckCircle className="h-4 w-4" />
              Kirim Solusi & Buka Blocker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
