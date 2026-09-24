"use client";

import React, { useState } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import {
  Plus,
  AlertTriangle,
  Calendar,
  Clock,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { TaskStatus, TaskPriority, Task } from "@/types";
import { formatDate, getPriorityLabel } from "@/lib/utils";

export function TasksView() {
  const { role, state, openModal } = useInternSync();
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredTasks =
    priorityFilter === "all"
      ? state.tasks
      : state.tasks.filter((t) => t.priority === priorityFilter);

  const columns: Array<{ id: TaskStatus; title: string; color: string; border: string }> = [
    {
      id: "todo",
      title: "Belum Dimulai",
      color: "text-blue-600 bg-blue-50",
      border: "border-t-blue-500",
    },
    {
      id: "progress",
      title: "Dikerjakan",
      color: "text-amber-700 bg-amber-50",
      border: "border-t-amber-500",
    },
    {
      id: "blocker",
      title: "Terhambat (Blocker)",
      color: "text-rose-700 bg-rose-50",
      border: "border-t-[#f97360]",
    },
    {
      id: "done",
      title: "Selesai",
      color: "text-emerald-700 bg-emerald-50",
      border: "border-t-emerald-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Papan Tugas PKL
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Instruksi kerja resmi, perkiraan tenggat waktu, dan kejelasan alur penugasan.
          </p>
        </div>

        {role === "mentor" ? (
          <button
            type="button"
            onClick={() => openModal({ type: "new-task" })}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-all self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Buat Tugas Baru
          </button>
        ) : (
          <button
            type="button"
            onClick={() => openModal({ type: "blocker" })}
            className="inline-flex items-center gap-2 rounded-xl bg-[#f97360] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#e8624f] transition-all self-start sm:self-auto"
          >
            <AlertTriangle className="h-4 w-4" />
            Laporkan Kendala
          </button>
        )}
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" aria-label="Filter prioritas">
          {[
            { id: "all", label: "Semua Prioritas" },
            { id: "urgent", label: "Mendesak" },
            { id: "high", label: "Tinggi" },
            { id: "medium", label: "Sedang" },
            { id: "low", label: "Rendah" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPriorityFilter(item.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                priorityFilter === item.id
                  ? "bg-teal-600 text-white shadow-xs"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-bold text-slate-400">
          {filteredTasks.length} tugas ditemukan
        </span>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          return (
            <section
              key={col.id}
              className={`rounded-2xl border border-slate-200/80 bg-slate-100/50 p-4 border-t-4 ${col.border}`}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-heading text-sm font-bold text-slate-800">
                  {col.title}
                </span>
                <span
                  className={`inline-flex h-6 min-w-[24px] items-center justify-center rounded-lg px-2 text-xs font-black ${col.color}`}
                >
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {colTasks.length === 0 ? (
                  <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-slate-200/80 bg-white/50 p-4 text-center">
                    <p className="text-xs text-slate-400 font-medium">
                      Tidak ada tugas di kolom ini.
                    </p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const { role, openModal } = useInternSync();

  const priorityBadge: Record<TaskPriority, string> = {
    urgent: "bg-rose-100 text-rose-700",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-amber-100 text-amber-800",
    low: "bg-blue-100 text-blue-700",
  };

  return (
    <article className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs hover:border-teal-400 hover:shadow-md transition-all group">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          {task.id}
        </span>
        <span
          className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
            priorityBadge[task.priority]
          }`}
        >
          {getPriorityLabel(task.priority)}
        </span>
      </div>

      <h3
        onClick={() => openModal({ type: "task-detail", taskId: task.id })}
        className="font-bold text-sm text-slate-800 hover:text-teal-700 cursor-pointer line-clamp-2 leading-snug transition-colors"
      >
        {task.title}
      </h3>
      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
        {task.project}
      </p>

      {/* Progress track */}
      <div className="my-3">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
          <span>Progres</span>
          <span>{task.progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              task.status === "done"
                ? "bg-emerald-500"
                : task.status === "blocker"
                ? "bg-rose-500"
                : "bg-teal-500"
            }`}
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 pt-2 border-t border-slate-100">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          {formatDate(task.due, { day: "numeric", month: "short" })}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          {task.estimate}
        </span>
      </div>

      <div className="mt-3 flex gap-2 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => openModal({ type: "task-detail", taskId: task.id })}
          className="flex-1 rounded-lg bg-slate-50 py-1.5 text-[11px] font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          Lihat Detail
        </button>

        {role === "student" && task.status !== "done" && (
          <button
            type="button"
            onClick={() => openModal({ type: "blocker", taskId: task.id })}
            className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-[11px] font-bold text-[#f97360] hover:bg-rose-100 transition-colors"
          >
            Kendala
          </button>
        )}
      </div>
    </article>
  );
}
