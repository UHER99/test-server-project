"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { UserRole } from "@/types/auth";

const features = [
  { icon: "📋", title: "Team Reports", desc: "View and manage team performance reports" },
  { icon: "📈", title: "Analytics", desc: "Access team productivity analytics and metrics" },
  { icon: "👥", title: "Team Members", desc: "Manage team members and assignments" },
  { icon: "📅", title: "Scheduling", desc: "Set and review team schedules" },
];

export default function ManagerPage() {
  return (
    <RoleGuard minRole={UserRole.MANAGER}>
      <div className="animate-fade-in">
        <h1 className="section-title" style={{ marginBottom: "8px" }}>Manager Dashboard</h1>
        <p className="section-subtitle" style={{ marginBottom: "32px" }}>
          Tools and features for managers and admins
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {features.map((f, i) => (
            <div key={f.title} className={`stat-card animate-fade-in animate-delay-${i + 1}`}>
              <div
                className="stat-card-icon"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))", border: "1px solid rgba(99,102,241,0.2)" }}
              >
                {f.icon}
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "6px" }}>{f.title}</div>
              <div style={{ fontSize: "0.813rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}
