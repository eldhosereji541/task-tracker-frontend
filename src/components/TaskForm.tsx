"use client";

import { useState } from "react";

interface TaskFormProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  inputPriority: string;
  setInputPriority: (value: string) => void;
  onCreate: () => void;
}

export default function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  inputPriority,
  setInputPriority,
  onCreate,
}: TaskFormProps) {
  const [titleError, setTitleError] = useState("");

  const handleCreate = () => {
    if (!title.trim()) {
      setTitleError("Task name is required.");
      return;
    }
    setTitleError("");
    onCreate();
  };

  return (
    <div className="bg-slate-50 md:w-1/4 h-screen p-8 border-r border-gray-200 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
        New Task
      </h1>

      <div className="space-y-4 text-gray-700">
        <div>
          <input
            className={`w-full border p-2.5 rounded-lg ${titleError ? "border-red-400" : ""}`}
            value={title}
            onChange={(e) => { setTitle(e.target.value); if (titleError) setTitleError(""); }}
            placeholder="Task name..."
          />
          {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
        </div>

        <select
          className="w-full border p-2.5 rounded-lg"
          value={inputPriority}
          onChange={(e) => setInputPriority(e.target.value)}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <textarea
          className="w-full border p-2.5 rounded-lg h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)..."
        />

        <button
          className="w-full bg-teal-900 text-white py-3 rounded-lg"
          onClick={handleCreate}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
