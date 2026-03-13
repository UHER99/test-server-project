"use client";

import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/auth/role-guard";
import { tokenStorage } from "@/lib/auth/client";
import { UserRole } from "@/types/auth";
import type { User } from "@/types/auth";

export default function AdminPage() {
  return (
    <RoleGuard minRole={UserRole.ADMIN}>
      <AdminUsersTable />
    </RoleGuard>
  );
}

function AdminUsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 403 ? "Forbidden" : "Failed to load");
        return res.json();
      })
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-semibold">Admin – All Users</h1>
      <div className="overflow-hidden rounded-lg border bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{u.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{u.name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{u.email}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
