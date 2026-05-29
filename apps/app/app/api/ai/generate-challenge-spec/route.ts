import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/ratelimit";
import { getGroqQuizApiKey } from "@/lib/groq";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 h"),
  prefix: "clarise:ai:challenge",
});

const inputSchema = z.object({
  moduleId: z.string(),
});

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { success } = await ratelimit.limit(clerkId);
    if (!success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = inputSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    const { moduleId } = parsed.data;

    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: { course: true },
    });

    if (!module)
      return NextResponse.json({ error: "Module not found" }, { status: 404 });

    if (!module.course.isPremium) {
      return NextResponse.json(
        { error: "Tantangan AI hanya tersedia untuk Course Premium" },
        { status: 403 },
      );
    }

    const isCodingCourse =
      module.course.categoryId === "web-development" ||
      module.course.categoryId === "backend-development" ||
      module.course.categoryId === "pemrograman" ||
      module.course.categoryId === "database" ||
      module.course.title.toLowerCase().includes("python") ||
      module.course.title.toLowerCase().includes("golang") ||
      module.course.title.toLowerCase().includes("javascript");

    const inputType = isCodingCourse ? "code" : "essay";

    const prompt = `Kamu adalah pembuat tantangan ahli untuk platform pembelajaran Clarise.
Buat 1 tantangan praktis (Tantangan AI) untuk menguji pemahaman user tentang modul "${module.title}" pada kursus "${module.course.title}".

Pertanyaan harus menantang dan membutuhkan pemahaman logika atau konsep inti modul tersebut.

Kembalikan HANYA format JSON berikut (pastikan sesuai tipe input ${inputType}):
{
  "content": "Penjelasan konteks challenge — cerita atau skenario studi kasus singkat yang relevan",
  "challenge": {
    "instruction": "Instruksi yang spesifik tentang apa yang harus ditulis/dijawab user",
    "inputType": "${inputType}",
    "inputPlaceholder": "Contoh format jawaban yang diharapkan",
    "starterCode": ${inputType === "code" ? '"// Tulis kode awal di sini (jika relevan)"' : '""'},
    "expectedConcepts": ["Konsep inti 1", "Konsep inti 2"],
    "evaluationCriteria": "Instruksi untuk AI Evaluator: hal penting apa yang harus dicek untuk menganggap jawaban user benar",
    "hints": ["Hint 1 (ringan)", "Hint 2 (lebih spesifik)"],
    "sampleAnswer": "Contoh jawaban yang ideal (sebagai referensi grader)"
  }
}`;

    let responseText = "";

    // Call Groq API
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getGroqQuizApiKey()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "Anda adalah AI pembuat tantangan spesifik. Patuhi format JSON.",
            },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      },
    );

    if (!groqResponse.ok) {
      console.error(
        "[GENERATE_CHALLENGE_ERROR] Groq Error:",
        await groqResponse.text(),
      );
      return NextResponse.json(
        { error: "Gagal memuat tantangan dari AI" },
        { status: 502 },
      );
    }

    const groqData = await groqResponse.json();
    responseText = groqData.choices?.[0]?.message?.content || "";

    // Token tracking
    const totalTokens = groqData.usage?.total_tokens || 0;
    if (totalTokens > 0) {
      try {
        await redis.incrby("clarise:token:quiz_challenge", totalTokens);
      } catch (err) {
        console.error("Failed to track tokens", err);
      }
    }

    responseText = responseText
      .replace(/^```json\n?/i, "")
      .replace(/\n?```$/i, "")
      .trim();

    return NextResponse.json(JSON.parse(responseText));
  } catch (error) {
    console.error("[GENERATE_CHALLENGE_ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
