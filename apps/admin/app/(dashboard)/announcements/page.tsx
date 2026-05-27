import { prisma } from "@/lib/prisma";
import { AnnouncementsClient } from "./client";

export const dynamic = "force-dynamic";

export default async function AnnouncementsPage() {
  const announcementsData = await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const formattedAnnouncements = announcementsData.map(ann => {
    let status = "ACTIVE";
    if (!ann.isActive) status = "INACTIVE";
    else if (ann.endAt && ann.endAt < new Date()) status = "EXPIRED";
    else if (ann.startAt > new Date()) status = "SCHEDULED";

    return {
      id: ann.id,
      title: ann.title,
      target: ann.target,
      status: status,
      date: ann.createdAt.toISOString().split('T')[0]
    };
  });

  return <AnnouncementsClient initialAnnouncements={formattedAnnouncements} />;
}
