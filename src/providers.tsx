"use client";

import { useEffect, useState } from "react";
import { AuthProvider } from "@/components/auth/auth-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function startMSW() {
      if (typeof window !== "undefined") {
        const { worker } = await import("@/lib/msw/browser");
        await worker
          .start({
            onUnhandledRequest: "bypass",
            quiet: true,
          })
          .catch(() => { });
      }
      setReady(true);
    }
    startMSW();
  }, []);

  if (!ready) {
    return (
      <div className="loader-screen">
        <div className="loader-spinner" />
      </div>
    );
  }

  return <AuthProvider>{children}</AuthProvider>;
}
