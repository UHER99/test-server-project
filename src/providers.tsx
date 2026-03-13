"use client";

import { useEffect, useState } from "react";
import { worker } from "@/lib/msw/browser";
import { AuthProvider } from "@/components/auth/auth-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    worker
      .start({
        onUnhandledRequest: "bypass",
        quiet: true,
      })
      .then(() => setReady(true))
      .catch(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <AuthProvider>{children}</AuthProvider>;
}
