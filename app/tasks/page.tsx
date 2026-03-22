"use client";

import { CREATE_TASK, GET_TASKS } from "@/src/lib/graphql";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";

export default function TasksPage() {
  const [createTask] = useMutation(CREATE_TASK);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputPriority, setInputPriority] = useState("MEDIUM");

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const { data, refetch } = useQuery(GET_TASKS, {
    variables: {
      filter: {
        status: status || null,
        priority: priority || null,
      },
    },
  });

  const handleCreate = async () => {
    await createTask({
      variables: {
        input: {
          title,
          description: description || "",
          status: "TODO",
          priority: inputPriority,
        },
      },
    });

    setTitle("");
    setDescription("");
    refetch();
  };

  return (
    <div className="h-screen">
      <div className="text-end">
        <button
          className="bg-red-500 px-3 py-2 my-2"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Task Form */}
        <div className="bg-slate-50 md:w-1/4 h-screen p-8 border-r border-gray-200 flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            New Task
          </h1>

          <div className="space-y-4 text-gray-700">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-600">
                Title
              </label>
              <input
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-teal-600 outline-none transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task name..."
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-600">
                Priority
              </label>
              <select
                className="w-full border border-gray-300 p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-teal-600 outline-none"
                value={inputPriority}
                onChange={(e) => setInputPriority(e.target.value)}
              >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-600">
                Description
              </label>
              <textarea
                className="w-full border border-gray-300 p-2.5 rounded-lg h-32 resize-none focus:ring-2 focus:ring-teal-600 outline-none"
                placeholder="What needs to be done?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-teal-900 hover:bg-teal-950 text-white font-medium py-3 rounded-lg transition-colors shadow-sm mt-2"
              onClick={handleCreate}
            >
              Create Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-gray-800 p-6 md:w-3/4 ">
          <div className="mb-4">
            <select
              className="border p-2 mr-2"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>

            <select
              className="border p-2 mr-2"
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">All Priority</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>

            <button
              className="bg-gray-500 text-white px-3 py-2"
              onClick={() => refetch()}
            >
              Filter
            </button>
          </div>
          <div className="mt-4 space-y-2 overflow-y-auto max-h-[calc(100vh-150px)]">
            {data?.tasks.map((t: any) => (
              <div key={t.id} className="border p-3 rounded">
                <div className="grid grid-cols-3 grid-rows-2 gap-4 h-64">
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
                  <div className="font-semibold p-2 self-end">{t.title}</div>
                  <div className="row-span-2 bg-blue-500 text-white p-4 text-sm flex items-center justify-center rounded">
                    {t.status}
                  </div>
                  <div className="text-gray-500 text-sm p-2 self-start">
                    {t.description && (
                      <div className="text-sm text-gray-700 italic">
                        {t.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
