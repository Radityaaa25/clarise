import {
  Bot,
  ShieldAlert,
  CheckCircle2,
  Search,
  Zap,
  Code,
  MessageSquare,
  Wrench,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

export const dynamic = "force-dynamic";

export default async function AIMonitorPage() {
  const chatHistory = await prisma.aiChatHistory.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
    take: 50, // Limit to recent 50 for performance
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let tokensUsedToday = 0;
  let totalRequests = chatHistory.length;
  let flaggedCount = 0;

  const flags: any[] = [];

  chatHistory.forEach((chat) => {
    // Estimasi token kasar: 1 token = 4 karakter json
    const messagesStr = JSON.stringify(chat.messages || []);

    if (chat.updatedAt >= today) {
      tokensUsedToday += Math.floor(messagesStr.length / 4);
    }

    // Cek flag sederhana (misal kata kasar/bypass)
    const isFlagged =
      messagesStr.toLowerCase().includes("bypass") ||
      messagesStr.toLowerCase().includes("ignore all previous");

    if (isFlagged) {
      flaggedCount++;
      flags.push({
        id: chat.id,
        user: chat.user?.name || chat.user?.email || "Anon",
        context: chat.courseId ? "Course Chat" : "General Chat",
        snippet: "...flagged content detected...",
        status: "FLAGGED",
        date: chat.updatedAt.toISOString().slice(0, 10),
      });
    }
  });

  // Read token usage from Redis
  const [adminTokens, chatTokens, courseTokens, quizTokens] = await redis.mget<
    number[]
  >(
    "clarise:token:admin",
    "clarise:token:chat",
    "clarise:token:course",
    "clarise:token:quiz_challenge",
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">AI Monitor</h1>
          <p className="text-zinc-400">
            Track API Token usage across all features and review flagged AI
            interactions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-purple-500/10">
            <Wrench className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h3 className="text-zinc-400 font-medium text-sm">Admin Copilot</h3>
            <p className="text-2xl font-bold text-white">
              {(adminTokens || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-blue-500/10">
            <MessageSquare className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h3 className="text-zinc-400 font-medium text-sm">
              Chat AI (User)
            </h3>
            <p className="text-2xl font-bold text-white">
              {(chatTokens || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/10">
            <Code className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-zinc-400 font-medium text-sm">
              Generate Course
            </h3>
            <p className="text-2xl font-bold text-white">
              {(courseTokens || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-spark/10">
            <Zap className="w-8 h-8 text-spark" />
          </div>
          <div>
            <h3 className="text-zinc-400 font-medium text-sm">
              Quiz & Challenge
            </h3>
            <p className="text-2xl font-bold text-white">
              {(quizTokens || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mt-8 mb-4">
        Flagged Interactions
      </h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-400 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Context</th>
              <th className="px-6 py-4 font-medium">Flagged Snippet</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {flags.length > 0 ? (
              flags.map((flag) => (
                <tr
                  key={flag.id}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {flag.user}
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{flag.context}</td>
                  <td className="px-6 py-4">
                    <div className="bg-zinc-950 px-3 py-2 rounded text-red-400 font-mono text-sm border border-red-500/20">
                      {flag.snippet}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        flag.status === "FLAGGED"
                          ? "text-red-400 bg-red-400/10 border border-red-500/20"
                          : "text-zinc-400 bg-zinc-800"
                      }`}
                    >
                      {flag.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {flag.status === "FLAGGED" && (
                      <button
                        className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                        title="Resolve"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-zinc-400 font-medium"
                >
                  Tidak ada chat yang diflag.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
