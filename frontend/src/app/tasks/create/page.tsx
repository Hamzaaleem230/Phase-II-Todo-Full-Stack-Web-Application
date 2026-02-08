// frontend/app/tasks/create/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserId } from "@/lib/auth";
import { getToken } from "@/lib/auth";
import { FormField, FormButton } from "@/components/Forms"; // Import generic form components
import { createTask } from "@/lib/api"; // Import API functions

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      await createTask(userId, {
        title,
        description: description || null,
      });
      router.push("/tasks"); // Redirect to tasks list on success
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 pt-16 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Create New Task
      </h1>
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
          disabled={loading}
        />
        <FormField
          label="Description (optional)"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          textarea
          rows={4}
          disabled={loading}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <FormButton type="submit" primary disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </FormButton>
        <FormButton
          type="button"
          onClick={() => router.push("/tasks")}
          disabled={loading}
        >
          Cancel
        </FormButton>
      </form>
    </div>
  );
}
