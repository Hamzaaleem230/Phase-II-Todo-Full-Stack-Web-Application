// frontend/app/tasks/create/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserId, getToken } from "@/lib/auth";
import { FormField, FormButton } from "@/components/Forms";
import { createTask } from "@/lib/api";

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
      router.push("/tasks");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">

      <div className="
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-lg
        lg:max-w-xl
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-6
        sm:p-8
        md:p-10
        shadow-2xl
        text-white
      ">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
          Create New Task
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

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

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
    </main>
  );
}
