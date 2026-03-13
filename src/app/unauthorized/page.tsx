import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="page-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", padding: "24px", textAlign: "center" }}>
      <div className="bg-mesh" />
      <div className="animate-scale-in" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🚫</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "8px" }}>
          <span className="gradient-text">403</span> — Access Denied
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "400px", lineHeight: 1.6, marginBottom: "28px" }}>
          You don&apos;t have permission to view this page.
          Please contact your administrator if you believe this is an error.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link href="/" className="btn-primary">
            ← Go home
          </Link>
          <Link href="/login" className="btn-secondary">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
