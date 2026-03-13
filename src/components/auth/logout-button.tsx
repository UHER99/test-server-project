"use client";

import { useAuth } from "./auth-provider";

export function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      type="button"
      onClick={logout}
      className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
    >
      Logout
    </button>
  );
}
