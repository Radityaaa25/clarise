import { prisma } from "@/lib/prisma";
import { UsersClient } from "./client";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      subscription: {
        select: {
          plan: true,
          status: true,
        },
      },
    },
  });

  const formattedUsers = users.map((user: (typeof users)[number]) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.subscription?.status === "ACTIVE" ? (user.subscription.plan || "FREE") : "FREE",
    status: "ACTIVE", // Karena model User tidak punya kolom banned, default ke ACTIVE
    joined: user.createdAt.toISOString().slice(0, 10),
  }));

  return <UsersClient initialUsers={formattedUsers} />;
}
