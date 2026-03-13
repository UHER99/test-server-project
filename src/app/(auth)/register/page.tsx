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
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✨</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
          Create account
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "6px" }}>
          Get started with a free account
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label htmlFor="name" className="input-label">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="John Doe"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="input-label">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="input-label">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="Min 6 characters"
            autoComplete="new-password"
          />
        </div>
        {error && <div className="error-text">⚠ {error}</div>}
        <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", marginTop: "4px" }}>
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <div className="divider" />
      <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-muted)" }}>
        Already have an account?{" "}
        <Link href="/login" className="link-accent">
          Sign in
        </Link>
      </p>
    </div>
  );
}
