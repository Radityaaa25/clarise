"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@clerk/nextjs";

type Message = {
  id: string;
  role: "user" | "model";
  text: string;
};

export function AdminCopilotFAB() {
  const { getToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "model", text: "Halo, Admin! Saya Clarise Copilot. Ada yang bisa saya bantu hari ini?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Map history to the format Gemini API expects
      const history = messages
        .filter(m => m.id !== "1") // filter out the hardcoded intro
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

      const token = await getToken();
      const res = await fetch(`${apiUrl}/api/admin/ai/copilot`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ prompt: userMessage.text, history }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { id: Date.now().toString(), role: "model", text: data.response }]);
      } else {
        const errorData = await res.json().catch(() => ({}));
        const errorMsg = errorData.error || `Error ${res.status}: Terjadi kesalahan pada server.`;
        setMessages((prev) => [...prev, { id: Date.now().toString(), role: "model", text: `**System Error:**\n${errorMsg}` }]);
      }
    } catch (error: any) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "model", text: `Gagal terhubung ke server: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 neo-btn bg-primary text-primary-foreground p-4 rounded-full z-50 ${isOpen ? "hidden" : "flex"}`}
        aria-label="Open Copilot"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-2rem)] neo-card bg-card flex flex-col z-50 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-border bg-secondary">
            <div className="flex items-center gap-2 font-black uppercase text-secondary-foreground">
              <Bot className="w-5 h-5" />
              <span>Admin Copilot</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-background/20 rounded-md transition-colors text-secondary-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] p-3 text-sm prose prose-sm dark:prose-invert ${
                    msg.role === "user" 
                      ? "neo-card bg-accent text-accent-foreground rounded-tr-none" 
                      : "neo-card bg-card text-foreground rounded-tl-none border-primary"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="neo-card bg-card text-foreground rounded-tl-none p-3 border-primary flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-bold">Menganalisa...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t-2 border-border bg-card">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya stat hari ini..."
                className="flex-1 neo-input text-sm"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="neo-btn bg-primary text-primary-foreground p-3 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
