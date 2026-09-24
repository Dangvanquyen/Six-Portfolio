"use client";

import React from "react";
import { useLanguage } from "@/lib/language";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === "vi" ? "en" : "vi");
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language (VI/EN)"
      title={lang === "vi" ? "Chuyển sang Tiếng Anh (English)" : "Switch to Vietnamese (Tiếng Việt)"}
      className="group flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 hover:border-[#e8390d]/50 hover:bg-background/95 hover:shadow-md active:scale-95 cursor-pointer text-foreground shadow-sm"
    >
      <Globe size={14} className="text-[#e8390d] transition-transform duration-300 group-hover:rotate-45" />
      <span className={lang === "vi" ? "font-bold text-[#e8390d]" : "text-muted-foreground transition-colors hover:text-foreground"}>VI</span>
      <span className="text-muted-foreground/40 font-normal">/</span>
      <span className={lang === "en" ? "font-bold text-[#e8390d]" : "text-muted-foreground transition-colors hover:text-foreground"}>EN</span>
    </button>
  );
}
