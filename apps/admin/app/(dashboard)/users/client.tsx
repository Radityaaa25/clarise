"use client";
import { useState } from "react";
import { MoreHorizontal, ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";
import { deleteUser, updateUserTier } from "@/app/actions/user";
import { useRouter } from "next/navigation";

interface UserItem {
  id: string;
  name: string | null;
  email: string;
  plan: string;
  status: string;
  joined: string;
}

export function UsersClient({ initialUsers }: { initialUsers: UserItem[] }) {
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: () => void;
  }>({ isOpen: false, title: "", message: "", action: () => {} });

  const [toastMessage, setToastMessage] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToastMessage({ show: true, type, message });
    setTimeout(() => {
      setToastMessage({ show: false, type: "success", message: "" });
    }, 3000);
  };

  const handleDelete = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Hapus Pengguna",
      message: `Apakah Anda yakin ingin menghapus pengguna ${name || "ini"} secara permanen dari database dan Clerk?`,
      action: async () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        setLoadingId(id);
        const res = await deleteUser(id);
        setLoadingId(null);
        if (!res.success) {
          showToast(res.error || "Gagal menghapus", "error");
        } else {
          showToast("Pengguna berhasil dihapus");
          router.refresh();
        }
      },
    });
  };

  const handleUpdateTier = (id: string, name: string, targetPlan: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Ubah Tier Pengguna",
      message: `Apakah Anda yakin ingin mengubah tier pengguna ${name || "ini"} menjadi ${targetPlan.replace("_", " ")}?`,
      action: async () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        setLoadingId(id + "-tier");
        const res = await updateUserTier(id, targetPlan as "FREE" | "PREMIUM" | "PREMIUM_TRIAL");
        setLoadingId(null);
        if (!res.success) {
          showToast(res.error || "Gagal mengubah tier", "error");
        } else {
          showToast("Tier berhasil diubah");
          router.refresh();
        }
      },
    });
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
            <option>Premium Trial</option>
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
                  <td className="px-6 py-4 text-right flex justify-end gap-2 items-center">
                    {loadingId === user.id + "-tier" ? (
                      <MoreHorizontal className="w-5 h-5 animate-pulse text-muted-foreground mr-2" />
                    ) : (
                      <select
                        value={user.plan}
                        onChange={(e) => handleUpdateTier(user.id, user.name || "User", e.target.value)}
                        disabled={loadingId === user.id + "-tier"}
                        className="neo-btn bg-background text-foreground px-2 py-1 outline-none text-sm cursor-pointer"
                      >
                        <option value="FREE">Free</option>
                        <option value="PREMIUM">Premium</option>
                        <option value="PREMIUM_TRIAL">Premium Trial</option>
                      </select>
                    )}
                    <button
                      onClick={() => handleDelete(user.id, user.name || "User")}
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

      {/* Custom Confirm Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background border-2 border-border shadow-neo p-6 max-w-md w-full rounded-none">
            <h3 className="text-xl font-black mb-2">{confirmDialog.title}</h3>
            <p className="text-muted-foreground mb-6">{confirmDialog.message}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="neo-btn bg-secondary text-secondary-foreground px-4 py-2"
              >
                Batal
              </button>
              <button
                onClick={confirmDialog.action}
                className="neo-btn bg-primary text-primary-foreground px-4 py-2"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Toast */}
      {toastMessage.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center justify-between gap-4 bg-background border-2 border-border shadow-neo p-4 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3">
            {toastMessage.type === "success" ? (
              <ShieldCheck className="w-5 h-5 text-success" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-error" />
            )}
            <p className="font-bold text-sm">{toastMessage.message}</p>
          </div>
          <button
            onClick={() => setToastMessage((prev) => ({ ...prev, show: false }))}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
