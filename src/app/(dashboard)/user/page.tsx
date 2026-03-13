"use client";

import { useAuth } from "@/components/auth/auth-provider";

export default function UserPage() {
  const { user } = useAuth();
  if (!user) return null;

  const fields = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Role", value: user.role },
    { label: "ID", value: user.id },
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: "640px" }}>
      <h1 className="section-title" style={{ marginBottom: "8px" }}>Profile</h1>
      <p className="section-subtitle" style={{ marginBottom: "28px" }}>Your account information</p>

      <div className="glass-card" style={{ padding: "32px" }}>
        {/* Avatar block */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px", paddingBottom: "24px", borderBottom: "1px solid var(--border-color)" }}>
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>{user.name}</div>
            <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{user.email}</div>
          </div>
        </div>

        {/* Info grid */}
        <div style={{ display: "grid", gap: "20px" }}>
          {fields.map((f) => (
            <div key={f.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 500 }}>{f.label}</span>
              <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
