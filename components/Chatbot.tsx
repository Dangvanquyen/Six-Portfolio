"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  Bot,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/language";
import CVModal from "./CVModal";

type MessageAction = {
  label: string;
  type: "scroll" | "download" | "link" | "cv_modal";
  target: string;
};

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  status?: "success" | "error";
  actions?: MessageAction[];
};

// Helper to determine helpful interactive action buttons based on AI answer content
function getSmartActions(text: string, lang: "vi" | "en"): MessageAction[] {
  const lower = text.toLowerCase();
  const actions: MessageAction[] = [];

  if (lower.includes("cv") || lower.includes("resume") || lower.includes("hồ sơ")) {
    actions.push({
      label: lang === "vi" ? "👁️ Xem trước CV" : "👁️ Preview CV",
      type: "cv_modal",
      target: "",
    });
    actions.push({
      label: lang === "vi" ? "📥 Tải CV" : "📥 Download CV",
      type: "download",
      target: "/resume.pdf",
    });
  }

  if (lower.includes("dự án") || lower.includes("project") || lower.includes("e-commerce") || lower.includes("catshop")) {
    actions.push({
      label: lang === "vi" ? "🚀 Xem mục Dự án" : "🚀 View Projects",
      type: "scroll",
      target: "projects",
    });
  }

  if (lower.includes("kỹ năng") || lower.includes("skill") || lower.includes("tech stack") || lower.includes("công nghệ")) {
    actions.push({
      label: lang === "vi" ? "⚡ Xem Kỹ năng" : "⚡ View Skills",
      type: "scroll",
      target: "skills",
    });
  }

  if (lower.includes("liên hệ") || lower.includes("contact") || lower.includes("email") || lower.includes("tin nhắn")) {
    actions.push({
      label: lang === "vi" ? "📬 Gửi tin nhắn" : "📬 Contact Form",
      type: "scroll",
      target: "contact",
    });
  }

  return actions.slice(0, 2);
}

// Simple, bulletproof inline markdown formatter with unique keys
function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n");

  const parseLine = (lineText: string, lineIdx: number) => {
    const tokenRegex = /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s]+)/g;
    const parts = lineText.split(tokenRegex);

    return parts.map((part, pIdx) => {
      if (!part) return null;

      const linkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={`l-${lineIdx}-p-${pIdx}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[#e8390d] hover:underline font-medium break-all"
          >
            {linkMatch[1]}
            <ExternalLink size={12} className="inline ml-0.5 opacity-80" />
          </a>
        );
      }

      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        return (
          <strong
            key={`l-${lineIdx}-p-${pIdx}`}
            className="font-semibold text-[#ff6b4a] dark:text-[#ff8266]"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }

      if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
        return (
          <code
            key={`l-${lineIdx}-p-${pIdx}`}
            className="px-1 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-xs font-mono text-[#e8390d]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      if (part.startsWith("http://") || part.startsWith("https://")) {
        return (
          <a
            key={`l-${lineIdx}-p-${pIdx}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[#e8390d] hover:underline font-medium break-all"
          >
            {part}
            <ExternalLink size={12} className="inline ml-0.5 opacity-80" />
          </a>
        );
      }

      return <span key={`l-${lineIdx}-p-${pIdx}`}>{part}</span>;
    });
  };

  return (
    <div className="space-y-1.5 leading-relaxed text-sm">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={`empty-${idx}`} className="h-1.5" />;
        }

        if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
          return (
            <div key={`bullet-${idx}`} className="flex items-start gap-1.5 pl-1">
              <span className="text-[#e8390d] font-bold text-base leading-4">•</span>
              <span className="flex-1">{parseLine(trimmed.substring(2), idx)}</span>
            </div>
          );
        }

        return <p key={`p-${idx}`}>{parseLine(line, idx)}</p>;
      })}
    </div>
  );
}

export default function Chatbot() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      text: t.ai.welcome,
      sender: "bot",
      timestamp: lang === "vi" ? "Vừa xong" : "Just now",
      actions: [
        { label: lang === "vi" ? "👁️ Xem trước CV" : "👁️ Preview CV", type: "cv_modal", target: "" },
        { label: lang === "vi" ? "🚀 Xem Dự án" : "🚀 View Projects", type: "scroll", target: "projects" },
        { label: lang === "vi" ? "📥 Tải CV" : "📥 Download CV", type: "download", target: "/resume.pdf" },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickSuggestions = [
    { id: "qs-1", label: t.ai.askProject, query: lang === "vi" ? "Bạn có thể giới thiệu các dự án nổi bật nhất của Six không?" : "Can you introduce Six's top featured projects?" },
    { id: "qs-2", label: t.ai.askSkills, query: lang === "vi" ? "Six có những kỹ năng và công nghệ nào mạnh nhất?" : "What are Six's strongest skills and tech stack?" },
    { id: "qs-3", label: t.ai.askCV, query: lang === "vi" ? "Làm sao để tôi có thể xem hoặc tải CV của Six?" : "How can I view or download Six's CV / Resume?" },
    { id: "qs-4", label: t.ai.askContact, query: lang === "vi" ? "Tôi muốn liên hệ và trao đổi công việc với Six qua đâu?" : "How can I get in touch with Six for work opportunities?" },
    { id: "qs-5", label: t.ai.askAbout, query: lang === "vi" ? "Giới thiệu ngắn gọn về Đặng Văn Quyền (Six) nhé!" : "Please give a brief introduction about Dang Van Quyen (Six)!" },
  ];

  // Load chat history from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("six_chat_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
  }, []);

  // Save chat history to sessionStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem("six_chat_history", JSON.stringify(messages));
      }
    } catch (e) {
      console.error("Failed to save chat history:", e);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessage(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen, messages]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    const resetMsg: Message = {
      id: "welcome-msg",
      text: t.ai.welcome,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actions: [
        { label: lang === "vi" ? "👁️ Xem trước CV" : "👁️ Preview CV", type: "cv_modal", target: "" },
        { label: lang === "vi" ? "🚀 Xem Dự án" : "🚀 View Projects", type: "scroll", target: "projects" },
        { label: lang === "vi" ? "📥 Tải CV" : "📥 Download CV", type: "download", target: "/resume.pdf" },
      ],
    };
    setMessages([resetMsg]);
    sessionStorage.removeItem("six_chat_history");
  };

  const handleActionClick = (action: MessageAction) => {
    if (action.type === "cv_modal") {
      setIsCVModalOpen(true);
    } else if (action.type === "download") {
      const link = document.createElement("a");
      link.href = action.target;
      link.download = "DangVanQuyen_Full-StackDeveloper.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action.type === "scroll") {
      const el = document.getElementById(action.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newUserMsg: Message = {
      id: `user-${Date.now()}`,
      text: trimmed,
      sender: "user",
      timestamp: userTimestamp,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== "welcome-msg" && m.status !== "error")
        .map((m) => ({
          text: m.text,
          sender: m.sender,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || (lang === "vi" ? "Không thể kết nối tới AI. Vui lòng thử lại sau." : "Failed to connect to AI. Please try again."));
      }

      const botReply = data.reply || (lang === "vi" ? "Xin lỗi, mình không tìm thấy câu trả lời phù hợp." : "Sorry, I couldn't find a matching answer.");
      const botTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const smartActions = getSmartActions(botReply, lang);

      const newBotMsg: Message = {
        id: `bot-${Date.now()}`,
        text: botReply,
        sender: "bot",
        timestamp: botTimestamp,
        status: "success",
        actions: smartActions.length > 0 ? smartActions : undefined,
      };

      setMessages((prev) => [...prev, newBotMsg]);

      if (!isOpen) {
        setHasNewMessage(true);
      }
    } catch (error: any) {
      const errorTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        text: `⚠️ ${error?.message || (lang === "vi" ? "Có lỗi xảy ra khi kết nối. Bạn vui lòng thử lại nhé!" : "An error occurred. Please try again!")}`,
        sender: "bot",
        timestamp: errorTimestamp,
        status: "error",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="pointer-events-auto mb-3 flex h-[520px] max-h-[82vh] w-[calc(100vw-2.5rem)] sm:w-[390px] flex-col overflow-hidden rounded-2xl border border-zinc-200/20 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200/30 dark:border-white/10 bg-gradient-to-r from-zinc-100/80 to-zinc-200/50 dark:from-zinc-900/90 dark:to-zinc-950/90 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[#e8390d]/60">
                  <Image
                    src="/chatbot-avatar.jpg"
                    alt="Six Assistant Avatar"
                    fill
                    sizes="40px"
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Six+AI&background=e8390d&color=fff";
                    }}
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-950 bg-emerald-500 shadow-sm" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Six Assistant</h3>
                    <span className="flex items-center gap-0.5 rounded-full bg-[#e8390d]/10 px-1.5 py-0.2 text-[10px] font-semibold text-[#e8390d]">
                      <Sparkles size={10} /> AI
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {lang === "vi" ? "Sẵn sàng giải đáp 24/7" : "Active & Ready 24/7"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title={lang === "vi" ? "Làm mới cuộc trò chuyện" : "Reset chat"}
                  aria-label="Reset chat"
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title={lang === "vi" ? "Đóng" : "Close"}
                  aria-label="Close assistant"
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-zinc-800 dark:text-zinc-100 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="group relative flex items-start gap-2 max-w-[86%]">
                    {msg.sender === "bot" && (
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8390d]/15 text-[#e8390d]">
                        <Bot size={14} />
                      </div>
                    )}

                    <div
                      className={`relative rounded-2xl px-4 py-2.5 shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#e8390d] text-white rounded-br-xs font-normal"
                          : msg.status === "error"
                          ? "bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-bl-xs"
                          : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/10 text-zinc-800 dark:text-zinc-100 rounded-bl-xs"
                      }`}
                    >
                      <FormattedMessage content={msg.text} />

                      {/* Interactive Action Chips */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-zinc-200/30 dark:border-white/10 pt-2">
                          {msg.actions.map((act, aIdx) => (
                            <button
                              key={`act-${aIdx}`}
                              onClick={() => handleActionClick(act)}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#e8390d]/10 px-2.5 py-1 text-xs font-semibold text-[#e8390d] hover:bg-[#e8390d] hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                              {act.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {msg.sender === "bot" && msg.status !== "error" && (
                        <button
                          onClick={() => handleCopy(msg.text, msg.id)}
                          className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                          title="Sao chép nội dung"
                          aria-label="Sao chép nội dung"
                        >
                          {copiedId === msg.id ? (
                            <Check size={14} className="text-green-500" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <span className="mt-1 px-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8390d]/15 text-[#e8390d]">
                    <Bot size={14} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/10 px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-[#e8390d] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-[#e8390d] animate-bounce" style={{ animationDelay: "180ms" }} />
                    <span className="h-2 w-2 rounded-full bg-[#e8390d] animate-bounce" style={{ animationDelay: "360ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Carousel */}
            <div className="border-t border-zinc-200/40 dark:border-white/5 bg-zinc-50/70 dark:bg-zinc-950/60 px-3 py-2">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {quickSuggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => sendMessage(item.query)}
                    disabled={isLoading}
                    className="whitespace-nowrap shrink-0 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-[#e8390d] hover:text-[#e8390d] dark:hover:border-[#e8390d] dark:hover:text-[#e8390d] transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-zinc-200/40 dark:border-white/10 bg-white dark:bg-zinc-950 p-3">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.ai.inputPlaceholder}
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/90 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-[#e8390d] focus:outline-none focus:ring-1 focus:ring-[#e8390d] transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Gửi tin nhắn"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8390d] text-white shadow-md transition-all hover:bg-[#ff4e24] hover:shadow-lg hover:shadow-[#e8390d]/30 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-[#e8390d] cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Mở trợ lý ảo AI"
        className="pointer-events-auto group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#e8390d] to-[#ff6338] text-white shadow-xl shadow-[#e8390d]/35 transition-shadow hover:shadow-2xl hover:shadow-[#e8390d]/50 cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <div className="relative h-13 w-13 overflow-hidden rounded-full ring-2 ring-white/70">
                <Image
                  src="/chatbot-avatar.jpg"
                  alt="Chatbot Avatar"
                  fill
                  sizes="52px"
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Six+AI&background=e8390d&color=fff";
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Badge if closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-950" />
          </span>
        )}

        {/* Tooltip hint on hover */}
        {!isOpen && (
          <div className="absolute right-16 hidden whitespace-nowrap rounded-lg bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-md backdrop-blur-md group-hover:block transition-all dark:bg-white/90 dark:text-zinc-900">
            {lang === "vi" ? "Trò chuyện với AI của Six ✨" : "Chat with Six's AI ✨"}
          </div>
        )}
      </motion.button>

      {/* CV Preview Modal */}
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  );
}
