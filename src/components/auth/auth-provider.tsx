"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/auth";
import { UserRole } from "@/types/auth";
import { tokenStorage, decodeToken } from "@/lib/auth/client";
import { authService } from "@/services/auth.service";

const ROLE_LEVEL: Record<UserRole, number> = {
  [UserRole.USER]: 1,
  [UserRole.MANAGER]: 2,
  [UserRole.ADMIN]: 3,
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  hasMinRole: (role: UserRole) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadSession = useCallback(async () => {
    const token = tokenStorage.get();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    const decoded = decodeToken(token);
    if (decoded) {
      setUser(decoded);
    } else {
      tokenStorage.remove();
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const data = await authService.login(email, password);
        if (data.token && data.user) {
          tokenStorage.set(data.token);
          setUser(data.user);
          if (data.user.role === UserRole.ADMIN) router.push("/admin");
          else if (data.user.role === UserRole.MANAGER) router.push("/manager");
          else router.push("/user");
          return { ok: true };
        }
        return { ok: false, error: "Invalid response" };
      } catch (err: unknown) {
        const msg =
          err && typeof err === "object" && "response" in err
            ? ((err as { response?: { data?: { error?: string } } }).response?.data?.error ?? "Login failed")
            : "Login failed";
        return { ok: false, error: msg };
      }
    },
    [router]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const data = await authService.register(name, email, password);
        if (data.token && data.user) {
          tokenStorage.set(data.token);
          setUser(data.user);
          router.push("/user");
          return { ok: true };
        }
        return { ok: false, error: "Invalid response" };
      } catch (err: unknown) {
        const msg =
          err && typeof err === "object" && "response" in err
            ? ((err as { response?: { data?: { error?: string } } }).response?.data?.error ?? "Registration failed")
            : "Registration failed";
        return { ok: false, error: msg };
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    authService.logout().catch(() => { });
    tokenStorage.remove();
    setUser(null);
    router.push("/login");
  }, [router]);

  const hasRole = useCallback(
    (role: UserRole) => (user ? user.role === role : false),
    [user]
  );

  const hasMinRole = useCallback(
    (role: UserRole) => (user ? ROLE_LEVEL[user.role] >= ROLE_LEVEL[role] : false),
    [user]
  );

  const value: AuthContextValue = {
    user,
    loading,
    login,
    register,
    logout,
    hasRole,
    hasMinRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
