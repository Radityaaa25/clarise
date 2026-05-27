import { prisma } from "@/lib/prisma";
import { ReportsClient } from "./client";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const reportsData = await prisma.report.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      course: { select: { title: true } },
      user: { select: { name: true, email: true } },
    }
  });

  const formattedReports = reportsData.map(report => ({
    id: report.id,
    course: report.course?.title || "Unknown Course",
    reporter: report.user?.name || report.user?.email || "Unknown User",
    reason: report.reason,
    status: report.status,
    date: report.createdAt.toISOString().split('T')[0]
  }));

  return <ReportsClient initialReports={formattedReports} />;
}
