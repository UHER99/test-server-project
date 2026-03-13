"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { UserRole } from "@/types/auth";

export default function ManagerPage() {
  return (
    <RoleGuard minRole={UserRole.MANAGER}>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-semibold">Manager</h1>
        <p className="text-gray-600">
          This page is visible to Manager and Admin roles only.
        </p>
      </div>
    </RoleGuard>
  );
}
