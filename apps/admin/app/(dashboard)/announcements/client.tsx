"use client";

import { Send, Clock, Globe, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAnnouncement, deleteAnnouncement } from "@/app/actions/announcement";

type Announcement = {
  id: string;
  title: string;
  target: string;
  status: string;
  date: string;
};

export function AnnouncementsClient({ initialAnnouncements }: { initialAnnouncements: Announcement[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("ALL");
  const [body, setBody] = useState("");

  const handleCreate = async () => {
    if (!title || !body) return alert("Title and Body are required");
    setLoading(true);
    const res = await createAnnouncement({ title, target, body });
    setLoading(false);
    if (!res.success) {
      alert(res.error);
    } else {
      setTitle("");
      setBody("");
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    setDeletingId(id);
    const res = await deleteAnnouncement(id);
    setDeletingId(null);
    if (!res.success) {
      alert(res.error);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">Announcements</h1>
          <p className="text-muted-foreground font-bold mt-2">Manage global banners and notifications for users.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 neo-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-secondary border-b-2 border-border text-secondary-foreground text-sm uppercase font-black">
              <tr>
                <th className="px-6 py-4 font-black border-r-2 border-border">Announcement</th>
                <th className="px-6 py-4 font-black border-r-2 border-border">Target</th>
                <th className="px-6 py-4 font-black border-r-2 border-border">Status</th>
                <th className="px-6 py-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border">
              {initialAnnouncements.map((ann) => (
                <tr key={ann.id} className="hover:bg-muted/50 transition-colors bg-background">
                  <td className="px-6 py-4 border-r-2 border-border">
                    <div className="font-bold text-foreground">{ann.title}</div>
                    <div className="text-sm text-muted-foreground font-bold flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" /> {ann.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r-2 border-border">
                    <span className="flex items-center gap-2 text-sm text-foreground font-bold uppercase">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      {ann.target}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r-2 border-border">
                    <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                      ann.status === "ACTIVE" ? "text-primary-foreground bg-primary" : 
                      ann.status === "SCHEDULED" ? "text-accent-foreground bg-accent" : 
                      "text-foreground bg-card"
                    }`}>
                      {ann.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(ann.id)}
                      disabled={deletingId === ann.id}
                      className="neo-btn bg-destructive text-destructive-foreground p-2 disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === ann.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
              {initialAnnouncements.length === 0 && (
                <tr className="bg-background">
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground font-bold">
                    Tidak ada pengumuman.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="neo-card p-6 h-fit bg-card">
          <h3 className="text-xl font-black uppercase text-foreground border-b-2 border-border pb-2 mb-4">Create Announcement</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground font-bold mb-1">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-background border-2 border-border rounded-none px-3 py-2 text-foreground font-bold outline-none focus:border-primary neo-shadow-sm" 
                placeholder="E.g. Server Maintenance" 
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground font-bold mb-1">Target Audience</label>
              <select 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-background border-2 border-border rounded-none px-3 py-2 text-foreground font-bold outline-none focus:border-primary neo-shadow-sm"
              >
                <option value="ALL">ALL USERS</option>
                <option value="FREE">FREE ONLY</option>
                <option value="PREMIUM">PREMIUM ONLY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground font-bold mb-1">Message Body</label>
              <textarea 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-background border-2 border-border rounded-none px-3 py-2 text-foreground font-bold outline-none focus:border-primary neo-shadow-sm h-24 resize-none" 
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button 
              onClick={handleCreate}
              disabled={loading}
              className="neo-btn w-full py-2 bg-primary text-primary-foreground text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
