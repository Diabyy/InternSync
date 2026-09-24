export type UserRole = "student" | "mentor";

export type TaskStatus = "todo" | "progress" | "blocker" | "done";

export type TaskPriority = "urgent" | "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  priority: TaskPriority;
  due: string;
  progress: number;
  estimate: string;
  description: string;
  instruction: string;
  mentor: string;
  tags: string[];
}

export type BlockerCategory = "Teknis" | "Instruksi" | "Desain" | "Akses" | "Lainnya";

export type BlockerUrgency = "urgent" | "high" | "medium";

export type BlockerStatus = "open" | "resolved";

export interface Blocker {
  id: string;
  taskId: string;
  title: string;
  category: string;
  urgency: BlockerUrgency;
  description: string;
  anonymous: boolean;
  author: string;
  createdAt: string;
  status: BlockerStatus;
  response: string;
}

export type StandupMood = "great" | "good" | "stuck";

export interface DailyStandup {
  id: string;
  date: string;
  done: string;
  plan: string;
  blocker: string;
  mood: StandupMood;
}

export interface WorkLog {
  id: string;
  date: string;
  start: string;
  end: string;
  duration: number;
  note: string;
}

export interface CurrentShift {
  startedAt: number;
  start: string;
}

export interface Resource {
  id: string;
  type: string;
  title: string;
  description: string;
  meta: string;
  color: "teal" | "purple" | "orange" | "blue" | "pink";
}

export interface Participant {
  id: string;
  name: string;
  initials: string;
  division: string;
  progress: number;
  status: "blocker" | "on-track" | "needs-update";
  standup: boolean;
  activeTasks: number;
}

export interface AppState {
  tasks: Task[];
  blockers: Blocker[];
  standups: DailyStandup[];
  workLogs: WorkLog[];
  resources: Resource[];
  participants: Participant[];
  currentShift: CurrentShift | null;
}

export type ActiveTab =
  | "dashboard"
  | "tasks"
  | "blockers"
  | "standup"
  | "worklog"
  | "resources";
