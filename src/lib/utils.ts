import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function localDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayKey(): string {
  return localDateString(new Date());
}

export function formatDate(
  value: string,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const date = new Date(`${value}T12:00:00`);
    return new Intl.DateTimeFormat(
      "id-ID",
      options || { day: "numeric", month: "short", year: "numeric" }
    ).format(date);
  } catch {
    return value;
  }
}

export function formatDateTime(value: string): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${hours}j ${minutes}m`;
}

export function formatTimer(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(total / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const seconds = String(total % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    todo: "Belum dimulai",
    progress: "Dikerjakan",
    blocker: "Terhambat",
    done: "Selesai",
  };
  return labels[status] || status;
}

export function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    urgent: "Mendesak",
    high: "Tinggi",
    medium: "Sedang",
    low: "Rendah",
  };
  return labels[priority] || priority;
}
