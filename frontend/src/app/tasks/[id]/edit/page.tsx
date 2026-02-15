"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getToken, removeToken, getUserId } from "@/lib/auth";
import { FormField, FormButton } from "@/components/Forms";
import { fetchTaskById, updateTask } from "@/lib/api";

interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export default function EditTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  useEffect(() => {
    const loadTask = async () => {
      setLoading(true);
      setError("");
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const userId = getUserId();
      if (!userId) {
        router.push("/login");
        return;
      }

      try {
        const taskData = await fetchTaskById(userId, taskId);
        setTitle(taskData.title);
        setDescription(taskData.description || "");
        setCompleted(taskData.completed);
      } catch (err: any) {
        if (
          err.message === "No authentication token found." ||
          err.message.includes("401")
        ) {
          removeToken();
          router.push("/login");
        } else {
          setError(err.message || "Failed to load task for editing");
        }
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      loadTask();
    }
  }, [taskId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const userId = getUserId();
    if (!userId) {
      router.push("/login");
      return;
    }

    try {
      await updateTask(userId, taskId, {
        title,
        description: description || null,
        completed,
      });
      router.push("/tasks");
    } catch (err: any) {
      setError(err.message || "Failed to update task");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-black via-gray-900 to-black px-4">
        Loading task...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gradient-to-br from-black via-gray-900 to-black px-4 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8 text-white">

      <div className="
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-lg
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-6
        sm:p-8
        md:p-10
        shadow-2xl
      ">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
          Edit Task
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:gap-5"
        >
          <FormField
            label="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={submitting}
          />

          <FormField
            label="Description (optional)"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            textarea
            rows={4}
            disabled={submitting}
          />

          <div className="flex items-center gap-2 text-sm sm:text-base">
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              disabled={submitting}
              className="w-4 h-4"
            />
            <label htmlFor="completed">Completed</label>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <FormButton type="submit" primary disabled={submitting}>
            {submitting ? "Updating..." : "Update Task"}
          </FormButton>

          <FormButton
            type="button"
            onClick={() => router.push("/tasks")}
            disabled={submitting}
          >
            Cancel
          </FormButton>
        </form>

      </div>
    </main>
  );
}
