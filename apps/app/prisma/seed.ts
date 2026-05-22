import { PrismaClient, Difficulty, CourseVisibility } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Reset database (optional for local, comment out if careful)
  // await prisma.category.deleteMany()

  console.log('Seeding database...')

  // 1. Categories
  const catProgramming = await prisma.category.upsert({
    where: { slug: 'programming' },
    update: {},
    create: {
      name: 'Programming',
      slug: 'programming',
      icon: 'Code2',
      description: 'Learn to code with various languages and frameworks',
      order: 1
    }
  })

  const catAI = await prisma.category.upsert({
    where: { slug: 'artificial-intelligence' },
    update: {},
    create: {
      name: 'Artificial Intelligence',
      slug: 'artificial-intelligence',
      icon: 'BrainCircuit',
      description: 'Master Machine Learning, Prompt Engineering, and AI tools',
      order: 2
    }
  })

  // 2. Badges
  const badges = [
    { name: 'First Step', description: 'Completed first module', icon: 'Footprints', condition: 'complete_1_module' },
    { name: 'Bookworm', description: 'Completed 5 courses', icon: 'BookOpen', condition: 'complete_5_courses' },
    { name: 'On Fire', description: '7-day learning streak', icon: 'Flame', condition: 'streak_7_days' },
    { name: 'AI Explorer', description: 'Asked AI 50 questions', icon: 'Bot', condition: 'ask_ai_50' },
  ]

  for (const b of badges) {
    await prisma.badge.upsert({
      where: { name: b.name },
      update: {},
      create: b
    })
  }

  // 3. Sample Course
  const course = await prisma.course.upsert({
    where: { slug: 'intro-to-prompt-engineering' },
    update: {},
    create: {
      title: 'Intro to Prompt Engineering',
      slug: 'intro-to-prompt-engineering',
      description: 'Learn how to talk to AI and get the best results.',
      categoryId: catAI.id,
      difficulty: Difficulty.BEGINNER,
      isPublished: true,
      visibility: CourseVisibility.PUBLIC,
      language: 'id',
      totalModules: 2,
    }
  })

  // Sample Modules
  await prisma.module.upsert({
    where: { courseId_slug: { courseId: course.id, slug: 'what-is-a-prompt' } },
    update: {},
    create: {
      title: 'What is a Prompt?',
      slug: 'what-is-a-prompt',
      courseId: course.id,
      order: 1,
      xpReward: 20
    }
  })

  await prisma.module.upsert({
    where: { courseId_slug: { courseId: course.id, slug: 'advanced-prompting' } },
    update: {},
    create: {
      title: 'Advanced Prompting Techniques',
      slug: 'advanced-prompting',
      courseId: course.id,
      order: 2,
      xpReward: 30
    }
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
