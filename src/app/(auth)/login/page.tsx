import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <LoginForm />
      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
