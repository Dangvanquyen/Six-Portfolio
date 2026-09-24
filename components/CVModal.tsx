"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { jetbrainsMono } from "@/app/font";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const { t, lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "DangVanQuyen_Full-StackDeveloper.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open("/resume.pdf", "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-border/80 bg-background/95 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8390d]/10 text-[#e8390d] border border-[#e8390d]/20">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className={`${jetbrainsMono.className} text-sm sm:text-base font-bold text-foreground`}>
                    {t.cvModal.title}
                  </h3>
                  <p className="hidden text-xs text-muted-foreground sm:block">
                    {t.cvModal.subtitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenNewTab}
                  title={t.cvModal.openTab}
                  className="hidden sm:flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-[#e8390d] hover:text-[#e8390d]"
                >
                  <ExternalLink size={14} />
                  <span>{t.cvModal.openTab}</span>
                </button>

                <button
                  onClick={handleDownload}
                  title={t.cvModal.download}
                  className="flex items-center gap-1.5 rounded-full bg-[#e8390d] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#d0330b] hover:shadow active:scale-95 cursor-pointer"
                >
                  <Download size={14} />
                  <span>{t.cvModal.download}</span>
                </button>

                <button
                  onClick={onClose}
                  aria-label={t.cvModal.close}
                  className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body */}
            <div className="relative flex-1 w-full bg-zinc-900/10 dark:bg-black/40">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground z-0">
                  <Loader2 className="h-8 w-8 animate-spin text-[#e8390d]" />
                  <p className="text-xs font-medium">
                    {lang === "vi" ? "Đang tải hồ sơ năng lực..." : "Loading resume preview..."}
                  </p>
                </div>
              )}

              <iframe
                src="/resume.pdf#toolbar=1"
                className="relative z-10 h-full w-full border-none"
                title="Curriculum Vitae Preview"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
