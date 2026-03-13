import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-semibold">403 – Access Denied</h1>
      <p className="text-gray-600">You do not have permission to view this page.</p>
      <Link
        href="/"
        className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
      >
        Go home
      </Link>
    </div>
  );
}
