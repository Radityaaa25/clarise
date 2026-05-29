import { prisma } from "@/lib/prisma";
import { TransactionsClient } from "./client";

export const dynamic = "force-dynamic";

export default async function TransactionsPage() {
  const transactionsData = await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  const formattedTransactions = transactionsData.map((tx) => ({
    id: tx.id.substring(0, 8).toUpperCase(),
    user: tx.user?.name || tx.user?.email || "Unknown User",
    plan: tx.plan,
    amount: tx.amount,
    status: tx.status,
    method: tx.method,
    date: tx.createdAt.toISOString().slice(0, 10),
  }));

  // Calculate monthly total for the current month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTotal = transactionsData
    .filter(
      (tx) =>
        tx.status === "SUCCESS" &&
        tx.createdAt.getMonth() === currentMonth &&
        tx.createdAt.getFullYear() === currentYear,
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <TransactionsClient
      transactions={formattedTransactions}
      monthlyTotal={monthlyTotal}
    />
  );
}
