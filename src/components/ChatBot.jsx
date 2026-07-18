"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  const suggestions = [
    "What programming languages does Morongwa use?",
    "What projects has he built?",
    "Explain his education.",
    "What tools does he work with?",
  ];

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  // Standardized messages state
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I’m Morongwa’s AI assistant. Ask me anything about his skills, projects, or experience.",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, input]);

  // --- SEND MESSAGE HANDLER ---
  const handleSend = async (e, suggestedMessage = "") => {
    if (e) e.preventDefault();
    const trimmed = (suggestedMessage || input).trim();
    if (!trimmed || loading) return;

    const userMessage = { role: "user", content: trimmed };
    const updatedHistory = [...messages, userMessage];

    // Show user message instantly
    setMessages(updatedHistory);
    setInput("");
    // Reset textarea height
    setTimeout(() => {
      if (textareaRef.current) textareaRef.current.style.height = "42px";
    }, 0);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.reply) {
        throw new Error(data.error || "Failed to get reply.");
      }

      // Add assistant response
      const assistantMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error.message || "Sorry, I ran into a problem. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* -------- Floating Button -------- */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-16 h-16 rounded-full bg-black text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition"
        >
          {/* Modern Minimal Chat Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-8 h-8"
          >
            <path d="M2 5.5A3.5 3.5 0 0 1 5.5 2h13A3.5 3.5 0 0 1 22 5.5v9A3.5 3.5 0 0 1 18.5 18h-8.7l-3.4 3.4A1 1 0 0 1 5 20.7V18H5.5A3.5 3.5 0 0 1 2 14.5v-9Z" />
          </svg>
        </button>
      )}

      {/* -------- Chat Window -------- */}
      {open && (
        <div className="w-[520px] h-[700px] sm:w-[90vw] sm:h-[80vh] max-w-[520px] max-h-[700px] bg-white shadow-2xl rounded-2xl p-10 border border-gray-200 flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-800">Chat with my AI Assistant</h3>
            <button onClick={() => setOpen(false)} className="text-xl">✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-8 p-6 pr-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-base leading-relaxed ${
                  m.role === "user"
                    ? "bg-black text-white ml-auto rounded-2xl px-6 py-4 max-w-[90%]"
                    : "bg-gray-100 text-gray-900 rounded-2xl px-6 py-5 shadow-sm max-w-[95%] animate-fadeIn"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {m.content.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-100 text-gray-900 rounded-2xl px-4 py-3 shadow-sm w-fit flex items-center space-x-1">
                <span className="text-sm">Thinking</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Suggested Questions */}
          <div className="mb-2">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={(e) => handleSend(e, suggestion)}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition"
                  disabled={loading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <form onSubmit={handleSend} className="flex gap-2 mt-2 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResize();
              }}
              rows={1}
              placeholder="Ask about Morongwa..."
              className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black/70 resize-none
                         overflow-hidden max-h-32 transition-all"
              style={{ minHeight: '42px' }}
            />

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-full disabled:opacity-60 flex-shrink-0"
            >
              {loading ? "…" : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
