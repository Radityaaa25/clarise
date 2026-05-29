"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="neo-card flex flex-col items-center text-center p-12 max-w-md w-full">
        <div className="w-24 h-24 bg-destructive flex items-center justify-center border-4 border-border mb-6 neo-shadow">
          <AlertTriangle className="w-12 h-12 text-destructive-foreground" />
        </div>

        <h1 className="text-3xl font-black uppercase text-foreground mb-2">
          Terjadi Kesalahan
        </h1>
        <h2 className="text-sm font-bold text-muted-foreground mb-6 border-b-2 border-border pb-4 w-full">
          {error.message || "Sistem admin mengalami masalah internal."}
        </h2>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => reset()}
            className="neo-btn bg-accent text-accent-foreground flex items-center gap-2 px-6 py-3 uppercase font-black w-full justify-center"
          >
            <RefreshCcw className="w-5 h-5" />
            Coba Lagi
          </button>

          <Link
            href="/"
            className="neo-btn bg-card text-foreground flex items-center gap-2 px-6 py-3 uppercase font-black w-full justify-center"
          >
            <Home className="w-5 h-5" />
            Kembali ke Awal
          </Link>
        </div>
      </div>
    </div>
  );
}
