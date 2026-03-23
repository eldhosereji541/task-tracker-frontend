"use client";

import {
  CREATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  UPDATE_TASK,
} from "@/src/lib/graphql";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";
import { Task } from "@/src/types";
import TaskList from "@/src/components/TaskList";
import TaskForm from "@/src/components/TaskForm";
import Header from "@/src/components/Header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);


  const [createTask] = useMutation(CREATE_TASK);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputPriority, setInputPriority] = useState("MEDIUM");

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

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

  const handleUpdate = async (id: string, input: Partial<Omit<Task, "id">>) => {
    try {
      await updateTask({ variables: { id, input } });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  // delete handler
  const handleDelete = async (id: string) => {
    try {
      await deleteTask({
        variables: {
          id,
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row">
        <TaskForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          inputPriority={inputPriority}
          setInputPriority={setInputPriority}
          onCreate={handleCreate}
        />

        <TaskList
          tasks={data?.tasks}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          onFilter={refetch}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
