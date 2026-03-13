"use client";

import { useState } from "react";
import { useAuth } from "./auth-provider";
import { useLoginMutation } from "@/hooks/useAuthMutations";
import { loginSchema } from "@/lib/validation/auth";
import { tokenStorage } from "@/lib/auth/client";

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    const result = await login(parsed.data.email, parsed.data.password);
    if (!result.ok) setError(result.error ?? "Login failed");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <label htmlFor="email" className="input-label">
          Email
        </label>
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
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>
      {error && <div className="error-text">⚠ {error}</div>}
      <button type="submit" disabled={loginMutation.isPending} className="btn-primary" style={{ width: "100%", marginTop: "4px" }}>
        {loginMutation.isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
