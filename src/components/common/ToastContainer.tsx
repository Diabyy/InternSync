"use client";

import React from "react";
import { useInternSync } from "@/context/InternSyncContext";
import { CheckCircle2, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useInternSync();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-xl animate-in slide-in-from-right-4 transition-all duration-200"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600 mt-0.5">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <strong className="block text-sm font-bold text-slate-800">
              {toast.title}
            </strong>
            {toast.message && (
              <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            aria-label="Tutup notifikasi"
            className="text-slate-400 hover:text-slate-600 p-1 -mr-1 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
