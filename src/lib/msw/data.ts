import type { User } from "@/types/auth";
import { UserRole } from "@/types/auth";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const initialUsers: UserRecord[] = [
  { id: "1", name: "Admin User", email: "admin@test.com", password: "admin123", role: "ADMIN" },
  { id: "2", name: "Manager User", email: "manager@test.com", password: "manager123", role: "MANAGER" },
  { id: "3", name: "Regular User", email: "user@test.com", password: "user123", role: "USER" },
];

const users: UserRecord[] = [...initialUsers];

function toUser(record: UserRecord): User {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    role: record.role as UserRole,
  };
}

export function findUser(email: string): UserRecord | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(
  name: string,
  email: string,
  password: string,
  role: UserRole = UserRole.USER
): User {
  const id = String(users.length + 1);
  const record: UserRecord = { id, name, email, password, role };
  users.push(record);
  return toUser(record);
}

export function getAllUsers(): User[] {
  return users.map(toUser);
}
