import { http, HttpResponse } from "msw";
import { decodeToken } from "@/lib/auth/client";
import { findUser, createUser, getAllUsers } from "./data";
import { UserRole } from "@/types/auth";

function getBearerUser(request: Request): { user: ReturnType<typeof decodeToken>; token: string | null } {
  const auth = request.headers.get("Authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const user = token ? decodeToken(token) : null;
  return { user, token };
}

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    const email = typeof body === "object" && body && "email" in body ? (body as { email: string }).email : "";
    const password = typeof body === "object" && body && "password" in body ? (body as { password: string }).password : "";
    const record = findUser(email);
    if (!record || record.password !== password) {
      return HttpResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const user = { id: record.id, name: record.name, email: record.email, role: record.role as UserRole };
    const token = typeof btoa !== "undefined" ? btoa(JSON.stringify(user)) : Buffer.from(JSON.stringify(user), "utf-8").toString("base64");
    return HttpResponse.json({ token, user });
  }),

  http.post("/api/auth/register", async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    const name = typeof body === "object" && body && "name" in body ? (body as { name: string }).name : "";
    const email = typeof body === "object" && body && "email" in body ? (body as { email: string }).email : "";
    const password = typeof body === "object" && body && "password" in body ? (body as { password: string }).password : "";
    if (!name || !email || !password) {
      return HttpResponse.json({ error: "Name, email and password required" }, { status: 400 });
    }
    if (findUser(email)) {
      return HttpResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    const user = createUser(name, email, password, UserRole.USER);
    const token = typeof btoa !== "undefined" ? btoa(JSON.stringify(user)) : Buffer.from(JSON.stringify(user), "utf-8").toString("base64");
    return HttpResponse.json({ token, user });
  }),

  http.post("/api/auth/logout", () => {
    return HttpResponse.json({ success: true });
  }),

  http.get("/api/auth/session", ({ request }) => {
    const { user } = getBearerUser(request);
    if (!user) return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    return HttpResponse.json(user);
  }),

  http.get("/api/admin/users", ({ request }) => {
    const { user } = getBearerUser(request);
    if (!user) return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== UserRole.ADMIN) return HttpResponse.json({ error: "Forbidden" }, { status: 403 });
    return HttpResponse.json(getAllUsers());
  }),
];
