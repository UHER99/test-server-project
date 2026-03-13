"use client";

import { useAuth } from "@/components/auth/auth-provider";

export default function UserPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold">Profile</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <dl className="grid gap-2">
          <dt className="font-medium text-gray-500">Name</dt>
          <dd>{user.name}</dd>
          <dt className="font-medium text-gray-500">Email</dt>
          <dd>{user.email}</dd>
          <dt className="font-medium text-gray-500">Role</dt>
          <dd>{user.role}</dd>
        </dl>
      </div>
    </div>
  );
}
