"use client";

import React, { useEffect } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import { BlockerModal } from "./BlockerModal";
import { TaskDetailModal } from "./TaskDetailModal";
import { NewTaskModal } from "./NewTaskModal";
import { RespondBlockerModal } from "./RespondBlockerModal";
import { NewResourceModal } from "./NewResourceModal";

export function ModalRoot() {
  const { activeModal, closeModal } = useInternSync();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal.type !== "none") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal.type === "none") return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      role="dialog"
      aria-modal="true"
    >
      {activeModal.type === "blocker" && (
        <BlockerModal initialTaskId={activeModal.taskId} />
      )}
      {activeModal.type === "task-detail" && (
        <TaskDetailModal taskId={activeModal.taskId} />
      )}
      {activeModal.type === "new-task" && <NewTaskModal />}
      {activeModal.type === "respond-blocker" && (
        <RespondBlockerModal blockerId={activeModal.blockerId} />
      )}
      {activeModal.type === "new-resource" && <NewResourceModal />}
    </div>
  );
}
