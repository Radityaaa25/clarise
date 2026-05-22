import { Send, Clock, Globe } from "lucide-react";

export default function AnnouncementsPage() {
  const announcements = [
    { id: 1, title: "System Maintenance", target: "ALL", status: "SCHEDULED", date: "2026-05-25" },
    { id: 2, title: "New AI Features", target: "PREMIUM", status: "ACTIVE", date: "2026-05-20" },
    { id: 3, title: "Promo Ramadhan", target: "FREE", status: "EXPIRED", date: "2026-04-01" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">Announcements</h1>
          <p className="text-muted-foreground font-bold mt-2">Manage global banners and notifications for users.</p>
        </div>
        <button className="neo-btn bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2">
          <Send className="w-5 h-5" />
          Create New
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 neo-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-secondary border-b-2 border-border text-secondary-foreground text-sm uppercase font-black">
              <tr>
                <th className="px-6 py-4 font-black border-r-2 border-border">Announcement</th>
                <th className="px-6 py-4 font-black border-r-2 border-border">Target</th>
                <th className="px-6 py-4 font-black">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border">
              {announcements.map((ann) => (
                <tr key={ann.id} className="hover:bg-muted/50 transition-colors bg-background">
                  <td className="px-6 py-4 border-r-2 border-border">
                    <div className="font-bold text-foreground">{ann.title}</div>
                    <div className="text-sm text-muted-foreground font-bold flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" /> {ann.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r-2 border-border">
                    <span className="flex items-center gap-2 text-sm text-foreground font-bold">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      {ann.target}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                      ann.status === "ACTIVE" ? "text-primary-foreground bg-primary" : 
                      ann.status === "SCHEDULED" ? "text-accent-foreground bg-accent" : 
                      "text-foreground bg-card"
                    }`}>
                      {ann.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="neo-card p-6 h-fit">
          <h3 className="text-xl font-black uppercase text-foreground border-b-2 border-border pb-2 mb-4">Quick Draft</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground font-bold mb-1">Title</label>
              <input type="text" className="w-full bg-card border-2 border-border rounded-none px-3 py-2 text-foreground font-bold outline-none focus:border-primary neo-shadow-sm" placeholder="E.g. Server Maintenance" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground font-bold mb-1">Target Audience</label>
              <select className="w-full bg-card border-2 border-border rounded-none px-3 py-2 text-foreground font-bold outline-none focus:border-primary neo-shadow-sm">
                <option>ALL USERS</option>
                <option>FREE ONLY</option>
                <option>PREMIUM ONLY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground font-bold mb-1">Message Body</label>
              <textarea className="w-full bg-card border-2 border-border rounded-none px-3 py-2 text-foreground font-bold outline-none focus:border-primary neo-shadow-sm h-24 resize-none" placeholder="Write your message here..."></textarea>
            </div>
            <button className="neo-btn w-full py-2 bg-primary text-primary-foreground text-sm uppercase tracking-wider">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
