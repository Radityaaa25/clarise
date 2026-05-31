"use client";

import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateReportStatus } from "@/app/actions/report";

interface ReportItem {
  id: string;
  course: string;
  reporter: string;
  reason: string;
  status: string;
}

export function ReportsClient({ initialReports }: { initialReports: ReportItem[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdate = async (id: string, status: "RESOLVED" | "DISMISSED") => {
    setLoadingId(id);
    const res = await updateReportStatus(id, status);
    setLoadingId(null);
    if (!res.success) alert(res.error);
    else router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">
            Report Management
          </h1>
          <p className="text-muted-foreground font-bold mt-2">
            Review user reports on courses and content.
          </p>
        </div>
      </div>

      <div className="neo-card overflow-hidden">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-secondary border-b-2 border-border text-secondary-foreground text-sm uppercase font-black">
            <tr>
              <th className="px-6 py-4 font-black border-r-2 border-border">
                Reported Course
              </th>
              <th className="px-6 py-4 font-black border-r-2 border-border">
                Reporter
              </th>
              <th className="px-6 py-4 font-black border-r-2 border-border">
                Reason
              </th>
              <th className="px-6 py-4 font-black border-r-2 border-border">
                Status
              </th>
              <th className="px-6 py-4 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-border">
            {initialReports.map((report) => (
              <tr
                key={report.id}
                className="hover:bg-muted/50 transition-colors bg-background"
              >
                <td className="px-6 py-4 font-bold text-foreground border-r-2 border-border">
                  {report.course}
                </td>
                <td className="px-6 py-4 text-muted-foreground font-bold border-r-2 border-border">
                  {report.reporter}
                </td>
                <td className="px-6 py-4 text-muted-foreground font-bold border-r-2 border-border">
                  {report.reason}
                </td>
                <td className="px-6 py-4 border-r-2 border-border">
                  <span
                    className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                      report.status === "PENDING"
                        ? "text-destructive-foreground bg-destructive"
                        : report.status === "RESOLVED"
                          ? "text-primary-foreground bg-primary"
                          : "bg-card text-foreground"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {report.status === "PENDING" && (
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleUpdate(report.id, "RESOLVED")}
                        disabled={loadingId === report.id}
                        className="neo-btn bg-primary text-primary-foreground p-2 disabled:opacity-50"
                        title="Resolve (Unpublish)"
                      >
                        {loadingId === report.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleUpdate(report.id, "DISMISSED")}
                        disabled={loadingId === report.id}
                        className="neo-btn bg-card text-foreground p-2 disabled:opacity-50"
                        title="Dismiss"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {initialReports.length === 0 && (
              <tr className="bg-background">
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-muted-foreground font-bold"
                >
                  Tidak ada laporan yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
