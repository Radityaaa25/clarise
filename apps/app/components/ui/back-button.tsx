"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function BackButton({ label = "Kembali" }: { label?: string }) {
  const router = useRouter()
  return (
    <button 
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-ink dark:text-muted-soft dark:hover:text-white transition-colors py-2 px-1"
    >
      <ArrowLeft size={16} />
      <span>{label}</span>
    </button>
  )
}
