"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { LogoutButton } from "@/components/auth/logout-button";
import { UserRole } from "@/types/auth";

const roleBadgeClass: Record<string, string> = {
  ADMIN: "badge-admin",
  MANAGER: "badge-manager",
  USER: "badge-user",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, hasMinRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-spinner" />
      </div>
    );
  }
  if (!user) return null;

  const navLinks = [
    { href: "/user", label: "Profile", icon: "👤", minRole: UserRole.USER },
    { href: "/manager", label: "Manager", icon: "📊", minRole: UserRole.MANAGER },
    { href: "/admin", label: "Admin", icon: "⚙️", minRole: UserRole.ADMIN },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-primary)" }}>
      <div className="bg-mesh" />

      {/* Header */}
      <header className="glass-card" style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo + Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <Link href="/" className="gradient-text" style={{ fontSize: "1.125rem", fontWeight: 800, letterSpacing: "-0.03em", textDecoration: "none" }}>
              🛡 AuthGuard
            </Link>
            <nav style={{ display: "flex", gap: "4px" }}>
              {navLinks.map(
                (link) =>
                  hasMinRole(link.minRole) && (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`nav-link${pathname === link.href ? " active" : ""}`}
                    >
                      {link.icon} {link.label}
                    </Link>
                  )
              )}
            </nav>
          </div>

          {/* User info + Logout */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="avatar avatar-sm">{user.name.charAt(0).toUpperCase()}</div>
              <div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>{user.name}</div>
                <span className={`badge ${roleBadgeClass[user.role] ?? "badge-user"}`} style={{ fontSize: "0.625rem" }}>
                  {user.role}
                </span>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="page-wrapper" style={{ flex: 1, padding: "32px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>{children}</div>
      </main>
    </div>
  );
}
