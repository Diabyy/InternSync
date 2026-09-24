"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  AppState,
  UserRole,
  ActiveTab,
  Task,
  Blocker,
  DailyStandup,
  Resource,
} from "@/types";
import { initialData } from "@/data/initialData";
import { todayKey, formatMinutes } from "@/lib/utils";

const STORAGE_KEY = "internsync_next_v1";

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
}

export type ModalType =
  | { type: "none" }
  | { type: "blocker"; taskId?: string }
  | { type: "task-detail"; taskId: string }
  | { type: "new-task" }
  | { type: "respond-blocker"; blockerId: string }
  | { type: "new-resource" };

interface InternSyncContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  state: AppState;
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  toasts: ToastItem[];
  showToast: (title: string, message?: string) => void;
  removeToast: (id: string) => void;
  // Mutators
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addBlocker: (
    blocker: Omit<Blocker, "id" | "createdAt" | "status" | "response">
  ) => void;
  resolveBlocker: (blockerId: string, response: string) => void;
  saveStandup: (standup: Omit<DailyStandup, "id" | "date">) => void;
  toggleClock: () => void;
  addResource: (resource: Omit<Resource, "id">) => void;
  resetDemo: () => void;
  // Computed values
  activeTasks: Task[];
  openBlockers: Blocker[];
  completedTasks: Task[];
  todayStandup: DailyStandup | undefined;
  totalWeekMinutes: number;
}

const InternSyncContext = createContext<InternSyncContextType | undefined>(
  undefined
);

export function InternSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRoleState] = useState<UserRole>("student");
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [state, setState] = useState<AppState>(initialData);
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>({ type: "none" });
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState(JSON.parse(stored));
      }
      const storedRole = localStorage.getItem("internsync_role");
      if (storedRole === "student" || storedRole === "mentor") {
        setRoleState(storedRole);
      }
    } catch {
      // fallback to initial
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state, isHydrated]);

  const showToast = useCallback((title: string, message?: string) => {
    const id = "t_" + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => {
      const isDuplicate = prev.some(
        (t) => t.title === title && t.message === message
      );
      if (isDuplicate) return prev;
      return [...prev, { id, title, message }];
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const setRole = useCallback(
    (newRole: UserRole) => {
      setRoleState(newRole);
      try {
        localStorage.setItem("internsync_role", newRole);
      } catch {
        // ignore
      }
      showToast(
        "Mode Berhasil Diubah",
        newRole === "student"
          ? "Sekarang menampilkan ruang kerja peserta."
          : "Sekarang menampilkan panel pembimbing."
      );
    },
    [showToast]
  );

  const openModal = useCallback((modal: ModalType) => {
    setActiveModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal({ type: "none" });
  }, []);

  const addTask = useCallback(
    (newTaskData: Omit<Task, "id">) => {
      setState((prev) => {
        const nextNum =
          prev.tasks.length > 0
            ? Math.max(
                ...prev.tasks.map((t) => {
                  const parts = t.id.split("-");
                  return parseInt(parts[1], 10) || 100;
                })
              ) + 1
            : 101;
        const newTask: Task = {
          ...newTaskData,
          id: `TSK-${nextNum}`,
        };
        return {
          ...prev,
          tasks: [newTask, ...prev.tasks],
        };
      });
      closeModal();
      showToast("Tugas Dibuat", "Instruksi baru siap dikerjakan oleh peserta.");
    },
    [closeModal, showToast]
  );

  const updateTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
      }));
      closeModal();
      showToast("Tugas Diperbarui", "Perubahan status tugas berhasil disimpan.");
    },
    [closeModal, showToast]
  );

  const addBlocker = useCallback(
    (blockerData: Omit<Blocker, "id" | "createdAt" | "status" | "response">) => {
      setState((prev) => {
        const nextNum = prev.blockers.length + 19;
        const newBlocker: Blocker = {
          ...blockerData,
          id: `BLK-${String(nextNum).padStart(3, "0")}`,
          createdAt: new Date().toISOString(),
          status: "open",
          response: "",
        };

        // Also update task status to blocker
        const updatedTasks = prev.tasks.map((t) =>
          t.id === blockerData.taskId ? { ...t, status: "blocker" as const } : t
        );

        return {
          ...prev,
          tasks: updatedTasks,
          blockers: [newBlocker, ...prev.blockers],
        };
      });
      closeModal();
      setActiveTab("blockers");
      showToast(
        "Kendala Terkirim",
        "Pembimbing akan menerima notifikasi dan konteks tugas."
      );
    },
    [closeModal, showToast]
  );

  const resolveBlocker = useCallback(
    (blockerId: string, response: string) => {
      setState((prev) => {
        let affectedTaskId: string | null = null;
        const updatedBlockers = prev.blockers.map((b) => {
          if (b.id === blockerId) {
            affectedTaskId = b.taskId;
            return {
              ...b,
              status: "resolved" as const,
              response,
            };
          }
          return b;
        });

        const updatedTasks = prev.tasks.map((t) =>
          t.id === affectedTaskId && t.status === "blocker"
            ? { ...t, status: "progress" as const }
            : t
        );

        return {
          ...prev,
          blockers: updatedBlockers,
          tasks: updatedTasks,
        };
      });
      closeModal();
      showToast(
        "Solusi Dikirim",
        "Peserta dapat melihat arahan baru pada laporan kendala."
      );
    },
    [closeModal, showToast]
  );

  const saveStandup = useCallback(
    (standupData: Omit<DailyStandup, "id" | "date">) => {
      const today = todayKey();
      setState((prev) => {
        const existingIndex = prev.standups.findIndex((s) => s.date === today);
        if (existingIndex >= 0) {
          const updated = [...prev.standups];
          updated[existingIndex] = {
            ...updated[existingIndex],
            ...standupData,
          };
          return { ...prev, standups: updated };
        } else {
          const nextId = `STD-${String(prev.standups.length + 12).padStart(
            3,
            "0"
          )}`;
          return {
            ...prev,
            standups: [
              {
                id: nextId,
                date: today,
                ...standupData,
              },
              ...prev.standups,
            ],
          };
        }
      });
      showToast(
        "Standup Tersimpan",
        "Pembaruan harian berhasil dibagikan ke pembimbing."
      );
    },
    [showToast]
  );

  const toggleClock = useCallback(() => {
    if (state.currentShift) {
      const now = new Date();
      const duration = Math.max(
        1,
        Math.round((now.getTime() - state.currentShift.startedAt) / 60000)
      );
      const nextId = `LOG-${String(state.workLogs.length + 22).padStart(
        3,
        "0"
      )}`;
      const end = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
        .format(now)
        .replace(".", ":");

      const newLog = {
        id: nextId,
        date: todayKey(),
        start: state.currentShift.start,
        end,
        duration,
        note: "Sesi kerja mandiri",
      };

      setState((prev) => ({
        ...prev,
        currentShift: null,
        workLogs: [newLog, ...prev.workLogs],
      }));

      showToast(
        "Sesi Kerja Selesai",
        `Total durasi ${formatMinutes(duration)} berhasil dicatat.`
      );
    } else {
      const now = new Date();
      const start = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
        .format(now)
        .replace(".", ":");

      setState((prev) => ({
        ...prev,
        currentShift: {
          startedAt: now.getTime(),
          start,
        },
      }));

      showToast("Sesi Kerja Dimulai", "Waktu kerja aktif sedang berjalan.");
    }
  }, [state.currentShift, state.workLogs.length, showToast]);

  const addResource = useCallback(
    (resourceData: Omit<Resource, "id">) => {
      setState((prev) => {
        const nextId = `RES-${String(prev.resources.length + 1).padStart(
          2,
          "0"
        )}`;
        return {
          ...prev,
          resources: [{ id: nextId, ...resourceData }, ...prev.resources],
        };
      });
      closeModal();
      showToast(
        "Informasi Ditambahkan",
        "Materi acuan baru dapat diakses oleh semua peserta."
      );
    },
    [closeModal, showToast]
  );

  const resetDemo = useCallback(() => {
    setState(initialData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setActiveTab("dashboard");
    showToast(
      "Data Demo Direset",
      "Seluruh data dikembalikan ke konfigurasi awal."
    );
  }, [showToast]);

  // Computed properties
  const activeTasks = useMemo(
    () => state.tasks.filter((t) => t.status !== "done"),
    [state.tasks]
  );

  const openBlockers = useMemo(
    () => state.blockers.filter((b) => b.status === "open"),
    [state.blockers]
  );

  const completedTasks = useMemo(
    () => state.tasks.filter((t) => t.status === "done"),
    [state.tasks]
  );

  const todayStandup = useMemo(
    () => state.standups.find((s) => s.date === todayKey()),
    [state.standups]
  );

  const totalWeekMinutes = useMemo(
    () => state.workLogs.reduce((acc, log) => acc + log.duration, 0),
    [state.workLogs]
  );

  return (
    <InternSyncContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        state,
        activeModal,
        openModal,
        closeModal,
        toasts,
        showToast,
        removeToast,
        addTask,
        updateTask,
        addBlocker,
        resolveBlocker,
        saveStandup,
        toggleClock,
        addResource,
        resetDemo,
        activeTasks,
        openBlockers,
        completedTasks,
        todayStandup,
        totalWeekMinutes,
      }}
    >
      {children}
    </InternSyncContext.Provider>
  );
}

export function useInternSync() {
  const context = useContext(InternSyncContext);
  if (!context) {
    throw new Error("useInternSync must be used within an InternSyncProvider");
  }
  return context;
}
