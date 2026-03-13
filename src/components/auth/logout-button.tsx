"use client";

import { useAuth } from "./auth-provider";

export function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button type="button" onClick={logout} className="btn-danger">
      ↪ Logout
    </button>
  );
}
