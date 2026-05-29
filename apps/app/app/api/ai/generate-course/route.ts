import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/ratelimit";
import { getGroqApiKey } from "@/lib/groq";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { stripHtml, detectPromptInjection } from "@/lib/sanitize";
import { checkFeatureAccess } from "@/lib/subscription";

// Rate limiter: max 3 course generations per day per user
const generateRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "24 h"),
  prefix: "clarise:ai:generate",
});

const inputSchema = z
  .object({
    topic: z.string().min(3).max(200).trim(),
    difficulty: z
      .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
      .default("BEGINNER"),
    language: z.string().max(5).default("id"),
    visibility: z.enum(["PUBLIC", "PRIVATE"]).default("PRIVATE"),
    categoryId: z.string().min(1),
    moduleCount: z.number().min(3).max(10).default(5),
  })
  .strict();

function buildGeneratorPrompt(
  topic: string,
  difficulty: string,
  language: string,
  moduleCount: number,
): string {
  const difficultyLabel =
    difficulty === "BEGINNER"
      ? "Pemula"
      : difficulty === "INTERMEDIATE"
        ? "Menengah"
        : "Lanjutan";

  return `Kamu adalah pembuat kursus edukasi profesional untuk platform pembelajaran Clarise.

TUGAS: Buat sebuah kursus lengkap tentang topik "${topic}" dengan tingkat kesulitan "${difficultyLabel}".

ATURAN WAJIB:
1. Buat tepat ${moduleCount} modul, masing-masing modul memiliki 3–5 slide.
2. Setiap slide berisi penjelasan yang jelas, mudah dipahami, dan edukatif.
3. Konten slide harus dalam format Markdown yang rapi (gunakan heading, list, code block jika perlu).
4. Bahasa konten: ${language === "id" ? "Bahasa Indonesia" : "Bahasa Inggris"}.
5. PRIORITASKAN sumber dari Indonesia terlebih dahulu:
   - Website Indonesia: dicoding.com, codepolitan.com, petanikode.com, buildwithangga.com, idcamp.indosatooredoo.com, sekolahkoding.com
   - Channel YouTube Indonesia: Web Programming UNPAS, Programmer Zaman Now, Kelas Terbuka, IDN Boarding School, Indonesia Belajar
   - Jika tidak ada sumber Indonesia yang relevan, boleh gunakan sumber internasional: MDN, W3Schools, freeCodeCamp, YouTube internasional
6. Setiap slide HARUS memiliki minimal 1 sumber referensi.
7. JANGAN sertakan data pribadi, email, atau informasi pengguna apapun.
8. Konten harus original, tidak boleh plagiarisme.

FORMAT OUTPUT (JSON ketat, tidak boleh ada teks lain di luar JSON):
{
  "title": "Judul kursus yang menarik",
  "description": "Deskripsi kursus dalam 1–2 kalimat",
  "modules": [
    {
      "title": "Judul Modul",
      "order": 1,
      "slides": [
        {
          "title": "Judul Slide",
          "order": 1,
          "content": "Konten slide dalam format Markdown...",
          "sources": [
            {
              "title": "Nama Sumber",
              "url": "https://...",
              "type": "DOCUMENTATION | ARTICLE | YOUTUBE | BOOK | OTHER"
            }
          ]
        }
      ]
    }
  ]
}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 80);
}

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user (ONLY id, no PII sent to AI)
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Premium-only check
    const access = await checkFeatureAccess(user.id, "canCreateCourse");
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason || "Fitur ini hanya untuk pengguna Premium" },
        { status: 403 },
      );
    }

    // Rate limiting
    const { success, remaining } = await generateRatelimit.limit(clerkId);
    if (!success) {
      return NextResponse.json(
        {
          error:
            "Anda sudah mencapai batas pembuatan kursus hari ini (maks 3). Coba lagi besok.",
        },
        { status: 429, headers: { "X-Generate-Remaining": "0" } },
      );
    }

    // Input validation
    const body = await req.json();
    const parsed = inputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: parsed.error.format() },
        { status: 400 },
      );
    }

    const { topic, difficulty, language, visibility, categoryId, moduleCount } =
      parsed.data;

    // Sanitize topic
    const sanitizedTopic = stripHtml(topic);
    if (detectPromptInjection(sanitizedTopic)) {
      return NextResponse.json(
        { error: "Topik tidak dapat diproses" },
        { status: 400 },
      );
    }

    // Validate category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });
    if (!category) {
      return NextResponse.json(
        { error: "Kategori tidak ditemukan" },
        { status: 404 },
      );
    }

    const prompt = buildGeneratorPrompt(
      sanitizedTopic,
      difficulty,
      language,
      moduleCount,
    );

    // Call Groq API
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getGroqApiKey()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "Anda adalah AI pembuat course profesional. Patuhi struktur JSON persis sesuai yang diminta.",
            },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.4,
        }),
      },
    );

    if (!groqResponse.ok) {
      console.error("[AI_GENERATE] Groq Error:", await groqResponse.text());
      return NextResponse.json(
        { error: "Gagal terhubung ke AI (Groq). Silakan coba lagi." },
        { status: 502 },
      );
    }

    const groqData = await groqResponse.json();
    const responseText = groqData.choices?.[0]?.message?.content || "";

    // Token tracking
    const totalTokens = groqData.usage?.total_tokens || 0;
    if (totalTokens > 0) {
      try {
        await redis.incrby("clarise:token:course", totalTokens);
      } catch (err) {
        console.error("Failed to track tokens", err);
      }
    }

    // Parse JSON from AI
    let courseData: {
      title: string;
      description: string;
      modules: Array<{
        title: string;
        order: number;
        slides: Array<{
          title: string;
          order: number;
          content: string;
          sources: Array<{ title: string; url: string; type: string }>;
        }>;
      }>;
    };

    try {
      courseData = JSON.parse(responseText);
    } catch {
      console.error("[AI_GENERATE] Failed to parse Gemini JSON output");
      return NextResponse.json(
        {
          error:
            "AI gagal menghasilkan format kursus yang valid. Silakan coba lagi.",
        },
        { status: 502 },
      );
    }

    // Basic validation of parsed data
    if (
      !courseData.title ||
      !courseData.modules ||
      !Array.isArray(courseData.modules)
    ) {
      return NextResponse.json(
        {
          error:
            "AI menghasilkan data kursus yang tidak lengkap. Silakan coba lagi.",
        },
        { status: 502 },
      );
    }

    // Generate unique slug
    let baseSlug = slugify(courseData.title);
    let courseSlug = baseSlug;
    let slugCounter = 1;
    while (
      await prisma.course.findUnique({
        where: { slug: courseSlug },
        select: { id: true },
      })
    ) {
      courseSlug = `${baseSlug}-${slugCounter}`;
      slugCounter++;
    }

    // Save to database in a transaction
    const course = await prisma.$transaction(async (tx) => {
      // Create course
      const newCourse = await tx.course.create({
        data: {
          title: courseData.title,
          slug: courseSlug,
          description: courseData.description || null,
          categoryId: category.id,
          difficulty,
          language,
          visibility,
          isAiGenerated: true,
          isUserGenerated: true,
          isPublished: visibility === "PUBLIC",
          isPremium: false,
          authorId: user.id,
          totalModules: courseData.modules.length,
        },
      });

      // Create modules, slides, and sources
      for (const mod of courseData.modules) {
        const moduleSlug = slugify(mod.title) || `module-${mod.order}`;

        const newModule = await tx.module.create({
          data: {
            title: mod.title,
            slug: moduleSlug,
            courseId: newCourse.id,
            order: mod.order,
            xpReward: 20,
          },
        });

        if (Array.isArray(mod.slides)) {
          for (const slide of mod.slides) {
            const newSlide = await tx.slide.create({
              data: {
                title: slide.title,
                moduleId: newModule.id,
                order: slide.order,
                content: {
                  type: "markdown",
                  body: slide.content || "",
                },
              },
            });

            if (Array.isArray(slide.sources)) {
              for (const src of slide.sources) {
                const validTypes = [
                  "DOCUMENTATION",
                  "ARTICLE",
                  "YOUTUBE",
                  "BOOK",
                  "OTHER",
                ];
                await tx.source.create({
                  data: {
                    slideId: newSlide.id,
                    title: src.title || "Sumber",
                    url: src.url || "#",
                    type: validTypes.includes(src.type)
                      ? (src.type as any)
                      : "OTHER",
                  },
                });
              }
            }
          }
        }
      }

      return newCourse;
    });

    // Record activity (only internal user id, no PII)
    await prisma.userActivity.create({
      data: {
        userId: user.id,
        type: "COURSE_VIEW",
        metadata: { action: "generate_course", courseId: course.id },
      },
    });

    return NextResponse.json(
      {
        message: "Kursus berhasil dibuat!",
        course: {
          id: course.id,
          title: course.title,
          slug: course.slug,
          totalModules: course.totalModules,
        },
      },
      {
        status: 201,
        headers: { "X-Generate-Remaining": remaining.toString() },
      },
    );
  } catch (error: any) {
    console.error("[AI_GENERATE_COURSE]", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat kursus" },
      { status: 500 },
    );
  }
}
