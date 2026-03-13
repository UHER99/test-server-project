"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { registerSchema } from "@/lib/validation/auth";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = registerSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    const result = await register(parsed.data.name, parsed.data.email, parsed.data.password);
    setLoading(false);
    if (!result.ok) setError(result.error ?? "Registration failed");
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2"
            autoComplete="new-password"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
