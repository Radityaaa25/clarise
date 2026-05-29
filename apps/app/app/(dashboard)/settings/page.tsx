"use client";
import { useState } from "react";
import {
  User,
  Mail,
  Bell,
  Shield,
  CreditCard,
  ChevronRight,
  Tag,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profil");

  const [voucherCode, setVoucherCode] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  // User Profile State
  const { data: user, mutate: mutateUser } = useSWR("/api/user", fetcher);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Init user data
  if (user && !firstName && !lastName) {
    const names = (user.name || "").split(" ");
    setFirstName(names[0] || "");
    setLastName(names.slice(1).join(" ") || "");
  }

  // Reminder Settings State
  const { data: reminderData, mutate: mutateReminder } = useSWR(
    "/api/user/reminder",
    fetcher,
  );
  const isReminderEnabled = reminderData?.data?.enabled || false;
  const isPromoEnabled = true; // Static promo toggle

  const handleUpdateProfile = async () => {
    setIsSavingProfile(true);
    try {
      const name = `${firstName} ${lastName}`.trim();
      await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      mutateUser();
      toast.success("Profil berhasil diperbarui!");
    } catch (err) {
      toast.error("Gagal memperbarui profil");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleToggleReminder = async () => {
    try {
      const newEnabled = !isReminderEnabled;
      await fetch("/api/user/reminder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enabled: newEnabled,
          preferredTime: reminderData?.data?.preferredTime || "08:00",
          channel: "EMAIL",
        }),
      });
      mutateReminder();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRedeemVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;
    setIsRedeeming(true);
    setRedeemMessage(null);
    try {
      const res = await fetch("/api/voucher/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setRedeemMessage({
          type: "success",
          text: `Berhasil! Kamu mendapat ${data.reward.type === "TRIAL" ? data.reward.trialDays + " Hari Akses Premium" : "Diskon " + data.reward.discountPct + "%"}`,
        });
        setVoucherCode("");
      } else {
        setRedeemMessage({
          type: "error",
          text: data.error || "Gagal klaim voucher",
        });
      }
    } catch (err) {
      setRedeemMessage({ type: "error", text: "Terjadi kesalahan koneksi" });
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-black font-heading text-ink dark:text-white mb-2">
          Pengaturan
        </h1>
        <p className="text-body dark:text-frost/80 text-sm md:text-base">
          Kelola preferensi akun dan profilmu di sini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Nav (Mobile scrollable, Desktop list) */}
        <div className="md:col-span-1 flex flex-row md:flex-col gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
          <button
            onClick={() => setActiveTab("profil")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap text-left transition-colors ${activeTab === "profil" ? "bg-core-blue/10 text-core-blue dark:bg-core-blue/20 dark:text-sky" : "text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated hover:text-ink dark:hover:text-white font-medium"}`}
          >
            <User className="h-4 w-4" /> Profil
          </button>
          <button
            onClick={() => setActiveTab("keamanan")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap text-left transition-colors ${activeTab === "keamanan" ? "bg-core-blue/10 text-core-blue dark:bg-core-blue/20 dark:text-sky" : "text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated hover:text-ink dark:hover:text-white font-medium"}`}
          >
            <Shield className="h-4 w-4" /> Keamanan
          </button>
          <button
            onClick={() => setActiveTab("notifikasi")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap text-left transition-colors ${activeTab === "notifikasi" ? "bg-core-blue/10 text-core-blue dark:bg-core-blue/20 dark:text-sky" : "text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated hover:text-ink dark:hover:text-white font-medium"}`}
          >
            <Bell className="h-4 w-4" /> Notifikasi
          </button>
          <button
            onClick={() => setActiveTab("langganan")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap text-left transition-colors ${activeTab === "langganan" ? "bg-core-blue/10 text-core-blue dark:bg-core-blue/20 dark:text-sky" : "text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated hover:text-ink dark:hover:text-white font-medium"}`}
          >
            <CreditCard className="h-4 w-4" /> Langganan
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === "profil" && (
            <>
              {/* Profile Section */}
              <div className="rounded-2xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 md:p-8">
                <h2 className="text-lg font-bold font-heading text-ink dark:text-white mb-6">
                  Informasi Pribadi
                </h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                  <div className="h-20 w-20 rounded-full bg-core-blue text-white flex items-center justify-center text-3xl font-black font-heading shrink-0 shadow-sm overflow-hidden">
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      (firstName?.[0] || "U").toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="flex gap-3 mb-2">
                      <button
                        disabled
                        className="opacity-50 px-4 py-2 rounded-lg bg-surface-soft dark:bg-white/10 text-ink dark:text-white text-sm font-semibold transition-colors border border-hairline dark:border-white/10"
                      >
                        Ubah Foto (Via Clerk)
                      </button>
                    </div>
                    <p className="text-xs text-muted-soft dark:text-white/50">
                      Ubah avatar melalui pop-up profil di header.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-ink dark:text-white/90">
                        Nama Depan
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full h-11 rounded-xl border border-hairline bg-canvas dark:bg-void dark:border-white/10 px-4 text-sm text-ink dark:text-white focus:border-core-blue focus:ring-1 focus:ring-core-blue outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-ink dark:text-white/90">
                        Nama Belakang
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full h-11 rounded-xl border border-hairline bg-canvas dark:bg-void dark:border-white/10 px-4 text-sm text-ink dark:text-white focus:border-core-blue focus:ring-1 focus:ring-core-blue outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-ink dark:text-white/90">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-muted-soft" />
                      </div>
                      <input
                        type="email"
                        value={user?.email || ""}
                        className="w-full h-11 rounded-xl border border-hairline bg-surface-soft dark:bg-white/5 dark:border-white/10 pl-10 pr-4 text-sm text-muted cursor-not-allowed outline-none"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-muted-soft dark:text-white/50 mt-1">
                      Email tidak dapat diubah karena terhubung dengan akun
                      utama.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={isSavingProfile}
                    className="btn-outline-capsule disabled:opacity-50"
                  >
                    {isSavingProfile ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="rounded-2xl border border-error/20 bg-error/5 p-6 md:p-8">
                <h2 className="text-lg font-bold font-heading text-error mb-2">
                  Hapus Akun
                </h2>
                <p className="text-sm text-error/80 mb-6">
                  Menghapus akun akan menghilangkan semua data progres, badge,
                  dan kursus yang telah kamu ikuti secara permanen. Tindakan ini
                  tidak dapat dibatalkan.
                </p>
                <button className="px-5 py-2.5 rounded-lg bg-error text-white font-semibold text-sm hover:bg-error/90 transition-colors">
                  Hapus Akun Permanen
                </button>
              </div>
            </>
          )}

          {activeTab === "keamanan" && (
            <div className="rounded-2xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 md:p-8">
              <h2 className="text-lg font-bold font-heading text-ink dark:text-white mb-6">
                Keamanan Akun
              </h2>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-ink dark:text-white/90">
                    Ubah Password
                  </label>
                  <p className="text-sm text-muted mb-4">
                    Ubah password akunmu melalui penyedia layanan autentikasi
                    (Clerk).
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-surface-soft dark:bg-white/10 text-ink dark:text-white text-sm font-semibold hover:bg-surface-strong transition-colors border border-hairline dark:border-white/10">
                    Buka Keamanan Autentikasi
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifikasi" && (
            <div className="rounded-2xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 md:p-8">
              <h2 className="text-lg font-bold font-heading text-ink dark:text-white mb-6">
                Preferensi Notifikasi
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-hairline dark:border-white/10 bg-surface-soft/50 dark:bg-void">
                  <div>
                    <h3 className="text-sm font-bold text-ink dark:text-white">
                      Email Promosi
                    </h3>
                    <p className="text-xs text-muted dark:text-white/70 mt-0.5">
                      Terima info kursus terbaru dan penawaran spesial.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isPromoEnabled}
                      readOnly
                    />
                    <div className="w-11 h-6 bg-hairline peer-focus:outline-none rounded-full peer dark:bg-white/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-core-blue"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-hairline dark:border-white/10 bg-surface-soft/50 dark:bg-void">
                  <div>
                    <h3 className="text-sm font-bold text-ink dark:text-white">
                      Pengingat Belajar
                    </h3>
                    <p className="text-xs text-muted dark:text-white/70 mt-0.5">
                      Notifikasi email untuk menjaga streak harianmu.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isReminderEnabled}
                      onChange={handleToggleReminder}
                    />
                    <div className="w-11 h-6 bg-hairline peer-focus:outline-none rounded-full peer dark:bg-white/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-core-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "langganan" && (
            <div className="rounded-2xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 md:p-8">
              <h2 className="text-lg font-bold font-heading text-ink dark:text-white mb-6">
                Status Langganan
              </h2>
              <div className="p-6 rounded-xl border border-core-blue/20 bg-core-blue/5 flex flex-col items-center text-center">
                <Shield className="h-12 w-12 text-core-blue mb-4" />
                <h3 className="text-xl font-bold text-ink dark:text-white mb-2">
                  Paket Dasar (Free)
                </h3>
                <p className="text-sm text-muted mb-6">
                  Kamu saat ini menggunakan paket gratis. Upgrade untuk
                  menikmati akses tanpa batas.
                </p>
                <button className="px-6 py-3 rounded-xl bg-core-blue text-white font-bold text-sm hover:bg-core-blue/90 transition-colors shadow-sm shadow-core-blue/20">
                  Upgrade ke Premium
                </button>
              </div>

              <div className="mt-8 p-6 rounded-xl border border-hairline bg-surface-soft/30 dark:bg-void">
                <h3 className="text-lg font-bold text-ink dark:text-white flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-core-blue" />
                  Klaim Voucher
                </h3>
                <p className="text-sm text-muted mb-4">
                  Punya kode promo atau akses trial? Masukkan kodenya di bawah
                  ini.
                </p>
                <form onSubmit={handleRedeemVoucher} className="flex gap-3">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) =>
                      setVoucherCode(e.target.value.toUpperCase())
                    }
                    placeholder="Contoh: PROMOAI"
                    className="flex-1 h-11 rounded-xl border border-hairline bg-canvas dark:bg-void-elevated dark:border-white/10 px-4 text-sm font-bold text-ink dark:text-white focus:border-core-blue focus:ring-1 focus:ring-core-blue outline-none transition-all uppercase"
                    disabled={isRedeeming}
                  />
                  <button
                    type="submit"
                    disabled={isRedeeming || !voucherCode.trim()}
                    className="h-11 px-6 rounded-xl bg-ink dark:bg-white text-white dark:text-ink font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {isRedeeming && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    Klaim
                  </button>
                </form>
                {redeemMessage && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-sm font-bold border ${
                      redeemMessage.type === "success"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-error/10 text-error border-error/20"
                    }`}
                  >
                    {redeemMessage.text}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
