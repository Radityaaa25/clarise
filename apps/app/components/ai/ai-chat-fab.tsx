"use client";

import { useState } from "react";
import { Sparkles, X, Send, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AIChatFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sky text-white shadow-lg shadow-sky/30 transition-transform hover:scale-110 active:scale-95"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col overflow-hidden border border-hairline bg-canvas dark:bg-void-elevated shadow-2xl transition-all duration-300",
        isExpanded 
          ? "bottom-0 right-0 w-full h-[100dvh] md:w-[calc(100vw-320px)] md:rounded-tl-2xl rounded-none" 
          : "bottom-24 right-6 w-[350px] h-[500px] rounded-2xl"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline bg-sky/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold font-heading text-ink dark:text-white leading-none">Clarise AI</h3>
            <span className="text-[10px] text-sky font-bold uppercase tracking-wider">Tutor Pintar</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-black/5 dark:hover:bg-white/10 hover:text-error transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat Area (Mock) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky text-white mt-1">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-surface-soft dark:bg-white/5 p-3 text-sm text-ink dark:text-white">
            Halo! Gue Clarise AI. Ada materi yang bikin lo bingung? Tanya aja, gue siap bantu! 🚀
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-hairline p-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya sesuatu..."
            className="w-full rounded-full border border-hairline bg-surface-soft dark:bg-void dark:border-white/10 py-3 pl-4 pr-12 text-sm text-ink dark:text-white placeholder:text-muted focus:border-sky focus:outline-none focus:ring-1 focus:ring-sky transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                setInput("");
              }
            }}
          />
          <button
            disabled={!input.trim()}
            className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-sky text-white transition-all hover:bg-sky/90 disabled:opacity-50 disabled:hover:bg-sky"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
