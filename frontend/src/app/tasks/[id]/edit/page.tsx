"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getToken, removeToken, getUserId } from "@/lib/auth";
import { FormField, FormButton } from "@/components/Forms";
import { fetchTaskById, updateTask } from "@/lib/api"; // Assuming these functions will be added to api.ts

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
    return <div style={{ padding: "20px" }}>Loading task...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Edit Task</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
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
        <div>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            disabled={submitting}
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="completed">Completed</label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
  );
}
