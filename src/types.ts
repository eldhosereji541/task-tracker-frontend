export type Priority = "HIGH" | "MEDIUM" | "LOW";
export type Status = "TODO" | "IN_PROGRESS" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
}
