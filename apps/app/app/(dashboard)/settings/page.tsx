"use client";
import { User, Mail, Bell, Shield, CreditCard, ChevronRight } from "lucide-react";

export default function SettingsPage() {
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
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-core-blue/10 text-core-blue dark:bg-core-blue/20 dark:text-sky font-semibold text-sm whitespace-nowrap text-left transition-colors">
            <User className="h-4 w-4" /> Profil
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated hover:text-ink dark:hover:text-white font-medium text-sm whitespace-nowrap text-left transition-colors">
            <Shield className="h-4 w-4" /> Keamanan
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated hover:text-ink dark:hover:text-white font-medium text-sm whitespace-nowrap text-left transition-colors">
            <Bell className="h-4 w-4" /> Notifikasi
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated hover:text-ink dark:hover:text-white font-medium text-sm whitespace-nowrap text-left transition-colors">
            <CreditCard className="h-4 w-4" /> Langganan
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-6">
          {/* Profile Section */}
          <div className="rounded-2xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 md:p-8">
            <h2 className="text-lg font-bold font-heading text-ink dark:text-white mb-6">
              Informasi Pribadi
            </h2>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <div className="h-20 w-20 rounded-full bg-core-blue text-white flex items-center justify-center text-3xl font-black font-heading shrink-0 shadow-sm">
                R
              </div>
              <div>
                <div className="flex gap-3 mb-2">
                  <button className="px-4 py-2 rounded-lg bg-surface-soft dark:bg-white/10 text-ink dark:text-white text-sm font-semibold hover:bg-surface-strong transition-colors border border-hairline dark:border-white/10">
                    Ubah Foto
                  </button>
                  <button className="px-4 py-2 rounded-lg text-error hover:bg-error/10 text-sm font-semibold transition-colors">
                    Hapus
                  </button>
                </div>
                <p className="text-xs text-muted-soft dark:text-white/50">
                  Format yang didukung: JPG, PNG. Maksimal 2MB.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-ink dark:text-white/90">Nama Depan</label>
                  <input 
                    type="text" 
                    defaultValue="Radit"
                    className="w-full h-11 rounded-xl border border-hairline bg-canvas dark:bg-void dark:border-white/10 px-4 text-sm text-ink dark:text-white focus:border-core-blue focus:ring-1 focus:ring-core-blue outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-ink dark:text-white/90">Nama Belakang</label>
                  <input 
                    type="text" 
                    defaultValue="Yaa"
                    className="w-full h-11 rounded-xl border border-hairline bg-canvas dark:bg-void dark:border-white/10 px-4 text-sm text-ink dark:text-white focus:border-core-blue focus:ring-1 focus:ring-core-blue outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink dark:text-white/90">Alamat Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-muted-soft" />
                  </div>
                  <input 
                    type="email" 
                    defaultValue="radit@example.com"
                    className="w-full h-11 rounded-xl border border-hairline bg-surface-soft dark:bg-white/5 dark:border-white/10 pl-10 pr-4 text-sm text-muted cursor-not-allowed outline-none"
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-soft dark:text-white/50 mt-1">Email tidak dapat diubah karena terhubung dengan akun utama.</p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="btn-outline-capsule">
                Simpan Perubahan
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="rounded-2xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 md:p-8">
            <h2 className="text-lg font-bold font-heading text-ink dark:text-white mb-6">
              Preferensi Akun
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-hairline dark:border-white/10 bg-surface-soft/50 dark:bg-void">
                <div>
                  <h3 className="text-sm font-bold text-ink dark:text-white">Email Promosi</h3>
                  <p className="text-xs text-muted dark:text-white/70 mt-0.5">Terima info kursus terbaru dan penawaran spesial.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-hairline peer-focus:outline-none rounded-full peer dark:bg-white/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-core-blue"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-hairline dark:border-white/10 bg-surface-soft/50 dark:bg-void">
                <div>
                  <h3 className="text-sm font-bold text-ink dark:text-white">Pengingat Belajar</h3>
                  <p className="text-xs text-muted dark:text-white/70 mt-0.5">Notifikasi email untuk menjaga streak harianmu.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-hairline peer-focus:outline-none rounded-full peer dark:bg-white/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-core-blue"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="rounded-2xl border border-error/20 bg-error/5 p-6 md:p-8">
            <h2 className="text-lg font-bold font-heading text-error mb-2">
              Hapus Akun
            </h2>
            <p className="text-sm text-error/80 mb-6">
              Menghapus akun akan menghilangkan semua data progres, badge, dan kursus yang telah kamu ikuti secara permanen. Tindakan ini tidak dapat dibatalkan.
            </p>
            <button className="px-5 py-2.5 rounded-lg bg-error text-white font-semibold text-sm hover:bg-error/90 transition-colors">
              Hapus Akun Permanen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
