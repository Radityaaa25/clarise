"use client";

import { Download, CreditCard } from "lucide-react";

type Transaction = {
  id: string;
  user: string;
  plan: string;
  amount: number;
  status: string;
  method: string;
  date: string;
};

export function TransactionsClient({ 
  transactions, 
  monthlyTotal 
}: { 
  transactions: Transaction[],
  monthlyTotal: number
}) {

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  const handleExportCSV = () => {
    const headers = ["Tx ID", "User", "Plan", "Amount", "Method", "Status", "Date"];
    const rows = transactions.map(tx => [
      tx.id,
      tx.user,
      tx.plan,
      tx.amount.toString(),
      tx.method,
      tx.status,
      tx.date
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">Transaction Monitor</h1>
          <p className="text-muted-foreground font-bold mt-2">Track payments, subscriptions, and revenue history.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="neo-btn bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="neo-card bg-card p-6">
          <h3 className="text-muted-foreground font-bold uppercase text-sm mb-2">Total Pendapatan (Bulan Ini)</h3>
          <p className="text-3xl font-black text-foreground">{formatCurrency(monthlyTotal)}</p>
        </div>
        <div className="neo-card bg-card p-6">
          <h3 className="text-muted-foreground font-bold uppercase text-sm mb-2">Total Transaksi</h3>
          <p className="text-3xl font-black text-foreground">{transactions.length}</p>
        </div>
        <div className="neo-card bg-card p-6">
          <h3 className="text-muted-foreground font-bold uppercase text-sm mb-2">Transaksi Berhasil</h3>
          <p className="text-3xl font-black text-foreground">{transactions.filter(t => t.status === "SUCCESS").length}</p>
        </div>
      </div>

      <div className="neo-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-secondary border-b-2 border-border text-secondary-foreground text-sm uppercase font-black">
              <tr>
                <th className="px-6 py-4 font-black border-r-2 border-border">Tx ID</th>
                <th className="px-6 py-4 font-black border-r-2 border-border">User</th>
                <th className="px-6 py-4 font-black border-r-2 border-border">Plan & Amount</th>
                <th className="px-6 py-4 font-black border-r-2 border-border">Method</th>
                <th className="px-6 py-4 font-black border-r-2 border-border">Status</th>
                <th className="px-6 py-4 font-black text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-muted/50 transition-colors bg-background">
                  <td className="px-6 py-4 font-mono text-sm text-muted-foreground font-bold border-r-2 border-border">{tx.id}</td>
                  <td className="px-6 py-4 font-bold text-foreground border-r-2 border-border">{tx.user}</td>
                  <td className="px-6 py-4 border-r-2 border-border">
                    <div className="text-foreground font-bold">{formatCurrency(tx.amount)}</div>
                    <div className="text-xs text-muted-foreground font-bold">{tx.plan.replace('_', ' ')}</div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-bold border-r-2 border-border">
                    <div className="flex items-center gap-2 mt-2">
                      <CreditCard className="w-5 h-5" /> {tx.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r-2 border-border">
                    <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-border neo-shadow-sm ${
                      tx.status === "SUCCESS" ? "text-primary-foreground bg-primary" : 
                      tx.status === "PENDING" ? "text-accent-foreground bg-accent" : "text-destructive-foreground bg-destructive"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground font-bold text-sm">{tx.date}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr className="bg-background">
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground font-bold">
                    Belum ada transaksi.
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
