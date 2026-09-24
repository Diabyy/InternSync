(function () {
  "use strict";

  const STORAGE_KEY = "internsync-demo-v1";
  const appContent = document.getElementById("app-content");
  const modalLayer = document.getElementById("modal-layer");
  const toastRegion = document.getElementById("toast-region");
  const sidebar = document.getElementById("sidebar");
  const sidebarBackdrop = document.getElementById("sidebar-backdrop");
  const menuButton = document.getElementById("menu-button");

  const icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></svg>',
    tasks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h7M9 12h7M9 16h5M7 8h.01M7 12h.01M7 16h.01"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.7 2.5 17.2A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.8L13.7 3.7a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
    standup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 7h8M8 11h5"/><path d="M17 3H7a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h2l3 4 3-4h2a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4Z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5Z"/><path d="M4 6.5v13M8 8h8"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    timer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6M12 2v3"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 22V4M5 5c5-4 9 4 14 0v10c-5 4-9-4-14 0"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/></svg>'
  };

  let data = loadData();
  let role = localStorage.getItem("internsync-role") || "student";
  let currentView = "dashboard";
  let taskFilter = "all";
  let resourceQuery = "";
  let timerInterval = null;
  let lastFocusedElement = null;

  function cloneDefaultData() {
    return JSON.parse(JSON.stringify(window.INTERNSYNC_DEMO_DATA));
  }

  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : cloneDefaultData();
    } catch (error) {
      return cloneDefaultData();
    }
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function icon(name) {
    return icons[name] || icons.file;
  }

  function hydrateIcons(root) {
    (root || document).querySelectorAll("[data-icon]").forEach((element) => {
      element.innerHTML = icon(element.dataset.icon);
    });
  }

  function localDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function todayKey() {
    return localDateString(new Date());
  }

  function formatDate(value, options) {
    const date = new Date(`${value}T12:00:00`);
    return new Intl.DateTimeFormat("id-ID", options || { day: "numeric", month: "short", year: "numeric" }).format(date);
  }

  function formatDateTime(value) {
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
  }

  function formatMinutes(total) {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    return `${hours}j ${minutes}m`;
  }

  function formatTimer(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const hours = String(Math.floor(total / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const seconds = String(total % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function statusLabel(status) {
    return { todo: "Belum dimulai", progress: "Dikerjakan", blocker: "Terhambat", done: "Selesai" }[status] || status;
  }

  function priorityLabel(priority) {
    return { urgent: "Mendesak", high: "Tinggi", medium: "Sedang", low: "Rendah" }[priority] || priority;
  }

  function getTask(taskId) {
    return data.tasks.find((task) => task.id === taskId);
  }

  function getOpenBlockers() {
    return data.blockers.filter((blocker) => blocker.status === "open");
  }

  function updateHeader() {
    const labels = {
      dashboard: role === "student" ? "Ringkasan" : "Dashboard Pembimbing",
      tasks: "Papan Tugas",
      blockers: "Laporan Kendala",
      standup: "Daily Standup",
      worklog: "Jam Kerja",
      resources: "Pusat Informasi"
    };
    document.getElementById("page-title").textContent = labels[currentView];
    document.getElementById("page-eyebrow").textContent = role === "student" ? "RUANG KERJA PKL" : "PANEL PEMBIMBING";
    document.getElementById("topbar-avatar").textContent = role === "student" ? "A" : "RP";
    document.getElementById("topbar-avatar").className = `topbar-avatar ${role === "mentor" ? "avatar-mentor" : ""}`;
    document.querySelectorAll("[data-view]").forEach((button) => button.classList.toggle("is-active", button.dataset.view === currentView));
    document.querySelectorAll("[data-role]").forEach((button) => button.classList.toggle("is-active", button.dataset.role === role));
    document.getElementById("task-nav-count").textContent = data.tasks.filter((task) => task.status !== "done").length;
    document.getElementById("blocker-nav-count").textContent = getOpenBlockers().length;
  }

  function render() {
    updateHeader();
    const renderers = {
      dashboard: role === "student" ? renderStudentDashboard : renderMentorDashboard,
      tasks: renderTasks,
      blockers: renderBlockers,
      standup: renderStandup,
      worklog: renderWorkLog,
      resources: renderResources
    };
    appContent.innerHTML = `<div class="page-enter">${renderers[currentView]()}</div>`;
    hydrateIcons(appContent);
    if (currentView === "worklog" || currentView === "dashboard") startTimerUpdates();
  }

  function renderStudentDashboard() {
    const activeTasks = data.tasks.filter((task) => task.status !== "done");
    const completed = data.tasks.filter((task) => task.status === "done").length;
    const openBlockers = getOpenBlockers();
    const hasStandup = data.standups.some((item) => item.date === todayKey());
    const clockedIn = Boolean(data.currentShift);

    return `
      <section class="welcome-row">
        <div>
          <h2>Halo, Andi! <span aria-hidden="true">:)</span></h2>
          <p>Kerjakan satu langkah demi satu langkah. Kami bantu saat kamu terhambat.</p>
        </div>
        <button class="primary-button" type="button" data-action="quick-blocker">${icon("alert")} Laporkan kendala</button>
      </section>

      <div class="dashboard-grid">
        <div class="dashboard-main">
          <section class="sync-hero">
            <div class="hero-copy">
              <span class="eyebrow">FOKUS HARI INI</span>
              <h2>Progres kecil tetap membawa proyek bergerak.</h2>
              <p>Kamu punya ${activeTasks.length} tugas aktif. Prioritaskan validasi formulir yang sedang terhambat.</p>
              <button class="primary-button" type="button" data-view="tasks">Buka papan tugas ${icon("arrow")}</button>
            </div>
            <div class="sync-visual" aria-hidden="true">
              <div class="sync-path"></div>
              <span class="sync-node sync-node-one">${icon("tasks")}</span>
              <span class="sync-node sync-node-two">${icon("alert")}</span>
              <span class="sync-node sync-node-three">${icon("check")}</span>
            </div>
          </section>

          <section class="stats-grid" aria-label="Ringkasan progres">
            ${statCard("tasks", activeTasks.length, "Tugas aktif", "stat-teal")}
            ${statCard("alert", openBlockers.length, "Butuh bantuan", "stat-coral")}
            ${statCard("check", completed, "Sudah selesai", "stat-purple")}
            ${statCard("standup", hasStandup ? "1/1" : "0/1", "Standup hari ini", "stat-yellow")}
          </section>

          <section class="panel">
            <div class="panel-heading">
              <div><h3>Prioritas tugas</h3><p>Tugas yang perlu kamu perhatikan lebih dulu</p></div>
              <button class="link-button" type="button" data-view="tasks">Lihat semua</button>
            </div>
            <div class="task-list">${activeTasks.slice(0, 4).map(renderTaskRow).join("")}</div>
          </section>
        </div>

        <aside class="dashboard-side">
          <section class="panel work-clock">
            <div class="card-heading"><div><h3>Jam kerja</h3><p>${clockedIn ? "Sesi sedang berjalan" : "Belum mulai hari ini"}</p></div><span class="stat-icon stat-teal">${icon("timer")}</span></div>
            <div class="clock-time" data-live-clock>${clockedIn ? formatTimer(Date.now() - data.currentShift.startedAt) : new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date())}</div>
            <div class="clock-caption">${clockedIn ? `Mulai pukul ${esc(data.currentShift.start)}` : "Standar operasional 08.00 - 16.00"}</div>
            <div class="clock-actions">
              <button class="primary-button button-full" type="button" data-action="toggle-clock">${icon(clockedIn ? "check" : "timer")} ${clockedIn ? "Akhiri kerja" : "Mulai kerja"}</button>
            </div>
          </section>

          <section class="panel standup-prompt">
            <div class="prompt-icon">${icon("message")}</div>
            <h3>${hasStandup ? "Standup sudah terkirim" : "Sudah update hari ini?"}</h3>
            <p>${hasStandup ? "Pembimbing sudah bisa melihat progres terbarumu." : "Cukup satu menit agar pembimbing tahu progresmu tanpa perlu bertanya."}</p>
            <button class="compact-button" type="button" data-view="standup">${hasStandup ? "Lihat laporan" : "Isi sekarang"}</button>
          </section>

          <section class="panel">
            <div class="panel-heading"><div><h3>Kendala terbaru</h3><p>Status bantuan dari pembimbing</p></div></div>
            <div class="blocker-preview">
              ${data.blockers.slice(0, 2).map((blocker) => `<button class="blocker-mini" type="button" data-view="blockers"><strong>${esc(blocker.title)}</strong><small>${blocker.status === "open" ? "Menunggu respons" : "Sudah ditangani"} - ${formatDateTime(blocker.createdAt)}</small></button>`).join("")}
            </div>
          </section>
        </aside>
      </div>`;
  }

  function renderMentorDashboard() {
    const openBlockers = getOpenBlockers();
    const active = data.tasks.filter((task) => task.status === "blocker").length;
    const completed = data.tasks.filter((task) => task.status === "done").length;
    const completion = Math.round((completed / data.tasks.length) * 100);

    return `
      <section class="welcome-row">
        <div><h2>Selamat pagi, Bu Rina.</h2><p>Berikut situasi peserta PKL dan proyek yang perlu ditindaklanjuti.</p></div>
        <button class="primary-button" type="button" data-action="new-task">${icon("plus")} Buat tugas</button>
      </section>

      <section class="stats-grid" aria-label="Ringkasan pembimbing">
        ${statCard("users", 3, "Peserta aktif", "stat-purple")}
        ${statCard("alert", openBlockers.length, "Blocker terbuka", "stat-coral")}
        ${statCard("tasks", data.tasks.length, "Total tugas", "stat-teal")}
        ${statCard("check", `${completion}%`, "Progres proyek", "stat-yellow")}
      </section>

      <div class="dashboard-grid" style="margin-top:20px">
        <div class="dashboard-main">
          <section class="panel">
            <div class="panel-heading">
              <div><h3>Perlu perhatian</h3><p>Blocker diurutkan berdasarkan urgensi</p></div>
              <button class="link-button" type="button" data-view="blockers">Lihat semua</button>
            </div>
            <div class="blocker-list">
              ${openBlockers.length ? openBlockers.map(renderBlockerCard).join("") : renderEmpty("check", "Tidak ada blocker terbuka", "Semua kendala peserta sudah ditangani.")}
            </div>
          </section>

          <section class="panel">
            <div class="panel-heading"><div><h3>Progres peserta</h3><p>Pantauan ringkas aktivitas peserta hari ini</p></div></div>
            <div class="participant-list">
              ${renderParticipant("AP", "Andi Pratama", "Frontend - Sari Rasa", 64, false)}
              ${renderParticipant("SN", "Siti Nurhaliza", "UI Design - Sari Rasa", 78, false)}
              ${renderParticipant("RF", "Rafi Firmansyah", "Content - Sari Rasa", 51, true)}
            </div>
          </section>
        </div>
        <aside class="dashboard-side">
          <section class="panel">
            <div class="panel-heading"><div><h3>Status proyek</h3><p>Website UMKM Sari Rasa</p></div></div>
            <div class="week-bars" aria-label="Grafik progres mingguan">
              ${[42, 56, 68, 64, 0].map((height, index) => `<div class="day-bar"><div class="day-bar-fill" style="height:${height}%"></div><small>${["Sen", "Sel", "Rab", "Kam", "Jum"][index]}</small></div>`).join("")}
            </div>
          </section>
          <section class="panel standup-prompt">
            <div class="prompt-icon">${icon("standup")}</div>
            <h3>2 dari 3 sudah update</h3>
            <p>Laporan harian membuat review progres lebih cepat dan objektif.</p>
            <button class="compact-button" type="button" data-view="standup">Buka standup</button>
          </section>
        </aside>
      </div>`;
  }

  function statCard(iconName, value, label, className) {
    return `<article class="stat-card ${className}"><span class="stat-icon">${icon(iconName)}</span><strong>${esc(value)}</strong><small>${esc(label)}</small></article>`;
  }

  function renderTaskRow(task) {
    return `<button class="task-row" type="button" data-action="task-detail" data-task-id="${esc(task.id)}">
      <span class="task-status-dot dot-${esc(task.status)}"></span>
      <span class="task-row-title"><strong>${esc(task.title)}</strong><small>${esc(task.project)}</small></span>
      <span class="task-row-meta">${statusLabel(task.status)}<br>${formatDate(task.due, { day: "numeric", month: "short" })}</span>
    </button>`;
  }

  function renderTasks() {
    const columns = [
      { id: "todo", label: "Belum dimulai" },
      { id: "progress", label: "Dikerjakan" },
      { id: "blocker", label: "Terhambat" },
      { id: "done", label: "Selesai" }
    ];
    const filteredTasks = taskFilter === "all" ? data.tasks : data.tasks.filter((task) => task.priority === taskFilter);

    return `
      <section class="section-heading">
        <div><h2>Papan tugas</h2><p>Semua instruksi dan progres kerja dalam satu alur yang jelas.</p></div>
        ${role === "mentor" ? `<button class="primary-button" type="button" data-action="new-task">${icon("plus")} Buat tugas baru</button>` : `<button class="primary-button" type="button" data-action="quick-blocker">${icon("alert")} Laporkan kendala</button>`}
      </section>
      <div class="toolbar">
        <div class="filter-tabs" aria-label="Filter prioritas">
          ${[["all", "Semua"], ["urgent", "Mendesak"], ["high", "Tinggi"], ["medium", "Sedang"], ["low", "Rendah"]].map(([id, label]) => `<button class="filter-tab ${taskFilter === id ? "is-active" : ""}" type="button" data-action="task-filter" data-filter="${id}">${label}</button>`).join("")}
        </div>
        <span class="task-meta-line">${icon("tasks")} ${filteredTasks.length} tugas ditampilkan</span>
      </div>
      <div class="kanban-board">
        ${columns.map((column) => {
          const tasks = filteredTasks.filter((task) => task.status === column.id);
          return `<section class="task-column column-${column.id}">
            <div class="column-heading"><span><span class="task-status-dot dot-${column.id}"></span>${column.label}</span><span class="column-count">${tasks.length}</span></div>
            <div class="task-stack">${tasks.length ? tasks.map(renderTaskCard).join("") : `<div class="empty-state" style="min-height:180px"><p>Belum ada tugas pada tahap ini.</p></div>`}</div>
          </section>`;
        }).join("")}
      </div>`;
  }

  function renderTaskCard(task) {
    return `<article class="task-card">
      <div class="task-card-top"><span class="task-id">${esc(task.id)}</span><span class="priority-badge priority-${esc(task.priority)}">${priorityLabel(task.priority)}</span></div>
      <h3>${esc(task.title)}</h3><span class="task-project">${esc(task.project)}</span>
      <div class="task-progress"><div class="progress-track"><span style="width:${Number(task.progress)}%"></span></div><small>${Number(task.progress)}%</small></div>
      <div class="task-meta-line"><span>${icon("calendar")} ${formatDate(task.due, { day: "numeric", month: "short" })}</span><span>${icon("clock")} ${esc(task.estimate)}</span></div>
      <div class="task-card-actions"><button type="button" data-action="task-detail" data-task-id="${esc(task.id)}">Lihat detail</button>${role === "student" && task.status !== "done" ? `<button type="button" data-action="quick-blocker" data-task-id="${esc(task.id)}">Ada kendala</button>` : ""}</div>
    </article>`;
  }

  function renderBlockers() {
    const open = data.blockers.filter((blocker) => blocker.status === "open");
    const resolved = data.blockers.filter((blocker) => blocker.status === "resolved");
    return `
      <section class="section-heading">
        <div><h2>${role === "student" ? "Jangan pendam kendala" : "Pusat penanganan kendala"}</h2><p>${role === "student" ? "Laporkan lebih awal agar masalah kecil tidak menjadi penghambat besar." : "Respons kendala peserta berdasarkan tingkat urgensi dan konteks tugas."}</p></div>
        ${role === "student" ? `<button class="primary-button" type="button" data-action="quick-blocker">${icon("plus")} Buat laporan</button>` : ""}
      </section>
      <div class="blocker-layout">
        <div>
          <div class="panel-heading"><div><h3>Menunggu penanganan (${open.length})</h3><p>Laporan aktif yang masih membutuhkan bantuan</p></div></div>
          <div class="blocker-list">${open.length ? open.map(renderBlockerCard).join("") : renderEmpty("check", "Semua kendala tertangani", "Belum ada laporan aktif yang membutuhkan tindakan.")}</div>
          ${resolved.length ? `<div class="panel-heading" style="margin-top:24px"><div><h3>Sudah diselesaikan (${resolved.length})</h3><p>Arsip solusi yang bisa dipelajari kembali</p></div></div><div class="blocker-list">${resolved.map(renderBlockerCard).join("")}</div>` : ""}
        </div>
        <aside>
          <section class="panel safety-card">
            <div class="safety-icon">${icon("lock")}</div>
            <h3>Ruang aman untuk bicara</h3>
            <p>Melaporkan kendala adalah bagian dari proses kerja, bukan tanda kegagalan.</p>
            <div class="safety-points">
              <div class="safety-point"><span>${icon("check")}</span><span>Identitas bisa disembunyikan dari tampilan pembimbing.</span></div>
              <div class="safety-point"><span>${icon("check")}</span><span>Format terstruktur membantu solusi datang lebih cepat.</span></div>
              <div class="safety-point"><span>${icon("check")}</span><span>Riwayat solusi tetap tersimpan untuk pembelajaran.</span></div>
            </div>
          </section>
        </aside>
      </div>`;
  }

  function renderBlockerCard(blocker) {
    const task = getTask(blocker.taskId);
    return `<article class="blocker-card ${blocker.urgency === "urgent" ? "is-urgent" : ""}">
      <div class="blocker-card-header">
        <div><span class="task-id">${esc(blocker.id)} - ${esc(task ? task.id : "Tanpa tugas")}</span><h3>${esc(blocker.title)}</h3></div>
        <span class="status-badge status-${esc(blocker.status)}">${blocker.status === "open" ? "Menunggu" : "Selesai"}</span>
      </div>
      <div class="blocker-meta"><span>${icon("users")} ${esc(blocker.author)}</span><span>${icon("flag")} ${priorityLabel(blocker.urgency)}</span><span>${icon("calendar")} ${formatDateTime(blocker.createdAt)}</span></div>
      <p>${esc(blocker.description)}</p>
      ${blocker.response ? `<div class="mentor-response"><strong>Respons pembimbing</strong>${esc(blocker.response)}</div>` : ""}
      ${role === "mentor" && blocker.status === "open" ? `<div class="blocker-actions"><button class="primary-button compact-button" type="button" data-action="respond-blocker" data-blocker-id="${esc(blocker.id)}">Berikan solusi</button></div>` : ""}
    </article>`;
  }

  function renderStandup() {
    const todayStandup = data.standups.find((item) => item.date === todayKey());
    if (role === "mentor") {
      return `
        <section class="section-heading"><div><h2>Daily standup peserta</h2><p>Pembaruan singkat untuk memantau progres tanpa rapat panjang.</p></div></section>
        <section class="mentor-summary">
          ${statCard("check", 2, "Sudah mengisi", "stat-teal")}${statCard("clock", 1, "Belum mengisi", "stat-yellow")}${statCard("alert", getOpenBlockers().length, "Melaporkan kendala", "stat-coral")}
        </section>
        <div class="standup-layout" style="margin-top:20px">
          <section class="panel">
            <div class="panel-heading"><div><h3>Laporan terbaru</h3><p>Pembaruan Andi Pratama</p></div></div>
            <div class="history-list">${data.standups.map(renderStandupHistory).join("")}</div>
          </section>
          <aside class="panel">
            <div class="panel-heading"><div><h3>Status peserta</h3><p>${formatDate(todayKey())}</p></div></div>
            <div class="participant-list">${renderParticipant("AP", "Andi Pratama", todayStandup ? "Sudah mengisi" : "Belum mengisi", 64, !todayStandup)}${renderParticipant("SN", "Siti Nurhaliza", "Sudah mengisi", 78, false)}${renderParticipant("RF", "Rafi Firmansyah", "Belum mengisi", 51, true)}</div>
          </aside>
        </div>`;
    }

    return `
      <section class="section-heading"><div><h2>Update dalam satu menit</h2><p>Ceritakan progres secara singkat, jelas, dan apa adanya.</p></div></section>
      <div class="standup-layout">
        <section class="standup-form-card">
          <div class="panel-heading"><div><h3>${todayStandup ? "Perbarui standup hari ini" : "Standup hari ini"}</h3><p>${formatDate(todayKey(), { weekday: "long", day: "numeric", month: "long" })}</p></div><span class="stat-icon stat-yellow">${icon("message")}</span></div>
          <form id="standup-form">
            <div class="form-group"><label for="standup-done">Apa yang sudah kamu selesaikan? <span class="required">*</span></label><textarea id="standup-done" name="done" required placeholder="Contoh: Menyelesaikan layout katalog versi mobile...">${esc(todayStandup ? todayStandup.done : "")}</textarea></div>
            <div class="form-group"><label for="standup-plan">Apa rencanamu selanjutnya? <span class="required">*</span></label><textarea id="standup-plan" name="plan" required placeholder="Contoh: Melanjutkan validasi formulir pemesanan...">${esc(todayStandup ? todayStandup.plan : "")}</textarea></div>
            <div class="form-group"><label for="standup-blocker">Ada kendala atau bantuan yang dibutuhkan?</label><textarea id="standup-blocker" name="blocker" placeholder="Tulis 'Tidak ada' jika pekerjaan berjalan lancar.">${esc(todayStandup ? todayStandup.blocker : "")}</textarea></div>
            <div class="form-group"><span class="form-label">Bagaimana kondisi kerjamu hari ini?</span><div class="mood-options">
              ${[["great", "Mantap", "Siap lanjut"], ["good", "Cukup baik", "Tetap fokus"], ["stuck", "Terhambat", "Butuh bantuan"]].map(([value, title, text], index) => `<label class="mood-option"><input type="radio" name="mood" value="${value}" ${(todayStandup ? todayStandup.mood === value : index === 1) ? "checked" : ""}><span><b>${title}</b>${text}</span></label>`).join("")}
            </div></div>
            <button class="primary-button button-full" type="submit">${icon("check")} ${todayStandup ? "Simpan perubahan" : "Kirim standup"}</button>
          </form>
        </section>
        <aside class="panel">
          <div class="panel-heading"><div><h3>Riwayat laporan</h3><p>${data.standups.length} laporan tersimpan</p></div></div>
          <div class="history-list">${data.standups.length ? data.standups.slice(0, 4).map(renderStandupHistory).join("") : renderEmpty("standup", "Belum ada laporan", "Standup yang kamu kirim akan muncul di sini.")}</div>
        </aside>
      </div>`;
  }

  function renderStandupHistory(item) {
    const mood = { great: "Mantap", good: "Cukup baik", stuck: "Terhambat" }[item.mood];
    return `<article class="history-item"><div class="history-date"><span>${formatDate(item.date, { weekday: "long", day: "numeric", month: "short" })}</span><span class="status-badge status-resolved">${mood}</span></div><dl><div><dt>Selesai</dt><dd>${esc(item.done)}</dd></div><div><dt>Selanjutnya</dt><dd>${esc(item.plan)}</dd></div><div><dt>Kendala</dt><dd>${esc(item.blocker || "Tidak ada.")}</dd></div></dl></article>`;
  }

  function renderWorkLog() {
    const total = data.workLogs.reduce((sum, item) => sum + item.duration, 0);
    const clockedIn = Boolean(data.currentShift);
    if (role === "mentor") {
      return `
        <section class="section-heading"><div><h2>Rekap jam kerja</h2><p>Pantau keteraturan waktu kerja peserta secara transparan.</p></div></section>
        <section class="stats-grid">${statCard("users", 3, "Peserta hadir", "stat-teal")}${statCard("clock", "08.01", "Rata-rata masuk", "stat-purple")}${statCard("timer", "7j 58m", "Rata-rata durasi", "stat-yellow")}${statCard("alert", 0, "Terlambat", "stat-coral")}</section>
        <section class="panel" style="margin-top:20px"><div class="panel-heading"><div><h3>Aktivitas Andi Pratama</h3><p>Riwayat sesi kerja terbaru</p></div></div>${renderLogTable()}</section>`;
    }
    return `
      <section class="section-heading"><div><h2>Jam kerja yang transparan</h2><p>Catat waktu mulai dan selesai agar batas kerja tetap sehat dan teratur.</p></div></section>
      <div class="worklog-layout">
        <div class="dashboard-main">
          <section class="panel work-timer-card">
            <div class="card-heading"><div><h3>Sesi hari ini</h3><p>${formatDate(todayKey(), { weekday: "long", day: "numeric", month: "long" })}</p></div><span class="stat-icon" style="background:rgba(255,255,255,.1);color:#65e0d2">${icon("timer")}</span></div>
            <div class="timer-display" data-live-timer>${clockedIn ? formatTimer(Date.now() - data.currentShift.startedAt) : "00:00:00"}</div>
            <div class="timer-state">${clockedIn ? `Berjalan sejak ${esc(data.currentShift.start)}` : "Tekan mulai saat kamu siap bekerja"}</div>
            <div class="timer-actions"><button class="primary-button" type="button" data-action="toggle-clock">${icon(clockedIn ? "check" : "timer")} ${clockedIn ? "Selesaikan sesi" : "Mulai kerja"}</button></div>
          </section>
          <section class="panel"><div class="panel-heading"><div><h3>Riwayat jam kerja</h3><p>Catatan masuk, pulang, dan aktivitas</p></div></div>${renderLogTable()}</section>
        </div>
        <aside class="dashboard-side">
          <section class="panel">${statCard("clock", formatMinutes(total), "Total minggu ini", "stat-teal")}<div class="week-bars">${[92, 94, 88, 91, clockedIn ? 45 : 0].map((height, index) => `<div class="day-bar"><div class="day-bar-fill" style="height:${height}%"></div><small>${["Sen", "Sel", "Rab", "Kam", "Jum"][index]}</small></div>`).join("")}</div></section>
          <section class="panel standup-prompt"><div class="prompt-icon">${icon("clock")}</div><h3>Batas kerja itu penting</h3><p>Estimasi pulang hari ini pukul 16.00. Laporkan jika ada instruksi tambahan yang mengubah jam kerja.</p></section>
        </aside>
      </div>`;
  }

  function renderLogTable() {
    return `<div class="log-table-wrap"><table class="log-table"><thead><tr><th>Tanggal</th><th>Masuk</th><th>Pulang</th><th>Durasi</th><th>Aktivitas</th></tr></thead><tbody>${data.workLogs.map((log) => `<tr><td><strong>${formatDate(log.date, { day: "numeric", month: "short" })}</strong></td><td>${esc(log.start)}</td><td>${esc(log.end)}</td><td><span class="duration-pill">${formatMinutes(log.duration)}</span></td><td>${esc(log.note)}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function renderResources() {
    const resources = data.resources.filter((resource) => `${resource.title} ${resource.type} ${resource.description}`.toLowerCase().includes(resourceQuery.toLowerCase()));
    return `
      <section class="section-heading"><div><h2>Semua arahan, tidak tercecer</h2><p>Temukan dokumen proyek dan instruksi pembimbing dari satu tempat.</p></div>${role === "mentor" ? `<button class="primary-button" type="button" data-action="new-resource">${icon("plus")} Tambah informasi</button>` : ""}</section>
      <div class="announcement"><span class="announcement-icon">${icon("bell")}</span><span><strong>Review proyek dipindahkan ke Senin, pukul 10.00</strong><small>Pastikan progres terbaru dan blocker sudah diperbarui sebelum sesi dimulai.</small></span><button class="compact-button" type="button" data-view="standup">Update progres</button></div>
      <div class="toolbar"><div class="search-box"><span data-icon="search"></span><input id="resource-search" type="search" value="${esc(resourceQuery)}" placeholder="Cari panduan, desain, atau dokumen..." aria-label="Cari informasi"></div><span class="resource-meta">${resources.length} informasi ditemukan</span></div>
      ${resources.length ? `<div class="resources-grid">${resources.map(renderResourceCard).join("")}</div>` : renderEmpty("search", "Informasi tidak ditemukan", "Coba gunakan kata kunci lain yang lebih umum.")}`;
  }

  function renderResourceCard(resource) {
    const typeIcon = resource.meta.includes("Tautan") ? "link" : "file";
    return `<article class="resource-card resource-${esc(resource.color)}"><span class="resource-icon">${icon(typeIcon)}</span><span class="type-badge priority-low" style="align-self:flex-start;margin-top:12px">${esc(resource.type)}</span><h3>${esc(resource.title)}</h3><p>${esc(resource.description)}</p><div class="resource-meta"><span>${esc(resource.meta)}</span><button class="link-button" type="button" data-action="open-resource" data-resource-id="${esc(resource.id)}">Buka ${icon("arrow")}</button></div></article>`;
  }

  function renderParticipant(initials, name, subtitle, progress, needsAttention) {
    return `<article class="participant-card"><span class="person-avatar">${esc(initials)}</span><span><strong>${esc(name)}</strong><small>${esc(subtitle)}</small></span><span class="participant-progress"><strong>${Number(progress)}%</strong><small>${needsAttention ? "Perlu diingatkan" : "Aktif"}</small></span></article>`;
  }

  function renderEmpty(iconName, title, description) {
    return `<div class="empty-state"><span class="empty-icon">${icon(iconName)}</span><h3>${esc(title)}</h3><p>${esc(description)}</p></div>`;
  }

  function openModal(content) {
    lastFocusedElement = document.activeElement;
    modalLayer.innerHTML = content;
    modalLayer.classList.add("is-open");
    modalLayer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    hydrateIcons(modalLayer);
    const firstFocus = modalLayer.querySelector("input, select, textarea, button");
    if (firstFocus) firstFocus.focus();
  }

  function closeModal() {
    modalLayer.classList.remove("is-open");
    modalLayer.setAttribute("aria-hidden", "true");
    modalLayer.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function modalHeader(title, subtitle) {
    return `<div class="modal-heading"><div><h2 id="modal-title">${esc(title)}</h2><p>${esc(subtitle)}</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Tutup dialog">${icon("close")}</button></div>`;
  }

  function openBlockerModal(taskId) {
    const activeTasks = data.tasks.filter((task) => task.status !== "done");
    openModal(`<section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">${modalHeader("Laporkan kendala", "Beri konteks yang cukup agar bantuan bisa datang lebih cepat.")}<div class="modal-body"><form id="blocker-form">
      <div class="form-group"><label for="blocker-task">Tugas terkait <span class="required">*</span></label><select id="blocker-task" name="taskId" required><option value="">Pilih tugas</option>${activeTasks.map((task) => `<option value="${esc(task.id)}" ${task.id === taskId ? "selected" : ""}>${esc(task.id)} - ${esc(task.title)}</option>`).join("")}</select></div>
      <div class="form-group"><label for="blocker-title">Ringkasan kendala <span class="required">*</span></label><input id="blocker-title" name="title" required maxlength="90" placeholder="Contoh: Data form terhapus saat validasi gagal"></div>
      <div class="form-group"><label for="blocker-category">Kategori</label><select id="blocker-category" name="category"><option>Teknis</option><option>Instruksi</option><option>Desain</option><option>Akses</option><option>Lainnya</option></select></div>
      <div class="form-group"><label for="blocker-urgency">Tingkat urgensi</label><select id="blocker-urgency" name="urgency"><option value="medium">Sedang - pekerjaan masih bisa dilanjutkan</option><option value="high">Tinggi - menghambat sebagian pekerjaan</option><option value="urgent">Mendesak - pekerjaan berhenti total</option></select></div>
      <div class="form-group"><label for="blocker-description">Apa yang terjadi dan apa yang sudah dicoba? <span class="required">*</span></label><textarea id="blocker-description" name="description" required minlength="15" placeholder="Jelaskan kondisi, pesan error, dan langkah yang sudah kamu coba..."></textarea><span class="form-hint">Tidak perlu menggunakan istilah teknis yang sempurna. Ceritakan sesuai yang kamu alami.</span></div>
      <label class="privacy-option"><input type="checkbox" name="anonymous"><span class="privacy-toggle" aria-hidden="true"></span><span><strong>Sembunyikan identitas saya</strong><small>Pembimbing tetap menerima konteks tugas, tetapi nama tidak ditampilkan.</small></span></label>
      <div class="modal-actions" style="margin-top:18px"><button class="secondary-button" type="button" data-action="close-modal">Batal</button><button class="primary-button" type="submit">${icon("alert")} Kirim laporan</button></div>
    </form></div></section>`);
  }

  function openTaskDetail(taskId) {
    const task = getTask(taskId);
    if (!task) return;
    openModal(`<section class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="modal-title">${modalHeader(task.title, `${task.id} - ${task.project}`)}<div class="modal-body">
      <div class="task-card-top" style="margin-bottom:18px"><span class="priority-badge priority-${esc(task.priority)}">Prioritas ${priorityLabel(task.priority)}</span><span class="status-badge status-${task.status === "done" ? "resolved" : "open"}">${statusLabel(task.status)}</span></div>
      <div class="detail-section"><h3>Tujuan tugas</h3><p>${esc(task.description)}</p></div>
      <div class="detail-section"><h3>Instruksi pembimbing</h3><p>${esc(task.instruction)}</p></div>
      <div class="detail-section"><h3>Informasi</h3><div class="task-meta-line"><span>${icon("calendar")} Tenggat ${formatDate(task.due)}</span><span>${icon("clock")} Estimasi ${esc(task.estimate)}</span><span>${icon("users")} ${esc(task.mentor)}</span></div></div>
      <div class="detail-section"><h3>Label</h3><div class="tag-list">${task.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</div></div>
      <form id="task-update-form"><input type="hidden" name="taskId" value="${esc(task.id)}"><div class="form-group"><label for="task-status">Status tugas</label><select id="task-status" name="status">${[["todo", "Belum dimulai"], ["progress", "Dikerjakan"], ["blocker", "Terhambat"], ["done", "Selesai"]].map(([value, label]) => `<option value="${value}" ${task.status === value ? "selected" : ""}>${label}</option>`).join("")}</select></div><div class="form-group"><label for="task-progress">Progres (%)</label><input id="task-progress" type="number" name="progress" min="0" max="100" value="${Number(task.progress)}"></div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Tutup</button>${role === "student" && task.status !== "done" ? `<button class="secondary-button" type="button" data-action="quick-blocker" data-task-id="${esc(task.id)}">Laporkan kendala</button>` : ""}<button class="primary-button" type="submit">Simpan perubahan</button></div></form>
    </div></section>`);
  }

  function openNewTaskModal() {
    openModal(`<section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">${modalHeader("Buat tugas baru", "Instruksi yang jelas mengurangi pertanyaan dan kesalahpahaman.")}<div class="modal-body"><form id="new-task-form">
      <div class="form-group"><label for="new-task-title">Nama tugas <span class="required">*</span></label><input id="new-task-title" name="title" required placeholder="Contoh: Integrasi data katalog produk"></div>
      <div class="form-group"><label for="new-task-description">Tujuan dan hasil yang diharapkan <span class="required">*</span></label><textarea id="new-task-description" name="description" required placeholder="Jelaskan hasil akhir yang perlu dicapai..."></textarea></div>
      <div class="form-group"><label for="new-task-instruction">Instruksi teknis</label><textarea id="new-task-instruction" name="instruction" placeholder="Tambahkan acuan, batasan, atau langkah penting..."></textarea></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><div class="form-group"><label for="new-task-due">Tenggat <span class="required">*</span></label><input id="new-task-due" type="date" name="due" required></div><div class="form-group"><label for="new-task-priority">Prioritas</label><select id="new-task-priority" name="priority"><option value="medium">Sedang</option><option value="high">Tinggi</option><option value="urgent">Mendesak</option><option value="low">Rendah</option></select></div></div>
      <div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Batal</button><button class="primary-button" type="submit">${icon("plus")} Buat tugas</button></div>
    </form></div></section>`);
  }

  function openResponseModal(blockerId) {
    const blocker = data.blockers.find((item) => item.id === blockerId);
    if (!blocker) return;
    openModal(`<section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">${modalHeader("Berikan solusi", blocker.title)}<div class="modal-body"><div class="detail-section"><h3>Laporan peserta</h3><p>${esc(blocker.description)}</p></div><form id="response-form"><input type="hidden" name="blockerId" value="${esc(blocker.id)}"><div class="form-group"><label for="response-title">Arahan atau solusi <span class="required">*</span></label><textarea id="response-title" name="response" required minlength="10" placeholder="Tuliskan langkah yang perlu dicoba peserta..."></textarea></div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Batal</button><button class="primary-button" type="submit">${icon("message")} Kirim solusi</button></div></form></div></section>`);
  }

  function openNewResourceModal() {
    openModal(`<section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">${modalHeader("Tambah informasi", "Bagikan panduan atau dokumen pendukung kepada peserta.")}<div class="modal-body"><form id="new-resource-form"><div class="form-group"><label for="new-resource-title">Judul <span class="required">*</span></label><input id="new-resource-title" name="title" required></div><div class="form-group"><label for="resource-type">Jenis</label><select id="resource-type" name="type"><option>Panduan</option><option>Teknis</option><option>Desain</option><option>Pengumuman</option></select></div><div class="form-group"><label for="resource-description">Deskripsi <span class="required">*</span></label><textarea id="resource-description" name="description" required></textarea></div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Batal</button><button class="primary-button" type="submit">Tambah informasi</button></div></form></div></section>`);
  }

  function showToast(title, message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span class="toast-icon">${icon("check")}</span><span><strong>${esc(title)}</strong><small>${esc(message)}</small></span><button type="button" aria-label="Tutup notifikasi">${icon("close")}</button>`;
    toast.querySelector("button").addEventListener("click", () => toast.remove());
    toastRegion.appendChild(toast);
    window.setTimeout(() => toast.remove(), 4500);
  }

  function navigate(view) {
    currentView = view;
    closeSidebar();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function switchRole(nextRole) {
    role = nextRole;
    localStorage.setItem("internsync-role", role);
    currentView = "dashboard";
    render();
    showToast("Mode berhasil diubah", role === "student" ? "Sekarang menampilkan ruang kerja peserta." : "Sekarang menampilkan panel pembimbing.");
  }

  function toggleSidebar() {
    const isOpen = sidebar.classList.toggle("is-open");
    sidebarBackdrop.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  }

  function closeSidebar() {
    sidebar.classList.remove("is-open");
    sidebarBackdrop.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  function toggleClock() {
    if (data.currentShift) {
      const endDate = new Date();
      const duration = Math.max(1, Math.round((endDate.getTime() - data.currentShift.startedAt) / 60000));
      data.workLogs.unshift({
        id: `LOG-${String(data.workLogs.length + 22).padStart(3, "0")}`,
        date: todayKey(),
        start: data.currentShift.start,
        end: new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }).format(endDate).replace(".", ":"),
        duration,
        note: "Sesi kerja hari ini"
      });
      delete data.currentShift;
      showToast("Sesi kerja selesai", `Durasi ${formatMinutes(duration)} berhasil dicatat.`);
    } else {
      const now = new Date();
      data.currentShift = {
        startedAt: now.getTime(),
        start: new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }).format(now).replace(".", ":")
      };
      showToast("Sesi kerja dimulai", "Waktu kerja sekarang sedang dicatat.");
    }
    saveData();
    render();
  }

  function startTimerUpdates() {
    window.clearInterval(timerInterval);
    timerInterval = window.setInterval(() => {
      document.querySelectorAll("[data-live-clock]").forEach((element) => {
        element.textContent = data.currentShift ? formatTimer(Date.now() - data.currentShift.startedAt) : new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
      });
      document.querySelectorAll("[data-live-timer]").forEach((element) => {
        element.textContent = data.currentShift ? formatTimer(Date.now() - data.currentShift.startedAt) : "00:00:00";
      });
    }, 1000);
  }

  function handleSubmit(event) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());

    if (form.id === "blocker-form") {
      const idNumber = data.blockers.length + 19;
      data.blockers.unshift({ id: `BLK-${String(idNumber).padStart(3, "0")}`, taskId: values.taskId, title: values.title.trim(), category: values.category, urgency: values.urgency, description: values.description.trim(), anonymous: values.anonymous === "on", author: values.anonymous === "on" ? "Peserta anonim" : "Andi Pratama", createdAt: new Date().toISOString(), status: "open", response: "" });
      const task = getTask(values.taskId);
      if (task) task.status = "blocker";
      saveData(); closeModal(); currentView = "blockers"; render(); showToast("Kendala berhasil dilaporkan", "Pembimbing akan menerima laporan dan konteks tugasmu.");
    }

    if (form.id === "standup-form") {
      const existing = data.standups.find((item) => item.date === todayKey());
      if (existing) Object.assign(existing, { done: values.done.trim(), plan: values.plan.trim(), blocker: values.blocker.trim() || "Tidak ada.", mood: values.mood });
      else data.standups.unshift({ id: `STD-${String(data.standups.length + 12).padStart(3, "0")}`, date: todayKey(), done: values.done.trim(), plan: values.plan.trim(), blocker: values.blocker.trim() || "Tidak ada.", mood: values.mood });
      saveData(); render(); showToast("Standup berhasil disimpan", "Pembimbing sudah dapat melihat progres terbarumu.");
    }

    if (form.id === "task-update-form") {
      const task = getTask(values.taskId);
      if (task) { task.status = values.status; task.progress = values.status === "done" ? 100 : Math.min(100, Math.max(0, Number(values.progress))); }
      saveData(); closeModal(); render(); showToast("Progres diperbarui", "Status tugas berhasil disimpan.");
    }

    if (form.id === "new-task-form") {
      const nextNumber = Math.max(...data.tasks.map((task) => Number(task.id.split("-")[1]))) + 1;
      data.tasks.unshift({ id: `TSK-${nextNumber}`, title: values.title.trim(), project: "Website UMKM Sari Rasa", status: "todo", priority: values.priority, due: values.due, progress: 0, estimate: "4 jam", description: values.description.trim(), instruction: values.instruction.trim() || "Ikuti standar kerja tim dan komunikasikan jika ada kendala.", mentor: "Rina Putri", tags: ["Tugas baru"] });
      saveData(); closeModal(); currentView = "tasks"; render(); showToast("Tugas berhasil dibuat", "Instruksi baru sudah tersedia untuk peserta.");
    }

    if (form.id === "response-form") {
      const blocker = data.blockers.find((item) => item.id === values.blockerId);
      if (blocker) { blocker.response = values.response.trim(); blocker.status = "resolved"; const task = getTask(blocker.taskId); if (task && task.status === "blocker") task.status = "progress"; }
      saveData(); closeModal(); render(); showToast("Solusi berhasil dikirim", "Peserta akan melihat arahan pada laporan kendalanya.");
    }

    if (form.id === "new-resource-form") {
      data.resources.unshift({ id: `RES-${String(data.resources.length + 1).padStart(2, "0")}`, type: values.type, title: values.title.trim(), description: values.description.trim(), meta: "Dokumen baru", color: "blue" });
      saveData(); closeModal(); currentView = "resources"; render(); showToast("Informasi ditambahkan", "Materi baru sudah tersedia untuk peserta.");
    }
  }

  function handleClick(event) {
    const target = event.target.closest("button, [data-action], [data-view], [data-role]");
    if (!target) return;
    if (target.dataset.view) navigate(target.dataset.view);
    if (target.dataset.role) switchRole(target.dataset.role);
    const action = target.dataset.action;
    if (action === "quick-blocker") { closeModal(); openBlockerModal(target.dataset.taskId); }
    if (action === "task-detail") openTaskDetail(target.dataset.taskId);
    if (action === "task-filter") { taskFilter = target.dataset.filter; render(); }
    if (action === "toggle-clock") toggleClock();
    if (action === "new-task") openNewTaskModal();
    if (action === "respond-blocker") openResponseModal(target.dataset.blockerId);
    if (action === "new-resource") openNewResourceModal();
    if (action === "open-resource") showToast("Membuka materi", "Pada prototipe, dokumen ditampilkan sebagai data contoh.");
    if (action === "close-modal") closeModal();
  }

  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("input", (event) => {
    if (event.target.id === "resource-search") {
      resourceQuery = event.target.value;
      const cursorPosition = event.target.selectionStart;
      render();
      const nextInput = document.getElementById("resource-search");
      if (nextInput) { nextInput.focus(); nextInput.setSelectionRange(cursorPosition, cursorPosition); }
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { closeModal(); closeSidebar(); }
    if (event.key === "Tab" && modalLayer.classList.contains("is-open")) {
      const focusable = Array.from(modalLayer.querySelectorAll("button, input, select, textarea, [href]")).filter((element) => !element.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  menuButton.addEventListener("click", toggleSidebar);
  sidebarBackdrop.addEventListener("click", closeSidebar);
  modalLayer.addEventListener("mousedown", (event) => { if (event.target === modalLayer) closeModal(); });
  document.getElementById("reset-demo").addEventListener("click", () => {
    if (window.confirm("Kembalikan seluruh data ke kondisi awal?")) {
      data = cloneDefaultData();
      localStorage.removeItem(STORAGE_KEY);
      currentView = "dashboard";
      render();
      showToast("Data demo direset", "Semua tugas dan laporan kembali ke kondisi awal.");
    }
  });

  document.getElementById("today-label").textContent = new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "numeric", month: "short" }).format(new Date());
  hydrateIcons(document);
  render();
})();
