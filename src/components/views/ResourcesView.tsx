"use client";

import React, { useState } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import {
  BookOpen,
  Search,
  Plus,
  FileText,
  ExternalLink,
  Bell,
  Code,
  Layers,
  Video,
} from "lucide-react";
import { Resource } from "@/types";

export function ResourcesView() {
  const { role, state, openModal, showToast } = useInternSync();
  const [search, setSearch] = useState("");

  const filteredResources = state.resources.filter((r) => {
    const query = search.toLowerCase();
    return (
      r.title.toLowerCase().includes(query) ||
      r.type.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query)
    );
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case "Teknis":
        return <Code className="h-5 w-5" />;
      case "Desain":
        return <Layers className="h-5 w-5" />;
      case "Video":
        return <Video className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getThemeForColor = (color: Resource["color"]) => {
    switch (color) {
      case "purple":
        return {
          icon: "bg-purple-100 text-purple-700",
          tag: "bg-purple-50 text-purple-700",
        };
      case "orange":
        return {
          icon: "bg-amber-100 text-amber-700",
          tag: "bg-amber-50 text-amber-700",
        };
      case "blue":
        return {
          icon: "bg-blue-100 text-blue-700",
          tag: "bg-blue-50 text-blue-700",
        };
      case "pink":
        return {
          icon: "bg-rose-100 text-rose-700",
          tag: "bg-rose-50 text-rose-700",
        };
      default:
        return {
          icon: "bg-teal-100 text-teal-700",
          tag: "bg-teal-50 text-teal-700",
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Pusat Informasi & Acuan Proyek
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Arahan resmi, dokumen spesifikasi teknis, dan panduan proyek dalam satu pintu.
          </p>
        </div>

        {role === "mentor" && (
          <button
            type="button"
            onClick={() => openModal({ type: "new-resource" })}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-all self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Tambah Dokumen
          </button>
        )}
      </div>

      {/* Announcement banner */}
      <div className="flex items-start sm:items-center gap-3.5 rounded-2xl border border-amber-200/90 bg-amber-50/80 p-4 sm:p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-bold">
          <Bell className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <strong className="block text-xs sm:text-sm font-bold text-slate-900">
            Pengumuman Pembimbing: Review Sprint Proyek Sari Rasa
          </strong>
          <p className="text-xs text-slate-600 mt-0.5">
            Sesi evaluasi teknis dijadwalkan pada hari Senin pukul 10.00 WIB. Pastikan seluruh progres dan blocker telah diperbarui di InternSync.
          </p>
        </div>
      </div>

      {/* Search toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari panduan, desain Figma, atau spesifikasi API..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 shadow-xs"
          />
        </div>

        <span className="text-xs font-bold text-slate-400">
          {filteredResources.length} materi terdaftar
        </span>
      </div>

      {/* Resource cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => {
          const style = getThemeForColor(res.color);
          return (
            <article
              key={res.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-teal-400 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.icon}`}
                  >
                    {getIconForType(res.type)}
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${style.tag}`}
                  >
                    {res.type}
                  </span>
                </div>

                <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {res.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                <span className="font-medium text-[11px]">{res.meta}</span>
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      "Membuka Dokumen",
                      `File "${res.title}" siap dipelajari.`
                    )
                  }
                  className="inline-flex items-center gap-1 font-bold text-teal-700 hover:text-teal-800"
                >
                  Buka <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
