"use client";

import { CREATE_TASK, GET_TASKS } from "@/src/lib/graphql";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";

export default function TasksPage() {
  const [createTask] = useMutation(CREATE_TASK);

  const [title, setTitle] = useState("");

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
          description: "test",
          status :  "TODO",
          priority:  "MEDIUM",
        },
      },
    });

    setTitle("");
    refetch();
  };

  return (
    <div className="p-10">
      <button
  className="bg-red-500 text-white px-3 py-2 mb-4"
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
>
  Logout
</button>
      <h1 className="text-xl mb-4">Tasks</h1>

      <input
        className="border p-2 mr-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={handleCreate}
      >
        Add
      </button>
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
      <div className="mt-4 space-y-2">
  {data?.tasks.map((t: any) => (
    <div key={t.id} className="border p-3 rounded">
      <div className="font-semibold">{t.title}</div>
      <div className="text-sm text-gray-600">
        {t.status} | {t.priority}
      </div>
    </div>
  ))}
</div>
    </div>
  );
}
