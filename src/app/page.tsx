import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="bg-mesh" />

      {/* Nav */}
      <header style={{ padding: "20px 32px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1200px", margin: "0 auto" }}>
          <span className="gradient-text" style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
            🛡 AuthGuard
          </span>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/login" className="btn-secondary" style={{ padding: "8px 20px", fontSize: "0.875rem" }}>
              Sign in
            </Link>
            <Link href="/register" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.875rem" }}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, padding: "0 24px" }}>
        <div className="animate-fade-in" style={{ textAlign: "center", maxWidth: "640px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔐</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px" }}>
            <span className="gradient-text">Role-Based</span>
            <br />
            Access Control
          </h1>
          <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "40px" }}>
            A complete authentication system with role hierarchy, protected routes, and mock API.
            Powered by <strong style={{ color: "var(--text-primary)" }}>Next.js</strong> &{" "}
            <strong style={{ color: "var(--text-primary)" }}>MSW</strong>.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/login" className="btn-primary" style={{ padding: "14px 36px", fontSize: "1rem" }}>
              Sign in →
            </Link>
            <Link href="/register" className="btn-secondary" style={{ padding: "14px 36px", fontSize: "1rem" }}>
              Create account
            </Link>
          </div>

          {/* Test accounts hint */}
          <div className="glass-card animate-fade-in animate-delay-2" style={{ marginTop: "48px", padding: "20px 24px", textAlign: "left" }}>
            <p style={{ fontSize: "0.813rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
              ✨ Demo Accounts
            </p>
            <div style={{ display: "grid", gap: "8px" }}>
              {[
                { email: "admin@test.com", pass: "admin123", role: "ADMIN", cls: "badge-admin" },
                { email: "manager@test.com", pass: "manager123", role: "MANAGER", cls: "badge-manager" },
                { email: "user@test.com", pass: "user123", role: "USER", cls: "badge-user" },
              ].map((acc) => (
                <div key={acc.email} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border-color)" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <code style={{ color: "var(--text-primary)" }}>{acc.email}</code>{" "}
                    <span style={{ color: "var(--text-muted)" }}>/ {acc.pass}</span>
                  </span>
                  <span className={`badge ${acc.cls}`}>{acc.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
