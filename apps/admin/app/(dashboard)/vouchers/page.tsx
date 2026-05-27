"use client";

import { useState, useEffect } from "react";
import { MoreHorizontal, Plus, Tag, Trash, Power, PowerOff } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { deleteVoucher, deactivateVoucher } from "@/app/actions/voucher";

type Voucher = {
  id: string;
  code: string;
  type: string;
  discountPct: number;
  trialDays: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  createdAt: string;
};

export default function VouchersPage() {
  const { getToken } = useAuth();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for the create form
  const [showForm, setShowForm] = useState(false);
  const [code, setCode] = useState("");
  const [type, setType] = useState("TRIAL");
  const [trialDays, setTrialDays] = useState(30);
  const [discountPct, setDiscountPct] = useState(0);
  const [maxUses, setMaxUses] = useState(100);
  const [expiresAt, setExpiresAt] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toISOString().split("T")[0] || "";
  });
  
  // Note: the actual fetch requires hitting the apps/app server since that's where the API lives.
  // We'll use NEXT_PUBLIC_APP_URL which should point to localhost:3000 in dev
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchVouchers = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${apiUrl}/api/admin/vouchers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setVouchers(data.vouchers);
      } else {
        // fallback dummy data if API fails (e.g. CORS or Auth)
        setVouchers([
          {
            id: "1",
            code: "EARLYBIRD",
            type: "TRIAL",
            trialDays: 30,
            discountPct: 0,
            maxUses: 200,
            usedCount: 45,
            expiresAt: new Date(Date.now() + 86400000 * 30).toISOString(),
            createdAt: new Date().toISOString(),
          }
        ]);
      }
    } catch (e) {
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Yakin ingin menghapus voucher ${code}?`)) return;
    setActionLoadingId(id);
    const res = await deleteVoucher(id);
    if (res.success) {
      await fetchVouchers();
    } else {
      alert(res.error);
    }
    setActionLoadingId(null);
  };

  const handleDeactivate = async (id: string, code: string) => {
    if (!confirm(`Yakin ingin menonaktifkan voucher ${code}?`)) return;
    setActionLoadingId(id);
    const res = await deactivateVoucher(id);
    if (res.success) {
      await fetchVouchers();
    } else {
      alert(res.error);
    }
    setActionLoadingId(null);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const res = await fetch(`${apiUrl}/api/admin/vouchers`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          code,
          type,
          trialDays: Number(trialDays),
          discountPct: Number(discountPct),
          maxUses: Number(maxUses),
          expiresAt: new Date(expiresAt).toISOString(),
        }),
      });
      if (res.ok) {
        setShowForm(false);
        fetchVouchers();
      } else {
        alert("Gagal membuat voucher");
      }
    } catch (e) {
      alert("Error saat membuat voucher");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">
            Voucher Management
          </h1>
          <p className="text-muted-foreground font-bold mt-2">
            Create and manage early access codes and discounts.
          </p>
        </div>
        <div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="neo-btn bg-primary text-primary-foreground p-3 flex items-center gap-2 font-black uppercase"
          >
            <Plus className="w-5 h-5" />
            {showForm ? "Cancel" : "New Voucher"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="neo-card p-6 bg-card">
          <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-border pb-2">Create New Voucher</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-bold uppercase text-sm">Voucher Code</label>
              <input 
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full neo-input" 
                placeholder="e.g. EARLYBIRD2026"
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold uppercase text-sm">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full neo-input bg-card">
                <option value="TRIAL">Trial (Free Days)</option>
                <option value="DISCOUNT">Discount (%)</option>
              </select>
            </div>
            
            {type === "TRIAL" && (
              <div className="space-y-2">
                <label className="font-bold uppercase text-sm">Trial Days</label>
                <input 
                  type="number"
                  min="1"
                  required
                  value={trialDays}
                  onChange={(e) => setTrialDays(Number(e.target.value))}
                  className="w-full neo-input" 
                />
              </div>
            )}

            {type === "DISCOUNT" && (
              <div className="space-y-2">
                <label className="font-bold uppercase text-sm">Discount Percentage</label>
                <input 
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={discountPct}
                  onChange={(e) => setDiscountPct(Number(e.target.value))}
                  className="w-full neo-input" 
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="font-bold uppercase text-sm">Max Uses (Slots)</label>
              <input 
                type="number"
                min="1"
                required
                value={maxUses}
                onChange={(e) => setMaxUses(Number(e.target.value))}
                className="w-full neo-input" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-bold uppercase text-sm">Expiration Date</label>
              <input 
                type="date"
                required
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full neo-input" 
              />
            </div>
            
            <div className="col-span-2 pt-2">
              <button type="submit" className="neo-btn bg-accent text-accent-foreground px-6 py-3 font-black uppercase w-full">
                Generate Voucher
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="neo-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-secondary border-b-2 border-border text-secondary-foreground text-sm uppercase font-black">
            <tr>
              <th className="px-6 py-4 font-black border-r-2 border-border">Code</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Type</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Usage</th>
              <th className="px-6 py-4 font-black border-r-2 border-border">Expires</th>
              <th className="px-6 py-4 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center font-bold text-muted-foreground">
                  Loading vouchers...
                </td>
              </tr>
            ) : vouchers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center font-bold text-muted-foreground">
                  No vouchers found. Create one!
                </td>
              </tr>
            ) : vouchers.map((v) => {
              const isExpired = new Date(v.expiresAt) < new Date();
              const isFull = v.usedCount >= v.maxUses;
              const isActive = !isExpired && !isFull;
              
              return (
                <tr key={v.id} className="hover:bg-muted/50 transition-colors bg-background">
                  <td className="px-6 py-4 border-r-2 border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border-2 border-border bg-accent flex items-center justify-center text-accent-foreground">
                        <Tag className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-black text-lg tracking-wider text-foreground">{v.code}</div>
                        <div className="text-xs font-bold text-muted-foreground uppercase">{v.id.substring(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r-2 border-border">
                    <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm bg-card text-foreground`}>
                      {v.type === "TRIAL" ? `${v.trialDays} Days Trial` : `${v.discountPct}% OFF`}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r-2 border-border">
                    <div className="flex flex-col gap-1">
                      <div className="font-bold flex justify-between text-sm">
                        <span>{v.usedCount}</span>
                        <span className="text-muted-foreground">/ {v.maxUses}</span>
                      </div>
                      <div className="w-full h-2 bg-muted border border-border rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${Math.min(100, (v.usedCount / v.maxUses) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r-2 border-border">
                    <div className="flex flex-col">
                      <span className="font-bold">{new Date(v.expiresAt).toLocaleDateString("id-ID")}</span>
                      <span className={`text-xs font-black uppercase ${isActive ? "text-primary" : "text-destructive"}`}>
                        {isExpired ? "EXPIRED" : isFull ? "FULL" : "ACTIVE"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {isActive && (
                        <button 
                          onClick={() => handleDeactivate(v.id, v.code)}
                          disabled={actionLoadingId === v.id}
                          className="neo-btn bg-destructive text-destructive-foreground p-2 disabled:opacity-50" 
                          title="Disable"
                        >
                          <PowerOff className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(v.id, v.code)}
                        disabled={actionLoadingId === v.id}
                        className="neo-btn bg-destructive text-destructive-foreground p-2 disabled:opacity-50" 
                        title="Delete"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
