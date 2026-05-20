import { ArrowRight, Sparkles, BookOpen, Trophy } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-void -z-10" />

        <div className="inline-flex items-center gap-2 rounded-full border border-core-blue/30 bg-core-blue/10 px-4 py-1.5 text-sm text-sky mb-8">
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered Learning</span>
        </div>

        <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
          Learn Smarter with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-core-blue to-sky">
            Clarise
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-frost/70 leading-relaxed">
          Master new skills with AI-powered adaptive learning. Personalized
          courses, real-time feedback, and gamified progress tracking.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href={process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.com"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-core-blue px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-core-blue/90 hover:shadow-lg hover:shadow-core-blue/25"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-frost/20 px-8 py-3.5 text-base font-medium text-frost transition-all hover:bg-frost/5"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-black md:text-5xl">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-core-blue to-sky">
              Clarise
            </span>
            ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-frost/60">
            Everything you need to accelerate your learning journey.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Lessons",
                description:
                  "Adaptive content that adjusts to your learning pace and style in real-time.",
              },
              {
                icon: BookOpen,
                title: "Structured Courses",
                description:
                  "Curated learning paths from beginner to advanced, designed by experts.",
              },
              {
                icon: Trophy,
                title: "Gamified Progress",
                description:
                  "Earn XP, badges, and maintain streaks to stay motivated on your journey.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-frost/10 bg-navy/30 p-8 transition-all hover:border-core-blue/30 hover:bg-navy/50"
              >
                <div className="mb-4 inline-flex rounded-xl bg-core-blue/10 p-3">
                  <feature.icon className="h-6 w-6 text-sky" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-frost/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-frost/10 px-6 py-12">
        <div className="mx-auto max-w-6xl text-center text-sm text-frost/40">
          <p>&copy; {new Date().getFullYear()} Clarise. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
