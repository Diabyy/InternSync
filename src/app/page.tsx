"use client";

import React, { useState } from "react";
import { useInternSync } from "@/context/InternSyncContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { DashboardView } from "@/components/views/DashboardView";
import { TasksView } from "@/components/views/TasksView";
import { BlockersView } from "@/components/views/BlockersView";
import { StandupView } from "@/components/views/StandupView";
import { WorkLogView } from "@/components/views/WorkLogView";
import { ResourcesView } from "@/components/views/ResourcesView";
import { ModalRoot } from "@/components/modals/ModalRoot";
import { ToastContainer } from "@/components/common/ToastContainer";

export default function Home() {
  const { activeTab } = useInternSync();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f9fb] flex">
      {/* Sidebar for desktop & slide-out for mobile */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main app body */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-68">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-8 pb-28 md:pb-12 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "tasks" && <TasksView />}
          {activeTab === "blockers" && <BlockersView />}
          {activeTab === "standup" && <StandupView />}
          {activeTab === "worklog" && <WorkLogView />}
          {activeTab === "resources" && <ResourcesView />}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />

      {/* Modals and Toasts */}
      <ModalRoot />
      <ToastContainer />
    </div>
  );
}
