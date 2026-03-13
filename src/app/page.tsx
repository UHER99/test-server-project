import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded border border-gray-300 px-6 py-2 hover:bg-gray-50"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
