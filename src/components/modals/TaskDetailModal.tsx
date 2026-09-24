"use client";

import React, { useState } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import {
  X,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { TaskStatus, TaskPriority } from "@/types";
import { formatDate, getPriorityLabel, getStatusLabel } from "@/lib/utils";

interface TaskDetailModalProps {
  taskId: string;
}

export function TaskDetailModal({ taskId }: TaskDetailModalProps) {
  const { role, state, updateTask, openModal, closeModal } = useInternSync();

  const task = state.tasks.find((t) => t.id === taskId);

  const [status, setStatus] = useState<TaskStatus>(task?.status || "todo");
  const [progress, setProgress] = useState<number>(task?.progress || 0);

  if (!task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask(task.id, {
      status,
      progress: status === "done" ? 100 : Math.min(100, Math.max(0, progress)),
    });
  };

  const priorityColors: Record<TaskPriority, string> = {
    urgent: "bg-rose-100 text-rose-700",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-amber-100 text-amber-800",
    low: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <span className="text-[11px] font-black tracking-wider text-teal-600 uppercase">
            {task.id} &bull; {task.project}
          </span>
          <h2 className="font-heading text-xl font-bold text-slate-900 mt-0.5">
            {task.title}
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

      <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${
              priorityColors[task.priority]
            }`}
          >
            Prioritas: {getPriorityLabel(task.priority)}
          </span>
          <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
            Status: {getStatusLabel(task.status)}
          </span>
        </div>

        <div>
          <h3 className="text-xs font-extrabold text-teal-700 uppercase tracking-wider mb-1">
            Tujuan Tugas
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {task.description}
          </p>
        </div>

        <div className="rounded-xl border border-teal-200/80 bg-teal-50/50 p-4">
          <h3 className="text-xs font-extrabold text-teal-800 uppercase tracking-wider mb-1.5">
            Instruksi Pembimbing Lapangan
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {task.instruction}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3.5 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-teal-600" />
            <span>Tenggat: {formatDate(task.due)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-teal-600" />
            <span>Estimasi: {task.estimate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-teal-600" />
            <span>Mentor: {task.mentor}</span>
          </div>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div>
            <span className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
              Kategori / Tag
            </span>
            <div className="flex flex-wrap gap-1.5">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="border-t border-slate-200 pt-5 space-y-4">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Perbarui Status Pekerjaan
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="task-status"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Status Kolom
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm font-medium text-slate-800 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
              >
                <option value="todo">Belum dimulai</option>
                <option value="progress">Sedang Dikerjakan</option>
                <option value="blocker">Terhambat (Blocker)</option>
                <option value="done">Selesai</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-progress"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Progres ({progress}%)
              </label>
              <input
                id="task-progress"
                type="range"
                min="0"
                max="100"
                step="5"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full h-2 mt-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {role === "student" && task.status !== "done" && (
              <button
                type="button"
                onClick={() => openModal({ type: "blocker", taskId: task.id })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f97360] hover:text-[#e8624f]"
              >
                <AlertTriangle className="h-4 w-4" />
                Laporkan Kendala Tugas Ini
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-all"
              >
                <CheckCircle2 className="h-4 w-4" />
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
