"use client";

import React, { useState } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import { X, Plus, Calendar, Clock, CheckCircle } from "lucide-react";
import { TaskPriority } from "@/types";
import { todayKey } from "@/lib/utils";

export function NewTaskModal() {
  const { addTask, closeModal } = useInternSync();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [due, setDue] = useState(todayKey());
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [estimate, setEstimate] = useState("4 jam");
  const [tagInput, setTagInput] = useState("Frontend, Validasi");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addTask({
      title: title.trim(),
      project: "Website UMKM Sari Rasa",
      status: "todo",
      priority,
      due,
      progress: 0,
      estimate,
      description: description.trim(),
      instruction:
        instruction.trim() ||
        "Ikuti standar acuan tim dan laporkan blocker jika menemui kesulitan teknis.",
      mentor: "Rina Putri",
      tags: tagInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900">
            Buat Tugas Baru untuk Peserta
          </h2>
          <p className="text-xs text-slate-500">
            Instruksi yang jelas mengurangi kebingungan dan jam kerja molor.
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
            htmlFor="task-title"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Nama Tugas <span className="text-rose-500">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Integrasi API checkout WhatsApp"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="task-desc"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Hasil yang Diharapkan <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="task-desc"
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan output kerja yang harus dihasilkan peserta..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="task-inst"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Arahan Teknis & Batasan
          </label>
          <textarea
            id="task-inst"
            rows={2}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Contoh: Gunakan method POST, format nomor dengan awalan 62, cek koneksi..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="task-due"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Tenggat Waktu
            </label>
            <input
              id="task-due"
              type="date"
              required
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="task-priority"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Prioritas
            </label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
            >
              <option value="urgent">Mendesak</option>
              <option value="high">Tinggi</option>
              <option value="medium">Sedang</option>
              <option value="low">Rendah</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="task-est"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Estimasi
            </label>
            <input
              id="task-est"
              type="text"
              value={estimate}
              onChange={(e) => setEstimate(e.target.value)}
              placeholder="4 jam"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="task-tags"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Tag Kategori (pisahkan dengan koma)
          </label>
          <input
            id="task-tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Frontend, React, API"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-800 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3">
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
            <Plus className="h-4 w-4" />
            Terbitkan Tugas
          </button>
        </div>
      </form>
    </div>
  );
}
