import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🔑</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
          Welcome back
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "6px" }}>
          Sign in to your account
        </p>
      </div>
      <LoginForm />
      <div className="divider" />
      <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-muted)" }}>
        Don&apos;t have an account?{" "}
        <Link href="/register" className="link-accent">
          Register
        </Link>
      </p>
    </div>
  );
}
