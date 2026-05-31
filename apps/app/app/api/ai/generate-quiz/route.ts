import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/ratelimit";
import { getGroqQuizApiKey } from "@/lib/groq";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getRandomStaticQuizzes } from "@/lib/static-quizzes";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 h"),
  prefix: "clarise:ai:quiz",
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

    const courseModule = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: {
          include: {
            category: { select: { slug: true } },
          },
        },
      },
    });

    if (!courseModule)
      return NextResponse.json({ error: "Module not found" }, { status: 404 });

    if (!courseModule.course.isPremium) {
      // Free course: ambil dari static-quizzes.ts (TIDAK panggil AI/Groq).
      // Lookup berlapis: courseSlug → categorySlug → default.
      const staticQuestions = getRandomStaticQuizzes(
        {
          courseSlug: courseModule.course.slug,
          categorySlug: courseModule.course.category?.slug,
        },
        5,
      );
      return NextResponse.json({ questions: staticQuestions });
    }

    const prompt = `Kamu adalah pembuat soal pilihan ganda ahli untuk platform pembelajaran Clarise.
Buat 5 pertanyaan pilihan ganda untuk menguji pemahaman user tentang modul "${courseModule.title}" pada kursus "${courseModule.course.title}".

Pertanyaan harus spesifik, berbobot, dan menguji pemahaman konsep, bukan hanya hafalan.
Setiap pertanyaan memiliki 4 pilihan jawaban, dan 1 jawaban yang benar.

Kembalikan HANYA format JSON berikut:
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": number (index dari 0 sampai 3)
    }
  ]
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
                "Anda adalah pembuat soal pilihan ganda ahli. Patuhi format JSON.",
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
        "[GENERATE_QUIZ_ERROR] Groq Error:",
        await groqResponse.text(),
      );
      return NextResponse.json(
        { error: "Gagal memuat kuis dari AI" },
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
    console.error("[GENERATE_QUIZ_ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
