"use client";

import React, { useState } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import { X, BookOpen, Plus } from "lucide-react";

export function NewResourceModal() {
  const { addResource, closeModal } = useInternSync();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Panduan");
  const [description, setDescription] = useState("");
  const [meta, setMeta] = useState("Dokumen PDF - 1.2 MB");
  const [color, setColor] = useState<"teal" | "purple" | "orange" | "blue" | "pink">("teal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addResource({
      title: title.trim(),
      type,
      description: description.trim(),
      meta,
      color,
    });
  };

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900">
            Tambah Dokumen & Informasi Acuan
          </h2>
          <p className="text-xs text-slate-500">
            Bagikan acuan teknis terpusat agar informasi tidak simpang siur.
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
            htmlFor="res-title"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Judul Informasi / Dokumen <span className="text-rose-500">*</span>
          </label>
          <input
            id="res-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Format Penamaan Komponen & State Management"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="res-type"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Jenis Materi
            </label>
            <select
              id="res-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
            >
              <option value="Panduan">Panduan</option>
              <option value="Teknis">Teknis / API</option>
              <option value="Desain">Desain UI/UX</option>
              <option value="Operasional">Aturan Operasional</option>
              <option value="Video">Video Tutorial</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="res-color"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Aksen Warna Kartu
            </label>
            <select
              id="res-color"
              value={color}
              onChange={(e) =>
                setColor(
                  e.target.value as "teal" | "purple" | "orange" | "blue" | "pink"
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
            >
              <option value="teal">Teal (Standar)</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="blue">Blue</option>
              <option value="pink">Pink</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="res-desc"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Ringkasan Isi <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="res-desc"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan poin-poin acuan yang perlu dibaca peserta..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="res-meta"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Keterangan Format / Link
          </label>
          <input
            id="res-meta"
            type="text"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            placeholder="PDF - 1.2 MB atau Tautan Notion"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
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
            Simpan Dokumen
          </button>
        </div>
      </form>
    </div>
  );
}
