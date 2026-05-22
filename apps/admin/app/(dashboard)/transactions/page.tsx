import { Download, CreditCard } from "lucide-react";

export default function TransactionsPage() {
  const transactions = [
    { id: "TX1001", user: "Radit", plan: "PREMIUM_YEARLY", amount: "Rp 599.000", status: "SUCCESS", method: "BCA VA", date: "2026-05-20" },
    { id: "TX1002", user: "Anon123", plan: "PREMIUM", amount: "Rp 79.000", status: "PENDING", method: "QRIS", date: "2026-05-21" },
    { id: "TX1003", user: "Siti Aminah", plan: "PREMIUM", amount: "Rp 79.000", status: "FAILED", method: "OVO", date: "2026-05-22" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">Transaction Monitor</h1>
          <p className="text-muted-foreground font-bold mt-2">Track payments, subscriptions, and revenue history.</p>
        </div>
        <button className="neo-btn bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      <div className="neo-card overflow-hidden">
        <table className="w-full text-left border-collapse">
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
                  <div className="text-foreground font-bold">{tx.amount}</div>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
