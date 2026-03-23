"use client";

import TaskItem from "./TaskItem";
import { Task } from "@/src/types";

interface TaskListProps {
  tasks: Task[];
  status: string;
  setStatus: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  onFilter: () => void;
  onUpdate: (id: string, input: Partial<Omit<Task, "id">>) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({
  tasks,
  status,
  setStatus,
  priority,
  setPriority,
  onFilter,
  onUpdate,
  onDelete,
}: TaskListProps) {
  return (
    <div className="bg-gray-800 p-6 md:w-3/4">

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3 bg-gray-900 p-3 rounded-lg shadow">
        <select
          className="border border-gray-600 bg-gray-800 text-white p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <select
          className="border border-gray-600 bg-gray-800 text-white p-2 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <button
          className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded transition"
          onClick={onFilter}
        >
          Apply Filters
        </button>
      </div>

      {/* Task List */}
      <div className="mt-4 space-y-2 overflow-y-auto max-h-[calc(100vh-150px)]">
        {tasks?.map((t) => (
          <TaskItem
            key={t.id}
            t={t}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
