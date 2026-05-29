"use client";
import { useState } from "react";
import { MoreHorizontal, ShieldAlert, ShieldCheck, Trash2, ArrowUpCircle } from "lucide-react";
import { deleteUser, updateUserTier } from "@/app/actions/user";
import { useRouter } from "next/navigation";

export function UsersClient({ initialUsers }: { initialUsers: any[] }) {
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Apakah Anda yakin ingin menghapus pengguna ${name || "ini"} secara permanen dari database dan Clerk?`,
      )
    ) {
      return;
    }
    setLoadingId(id);
    const res = await deleteUser(id);
    setLoadingId(null);
    if (!res.success) {
      alert(res.error);
    } else {
      router.refresh(); // Segarkan data server komponen
    }
  };

  const handleUpdateTier = async (id: string, name: string, currentPlan: string) => {
    const targetPlan = currentPlan === "PREMIUM" ? "FREE" : "PREMIUM";
    if (
      !confirm(
        `Apakah Anda yakin ingin mengubah tier pengguna ${name || "ini"} menjadi ${targetPlan}?`
      )
    ) {
      return;
    }
    setLoadingId(id + "-tier");
    const res = await updateUserTier(id, targetPlan as "FREE" | "PREMIUM");
    setLoadingId(null);
    if (!res.success) {
      alert(res.error);
    } else {
      router.refresh();
    }
  };

  const users = initialUsers.filter((user) => {
    const matchPlan =
      planFilter === "All Plans" || user.plan === planFilter.toUpperCase();
    const matchStatus =
      statusFilter === "All Status" ||
      user.status === statusFilter.toUpperCase();
    return matchPlan && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">
            Manajemen Pengguna
          </h1>
          <p className="text-muted-foreground font-bold mt-2">
            Kelola semua pengguna Clarise, langganan, dan statusnya.
          </p>
        </div>
        <div className="flex gap-4">
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="neo-btn bg-card text-foreground rounded-none px-3 py-2 outline-none focus:border-primary"
          >
            <option>All Plans</option>
            <option>Free</option>
            <option>Premium</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="neo-btn bg-card text-foreground rounded-none px-3 py-2 outline-none focus:border-primary"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Banned</option>
          </select>
        </div>
      </div>

      <div className="neo-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-secondary border-b-2 border-border text-secondary-foreground text-sm uppercase font-black">
              <tr>
                <th className="px-6 py-4 font-black border-r-2 border-border">
                  Pengguna
                </th>
                <th className="px-6 py-4 font-black border-r-2 border-border">
                  Paket
                </th>
                <th className="px-6 py-4 font-black border-r-2 border-border">
                  Status
                </th>
                <th className="px-6 py-4 font-black border-r-2 border-border">
                  Bergabung
                </th>
                <th className="px-6 py-4 font-black text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-muted/50 transition-colors bg-background"
                >
                  <td className="px-6 py-4 border-r-2 border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border-2 border-border bg-primary flex items-center justify-center font-black text-primary-foreground">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="font-bold text-foreground">
                          {user.name || "Anonymous User"}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r-2 border-border">
                    <span
                      className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                        user.plan === "PREMIUM"
                          ? "bg-accent text-accent-foreground"
                          : "bg-card text-foreground"
                      }`}
                    >
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r-2 border-border">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                        user.status === "ACTIVE"
                          ? "text-primary-foreground bg-primary"
                          : "text-destructive-foreground bg-destructive"
                      }`}
                    >
                      {user.status === "ACTIVE" ? (
                        <ShieldCheck className="w-4 h-4" />
                      ) : (
                        <ShieldAlert className="w-4 h-4" />
                      )}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-bold border-r-2 border-border">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleUpdateTier(user.id, user.name, user.plan)}
                      disabled={loadingId === user.id + "-tier"}
                      className="neo-btn bg-accent text-accent-foreground p-2 disabled:opacity-50"
                      title={user.plan === "PREMIUM" ? "Ubah ke Free" : "Ubah ke Premium"}
                    >
                      {loadingId === user.id + "-tier" ? (
                        <MoreHorizontal className="w-5 h-5 animate-pulse" />
                      ) : (
                        <ArrowUpCircle className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      disabled={loadingId === user.id}
                      className="neo-btn bg-destructive text-destructive-foreground p-2 disabled:opacity-50"
                      title="Hapus Pengguna"
                    >
                      {loadingId === user.id ? (
                        <MoreHorizontal className="w-5 h-5 animate-pulse" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr className="bg-background">
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-muted-foreground font-bold"
                  >
                    Tidak ada pengguna yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
