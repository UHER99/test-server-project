"use client";

import { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";
import { UserRole } from "@/types/auth";

type RoleGuardProps = {
  minRole: UserRole;
  children: ReactNode;
  fallback?: ReactNode;
};

export function RoleGuard({ minRole, children, fallback }: RoleGuardProps) {
  const { user, loading, hasMinRole } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="loader-inline">
        <div className="loader-spinner" />
      </div>
    );
  }

  if (!user || !hasMinRole(minRole)) {
    if (fallback !== undefined) return <>{fallback}</>;
    router.replace("/unauthorized");
    return null;
  }

  return <>{children}</>;
}
