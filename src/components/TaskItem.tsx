"use client";

import { Trash2, CheckCircle2 } from "lucide-react";
// todo: move the type and interface definitions to a separate file
interface TaskItemProps {
  t: {
    id: string;
    title: string;
    description?: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
    status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  };
  onStatusUpdate: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ t, onStatusUpdate, onDelete }: TaskItemProps) {
  return (
    <div className="border p-3 rounded hover:shadow-lg transition">
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-64">
        {/* Priority */}
        <div
          className={`text-sm row-span-2 p-4 flex items-center border-r ${
            t.priority === "HIGH"
              ? "text-red-500"
              : t.priority === "MEDIUM"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
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
              onChange={(e) =>
                onStatusUpdate(t.id, e.target.value)
              }
              className={`bg-transparent text-sm font-medium outline-none cursor-pointer ${
                t.status === "COMPLETED"
                  ? "text-green-400"
                  : (t.status === "IN_PROGRESS"
                  ? "text-yellow-400"
                  : "text-blue-400")
              }`}
            >
              <option className="text-black" value="TODO">TODO</option>
              <option className="text-black" value="IN_PROGRESS">IN_PROGRESS</option>
              <option className="text-black" value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          <button
            onClick={() => onDelete(t.id)}
            className="flex items-center gap-1 text-s text-red-400 hover:text-red-500 transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>

        {/* Description */}
        <div className="text-gray-400 text-sm p-2 self-start">
          {t.description && (
            <div className="italic">{t.description}</div>
          )}
        </div>
      </div>
    </div>
  );
}