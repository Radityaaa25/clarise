"use client";

import Link from "next/link";
import { AlertOctagon, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-background p-6">
      <div className="neo-card flex flex-col items-center text-center p-12 max-w-md w-full">
        <div className="w-24 h-24 bg-accent flex items-center justify-center border-4 border-border mb-6 neo-shadow">
          <AlertOctagon className="w-12 h-12 text-accent-foreground" />
        </div>
        
        <h1 className="text-4xl font-black uppercase text-foreground mb-2">404</h1>
        <h2 className="text-xl font-bold uppercase text-muted-foreground mb-6 border-b-2 border-border pb-4 w-full">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-sm font-medium text-muted-foreground mb-8">
          Maaf, halaman admin yang Anda cari tidak ada atau mungkin sedang dalam perbaikan.
        </p>
        
        <Link 
          href="/"
          className="neo-btn bg-primary text-primary-foreground flex items-center gap-2 px-6 py-3 uppercase font-black w-full justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
