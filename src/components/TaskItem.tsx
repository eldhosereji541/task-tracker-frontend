"use client";

import { useState } from "react";
import { Trash2, CheckCircle2, Pencil, X, Check } from "lucide-react";
import { Task, Priority, Status } from "@/src/types";

interface TaskItemProps {
  t: Task;
  onUpdate: (id: string, input: Partial<Omit<Task, "id">>) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ t, onUpdate, onDelete }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(t.title);
  const [editDescription, setEditDescription] = useState(t.description ?? "");
  const [editPriority, setEditPriority] = useState<Priority>(t.priority);

  const handleSave = () => {
    onUpdate(t.id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(t.title);
    setEditDescription(t.description ?? "");
    setEditPriority(t.priority);
    setEditing(false);
  };

  const priorityColor =
    t.priority === "HIGH"
      ? "text-red-500"
      : t.priority === "MEDIUM"
      ? "text-yellow-500"
      : "text-green-500";

  const statusColor =
    t.status === "COMPLETED"
      ? "text-green-400"
      : t.status === "IN_PROGRESS"
      ? "text-yellow-400"
      : "text-blue-400";

  if (editing) {
    return (
      <div className="border border-teal-600 p-4 rounded bg-gray-700 space-y-3">
        <input
          className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded text-sm"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Task title..."
        />

        <div className="flex items-center gap-3">
          <label className="text-gray-400 text-xs whitespace-nowrap">Priority</label>
          <select
            className="bg-gray-800 border border-gray-600 text-white p-1.5 rounded text-sm"
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <textarea
          className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded text-sm h-20 resize-none"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description (optional)..."
        />

        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 transition px-3 py-1.5 rounded border border-gray-600"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1 text-sm text-white bg-teal-700 hover:bg-teal-600 transition px-3 py-1.5 rounded"
          >
            <Check className="w-3.5 h-3.5" />
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border p-3 rounded hover:shadow-lg transition">
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-64">
        {/* Priority */}
        <div className={`text-sm row-span-2 p-4 flex items-center border-r ${priorityColor}`}>
          {t.priority}
        </div>

        {/* Title */}
        <div className="font-semibold p-2 self-end">{t.title}</div>

        {/* Actions */}
        <div className="row-span-2 flex flex-col items-center justify-center gap-3 p-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-lg shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-white opacity-80" />
            <select
              value={t.status}
              onChange={(e) => onUpdate(t.id, { status: e.target.value as Status })}
              className={`bg-transparent text-sm font-medium outline-none cursor-pointer ${statusColor}`}
            >
              <option className="text-black" value="TODO">TODO</option>
              <option className="text-black" value="IN_PROGRESS">IN_PROGRESS</option>
              <option className="text-black" value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 text-sm text-teal-400 hover:text-teal-300 transition"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={() => onDelete(t.id)}
            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-500 transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>

        {/* Description */}
        <div className="text-gray-400 text-sm p-2 self-start">
          {t.description && <div className="italic">{t.description}</div>}
        </div>
      </div>
    </div>
  );
}
