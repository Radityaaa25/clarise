"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";

export function DashboardLayoutClient({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>

      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main content area offset by sidebar width on desktop */}
      <div
        className={`transition-all duration-300 ${collapsed ? "md:pl-[72px]" : "md:pl-[260px]"}`}
      >
        {header}
        <main id="main-content" className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </>
  );
}
