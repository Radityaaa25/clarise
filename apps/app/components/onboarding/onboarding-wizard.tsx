"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, Palette, Briefcase, LineChart, 
  Database, Calculator, Sparkles, BookOpen, Clock, ChevronRight, Check
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TOPICS = [
  { id: "programming", label: "Programming", icon: Code, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-500/10" },
  { id: "design", label: "UI/UX Design", icon: Palette, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-500/10" },
  { id: "business", label: "Business", icon: Briefcase, color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-500/10" },
  { id: "marketing", label: "Marketing", icon: LineChart, color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-500/10" },
  { id: "data", label: "Data Science", icon: Database, color: "text-cyan-500 dark:text-cyan-400", bg: "bg-cyan-500/10" },
  { id: "lainnya", label: "Lainnya...", icon: Sparkles, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-500/10" },
];

const LEVELS = [
  { id: "BEGINNER", label: "Dasar", desc: "Saya baru mulai dari nol" },
  { id: "INTERMEDIATE", label: "Menengah", desc: "Saya sudah punya dasar-dasar" },
  { id: "ADVANCED", label: "Mahir", desc: "Saya ingin memperdalam skill" },
];

const HOURS = [
  { id: "15m", label: "15 Menit", desc: "Cukup untuk pemanasan" },
  { id: "30m", label: "30 Menit", desc: "Konsisten tiap hari" },
  { id: "1h", label: "1 Jam", desc: "Serius belajar" },
  { id: "2h+", label: "2+ Jam", desc: "Belajar intensif" },
];

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [level, setLevel] = useState("");
  const [hours, setHours] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      submitOnboarding();
    }
  };

  const submitOnboarding = async () => {
    setLoading(true);
    const finalGoal = goal === "lainnya" ? customGoal : goal;
    // TODO: Connect to backend
    // await fetch('/api/onboarding', { method: 'POST', body: JSON.stringify({ learningGoal: finalGoal, currentLevel: level, dailyHours: hours }) })
    
    // Simulate API call for UI presentation
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="mb-12 flex justify-center gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
              i === step
                ? "w-8 bg-blue-500"
                : i < step
                  ? "w-8 bg-blue-500/50"
                  : "w-4 bg-hairline dark:bg-zinc-800"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col">
            <div className="mb-8 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 -mt-15 -mb-8">
                <Sparkles className="w-10 h-10 text-blue-500" />
                <Image
                  src="/logoLM.png"
                  alt="Clarise Logo"
                  width={140}
                  height={46}
                  className="w-[110px] sm:w-[140px] h-auto dark:hidden"
                />
                <Image
                  src="/logoDM.png"
                  alt="Clarise Logo"
                  width={140}
                  height={46}
                  className="w-[110px] sm:w-[140px] h-auto hidden dark:block"
                />
              </div>
              <h1 className="text-3xl font-black mb-2 text-ink dark:text-white">
                Apa yang ingin kamu pelajari?
              </h1>
              <p className="text-muted dark:text-zinc-400">
                Pilih topik utama yang paling menarik untukmu.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {TOPICS.map((t) => {
                const isSelected = goal === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setGoal(t.id)}
                    className={`group flex flex-col items-center p-6 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500 scale-[1.02] shadow-[0_8px_30px_-4px_rgba(59,130,246,0.25)]"
                        : "border-hairline dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/50 hover:border-black/10 dark:hover:border-zinc-600 hover:bg-surface-soft dark:hover:bg-zinc-800 hover:-translate-y-1 hover:shadow-xl"
                    }`}>
                    <div
                      className={`p-4 rounded-xl mb-4 transition-all duration-300 ${isSelected ? t.bg : "bg-black/5 dark:bg-zinc-800 group-hover:scale-110"}`}>
                      <t.icon
                        className={`w-8 h-8 transition-colors ${isSelected ? t.color : "text-muted dark:text-zinc-400 group-hover:text-ink dark:group-hover:text-zinc-200"}`}
                      />
                    </div>
                    <span
                      className={`font-bold text-sm ${isSelected ? "text-blue-600 dark:text-white" : "text-ink dark:text-white"}`}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {goal === "lainnya" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden">
                  <label className="block text-sm font-bold text-ink dark:text-white mb-2">
                    Topik spesifik apa yang ingin kamu pelajari?
                  </label>
                  <input
                    type="text"
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    placeholder="Ketik topik belajarmu disini (misal: Memasak, Bahasa Asing, dll...)"
                    className="w-full bg-surface-card dark:bg-zinc-900 border border-hairline dark:border-zinc-800 rounded-xl px-4 py-3 text-ink dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleNext}
              disabled={!goal || (goal === "lainnya" && !customGoal.trim())}
              className="mt-10 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_8px_30px_-4px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all duration-300">
              Lanjutkan <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col">
            <div className="mb-8 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 -mt-15 -mb-8">
                <BookOpen className="w-10 h-10 text-purple-500 dark:text-purple-400" />
                <Image
                  src="/logoLM.png"
                  alt="Clarise Logo"
                  width={140}
                  height={46}
                  className="w-[110px] sm:w-[140px] h-auto dark:hidden"
                />
                <Image
                  src="/logoDM.png"
                  alt="Clarise Logo"
                  width={140}
                  height={46}
                  className="w-[110px] sm:w-[140px] h-auto hidden dark:block"
                />
              </div>
              <h1 className="text-3xl font-black mb-2 text-ink dark:text-white">
                Bagaimana level kamu sekarang?
              </h1>
              <p className="text-muted dark:text-zinc-400">
                Ini membantu Clarise menyesuaikan kurikulum.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {LEVELS.map((l) => {
                const isSelected = level === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={`group flex items-center p-5 rounded-2xl border text-left transition-all duration-300 ${
                      isSelected
                        ? "border-purple-500 bg-purple-500/10 ring-1 ring-purple-500 scale-[1.02] shadow-[0_8px_30px_-4px_rgba(168,85,247,0.25)]"
                        : "border-hairline dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/50 hover:border-black/10 dark:hover:border-zinc-600 hover:bg-surface-soft dark:hover:bg-zinc-800 hover:-translate-y-1 hover:shadow-xl"
                    }`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-5 flex-shrink-0 transition-transform duration-300 ${
                        isSelected
                          ? "bg-purple-500 scale-110"
                          : "bg-black/5 dark:bg-zinc-800 group-hover:scale-110"
                      }`}>
                      {isSelected && <Check className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-lg mb-0.5 transition-colors ${isSelected ? "text-purple-600 dark:text-purple-300" : "text-ink dark:text-zinc-200"}`}>
                        {l.label}
                      </h3>
                      <p className="text-muted dark:text-zinc-400 text-sm">
                        {l.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={!level}
              className="mt-10 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_8px_30px_-4px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all duration-300">
              Lanjutkan <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col">
            <div className="mb-8 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 -mt-15 -mb-8">
                <Clock className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
                <Image
                  src="/logoLM.png"
                  alt="Clarise Logo"
                  width={140}
                  height={46}
                  className="w-[110px] sm:w-[140px] h-auto dark:hidden"
                />
                <Image
                  src="/logoDM.png"
                  alt="Clarise Logo"
                  width={140}
                  height={46}
                  className="w-[110px] sm:w-[140px] h-auto hidden dark:block"
                />
              </div>
              <h1 className="text-3xl font-black mb-2 text-ink dark:text-white">
                Komitmen belajarmu per hari?
              </h1>
              <p className="text-muted dark:text-zinc-400">
                Pilih waktu yang realistis agar konsisten.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {HOURS.map((h) => {
                const isSelected = hours === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => setHours(h.id)}
                    className={`group flex flex-col p-6 rounded-2xl border text-left transition-all duration-300 ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500 scale-[1.02] shadow-[0_8px_30px_-4px_rgba(16,185,129,0.25)]"
                        : "border-hairline dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/50 hover:border-black/10 dark:hover:border-zinc-600 hover:bg-surface-soft dark:hover:bg-zinc-800 hover:-translate-y-1 hover:shadow-xl"
                    }`}>
                    <h3
                      className={`font-bold text-2xl mb-1.5 transition-colors ${isSelected ? "text-emerald-600 dark:text-emerald-300" : "text-ink dark:text-zinc-200"}`}>
                      {h.label}
                    </h3>
                    <p className="text-muted dark:text-zinc-400 text-sm">
                      {h.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={!hours || loading}
              className="mt-10 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all duration-300">
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Mulai Perjalanan <Sparkles className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
