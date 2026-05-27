import { Prisma } from "@prisma/client";

export type CourseWithCategory = Prisma.CourseGetPayload<{
  include: { category: true };
}>;

export type CourseWithModules = Prisma.CourseGetPayload<{
  include: { modules: true; category: true };
}>;

export type ModuleWithProgress = Prisma.ModuleGetPayload<{
  include: { progress: true };
}>;

export type UserBadgeWithBadge = Prisma.UserBadgeGetPayload<{
  include: { badge: true };
}>;

export type AiChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};
