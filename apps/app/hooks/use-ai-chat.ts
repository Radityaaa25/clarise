import { useState } from "react";
import { AiChatMessage } from "../types";

export function useAiChat(courseId?: string, moduleId?: string) {
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: AiChatMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, courseId, moduleId }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      // Simple implementation assuming JSON response for now.
      // If streaming is used, this needs to be adapted to read the stream.
      const data = await res.json();
      const aiMessage: AiChatMessage = {
        role: "assistant",
        content: data.text || "Sorry, I couldn't understand that.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: AiChatMessage = {
        role: "assistant",
        content: "Error connecting to AI. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
  };
}
