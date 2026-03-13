"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { LogoutButton } from "@/components/auth/logout-button";
import { UserRole } from "@/types/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, hasMinRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <nav className="flex gap-4">
            <Link href="/user" className="text-gray-700 hover:text-gray-900">
              Profile
            </Link>
            {hasMinRole(UserRole.MANAGER) && (
              <Link href="/manager" className="text-gray-700 hover:text-gray-900">
                Manager
              </Link>
            )}
            {hasMinRole(UserRole.ADMIN) && (
              <Link href="/admin" className="text-gray-700 hover:text-gray-900">
                Admin
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user.name} ({user.role})
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
