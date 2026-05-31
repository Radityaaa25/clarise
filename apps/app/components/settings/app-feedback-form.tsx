"use client";

import { useState } from "react";
import useSWR from "swr";
import { Star, Loader2, Send, MessageSquareHeart } from "lucide-react";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AppFeedbackForm() {
  const { data, mutate } = useSWR("/api/feedback", fetcher);
  const existing = data?.feedback;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Prefill sekali ketika data feedback lama termuat.
  if (!initialized && existing) {
    setRating(existing.rating ?? 0);
    setMessage(existing.message ?? "");
    setInitialized(true);
  }

  const submit = async () => {
    if (rating === 0) {
      toast.error("Pilih rating bintang dulu ya.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          ...(message.trim() ? { message: message.trim() } : {}),
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Gagal mengirim masukan");
      }
      toast.success("Terima kasih atas masukanmu! 💙");
      mutate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal mengirim masukan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-hairline shadow-sm bg-canvas dark:bg-void-elevated p-6 md:p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-xl bg-core-blue/10 text-core-blue dark:bg-core-blue/20 dark:text-sky flex items-center justify-center">
          <MessageSquareHeart className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold font-heading text-ink dark:text-white">
          Kritik & Saran
        </h2>
      </div>
      <p className="text-sm text-body dark:text-white/70 mb-6">
        Bantu kami jadi lebih baik. Beri rating untuk Clarise dan tulis
        kritik/saranmu — masukan terpilih bisa tampil di halaman utama Clarise.
      </p>

      {/* Rating */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-ink dark:text-white mb-2">
          Rating aplikasi
        </label>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={submitting}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              aria-label={`Beri ${star} bintang`}
              className="transition-transform hover:scale-110 disabled:opacity-50"
            >
              <Star
                className={`h-8 w-8 ${
                  (hover || rating) >= star
                    ? "fill-warning text-warning"
                    : "fill-transparent text-muted-soft dark:text-white/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="mb-5">
        <label
          htmlFor="feedback-message"
          className="block text-sm font-bold text-ink dark:text-white mb-2"
        >
          Kritik & saran <span className="text-muted-soft">(opsional)</span>
        </label>
        <textarea
          id="feedback-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          maxLength={1000}
          disabled={submitting}
          placeholder="Apa yang kamu suka? Apa yang bisa kami tingkatkan?"
          className="w-full rounded-lg border border-hairline bg-surface-soft dark:bg-void px-3 py-2 text-sm text-ink dark:text-white placeholder:text-muted-soft focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none resize-none transition-all disabled:opacity-50"
        />
        <div className="text-[11px] text-muted-soft mt-1 text-right">
          {message.length}/1000
        </div>
      </div>

      <button
        onClick={submit}
        disabled={submitting || rating === 0}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-core-blue px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-core-blue/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Mengirim...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {existing ? "Perbarui Masukan" : "Kirim Masukan"}
          </>
        )}
      </button>

      {existing && (
        <p className="text-xs text-muted mt-3">
          Kamu sudah pernah memberi masukan. Mengirim lagi akan memperbarui
          masukan sebelumnya.
        </p>
      )}
    </div>
  );
}
