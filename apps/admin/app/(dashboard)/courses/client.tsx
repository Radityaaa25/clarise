"use client";
import { CheckCircle2, XCircle, Eye, Trash2, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCourse, toggleCoursePublish } from "@/app/actions/course";

export function CoursesClient({ initialCourses }: { initialCourses: any[] }) {
  const [filter, setFilter] = useState("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus kursus "${title}" secara permanen?`)) return;
    setLoadingId(id);
    const res = await deleteCourse(id);
    setLoadingId(null);
    if (!res.success) alert(res.error);
    else router.refresh();
  };

  const handleTogglePublish = async (id: string, isPublished: boolean) => {
    setLoadingId(id);
    const res = await toggleCoursePublish(id, isPublished);
    setLoadingId(null);
    if (!res.success) alert(res.error);
    else router.refresh();
  };
  
  const courses = initialCourses.filter(course => {
    if (filter === "ALL") return true;
    if (filter === "NEEDS_REVIEW") return !course.isPublished;
    return true;
  });

  const needsReviewCount = initialCourses.filter(c => !c.isPublished).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">Course Moderation</h1>
          <p className="text-muted-foreground font-bold mt-2">Review flagged courses, approve new content, or unpublish violations.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setFilter("ALL")}
            className={`neo-btn px-4 py-2 text-sm font-bold ${filter === "ALL" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`}
          >
            All Courses
          </button>
          <button 
            onClick={() => setFilter("NEEDS_REVIEW")}
            className={`neo-btn px-4 py-2 text-sm font-bold flex items-center gap-2 ${filter === "NEEDS_REVIEW" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`}
          >
            Needs Review
            <span className="bg-accent text-accent-foreground border-2 border-border neo-shadow-sm text-[10px] px-1.5 py-0.5 font-black">{needsReviewCount}</span>
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
                    {!course.isPublished && <ShieldAlert className="w-5 h-5 text-destructive" />}
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground font-bold border-r-2 border-border">{course.authorName || 'System'}</td>
                <td className="px-6 py-4 border-r-2 border-border">
                  <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                    course.isAiGenerated ? "bg-secondary text-secondary-foreground" : "bg-card text-foreground"
                  }`}>
                    {course.isAiGenerated ? "AI GENERATED" : "MANUAL"}
                  </span>
                </td>
                <td className="px-6 py-4 border-r-2 border-border">
                  <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                    course.isPublished ? "text-primary-foreground bg-primary" : "text-destructive-foreground bg-destructive"
                  }`}>
                    {course.isPublished ? "PUBLISHED" : "PENDING REVIEW"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <a href={`${apiUrl}/course/${course.slug}`} target="_blank" rel="noreferrer" className="neo-btn bg-card text-foreground p-2 hover:bg-muted" title="Preview">
                      <Eye className="w-4 h-4" />
                    </a>
                    {!course.isPublished && (
                      <>
                        <button 
                          onClick={() => handleTogglePublish(course.id, true)}
                          disabled={loadingId === course.id}
                          className="neo-btn bg-primary text-primary-foreground p-2 hover:opacity-90 disabled:opacity-50" 
                          title="Approve"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        {/* We could use XCircle for reject, but delete handles it for now */}
                      </>
                    )}
                    <button 
                      onClick={() => handleDelete(course.id, course.title)}
                      disabled={loadingId === course.id}
                      className="neo-btn bg-destructive text-destructive-foreground p-2 hover:opacity-90 disabled:opacity-50" 
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
                <tr className="bg-background">
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground font-bold">
                    Tidak ada kursus yang ditemukan.
                  </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
