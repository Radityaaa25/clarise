"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Maximize2,
  Minimize2,
  Loader2,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAiChat } from "@/hooks/use-ai-chat";
import ReactMarkdown from "react-markdown";

export function AIChatFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { messages, input, setInput, isLoading, isInitializing, sendMessage } = useAiChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Buka Clarise AI"
        aria-expanded={isOpen}
        className="fixed bottom-24 md:bottom-6 right-4 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sky text-white shadow-lg shadow-sky/30 transition-transform hover:scale-110 active:scale-95"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Clarise AI Chat"
      aria-modal="true"
      className={cn(
        "fixed z-50 flex flex-col overflow-hidden border border-hairline bg-canvas dark:bg-void-elevated shadow-2xl transition-all duration-300",
        isExpanded
          ? "bottom-0 right-0 w-full h-[100dvh] md:w-[calc(100vw-260px)] md:rounded-tl-2xl rounded-none"
          : "bottom-24 md:bottom-6 right-4 sm:right-6 w-[calc(100vw-2rem)] max-w-[360px] h-[min(500px,calc(100dvh-7rem))] rounded-2xl",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline bg-sky/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold font-heading text-ink dark:text-white leading-none">
              Clarise AI
            </h3>
            <span className="text-[10px] text-sky font-bold uppercase tracking-wider">
              Tutor Pintar
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Perkecil chat" : "Perbesar chat"}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Tutup Clarise AI"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-black/5 dark:hover:bg-white/10 hover:text-error transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome message */}
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky text-white mt-1">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-surface-soft dark:bg-white/5 p-3 text-sm text-ink dark:text-white">
            Halo! Gue Clarise AI. Ada materi yang bikin lo bingung? Tanya aja,
            gue siap bantu! 🚀
          </div>
        </div>

        {/* Messages or Loading */}
        {isInitializing ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-sky" />
          </div>
        ) : (
          <>
            {/* Messages */}
            {messages
              .filter((m) => m.role !== "system")
              .map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg mt-1",
                      msg.role === "user"
                        ? "bg-core-blue text-white"
                        : "bg-sky text-white",
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl p-3 text-sm",
                      msg.role === "user"
                        ? "rounded-tr-sm bg-core-blue text-white"
                        : "rounded-tl-sm bg-surface-soft dark:bg-white/5 text-ink dark:text-white prose prose-sm dark:prose-invert max-w-full",
                    )}
                  >
                    {msg.role === "user" ? (
                      msg.content
                    ) : (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
          </>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky text-white mt-1">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-surface-soft dark:bg-white/5 p-3 flex items-center gap-2 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Mengetik...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-hairline p-4">
        <form
          className="relative flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Tanya sesuatu..."
            aria-label="Ketik pesan ke Clarise AI"
            className="w-full rounded-full border border-hairline bg-surface-soft dark:bg-void dark:border-white/10 py-3 pl-4 pr-12 text-sm text-ink dark:text-white placeholder:text-muted focus:border-sky focus:outline-none focus:ring-1 focus:ring-sky transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Kirim pesan"
            className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-sky text-white transition-all hover:bg-sky/90 disabled:opacity-50 disabled:hover:bg-sky"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4 ml-0.5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
