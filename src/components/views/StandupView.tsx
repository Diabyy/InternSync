"use client";

import React, { useState } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import {
  MessageSquare,
  CheckCircle2,
  Calendar,
  Smile,
  Meh,
  Frown,
  Send,
  Users,
} from "lucide-react";
import { formatDate, todayKey } from "@/lib/utils";
import { StandupMood } from "@/types";

export function StandupView() {
  const { role, state, todayStandup, saveStandup } = useInternSync();

  const [done, setDone] = useState(todayStandup?.done || "");
  const [plan, setPlan] = useState(todayStandup?.plan || "");
  const [blocker, setBlocker] = useState(todayStandup?.blocker || "");
  const [mood, setMood] = useState<StandupMood>(todayStandup?.mood || "good");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!done.trim() || !plan.trim()) return;

    saveStandup({
      done: done.trim(),
      plan: plan.trim(),
      blocker: blocker.trim() || "Tidak ada kendala.",
      mood,
    });
  };

  const todayFormatted = formatDate(todayKey(), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (role === "mentor") {
    const standupFilledCount = state.participants.filter((p) => p.standup).length;

    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Rekap Daily Standup Peserta
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pembaruan 1 menit harian untuk memantau ritme kerja tim tanpa meeting berulang.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-teal-200/80 bg-teal-50/60 p-4">
            <span className="text-xs font-bold text-teal-700">Sudah Mengisi Hari Ini</span>
            <strong className="block font-heading text-3xl font-bold text-teal-900 mt-1">
              {standupFilledCount} / {state.participants.length}
            </strong>
          </div>
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4">
            <span className="text-xs font-bold text-amber-700">Belum Mengisi</span>
            <strong className="block font-heading text-3xl font-bold text-amber-900 mt-1">
              {state.participants.length - standupFilledCount} Peserta
            </strong>
          </div>
          <div className="rounded-2xl border border-rose-200/80 bg-rose-50/60 p-4">
            <span className="text-xs font-bold text-rose-700">Laporan Berstatus Kendala</span>
            <strong className="block font-heading text-3xl font-bold text-rose-900 mt-1">
              {state.standups.filter((s) => s.mood === "stuck").length}
            </strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-base font-bold text-slate-900">
              Riwayat Catatan Harian Peserta
            </h3>

            {state.standups.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    <strong className="text-sm font-bold text-slate-800">
                      {formatDate(s.date, {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      })}
                    </strong>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${
                      s.mood === "great"
                        ? "bg-emerald-50 text-emerald-700"
                        : s.mood === "good"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    Mood: {s.mood === "great" ? "Mantap" : s.mood === "good" ? "Lancar" : "Terhambat"}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-black uppercase tracking-wider text-teal-700 text-[10px]">
                      Selesai Hari Ini:
                    </span>
                    <p className="text-slate-700 mt-0.5">{s.done}</p>
                  </div>

                  <div>
                    <span className="font-black uppercase tracking-wider text-slate-500 text-[10px]">
                      Rencana Selanjutnya:
                    </span>
                    <p className="text-slate-700 mt-0.5">{s.plan}</p>
                  </div>

                  {s.blocker && (
                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <span className="font-black uppercase tracking-wider text-[#f97360] text-[10px]">
                        Catatan Hambatan:
                      </span>
                      <p className="text-slate-700 mt-0.5">{s.blocker}</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h4 className="font-heading text-sm font-bold text-slate-900 mb-3">
                Kepatuhan Standup Hari Ini
              </h4>
              <div className="space-y-3">
                {state.participants.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{p.name}</span>
                    <span
                      className={`font-semibold rounded-md px-2 py-0.5 text-[10px] ${
                        p.standup
                          ? "bg-teal-50 text-teal-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {p.standup ? "Sudah isi" : "Belum isi"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // Student Standup Form
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
          Daily Standup (1 Menit)
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Formulir singkat harian untuk sinkronisasi pekerjaan dengan pembimbing industri.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-600">
                  PEMBARUAN HARIAN
                </span>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  {todayFormatted}
                </h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>

            <div>
              <label
                htmlFor="standup-done"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                1. Apa yang sudah kamu selesaikan hari ini?{" "}
                <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="standup-done"
                required
                rows={3}
                value={done}
                onChange={(e) => setDone(e.target.value)}
                placeholder="Contoh: Menyelesaikan mockup katalog produk dan merapikan komponen responsif mobile..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="standup-plan"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                2. Apa rencana pekerjaan berikutnya?{" "}
                <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="standup-plan"
                required
                rows={3}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                placeholder="Contoh: Menghubungkan tombol checkout dengan WhatsApp dan menambahkan validasi..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="standup-blocker"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                3. Apakah ada hambatan atau butuh bantuan pembimbing?
              </label>
              <textarea
                id="standup-blocker"
                rows={2}
                value={blocker}
                onChange={(e) => setBlocker(e.target.value)}
                placeholder="Tulis 'Tidak ada kendala' jika pekerjaan berjalan lancar..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-700 mb-2">
                4. Kondisi Ritme Kerjamu Hari Ini:
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    id: "great",
                    label: "Mantap",
                    desc: "Sangat lancar",
                    icon: <Smile className="h-4 w-4" />,
                  },
                  {
                    id: "good",
                    label: "Cukup Baik",
                    desc: "Progres normal",
                    icon: <Meh className="h-4 w-4" />,
                  },
                  {
                    id: "stuck",
                    label: "Terhambat",
                    desc: "Butuh arahan",
                    icon: <Frown className="h-4 w-4" />,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMood(item.id as StandupMood)}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                      mood === item.id
                        ? "border-teal-500 bg-teal-50/70 text-teal-800 shadow-xs"
                        : "border-slate-200 bg-slate-50/40 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.icon}
                    <strong className="text-xs leading-none">{item.label}</strong>
                    <span className="text-[10px] text-slate-400">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-all"
              >
                <Send className="h-4 w-4" />
                {todayStandup ? "Perbarui Catatan Standup" : "Kirim Daily Standup"}
              </button>
            </div>
          </form>
        </div>

        {/* Previous records */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <h4 className="font-heading text-sm font-bold text-slate-900 mb-3">
              Riwayat Standup Saya
            </h4>

            <div className="space-y-3">
              {state.standups.map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">
                      {formatDate(s.date, { day: "numeric", month: "short" })}
                    </span>
                    <span className="rounded-md bg-teal-100/70 px-1.5 py-0.5 text-[10px] font-bold text-teal-800">
                      {s.mood}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {s.done}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
