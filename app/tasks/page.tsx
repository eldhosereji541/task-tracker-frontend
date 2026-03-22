"use client";

import {
  CREATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  UPDATE_TASK,
} from "@/src/lib/graphql";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";
import { Trash2, CheckCircle2 } from "lucide-react";
import TaskList from "@/src/components/TaskList";
import TaskForm from "@/src/components/TaskForm";
import Header from "@/src/components/Header";

export default function TasksPage() {
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

  // status update handler
  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateTask({
        variables: {
          id,
          input: {
            status,
          },
        },
      });
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
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
