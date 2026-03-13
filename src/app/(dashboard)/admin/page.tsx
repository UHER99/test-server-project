"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { useUsers } from "@/hooks/useUsers";
import { UserRole } from "@/types/auth";

const roleBadgeClass: Record<string, string> = {
  ADMIN: "badge-admin",
  MANAGER: "badge-manager",
  USER: "badge-user",
};

export default function AdminPage() {
  return (
    <RoleGuard minRole={UserRole.ADMIN}>
      <AdminUsersTable />
    </RoleGuard>
  );
}

function AdminUsersTable() {
  const { data: users = [], isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <div className="loader-inline">
        <div className="loader-spinner" />
      </div>
    );
  }
  if (error) return <div className="error-text">⚠ {error.message}</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 className="section-title">Users</h1>
          <p className="section-subtitle">{users.length} registered accounts</p>
        </div>
        <div className="badge badge-admin" style={{ fontSize: "0.75rem" }}>
          🔒 Admin Only
        </div>
      </div>

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{ fontFamily: "monospace", color: "var(--text-muted)" }}>#{u.id}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="avatar avatar-sm">{u.name.charAt(0).toUpperCase()}</div>
                    <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{u.name}</span>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${roleBadgeClass[u.role] ?? "badge-user"}`}>
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
