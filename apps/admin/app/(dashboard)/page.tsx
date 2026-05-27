import { Users, TrendingUp, CreditCard, AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  // Fetch real stats
  const totalUsers = await prisma.user.count({
    where: { role: 'USER' }
  });
  
  const premiumUsers = await prisma.subscription.count({
    where: { plan: { in: ['PREMIUM', 'PREMIUM_YEARLY'] }, status: 'ACTIVE' }
  });

  const flaggedCourses = await prisma.course.count({
    where: { isPublished: false, visibility: 'PUBLIC' } // Example condition for flagged/pending
  });

  const recentUsers = await prisma.user.findMany({
    where: { role: 'USER' },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      subscription: { select: { plan: true } }
    }
  });

  const premiumConversion = totalUsers > 0 
    ? ((premiumUsers / totalUsers) * 100).toFixed(1) 
    : "0.0";

  const stats = [
    { label: "Total Users", value: totalUsers.toString(), change: "+0% (Minggu ini)", icon: Users, color: "text-foreground", bg: "bg-primary" },
    { label: "Monthly Revenue", value: "Rp 0", change: "Menunggu Gateway", icon: CreditCard, color: "text-foreground", bg: "bg-secondary" },
    { label: "Premium Conversion", value: `${premiumConversion}%`, change: "Target: 5%", icon: TrendingUp, color: "text-foreground", bg: "bg-accent" },
    { label: "Pending Courses", value: flaggedCourses.toString(), change: "Review Needed", icon: AlertTriangle, color: "text-foreground", bg: "bg-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-foreground mb-1 tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground font-bold">Welcome back, Admin. Here is what&apos;s happening today.</p>
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
              <span className={`text-sm font-bold mb-1 ${stat.change.includes('+') ? 'text-primary' : stat.change.includes('Needed') ? 'text-destructive' : 'text-muted-foreground'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 neo-card min-h-[400px] flex flex-col items-center justify-center p-6">
          <p className="text-muted-foreground font-bold border-2 border-dashed border-border p-8 text-center w-full h-full flex items-center justify-center">
            {premiumUsers > 0 ? "Revenue Chart akan aktif saat Duitku terhubung" : "Belum ada transaksi premium bulan ini."}
          </p>
        </div>
        <div className="neo-card p-6 min-h-[400px] flex flex-col">
          <h3 className="text-xl font-black text-foreground mb-6 uppercase border-b-2 border-border pb-2">Recent Users</h3>
          <div className="space-y-4 flex-1">
            {recentUsers.length > 0 ? recentUsers.map((user, i) => (
              <div key={user.id} className="flex items-center gap-3 bg-background border-2 border-border p-3 neo-shadow-sm">
                <div className="w-10 h-10 border-2 border-border bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-foreground truncate">{user.name || 'Anonymous User'}</p>
                  <p className="text-xs text-muted-foreground font-medium truncate">{user.email}</p>
                </div>
                <div className="ml-auto text-xs px-2 py-1 bg-accent text-accent-foreground border-2 border-border font-bold neo-shadow-sm shrink-0">
                  {user.subscription?.plan || 'Free'}
                </div>
              </div>
            )) : (
              <p className="text-muted-foreground text-sm italic text-center pt-8">Belum ada user terdaftar</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
