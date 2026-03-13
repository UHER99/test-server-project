import { rest } from "msw";
import { decodeToken } from "@/lib/auth/client";
import { findUser, createUser, getAllUsers } from "./data";
import { UserRole } from "@/types/auth";

function getBearerUser(req: { headers: { get(name: string): string | null } }) {
  const auth = req.headers.get("Authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const user = token ? decodeToken(token) : null;
  return { user, token };
}

export const handlers = [
  rest.post("/api/auth/login", async (req, res, ctx) => {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";
    const record = findUser(email);
    if (!record || record.password !== password) {
      return res(ctx.status(401), ctx.json({ error: "Invalid email or password" }));
    }
    const user = { id: record.id, name: record.name, email: record.email, role: record.role as UserRole };
    const token = typeof btoa !== "undefined"
      ? btoa(JSON.stringify(user))
      : Buffer.from(JSON.stringify(user), "utf-8").toString("base64");
    return res(ctx.json({ token, user }));
  }),

  rest.post("/api/auth/register", async (req, res, ctx) => {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name : "";
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!name || !email || !password) {
      return res(ctx.status(400), ctx.json({ error: "Name, email and password required" }));
    }
    if (findUser(email)) {
      return res(ctx.status(400), ctx.json({ error: "Email already registered" }));
    }
    const user = createUser(name, email, password, UserRole.USER);
    const token = typeof btoa !== "undefined"
      ? btoa(JSON.stringify(user))
      : Buffer.from(JSON.stringify(user), "utf-8").toString("base64");
    return res(ctx.json({ token, user }));
  }),

  rest.post("/api/auth/logout", (_req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),

  rest.get("/api/auth/session", (req, res, ctx) => {
    const { user } = getBearerUser(req);
    if (!user) return res(ctx.status(401), ctx.json({ error: "Unauthorized" }));
    return res(ctx.json(user));
  }),

  rest.get("/api/admin/users", (req, res, ctx) => {
    const { user } = getBearerUser(req);
    if (!user) return res(ctx.status(401), ctx.json({ error: "Unauthorized" }));
    if (user.role !== UserRole.ADMIN) return res(ctx.status(403), ctx.json({ error: "Forbidden" }));
    return res(ctx.json(getAllUsers()));
  }),
];
