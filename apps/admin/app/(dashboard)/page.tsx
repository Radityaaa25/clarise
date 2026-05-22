import { Users, TrendingUp, CreditCard, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,248", change: "+12%", icon: Users, color: "text-foreground", bg: "bg-primary" },
    { label: "Monthly Revenue", value: "Rp 12.4M", change: "+8%", icon: CreditCard, color: "text-foreground", bg: "bg-secondary" },
    { label: "Premium Conversion", value: "4.2%", change: "+1.1%", icon: TrendingUp, color: "text-foreground", bg: "bg-accent" },
    { label: "Flagged Courses", value: "3", change: "Action Needed", icon: AlertTriangle, color: "text-foreground", bg: "bg-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-foreground mb-1 tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground font-bold">Welcome back, Admin. Here is what's happening today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="neo-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 border-2 border-border neo-shadow-sm ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-foreground text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-black text-foreground">{stat.value}</span>
              <span className={`text-sm font-bold mb-1 ${stat.change.includes('+') ? 'text-primary' : 'text-destructive'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 neo-card min-h-[400px] flex flex-col items-center justify-center p-6">
          <p className="text-muted-foreground font-bold border-2 border-dashed border-border p-8 text-center w-full h-full flex items-center justify-center">Revenue Chart Placeholder (Recharts)</p>
        </div>
        <div className="neo-card p-6 min-h-[400px] flex flex-col">
          <h3 className="text-xl font-black text-foreground mb-6 uppercase border-b-2 border-border pb-2">Recent Users</h3>
          <div className="space-y-4 flex-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 bg-background border-2 border-border p-3 neo-shadow-sm">
                <div className="w-10 h-10 border-2 border-border bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                  U
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">User {i}</p>
                  <p className="text-xs text-muted-foreground font-medium">user{i}@example.com</p>
                </div>
                <div className="ml-auto text-xs px-2 py-1 bg-accent text-accent-foreground border-2 border-border font-bold neo-shadow-sm">
                  Free
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
