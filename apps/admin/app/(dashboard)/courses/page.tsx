import { CheckCircle2, XCircle, Eye, Trash2, ShieldAlert } from "lucide-react";

export default function CoursesPage() {
  const courses = [
    { id: 1, title: "React Modern v19", creator: "Radit", type: "MANUAL", status: "PUBLISHED", flagged: false },
    { id: 2, title: "AI prompt engineering hack", creator: "Anon123", type: "AI_GENERATED", status: "PENDING_REVIEW", flagged: true },
    { id: 3, title: "UI/UX for Beginners", creator: "Siti Aminah", type: "MANUAL", status: "PUBLISHED", flagged: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">Course Moderation</h1>
          <p className="text-muted-foreground font-bold mt-2">Review flagged courses, approve new content, or unpublish violations.</p>
        </div>
        <div className="flex gap-4">
          <button className="neo-btn bg-primary text-primary-foreground px-4 py-2 text-sm font-bold">All Courses</button>
          <button className="neo-btn bg-card text-foreground px-4 py-2 text-sm font-bold flex items-center gap-2">
            Needs Review
            <span className="bg-accent text-accent-foreground border-2 border-border neo-shadow-sm text-[10px] px-1.5 py-0.5 font-black">1</span>
          </button>
        </div>
      </div>

      <div className="neo-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-secondary border-b-2 border-border text-secondary-foreground text-sm uppercase font-black">
            <tr>
              <th className="px-6 py-4 font-black border-r-2 border-border">Course Title</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Creator</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Type</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Status</th>
              <th className="px-6 py-4 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-border">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-muted/50 transition-colors bg-background">
                <td className="px-6 py-4 border-r-2 border-border">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    {course.title}
                    {course.flagged && <ShieldAlert className="w-5 h-5 text-destructive" />}
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground font-bold border-r-2 border-border">{course.creator}</td>
                <td className="px-6 py-4 border-r-2 border-border">
                  <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                    course.type === "AI_GENERATED" ? "bg-secondary text-secondary-foreground" : "bg-card text-foreground"
                  }`}>
                    {course.type.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 border-r-2 border-border">
                  <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                    course.status === "PUBLISHED" ? "text-primary-foreground bg-primary" : "text-destructive-foreground bg-destructive"
                  }`}>
                    {course.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button className="neo-btn bg-card text-foreground p-2" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    {course.status === "PENDING_REVIEW" && (
                      <>
                        <button className="neo-btn bg-primary text-primary-foreground p-2" title="Approve">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button className="neo-btn bg-destructive text-destructive-foreground p-2" title="Reject">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="neo-btn bg-destructive text-destructive-foreground p-2" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
