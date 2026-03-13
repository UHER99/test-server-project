import type { User } from "@/types/auth";

const TOKEN_KEY = "auth_token";

/** Encode user to base64 (mock JWT). */
export function generateToken(user: User): string {
  return typeof btoa !== "undefined"
    ? btoa(JSON.stringify(user))
    : Buffer.from(JSON.stringify(user), "utf-8").toString("base64");
}

/** Decode base64 token to user (pure, no localStorage). Use in handlers. */
export function decodeToken(token: string): User | null {
  try {
    const decoded =
      typeof atob !== "undefined"
        ? atob(token)
        : Buffer.from(token, "base64").toString("utf-8");
    return JSON.parse(decoded) as User;
  } catch {
    return null;
  }
}

/** Get/set/remove token from localStorage (client only). */
export const tokenStorage = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  set(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },
  remove(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

/** Verify token (from header or localStorage). */
export function verifyToken(token?: string): User | null {
  const t = token ?? tokenStorage.get();
  return t ? decodeToken(t) : null;
}
