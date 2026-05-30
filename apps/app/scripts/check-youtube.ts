/* eslint-disable */
// Cek availability semua YouTube source di DB pakai oEmbed.
// Run: node --env-file=.env.local --import tsx scripts/check-youtube.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkVideo(
  videoId: string,
): Promise<{ ok: boolean; reason?: string }> {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  try {
    const res = await fetch(url, { method: "GET" });
    if (res.status === 200) return { ok: true };
    if (res.status === 401) return { ok: false, reason: "embed disabled" };
    if (res.status === 404) return { ok: false, reason: "not found / removed" };
    return { ok: false, reason: `HTTP ${res.status}` };
  } catch (e: any) {
    return { ok: false, reason: e?.message || "network error" };
  }
}

async function main() {
  const ytSources = await prisma.source.findMany({
    where: { type: "YOUTUBE" },
    select: {
      url: true,
      title: true,
      slide: {
        select: {
          module: {
            select: {
              course: { select: { slug: true } },
            },
          },
        },
      },
    },
  });

  // Dedupe per (courseSlug + videoId) — biar gak hit oEmbed berulang.
  const uniq = new Map<
    string,
    {
      videoId: string;
      title: string;
      courseSlug: string;
    }
  >();
  for (const s of ytSources) {
    const videoId = s.url.match(/(?:v=|youtu\.be\/|embed\/)([^&?]+)/)?.[1];
    if (!videoId) continue;
    const courseSlug = s.slide?.module?.course?.slug || "?";
    const key = `${courseSlug}|${videoId}`;
    if (!uniq.has(key)) {
      uniq.set(key, { videoId, title: s.title, courseSlug });
    }
  }

  console.log(
    `\nMengecek ${uniq.size} unique video (dari ${ytSources.length} source row)...\n`,
  );

  const results: Array<{
    courseSlug: string;
    videoId: string;
    title: string;
    ok: boolean;
    reason?: string;
  }> = [];

  for (const item of uniq.values()) {
    const r = await checkVideo(item.videoId);
    results.push({ ...item, ...r });
    const mark = r.ok ? "✅" : "❌";
    const rsn = r.reason ? ` (${r.reason})` : "";
    console.log(
      `  ${mark} [${item.courseSlug.padEnd(40)}] ${item.videoId} — ${item.title}${rsn}`,
    );
    // Throttle: oEmbed gak punya hard limit publik tapi politeness rule.
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log("\n========== RINGKASAN ==========");
  const broken = results.filter((r) => !r.ok);
  console.log(`  Total OK:   ${results.length - broken.length}`);
  console.log(`  Total RUSAK: ${broken.length}`);
  if (broken.length > 0) {
    console.log("\n  Video yang BERMASALAH:");
    for (const b of broken) {
      console.log(
        `    ❌ ${b.courseSlug} → ${b.videoId} (${b.reason}) — ${b.title}`,
      );
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
