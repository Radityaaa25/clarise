import { MoreHorizontal, ShieldAlert, ShieldCheck } from "lucide-react";

export default function UsersPage() {
  const users = [
    { id: 1, name: "Radit", email: "radit@example.com", plan: "PREMIUM", status: "ACTIVE", joined: "2026-05-20" },
    { id: 2, name: "Budi Santoso", email: "budi@example.com", plan: "FREE", status: "ACTIVE", joined: "2026-05-21" },
    { id: 3, name: "Siti Aminah", email: "siti@example.com", plan: "FREE", status: "BANNED", joined: "2026-05-18" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">User Management</h1>
          <p className="text-muted-foreground font-bold mt-2">Manage all Clarise users, subscriptions, and statuses.</p>
        </div>
        <div className="flex gap-4">
          <select className="neo-btn bg-card text-foreground rounded-none px-3 py-2 outline-none focus:border-primary">
            <option>All Plans</option>
            <option>Free</option>
            <option>Premium</option>
          </select>
          <select className="neo-btn bg-card text-foreground rounded-none px-3 py-2 outline-none focus:border-primary">
            <option>All Status</option>
            <option>Active</option>
            <option>Banned</option>
          </select>
        </div>
      </div>

      <div className="neo-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-secondary border-b-2 border-border text-secondary-foreground text-sm uppercase font-black">
            <tr>
              <th className="px-6 py-4 font-black border-r-2 border-border">User</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Plan</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Status</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Joined Date</th>
              <th className="px-6 py-4 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50 transition-colors bg-background">
                <td className="px-6 py-4 border-r-2 border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border-2 border-border bg-primary flex items-center justify-center font-black text-primary-foreground">
                      U
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground font-medium">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 border-r-2 border-border">
                  <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                    user.plan === "PREMIUM" ? "bg-accent text-accent-foreground" : "bg-card text-foreground"
                  }`}>
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4 border-r-2 border-border">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                    user.status === "ACTIVE" ? "text-primary-foreground bg-primary" : "text-destructive-foreground bg-destructive"
                  }`}>
                    {user.status === "ACTIVE" ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground font-bold border-r-2 border-border">
                  {user.joined}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="neo-btn bg-card text-foreground p-2">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
