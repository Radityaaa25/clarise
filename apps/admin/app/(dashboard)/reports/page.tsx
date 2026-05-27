import { CheckCircle2, XCircle } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { id: 1, course: "AI prompt engineering hack", reporter: "user89", reason: "Inappropriate Content", status: "PENDING", date: "2026-05-21" },
    { id: 2, course: "Data Science 101", reporter: "radit", reason: "Copyright Violation", status: "RESOLVED", date: "2026-05-20" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">Report Management</h1>
          <p className="text-muted-foreground font-bold mt-2">Review user reports on courses and content.</p>
        </div>
      </div>

      <div className="neo-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-secondary border-b-2 border-border text-secondary-foreground text-sm uppercase font-black">
            <tr>
              <th className="px-6 py-4 font-black border-r-2 border-border">Reported Course</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Reporter</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Reason</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Status</th>
              <th className="px-6 py-4 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-border">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-muted/50 transition-colors bg-background">
                <td className="px-6 py-4 font-bold text-foreground border-r-2 border-border">{report.course}</td>
                <td className="px-6 py-4 text-muted-foreground font-bold border-r-2 border-border">{report.reporter}</td>
                <td className="px-6 py-4 text-muted-foreground font-bold border-r-2 border-border">{report.reason}</td>
                <td className="px-6 py-4 border-r-2 border-border">
                  <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                    report.status === "PENDING" ? "text-destructive-foreground bg-destructive" : "text-primary-foreground bg-primary"
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {report.status === "PENDING" && (
                    <div className="flex justify-end gap-3">
                      <button className="neo-btn bg-primary text-primary-foreground p-2" title="Resolve (Unpublish)">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button className="neo-btn bg-card text-foreground p-2" title="Dismiss">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
